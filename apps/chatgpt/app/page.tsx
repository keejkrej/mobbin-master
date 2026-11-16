'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@study/ui';
import { ArrowUp, Check, ChevronDown, Copy, Ellipsis, FolderPlus, Image as ImageIcon, LayoutGrid, Mic, PanelLeft, Paperclip, Plus, Search, Share, Sparkles, SquarePen, Terminal, ThumbsDown, ThumbsUp, Volume2, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };
type Chat = { id: string; title: string; messages: Message[] };
type Screen = 'group' | 'new' | 'image' | 'chat';
type Modal = 'search' | 'share' | 'upgrade' | 'apps' | 'projects' | 'voice' | 'settings' | null;

const histories = ['2026 Matcha Nutty Flavors', 'Matcha Industry and Globaliz...', 'Shading Tea Plants Effects', 'Iced Matcha Latte Description', 'Plushie Style Transformation', 'Best Matcha Latte Recipe', 'Example chat: Ask anything', 'Example chat: Easy uploads', 'Example chat: Picture this'];
const initialChats: Chat[] = histories.map((title, i) => ({ id: String(i), title, messages: [{ role: 'user', content: title === 'Best Matcha Latte Recipe' ? 'How do I make a good matcha latte at home?' : title }, { role: 'assistant', content: title.includes('Matcha') || title.includes('matcha') ? 'For a smooth matcha latte, sift 2 teaspoons of matcha into a bowl. Add 60 ml of warm water and whisk in a quick W motion until frothy. Pour over ice and add 180 ml of your favorite milk. A little maple syrup brings out the tea’s natural sweetness.' : 'We can start with your idea and break it into a few simple steps. Tell me what you would like to explore, and I’ll help you shape it.' }] }));

const plushiePrompt = 'Transform the subject or image into an adorable plushie-style form with soft textures and rounded proportions. If a person is present, preserve recognizable traits; otherwise, reinterpret the object or animal as a cozy stuffed toy using felt or fleece textures. Give it a cozy felt or fleece texture, simplified shapes, and gentle embroidered details for the eyes, mouth, and features. Use a warm, pastel or neutral color palette with smooth shading and subtle seams, like a handcrafted stuffed toy. Keep the expression friendly and cute, with a slightly oversized head, short limbs, and a cuddly silhouette. The final image should feel like a charming, collectible plush toy — cozy, wholesome, and huggable, while still recognizable as the original subject.';

function localReply(prompt: string) {
  if (/matcha|tea|osaka/i.test(prompt)) return 'A lovely place to start is the Namba neighborhood. Matcha House is known for matcha desserts, while Green Tea & Sweets CAFE Osaka Chakai is a quieter spot for a bowl of freshly whisked tea. For a quick stop, look for a Japanese tea stand near your route. Would you like a short afternoon itinerary?';
  if (/code|react|website|design/i.test(prompt)) return 'Start with a small, clear component and define its states before adding details. A useful first pass is to separate layout, reusable styles, and the interaction state. Then check keyboard navigation and a narrow screen. What part would you like to work through first?';
  if (/trip|travel|plan/i.test(prompt)) return 'Let’s keep the plan relaxed: pick one main activity each day, leave time for a long lunch, and save a few nearby places to explore. Tell me your destination, dates, and what you enjoy, and we can make a simple itinerary.';
  return 'Let’s work through that together. A useful starting point is to define the outcome you want, gather the details you already have, and choose one small next step. What would a successful result look like for you?';
}

