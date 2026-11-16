'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogBackdrop, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@study/ui';
import { Archive, ArrowUp, AudioLines, BriefcaseBusiness, Check, ChevronDown, ChevronRight, ChevronsUpDown, CodeXml, Copy, Download, Ellipsis, File, Folder, Ghost, Globe, HelpCircle, Info, Menu, MessagesSquare, PanelLeft, Plus, Search, Settings, Shapes, SlidersHorizontal, Sparkles, Star, ThumbsDown, ThumbsUp, X } from 'lucide-react';

type View = 'home' | 'chats' | 'conversation';
type Message = { role: 'user' | 'assistant'; text: string };
type Chat = { id: string; title: string; time: string; starred?: boolean; messages: Message[] };
const initialChats: Chat[] = [
  { id: 'routine', title: 'Creating a personalized routine for your goal', time: '23 seconds ago', messages: [{ role: 'user', text: 'Help me build a morning routine that I can stick to.' }, { role: 'assistant', text: 'Let’s make it simple enough to repeat. Start with three small habits:\n\n1. Drink a glass of water after you wake up.\n2. Spend five minutes stretching or walking.\n3. Write down the one thing you want to accomplish today.\n\nTry this for a week before adding more. What time do you normally wake up?' }] },
  { id: 'image', title: 'Image analysis request', time: '1 day ago', starred: true, messages: [{ role: 'user', text: 'Can you help me analyze an image?' }, { role: 'assistant', text: 'Of course. Tell me what you would like to understand about the image, such as its layout, colors, or content, and I can help you organize your observations.' }] },
  { id: 'interest', title: 'How compound interest works', time: '1 day ago', messages: [{ role: 'user', text: 'How does compound interest work?' }, { role: 'assistant', text: 'Compound interest means earning interest on both your original savings and the interest you have already earned.\n\nFor example, if you save $1,000 at 5% annual interest:\n\n• After year one: $1,050\n• After year two: $1,102.50\n• After year three: $1,157.63\n\nThe amount earned grows each year because the balance is larger. Time and regular contributions make the biggest difference.' }] },
];

