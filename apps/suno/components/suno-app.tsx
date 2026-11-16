'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, Toggle } from '@study/ui';
import { AudioLines, Bell, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Compass, Ellipsis, FlaskConical, Heart, House, Info, Library, ListFilter, LoaderCircle, Music2, Pause, Play, Plus, Repeat2, Search, Shuffle, SkipBack, SkipForward, SlidersHorizontal, Sparkles, SquarePlay, Trash2, Upload, Volume2, VolumeX, WandSparkles, X } from 'lucide-react';

type Song = { id: number; title: string; style: string; duration: number; cover: number; instrumental: boolean; local?: boolean };
const initialPrompt = 'A relaxed lo-fi beat starts with vinyl crackle and muted guitar, layered over lazy jazz chords on electric piano. Soft snare taps and brushed hi-hats create an unhurried rhythm. Nature samples—birds and distant cicadas—mingle with simple melodic motifs, evoking peace and focus for gardening.';
const samples: Song[] = [
  { id: 1, title: 'Lo-fi gardening x Sunny Day (Mashup)', style: 'jazz, lo-fi, soft', duration: 212, cover: 1, instrumental: true },
  { id: 2, title: 'Lo-fi gardening x Sunny Day (Mashup)', style: 'jazz, lo-fi, soft', duration: 210, cover: 2, instrumental: true },
  { id: 3, title: 'Lo-fi gardening', style: 'jazz, lo-fi, soft', duration: 230, cover: 3, instrumental: false },
  { id: 4, title: 'Garden In Slow Motion', style: 'jazz, lo-fi, soft', duration: 174, cover: 4, instrumental: true },
  { id: 5, title: 'Garden in My Hands', style: 'jazz, lo-fi, soft', duration: 198, cover: 2, instrumental: false },
];
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

function Range({ value, max = 100, label, onChange }: { value: number; max?: number; label: string; onChange: (value: number) => void }) {
  return <Slider value={value} min={0} max={max} onValueChange={(next) => onChange(Number(next))} className="range"><SliderControl className="range-control"><SliderTrack className="range-track"><SliderIndicator className="range-indicator"/><SliderThumb className="range-thumb" aria-label={label}/></SliderTrack></SliderControl></Slider>;
}

