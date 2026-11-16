'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogBackdrop, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@study/ui';
import { ArrowDown, ArrowRight, Check, ChevronDown, ChevronRight, Headphones, Mail, Menu, MessageSquare, Mic, MicOff, Phone, PhoneOff, Send, Video, X } from 'lucide-react';

type MenuName = 'Product' | 'Company' | '';
type DialogName = 'Talk to us' | 'Menu' | 'Sign in' | 'About Giga' | 'Giga raises $61M Series A' | 'Privacy' | '';
const scenarios = {
  Refund: { question: 'Hi, I need a refund.', answer: 'Of course. I found your recent order and can help you with the return. Your refund is ready for review.' },
  'Delivery delay': { question: 'Where is my order?', answer: 'Your order is on its way. I found the latest tracking update and can send it to your email.' },
  'Account access': { question: 'I can’t access my account.', answer: 'I can help you get back in. Let’s verify your email and walk through resetting your password.' },
};
const initialConversation = [
  { role: 'agent', text: 'Hi there! You’re chatting with Giga. How can I assist you today?' },
  { role: 'user', text: 'Hey, I need to update my shipping address.' },
  { role: 'agent', text: 'Done. While I’m here — you’ve placed 12 orders in 90 days.' },
  { role: 'agent', text: 'You qualify for Business tier pricing, about 22% off every order. Want to hear more?' },
  { role: 'user', text: 'What’s the difference exactly?' },
  { role: 'agent', text: 'The Business tier comes with many new features, including recurring orders. Would you like to try it?' },
];

