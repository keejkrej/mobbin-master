"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp, Check, ChevronDown, Copy, Diamond, FileText, Grid2X2,
  Image as ImageIcon, Menu, Mic, MoreVertical, Notebook, PanelLeft, PencilLine,
  Plus, Search, Settings, ThumbsDown, ThumbsUp, Video, X,
} from "lucide-react";
import {
  Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Toggle,
} from "@study/ui";

type Message = { role: "user" | "assistant"; text: string; attachment?: { name: string; url?: string } };
type HistoryItem = { id: string; title: string; messages: Message[] };
type MenuKind = "model" | "attachment" | "settings" | "account" | null;
type Panel = "home" | "Images" | "Videos" | "Library" | "Gems" | "notebook";
const startingTitles = [
  "Funny Music Style Options", "Ethereal conservatory portrait", "Generating ASMobbin Anniversary Video",
  "Create an illustration for this image", "Competitive Analysis: Project Nebula", "Plant Watering Tracker Web App",
  "Math Homework Help", "Chess Game: e4 c5", "📖 The Muggle’s Struggle", "Fun Picnic Ideas For Kids",
  "Daily Task Planning and Scheduling", "Coding Homework Review Request",
];
const initialHistory: HistoryItem[] = startingTitles.map((title, index) => ({
  id: "history-" + index, title,
  messages: [
    { role: "user", text: title },
    { role: "assistant", text: "Let’s make a start. Here are a few ideas to explore:\n\n1. Start with the outcome you want to create.\n2. Break the idea into a few small, manageable steps.\n3. Try the first version, then refine what works.\n\nWhat would you like to focus on first?" },
  ],
}));
function GeminiMark({ className = "" }: { className?: string }) {
  return <svg className={"gemini-mark " + className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <defs><linearGradient id="gemini-spectrum" x1="5" y1="6" x2="26" y2="25" gradientUnits="userSpaceOnUse">
      <stop stopColor="#EA4335" /><stop offset=".25" stopColor="#FBBC05" /><stop offset=".48" stopColor="#34A853" />
      <stop offset=".7" stopColor="#4285F4" /><stop offset="1" stopColor="#A56CFF" />
    </linearGradient></defs>
    <path d="M16 1C18.9 9.8 22.1 13.1 31 16C22.1 18.9 18.9 22.1 16 31C13.1 22.1 9.8 18.9 1 16C9.8 13.1 13.1 9.8 16 1Z" fill="url(#gemini-spectrum)" />
  </svg>;
}
function TemporaryIcon() {
  return <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M10 15 19 6a3.2 3.2 0 0 1 4.5 4.5l-9 9a5.4 5.4 0 0 1-7.6-7.6l8.5-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 4a12 12 0 1 0 16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray=".2 4.5" />
  </svg>;
}
function replyTo(prompt: string) {
  const lower = prompt.toLowerCase();
  if (/music|song|playlist/.test(lower)) return "Here are a few directions for your playlist:\n\n• Indie sunshine — bright guitars, easy rhythms, and a little nostalgia.\n• A quiet afternoon — soft piano, warm ambient textures, and mellow vocals.\n• After hours — smooth electronic beats and late-night jazz.\n\nTell me the mood, and we can narrow it down.";
  if (/plan|trip|picnic/.test(lower)) return "Here’s a simple plan to get you started:\n\n1. Pick a place and set aside a little extra time.\n2. Make a short list of the things you really want to do.\n3. Keep one part of the day open for something unexpected.\n\nWould you like a more detailed itinerary?";
  if (/code|website|app/.test(lower)) return "Let’s break it into a small first version:\n\n• Define the main thing someone should be able to do.\n• Create a clear screen with one primary action.\n• Use a few realistic examples to check the flow.\n• Add the next feature only when the first one feels right.\n\nWhat would you like to build first?";
  return "That’s an interesting starting point. Here’s one way to approach it:\n\n• Start with the key idea and what you want to learn.\n• Explore a few different perspectives.\n• Turn the most useful direction into a simple next step.\n\nTell me a little more about what you have in mind.";
}

export default function GeminiPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [temporary, setTemporary] = useState(false);
  const [panel, setPanel] = useState<Panel>("home");
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState("Flash");
  const [menu, setMenu] = useState<MenuKind>(null);
  const [toast, setToast] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceDraft, setVoiceDraft] = useState("");
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [notebooks, setNotebooks] = useState(["ASMobbin", "Native with AI"]);
  const [activeNotebook, setActiveNotebook] = useState("");
  const [appearance, setAppearance] = useState("Light");
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [attachment, setAttachment] = useState<{ name: string; url?: string } | null>(null);
  const [historyMenu, setHistoryMenu] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const composerInput = useRef<HTMLTextAreaElement>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => { setIsMobile(media.matches); if (!media.matches) setMobileOpen(false); };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenu(null); setHistoryMenu(null); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);
  useEffect(() => { conversationEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages.length]);
  useEffect(() => {
    if (!menu && !historyMenu) return;
    const close = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-menu-area]")) { setMenu(null); setHistoryMenu(null); }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menu, historyMenu]);

  function newChat() {
    setPanel("home"); setMessages([]); setActiveChat(null); setDraft(""); setAttachment(null); setMenu(null); setMobileOpen(false);
  }
  function openHistory(item: HistoryItem) {
    setTemporary(false); setMessages(item.messages); setActiveChat(item.id); setPanel("home"); setSearchOpen(false); setMenu(null); setMobileOpen(false);
  }
  function changeTemporary() {
    const next = !temporary;
    setTemporary(next); setCollapsed(next); newChat();
  }
  function sendMessage() {
    const text = draft.trim();
    if (!text && !attachment) return;
    const userMessage: Message = { role: "user", text: text || "Tell me about this file.", ...(attachment ? { attachment } : {}) };
    const nextMessages: Message[] = [...messages, userMessage, { role: "assistant", text: replyTo(text) }];
    setMessages(nextMessages); setDraft(""); setAttachment(null); setPanel("home");
    if (!temporary) {
      const id = activeChat || "chat-" + Date.now();
      setActiveChat(id);
      setHistory(old => activeChat
        ? old.map(item => item.id === id ? { ...item, messages: nextMessages } : item)
        : [{ id, title: text.slice(0, 44) || "Image conversation", messages: nextMessages }, ...old]);
    }
  }
  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); setToast("Response copied"); }
    catch { setToast("Clipboard access is unavailable in this browser."); }
  }
  function createNotebook() {
    const name = notebookName.trim();
    if (!name) return;
    setNotebooks(old => [...old, name]); setActiveNotebook(name); setNotebookOpen(false); setNotebookName(""); setPanel("notebook");
  }
  function renderNav(label: string, Icon: typeof Search, onClick: () => void, selected = false) {
    return <Button key={label} className={"nav-item " + (selected ? "is-selected" : "")} onClick={() => { onClick(); setMobileOpen(false); }} title={collapsed ? label : undefined} aria-label={label} aria-current={selected ? "page" : undefined}>
      <Icon aria-hidden="true" /><span className="nav-label">{label}</span>
    </Button>;
  }

  return <div className={"gemini-app " + (collapsed ? "is-collapsed " : "") + (temporary ? "is-temporary " : "") + (mobileOpen ? "mobile-nav-open " : "") + (appearance === "Dark" ? "is-dark" : "")}>
    {mobileOpen && <Button className="mobile-nav-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className="sidebar" aria-label="Main navigation" inert={isMobile && !mobileOpen}>
      <div className="brand-row">
        <Button className="brand" onClick={() => { if (collapsed) setCollapsed(false); else newChat(); }} aria-label={collapsed ? "Expand sidebar" : "Gemini home"}><GeminiMark /><span className="brand-word">Gemini</span></Button>
        <Button className="icon-button sidebar-toggle" onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} aria-label="Collapse sidebar"><PanelLeft /></Button>
      </div>
      <nav className="primary-nav">
        {renderNav("New chat", PencilLine, newChat, panel === "home" && !messages.length)}
        {renderNav("Search chats", Search, () => { setQuery(""); setSearchOpen(true); })}
        {!temporary && renderNav("Images", ImageIcon, () => setPanel("Images"), panel === "Images")}
        {renderNav("Videos", Video, () => setPanel("Videos"), panel === "Videos")}
        {renderNav("Library", Grid2X2, () => setPanel("Library"), panel === "Library")}
        {renderNav("Gems", Diamond, () => setPanel("Gems"), panel === "Gems")}
      </nav>
      <div className="sidebar-scroll">
        <section className="notebooks">
          <h2>Notebooks</h2>
          {renderNav("New notebook", Plus, () => setNotebookOpen(true))}
          {notebooks.map(name => renderNav(name, Notebook, () => { setActiveNotebook(name); setPanel("notebook"); }, panel === "notebook" && name === activeNotebook))}
        </section>
        <section className="recent-chats" aria-label="Recent chats">
          <h2>Recents</h2>
          {history.map(item => <div className={"history-row " + (activeChat === item.id ? "is-selected" : "")} key={item.id} data-menu-area>
            <Button className="history-link" onClick={() => openHistory(item)} title={item.title}>{item.title}</Button>
            <Button className="history-more icon-button" aria-label={"More options for " + item.title} onClick={() => setHistoryMenu(historyMenu === item.id ? null : item.id)}><MoreVertical /></Button>
            {historyMenu === item.id && <div className="small-menu history-options">
              <Button onClick={() => { setHistory(old => [item, ...old.filter(chat => chat.id !== item.id)]); setHistoryMenu(null); setToast("Chat moved to the top"); }}>Pin to top</Button>
              <Button onClick={() => { setHistory(old => old.filter(chat => chat.id !== item.id)); setHistoryMenu(null); if (activeChat === item.id) newChat(); }}>Remove from recents</Button>
            </div>}
          </div>)}
        </section>
      </div>
      <div className="account-row">
        <div className="account-area" data-menu-area>
          <Button className="account-button" onClick={() => setMenu(menu === "account" ? null : "account")} aria-label="Open account menu" aria-expanded={menu === "account"}>
            <img src="/gemini/assets/avatar.webp" alt="" className="avatar" /><span className="account-name"><span>Alex</span><span>Pro</span></span>
          </Button>
          {menu === "account" && <div className="small-menu account-menu">
            <strong>Alex Smith</strong><span>Google AI Pro</span>
            <Button onClick={() => { setSettingsOpen(true); setMenu(null); }}>Manage preferences</Button>
            <a href="/" className="menu-link">Back to design studies</a>
          </div>}
        </div>
        <div className="settings-area" data-menu-area>
          <Button className="icon-button settings-button" onClick={() => setMenu(menu === "settings" ? null : "settings")} aria-label="Settings and help" aria-expanded={menu === "settings"}><Settings /><span className="notification-dot" /></Button>
          {menu === "settings" && <div className="small-menu settings-menu">
            <Button onClick={() => { setSettingsOpen(true); setMenu(null); }}><Settings />Preferences</Button>
            <Button onClick={() => { setTemporary(true); setCollapsed(true); newChat(); }}><TemporaryIcon />Temporary chat</Button>
            <a href="/" className="menu-link">Explore other studies</a>
          </div>}
        </div>
      </div>
    </aside>

    <main className={"main " + (messages.length && panel === "home" ? "has-messages" : "")}>
      <header className="main-header">
        <Button className="icon-button mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" aria-expanded={mobileOpen}><Menu /></Button>
        {messages.length > 0 && panel === "home" && <span className="conversation-title">{temporary ? "Temporary chat" : history.find(item => item.id === activeChat)?.title}</span>}
        <Button className="icon-button temporary-button" onClick={changeTemporary} aria-label={temporary ? "Close temporary chat" : "Start temporary chat"} title={temporary ? "Close temporary chat" : "Temporary chat"}>
          {temporary ? <X /> : <TemporaryIcon />}
        </Button>
      </header>

      {panel === "home" ? <>
        {messages.length === 0 ? <div className="home-stage">
          <div className="ambient-glow" aria-hidden="true" />
          <div className="welcome">
            {temporary && <span className="temporary-glyph"><TemporaryIcon /></span>}
            <h1>{temporary ? "Welcome, stranger" : "What’s the vibe, Alex?"}</h1>
            {temporary && <p className="temporary-description"><span>Temporary chats</span> don’t appear in <span>recent chats</span>.<br />This conversation is cleared when you start a new chat.</p>}
          </div>
        </div> : <div className="conversation" aria-label="Conversation">
          {messages.map((message, index) => <article className={"message " + message.role} key={index}>
            {message.role === "assistant" && <GeminiMark className="answer-mark" />}
            <div className="message-content">
              {message.attachment && <div className="message-attachment">{message.attachment.url ? <img src={message.attachment.url} alt={message.attachment.name} /> : <FileText />}<span>{message.attachment.name}</span></div>}
              <p>{message.text}</p>
              {message.role === "assistant" && <div className="message-actions">
                <Toggle className="icon-button" pressed={feedback[index] === "up"} onPressedChange={pressed => setFeedback(old => ({ ...old, [index]: pressed ? "up" : "" }))} aria-label="Good response"><ThumbsUp /></Toggle>
                <Toggle className="icon-button" pressed={feedback[index] === "down"} onPressedChange={pressed => setFeedback(old => ({ ...old, [index]: pressed ? "down" : "" }))} aria-label="Bad response"><ThumbsDown /></Toggle>
                <Button className="icon-button" onClick={() => copy(message.text)} aria-label="Copy response"><Copy /></Button>
              </div>}
            </div>
          </article>)}
          <div ref={conversationEnd} />
        </div>}

        <div className={"composer-position " + (messages.length ? "at-bottom" : "")}>
          {attachment && <div className="attachment-chip"><FileText /><span>{attachment.name}</span><Button className="icon-button" onClick={() => setAttachment(null)} aria-label="Remove attachment"><X /></Button></div>}
          <form className={"composer " + (draft.includes("\n") ? "multiline" : "")} onSubmit={event => { event.preventDefault(); sendMessage(); }}>
            <div className="attachment-menu-anchor" data-menu-area>
              <Button className="icon-button attach-button" onClick={() => setMenu(menu === "attachment" ? null : "attachment")} aria-label="Add files" aria-expanded={menu === "attachment"}><Plus /></Button>
              {menu === "attachment" && <div className="small-menu attachment-menu">
                <Button onClick={() => { fileInput.current?.click(); setMenu(null); }}><FileText />Upload files</Button>
                <Button onClick={() => { setDraft("Create an image of "); setMenu(null); composerInput.current?.focus(); }}><ImageIcon />Create an image</Button>
                <Button onClick={() => { setDraft("Help me research "); setMenu(null); composerInput.current?.focus(); }}><Search />Deep research</Button>
              </div>}
            </div>
            <textarea ref={composerInput} aria-label="Ask Gemini" placeholder="Ask Gemini" rows={1} value={draft}
              onChange={event => setDraft(event.target.value)}
              onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} />
            <div className="model-anchor" data-menu-area>
              <Button className="model-button" onClick={() => setMenu(menu === "model" ? null : "model")} aria-label={"Choose model, current " + model} aria-expanded={menu === "model"}>{model}<ChevronDown /></Button>
              {menu === "model" && <div className="small-menu model-menu" role="menu" aria-label="Gemini models">
                <span className="menu-eyebrow">Choose your model</span>
                {[["Flash", "Fast help for everyday tasks"], ["Thinking", "More time for complex problems"], ["Pro", "Advanced reasoning and coding"]].map(([name, description]) => <Button role="menuitemradio" aria-checked={model === name} key={name} className="model-option" onClick={() => { setModel(name); setMenu(null); }}><span><strong>{name}</strong><small>{description}</small></span>{model === name && <Check />}</Button>)}
              </div>}
            </div>
            {draft.trim() || attachment ? <Button type="submit" className="icon-button send-button" aria-label="Send message"><ArrowUp /></Button>
              : <Button className="icon-button mic-button" aria-label="Use microphone" onClick={() => setVoiceOpen(true)}><Mic /></Button>}
          </form>
          {messages.length > 0 && <p className="composer-caption">Gemini can make mistakes, so double-check it.</p>}
        </div>
      </> : <section className="workspace-panel">
        <h1>{panel === "notebook" ? activeNotebook : panel}</h1>
        <p>{panel === "Images" ? "Bring your ideas to life." : panel === "Videos" ? "Turn a moment of inspiration into a story." : panel === "Gems" ? "Your ideas, with a little expertise." : panel === "notebook" ? "A place for your ideas, sources, and conversations." : "Your creations, all in one place."}</p>
        {panel === "notebook" ? <div className="notebook-empty"><Notebook /><h2>Start with a question</h2><p>Build on your ideas in a new conversation.</p><Button className="primary-button" onClick={() => { newChat(); setDraft("Help me explore " + activeNotebook); }}>Start a chat</Button></div>
          : <div className="workspace-cards">{(panel === "Images" ? ["A sunlit conservatory", "A colorful paper city", "A quiet mountain morning"] : panel === "Videos" ? ["A story in motion", "An anniversary moment", "A cinematic landscape"] : panel === "Gems" ? ["Writing editor", "Learning coach", "Coding partner"] : ["Ethereal conservatory portrait", "Project Nebula", "The Muggle’s Struggle"]).map((title, index) => <Button className={"workspace-card card-" + index} key={title} onClick={() => { newChat(); setDraft(panel === "Gems" ? "Help me as a " + title.toLowerCase() : "Help me create " + title.toLowerCase()); composerInput.current?.focus(); }}>
            <span className="card-icon">{panel === "Images" ? <ImageIcon /> : panel === "Videos" ? <Video /> : panel === "Gems" ? <Diamond /> : <Notebook />}</span><strong>{title}</strong><span>Explore this idea <span aria-hidden="true">↗</span></span>
          </Button>)}</div>}
      </section>}
    </main>
    <input ref={fileInput} type="file" hidden accept="image/*,.txt,.pdf" onChange={event => { const file = event.target.files?.[0]; if (file) setAttachment({ name: file.name, ...(file.type.startsWith("image/") ? { url: URL.createObjectURL(file) } : {}) }); event.target.value = ""; }} />
    {toast && <div className="toast" role="status"><Check />{toast}</div>}

    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="gemini-dialog search-dialog">
        <div className="dialog-heading"><DialogTitle>Search chats</DialogTitle><DialogClose className="icon-button" aria-label="Close search"><X /></DialogClose></div>
        <div className="search-field"><Search /><input autoFocus aria-label="Search your chats" placeholder="Search your chats" value={query} onChange={event => setQuery(event.target.value)} /></div>
        <div className="search-results">{history.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).map(item => <Button key={item.id} onClick={() => openHistory(item)}><PencilLine /><span>{item.title}</span></Button>)}
          {!history.some(item => item.title.toLowerCase().includes(query.toLowerCase())) && <p className="empty-search">No chats found. Try a different search.</p>}</div>
      </DialogContent>
    </Dialog>
    <Dialog open={notebookOpen} onOpenChange={setNotebookOpen}>
      <DialogContent className="gemini-dialog">
        <div className="dialog-heading"><DialogTitle>New notebook</DialogTitle><DialogClose className="icon-button" aria-label="Close notebook dialog"><X /></DialogClose></div>
        <DialogDescription>Keep related ideas and conversations together.</DialogDescription>
        <form onSubmit={event => { event.preventDefault(); createNotebook(); }}><label className="field-label" htmlFor="notebook-title">Notebook name</label><input className="text-input" id="notebook-title" autoFocus placeholder="Untitled notebook" value={notebookName} onChange={event => setNotebookName(event.target.value)} />
          <div className="dialog-actions"><DialogClose className="text-button">Cancel</DialogClose><Button type="submit" className="primary-button" disabled={!notebookName.trim()}>Create notebook</Button></div></form>
      </DialogContent>
    </Dialog>
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="gemini-dialog">
        <div className="dialog-heading"><DialogTitle>Preferences</DialogTitle><DialogClose className="icon-button" aria-label="Close preferences"><X /></DialogClose></div>
        <DialogDescription>Make Gemini feel right for you.</DialogDescription>
        <fieldset className="appearance-options"><legend>Appearance</legend>{["Light", "Dark"].map(option => <label key={option}><input type="radio" name="appearance" value={option} checked={appearance === option} onChange={() => setAppearance(option)} /><span>{option}</span></label>)}</fieldset>
        <div className="setting-row"><span>Compact navigation</span><Toggle className="switch" aria-label="Compact navigation" pressed={collapsed} onPressedChange={setCollapsed}><span /></Toggle></div>
        <div className="dialog-actions"><DialogClose className="primary-button">Done</DialogClose></div>
      </DialogContent>
    </Dialog>
    <Dialog open={voiceOpen} onOpenChange={setVoiceOpen}>
      <DialogContent className="gemini-dialog">
        <div className="dialog-heading"><DialogTitle>Voice input</DialogTitle><DialogClose className="icon-button" aria-label="Close voice input"><X /></DialogClose></div>
        <DialogDescription>Try a sample transcript. This preview does not record audio.</DialogDescription>
        <label className="field-label" htmlFor="voice-transcript">Transcript</label><textarea id="voice-transcript" className="transcript-input" placeholder="What would you like to say?" value={voiceDraft} onChange={event => setVoiceDraft(event.target.value)} />
        <div className="dialog-actions"><Button className="primary-button" disabled={!voiceDraft.trim()} onClick={() => { setDraft(voiceDraft); setVoiceDraft(""); setVoiceOpen(false); }}>Add to message</Button></div>
      </DialogContent>
    </Dialog>
  </div>;
}
