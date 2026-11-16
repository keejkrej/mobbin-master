'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUp, Bot, Check, ChevronDown, ChevronRight,
  CircleCheck, Code2, ExternalLink, FileCode2, GitBranch, Home, ImagePlus,
  ListFilter, Mic, MoreHorizontal, PanelLeft, Plus, Search, SquarePen, X,
} from 'lucide-react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Toggle } from '@study/ui';

const initialPrompt = 'Give me an overview of this repository, how does the flow work and find possible bugs in this file!';
const models = ['Codex 5.3 High', 'Codex 5.3 High Fast', 'Codex 5.3 Extra High Fast', 'GPT-5.4 High', 'GPT-5.4 High Fast', 'GPT-5.4 Extra High Fast', 'Opus 4.6 High', 'Opus 4.6 High Fast', 'Sonnet 4.6 High', 'Composer 1.5', 'Composer 2'];
const repositories = ['samleemobbin-dot/mini-landing-page', 'samleemobbin-dot/design-system', 'samleemobbin-dot/personal-website'];
type Panel = 'models' | 'tools' | 'repo' | 'branch' | 'profile' | null;
type Task = { id: number; prompt: string; repository: string; models: string[] };

function SlackMark() {
  return <svg width="23" height="23" viewBox="0 0 24 24" aria-hidden="true"><path stroke="#36c5f0" strokeWidth="4" strokeLinecap="round" d="M8 3v6M3 8h1"/><path stroke="#2eb67d" strokeWidth="4" strokeLinecap="round" d="M15 3h1M15 8h6"/><path stroke="#ecb22e" strokeWidth="4" strokeLinecap="round" d="M21 15h-1M16 15v6"/><path stroke="#e01e5a" strokeWidth="4" strokeLinecap="round" d="M9 16H3M8 20v1"/></svg>;
}