export default function GigaSite() {
  const [menu, setMenu] = useState<MenuName>('');
  const [dialog, setDialog] = useState<DialogName>('');
  const [scenario, setScenario] = useState<keyof typeof scenarios>('Refund');
  const [calling, setCalling] = useState(false);
  const [muted, setMuted] = useState(false);
  const [messages, setMessages] = useState(initialConversation);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', volume: '10,000–50,000' });
  const [submitted, setSubmitted] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInReady, setSignInReady] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const productButton = useRef<HTMLButtonElement>(null);
  const companyButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const messageList = useRef<HTMLDivElement>(null);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const [sentMessages, setSentMessages] = useState(0);

  useEffect(() => {
    if (!menu) return;
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(''); (menu === 'Product' ? productButton : companyButton).current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!navigation.current?.contains(event.target as Node)) setMenu(''); };
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [menu]);
  useEffect(() => { if (sentMessages) messageList.current?.scrollTo({ top: messageList.current.scrollHeight, behavior: 'instant' }); }, [sentMessages]);

  useEffect(() => { if (submitted || signInReady) confirmationHeading.current?.focus({ preventScroll: true }); }, [submitted, signInReady]);

  function openDialog(next: DialogName) {
    if (!dialog) opener.current = menu ? (menu === 'Product' ? productButton.current : companyButton.current) : document.activeElement as HTMLElement;
    setMenu(''); setDialog(next); setSubmitted(false); setSignInReady(false);
  }
  function goTo(id: string) { setMenu(''); setDialog(''); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })); }
  function sendMessage(event: React.FormEvent) {
    event.preventDefault(); if (!message.trim()) return;
    const answer = /price|business|tier/i.test(message) ? 'The sample Business plan includes recurring orders and a dedicated support experience. Tell us about your team in Talk to us to preview a demo request.' : /address|ship|deliver/i.test(message) ? 'I can help update your delivery details. In this sample conversation, your address change is ready for review.' : 'Thanks for sharing that. Giga keeps the context across the conversation, so you don’t have to repeat yourself. What would you like help with next?';
    setMessages(items => [...items, { role: 'user', text: message.trim() }, { role: 'agent', text: answer }]); setMessage(''); setSentMessages(count => count + 1);
  }

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="landscape" aria-hidden="true"><div className="valley" /><div className="forest-left" /><div className="forest-right" /><div className="forest-shade" /></div>
        <header className="site-header">
          <a href="#main" className="brand" aria-label="Giga home"><img src="/giga/assets/giga-logo-white.svg" width="97" height="32" alt="Giga" /></a>
          <nav className="desktop-nav" aria-label="Primary navigation" ref={navigation}>
            <div className="nav-group"><Button ref={productButton} aria-expanded={menu === 'Product'} aria-controls="product-menu" onClick={() => setMenu(menu === 'Product' ? '' : 'Product')}>Product <ChevronDown size={13} /></Button>{menu === 'Product' && <div id="product-menu" className="nav-popover"><span>BUILT FOR EVERY CONVERSATION</span><a href="#voice" onClick={() => setMenu('')}><Phone size={17} /><div>Voice agents<small>Natural conversations at scale</small></div><ChevronRight size={15} /></a><a href="#conversation" onClick={() => setMenu('')}><MessageSquare size={17} /><div>Omnichannel<small>One continuous conversation</small></div><ChevronRight size={15} /></a></div>}</div>
            <div className="nav-group"><Button ref={companyButton} aria-expanded={menu === 'Company'} aria-controls="company-menu" onClick={() => setMenu(menu === 'Company' ? '' : 'Company')}>Company <ChevronDown size={13} /></Button>{menu === 'Company' && <div id="company-menu" className="nav-popover company-popover"><Button onClick={() => openDialog('About Giga')}>About Giga <ArrowRight size={16} /></Button><Button onClick={() => openDialog('Giga raises $61M Series A')}>News <ArrowRight size={16} /></Button><Button onClick={() => goTo('contact')}>Contact <ArrowRight size={16} /></Button></div>}</div>
          </nav>
          <div className="header-actions"><Button className="sign-in" onClick={() => openDialog('Sign in')}>Sign in</Button><Button className="pill" onClick={() => openDialog('Talk to us')}>Talk to us</Button><Button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => openDialog('Menu')}><Menu size={24} /></Button></div>
        </header>
        <div className="hero-copy"><Button className="announcement" onClick={() => openDialog('Giga raises $61M Series A')}><i />GIGA RAISES $61M SERIES A <ChevronRight size={12} /></Button><h1 id="hero-title">AI that talks like a human.<br />{' '}Handles millions of calls.</h1><p>AI agents for enterprise support</p><Button className="pill hero-cta" onClick={() => openDialog('Talk to us')}>Talk to us</Button></div>
        <div className="customers"><img src="/giga/assets/customer-logos.webp" alt="Postman, Rio, DoorDash, capital.com, and afriex" width="891" height="59" /></div>
      </section>

      <section className="product-section voice-section" id="voice" aria-labelledby="voice-heading">
        <div className="eyebrow"><i className="rust-dot" />VOICE</div><div className="section-heading"><h2 id="voice-heading">Phone support that sounds like your best agent, every call.</h2><p>Voice is the hardest channel to automate. Giga perfected it first — that engineering rigor carries through everywhere.</p></div>
        <div className={`voice-stage ${calling ? 'is-calling' : ''}`}><div className="stage-copy"><strong>Every call feels personal, informed, and resolved.</strong><p>Sub-second responses and real-time sentiment adaptation mean customers never wait, never repeat themselves, and never want to hang up.</p><label className="scenario-label">Try a sample<select aria-label="Sample scenario" value={scenario} onChange={e => { setScenario(e.target.value as keyof typeof scenarios); setCalling(false); }}><option>Refund</option><option>Delivery delay</option><option>Account access</option></select></label></div>
          <div className="voice-orb" aria-hidden="true" /><div className="phone-device"><div className="phone-screen"><div className="call-panel"><div className="call-person"><img src="/giga/assets/giga-mark-white.svg" alt="" width="29" height="29" /><span>Giga<small>{calling ? 'Sample conversation' : 'Ready when you are'}</small></span><i /></div><div className="call-controls"><span><Headphones size={16} /></span><Button aria-label={muted ? 'Unmute sample' : 'Mute sample'} aria-pressed={muted} onClick={() => setMuted(!muted)}>{muted ? <MicOff size={17} /> : <Mic size={17} />}</Button><span><Video size={17} fill="currentColor" /></span><span><MessageSquare size={16} /></span><Button className={calling ? 'end-call' : 'start-call'} aria-label={calling ? 'End sample call' : 'Start sample call'} onClick={() => setCalling(!calling)}>{calling ? <PhoneOff size={18} fill="currentColor" /> : <Phone size={18} fill="currentColor" />}</Button></div></div><div className="phone-body"><div className="waveform" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ height: `${12 + ((index * 31) % 67)}px`, animationDelay: `${index * 45}ms` }} />)}</div><p>{calling ? 'A conversation, not a script.' : 'A more human connection.'}</p><span>INTERACTIVE SAMPLE · NO AUDIO</span></div></div></div>
          <div className="customer-quote"><span>CUSTOMER</span><p>“{scenarios[scenario].question}”</p>{calling && <div className="agent-answer" role="status"><span>GIGA</span><p>{scenarios[scenario].answer}</p></div>}</div>
        </div>
      </section>

      <section className="product-section conversation-section" id="conversation" aria-labelledby="conversation-heading"><div className="eyebrow"><i />MEET EVERY CUSTOMER ON THEIR TERMS</div><div className="section-heading"><h2 id="conversation-heading">Your customers move between channels. Giga keeps the conversation going.</h2><p>One agent, one conversation, no matter where it starts or where it goes.</p></div><div className="conversation-stage"><div className="conversation-copy"><strong>A routine request. A $4,200 opportunity.</strong><p>Marcus messages to update his address. The agent handles it — and spots something bigger.</p><span>Try the sample conversation →</span></div><div className="chat-window"><header><MessageSquare size={17} /><img src="/giga/assets/giga-logo-white.svg" alt="Giga" width="76" height="26" /><span>LIVE SAMPLE</span></header><div className="chat-messages" ref={messageList} aria-label="Sample conversation messages" aria-live="polite">{messages.map((item, index) => <div className={`chat-message ${item.role}`} key={index}>{item.text}</div>)}</div><form className="chat-composer" onSubmit={sendMessage}><input aria-label="Message Giga" placeholder="Ask Giga a question…" value={message} onChange={e => setMessage(e.target.value)} /><Button type="submit" aria-label="Send message" disabled={!message.trim()}><ArrowRight size={19} /></Button></form></div><div className="channel-label"><i /><span>VOICE</span><ArrowRight size={15} /><span>CHAT</span></div></div></section>

      <section className="closing-section" id="contact"><span>LET’S TALK</span><h2>Better conversations.<br />Bigger possibilities.</h2><Button className="pill" onClick={() => openDialog('Talk to us')}>Talk to us <ArrowRight size={16} /></Button></section>
      <footer><a href="#main" aria-label="Back to Giga home"><img src="/giga/assets/giga-logo-white.svg" alt="Giga" width="97" height="32" /></a><span>AI agents for enterprise support</span><Button onClick={() => openDialog('Privacy')}>Privacy</Button><a href="#voice">Product</a><Button onClick={() => openDialog('About Giga')}>Company</Button><a href="#main" aria-label="Back to top"><ArrowDown className="back-to-top" size={20} /></a></footer>
    </main>

    <Dialog open={Boolean(dialog)} onOpenChange={open => { if (!open) setDialog(''); }}><DialogBackdrop className="dialog-backdrop" /><DialogContent className={`giga-dialog ${dialog === 'Menu' ? 'navigation-dialog' : ''}`} finalFocus={() => opener.current}><div className="dialog-heading"><DialogTitle>{dialog}</DialogTitle><DialogClose className="icon-button" aria-label="Close dialog"><X size={22} /></DialogClose></div>
      {dialog === 'Talk to us' ? <><DialogDescription>See what more human support could look like for your team.</DialogDescription>{submitted ? <div className="form-confirmation" role="status"><span><Check size={26} /></span><h3 ref={confirmationHeading} tabIndex={-1}>Your demo request is ready.</h3><p>Thanks, {form.name}. We’ve prepared your request for {form.company}.</p><dl><dt>Work email</dt><dd>{form.email}</dd><dt>Monthly conversations</dt><dd>{form.volume}</dd></dl><p className="form-note">This is a local preview. Your information has not been sent.</p><Button className="dark-pill" onClick={() => { setSubmitted(false); requestAnimationFrame(() => nameInput.current?.focus()); }}>Edit request</Button></div> : <form className="contact-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); }}><label>Full name<input ref={nameInput} aria-label="Full name" name="name" autoComplete="name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Alex Morgan" /></label><label>Work email<input aria-label="Work email" name="email" autoComplete="email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="alex@company.com" /></label><label>Company<input aria-label="Company" name="organization" autoComplete="organization" required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your company" /></label><label>Monthly support conversations<select aria-label="Monthly support conversations" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })}><option>Under 10,000</option><option>10,000–50,000</option><option>50,000–250,000</option><option>250,000+</option></select></label><Button className="dark-pill" type="submit">Preview demo request <ArrowRight size={17} /></Button><p className="form-note">Preview your request. Nothing is submitted.</p></form>}</> : dialog === 'Menu' ? <><DialogDescription className="sr-only">Explore Giga’s product and company.</DialogDescription><nav aria-label="Mobile navigation"><Button onClick={() => goTo('voice')}>Voice agents <ArrowRight size={20} /></Button><Button onClick={() => goTo('conversation')}>Omnichannel <ArrowRight size={20} /></Button><Button onClick={() => openDialog('About Giga')}>About Giga <ArrowRight size={20} /></Button><Button onClick={() => openDialog('Sign in')}>Sign in <ArrowRight size={20} /></Button><Button className="dark-pill" onClick={() => openDialog('Talk to us')}>Talk to us</Button></nav></> : dialog === 'Sign in' ? <><DialogDescription>Preview the workspace sign-in flow.</DialogDescription>{signInReady ? <div className="form-confirmation" role="status"><Mail size={32} /><h3 ref={confirmationHeading} tabIndex={-1}>Sign-in preview ready.</h3><p>A real workspace would send a link to {signInEmail}. No email has been sent.</p><DialogClose className="dark-pill">Done</DialogClose></div> : <form className="contact-form" onSubmit={e => { e.preventDefault(); setSignInReady(true); }}><label>Work email<input aria-label="Sign-in email" type="email" autoComplete="email" required value={signInEmail} onChange={e => setSignInEmail(e.target.value)} placeholder="you@company.com" /></label><Button className="dark-pill" type="submit">Continue <ArrowRight size={17} /></Button></form>}</> : <><DialogDescription>{dialog === 'About Giga' ? 'AI agents for enterprise support. Giga’s product brings human-like conversations to voice and chat, with context that carries across channels.' : dialog === 'Giga raises $61M Series A' ? 'The announcement featured in this Mobbin reference marks Giga’s $61M Series A. Explore the product through the local voice and chat samples below.' : 'This local interface study does not send form entries, record audio, or connect to Giga accounts. Demo requests and conversations stay in this page’s memory and reset on reload.'}</DialogDescription><div className="dialog-footer"><DialogClose className="dark-pill">Got it</DialogClose></div></>}
    </DialogContent></Dialog>
  </>;
}
