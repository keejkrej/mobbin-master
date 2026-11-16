'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowUp, AudioLines, Check, ChevronDown, CircleHelp, Copy, Eye, Folder, GraduationCap, Home, ImageIcon, Images, Info, LayoutGrid, ListTodo, Menu, Palette, Play, Plus, Search, Share, SlidersHorizontal, Sparkles, SquareUserRound, Trash2, Video, Workflow, X } from 'lucide-react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Toggle } from '@study/ui';

const starterPrompt = 'Style: Shot with a shallow depth of field creating soft background blur while maintaining crisp subject detail. Rich, warm color grading emphasizes golden hour tones and muted earth colors. Natural lighting casts subtle shadows and highlights across the scene. Lifestyle documentary, warm earth tones, shallow focus, natural lighting, candid composition.';
const presets = ['Motion Sketch', 'Character Swap', 'Camera', 'Movement', 'Action'];
const styles = [{ name: 'Vivid', image: 'style-vivid.webp' }, { name: 'Vivid Warm', image: 'style-warm.webp' }, { name: 'Vivid Cool', image: 'style-cool.webp' }, { name: 'Minimal', image: 'style-minimal.webp' }];
type Result = { prompt: string; type: string; model: string; ratio: string; style: string; resolution: string; count: string };

function Dots({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'dots small' : 'dots'} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2.2"/><circle cx="5" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/><circle cx="12" cy="20" r="2.2"/></svg>;
}