export default function SunoApp() {
  const [mode, setMode] = useState<'Simple' | 'Advanced'>('Simple');
  const [description, setDescription] = useState(initialPrompt);
  const [songTitle, setSongTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [instrumental, setInstrumental] = useState(false);
  const [model, setModel] = useState('v4.5-all');
  const [modelOpen, setModelOpen] = useState(false);
  const [filters, setFilters] = useState({ created: true, liked: true, instrumental: true });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [newest, setNewest] = useState(true);
  const [songs, setSongs] = useState<Song[]>(samples);
  const [liked, setLiked] = useState<number[]>([]);
  const [selected, setSelected] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(65);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [hookQuery, setHookQuery] = useState('');
  const [hookTab, setHookTab] = useState('All');
  const [hookSong, setHookSong] = useState<Song | null>(null);
  const [hookStart, setHookStart] = useState(0);
  const [hookSaved, setHookSaved] = useState(false);
  const [nav, setNav] = useState('Create');
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [creating, setCreating] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const prompt = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { if (!notice) return; const timeout = setTimeout(() => setNotice(''), 4200); return () => clearTimeout(timeout); }, [notice]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (!playing || !selected) return; const interval = setInterval(() => setProgress((current) => { if (current >= selected.duration) { if (repeat) return 0; setPlaying(false); return selected.duration; } return current + 1; }), 1000); return () => clearInterval(interval); }, [playing, selected, repeat]);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setModelOpen(false); setFiltersOpen(false); } }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const visibleSongs = songs.filter((song) => (!filters.created || song.local) && (!filters.liked || liked.includes(song.id)) && (!filters.instrumental || song.instrumental) && `${song.title} ${song.style}`.toLowerCase().includes(query.toLowerCase()));
  const orderedSongs = newest ? visibleSongs : [...visibleSongs].reverse();
  const hookSongs = songs.filter((song) => `${song.title} ${song.style}`.toLowerCase().includes(hookQuery.toLowerCase()) && (hookTab !== 'Liked' || liked.includes(song.id)) && (hookTab !== 'Public' || !song.local));
  function resetFilters() { setFilters({ created: false, liked: false, instrumental: false }); setFiltersOpen(false); }
  function selectSong(song: Song, shouldPlay = false) { setSelected(song); setProgress(0); setPlaying(shouldPlay); }
  function toggleLiked(id: number) { setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function openInfo(name: string) { setModal(name); setModelOpen(false); setFiltersOpen(false); }
  function selectNav(name: string) { setNav(name); setHookSong(null); if (name === 'Create') { prompt.current?.focus(); } else if (['Home', 'Explore', 'Library', 'Search'].includes(name)) { resetFilters(); if (name === 'Search') document.getElementById('workspace-search')?.focus(); } else if (name === 'Hooks') setModal('Create a New Hook'); else openInfo(name); }
  function createSamples() {
    if (!description.trim() || creating) return;
    setCreating(true);
    timer.current = setTimeout(() => {
      const title = songTitle.trim() || 'Lo-fi gardening';
      const first: Song = { id: Date.now(), title, style: mode === 'Advanced' ? description.slice(0, 60) : 'lo-fi, soft, relaxed', duration: 212, cover: 1, instrumental, local: true };
      setSongs((current) => [first, { ...first, id: first.id + 1, title: `${title} — Take 2`, cover: 4, duration: 196 }, ...current]);
      resetFilters(); setSelected(first); setProgress(0); setPlaying(false); setCreating(false); setQuery(''); setNav('Create'); setHookSong(null);
      setNotice('Two sample tracks added. No music was generated; playback is a silent preview.');
    }, 450);
  }
  function skip(direction: number) { if (!selected) return; const index = songs.findIndex((song) => song.id === selected.id); const next = shuffle ? Math.floor(Math.random() * songs.length) : (index + direction + songs.length) % songs.length; selectSong(songs[next], playing); }

  return <div className={`suno-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <aside className="sidebar" aria-label="Suno navigation"><div className="brand-row"><Button className="wordmark" aria-label="Suno home" onClick={() => selectNav('Create')}>SUNO</Button><Button className="icon-button collapse-button" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ChevronRight/> : <ChevronLeft/>}</Button></div>
      <Button className="account" onClick={() => openInfo('Your account')}><img src="/suno/assets/avatar.webp" alt=""/><span>samlee_mobbin<small>85 credits</small></span><ChevronDown size={12}/></Button>
      <nav>{[[House, 'Home'], [Compass, 'Explore'], [Music2, 'Create'], [SlidersHorizontal, 'Studio'], [Library, 'Library'], [Search, 'Search'], [SquarePlay, 'Hooks'], [Bell, 'Notifications']].map(([Icon, label]) => { const Glyph = Icon as typeof House; const name = String(label); return <Button key={name} className={`nav-item ${nav === name ? 'active' : ''}`} aria-label={name === 'Hooks' ? 'Create hook' : name} onClick={() => selectNav(name)}><Glyph size={20}/><span>{name}</span>{name === 'Hooks' && <small>+ Create</small>}</Button>; })}</nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><h2>Go Pro</h2><p>Unlock new features,<br/>more song credits, better<br/>models, and more!</p><Button onClick={() => openInfo('Upgrade')}>Upgrade</Button></div><Button className="nav-item" onClick={() => openInfo('Labs')}><FlaskConical size={20}/><span>Labs</span></Button><Button className="nav-item" onClick={() => openInfo('More')}><Ellipsis size={20}/><span>More</span></Button></div>
    </aside>

    <main className="main-app">
      <section className="creator" aria-label="Song creator"><header className="creator-topbar"><Button className="credits" aria-label="85 credits" onClick={() => openInfo('Credits')}><Music2 size={16}/>85</Button><div className="mode-tabs" aria-label="Creation mode">{(['Simple', 'Advanced'] as const).map((value) => <Button key={value} aria-pressed={mode === value} className={mode === value ? 'selected' : ''} onClick={() => setMode(value)}>{value}</Button>)}</div><div className="model-anchor"><Button className="model-button" aria-label="Choose model" aria-expanded={modelOpen} onClick={() => setModelOpen(!modelOpen)}>{model}<ChevronDown size={15}/></Button>{modelOpen && <div className="popup model-popup">{['v4.5-all', 'v4.5', 'v4'].map((value) => <Button key={value} onClick={() => { setModel(value); setModelOpen(false); }}>{value}{value === model && <Check size={14}/>}</Button>)}</div>}</div></header>
        <div className="creator-scroll"><div className="prompt-card"><div className="prompt-heading"><label htmlFor="song-description">{mode === 'Simple' ? 'Song Description' : 'Styles'}</label><Button className="inspire-button" aria-label="Suggest a song description" onClick={() => setDescription(description === initialPrompt ? 'Warm indie folk with fingerpicked acoustic guitar, soft piano, and a gentle vocal. A slow Sunday morning, sunlight through the window, and nowhere to be.' : initialPrompt)}><WandSparkles size={19}/></Button></div>
          <textarea id="song-description" ref={prompt} aria-label="Song description" placeholder="Describe the song you want to create..." value={description} onChange={(event) => setDescription(event.target.value)}/>
          <div className="prompt-tools"><Button className="pill" onClick={() => file.current?.click()}><Plus size={16}/>Audio</Button><Button className="pill" onClick={() => openInfo('Lyrics')}><Plus size={16}/>Lyrics</Button><Toggle className="instrumental-toggle" pressed={instrumental} onPressedChange={setInstrumental} aria-label="Instrumental"><span className="toggle-indicator">{instrumental && <Check size={10}/>}</span>Instrumental</Toggle></div>
          {attachment && <div className="attachment"><AudioLines size={14}/><span>{attachment}</span><Button className="icon-button" aria-label="Remove audio attachment" onClick={() => setAttachment('')}><X size={13}/></Button></div>}
          <div className="inspiration"><span>Inspiration</span><div className="inspiration-tags">{['sweet vocal', 'turkish arabesk', 'action', 'mouth organ', 'dark jazz'].map((value) => <Button key={value} onClick={() => setDescription((current) => `${current}${current ? ', ' : ''}${value}`)}>{value}</Button>)}</div></div>
        </div>
        {mode === 'Advanced' && <div className="advanced-fields"><label>Song title<input aria-label="Song title" value={songTitle} onChange={(event) => setSongTitle(event.target.value)} placeholder="Give your song a name" maxLength={80}/></label><label>Lyrics<textarea aria-label="Song lyrics" value={lyrics} onChange={(event) => setLyrics(event.target.value)} placeholder={instrumental ? 'Instrumental is on — vocals are optional' : '[Verse]\nWrite your lyrics here...'}/></label><p>Fine-tune your idea with a title, style, and lyrics.</p></div>}
        <input type="file" accept="audio/*" hidden ref={file} onChange={(event) => { setAttachment(event.target.files?.[0]?.name || ''); setNotice('File selected locally. Audio is not uploaded or processed.'); }}/></div>
        <div className="create-actions"><Button className="clear-button" aria-label="Clear song description" onClick={() => { setDescription(''); setLyrics(''); setSongTitle(''); setAttachment(''); }}><Trash2 size={17}/></Button><Button className="create-button" aria-label="Create sample songs" disabled={!description.trim() || creating} onClick={createSamples}>{creating ? <LoaderCircle className="spinning" size={21}/> : <Music2 size={21}/>}<span>{creating ? 'Preparing samples' : 'Create'}</span></Button></div>
      </section>

      <section className="workspace" aria-label="My Workspace">
        {hookSong ? <div className="hook-editor"><header><h1>Edit Hook</h1><Button className="pill" onClick={() => { setHookSaved(false); setModal('Create a New Hook'); }}>Select Song</Button></header><div className="hook-preview"><img src={`/suno/assets/cover-${hookSong.cover}.webp`} alt="Selected song artwork"/><SquarePlay size={35}/><span>{hookSong.title}</span><small>Visual hook preview · no audio or video export</small></div><div className="hook-trim"><label>Start time <span>{formatTime(hookStart)}</span></label><Range value={hookStart} max={Math.max(0, hookSong.duration - 30)} label="Hook start time" onChange={setHookStart}/><p>A 30-second selection from {formatTime(hookStart)} to {formatTime(hookStart + 30)}</p></div><footer><Button className="pill" onClick={() => setHookSong(null)}>Cancel</Button><Button className="white-button" onClick={() => { setHookSaved(true); setNotice('Hook selection saved for this session. No media was exported.'); }}>{hookSaved ? 'Selection saved' : 'Save selection'}</Button></footer></div>
        : <><header className="workspace-heading"><h1>Workspaces <ChevronRight size={19}/><span>My Workspace</span></h1><Button className="icon-button workspace-info" aria-label="About this study" onClick={() => openInfo('About this study')}><Info size={18}/></Button></header><div className="workspace-toolbar"><label className="workspace-search"><Search size={23}/><input id="workspace-search" aria-label="Search songs" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)}/>{query && <Button className="icon-button" aria-label="Clear search" onClick={() => setQuery('')}><X size={15}/></Button>}</label><div className="filter-anchor"><Button className={`pill filter-button ${activeFilterCount ? 'has-filters' : ''}`} aria-label="Filter songs" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}><ListFilter size={16}/>Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}<ChevronDown size={14}/></Button>{filtersOpen && <div className="popup filter-popup"><h2>Filter songs</h2>{[['created', 'Created in this session'], ['liked', 'Liked songs'], ['instrumental', 'Instrumental']].map(([key, label]) => <label key={key}><input type="checkbox" checked={filters[key as keyof typeof filters]} onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.checked }))}/>{label}</label>)}<Button className="text-button" onClick={resetFilters}>Reset filters</Button></div>}</div><Button className="pill sort-button" onClick={() => setNewest(!newest)}><ListFilter size={15}/>{newest ? 'Newest' : 'Oldest'}<ChevronDown size={14}/></Button><div className="pagination"><Button className="icon-button" aria-label="Previous page" disabled><ChevronLeft size={15}/></Button><span>1</span><Button className="icon-button" aria-label="Next page" disabled><ChevronRight size={15}/></Button></div></div>
          <div className="song-results">{orderedSongs.length ? <><p className="sample-label">Local sample tracks · silent playback preview</p>{orderedSongs.map((song) => <article key={song.id} className={`song-row ${selected?.id === song.id ? 'selected' : ''}`}><Button className="song-art" aria-label={`Select ${song.title}`} onClick={() => selectSong(song)}><img src={`/suno/assets/cover-${song.cover}.webp`} alt="Song cover artwork"/>{selected?.id === song.id && <span><Check size={20}/></span>}</Button><Button className="song-copy" onClick={() => selectSong(song)}><strong>{song.title}</strong><small>{formatTime(song.duration)} · {song.style}</small>{song.local && <em>Sample</em>}</Button><Toggle className="icon-button song-like" aria-label={`Like ${song.title}`} pressed={liked.includes(song.id)} onPressedChange={() => toggleLiked(song.id)}><Heart size={18} fill={liked.includes(song.id) ? 'currentColor' : 'none'}/></Toggle><Button className="icon-button row-options" aria-label={`Options for ${song.title}`} onClick={() => { setSelected(song); openInfo('Song details'); }}><Ellipsis size={20}/></Button></article>)}</> : <div className="empty-results"><p>No songs found</p><Button className="pill" onClick={() => { resetFilters(); setQuery(''); }}>Reset filters</Button></div>}</div>
          <div className={`challenge-card ${challengeOpen ? 'expanded' : ''}`}><Button className="challenge-toggle" aria-expanded={challengeOpen} onClick={() => setChallengeOpen(!challengeOpen)}><span className="challenge-count">0/1</span><span className="challenge-copy"><strong>Challenges <Info size={13}/></strong><small>Earn <b>50 credits</b> per challenge completed</small></span><span className="challenge-time">Time left <b>07:17</b></span>{challengeOpen ? <ChevronDown size={18}/> : <ChevronUp size={18}/>}</Button>{challengeOpen && <p className="challenge-description">Try shaping a song idea with a description and a few inspiration tags. Challenge credits are part of the reference UI and do not change in this local study.</p>}</div></>}
      </section>
      <footer className="player" aria-label="Playback preview"><div className="current-song">{selected && <><img src={`/suno/assets/cover-${selected.cover}.webp`} alt=""/><span><strong>{selected.title}</strong><small>Silent playback preview</small></span></>}</div><div className="player-center"><div className="player-controls"><Toggle className="icon-button" pressed={shuffle} onPressedChange={setShuffle} aria-label="Shuffle"><Shuffle size={16}/></Toggle><Button className="icon-button" aria-label="Previous song" disabled={!selected} onClick={() => skip(-1)}><SkipBack size={19} fill="currentColor"/></Button><Button className="play-button" aria-label={playing ? 'Pause playback preview' : 'Start playback preview'} disabled={!selected} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={22} fill="currentColor"/> : <Play size={22} fill="currentColor"/>}</Button><Button className="icon-button" aria-label="Next song" disabled={!selected} onClick={() => skip(1)}><SkipForward size={19} fill="currentColor"/></Button><Toggle className="icon-button" pressed={repeat} onPressedChange={setRepeat} aria-label="Repeat"><Repeat2 size={17}/></Toggle></div><div className="playback-progress">{selected && <span>{formatTime(progress)}</span>}<Range value={progress} max={selected?.duration || 100} label="Playback position" onChange={setProgress}/>{selected && <span>{formatTime(selected.duration)}</span>}</div></div><div className="player-volume"><Button className="icon-button" aria-label={volume ? 'Mute preview' : 'Unmute preview'} onClick={() => setVolume(volume ? 0 : 65)}>{volume ? <Volume2 size={20}/> : <VolumeX size={20}/>}</Button><Range value={volume} label="Volume" onChange={setVolume}/></div></footer>
    </main>
    {notice && <div className="toast" role="status"><Info size={17}/>{notice}</div>}
    <Dialog open={modal !== null} onOpenChange={(open) => { if (!open) setModal(null); }}><DialogContent className={`suno-dialog ${modal === 'Create a New Hook' ? 'hook-dialog' : ''}`}><DialogClose className="icon-button dialog-close" aria-label="Close dialog"><X size={20}/></DialogClose><DialogTitle>{modal}</DialogTitle>
      {modal === 'Create a New Hook' ? <><DialogDescription className="hook-subtitle">Select Song</DialogDescription><label className="hook-search"><Search size={19}/><input aria-label="Search hook songs" placeholder="Search by song name or style" value={hookQuery} onChange={(event) => setHookQuery(event.target.value)}/></label><div className="hook-tabs" aria-label="Song collection">{['All', 'Public', 'Liked'].map((value) => <Button aria-pressed={hookTab === value} className={hookTab === value ? 'selected' : ''} key={value} onClick={() => setHookTab(value)}>{value}</Button>)}</div><div className="hook-song-list">{hookSongs.length ? hookSongs.map((song) => <div key={song.id} className="hook-song"><img src={`/suno/assets/cover-${song.cover}.webp`} alt=""/><span><strong>{song.title}</strong><small>{formatTime(song.duration)} · {song.style}</small></span><Button className="white-button" aria-label={`Use ${song.title} for hook`} onClick={() => { setHookSong(song); setHookStart(0); setHookSaved(false); setModal(null); setNav('Hooks'); }}>Use</Button></div>) : <p className="no-hook-results">No matching songs</p>}</div></>
      : modal === 'Lyrics' ? <><DialogDescription>Add your own words to the song idea.</DialogDescription><textarea className="lyrics-editor" aria-label="Edit lyrics" value={lyrics} onChange={(event) => setLyrics(event.target.value)} placeholder="[Verse]\nWrite your lyrics here..."/><DialogClose className="white-button">Save lyrics</DialogClose></>
      : modal === 'Song details' && selected ? <><DialogDescription>{selected.title}</DialogDescription><div className="song-details"><img src={`/suno/assets/cover-${selected.cover}.webp`} alt="Song artwork"/><p>{selected.style}<br/>{formatTime(selected.duration)} · {selected.instrumental ? 'Instrumental' : 'Vocals'}<br/>Local sample · no audio source</p></div><Button className="white-button" onClick={() => { setHookSong(selected); setHookSaved(false); setHookStart(0); setModal(null); }}>Create a hook</Button></>
      : <><DialogDescription>{modal === 'About this study' ? 'A Next.js reconstruction of Suno from Mobbin references, using Vercel UI SDK. Song creation adds local sample cards. Playback is a silent interface preview. No AI model, music service, account, or billing is connected.' : modal === 'Credits' || modal === 'Upgrade' ? 'The 85-credit balance is reference content. This local interface study does not spend credits or start a subscription.' : modal === 'Your account' ? 'samlee_mobbin · 85 credits. This is a local demonstration profile.' : modal === 'Notifications' ? 'You’re all caught up. Newly created sample tracks will appear in your workspace.' : modal === 'Studio' ? 'Choose a song in your workspace, then create a hook to explore song selection and a visual timeline.' : 'Explore song creation, library filters, and the hook editor in this local interface study.'}</DialogDescription><DialogClose className="white-button">Got it</DialogClose></>}
    </DialogContent></Dialog>
  </div>;
}
