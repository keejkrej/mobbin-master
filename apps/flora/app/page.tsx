"use client";

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogBackdrop, DialogClose, DialogContent, DialogDescription, DialogTitle, Toggle } from '@study/ui';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, Folder, Mail, Maximize2, Menu, MoreHorizontal, MousePointer2, Play, Plus, Sparkles, X } from 'lucide-react';

const asset = (name: string) => `/flora/media/${name}`;
const cards = [
  { id: 'sketch', title: 'Truck sketch', image: 'truck-sketch.webp', model: '', type: 'Input sketch' },
  { id: 'desert', title: 'Grassy desert', image: 'desert.webp', model: '', type: 'Reference image' },
  { id: 'photoshoot', title: 'Desert car photoshoot', image: 'photoshoot.webp', model: 'Seedream 4.0', type: 'Image generation' },
  { id: 'motion', title: 'Truck handheld', image: 'truck-motion.webp', model: 'Higgsfield DoP', type: 'Video direction' },
];
const navItems = ['Teams', 'Affiliates', 'Blog', 'Docs', 'Manifesto', 'Updates', 'Pricing', 'Careers'];
const members = [
  ['Ethan Proia', 'ethan@florafauna.ai', 'Admin'], ['Weber Wong', 'weber@florafauna.ai', 'Editor'], ['Wenjing Liu', 'wenjing@florafauna.ai', 'Editor'], ['Orpheas Kofinakos', 'orpheas@florafauna.ai', 'Editor'], ['Michelle Ma', 'michelle@florafauna.ai', 'Viewer'],
];
const resourceCopy: Record<string, { intro: string; items: string[] }> = {
  Affiliates: { intro: 'Creativity grows through connection.', items: ['Share your creative process', 'Introduce your community to FLORA', 'Build something together'] },
  Blog: { intro: 'Ideas from the connected creative canvas.', items: ['From a sketch to a complete visual direction', 'A shared space for your team', 'Making room for creative exploration'] },
  Docs: { intro: 'Start with an idea. Connect the possibilities.', items: ['Add a sketch or reference image to your canvas', 'Connect your inputs to an image model', 'Refine the direction and bring it into motion'] },
  Manifesto: { intro: 'Every creative AI tool. Thoughtfully connected.', items: ['Your ideas should be the starting point', 'A canvas is a place to explore', 'Make the creative process your own'] },
  Updates: { intro: 'Reve is now available.', items: ['Explore a new image direction', 'Connect it with your existing references', 'Keep your creative workflow in one place'] },
  Pricing: { intro: 'Find space for your next idea.', items: ['Explore the example canvas', 'Create a personal workspace', 'Bring your team together'] },
  Careers: { intro: 'Help shape a more connected creative process.', items: ['Tools for creative exploration', 'Thoughtful interfaces', 'A shared canvas for every discipline'] },
};
type Modal = 'signup' | 'canvas' | 'demo' | 'resource' | 'story' | 'folder' | 'menu' | null;

function Mark({ word = true }: { word?: boolean }) {
  return <span className="brand"><span className="flower" aria-hidden="true"><i /><i /><i /><i /></span>{word && <span className="wordmark">FLORA</span>}</span>;
}

