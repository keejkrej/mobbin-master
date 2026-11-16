'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Instagram, Linkedin, Menu, X, Youtube } from 'lucide-react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Tabs, TabsList, TabsPanel, TabsTab } from '@study/ui';

type Project = { id: string; category: string; title: string; description: string; image: string; kind: string; detail: string };
const projects: Project[] = [
  { id: 'arena', category: 'PUBLIC EVALUATIONS', title: 'Creative Arena', description: 'Human taste, in the loop. Explore how creative work is evaluated by people who make it.', image: 'arena.webp', kind: 'evaluations', detail: 'Creative Arena brings human judgment into the evaluation of creative AI. Working creatives bring their taste and real-world experience to the question of what makes an output useful, compelling, and original.' },
  { id: 'benchmark', category: 'RESEARCH & INSIGHTS', title: 'Human Creativity Benchmark', description: 'A human perspective on what makes creative work great.', image: 'benchmark.webp', kind: 'research', detail: 'The Human Creativity Benchmark connects creative expertise with AI evaluation. It considers quality, style, and brand fit through the judgment of working creatives, helping to shape the future of creative tools.' },
];
const questions = [
  { title: 'What is Creative Human Data by Contra Labs?', answer: 'Creative Human Data, or Contra’s creative RLHF (reinforcement learning from human feedback), uses professional creatives—like designers, writers, and marketers—to evaluate and fine-tune AI model outputs based on subjective quality, style, and brand fit. Contra is setting a new standard with the Human Creativity Benchmark, helping to shape the future of creative tools.' },
  { title: 'How does Contra help AI companies train creative models?', answer: 'Creative experts contribute human feedback on model outputs, helping teams understand quality, style, and creative intent. Their judgment provides a human perspective on where a model succeeds and where it can improve.' },
  { title: 'Who are the reviewers in Contra’s Creative Human Data network?', answer: 'The network brings together working creative professionals, including designers, writers, marketers, engineers, and specialists in video, social media, music, and audio.' },
  { title: 'What types of model outputs are a good fit for Creative Human Data powered by Contra?', answer: 'Creative work that benefits from human judgment: visual design, writing, images, video, and other outputs where taste, style, and intent matter.' },
  { title: 'Is Creative Human Data powered by Contra right for my team?', answer: 'If your team is exploring how people evaluate creative AI, start by describing the work you are building, the outputs you want to understand, and the creative expertise you need.' },
];

