'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Cpu, Gauge, Menu, Pause, Play, X, Zap, Check } from 'lucide-react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Tabs, TabsList, TabsPanel, TabsTab } from '@study/ui';

const asset = (file: string) => `/decart/assets/${file}`;
const outfits = [
  { name: 'Viking warrior armor', short: 'Viking armor', id: 1 },
  { name: 'Cowboy ghost outfit', short: 'Cowboy ghost', id: 2 },
  { name: 'Pink streetwear look', short: 'Pink streetwear', id: 3 },
  { name: 'Military cargo jacket', short: 'Cargo jacket', id: 4 },
  { name: 'Double-breasted suit', short: 'Tailored suit', id: 5 },
];
const research = [
  { date: 'November 12, 2026', title: 'Year Two with the Technion', author: 'Chaim Baskin', text: 'Year two of Decart’s collaboration with the Technion: a new first-year group, joint research with faculty, and problems no syllabus covers yet.', url: 'https://decart.ai/publications/year-two-with-the-technion' },
  { date: 'November 5, 2026', title: 'Lucy 2.6: Ready for Live Commerce and Engagement', author: 'Decart Team', text: 'Sharper fidelity and quality for your characters, clothing, and products, all generated live.', url: 'https://decart.ai/publications/introducing-lucy-2-6' },
  { date: 'October 2026', title: 'Learning a Spatial Memory Codec for Video World Models', author: 'Decart Research', text: 'Store the whole journey compactly, and read only what each view needs. Each view reads a few learned entries, even from archives of nearly two hours.', url: 'https://research.decart.ai/spatial-memory-codec' },
];

function Media({ file, poster, label, className = '', controls = false }: { file: string; poster: string; label: string; className?: string; controls?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { const video = ref.current; if (!video) return; if (query.matches) { video.pause(); setPlaying(false); } else { video.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); } };
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [file]);
  return <div className={`media ${className}`}><video key={file} ref={ref} src={asset(file)} poster={asset(poster)} aria-label={label} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />{controls && <Button className="media-toggle" aria-label={playing ? `Pause ${label}` : `Play ${label}`} onClick={() => { const v = ref.current; if (!v) return; if (v.paused) v.play().catch(() => undefined); else v.pause(); }}>{playing ? <Pause size={16} /> : <Play size={16} />}</Button>}</div>;
}