export default function Page() {
  const [page, setPage] = useState<'home' | 'teams'>('home');
  const [modal, setModal] = useState<Modal>(null);
  const [selected, setSelected] = useState('motion');
  const [direction, setDirection] = useState('A handheld shot of a dark blue truck driving through a grassy desert, warm evening light.');
  const [model, setModel] = useState('Higgsfield DoP');
  const [previewReady, setPreviewReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resource, setResource] = useState('Docs');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [roles, setRoles] = useState(members.map(member => member[2]));
  const [folders, setFolders] = useState(['Templates', 'Moodboards', 'Design Sprint', 'The Lab', 'Creative Archive']);
  const [folderName, setFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Templates');
  const [collaborating, setCollaborating] = useState(false);
  const [status, setStatus] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const current = cards.find(card => card.id === selected)!;

  useEffect(() => {
    if (!modal) return;
    const frame = requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.contains(document.activeElement)) {
        const target = dialog.querySelector<HTMLElement>('.confirmation h2, h2');
        if (target) { target.tabIndex = -1; target.focus(); }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [modal, submitted]);

  function showModal(next: Modal) { setSubmitted(false); setStatus(''); setModal(next); }
  function navigate(item: string) {
    if (item === 'Teams') { setPage('teams'); setModal(null); setStatus(''); window.scrollTo({ top: 0, behavior: 'instant' }); }
    else { setResource(item); showModal('resource'); }
  }
  function openCard(id: string) { const card = cards.find(item => item.id === id)!; setSelected(id); setModel(card.model || 'Seedream 4.0'); setPreviewReady(false); showModal('canvas'); }
  function goHome() { setPage('home'); setModal(null); setStatus(''); window.scrollTo({ top: 0, behavior: 'instant' }); }
  const title = modal === 'signup' ? 'Create your FLORA workspace' : modal === 'demo' ? 'Bring your team to FLORA' : modal === 'canvas' ? current.title : modal === 'story' ? 'FLORA for the whole team' : modal === 'folder' ? 'Create a shared folder' : modal === 'menu' ? 'Explore FLORA' : resource;

  const features = <section className="teams-features" aria-label="Team features">
    <div className="feature-heading"><div><h2>A power tool for powerhouse teams.</h2><div className="action-row"><Button className="light-button" onClick={() => showModal('signup')}>Get started for free</Button><Button className="text-button" onClick={() => showModal('demo')}>Book a demo <ArrowUpRight size={16} /></Button></div></div><p><strong>Work in real-time</strong> across departments and disciplines. Share access, create together, and keep everyone in sync.</p></div>
    <div className="feature-grid">
      <article className={`feature-card multiplayer ${collaborating ? 'collaborating' : ''}`}><div className="cursor-stage" aria-label="Collaborators on the canvas"><span className="cursor justine"><MousePointer2 size={22} fill="currentColor" /><span>Justine</span></span><span className="cursor francisco"><MousePointer2 size={22} fill="currentColor" /><span>Francisco</span></span><span className="cursor charlie"><MousePointer2 size={22} fill="currentColor" /><span>Charlie</span></span>{collaborating && <span className="cursor you"><MousePointer2 size={22} fill="currentColor" /><span>You</span></span>}</div><div className="feature-copy"><h3>Collaborative Multiplayer</h3><p>Work side-by-side. Even remotely.</p><Toggle className="feature-action" pressed={collaborating} onPressedChange={setCollaborating}>{collaborating ? 'Leave demo canvas' : 'Join demo canvas'}<ArrowUpRight size={14} /></Toggle></div></article>
      <article className="feature-card permissions"><div className="member-list">{members.map(([member, mail], index) => <div className="member" key={member}><img src={asset(`avatar-${index + 1}.webp`)} alt="" /><div><strong>{member}</strong><span>{mail}</span></div><label className="sr-only" htmlFor={`role-${index}`}>Role for {member}</label><select id={`role-${index}`} value={roles[index]} onChange={event => { setRoles(roles.map((role, i) => i === index ? event.target.value : role)); setStatus(`${member} is now ${event.target.value.toLowerCase()}`); }}><option>Admin</option><option>Editor</option><option>Viewer</option></select></div>)}</div><div className="feature-copy"><h3>Team Permissions</h3><p>Admin control, editor freedom.</p></div></article>
      <article className="feature-card folders"><div className="folder-list">{folders.slice(0, 6).map(folder => <div className={`folder-row ${folder === selectedFolder ? 'active' : ''}`} key={folder}><Button className="folder-select" onClick={() => { setSelectedFolder(folder); setStatus(`${folder} selected`); }}><Folder size={17} /><span>{folder}</span></Button>{folder === selectedFolder && <><Button className="icon-button" aria-label="Add shared folder" onClick={() => showModal('folder')}><Plus size={17} /></Button><Button className="icon-button more-folder" aria-label="Folder details" onClick={() => setStatus(`${folder} · shared with your team`)}><MoreHorizontal size={17} /></Button></>}</div>)}<Button className="more-folders" onClick={() => showModal('folder')}><MoreHorizontal size={17} />More</Button></div><div className="feature-copy"><h3>Shared Folders</h3><p>Smart spaces as smart as your team.</p></div></article>
    </div>
    <div className="support"><h2>Comprehensive white-glove support.</h2><p>From onboarding to technical support, we’re in your corner.</p><Button className="outline-button" onClick={() => showModal('demo')}>Let’s talk <ArrowUpRight size={16} /></Button></div>
  </section>;

  return <main className={`site ${page === 'home' ? 'home-page' : 'teams-page'}`}>
    <header className="site-header"><div className="header-inner"><Button className="brand-button" aria-label="FLORA home" onClick={goHome}><Mark /></Button><nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <Button key={item} className={page === 'teams' && item === 'Teams' ? 'active' : ''} onClick={() => navigate(item)}>{item}</Button>)}</nav><Button className="mobile-teams" onClick={() => navigate('Teams')}>Teams</Button><Button className="light-button header-cta" onClick={() => showModal('signup')}>Get started for free</Button><Button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => showModal('menu')}><Menu size={22} /></Button></div></header>
    {page === 'home' ? <section className="creative-canvas" aria-label="Connected creative canvas">
      <svg className="connections" viewBox="0 0 1920 1110" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="wire"><stop stopColor="#252525" /><stop offset=".5" stopColor="#4b4b4b" /><stop offset="1" stopColor="#252525" /></linearGradient></defs><path d="M 518 188 C 630 188 680 215 783 215" /><path d="M 518 672 C 650 672 642 215 783 215" /><path d="M 1138 215 C 1230 215 1160 550 1258 550" /><path className="pulse pulse-one" d="M 518 188 C 630 188 680 215 783 215" /><path className="pulse pulse-two" d="M 518 672 C 650 672 642 215 783 215" /><path className="pulse pulse-three" d="M 1138 215 C 1230 215 1160 550 1258 550" /></svg>
      {cards.map(card => <div className={`canvas-card card-${card.id}`} key={card.id}><div className="card-label"><span>{card.title}</span>{card.model && <span>{card.model}</span>}</div><Button className="media-button" aria-label={`Open ${card.title}`} onClick={() => openCard(card.id)}><img src={asset(card.image)} alt={card.title} /><span className="media-hover"><Maximize2 size={19} /></span></Button></div>)}
      <Button className="announcement" onClick={() => { setSelected('photoshoot'); setModel('Reve'); setPreviewReady(false); showModal('canvas'); }}><span className="new-label">New</span><span>Reve is now available</span><span className="try-now">Try now</span></Button>
      <div className="hero-copy"><h1>Your <em>intelligent</em> canvas.</h1><p>Every creative AI tool. Thoughtfully connected.</p><Button className="dark-button" onClick={() => showModal('signup')}>Get started for free</Button></div>
      <p className="trusted">Trusted by the world’s top creatives</p>
      <span className="canvas-bottom-fade" aria-hidden="true" />
    </section> : <>
      <section className="teams-hero"><h1>Intelligent creation for the <em>whole team.</em></h1><p>With FLORA’s Workspaces, enjoy seamless collaboration<br className="desktop-break" /> with shared assets, feedback review, and billing.</p><div className="action-row"><Button className="light-button" onClick={() => showModal('signup')}>Get started for free</Button><Button className="text-button" onClick={() => showModal('demo')}>Book a demo <ArrowUpRight size={16} /></Button></div><Button className="founder-video" aria-label="Watch the FLORA team introduction" onClick={() => showModal('story')}><img src={asset('founder.webp')} alt="FLORA founder introducing workspaces" /><span className="play-icon"><Play size={24} fill="currentColor" /></span></Button><Button className="discover-features" onClick={() => document.querySelector('.teams-features')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Explore workspaces <ArrowDown size={15} /></Button></section>
      {features}
      <footer className="site-footer"><Button className="brand-button" onClick={goHome} aria-label="Return to FLORA home"><Mark /></Button><span>Every creative AI tool. Thoughtfully connected.</span><Button className="text-button" onClick={() => showModal('signup')}>Start creating <ArrowUpRight size={16} /></Button></footer>
    </>}

    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogBackdrop className="dialog-backdrop" /><DialogContent ref={dialogRef} className={`dialog ${modal === 'canvas' ? 'canvas-dialog' : ''} ${modal === 'story' ? 'story-dialog' : ''} ${modal === 'menu' ? 'navigation-dialog' : ''}`}><DialogClose className="dialog-close icon-button" aria-label="Close dialog"><X size={20} /></DialogClose>
      {modal === 'canvas' ? <><div className="canvas-modal-image"><img src={asset(previewReady ? 'truck-motion.webp' : current.image)} alt={previewReady ? 'Example truck workflow preview' : current.title} /><span className="media-type">{previewReady ? 'Workflow preview' : current.type}</span></div><div className="canvas-modal-details"><DialogTitle>{title}</DialogTitle><DialogDescription>A sketch. A place. A new direction.</DialogDescription><div className="input-thumbnails">{cards.slice(0, 3).map(card => <Button key={card.id} className={selected === card.id ? 'selected' : ''} aria-label={`Select ${card.title}`} onClick={() => { setSelected(card.id); setPreviewReady(false); }}><img src={asset(card.image)} alt="" /></Button>)}</div><label>Model<select value={model} onChange={event => setModel(event.target.value)}><option>Seedream 4.0</option><option>Higgsfield DoP</option><option>Reve</option></select></label><label>Creative direction<textarea value={direction} onChange={event => setDirection(event.target.value)} /></label><Button className="light-button full-width" disabled={!direction.trim()} onClick={() => { setPreviewReady(true); setStatus('Preview ready'); }}><Sparkles size={16} />Preview workflow</Button><div className="canvas-demo-actions"><Toggle className="text-button" pressed={saved} onPressedChange={setSaved}>{saved ? <Check size={15} /> : <Plus size={15} />}{saved ? 'Saved to canvas' : 'Save to canvas'}</Toggle><Button className="icon-button" aria-label="Copy creative direction" onClick={() => { navigator.clipboard?.writeText(direction).catch(() => {}); setStatus('Creative direction copied'); }}><Copy size={16} /></Button></div><p className="demo-note">Explore with example media. Your direction stays in this local demo.</p>{status && <p className="inline-status" role="status"><Check size={14} />{status}</p>}</div></>
      : <><DialogTitle>{title}</DialogTitle>{modal === 'signup' || modal === 'demo' ? submitted ? <div className="confirmation"><span className="confirmation-mark"><Check size={26} /></span><h2>{modal === 'signup' ? 'Your workspace is ready to explore.' : 'Your demo request is ready.'}</h2><p>{email}</p><p className="demo-note">Saved in this local preview. No account was created and no email was sent.</p><Button className="light-button" onClick={() => { setModal(null); if (modal === 'signup') goHome(); }}>Explore the canvas <ArrowRight size={16} /></Button></div> : <><DialogDescription>{modal === 'signup' ? 'Bring your ideas into one connected creative space.' : 'A shared creative space for your whole team.'}</DialogDescription><form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>{modal === 'demo' && <label>Your name<input required value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label>}<label>Email address<input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@studio.com" /></label>{modal === 'demo' && <label>Team size<select defaultValue="2–10 people"><option>2–10 people</option><option>11–50 people</option><option>51+ people</option></select></label>}<Button className="light-button full-width" type="submit">{modal === 'signup' ? 'Continue with email' : 'Request a demo'}<ArrowRight size={16} /></Button><p className="demo-note">Interactive preview only. Nothing is submitted to FLORA.</p></form></>
      : modal === 'story' ? <><DialogDescription>A shared place for the entire creative process.</DialogDescription><div className="story-image"><img src={asset('founder.webp')} alt="Founder video still with the subtitle: When we launched FLORA, we made a bet." /></div><p className="story-quote">“When we launched FLORA, we made a bet.”</p><p>Bring assets, feedback, and creative directions into one workspace. Explore the team tools below.</p><p className="demo-note">The reference supplies a still image. This preview has no video or audio.</p><Button className="light-button" onClick={() => { setModal(null); document.querySelector('.teams-features')?.scrollIntoView({ behavior: 'instant' }); }}>Explore team features <ArrowRight size={16} /></Button></>
      : modal === 'folder' ? <><DialogDescription>Keep your team’s references and ideas in one place.</DialogDescription><form onSubmit={event => { event.preventDefault(); const value = folderName.trim(); if (!value) return; setFolders([value, ...folders]); setSelectedFolder(value); setFolderName(''); setModal(null); setStatus(`${value} created`); }}><label>Folder name<input required value={folderName} onChange={event => setFolderName(event.target.value)} placeholder="New creative direction" /></label><Button className="light-button full-width" type="submit">Create folder <Plus size={16} /></Button></form></>
      : modal === 'menu' ? <nav className="mobile-navigation" aria-label="Mobile navigation">{navItems.map(item => <Button key={item} onClick={() => navigate(item)}>{item}<ArrowUpRight size={17} /></Button>)}</nav>
      : <><DialogDescription>{resourceCopy[resource].intro}</DialogDescription><div className="resource-list">{resourceCopy[resource].items.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div><Button className="light-button" onClick={() => showModal(resource === 'Careers' || resource === 'Affiliates' ? 'demo' : 'signup')}>Let’s create <ArrowUpRight size={16} /></Button><p className="demo-note">A local exploration of this section; not a live FLORA resource.</p></>}
      </>}
    </DialogContent></Dialog>
    {status && modal !== 'canvas' && <div className="toast" role="status"><Check size={15} /><span>{status}</span><Button aria-label="Dismiss notification" className="icon-button" onClick={() => setStatus('')}><X size={14} /></Button></div>}
  </main>;
}