export default function Runway() {
  const [banner, setBanner] = useState(true);
  const [workspace, setWorkspace] = useState('Tool');
  const [type, setType] = useState('Image');
  const [prompt, setPrompt] = useState(starterPrompt);
  const [preset, setPreset] = useState('Motion Sketch');
  const [selectedStyle, setSelectedStyle] = useState('Vivid');
  const [gallery, setGallery] = useState('Styles');
  const [model, setModel] = useState('Gen-4');
  const [ratio, setRatio] = useState('4:3');
  const [resolution, setResolution] = useState('720p');
  const [count, setCount] = useState('4');
  const [fixedSeed, setFixedSeed] = useState(false);
  const [seed, setSeed] = useState('');
  const [range, setRange] = useState('2');
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [menu, setMenu] = useState<'model' | 'ratio' | 'session' | null>(null);
  const [dialog, setDialog] = useState<'help' | 'credits' | 'reference' | 'share' | 'style' | null>(null);
  const [mobilePanel, setMobilePanel] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [generation, setGeneration] = useState(false);
  const [notice, setNotice] = useState('');
  const [reference, setReference] = useState('');
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatTip, setChatTip] = useState(true);
  const [styleQuery, setStyleQuery] = useState('');
  const [styleSearch, setStyleSearch] = useState(false);
  const [customStyles, setCustomStyles] = useState(false);
  const [styleName, setStyleName] = useState('');
  const file = useRef<HTMLInputElement>(null);
  const generationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (generationTimer.current) clearTimeout(generationTimer.current); }, []);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 3200); return () => clearTimeout(timer); }, [notice]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!(event.target as Element).closest('[data-popup]')) setMenu(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(null); setSettingsOpen(false); setMobilePanel(false); } };
    document.addEventListener('pointerdown', dismiss); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); };
  }, []);

  const generate = () => {
    if (!prompt.trim() || generation) return;
    setGeneration(true); setResult(null); setMobilePanel(false); setSettingsOpen(false); setMenu(null);
    generationTimer.current = setTimeout(() => { setResult({ prompt: prompt.trim(), type, model, ratio, style: selectedStyle, resolution, count }); setGeneration(false); }, 650);
  };
  const changeWorkspace = (name: string) => {
    if (name === 'Assets') { setDialog('reference'); return; }
    if (name === 'Workflow' || name === 'Live') { setNotice(`${name} is a local preview in this study.`); return; }
    setWorkspace(name === 'App' ? 'Tool' : name);
    if (name === 'Tool' || name === 'Chat') setMobilePanel(true);
    if (name === 'App') { setResult(null); setNotice('Choose a preset to start creating.'); }
  };
  const copyPrompt = async () => { try { await navigator.clipboard.writeText(prompt); setNotice('Prompt copied'); } catch { setNotice('Clipboard is unavailable in this browser.'); } };
  const filteredStyles = styles.filter(style => style.name.toLowerCase().includes(styleQuery.toLowerCase()));

  return <div className={`runway ${banner ? '' : 'banner-hidden'}`}>
    {banner && <div className="promo"><span>For a limited time, get 15% off when you upgrade to any paid plan with code <strong>GEN45</strong>. See <Button className="terms" onClick={() => setDialog('credits')}>terms</Button></span><Button className="promo-upgrade" onClick={() => setDialog('credits')}>Upgrade</Button><Button className="promo-close icon" aria-label="Dismiss offer" onClick={() => setBanner(false)}><X size={17}/></Button></div>}
    <div className="workspace">
      <aside className="rail" aria-label="Main navigation">
        <Button className="rail-overview" aria-label="Workspace overview" onClick={() => { setResult(null); setNotice('Workspace overview'); }}><ListTodo size={22}/></Button>
        <nav>{[{ name: 'Tool', icon: <SlidersHorizontal/> }, { name: 'App', icon: <LayoutGrid/> }, { name: 'Chat', icon: <Dots/> }, { name: 'Workflow', icon: <Workflow/> }, { name: 'Live', icon: <SquareUserRound/> }, { name: 'Assets', icon: <Folder/> }].map(item => <Button className={`rail-item ${workspace === item.name ? 'selected' : ''}`} key={item.name} onClick={() => changeWorkspace(item.name)} aria-label={item.name}><span>{item.icon}</span><small>{item.name}</small></Button>)}</nav>
        <a className="rail-home" href="/" aria-label="All interface studies"><Home size={21}/><span>AI</span></a>
      </aside>

      <section className={`tool-panel ${mobilePanel ? 'mobile-open' : ''}`} aria-label={workspace === 'Chat' ? 'Chat controls' : 'Generation controls'}>
        <div className="mobile-panel-title"><strong>Generation controls</strong><Button className="icon" aria-label="Close generation controls" onClick={() => setMobilePanel(false)}><X size={18}/></Button></div>
        {workspace === 'Chat' ? <>
          <div className="chat-top"><Dots small/><Button className="outlined" onClick={() => { setChatMessage(''); setChatPrompt(''); }}><Plus size={15}/>New chat</Button></div>
          <div className="chat-history"><div className="chat-question">Learn about Gen-4.5</div><p className="chat-response"><Dots small/>{chatMessage || 'Explore Gen-4.5 with the Apps and Presets on your canvas.'}</p></div>
          <div className="chat-bottom">{chatTip && <div className="chat-tip"><Button className="icon" aria-label="Dismiss model information" onClick={() => setChatTip(false)}><X size={14}/></Button><strong>You can now select a mode for model usage.</strong><p>Videos with sound will cost 320 credits for 8s of video.</p></div>}<form className="chat-composer" onSubmit={event => { event.preventDefault(); if (chatPrompt.trim()) { setChatMessage(`Try a ${chatPrompt.trim().toLowerCase()} scene with a clear subject, natural light, and a gentle camera movement. This is a local sample suggestion.`); setChatPrompt(''); } }}><textarea placeholder="Describe your idea" aria-label="Describe your idea" value={chatPrompt} onChange={event => setChatPrompt(event.target.value)}/><div><Button className="icon" aria-label="Add chat reference" onClick={() => setDialog('reference')}><Plus size={17}/></Button><Button className="icon" aria-label="Chat settings" onClick={() => setDialog('help')}><SlidersHorizontal size={15}/></Button><span>All <ChevronDown size={12}/></span><Button type="submit" className="chat-send icon" aria-label="Send chat message" disabled={!chatPrompt.trim()}><ArrowUp size={18}/></Button></div></form><small>Chat Mode can make mistakes. Double check responses.</small></div>
        </> : <>
          <div className="mode-tabs"><Button className="icon back" aria-label="Back to chat" onClick={() => setWorkspace('Chat')}><ArrowLeft size={17}/></Button>{[{ label: 'Image', icon: <ImageIcon/> }, { label: 'Video', icon: <Video/> }, { label: 'Audio', icon: <AudioLines/> }].map(item => <Button key={item.label} className={type === item.label ? 'active' : ''} aria-pressed={type === item.label} onClick={() => setType(item.label)}>{item.icon}{item.label}</Button>)}</div>
          <div className="panel-scroll">
            <div className="prompt-box"><div className="reference-row"><Button aria-label="View sketch reference" onClick={() => setDialog('reference')}><img src="/runway/assets/reference-sketch.webp" alt="Hand-drawn scene reference"/></Button><Button aria-label="View desk reference" onClick={() => setDialog('reference')}><img src="/runway/assets/reference-desk.webp" alt="Person working at a desk"/></Button><Button className="add-reference" aria-label="Add reference" onClick={() => setDialog('reference')}><Plus size={19}/></Button></div><textarea aria-label="Generation prompt" maxLength={1000} value={prompt} onChange={event => setPrompt(event.target.value)} placeholder="Describe what you want to create..."/><div className="character-count">{prompt.length}<span>/1000</span></div>{reference && <div className="selected-reference"><Images size={13}/><span>{reference}</span><Button aria-label="Remove reference" onClick={() => setReference('')}><X size={12}/></Button></div>}<div className="prompt-actions"><Button className="square-icon" aria-label="Copy prompt" onClick={copyPrompt}><Copy size={16}/></Button><Button className="square-icon" aria-label="Clear prompt" onClick={() => setPrompt('')}><Trash2 size={16}/></Button><span/><Button className="square-icon" aria-label="Prompt guide" onClick={() => setDialog('help')}><GraduationCap size={17}/></Button><Button className="square-icon" aria-label="Preview prompt" onClick={() => { setNotice('Prompt ready. Choose Generate to view a local sample.'); }}><Eye size={17}/></Button></div></div>
            <div className="gallery-heading"><Button className={gallery === 'References' ? 'pill active' : 'pill'} onClick={() => setGallery('References')}><Images size={17}/>References</Button><Button className={gallery === 'Styles' ? 'pill active' : 'pill'} onClick={() => setGallery('Styles')}><Palette size={17}/>Styles</Button><Button className="square-icon gallery-chevron" aria-label="Toggle gallery" onClick={() => setGallery(gallery ? '' : 'Styles')}><ChevronDown size={16}/></Button></div>
            {gallery && <><div className="gallery-tabs"><Button className={!customStyles ? 'current' : ''} onClick={() => setCustomStyles(false)}>All</Button><Button className={customStyles ? 'current' : ''} onClick={() => setCustomStyles(true)}>{gallery === 'Styles' ? 'Custom Styles' : 'My References'}</Button><Button className="icon" aria-label="Search styles" onClick={() => setStyleSearch(!styleSearch)}><Search size={16}/></Button></div>{styleSearch && <input className="style-search" aria-label="Find styles" placeholder="Search styles..." value={styleQuery} onChange={event => setStyleQuery(event.target.value)}/>}<div className="style-grid"><Button className="new-style" aria-label={gallery === 'Styles' ? 'Create style' : 'Upload reference'} onClick={() => setDialog(gallery === 'Styles' ? 'style' : 'reference')}><Plus size={21}/></Button>{!customStyles && (gallery === 'Styles' ? filteredStyles : [{ name: 'Desk reference', image: 'reference-desk.webp' }, { name: 'Sketch reference', image: 'reference-sketch.webp' }]).map(style => <Button className={`style-card ${selectedStyle === style.name ? 'chosen' : ''}`} key={style.name} aria-label={`Use ${style.name}`} aria-pressed={selectedStyle === style.name} onClick={() => { setSelectedStyle(style.name); if (gallery === 'References') setReference(style.name); }}><img src={`/runway/assets/${style.image}`} alt=""/><span>{style.name}</span></Button>)}{customStyles && styleName && <Button className="style-card custom-style" onClick={() => setSelectedStyle(styleName)}><Palette size={24}/><span>{styleName}</span></Button>}</div></>}
          </div>
          <div className="generation-settings" data-popup>{settingsOpen && <div className="settings-popover"><div><span>Resolution</span><div className="segmented">{['1080p', '720p'].map(option => <Button key={option} aria-pressed={resolution === option} className={resolution === option ? 'selected' : ''} onClick={() => setResolution(option)}>{option}</Button>)}</div></div><label>Aesthetic Range<input aria-label="Aesthetic range" type="number" min={0} max={5} value={range} onChange={event => setRange(event.target.value)}/></label><div><span>Fixed Seed</span><Toggle className="seed-switch" aria-label="Fixed seed" pressed={fixedSeed} onPressedChange={setFixedSeed}><span/></Toggle></div><input className="seed-input" aria-label="Seed" placeholder="Seed" disabled={!fixedSeed} value={seed} onChange={event => setSeed(event.target.value)}/></div>}
            <div className="settings-bar"><Button className="selected-tools" aria-label="Reference and style tools" onClick={() => setGallery(gallery === 'References' ? 'Styles' : 'References')}><Images size={15}/><Palette size={15}/></Button><span/><label className="image-count"><ImageIcon size={15}/><select aria-label="Number of outputs" value={count} onChange={event => setCount(event.target.value)}>{['1','2','4'].map(value => <option key={value}>{value}</option>)}</select></label><div className="ratio-anchor"><Button className="square-text" aria-label="Aspect ratio" aria-expanded={menu === 'ratio'} onClick={() => setMenu(menu === 'ratio' ? null : 'ratio')}><Copy size={15}/>{ratio}</Button>{menu === 'ratio' && <div className="small-menu ratio-menu">{['4:3','16:9','1:1','9:16'].map(value => <Button key={value} onClick={() => { setRatio(value); setMenu(null); }}>{value}{ratio === value && <Check size={14}/>}</Button>)}</div>}</div><Button className={`square-icon settings-toggle ${settingsOpen ? 'active' : ''}`} aria-label="Generation settings" aria-expanded={settingsOpen} onClick={() => setSettingsOpen(!settingsOpen)}><SlidersHorizontal size={17}/></Button></div>
          </div>
          <footer className="generation-footer"><div className="model-anchor" data-popup><Button className="model-select" aria-label="Select generation model" aria-expanded={menu === 'model'} onClick={() => setMenu(menu === 'model' ? null : 'model')}>{model}<ChevronDown size={15}/></Button>{menu === 'model' && <div className="small-menu model-menu">{['Gen-4','Gen-4.5','Gen-4 Turbo'].map(value => <Button key={value} onClick={() => { setModel(value); setMenu(null); }}>{value}{model === value && <Check size={14}/>}</Button>)}</div>}</div><Button className="icon model-info" aria-label="About generation models" onClick={() => setDialog('help')}><Info size={16}/></Button><Button className="primary generate" disabled={!prompt.trim() || generation} onClick={generate}><ImageIcon size={17}/>{generation ? 'Generating...' : 'Generate'}</Button></footer>
        </>}
      </section>

      <main className="stage"><header className="stage-header"><Button className="icon mobile-controls" aria-label="Open generation controls" onClick={() => setMobilePanel(true)}><Menu size={19}/></Button><div className="session-anchor" data-popup><Button className="session-button" aria-expanded={menu === 'session'} onClick={() => setMenu(menu === 'session' ? null : 'session')}>Untitled session <ChevronDown size={15}/></Button>{menu === 'session' && <div className="small-menu session-menu"><Button onClick={() => { setResult(null); setMenu(null); setNotice('New session ready'); }}><Plus size={15}/>New session</Button><Button onClick={() => { setDialog('share'); setMenu(null); }}><Share size={15}/>Share session</Button></div>}</div><div className="stage-actions"><span className="credits">125 credits</span><Button className="primary upgrade" onClick={() => setDialog('credits')}>Upgrade</Button><Button className="square-icon share-icon" aria-label="Share session" onClick={() => setDialog('share')}><Share size={17}/></Button><Button className="square-icon help-button" aria-label="Help and shortcuts" onClick={() => setDialog('help')}><CircleHelp size={17}/></Button></div></header>
        <div className="canvas-content">{generation ? <section className="generation-progress" role="status"><span className="spinner"/><h1>Creating your preview</h1><p>Putting your prompt and style together...</p></section> : result ? <section className="result-view"><div className="result-top"><div><span className="result-kicker">LOCAL PREVIEW</span><h1>{result.type} generation</h1></div><Button className="outlined" onClick={() => setResult(null)}><ArrowLeft size={15}/>Back to presets</Button></div><figure className="result-image"><img src="/runway/assets/motion-sketch.webp" alt="Sample preview of a cinematic scene with two people and a red robot"/>{result.type === 'Video' && <span className="video-badge"><Play size={16}/>Video preview · 5s</span>}</figure><div className="result-meta"><span>{result.model}</span><span>{result.ratio}</span><span>{result.style}</span><span>{result.resolution}</span><span>{result.count} outputs</span></div><p className="result-prompt">{result.prompt}</p><p className="result-disclaimer">Local sample using the saved reference artwork. No image, video, or audio was generated and no credits were used.</p><div className="result-actions"><Button className="primary" onClick={() => { setMobilePanel(true); setNotice('Edit your prompt, then Generate again.'); }}>Edit prompt</Button><a className="outlined" href="/runway/assets/motion-sketch.webp" download="runway-reference-preview.webp"><ArrowDownToLine size={16}/>Download preview</a></div></section> : <section className="feature"><h1>Introducing Gen-4.5 Image to Video</h1><p>Explore with new Apps and Presets below.</p><div className="preset-tabs" aria-label="Creative presets">{presets.map(item => <Button key={item} className={preset === item ? 'selected' : ''} aria-pressed={preset === item} onClick={() => setPreset(item)}>{item}</Button>)}</div><figure className="hero-art"><img src="/runway/assets/motion-sketch.webp" alt="Two people in a cinematic low-angle scene beside a red robot, annotated with crash zoom and whip pan directions"/><figcaption>{preset}</figcaption></figure><Button className="primary try-now" onClick={() => { setType('Video'); setPrompt(`Create a cinematic ${preset.toLowerCase()} with a dramatic low-angle perspective and smooth camera movement.`); setWorkspace('Tool'); setMobilePanel(true); setNotice(`${preset} loaded in your generation controls.`); }}>Try it now</Button></section>}</div>
      </main>
    </div>

    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="runway-dialog"><div className="dialog-heading"><DialogTitle>{dialog === 'help' ? 'Runway help' : dialog === 'reference' ? 'Add a reference' : dialog === 'credits' ? 'Your creative workspace' : dialog === 'style' ? 'Create a custom style' : 'Share session'}</DialogTitle><DialogClose className="icon" aria-label="Close dialog"><X size={20}/></DialogClose></div><DialogDescription>{dialog === 'help' ? 'A few ways to get more from your next idea.' : dialog === 'reference' ? 'Use an image to guide the composition or visual style.' : dialog === 'credits' ? 'This interface study uses local previews. No credits or payment are required.' : dialog === 'style' ? 'Give your local style a name to find it again in this session.' : 'Copy a link to this local interface study.'}</DialogDescription>
      {dialog === 'help' && <><div className="help-row"><Sparkles size={20}/><div><h3>Start with a clear prompt</h3><p>Describe your subject, surroundings, lighting, and camera movement.</p></div></div><div className="help-row"><Images size={20}/><div><h3>Make it your own</h3><p>Add references, choose a style, then set your model and aspect ratio.</p></div></div><div className="shortcut-row"><span>Close a dialog</span><kbd>Esc</kbd></div><Button className="primary full" onClick={() => setDialog(null)}>Got it</Button></>}
      {dialog === 'reference' && <><Button className="upload-reference" onClick={() => file.current?.click()}><Plus size={24}/><strong>Choose an image</strong><span>Files stay in this browser session</span></Button><div className="reference-choices">{[{ name: 'Desk reference', image: 'reference-desk.webp' }, { name: 'Sketch reference', image: 'reference-sketch.webp' }].map(item => <Button key={item.name} onClick={() => { setReference(item.name); setDialog(null); }}><img src={`/runway/assets/${item.image}`} alt={item.name}/><span>{item.name}</span></Button>)}</div></>}
      {dialog === 'credits' && <><div className="credit-summary"><span>Available in this study</span><strong>Unlimited local previews</strong><p>Explore every control without connecting an account.</p></div><Button className="primary full" onClick={() => setDialog(null)}>Keep creating</Button></>}
      {dialog === 'share' && <><input className="dialog-input" readOnly aria-label="Session link" value="/runway/"/><Button className="primary full" onClick={async () => { try { await navigator.clipboard.writeText(`${window.location.origin}/runway/`); setNotice('Session link copied'); } catch { setNotice('Clipboard is unavailable in this browser.'); } }}>Copy link</Button></>}
      {dialog === 'style' && <form onSubmit={event => { event.preventDefault(); if (styleName.trim()) { setStyleName(styleName.trim()); setSelectedStyle(styleName.trim()); setCustomStyles(true); setDialog(null); } }}><input className="dialog-input" placeholder="Style name" aria-label="Style name" value={styleName} onChange={event => setStyleName(event.target.value)} required/><Button className="primary full" type="submit" disabled={!styleName.trim()}>Save style</Button></form>}
      {notice && <p className="dialog-notice" role="status">{notice}</p>}
    </DialogContent></Dialog>
    <input hidden ref={file} type="file" accept="image/*" aria-label="Reference image file" onChange={event => { const name = event.target.files?.[0]?.name; if (name) { setReference(name); setDialog(null); } }}/>
    {notice && !dialog && <div className="toast" role="status">{notice}</div>}
  </div>;
}