export default function ChatGPTStudy() {
  const [screen, setScreen] = useState<Screen>('group');
  const [sidebar, setSidebar] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [modal, setModal] = useState<Modal>(null);
  const [query, setQuery] = useState('');
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState('ChatGPT');
  const [attachMenu, setAttachMenu] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState<string[]>([]);
  const [plus, setPlus] = useState(false);
  const [showPlus, setShowPlus] = useState(true);
  const [voice, setVoice] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const sidebarElement = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeChat = chats.find(chat => chat.id === activeId);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    setMobile(media.matches);
    if (media.matches) setSidebar(false);
    const onChange = (event: MediaQueryListEvent) => { setMobile(event.matches); setSidebar(!event.matches); };
    media.addEventListener('change', onChange);
    setShareUrl(window.location.href);
    return () => media.removeEventListener('change', onChange);
  }, []);
  useEffect(() => { if (mobile && sidebar) sidebarElement.current?.querySelector<HTMLButtonElement>('button[aria-label="Close sidebar"]')?.focus(); }, [sidebar, mobile]);
  useEffect(() => { if (screen === 'chat') messageEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChat?.messages.length, pending, screen]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 3000); return () => clearTimeout(id); }, [toast]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function newChat() { setScreen('new'); setActiveId(null); setDraft(''); setAttachment(null); setModelOpen(false); if (mobile) setSidebar(false); setTimeout(() => textarea.current?.focus(), 0); }
  function openChat(chat: Chat) { setActiveId(chat.id); setScreen(chat.id === '4' ? 'image' : 'chat'); setModal(null); setQuery(''); setDraft(''); if (mobile) setSidebar(false); }
  function sidebarKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (!mobile) return;
    if (event.key === 'Escape') { setSidebar(false); return; }
    if (event.key !== 'Tab') return;
    const controls = sidebarElement.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
    if (!controls?.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  function submit(event?: React.FormEvent) {
    event?.preventDefault();
    if ((!draft.trim() && !attachment) || pending) return;
    const content = draft.trim() || `Tell me about ${attachment}`;
    const id = screen === 'chat' && activeId ? activeId : `chat-${Date.now()}`;
    if (screen === 'chat' && activeId) setChats(prev => prev.map(chat => chat.id === id ? { ...chat, messages: [...chat.messages, { role: 'user', content }] } : chat));
    else setChats(prev => [{ id, title: content.slice(0, 30), messages: [{ role: 'user', content }] }, ...prev]);
    setScreen('chat'); setActiveId(id); setDraft(''); setAttachment(null); setPending(true);
    timer.current = setTimeout(() => { setChats(prev => prev.map(chat => chat.id === id ? { ...chat, messages: [...chat.messages, { role: 'assistant', content: localReply(content) }] } : chat)); setPending(false); }, 650);
  }
  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); setCopied(true); setToast('Copied to clipboard'); setTimeout(() => setCopied(false), 2000); }
    catch { setToast('Copy isn’t available in this browser. Select the link to copy it.'); }
  }
  function selectNav(name: Modal) { setModal(name); setModelOpen(false); if (mobile) setSidebar(false); }

  const title = screen === 'group' ? 'Osaka trip' : model;
  const modalTitle: Record<Exclude<Modal, null>, string> = { search: 'Search chats', share: 'Share this conversation', upgrade: 'Upgrade your plan', apps: 'Apps', projects: 'Create a project', voice: 'Voice mode', settings: 'Settings' };

  return (
    <div className={`gpt-shell ${sidebar ? '' : 'sidebar-collapsed'}`}>
      {sidebar && <aside ref={sidebarElement} className="gpt-sidebar" aria-label="Chat history" role={mobile ? 'dialog' : undefined} aria-modal={mobile ? true : undefined} onKeyDown={sidebarKeyDown}>
        <div className="sidebar-top"><Button className="icon-button logo-button" aria-label="ChatGPT home" onClick={newChat}><img src="/chatgpt/assets/chatgpt-logo.webp" alt="" /></Button><Button className="icon-button" aria-label="Close sidebar" onClick={() => setSidebar(false)}><PanelLeft size={20} /></Button></div>
        <nav className="main-nav" aria-label="Main navigation">
          <Button onClick={newChat}><SquarePen /><span>New chat</span></Button>
          <Button onClick={() => selectNav('search')}><Search /><span>Search chats</span></Button>
          <Button onClick={() => { setScreen('image'); if (mobile) setSidebar(false); }}><ImageIcon /><span>Images</span></Button>
          <Button onClick={() => selectNav('apps')}><LayoutGrid /><span>Apps</span></Button>
          <Button onClick={() => { newChat(); setDraft('Help me build a small React app'); }}><Terminal /><span>Codex</span></Button>
          <Button onClick={() => selectNav('projects')}><FolderPlus /><span>Projects</span></Button>
        </nav>
        <div className="history-scroll">
          <div className="sidebar-label">Group chats</div>
          <Button className={`history-item group-link ${screen === 'group' ? 'selected' : ''}`} onClick={() => { setScreen('group'); setActiveId(null); if (mobile) setSidebar(false); }}><span>Osaka trip</span><span className="unread" /><span className="avatar avatar-tiny">SL</span></Button>
          {projects.length > 0 && <><div className="sidebar-label">Projects</div>{projects.map(project => <Button key={project} className="history-item" onClick={() => { newChat(); setDraft(`Help me with ${project}`); }}><FolderPlus size={16}/>{project}</Button>)}</>}
          <div className="sidebar-label chats-label">Your chats</div>
          {chats.map(chat => <Button key={chat.id} className={`history-item ${screen === 'chat' && activeId === chat.id ? 'selected' : ''}`} onClick={() => openChat(chat)}>{chat.title}</Button>)}
        </div>
        <div className="account-row"><Button className="account-button" onClick={() => selectNav('settings')}><span className="avatar avatar-blue">AS</span><span>Alex Smith<small>{plus ? 'Plus preview' : 'Free'}</small></span></Button><Button className="upgrade-small" onClick={() => selectNav('upgrade')}>Upgrade</Button></div>
      </aside>}
      <main className="gpt-main" inert={mobile && sidebar}>
        <header className={`topbar ${screen === 'group' ? 'group-topbar' : ''}`}>
          <div className="topbar-left">{!sidebar && <Button className="icon-button" aria-label="Open sidebar" onClick={() => setSidebar(true)}><PanelLeft size={21}/></Button>}<div className="model-picker"><Button className="model-button" aria-expanded={modelOpen} onClick={() => setModelOpen(!modelOpen)}>{title}<ChevronDown size={16}/></Button>{modelOpen && <div className="popover model-menu">{['ChatGPT', 'Instant', 'Thinking'].map(item => <Button key={item} onClick={() => { setModel(item); setModelOpen(false); if (screen === 'group') newChat(); }}><span>{item}<small>{item === 'Instant' ? 'Answers right away' : item === 'Thinking' ? 'Thinks through your request' : 'Your everyday assistant'}</small></span>{model === item && <Check size={16}/>}</Button>)}</div>}</div></div>
          {screen !== 'group' && showPlus && <div className="plus-prompt"><Button onClick={() => selectNav('upgrade')}><Sparkles size={15} fill="currentColor"/>Get Plus</Button><Button aria-label="Dismiss Get Plus" onClick={() => setShowPlus(false)}><X size={13}/></Button></div>}
          <div className="topbar-right">{screen === 'group' ? <Button className="avatar" aria-label="Group members" onClick={() => selectNav('share')}>SL</Button> : <><Button className="share-button" onClick={() => selectNav('share')}><Share size={18}/><span>Share</span></Button><Button className="icon-button" aria-label="Conversation options" onClick={() => selectNav('settings')}><Ellipsis size={20}/></Button></>}</div>
        </header>

        <div className={`conversation-scroll ${screen === 'new' ? 'new-chat-scroll' : ''}`}>
          {screen === 'group' && <article className="conversation group-conversation">
            <div className="group-events"><p><strong>Today</strong> 10:30 PM</p><p><strong>Alex Smith</strong> created the group chat.</p><p>Your personal ChatGPT memory is never used in group chats.</p><Button className="outline-button" onClick={() => selectNav('share')}>Invite with link</Button><div className="event-stack"><p><strong>Alex Smith</strong> reset the group link.</p><p><strong>Alex Smith</strong> deleted the group link.</p><p><strong>Alex Smith</strong> created a new group link.</p><p><strong>Sam Lee</strong> joined the group chat.</p></div></div>
            <div className="group-question"><span className="avatar">SL</span><div><div className="author">Sam Lee</div><div className="message-bubble">Where can we find good matcha in Osaka?</div></div></div>
            <div className="self-message"><div className="message-bubble">I don&apos;t really know either, let&apos;s ask @ChatGPT</div></div>
            <div className="assistant-message"><div className="author">ChatGPT</div><p>Here are some great places in <strong>Osaka, Japan</strong> where you can enjoy <em>matcha drinks, desserts, and sweets</em> — perfect for a matcha stop while exploring the city: <span className="citation">MACCHA HOUSE +1</span></p><h2>🍵 Matcha &amp; Green Tea Cafés</h2><p className="cafe-list">☕ <strong>Matcha House</strong> – Popular matcha dessert spot in Namba. Famous for their Uji matcha tiramisu and soft-serve, this is a must-visit for matcha lovers. <span className="citation">MACCHA HOUSE</span><br/>🍃 <strong>Green Tea &amp; Sweets CAFE Osaka Chakai</strong> – Chill café on Tenjinbashisuji Street with freshly ground matcha, tea bowls, and sweets — great for a relaxing tea experience. <span className="citation">Matcha Guide</span><br/>🍵 <strong>CHADO</strong> – Highly rated café with quality green tea drinks and light snacks.<br/>🍵 <strong>SHIKI JAPANESE TEA ｜ 抹茶・日本茶スタンド</strong> – Stylish tea stand serving matcha and other Japanese teas — perfect for a quick matcha fix.<br/>☕ <strong>Kakejiku Chaya (Tanaka Hyougu)</strong> – Hidden gem in Umeda with great reviews and excellent tea.</p><div className="reply-actions"><Button className="icon-button" aria-label="Copy response" onClick={() => copy('Matcha House, Green Tea & Sweets CAFE Osaka Chakai, CHADO, SHIKI JAPANESE TEA, Kakejiku Chaya.')}><Copy size={16}/></Button><Button className={`icon-button ${feedback === 'up' ? 'feedback-selected' : ''}`} aria-label="Good response" onClick={() => setFeedback(feedback === 'up' ? null : 'up')}><ThumbsUp size={16}/></Button><Button className={`icon-button ${feedback === 'down' ? 'feedback-selected' : ''}`} aria-label="Bad response" onClick={() => setFeedback(feedback === 'down' ? null : 'down')}><ThumbsDown size={16}/></Button></div></div>
          </article>}
          {screen === 'new' && <div className="new-chat"><h1>What can I help with?</h1><p className="new-chat-hint">Ask anything, or try something new.</p></div>}
          {screen === 'image' && <article className="conversation image-conversation"><div className="image-message"><img className="room-photo" src="/chatgpt/assets/living-room.webp" alt="A bright living room with a yellow sofa and open wooden staircase"/><div className="message-bubble">{plushiePrompt}</div></div><div className="image-response"><Sparkles size={18}/><span>A softer take on your space</span><p>Imagine the yellow sofa in warm felt, the cushions as tiny embroidered pillows, and the wooden staircase wrapped in soft cream fleece. Rounded edges and gentle stitching turn the room into a cozy miniature.</p></div></article>}
          {screen === 'chat' && <article className="conversation custom-conversation" aria-live="polite">{activeChat?.messages.map((message, index) => <div key={index} className={message.role === 'user' ? 'self-message' : 'assistant-message'}>{message.role === 'user' ? <div className="message-bubble">{message.content}</div> : <><p>{message.content}</p><div className="reply-actions"><Button className="icon-button" aria-label="Copy response" onClick={() => copy(message.content)}><Copy size={16}/></Button><Button className="icon-button" aria-label="Read response aloud" onClick={() => { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(message.content)); } else setToast('Read aloud is unavailable in this browser.'); }}><Volume2 size={16}/></Button></div></>}</div>)}{pending && <div className="thinking" role="status"><span/>Thinking</div>}<div ref={messageEnd}/></article>}
        </div>
        <div className={`composer-zone ${screen === 'new' ? 'composer-centered' : ''}`}>
          <form className={`composer ${draft.includes('\n') || draft.length > 100 ? 'composer-expanded' : ''}`} onSubmit={submit}>
            {attachment && <div className="attachment-chip"><Paperclip size={15}/><span>{attachment}</span><Button type="button" aria-label="Remove attachment" onClick={() => setAttachment(null)}><X size={14}/></Button></div>}
            <div className="composer-row"><div className="attachment-control"><Button type="button" className="icon-button add-button" aria-label="Add attachment" aria-expanded={attachMenu} onClick={() => setAttachMenu(!attachMenu)}><Plus size={24}/></Button>{attachMenu && <div className="popover attachment-menu"><Button onClick={() => { fileInput.current?.click(); setAttachMenu(false); }}><Paperclip size={18}/>Add photos &amp; files</Button><Button onClick={() => { setDraft('Create an image of '); setAttachMenu(false); textarea.current?.focus(); }}><ImageIcon size={18}/>Create image</Button><Button onClick={() => { setDraft('Search the web for '); setAttachMenu(false); textarea.current?.focus(); }}><Search size={18}/>Search</Button></div>}</div><textarea ref={textarea} aria-label="Message ChatGPT" placeholder={screen === 'group' ? 'Send a message or @ChatGPT' : 'Ask anything'} rows={1} value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); } }}/>{screen !== 'group' && <Button type="button" className="icon-button microphone" aria-label="Use voice" onClick={() => selectNav('voice')}><Mic size={20}/></Button>}<Button className={`send-button ${draft.trim() || attachment ? 'send-ready' : ''}`} type="submit" disabled={(!draft.trim() && !attachment) || pending} aria-label="Send message"><ArrowUp size={21}/></Button></div>
          </form>
          <p className="composer-caption">ChatGPT can make mistakes. Check important info.{screen === 'group' ? ' Your personal ChatGPT memory is never used in group chats.' : <> See <Button onClick={() => selectNav('settings')}>Cookie Preferences.</Button></>}</p>
          {screen === 'new' && <div className="suggestions">{['Plan a trip', 'Write something', 'Make a plan', 'Learn something new'].map(text => <Button key={text} onClick={() => { setDraft(text); textarea.current?.focus(); }}>{text}</Button>)}</div>}
        </div>
        <input type="file" aria-label="Attach a file" ref={fileInput} className="sr-only" tabIndex={-1} onChange={event => { setAttachment(event.target.files?.[0]?.name ?? null); setToast('File selected for this local conversation'); event.target.value = ''; }}/>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}

      <Dialog open={modal !== null} onOpenChange={open => { if (!open) { setModal(null); setVoice(false); } }}>
        <DialogContent className={`gpt-dialog ${modal === 'search' ? 'search-dialog' : ''}`}>
          <div className="dialog-heading"><DialogTitle>{modal ? modalTitle[modal] : ''}</DialogTitle><DialogClose className="icon-button" aria-label="Close dialog"><X size={20}/></DialogClose></div>
          <DialogDescription className="sr-only">{modal === 'search' ? 'Find and open a conversation from your chat history.' : 'A local interactive preview. No information is sent to an external service.'}</DialogDescription>
          {modal === 'search' && <><div className="search-input"><Search size={20}/><input autoFocus placeholder="Search chats..." aria-label="Search chat history" value={query} onChange={event => setQuery(event.target.value)}/></div><div className="search-results"><Button onClick={() => { newChat(); setModal(null); }}><SquarePen size={18}/>New chat</Button>{'osaka trip'.includes(query.toLowerCase()) && <Button onClick={() => { setScreen('group'); setModal(null); }}><span className="search-result-icon">◌</span>Osaka trip<span className="result-type">Group chat</span></Button>}{chats.filter(chat => chat.title.toLowerCase().includes(query.toLowerCase())).map(chat => <Button key={chat.id} onClick={() => openChat(chat)}><span className="search-result-icon">◌</span>{chat.title}</Button>)}{query && !chats.some(chat => chat.title.toLowerCase().includes(query.toLowerCase())) && !'osaka trip'.includes(query.toLowerCase()) && <p className="empty-results">No chats found for “{query}”.</p>}</div></>}
          {modal === 'share' && <div className="dialog-body"><p>Share a link to {screen === 'group' ? 'Osaka trip' : 'this conversation'}.</p><div className="share-preview"><img src="/chatgpt/assets/chatgpt-logo.webp" alt=""/><strong>{screen === 'group' ? 'Osaka trip' : activeChat?.title ?? 'A conversation with ChatGPT'}</strong><span>This is a local preview link.</span></div><input className="text-input" readOnly aria-label="Conversation link" value={shareUrl}/><Button className="primary-button" onClick={() => copy(window.location.href)}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? 'Copied' : 'Copy link'}</Button></div>}
          {modal === 'upgrade' && <div className="dialog-body"><p>More room for your ideas.</p><div className="plan-card"><h3>Plus <span>$20 <small>/ month</small></span></h3><ul><li>More messages and uploads</li><li>Expanded image creation</li><li>More time with advanced tools</li></ul><Button className="primary-button" onClick={() => { setPlus(!plus); setModal(null); setToast(plus ? 'Switched to Free preview' : 'Plus preview selected'); }}>{plus ? 'Return to Free preview' : 'Preview Plus'}</Button></div><p className="fine-print">Plan preview only. No purchase or account change.</p></div>}
          {modal === 'apps' && <div className="dialog-body"><p>Bring your favorite tools into the conversation.</p><div className="app-grid">{[{ name: 'Writing', icon: '✎', prompt: 'Help me write a thoughtful note' }, { name: 'Study', icon: '⌘', prompt: 'Help me learn something new' }, { name: 'Travel', icon: '↗', prompt: 'Help me plan a trip' }, { name: 'Code', icon: '</>', prompt: 'Help me build a React component' }].map(app => <Button key={app.name} onClick={() => { newChat(); setDraft(app.prompt); setModal(null); }}><span>{app.icon}</span><strong>{app.name}</strong></Button>)}</div></div>}
          {modal === 'projects' && <form className="dialog-body" onSubmit={event => { event.preventDefault(); if (!projectName.trim()) return; setProjects([...projects, projectName.trim()]); setProjectName(''); setModal(null); setToast('Project created'); }}><p>Keep related chats together in a project.</p><label htmlFor="project-name">Project name</label><input id="project-name" className="text-input" autoFocus placeholder="My project" value={projectName} onChange={event => setProjectName(event.target.value)}/><Button className="primary-button" type="submit" disabled={!projectName.trim()}>Create project</Button></form>}
          {modal === 'voice' && <div className="dialog-body voice-body"><div className={`voice-orb ${voice ? 'voice-active' : ''}`}/><h3>{voice ? 'Listening preview' : 'Ready when you are'}</h3><p>{voice ? 'Use the sample phrase below to try a voice conversation.' : 'Try a voice conversation with a sample phrase.'}</p><Button className="primary-button" onClick={() => { if (!voice) setVoice(true); else { setDraft('Where can we find good matcha in Osaka?'); setModal(null); setVoice(false); } }}>{voice ? 'Use sample phrase' : 'Start preview'}</Button></div>}
          {modal === 'settings' && <div className="dialog-body settings-body"><div><strong>Account</strong><span>Alex Smith · {plus ? 'Plus preview' : 'Free'}</span></div><div><strong>Appearance</strong><span>Light</span></div><div><strong>Data</strong><span>Conversations stay in this browser session.</span></div><p>This design study uses local sample replies. It does not connect to ChatGPT, upload files, or create shared links.</p><DialogClose className="primary-button">Done</DialogClose></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
