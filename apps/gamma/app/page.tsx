'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@study/ui';
import { AlignLeft, ArrowDown, ArrowLeft, ArrowRight, BarChart3, Check, ChevronDown, ChevronLeft, ChevronRight, Copy, FileText, Film, Grid2X2, GripVertical, HelpCircle, Image as ImageIcon, LayoutPanelLeft, Lightbulb, Link, List, LockKeyhole, Maximize2, MessageSquare, MoreHorizontal, Palette, Play, Plus, Search, Send, Sparkles, Star, Text, Trash2, Trophy, Type, Undo2, X } from 'lucide-react';

type CardKind = 'hero' | 'table' | 'benefits' | 'steps' | 'visual' | 'sections' | 'platform';
type Card = { id: number; kind: CardKind; title: string; subtitle: string; image: string };
type Theme = 'studio' | 'prism' | 'midnight';
type Modal = 'share' | 'theme' | 'agent' | 'insert' | 'edit' | 'images' | 'search' | 'notes' | 'help' | null;

const initialCards: Card[] = [
  { id: 1, kind: 'hero', title: 'Crafting a Professional Design Portfolio for Optimal Recruitment', subtitle: '', image: 'portfolio-artwork.webp' },
  { id: 2, kind: 'table', title: 'The foundations of a strong portfolio', subtitle: 'A considered selection of work tells a clear story.', image: 'prism-texture.webp' },
  { id: 3, kind: 'benefits', title: 'The Paramount Importance of Your Portfolio Relative to Your Curriculum Vitae', subtitle: 'Let your work demonstrate how you think.', image: 'portfolio-artwork.webp' },
  { id: 4, kind: 'steps', title: 'A Step-by-Step Guide to Building Your Portfolio', subtitle: 'Turn your experience into a focused, memorable narrative.', image: 'portfolio-artwork.webp' },
  { id: 5, kind: 'visual', title: 'Make room for your perspective.', subtitle: 'The details make the difference.', image: 'prism-texture.webp' },
  { id: 6, kind: 'sections', title: 'What to Include: The Essential Portfolio Sections', subtitle: 'Balance your process, outcomes, and personal point of view.', image: 'portfolio-artwork.webp' },
  { id: 7, kind: 'platform', title: 'Selecting Optimal Platforms and Ensuring Continual Relevance', subtitle: 'Build a home for your work, and keep it evolving.', image: 'portfolio-artwork.webp' },
];
const benefitCopy = [
  { title: 'Prerequisite for Entry-Level Positions', body: 'A robust portfolio is indispensable for entry-level design roles, effectively demonstrating practical competencies beyond rudimentary qualifications.', icon: Trophy },
  { title: 'Exhibit Your Distinctive Aesthetic', body: 'Your portfolio elucidates your design methodology, aptitude for complex problem resolution, and idiosyncratic stylistic approach, thereby differentiating your profile from that of other applicants.', icon: Lightbulb },
  { title: 'Emphasis on Qualitative Excellence Over Quantitative Volume', body: 'Prioritize the inclusion of one to three judiciously curated case studies that exemplify your peak professional achievements, as opposed to inundating recruiting personnel with an extensive array of mediocre submissions.', icon: Star },
];
const modalNames: Record<Exclude<Modal, null>, string> = { share: 'Share Portfolio File', theme: 'Choose a theme', agent: 'Edit with Agent', insert: 'Add a card', edit: 'Edit card', images: 'Card images', search: 'Find in this gamma', notes: 'Speaker notes', help: 'A little help with Gamma' };

function GammaMark() { return <span className="gamma-mark" aria-hidden="true"><span>G</span><i/></span>; }