function Mark() { return <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M18 1C15.6 11.5 11.5 15.6 1 18c10.5 2.4 14.6 6.5 17 17 2.4-10.5 6.5-14.6 17-17C24.5 15.6 20.4 11.5 18 1Z" fill="currentColor"/><path d="M18 1v34M1 18h34" stroke="var(--color-ribbon)" strokeWidth=".8"/></svg>; }
function Wordmark() { return <span className="wordmark"><span>contra</span><b>LABS</b></span>; }

export default function ContraLabs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [intent, setIntent] = useState<'join' | 'contact'>('join');
  const [step, setStep] = useState<'form' | 'review' | 'complete'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('Design');
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('all');
  const [project, setProject] = useState<Project | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [social, setSocial] = useState<string | null>(null);
  const menuOpener = useRef<HTMLElement | null>(null);
  const projectOpener = useRef<HTMLElement | null>(null);
  const applicationOpener = useRef<HTMLElement | null>(null);
  const socialOpener = useRef<HTMLElement | null>(null);
  const applicationHeading = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => { if (applicationOpen) applicationHeading.current?.focus({ preventScroll: true }); }, [applicationOpen, step]);
  const focusedElement = () => document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const openSocial = (channel: string) => { socialOpener.current = focusedElement(); setSocial(channel); };

  const apply = (nextIntent: 'join' | 'contact' = 'join') => { applicationOpener.current = project ? projectOpener.current : menuOpen ? menuOpener.current : focusedElement(); setIntent(nextIntent); setStep('form'); setMenuOpen(false); setProject(null); setApplicationOpen(true); };
  const applicationTitle = intent === 'join' ? 'Join the creative frontier.' : 'Let’s build better creative AI.';
  const navigate = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }); };
  const nav = <><a href="#human-data" onClick={() => navigate('human-data')}>Creative human data</a><a href="#research" onClick={() => navigate('research')}>Research</a><a href="#questions" onClick={() => navigate('questions')}>About</a><Button className="text-link" onClick={() => apply()}>Join the lab <ArrowUpRight size={14}/></Button></>;

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="ribbon" aria-hidden="true"><Mark/></div>
    <header className="site-header"><a href="#top" aria-label="Contra Labs home"><Wordmark/></a><nav className="desktop-nav" aria-label="Main navigation">{nav}</nav><Button className="menu-toggle" aria-label="Open navigation" onClick={() => { menuOpener.current = focusedElement(); setMenuOpen(true); }}><Menu size={23}/></Button></header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-heading">
        <div className="hero-art"><img src="/contra-labs/assets/tapestry.webp" alt="A halftone tapestry of blue sky, clouds, and a flowering landscape"/><div className="art-shade"/><p>Leading next-gen creative<br/>AI research.</p></div>
        <div className="hero-copy"><h1 id="hero-heading">Human taste is the<br className="wide-break"/> new training data.</h1><p>Creative AI isn&apos;t good enough yet. Human creativity keeps evolving. We&apos;re here to make sure it leads.</p></div>
        <a className="explore-link" href="#research"><span>EXPLORE CONTRA LABS</span><ArrowDown size={15}/></a>
      </section>

      <section className="human-data" id="human-data" aria-labelledby="data-heading"><p className="eyebrow">CREATIVE HUMAN DATA</p><h2 id="data-heading">Built on real-world<br/>creative expertise.</h2><div className="data-bottom"><p>We build the eval layer for creative AI, helping AI tools and teams understand quality the way expert creatives do.</p><Button className="outline-button" onClick={() => apply('contact')}>Work with Contra Labs <ArrowUpRight size={16}/></Button></div></section>

      <section className="ecosystem" id="research" aria-labelledby="research-heading"><div className="section-heading"><div><h2 id="research-heading">Meet the Contra<br/>Labs ecosystem</h2><p>We build the eval layer for creative AI, helping AI tools and teams understand<br className="desktop-break"/> quality the way expert creatives do.</p></div><span className="chapter-number">01 / RESEARCH</span></div>
        <Tabs value={tab} onValueChange={value => setTab(value ?? 'all')} className="research-tabs"><TabsList aria-label="Research categories" className="research-tab-list"><TabsTab value="all">All work <span>02</span></TabsTab><TabsTab value="evaluations">Public evaluations</TabsTab><TabsTab value="research">Research &amp; insights</TabsTab></TabsList>
          {['all','evaluations','research'].map(category => <TabsPanel value={category} key={category}><div className="project-grid">{projects.filter(item => category === 'all' || item.kind === category).map(item => <Button className={`project-card ${item.id}`} key={item.id} onClick={() => { projectOpener.current = focusedElement(); setProject(item); }} aria-label={`Explore ${item.title}`}><img src={`/contra-labs/assets/${item.image}`} alt=""/><div className="project-shade"/><span className="project-category">{item.category}</span><h3>{item.id === 'arena' ? <>Creative<br/>Arena</> : <>Human Creativity<br/>Benchmark</>}</h3><span className="project-arrow"><ArrowUpRight size={22}/></span></Button>)}</div></TabsPanel>)}
        </Tabs>
        <div className="ecosystem-notes"><div><span>PRIVATE EVALUATIONS</span><h3>Your creative standard.<br/>Expert human judgment.</h3><Button className="text-link" onClick={() => apply('contact')}>Explore a collaboration <ArrowUpRight size={16}/></Button></div><div><span>CREATIVE AI AGENTS</span><h3>New tools.<br/>An enduring human perspective.</h3><Button className="text-link" onClick={() => apply()}>Help shape what comes next <ArrowUpRight size={16}/></Button></div></div>
      </section>

      <section className="questions" id="questions" aria-labelledby="questions-heading"><h2 id="questions-heading">Frequently asked<br/>questions</h2><div className="question-list">{questions.map((question,index) => <article className={`question ${openQuestion === index ? 'open' : ''}`} key={question.title}><h3><Button aria-expanded={openQuestion === index} aria-controls={`answer-${index}`} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>{question.title}<ChevronDown size={21}/></Button></h3><div id={`answer-${index}`} hidden={openQuestion !== index}><p>{question.answer}</p></div></article>)}</div></section>

      <section className="join-section" aria-labelledby="join-heading"><span className="eyebrow">A HUMAN PERSPECTIVE ON WHAT COMES NEXT</span><h2 id="join-heading">The future of creative AI<br/>starts with human taste.</h2><Button className="dark-button" onClick={() => apply()}>Join the lab <ArrowUpRight size={17}/></Button></section>
    </main>

    <footer className="site-footer"><div className="gilded-frame"/><a className="footer-wordmark" href="#top" aria-label="Back to Contra Labs home"><Wordmark/></a><p className="footer-description">The world&apos;s leading independent<br/>human data &amp; creative evaluation lab</p><div className="social-links" aria-label="Social channels"><Button aria-label="About Contra Labs on X" onClick={() => openSocial('X')}><X/></Button><Button aria-label="About Contra Labs on YouTube" onClick={() => openSocial('YouTube')}><Youtube/></Button><Button aria-label="About Contra Labs on LinkedIn" onClick={() => openSocial('LinkedIn')}><Linkedin/></Button><Button aria-label="About Contra Labs on Instagram" onClick={() => openSocial('Instagram')}><Instagram/></Button></div><nav className="footer-nav" aria-label="Footer navigation"><Button className="text-link" onClick={() => apply('contact')}>Get In Touch</Button><a href="#human-data">Creative Human Data</a><a href="#research" onClick={() => setTab('evaluations')}>Creative Arena</a><Button className="text-link" onClick={() => apply()}>Jobs</Button></nav><img className="creative-experts" src="/contra-labs/assets/creative-experts.webp" alt="A Renaissance-style gathering of creative experts with contemporary laptops"/><p className="study-note">Independent interface study · Local interactions · Based on Mobbin references</p></footer>

    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="navigation-dialog" finalFocus={applicationOpen ? "none" : () => menuOpener.current}><div className="modal-top"><DialogTitle><Wordmark/></DialogTitle><DialogClose aria-label="Close navigation" className="icon-button"><X/></DialogClose></div><nav aria-label="Mobile navigation">{nav}</nav><p>Human taste is the new training data.</p></DialogContent></Dialog>

    <Dialog open={project !== null} onOpenChange={open => { if (!open) setProject(null); }}><DialogContent className="project-dialog" finalFocus={applicationOpen ? "none" : () => projectOpener.current}><DialogClose className="icon-button close-project" aria-label="Close research details"><X/></DialogClose>{project && <><img className="detail-art" src={`/contra-labs/assets/${project.image}`} alt=""/><div className="detail-copy"><p className="eyebrow">{project.category}</p><DialogTitle>{project.title}</DialogTitle><DialogDescription>{project.description}</DialogDescription><p className="detail-body">{project.detail}</p><Button className="dark-button" onClick={() => apply('contact')}>Contact the research team <ArrowUpRight size={17}/></Button></div></>}</DialogContent></Dialog>

    <Dialog open={applicationOpen} onOpenChange={setApplicationOpen}><DialogContent className="application-dialog" finalFocus={() => applicationOpener.current}><div className="modal-top"><span className="eyebrow">CONTRA LABS / {intent === 'join' ? 'JOIN THE LAB' : 'GET IN TOUCH'}</span><DialogClose className="icon-button" aria-label="Close application"><X/></DialogClose></div><DialogTitle ref={applicationHeading} tabIndex={-1}>{step === 'complete' ? 'A new perspective, noted.' : step === 'review' ? 'A little introduction.' : applicationTitle}</DialogTitle><DialogDescription>{step === 'complete' ? 'Your sample application is complete in this browser. Nothing was sent to Contra Labs.' : step === 'review' ? 'Review your details before finishing this local application.' : 'Tell us a little about your work and your interest in creative AI.'}</DialogDescription>
      {step === 'form' && <form onSubmit={event => { event.preventDefault(); setStep('review'); }}><div className="form-row"><label>Your name<input name="name" autoComplete="name" required value={name} onChange={event => setName(event.target.value)} placeholder="Alex Morgan"/></label><label>Email address<input type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="alex@example.com"/></label></div><label>Your discipline<select value={discipline} onChange={event => setDiscipline(event.target.value)}><option>Design</option><option>Writing</option><option>Research</option><option>Engineering</option><option>Video & animation</option><option>Music & audio</option><option>Other creative work</option></select></label><label>{intent === 'join' ? 'What would you like to explore?' : 'Tell us about your project'}<textarea required value={message} onChange={event => setMessage(event.target.value)} placeholder="A little about your work, ideas, or research interests..." rows={3}/></label><p className="form-note">This is an interactive study. Your details stay in this page session.</p><Button type="submit" className="dark-button full" disabled={!name.trim() || !email.trim() || !message.trim()}>Review application <ArrowRight size={17}/></Button></form>}
      {step === 'review' && <><dl className="application-review"><div><dt>Name</dt><dd>{name}</dd></div><div><dt>Email</dt><dd>{email}</dd></div><div><dt>Discipline</dt><dd>{discipline}</dd></div><div><dt>Introduction</dt><dd>{message}</dd></div></dl><div className="review-actions"><Button className="outline-button" onClick={() => setStep('form')}>Edit details</Button><Button className="dark-button" onClick={() => setStep('complete')}>Finish local application <ArrowRight size={16}/></Button></div></>}
      {step === 'complete' && <div className="application-success"><span className="success-symbol"><Check size={25}/></span><p>Thank you, {name.split(' ')[0]}.<br/>Human creativity keeps evolving.</p><Button className="dark-button full" onClick={() => setApplicationOpen(false)}>Back to exploring <ArrowRight size={16}/></Button></div>}
    </DialogContent></Dialog>

    <Dialog open={social !== null} onOpenChange={open => { if (!open) setSocial(null); }}><DialogContent className="social-dialog" finalFocus={() => socialOpener.current}><div className="modal-top"><span className="eyebrow">CONTRA LABS</span><DialogClose className="icon-button" aria-label="Close social information"><X/></DialogClose></div><DialogTitle>Find the conversation.</DialogTitle><DialogDescription>Discover the ideas behind creative AI evaluation, human taste, and the work of Contra Labs. Explore our research and join the conversation.</DialogDescription><Button className="dark-button full" onClick={() => { setSocial(null); navigate('research'); }}>Explore the research <ArrowRight size={16}/></Button></DialogContent></Dialog>
  </>;
}