export default function CursorPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [view, setView] = useState<'composer' | 'task' | 'automations' | 'dashboard'>('composer');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedModels, setSelectedModels] = useState(['Codex 5.3 High', 'GPT-5.4 High', 'Composer 1.5']);
  const [multiModel, setMultiModel] = useState(true);
  const [repository, setRepository] = useState(repositories[0]);
  const [branch, setBranch] = useState('main');
  const [repoSearch, setRepoSearch] = useState('');
  const [toolSearch, setToolSearch] = useState('');
  const [slack, setSlack] = useState(true);
  const [mcp, setMcp] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [taskSearch, setTaskSearch] = useState('');
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceNote, setVoiceNote] = useState('');
  const [toast, setToast] = useState('');
  const [attachment, setAttachment] = useState('');
  const [sortNewest, setSortNewest] = useState(true);
  const [automationCreated, setAutomationCreated] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!(event.target as Element).closest('[data-popup-area]')) setPanel(null);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setPanel(null); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape); };
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const togglePanel = (name: Panel) => setPanel(panel === name ? null : name);
  const newAgent = () => { setView('composer'); setPrompt(''); setAttachment(''); setPanel(null); setActiveTask(null); };
  const selectModel = (model: string, checked: boolean) => {
    if (!multiModel) { setSelectedModels([model]); return; }
    setSelectedModels(previous => checked ? [...previous, model] : previous.length > 1 ? previous.filter(item => item !== model) : previous);
  };
  const submit = () => {
    if (!prompt.trim()) return;
    const task = { id: Date.now(), prompt: prompt.trim(), repository, models: selectedModels };
    setTasks(previous => [task, ...previous]); setActiveTask(task); setView('task'); setPanel(null);
  };
  const openTask = (task: Task) => { setActiveTask(task); setView('task'); setSearchOpen(false); };
  const modelLabel = selectedModels.join(', ');
  const orderedTasks = sortNewest ? tasks : [...tasks].reverse();

  return <div className={`cursor-app ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <aside className="sidebar" aria-label="Workspace navigation">
      <div className="sidebar-top">
        <Button className="icon-button" aria-label="Toggle sidebar" onClick={() => setCollapsed(!collapsed)}><PanelLeft size={19}/></Button>
        <Button className="icon-button sidebar-search" aria-label="Search agents" onClick={() => setSearchOpen(true)}><Search size={19}/></Button>
      </div>
      <>
        <nav>
          <Button className="nav-row" onClick={newAgent}><SquarePen size={19}/><span>New Agent</span></Button>
          <Button className={`nav-row ${view === 'automations' ? 'active' : ''}`} onClick={() => { setView('automations'); setPanel(null); }}><Bot size={19}/><span>Automations</span></Button>
          <Button className={`nav-row ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); setPanel(null); }}><Home size={19}/><span>Dashboard</span></Button>
        </nav>
        <div className="agent-list">
          {tasks.length === 0 ? <p className="empty-agents">No Agents Yet</p> : orderedTasks.map(task => <Button className={`agent-row ${activeTask?.id === task.id && view === 'task' ? 'selected' : ''}`} key={task.id} onClick={() => openTask(task)}><CircleCheck size={15}/><span>{task.prompt}</span></Button>)}
        </div>
        <div className="profile-area" data-popup-area>
          <Button className="profile-button" aria-expanded={panel === 'profile'} onClick={() => togglePanel('profile')}><span className="avatar">A</span><span className="profile-copy">alex smith<span>Pro</span></span></Button>
          <Button className="icon-button" aria-label="Account options" onClick={() => togglePanel('profile')}><MoreHorizontal size={18}/></Button>
          <Button className="icon-button" aria-label="Reverse agent order" onClick={() => { setSortNewest(!sortNewest); setToast(sortNewest ? 'Agents sorted oldest first' : 'Agents sorted newest first'); }}><ListFilter size={18}/></Button>
          {panel === 'profile' && <div className="popup profile-popup"><strong>alex smith</strong><p>Pro plan</p><Button className="menu-row" onClick={() => { setPanel(null); setToast('You are using the local Cursor design study.'); }}>Account settings <ExternalLink size={14}/></Button><a className="menu-row" href="/">Back to design collection <ArrowRight size={14}/></a></div>}
        </div>
      </>
    </aside>

    <main className="main-panel">
      {view === 'composer' && <section className="composer-area" aria-label="New agent">
        <div className="repo-bar">
          <div className="popup-anchor" data-popup-area>
            <Button className="repo-button" aria-expanded={panel === 'repo'} onClick={() => togglePanel('repo')}><span>{repository}</span><ChevronDown size={13}/></Button>
            {panel === 'repo' && <div className="popup repo-popup"><label className="popup-search"><Search size={16}/><input autoFocus aria-label="Find a repository" placeholder="Search repositories..." value={repoSearch} onChange={event => setRepoSearch(event.target.value)}/></label><div className="popup-items">{repositories.filter(repo => repo.toLowerCase().includes(repoSearch.toLowerCase())).map(repo => <Button className="menu-row" key={repo} onClick={() => { setRepository(repo); setPanel(null); }}><Code2 size={16}/><span>{repo}</span>{repo === repository && <Check size={16}/>}</Button>)}{repositories.filter(repo => repo.toLowerCase().includes(repoSearch.toLowerCase())).length === 0 && <p className="no-results">No repositories found</p>}</div></div>}
          </div>
          <div className="popup-anchor" data-popup-area><Button className="branch-button" aria-expanded={panel === 'branch'} onClick={() => togglePanel('branch')}>{branch}<ChevronDown size={13}/></Button>{panel === 'branch' && <div className="popup branch-popup">{['main', 'develop', 'feature/design'].map(item => <Button className="menu-row" key={item} onClick={() => { setBranch(item); setPanel(null); }}><GitBranch size={14}/>{item}{branch === item && <Check size={15}/>}</Button>)}</div>}</div>
        </div>
        <form className="composer" onSubmit={event => { event.preventDefault(); submit(); }}>
          <textarea aria-label="Agent instructions" placeholder="What do you want to build?" value={prompt} onChange={event => setPrompt(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { event.preventDefault(); submit(); } }}/>
          {attachment && <div className="attachment"><ImagePlus size={14}/>{attachment}<Button aria-label="Remove attachment" onClick={() => setAttachment('')}><X size={13}/></Button></div>}
          <div className="composer-toolbar">
            <div className="model-anchor" data-popup-area>
              <Button className="toolbar-text model-button" aria-label="Select models" aria-expanded={panel === 'models'} onClick={() => togglePanel('models')}><span>{modelLabel}</span><ChevronDown size={14}/></Button>
              {panel === 'models' && <div className="popup models-popup">
                <div className="models-settings"><label className="switch-row"><span>Use Multiple Models</span><Toggle className="switch" aria-label="Use multiple models" pressed={multiModel} onPressedChange={value => { setMultiModel(value); if (!value) setSelectedModels([selectedModels[0]]); }}><span/></Toggle></label><div className="long-running"><span>Long-running <em>Preview</em><small>Apply maximum effort on any task</small></span><Toggle className="switch" disabled aria-label="Long-running mode"><span/></Toggle></div><Button className="upgrade" onClick={() => setToast('Long-running agents require a connected Cursor account.')}>Upgrade for access <ExternalLink size={13}/></Button></div>
                <div className="model-options">{models.map(model => <div className={`model-option ${model === selectedModels[0] ? 'highlighted' : ''}`} key={model}><Toggle className="model-toggle" aria-label={model} pressed={selectedModels.includes(model)} onPressedChange={value => selectModel(model, value)}><span className="check-box">{selectedModels.includes(model) && <Check size={13}/>}</span><span>{model}</span></Toggle>{selectedModels.includes(model) && <span className="model-count">1x<ChevronDown size={11}/></span>}</div>)}</div>
              </div>}
            </div>
            <div className="tools-anchor" data-popup-area>
              <Button className="toolbar-text tools-button" aria-label="Configure MCP tools" aria-expanded={panel === 'tools'} onClick={() => togglePanel('tools')}>{panel === 'tools' && slack ? <SlackMark/> : 'MCPs'}<ChevronDown size={13}/></Button>
              {panel === 'tools' && <div className="popup tools-popup"><label className="popup-search"><Search size={16}/><input autoFocus aria-label="Search MCP servers" placeholder="Search MCP servers..." value={toolSearch} onChange={event => setToolSearch(event.target.value)}/><Button aria-label="Add MCP server" className="icon-button compact" onClick={() => setToast('The mcp-server below is ready to enable.')}><Plus size={16}/></Button></label><div className="tool-options">{'slack'.includes(toolSearch.toLowerCase()) && <div className="tool-row"><span className="tool-logo"><SlackMark/></span><span>Slack</span><Button className="login-pill" onClick={() => setToast('Slack login is unavailable in this local demo.')}>Login</Button><Toggle className="switch" aria-label="Enable Slack MCP" pressed={slack} onPressedChange={setSlack}><span/></Toggle></div>}{'mcp-server'.includes(toolSearch.toLowerCase()) && <div className="tool-row"><span className="tool-logo letter">M</span><span className="tool-name">mcp-server</span><Toggle className="switch" aria-label="Enable mcp-server" pressed={mcp} onPressedChange={setMcp}><span/></Toggle></div>}</div></div>}
            </div>
            <div className="composer-actions"><Button className="icon-button" aria-label="Attach image" onClick={() => fileRef.current?.click()}><ImagePlus size={20}/></Button><Button className="icon-button" aria-label="Add voice note" onClick={() => setVoiceOpen(true)}><Mic size={19}/></Button><Button className="send-button" type="submit" aria-label="Start agent" disabled={!prompt.trim()}><ArrowUp size={22}/></Button></div>
          </div>
        </form>
        <input className="hidden-input" ref={fileRef} type="file" accept="image/*" aria-label="Attach an image file" onChange={event => setAttachment(event.target.files?.[0]?.name ?? '')}/>
        <div className="suggestions"><Button onClick={() => setPrompt('Run a security audit of this repository and identify potential vulnerabilities.')}>Run security audit</Button><Button onClick={() => setPrompt('Review and improve AGENTS.md with clear setup instructions and code conventions.')}>Improve AGENTS.md</Button><Button onClick={() => togglePanel('tools')}><span className="mini-tools"><span>✣</span><SlackMark/><span className="tool-disc">◩</span></span>Add tools</Button></div>
        {prompt.length === 0 && <p className="composer-hint">Describe a task, choose your models, and let your agents get to work.</p>}
      </section>}

      {view === 'task' && activeTask && <section className="task-area"><header className="task-heading"><div><span className="eyebrow">Agent</span><h1>{activeTask.prompt}</h1><p><Code2 size={14}/>{activeTask.repository}<span>·</span><GitBranch size={14}/>{branch}</p></div><Button className="icon-button" aria-label="New agent" onClick={newAgent}><SquarePen size={19}/></Button></header><div className="task-status"><CircleCheck size={17}/><span>Completed</span><span className="task-status-detail">Local demonstration</span></div><div className="response-card"><div className="response-byline"><span className="agent-glyph">⌘</span>{activeTask.models[0]}</div><h2>Repository overview</h2><p>This project is a small Next.js application. Pages are composed from reusable UI components, with shared styles and local data.</p><div className="file-list"><div><FileCode2 size={17}/><code>app/page.tsx</code><span>Main page and interactions</span></div><div><FileCode2 size={17}/><code>app/layout.tsx</code><span>Application shell and metadata</span></div><div><FileCode2 size={17}/><code>app/globals.css</code><span>Layout, colors, and type styles</span></div></div><h3>How the flow works</h3><p>A visitor opens the page, selects an action, and the interface updates its local state. Shared components provide accessible controls and keyboard interactions.</p><h3>Things to check</h3><ul><li>Validate empty submissions before starting a task.</li><li>Show a useful empty state when search returns no matches.</li><li>Keep keyboard focus inside open dialogs and restore it on close.</li></ul><p className="demo-note">This sample response demonstrates the interface. No repository was accessed or code executed.</p></div><div className="task-footer"><Button className="secondary-button" onClick={() => { setPrompt('Continue reviewing this repository and suggest the next steps.'); setView('composer'); }}>Continue task <ArrowRight size={16}/></Button><Button className="secondary-button" onClick={() => { navigator.clipboard?.writeText(activeTask.prompt).then(() => setToast('Prompt copied')).catch(() => setToast('Clipboard is unavailable')); }}>Copy prompt</Button></div></section>}

      {view === 'automations' && <section className="overview-area"><header><div><h1>Automations</h1><p>Put recurring work on autopilot.</p></div><Button className="primary-button" onClick={() => { setAutomationCreated(true); setToast('Demo automation created. No schedule is active.'); }}><Plus size={16}/>New automation</Button></header>{automationCreated ? <div className="automation-card"><Bot size={22}/><div><h2>Weekly security review</h2><p>Review the repository for potential vulnerabilities.</p><small>Demo · No active schedule</small></div><Button className="icon-button" aria-label="Remove demo automation" onClick={() => setAutomationCreated(false)}><X size={18}/></Button></div> : <div className="overview-empty"><Bot size={32}/><h2>No automations yet</h2><p>Create an automation to keep routine work moving.</p><Button className="secondary-button" onClick={() => { setAutomationCreated(true); setToast('Demo automation created. No schedule is active.'); }}><Plus size={16}/>Create automation</Button></div>}</section>}

      {view === 'dashboard' && <section className="overview-area"><header><div><h1>Dashboard</h1><p>A little more room to build.</p></div><Button className="primary-button" onClick={newAgent}><Plus size={16}/>New Agent</Button></header><div className="stats"><div><span>Agents created</span><strong>{tasks.length}</strong></div><div><span>Completed</span><strong>{tasks.length}</strong></div><div><span>Connected repositories</span><strong>{repositories.length}</strong></div></div><h2 className="section-title">Recent agents</h2>{tasks.length ? tasks.map(task => <Button className="dashboard-task" key={task.id} onClick={() => openTask(task)}><CircleCheck size={17}/><span>{task.prompt}</span><ChevronRight size={17}/></Button>) : <p className="dashboard-empty">Your agents will appear here after you start a task.</p>}</section>}
    </main>

    <Dialog open={searchOpen} onOpenChange={setSearchOpen}><DialogContent className="search-dialog"><DialogTitle>Search agents</DialogTitle><DialogDescription>Find an agent by its instructions.</DialogDescription><label className="dialog-search"><Search size={19}/><input autoFocus placeholder="Search agents..." aria-label="Search agents by name" value={taskSearch} onChange={event => setTaskSearch(event.target.value)}/></label><div className="search-results">{tasks.filter(task => task.prompt.toLowerCase().includes(taskSearch.toLowerCase())).map(task => <Button className="menu-row" key={task.id} onClick={() => openTask(task)}><CircleCheck size={16}/>{task.prompt}</Button>)}{tasks.filter(task => task.prompt.toLowerCase().includes(taskSearch.toLowerCase())).length === 0 && <p>No agents found</p>}</div><DialogClose className="dialog-x" aria-label="Close search"><X size={18}/></DialogClose></DialogContent></Dialog>
    <Dialog open={voiceOpen} onOpenChange={setVoiceOpen}><DialogContent className="voice-dialog"><DialogTitle>Add a voice note</DialogTitle><DialogDescription>Enter a note to append to your instructions.</DialogDescription><textarea aria-label="Voice note text" placeholder="Your note..." value={voiceNote} onChange={event => setVoiceNote(event.target.value)}/><Button className="primary-button" disabled={!voiceNote.trim()} onClick={() => { setPrompt(previous => `${previous}${previous ? '\n\n' : ''}${voiceNote}`); setVoiceNote(''); setVoiceOpen(false); }}>Add note <ArrowDown size={16}/></Button><DialogClose className="dialog-x" aria-label="Close voice note"><X size={18}/></DialogClose></DialogContent></Dialog>
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