export default function GammaStudy() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [activeId, setActiveId] = useState(1);
  const [documentTitle, setDocumentTitle] = useState('Portfolio File');
  const [theme, setTheme] = useState<Theme>('studio');
  const [modal, setModal] = useState<Modal>(null);
  const [sidebar, setSidebar] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [outline, setOutline] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [presentIndex, setPresentIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [insertAfter, setInsertAfter] = useState<number | null>(null);
  const [agentPrompt, setAgentPrompt] = useState('');
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [shareAccess, setShareAccess] = useState('Only people with the link');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invited, setInvited] = useState<string[]>([]);
  const [navigationLink, setNavigationLink] = useState('');
  const [navigationButton, setNavigationButton] = useState('');
  const [saved, setSaved] = useState(true);
  const [undoCards, setUndoCards] = useState<Card[] | null>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const sidebarElement = useRef<HTMLElement>(null);
  const openSidebarButton = useRef<HTMLButtonElement>(null);
  const presentButton = useRef<HTMLButtonElement>(null);
  const wasSidebarOpen = useRef(false);
  const current = cards.find(card => card.id === activeId) ?? cards[0];

  useEffect(() => {
    const media = window.matchMedia('(max-width: 700px)');
    setMobile(media.matches); if (media.matches) setSidebar(false);
    const changed = (event: MediaQueryListEvent) => { setMobile(event.matches); setSidebar(!event.matches); };
    media.addEventListener('change', changed); return () => media.removeEventListener('change', changed);
  }, []);
  useEffect(() => {
    if (mobile && sidebar) { wasSidebarOpen.current = true; sidebarElement.current?.querySelector<HTMLButtonElement>('[aria-label="Close cards"]')?.focus(); }
    else if (wasSidebarOpen.current && mobile) { wasSidebarOpen.current = false; openSidebarButton.current?.focus(); }
  }, [sidebar, mobile]);
  useEffect(() => { if (!notice) return; const id = setTimeout(() => setNotice(''), 3000); return () => clearTimeout(id); }, [notice]);
  useEffect(() => { if (saved) return; const id = setTimeout(() => setSaved(true), 700); return () => clearTimeout(id); }, [saved, cards]);
  useEffect(() => {
    if (!presenting) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setPresenting(false); requestAnimationFrame(() => presentButton.current?.focus()); return; }
      if (event.target instanceof Element && event.target.closest('button, input, textarea, select, a, [contenteditable="true"]')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); setPresentIndex(index => Math.min(cards.length - 1, index + 1)); }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); setPresentIndex(index => Math.max(0, index - 1)); }
    };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, [presenting, cards.length]);

  function updateCard(id: number, values: Partial<Card>) { setUndoCards(cards); setCards(items => items.map(card => card.id === id ? { ...card, ...values } : card)); setSaved(false); }
  function selectCard(id: number) { setActiveId(id); if (mobile) setSidebar(false); document.getElementById(`gamma-card-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  function openModal(next: Modal, after: number | null = null) { if (next === 'insert') setInsertAfter(after); if (mobile && sidebar) setSidebar(false); setModal(next); }
  function addCard(kind: CardKind = 'hero', title = 'Your next great idea', after: number | null = null) {
    const card = { id: Date.now(), kind, title, subtitle: 'Add a little context to bring your idea to life.', image: kind === 'visual' ? 'prism-texture.webp' : 'portfolio-artwork.webp' };
    setUndoCards(cards); setCards(items => after === null ? [...items, card] : [...items.slice(0, after + 1), card, ...items.slice(after + 1)]); setActiveId(card.id); setSaved(false); setModal(null); if (mobile) setSidebar(false);
    setTimeout(() => document.getElementById(`gamma-card-${card.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
  }
  function startPresenting() { setPresentIndex(Math.max(0, cards.findIndex(card => card.id === activeId))); setPresenting(true); setModal(null); }
  function exitPresenting() { setPresenting(false); requestAnimationFrame(() => presentButton.current?.focus()); }
  function sidebarKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (!mobile) return;
    if (event.key === 'Escape') { setSidebar(false); return; }
    if (event.key !== 'Tab') return;
    const buttons = sidebarElement.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
    if (!buttons?.length) return;
    if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[buttons.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === buttons[buttons.length - 1]) { event.preventDefault(); buttons[0].focus(); }
  }
  async function copyLink() { try { await navigator.clipboard.writeText(window.location.href); setNotice('Preview link copied'); } catch { setNotice('Copy the current address to share this preview.'); } }

  function editableTitle(card: Card, index: number, presentation = false) {
    if (presentation) return <h1 className="slide-title">{card.title}</h1>;
    return <textarea className="slide-title" aria-label={`Card ${index + 1} title`} value={card.title} rows={card.kind === 'hero' ? 3 : 2} spellCheck={false} onFocus={() => setActiveId(card.id)} onChange={event => updateCard(card.id, { title: event.target.value })}/>;
  }

  function cardContents(card: Card, index: number, presentation = false) {
    if (card.kind === 'hero') return <><div className="hero-copy">{editableTitle(card, index, presentation)}{card.subtitle && <p>{card.subtitle}</p>}</div><div className="hero-artwork"><img src={`/gamma/assets/${card.image}`} alt="A sculptural lavender interior with glowing globes and a reclining silver figure"/></div></>;
    if (card.kind === 'table') return <div className="table-slide">{presentation && <div className="slide-heading">{editableTitle(card, index, presentation)}<p>{card.subtitle}</p></div>}<div className="portfolio-table"><div className="table-row table-head"><span>Key Element</span><span>What to Include</span><span>Purpose</span><span>Tips</span></div>{[['Introduction', 'Your story and approach', 'Make a personal connection', 'Keep it authentic'], ['Case studies', 'Process, decisions, and outcomes', 'Show how you solve problems', 'Choose your strongest work'], ['About you', 'Experience and perspective', 'Bring your personality to life', 'Be concise and specific'], ['Contact', 'A clear next step', 'Start a conversation', 'Make it easy to reach you']].map(row => <div className="table-row" key={row[0]}>{row.map(cell => <span key={cell}>{cell}</span>)}</div>)}</div><div className="table-shapes"><span/><i/><b/></div></div>;
    if (card.kind === 'benefits') return <div className="benefits-slide"><div className="slide-heading">{editableTitle(card, index, presentation)}</div><div className="benefits-grid">{benefitCopy.map(({ title, body, icon: Icon }) => <section key={title}><span className="benefit-icon"><Icon size={25}/></span><h2>{title}</h2><p>{body}</p></section>)}</div><div className="design-orbit"><span className="glass-orb"/><span className="orbit-label label-one">Exhibit Your<br/>Distinctive Aesthetic<small>Showcase signature style and visuals</small></span><span className="orbit-label label-two">Curate Consistent Elements<small>Choose colors, fonts, and motifs</small></span></div></div>;
    if (card.kind === 'steps') return <div className="steps-slide"><div className="slide-heading">{editableTitle(card, index, presentation)}<p>{card.subtitle}</p></div>{[['Select Your Best Work', 'Curate three to five projects that show your range and strengths.'], ['Build Your Visual Story', 'Explain the challenge, your decisions, and the final outcome.'], ['Document Your Process', 'Include sketches, exploration, and the thinking behind the result.'], ['Refine and Present', 'Use a consistent visual language and make every detail intentional.']].map(([title, body], i) => <div className="step-item" key={title}><span>{i + 1}</span><div><h2>{title}</h2><p>{body}</p></div></div>)}</div>;
    if (card.kind === 'visual') return <div className="visual-slide"><img src={`/gamma/assets/${card.image}`} alt="Abstract reflective silver and lavender artwork"/><div>{editableTitle(card, index, presentation)}<p>{card.subtitle}</p></div></div>;
    if (card.kind === 'sections') return <div className="sections-slide"><div className="slide-heading">{editableTitle(card, index, presentation)}</div><div className="sections-grid">{[['Hero Projects: Your Design Identity', 'Choose work that reflects the role you want next.'], ['About You: Context & Expertise', 'Introduce the experience and perspective you bring.'], ['Case Studies: Articulating Impact', 'Show your process, explain the decisions, and share the outcome.'], ['Contact: A Clear Next Step', 'Make it simple to start a conversation.']].map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div><img className="section-artwork" src={`/gamma/assets/${card.image}`} alt="Lavender portfolio artwork detail"/></div>;
    return <div className="platform-slide"><div className="slide-heading">{editableTitle(card, index, presentation)}</div><div className="platform-columns"><div><p>{card.subtitle}</p><ul><li>Choose a platform that supports your content.</li><li>Make navigation feel natural and consistent.</li><li>Keep your strongest projects easy to find.</li><li>Review your portfolio as your practice evolves.</li></ul></div><img src={`/gamma/assets/${card.image}`} alt="Purple sculptural artwork"/></div><div className="platform-tiles"><span>Fr</span><span>W</span><span>Be</span><span>G</span></div></div>;
  }

  function thumbnail(card: Card, index: number) { return <Button key={card.id} className={`thumbnail ${activeId === card.id ? 'selected' : ''} ${outline ? 'outline-item' : ''}`} aria-label={`Go to card ${index + 1}: ${card.title}`} aria-current={activeId === card.id ? 'true' : undefined} onClick={() => selectCard(card.id)}>{outline ? <><span>{index + 1}</span><p>{card.title}</p></> : <><div className={`mini-slide mini-${card.kind}`}><strong>{card.title}</strong>{card.kind === 'hero' || card.kind === 'visual' ? <img src={`/gamma/assets/${card.image}`} alt=""/> : <div className="mini-blocks">{[0, 1, 2, 3].map(item => <i key={item}/>)}</div>}</div><span className="card-number">{index + 1}</span></>}</Button>; }

  return <div className={`gamma-app theme-${theme} ${presenting ? 'is-presenting' : ''}`}>
    <svg className="clip-definitions" width="0" height="0" aria-hidden="true"><defs><clipPath id="gamma-art-curve" clipPathUnits="objectBoundingBox"><path d="M.09,0 H1 V1 H.13 C-.04,.78 -.02,.76 .065,.55 C.18,.33 -.03,.20 .09,0 Z"/></clipPath></defs></svg>
    {!presenting && <header className="editor-topbar" inert={mobile && sidebar}><div className="document-identity"><Button className="brand-home" aria-label="Gamma home" onClick={() => { selectCard(cards[0].id); }}><GammaMark/></Button><ChevronRight className="breadcrumb-chevron" size={15}/><FileText className="file-icon" size={17}/><input className="document-title" aria-label="Document title" value={documentTitle} onChange={event => setDocumentTitle(event.target.value)}/><span className="save-status" aria-live="polite">{saved ? '' : 'Saving...'}</span></div><div className="editor-actions"><Button className="topbar-action theme-action" aria-label="Theme" onClick={() => openModal('theme')}><Palette size={17}/><span>Theme</span></Button><Button className="topbar-action share-action" aria-label="Share" onClick={() => openModal('share')}><LockKeyhole size={16}/><span>Share</span></Button><Button className="agent-button" onClick={() => openModal('agent')}><Sparkles size={17}/><span>Agent</span><ChevronDown size={15}/></Button><Button className="present-button" ref={presentButton} onClick={startPresenting}><Play size={15} fill="currentColor"/><span>Present</span><ChevronDown className="present-chevron" size={15}/></Button><Button className="icon-button more-button" aria-label="More options" onClick={() => openModal('notes')}><MoreHorizontal size={20}/></Button><Button className="account-avatar" aria-label="Account help" onClick={() => openModal('help')}>AS</Button></div></header>}
    <main className="gamma-main">
      {presenting ? <div className="presentation-view"><div className="presentation-top"><span>{documentTitle}</span><Button className="exit-presentation" onClick={exitPresenting}><X size={17}/>Exit presentation</Button></div><article className={`gamma-card presentation-card card-${cards[presentIndex].kind}`}>{cardContents(cards[presentIndex], presentIndex, true)}</article><div className="presentation-controls"><Button className="icon-button" aria-label="Previous card" disabled={presentIndex === 0} onClick={() => setPresentIndex(index => index - 1)}><ChevronLeft size={23}/></Button><span>{presentIndex + 1} / {cards.length}</span><Button className="icon-button" aria-label="Next card" disabled={presentIndex === cards.length - 1} onClick={() => setPresentIndex(index => index + 1)}><ChevronRight size={23}/></Button></div></div> : <>
        {sidebar && <aside className="card-sidebar" ref={sidebarElement} aria-label="Cards" role={mobile ? 'dialog' : undefined} aria-modal={mobile ? true : undefined} onKeyDown={sidebarKeyDown}><div className="card-sidebar-heading"><div className="sidebar-view-toggle"><Button className={!outline ? 'selected' : ''} aria-label="Card thumbnails" aria-pressed={!outline} onClick={() => setOutline(false)}><Film size={14}/></Button><Button className={outline ? 'selected' : ''} aria-label="Card outline" aria-pressed={outline} onClick={() => setOutline(true)}><List size={15}/></Button></div><Button className="icon-button" aria-label="Close cards" onClick={() => setSidebar(false)}><X size={14}/></Button></div><div className="new-card-control"><Button onClick={() => addCard()}><Plus size={16}/>New</Button><Button aria-label="Choose card type" onClick={() => openModal('insert')}><ChevronDown size={14}/></Button></div><div className="thumbnail-list">{cards.map(thumbnail)}</div></aside>}
        <div className="editor-surface" inert={mobile && sidebar}>
          <div className="website-navigation"><Button className="website-logo" aria-label="Add website logo" onClick={() => openModal('images')}><ImageIcon size={16}/></Button><input aria-label="Website navigation link" value={navigationLink} onChange={event => setNavigationLink(event.target.value)} placeholder="Add a link"/><input className="website-button" aria-label="Website button label" value={navigationButton} onChange={event => setNavigationButton(event.target.value)} placeholder="Add a button"/></div>
          <div className={`canvas ${sidebar ? '' : 'cards-hidden'}`} ref={canvas}>{cards.map((card, index) => <div key={card.id} className="card-wrap" id={`gamma-card-${card.id}`}><article className={`gamma-card card-${card.kind} ${activeId === card.id ? 'active-card' : ''}`} onClick={() => setActiveId(card.id)}><div className="card-floating-controls"><Button className="small-control" aria-label={`Options for card ${index + 1}`} onClick={() => { setActiveId(card.id); openModal('edit'); }}><MoreHorizontal size={14}/></Button><Button className="small-control" aria-label={`Style card ${index + 1}`} onClick={() => { setActiveId(card.id); openModal('theme'); }}><Palette size={14}/><ChevronDown size={9}/></Button><Button className="small-control" aria-label={`Improve card ${index + 1}`} onClick={() => { setActiveId(card.id); openModal('agent'); }}><Sparkles size={14}/><ChevronDown size={9}/></Button></div><Button className="card-notes" aria-label={`Notes for card ${index + 1}`} onClick={() => { setActiveId(card.id); openModal('notes'); }}><AlignLeft size={16}/></Button>{cardContents(card, index)}</article><Button className="between-cards" aria-label={`Add a card after card ${index + 1}`} onClick={() => openModal('insert', index)}><Plus size={16}/></Button></div>)}</div>
          {!sidebar && <Button className="show-cards" ref={openSidebarButton} aria-label="Open cards" onClick={() => setSidebar(true)}><LayoutPanelLeft size={18}/><span>Cards</span><span>{cards.length}</span></Button>}
          <aside className="tool-rail" aria-label="Insert tools">{[{ label: 'Find text', icon: Search, target: 'search' }, { label: 'Edit text', icon: Type, target: 'edit' }, { label: 'Images', icon: ImageIcon, target: 'images' }, { label: 'Insert layout', icon: Grid2X2, target: 'insert' }, { label: 'Themes', icon: Palette, target: 'theme' }, { label: 'Charts', icon: BarChart3, target: 'insert' }, { label: 'Cards', icon: Film, target: 'insert' }, { label: 'Embed content', icon: LayoutPanelLeft, target: 'edit' }, { label: 'Speaker notes', icon: MessageSquare, target: 'notes' }].map(({ label, icon: Icon, target }) => <Button key={label} aria-label={label} title={label} onClick={() => openModal(target as Modal)}><Icon size={19}/></Button>)}</aside>
          <div className="bottom-brand" aria-hidden="true"><strong>as</strong><small>PORTFOLIO</small></div><Button className="help-button" aria-label="Help" onClick={() => openModal('help')}>?</Button><Button className="undo-button" aria-label="Undo last edit" disabled={!undoCards} onClick={() => { if (undoCards) { setCards(undoCards); setUndoCards(null); setNotice('Last edit undone'); } }}><Undo2 size={15}/></Button>
        </div>
      </>}
    </main>
    {notice && <div className="gamma-toast" role="status">{notice}</div>}
    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogContent className={`gamma-dialog ${modal === 'theme' ? 'theme-dialog' : ''}`}><div className="dialog-heading"><DialogTitle>{modal ? modalNames[modal] : ''}</DialogTitle><DialogClose className="icon-button" aria-label="Close dialog"><X size={19}/></DialogClose></div><DialogDescription className="dialog-description">{modal === 'share' ? 'Invite people or copy a link to this portfolio preview.' : modal === 'theme' ? 'Give every card a consistent look and feel.' : modal === 'agent' ? 'Describe a new card to add to your presentation.' : modal === 'notes' ? 'Keep your talking points close. Notes stay out of the presentation.' : modal === 'edit' ? 'Make this card your own.' : modal === 'search' ? 'Find a card by its title.' : modal === 'images' ? 'Choose artwork for this card. Cards without images switch to a full-image layout.' : 'Shape your ideas, one card at a time.'}</DialogDescription>
      {modal === 'share' && <div className="share-panel"><div className="share-tabs"><span>Share</span><span>Export</span><span>Embed</span></div><form className="invite-form" onSubmit={event => { event.preventDefault(); if (!inviteEmail.includes('@')) return; setInvited(items => [...items, inviteEmail]); setInviteEmail(''); setNotice('Invitation added to this local preview'); }}><input type="email" aria-label="Invite email address" value={inviteEmail} onChange={event => setInviteEmail(event.target.value)} placeholder="Invite others by email" required/><Button type="submit" className="primary-button">Invite</Button></form><div className="sharing-person"><span className="account-avatar">AS</span><div><strong>Alex Smith</strong><small>You</small></div><span>Owner</span></div>{invited.map((email, i) => <div className="invited-person" key={`${email}-${i}`}><span>{email}</span><small>Can view · Local preview</small></div>)}<label className="access-label">General access<select value={shareAccess} onChange={event => setShareAccess(event.target.value)}><option>Only people with the link</option><option>Only invited people</option></select></label><div className="copy-link-row"><Link size={16}/><span>gamma.app / portfolio-preview</span><Button className="primary-button" onClick={copyLink}><Copy size={15}/>Copy link</Button></div><p className="dialog-fine-print">Sharing settings are local to this study. No invitations are sent.</p></div>}
      {modal === 'theme' && <div className="theme-options">{[{ id: 'studio', title: 'Studio', description: 'Warm paper. A colorful point of view.' }, { id: 'prism', title: 'Prism', description: 'Reflective textures and soft gradients.' }, { id: 'midnight', title: 'Midnight', description: 'A darker canvas for bold ideas.' }].map(item => <Button key={item.id} className={`theme-option theme-option-${item.id} ${theme === item.id ? 'chosen' : ''}`} onClick={() => { setTheme(item.id as Theme); setSaved(false); setModal(null); }}><div className="theme-preview"><span>Aa</span><div><i/><i/><i/></div></div><strong>{item.title}{theme === item.id && <Check size={16}/>}</strong><small>{item.description}</small></Button>)}</div>}
      {modal === 'agent' && <form className="dialog-form" onSubmit={event => { event.preventDefault(); if (!agentPrompt.trim()) return; addCard('steps', agentPrompt.trim()); setAgentPrompt(''); setNotice('A new outline card is ready to edit'); }}><textarea aria-label="Instructions for Agent" placeholder="Add a card about my design process..." value={agentPrompt} onChange={event => setAgentPrompt(event.target.value)} rows={4} required/><div className="agent-suggestions">{['My design process', 'Project outcomes', 'What I learned'].map(text => <Button key={text} type="button" onClick={() => setAgentPrompt(text)}>{text}</Button>)}</div><Button className="primary-button" type="submit"><Sparkles size={16}/>Create a draft card</Button></form>}
      {modal === 'insert' && <div className="insert-grid">{[{ kind: 'hero', title: 'Title & image', icon: ImageIcon }, { kind: 'table', title: 'Comparison table', icon: Grid2X2 }, { kind: 'benefits', title: 'Three columns', icon: LayoutPanelLeft }, { kind: 'steps', title: 'Step by step', icon: List }, { kind: 'visual', title: 'Full image', icon: Maximize2 }, { kind: 'sections', title: 'Four sections', icon: Text }].map(({ kind, title, icon: Icon }) => <Button key={kind} onClick={() => addCard(kind as CardKind, title, insertAfter)}><Icon size={25}/><span>{title}</span></Button>)}</div>}
      {modal === 'edit' && <div className="dialog-form"><label htmlFor="edit-card-title">Title</label><textarea id="edit-card-title" value={current.title} onChange={event => updateCard(current.id, { title: event.target.value })} rows={3}/><label htmlFor="edit-card-subtitle">Supporting text</label><textarea id="edit-card-subtitle" value={current.subtitle} onChange={event => updateCard(current.id, { subtitle: event.target.value })} rows={2}/><div className="edit-card-actions"><Button className="delete-card" disabled={cards.length === 1} onClick={() => { setUndoCards(cards); setCards(items => items.filter(card => card.id !== current.id)); setActiveId(cards.find(card => card.id !== current.id)!.id); setModal(null); setNotice('Card removed'); }}><Trash2 size={16}/>Delete card</Button><DialogClose className="primary-button">Done</DialogClose></div></div>}
      {modal === 'images' && <div className="image-options">{[{ file: 'portfolio-artwork.webp', title: 'Lavender studio' }, { file: 'prism-texture.webp', title: 'Silver reflections' }].map(image => <Button key={image.file} className={current.image === image.file ? 'selected-image' : ''} onClick={() => { updateCard(current.id, { image: image.file, kind: ['hero', 'visual', 'sections', 'platform'].includes(current.kind) ? current.kind : 'visual' }); setModal(null); setNotice('Card image updated'); }}><img src={`/gamma/assets/${image.file}`} alt={image.title}/><span>{image.title}{current.image === image.file && <Check size={15}/>}</span></Button>)}</div>}
      {modal === 'search' && <div className="find-panel"><div className="find-input"><Search size={18}/><input aria-label="Find card" autoFocus placeholder="Search card titles" value={query} onChange={event => setQuery(event.target.value)}/></div><div className="find-results">{cards.filter(card => card.title.toLowerCase().includes(query.toLowerCase())).map(card => <Button key={card.id} onClick={() => { selectCard(card.id); setModal(null); }}><FileText size={16}/><span>{card.title}</span><ChevronRight size={15}/></Button>)}{!cards.some(card => card.title.toLowerCase().includes(query.toLowerCase())) && <p>No matching cards.</p>}</div></div>}
      {modal === 'notes' && <div className="dialog-form"><label htmlFor="speaker-notes">Card {cards.findIndex(card => card.id === activeId) + 1}: {current.title}</label><textarea id="speaker-notes" placeholder="What would you like to say about this card?" rows={6} value={notes[current.id] ?? ''} onChange={event => setNotes(values => ({ ...values, [current.id]: event.target.value }))}/><DialogClose className="primary-button">Done</DialogClose></div>}
      {modal === 'help' && <div className="help-panel"><p>Click any title to edit it. Use the cards on the left to move through your story, or open Theme to try a different look.</p><div><kbd>←</kbd><kbd>→</kbd><span>Move between cards while presenting</span></div><div><kbd>Esc</kbd><span>Exit presentation or close a dialog</span></div><Button className="primary-button" onClick={() => { setModal(null); startPresenting(); }}><Play size={15}/>Try presenting</Button></div>}
    </DialogContent></Dialog>
  </div>;
}