function ClaudeMark({ size = 32 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className="claude-mark">{Array.from({ length: 14 }, (_, i) => { const angle = (i * Math.PI * 2) / 14; const inner = 3; const outer = [18, 15, 18, 16, 18, 15, 17][i % 7]; return <line key={i} x1={20 + Math.cos(angle) * inner} y1={20 + Math.sin(angle) * inner} x2={20 + Math.cos(angle) * outer} y2={20 + Math.sin(angle) * outer} stroke="currentColor" strokeWidth={i % 3 === 0 ? '3.1' : '2.5'} strokeLinecap="round" />; })}</svg>;
}

function demoReply(text: string) {
  if (/interest|saving|finance/i.test(text)) return initialChats[2].messages[1].text;
  if (/image|picture|photo/i.test(text)) return 'I can help you look at the composition, colors, typography, and details in an image.\n\nFor this local demo, try describing the image or the specific detail you want to explore. No image is sent to an AI service.';
  if (/code|website|design/i.test(text)) return 'A useful place to start is the structure of the page:\n\n1. Identify the main action and the content that supports it.\n2. Define the typography, spacing, and color tokens.\n3. Build the layout, then add small interactive states.\n\nWhat part would you like to work through first?';
  if (/hello|hi\b/i.test(text)) return 'Hi! What would you like to work on today?';
  return 'Let’s work through that together.\n\nStart with the outcome you want, then break the task into a few manageable steps. It can help to write down what you already know, what remains unclear, and one small next action.\n\nWhat would a useful result look like for you?';
}

export default function ClaudeApp({ initialView = 'home' }: { initialView?: View }) {
  const [view, setView] = useState<View>(initialView);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeId, setActiveId] = useState('interest');
  const [prompt, setPrompt] = useState('');
  const [query, setQuery] = useState('');
  const [model, setModel] = useState('Sonnet 4.6');
  const [extended, setExtended] = useState(true);
  const [popover, setPopover] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const [info, setInfo] = useState<{ title: string; text: string } | null>(null);
  const [announcement, setAnnouncement] = useState(false);
  const [toast, setToast] = useState('');
  const [name, setName] = useState('Sam');
  const [tone, setTone] = useState('Normal');
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [incognito, setIncognito] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [liked, setLiked] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const savedChatsBeforeIncognito = useRef<Chat[]>(initialChats);
  const activeChat = chats.find(chat => chat.id === activeId) || chats[0];

  useEffect(() => { try { const stored = localStorage.getItem('claude-study-chats-v1'); if (stored) setChats(JSON.parse(stored)); } catch {} setHydrated(true); }, []);
  useEffect(() => { if (hydrated && !incognito) try { localStorage.setItem('claude-study-chats-v1', JSON.stringify(chats)); } catch {} }, [chats, hydrated, incognito]);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 3000); return () => clearTimeout(timer); } }, [toast]);
  useEffect(() => { if (view === 'conversation') bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [view, activeChat?.messages.length]);

  function navigate(next: View) { setView(next); setMobileOpen(false); setPopover(''); setAccountOpen(false); }
  function newChat() { setPrompt(''); setAttachment(''); navigate('home'); setTimeout(() => promptRef.current?.focus(), 50); }
  function openChat(chat: Chat) { setActiveId(chat.id); setPrompt(''); navigate('conversation'); }
  function explain(title: string, text: string) { setInfo({ title, text }); setPopover(''); setAccountOpen(false); }
  function toggleIncognito() {
    if (incognito) setChats(savedChatsBeforeIncognito.current);
    else savedChatsBeforeIncognito.current = chats;
    setIncognito(!incognito); newChat();
    setToast(incognito ? 'Chat history enabled' : 'Incognito on: new changes will not be saved');
  }
  function send() {
    if (!prompt.trim() || busy) return;
    const text = prompt.trim();
    const id = view === 'conversation' ? activeId : `chat-${Date.now()}`;
    const message: Message = { role: 'user', text: attachment ? `${text}\n\n📎 ${attachment}` : text };
    if (view === 'conversation') setChats(items => items.map(chat => chat.id === id ? { ...chat, time: 'Just now', messages: [...chat.messages, message] } : chat));
    else setChats(items => [{ id, title: text.length > 54 ? `${text.slice(0, 54)}…` : text, time: 'Just now', messages: [message] }, ...items]);
    setActiveId(id); setView('conversation'); setPrompt(''); setAttachment(''); setBusy(true); setPopover('');
    setTimeout(() => { setChats(items => items.map(chat => chat.id === id ? { ...chat, messages: [...chat.messages, { role: 'assistant', text: demoReply(text) }] } : chat)); setBusy(false); }, 600);
  }
  async function copy(text: string) { try { await navigator.clipboard.writeText(text); setToast('Copied to clipboard'); } catch { setToast('Clipboard is unavailable in this browser'); } }

  const composer = <form className="composer" onSubmit={event => { event.preventDefault(); send(); }}>
    {attachment && <div className="attachment"><File size={14} /><span>{attachment}</span><Button aria-label="Remove attachment" onClick={() => setAttachment('')}><X size={13} /></Button></div>}
    <textarea ref={promptRef} aria-label="Message Claude" placeholder={view === 'conversation' ? 'Reply to Claude…' : 'How can I help you today?'} value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); } }} rows={2} />
    <div className="composer-toolbar"><div className="popover-anchor"><Button className="icon-button" aria-label="Add files or tools" aria-expanded={popover === 'tools'} onClick={() => setPopover(popover === 'tools' ? '' : 'tools')}><Plus size={21} /></Button>{popover === 'tools' && <div className="popup tools-popup"><Button onClick={() => { fileRef.current?.click(); setPopover(''); }}><Plus size={16} />Upload a file</Button><Button onClick={() => explain('Connect tools', 'Connectors are not configured in this local prototype. You can write a prompt and explore the conversation interface.')}><BriefcaseBusiness size={16} />Add from a connector</Button><Button onClick={() => { setExtended(!extended); setPopover(''); }}><Sparkles size={16} />{extended ? 'Disable' : 'Enable'} extended thinking</Button></div>}</div><div className="composer-spacer" /><div className="popover-anchor"><Button className="model-button" aria-label="Choose model" aria-expanded={popover === 'model'} onClick={() => setPopover(popover === 'model' ? '' : 'model')}>{model}<span>{extended ? 'Extended' : ''}</span><ChevronDown size={12} /></Button>{popover === 'model' && <div className="popup model-popup"><strong>Choose a model</strong>{[['Opus 4.6', 'Most capable for ambitious work'], ['Sonnet 4.6', 'Balanced for everyday tasks'], ['Haiku 4.5', 'Fast for simple questions']].map(([label, description]) => <Button key={label} onClick={() => { setModel(label); setPopover(''); }}><div><b>{label}</b><small>{description}</small></div>{model === label && <Check size={15} />}</Button>)}<label className="extended-toggle"><span>Extended thinking</span><input type="checkbox" checked={extended} onChange={e => setExtended(e.target.checked)} /></label></div>}</div>{prompt.trim() ? <Button className="send-button" aria-label="Send message" type="submit" disabled={busy}><ArrowUp size={20} /></Button> : <Button className="icon-button voice-button" aria-label="Voice input" onClick={() => explain('Voice input', 'Voice input is not connected in this interface study. Type your message to try the conversation.')}><AudioLines size={22} /></Button>}</div>
    <input ref={fileRef} type="file" className="sr-only" aria-label="Choose attachment" onChange={event => { const file = event.target.files?.[0]; if (file) setAttachment(file.name); }} />
  </form>;

  return <div className={`claude-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
    {mobileOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header"><Button className="wordmark" onClick={newChat}>Claude</Button><Button className="icon-button" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)}><PanelLeft size={17} /></Button></div>
      <nav aria-label="Main navigation"><Button className="nav-item" onClick={newChat}><span className="new-chat-icon"><Plus size={18} /></span><span>New chat</span></Button><Button className="nav-item" onClick={() => { navigate('chats'); setTimeout(() => document.getElementById('chat-search')?.focus(), 50); }}><Search /><span>Search</span></Button><Button className="nav-item" onClick={() => explain('Customize Claude', 'Choose the style that works for you. This preference changes the visible style selection in this local prototype.')}><BriefcaseBusiness /><span>Customize</span></Button><div className="nav-gap" /><Button className={`nav-item ${view === 'chats' ? 'active' : ''}`} onClick={() => navigate('chats')}><MessagesSquare /><span>Chats</span></Button><Button className="nav-item" onClick={() => explain('Projects', 'Keep related conversations in one place. Create a new chat to explore ideas for your next project.')}><Archive /><span>Projects</span></Button><Button className="nav-item" onClick={() => setAnnouncement(true)}><Shapes /><span>Artifacts</span></Button><Button className="nav-item" onClick={() => { newChat(); setPrompt('Help me build a website'); }}><CodeXml /><span>Code</span></Button></nav>
      <div className="sidebar-chats"><span className="section-label">Starred</span>{chats.filter(chat => chat.starred).map(chat => <Button key={chat.id} className={`recent-chat ${activeId === chat.id && view === 'conversation' ? 'active' : ''}`} onClick={() => openChat(chat)}>{chat.title}</Button>)}<span className="section-label">Recents</span>{chats.slice(0, 6).filter(chat => !chat.starred).map(chat => <Button key={chat.id} className={`recent-chat ${activeId === chat.id && view === 'conversation' ? 'active' : ''}`} onClick={() => openChat(chat)}>{chat.title}</Button>)}</div>
      <div className="account-area"><Button className="account-button" aria-label="Account menu" aria-expanded={accountOpen} onClick={() => setAccountOpen(!accountOpen)}><span className="avatar">SL</span><span className="account-name">{name} Lee<small>Pro plan</small></span><ChevronsUpDown size={13} /></Button><Button className="download-button" aria-label="Get desktop app" onClick={() => explain('Get apps and extensions', 'This is the browser interface study. No application download is required.')}><Download size={17} /><i /></Button>{accountOpen && <div className="popup account-popup"><p>samlee.mobbin@gmail.com</p><Button onClick={() => explain('Settings', 'Personalize your display name for this local workspace.')}><Settings size={16} />Settings</Button><Button onClick={() => explain('Language', 'The reference interface is presented in English (United States).')}><Globe size={16} />Language <ChevronRight size={14} /></Button><Button onClick={() => explain('Get help', 'New chat starts a conversation. Enter sends your message; Shift+Enter adds a new line. Chats lets you search your local history.')}><HelpCircle size={16} />Get help</Button><hr /><Button onClick={() => setAnnouncement(true)}><Sparkles size={16} />What’s new</Button><Button onClick={() => explain('About this workspace', 'A local frontend study based on Mobbin screenshots. Responses are deterministic demo content; no AI API or Claude account is connected.')}><Info size={16} />Learn more</Button></div>}</div>
    </aside>

    <main className={`main-content ${view === 'conversation' ? 'conversation-view' : ''}`}>
      <header className="topbar"><Button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu size={20} /></Button>{view === 'conversation' && <><Button className="chat-title" onClick={() => setPopover(popover === 'chat' ? '' : 'chat')}>{activeChat?.title}<ChevronDown size={13} /></Button>{popover === 'chat' && <div className="popup chat-popup"><Button onClick={() => { setChats(items => items.map(chat => chat.id === activeId ? { ...chat, starred: !chat.starred } : chat)); setPopover(''); }}><Star size={15} />{activeChat?.starred ? 'Unstar chat' : 'Star chat'}</Button><Button onClick={() => copy(activeChat?.messages.map(message => `${message.role}: ${message.text}`).join('\n\n') || '')}><Copy size={15} />Copy conversation</Button></div>}</>}<div className="composer-spacer" /><Button className={`icon-button ghost-button ${incognito ? 'incognito-active' : ''}`} aria-label={incognito ? 'Turn off incognito' : 'Turn on incognito'} aria-pressed={incognito} onClick={toggleIncognito}><Ghost size={19} /></Button></header>
      {view === 'home' && <div className="home-content"><h1><ClaudeMark />Welcome, {name}</h1>{composer}</div>}
      {view === 'chats' && <div className="chats-content"><div className="chats-heading"><h1>Chats</h1><Button className="black-button" onClick={newChat}><Plus size={17} />New chat</Button></div><div className="search-box"><Search size={20} /><input id="chat-search" placeholder="Search your chats..." aria-label="Search your chats" value={query} onChange={e => setQuery(e.target.value)} />{query && <Button aria-label="Clear search" className="icon-button" onClick={() => setQuery('')}><X size={14} /></Button>}</div><div className="chats-subheading"><span>Your chats with Claude</span><Button className="text-link" onClick={() => { setSelectMode(!selectMode); setSelected([]); }}>{selectMode ? 'Cancel' : 'Select'}</Button>{selectMode && selected.length > 0 && <span className="selected-count">{selected.length} selected</span>}</div><div className="chat-list">{chats.filter(chat => chat.title.toLowerCase().includes(query.toLowerCase())).map(chat => <div className="chat-row" key={chat.id}>{selectMode && <input type="checkbox" aria-label={`Select ${chat.title}`} checked={selected.includes(chat.id)} onChange={e => setSelected(items => e.target.checked ? [...items, chat.id] : items.filter(id => id !== chat.id))} />}<Button className="chat-row-content" onClick={() => openChat(chat)}><strong>{chat.title}</strong><small>Last message {chat.time}</small></Button><Button className={`icon-button star-chat ${chat.starred ? 'is-starred' : ''}`} aria-label={`${chat.starred ? 'Unstar' : 'Star'} ${chat.title}`} onClick={() => setChats(items => items.map(item => item.id === chat.id ? { ...item, starred: !item.starred } : item))}><Star size={16} fill={chat.starred ? 'currentColor' : 'none'} /></Button></div>)}{!chats.some(chat => chat.title.toLowerCase().includes(query.toLowerCase())) && <div className="no-results"><Search size={24} /><p>No chats found for “{query}”</p></div>}</div></div>}
      {view === 'conversation' && <><div className="conversation-messages">{activeChat?.messages.map((message, index) => <div className={`message message-${message.role}`} key={`${activeId}-${index}`}>{message.role === 'assistant' && <ClaudeMark size={27} />}<div className="message-content"><p>{message.text}</p>{message.role === 'assistant' && <div className="message-actions"><Button className="icon-button" aria-label="Copy response" onClick={() => copy(message.text)}><Copy size={14} /></Button><Button className={`icon-button ${liked[`${activeId}-${index}`] === 'up' ? 'feedback-active' : ''}`} aria-label="Good response" aria-pressed={liked[`${activeId}-${index}`] === 'up'} onClick={() => setLiked(items => ({ ...items, [`${activeId}-${index}`]: 'up' }))}><ThumbsUp size={14} /></Button><Button className={`icon-button ${liked[`${activeId}-${index}`] === 'down' ? 'feedback-active' : ''}`} aria-label="Bad response" aria-pressed={liked[`${activeId}-${index}`] === 'down'} onClick={() => setLiked(items => ({ ...items, [`${activeId}-${index}`]: 'down' }))}><ThumbsDown size={14} /></Button></div>}</div></div>)}{busy && <div className="thinking" role="status"><ClaudeMark size={25} /><span>Thinking…</span></div>}<div ref={bottomRef} /></div><div className="conversation-composer">{composer}<p className="composer-note">Claude can make mistakes. Please double-check responses.</p></div></>}
    </main>

    <Dialog open={Boolean(info)} onOpenChange={open => { if (!open) setInfo(null); }}><DialogBackdrop className="dialog-backdrop" /><DialogContent className="info-dialog"><div className="dialog-heading"><DialogTitle>{info?.title}</DialogTitle><DialogClose className="icon-button" aria-label="Close dialog"><X size={18} /></DialogClose></div><DialogDescription>{info?.text}</DialogDescription>{info?.title === 'Customize Claude' && <label className="settings-field">Response style<select value={tone} onChange={e => setTone(e.target.value)}>{['Normal', 'Concise', 'Explanatory', 'Formal'].map(item => <option key={item}>{item}</option>)}</select></label>}{info?.title === 'Settings' && <label className="settings-field">Display name<input value={name} onChange={e => setName(e.target.value)} /></label>}<DialogClose className="black-button">Done</DialogClose></DialogContent></Dialog>
    <Dialog open={announcement} onOpenChange={setAnnouncement}><DialogBackdrop className="dialog-backdrop" /><DialogContent className="announcement-dialog"><div className="announcement-art"><h2><ClaudeMark size={24} />Back at it, Andrea</h2><div className="mini-composer">Ugh my structures class is getting intense. How does weight actually travel through a building from the roof all the way down to the ground? I need to see the load path<div><Plus size={13} /><span>Opus 4.6 <ChevronDown size={10} /></span><i><ArrowUp size={13} /></i></div></div></div><div className="announcement-copy"><span className="beta">Beta</span><DialogTitle>Ask Claude to show you</DialogTitle><DialogDescription>Claude can now build custom charts, diagrams, and interactive visuals right in the conversation when showing beats telling.</DialogDescription><DialogClose className="black-button" onClick={() => { newChat(); setPrompt('Help me understand how a building carries weight'); }}>See it work</DialogClose></div><DialogClose className="icon-button announcement-close" aria-label="Close announcement"><X size={17} /></DialogClose></DialogContent></Dialog>
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