export default function Decart() {
  const [dialog, setDialog] = useState<'demo' | 'contact' | 'menu' | null>(null);
  const [nav, setNav] = useState<string | null>(null);
  const [model, setModel] = useState('lucy');
  const [outfit, setOutfit] = useState(0);
  const [inlineOutfit, setInlineOutfit] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Lucy · Live video');
  const [message, setMessage] = useState('');
  const opener = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const open = (type: 'demo' | 'contact' | 'menu', selectedModel?: string) => { const active = document.activeElement as HTMLElement; opener.current = active.closest('.dropdown') && nav ? navRef.current?.querySelector<HTMLElement>(`[data-nav="${nav}"]`) ?? active : active; if (selectedModel) setModel(selectedModel); setNav(null); setDialog(type); };
  const close = () => { setDialog(null); requestAnimationFrame(() => opener.current?.focus()); };
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && nav) { const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-nav="${nav}"]`); setNav(null); trigger?.focus(); } };
    const handleOutside = (event: MouseEvent) => { if (navRef.current && !navRef.current.contains(event.target as Node)) setNav(null); };
    document.addEventListener('keydown', handleKey); document.addEventListener('click', handleOutside);
    return () => { document.removeEventListener('keydown', handleKey); document.removeEventListener('click', handleOutside); };
  }, [nav]);
  const jump = (id: string) => { setNav(null); if (dialog === 'menu') { setDialog(null); requestAnimationFrame(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }); document.getElementById(id)?.focus({ preventScroll: true }); }); } else document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="announcement" href="https://decart.ai/publications/introducing-lucy-2-6" target="_blank" rel="noreferrer">Lucy 2.6 is live · See what’s new <ArrowRight size={13} /></a>
      <div className="nav-bar"><a href="#main" className="brand" aria-label="Decart home"><img src={asset('decart-logo.svg')} alt="Decart" width="112" height="32" /></a>
        <div className="desktop-nav" ref={navRef}>
          <Button className="nav-link" onClick={() => jump('optimization')}>Optimization Stack</Button>
          {['Model', 'Explore', 'Company'].map(item => <div className="nav-group" key={item}><Button className="nav-link" data-nav={item} aria-expanded={nav === item} aria-controls={`nav-${item}`} onClick={() => setNav(nav === item ? null : item)}>{item}<ChevronDown size={12} /></Button>{nav === item && <div id={`nav-${item}`} className="dropdown">
            {item === 'Model' ? <><Button onClick={() => { jump('lucy'); }}>Lucy<small>Live AI video</small></Button><Button onClick={() => { jump('oasis'); }}>Oasis<small>World model</small></Button></> : item === 'Explore' ? <><Button onClick={() => jump('research')}>Research<small>Papers and tools</small></Button><a href="https://docs.platform.decart.ai/" target="_blank" rel="noreferrer">Documentation<small>Guides and references</small></a></> : <><a href="https://decart.ai/about" target="_blank" rel="noreferrer">About<small>Team, investors, timeline</small></a><Button onClick={() => open('contact')}>Contact<small>Talk to us</small></Button></>}
          </div>}</div>)}
          <Button className="nav-link" onClick={() => open('demo')}>Start Building</Button>
          <Button className="pill compact" onClick={() => open('contact')}>Contact us</Button>
        </div>
        <Button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => open('menu')}><Menu size={23} strokeWidth={1.3} /></Button>
      </div>
    </header>
    <main id="main">
      <section className="hero">
        <div className="hero-copy"><h1>The Live AI Lab<br />the World Runs On</h1><p>We build the infrastructure and models that make AI run at the speed of reality.</p><Button className="pill hero-cta" onClick={() => open('demo', 'lucy')}>Try Live AI</Button></div>
        <Media className="hero-art" file="morph.webm" poster="globe-poster.webp" label="Morphing blue and green Decart globe" controls />
      </section>
      <section className="partners" aria-label="Partners and customers"><p>Partners and customers</p><div className="partner-logos">{['Adobe', 'Amazon', 'WPP', 'eBay', 'ElevenLabs', 'fal', 'NVIDIA', 'Toyota', 'Twitch', 'Comcast'].map(name => <img key={name} src={asset(`${name.toLowerCase()}.svg`)} alt={name} width={84} height={30} />)}</div></section>
      <section className="manifesto"><h2>Everything humanity is about to build runs on a limited number of chips.</h2><p>The future depends on extracting far more performance from the compute we already have.</p></section>
      <section id="optimization" className="section optimization" tabIndex={-1} aria-labelledby="optimization-title">
        <div className="split"><div className="visual-card chip-card"><Media file="opt.webm" poster="chip-poster.avif" label="Decart optimization architecture" controls /></div><div className="feature-copy"><p className="eyebrow">Introducing</p><h2 id="optimization-title">Decart Optimization Stack.</h2><p>Frontier optimization technology that extracts up to 100× more performance from the chips you already run.</p><Button className="pill" onClick={() => open('contact')}>Learn more<span className="sr-only"> about the Decart Optimization Stack</span></Button><div className="hardware"><span>Built across:</span><span>Google TPUs</span><span>AWS Trainium</span><span>Nvidia GPUs</span></div></div></div>
        <div className="capabilities">{[{ Icon: Cpu, title: 'Hardware agnostic', text: "Run optimized workloads across every major chip architecture. Your workload shouldn't care what it runs on." }, { Icon: Gauge, title: 'Peak hardware performance', text: 'Extract more from the compute you already have. No new racks. No new contracts. New ceiling.' }, { Icon: Zap, title: 'Ultra-fast inference', text: 'Frontier models at lower latency and higher token throughput. Intelligence at the speed of reality.' }].map(({ Icon, title, text }) => <article key={title}><div className="capability-icon"><Icon size={28} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="blue-cta"><h2>Deploy the Live AI layer</h2><Button className="pill white" aria-label="Contact us about Live AI" onClick={() => open('contact')}>Contact us</Button></div>
      </section>
      <section className="section models" aria-labelledby="models-title"><div className="section-heading"><h2 id="models-title">One stack powers every layer of Live AI.</h2><p>DOS powers Decart’s proprietary models as well as external LLMs and agentic workloads.</p></div>
        <div id="lucy" className="split model-row" tabIndex={-1}><div className="visual-card lucy-card"><div className="lucy-stage"><Media file={inlineOutfit ? `lucy-${inlineOutfit}.mp4` : 'lucy-base.mp4'} poster={inlineOutfit ? `lucy-${inlineOutfit}.jpg` : 'lucy-base.jpg'} label="Lucy outfit preview" controls /><div className="outfit-tray" aria-label="Choose a Lucy outfit">{outfits.map(x => <Button key={x.id} aria-label={`Preview ${x.name}`} aria-pressed={inlineOutfit === x.id} onClick={() => setInlineOutfit(inlineOutfit === x.id ? 0 : x.id)}><img src={asset(`lucy-${x.id}-thumb.jpg`)} alt="" /></Button>)}</div></div></div><div className="feature-copy"><div className="model-label"><span>Lucy</span><small>Version 2.5</small></div><h2>World Editing Model</h2><p>Edit reality as it streams. Transform people, objects and environments live.</p><div className="button-row"><Button className="pill" onClick={() => open('demo', 'lucy')}>Learn more<span className="sr-only"> about Lucy</span></Button><Button className="pill outline" onClick={() => open('demo', 'lucy')}>Access demo<span className="sr-only"> for Lucy</span></Button></div></div></div>
        <div id="oasis" className="split model-row oasis-row" tabIndex={-1}><div className="feature-copy"><div className="model-label"><span>Oasis</span><small>Version 3</small></div><h2>World Generation Model</h2><p>Create live, interactive worlds that evolve instantly, with every action.</p><div className="button-row"><Button className="pill" onClick={() => open('demo', 'oasis')}>Learn more<span className="sr-only"> about Oasis</span></Button><Button className="pill outline" onClick={() => open('demo', 'oasis')}>Access demo<span className="sr-only"> for Oasis</span></Button></div></div><div className="visual-card oasis-card"><Media file="oasis.mp4" poster="oasis-poster.webp" label="Oasis generated world preview" controls /></div></div>
      </section>
      <section id="research" className="section research" tabIndex={-1}><div className="research-heading"><div><h2>Math to Matter</h2><p>New research, launches, and experiments.</p></div><a className="pill" href="https://decart.ai/blog" target="_blank" rel="noreferrer">See All<ArrowUpRight size={16} /></a></div><div className="research-grid">{research.map((article, i) => <article key={article.title}><a href={article.url} target="_blank" rel="noreferrer" className="article-image" aria-label={`Read ${article.title}`}><img src={asset(`research-${i}.jpg`)} alt="" /></a><small>{article.date}</small><h3><a href={article.url} target="_blank" rel="noreferrer">{article.title}</a></h3><div className="byline"><span className="author-dot" />{article.author}</div><p>{article.text}</p><a className="text-link" href={article.url} target="_blank" rel="noreferrer">Read more <ArrowRight size={14} /></a></article>)}</div></section>
    </main>
    <footer><div className="footer-top"><a href="#main" className="footer-logo" aria-label="Decart home"><img src={asset('decart-logo.svg')} alt="Decart" width="112" height="32" /></a><div><a href="#optimization">Optimization</a><a href="#lucy">Lucy</a><a href="#oasis">Oasis</a><Button onClick={() => open('demo')}>API Platform</Button></div><div><a href="#research">Research</a><a href="https://decart.ai/newsroom" target="_blank" rel="noreferrer">News</a><a href="https://docs.platform.decart.ai/" target="_blank" rel="noreferrer">Documentation</a></div><div><Button onClick={() => open('contact')}>Contact</Button><a href="https://decart.ai/blog" target="_blank" rel="noreferrer">Blog</a><a href="https://decart.ai/about" target="_blank" rel="noreferrer">Company</a></div></div><div className="footer-bottom"><span>DECART.AI 2026</span><span>Independent design study · Official-site reference</span><a href="https://decart.ai/privacy-policy" target="_blank" rel="noreferrer">Privacy policy <ArrowUpRight size={10} /></a></div></footer>
    <Dialog open={dialog !== null} onOpenChange={(value) => { if (!value) close(); }}><DialogContent className={`dialog ${dialog === 'demo' ? 'demo-dialog' : ''} ${dialog === 'menu' ? 'menu-dialog' : ''}`}>
      <DialogClose className="dialog-close icon-button" aria-label="Close dialog"><X size={22} /></DialogClose>
      {dialog === 'menu' ? <><DialogTitle>Explore Decart</DialogTitle><DialogDescription className="sr-only">Navigate the Live AI lab</DialogDescription><nav className="mobile-links"><Button onClick={() => jump('optimization')}>Optimization Stack<ArrowUpRight /></Button><Button onClick={() => jump('lucy')}>Lucy<ArrowUpRight /></Button><Button onClick={() => jump('oasis')}>Oasis<ArrowUpRight /></Button><Button onClick={() => jump('research')}>Research<ArrowUpRight /></Button><Button onClick={() => { setDialog('contact'); requestAnimationFrame(() => (document.getElementById('contact-email') ?? document.getElementById('inquiry-summary'))?.focus()); }}>Contact us<ArrowUpRight /></Button></nav></> : dialog === 'contact' ? <><DialogTitle>{submitted ? 'Your inquiry is ready' : 'Let’s build what’s next.'}</DialogTitle><DialogDescription>{submitted ? 'Saved in this preview. No message has been sent.' : 'Tell us what you’re working on. This demo keeps your inquiry in this browser session.'}</DialogDescription>{submitted ? <div className="confirmation" id="inquiry-summary" tabIndex={-1}><span className="success-mark"><Check size={25} /></span><dl><dt>Work email</dt><dd>{email}</dd><dt>Interested in</dt><dd>{interest}</dd><dt>Your project</dt><dd>{message}</dd></dl><Button className="pill" onClick={() => { setSubmitted(false); requestAnimationFrame(() => document.getElementById('contact-email')?.focus()); }}>Edit inquiry</Button></div> : <form className="contact-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); requestAnimationFrame(() => document.getElementById('inquiry-summary')?.focus()); }}><label>Work email<input id="contact-email" required type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={event => setEmail(event.target.value)} /></label><label>I’m interested in<select value={interest} onChange={event => setInterest(event.target.value)}><option>Lucy · Live video</option><option>Oasis · World models</option><option>Decart Optimization Stack</option><option>Research collaboration</option></select></label><label>What are you building?<textarea required rows={4} placeholder="A little about your project…" value={message} onChange={event => setMessage(event.target.value)} /></label><Button type="submit" className="pill">Save inquiry <ArrowRight size={16} /></Button></form>}</> : <><DialogTitle>Explore Live AI</DialogTitle><DialogDescription>Choose a model and explore recorded previews from Decart.</DialogDescription><Tabs value={model} onValueChange={value => setModel(value ?? 'lucy')} className="demo-tabs"><TabsList className="tab-list" aria-label="Live AI models"><TabsTab value="lucy">Lucy</TabsTab><TabsTab value="oasis">Oasis</TabsTab></TabsList><TabsPanel value="lucy"><div className="demo-preview"><Media file={outfit ? `lucy-${outfit}.mp4` : 'lucy-base.mp4'} poster={outfit ? `lucy-${outfit}.jpg` : 'lucy-base.jpg'} label="Selected Lucy preview" controls /></div><div className="demo-description"><h3>World Editing Model</h3><span className="recorded-label">Recorded preview</span></div><p className="selection-status" role="status">{outfit ? outfits.find(x => x.id === outfit)?.name : 'Original scene'}</p><div className="demo-presets" aria-label="Scene transformations"><Button className="original-preset" aria-pressed={outfit === 0} onClick={() => setOutfit(0)}>Original</Button>{outfits.map(x => <Button key={x.id} aria-pressed={outfit === x.id} aria-label={`Select ${x.name}`} onClick={() => setOutfit(x.id)}><img src={asset(`lucy-${x.id}-thumb.jpg`)} alt="" /><span>{x.short}</span></Button>)}</div></TabsPanel><TabsPanel value="oasis"><div className="demo-preview"><Media file="oasis.mp4" poster="oasis-poster.webp" label="Selected Oasis preview" controls /></div><div className="demo-description"><h3>World Generation Model</h3><span className="recorded-label">Recorded preview</span></div><p>Create live, interactive worlds that evolve instantly, with every action.</p><a className="text-link" href="https://decart.ai/oasis" target="_blank" rel="noreferrer">Explore Oasis on Decart <ArrowUpRight size={16} /></a></TabsPanel></Tabs></>}
    </DialogContent></Dialog>
  </>;
}
