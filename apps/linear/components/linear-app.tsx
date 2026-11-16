'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Dialog, DialogBackdrop, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@study/ui';
import {
  ArrowLeft, ArrowUpRight, Bell, Box, Check, ChevronDown, ChevronRight,
  Circle, CircleCheck, CircleDashed, CircleHelp, Clock3, Copy, Ellipsis,
  FilePenLine, Filter, Github, Globe, Headphones, Inbox, Layers2, Link2,
  ListFilter, Maximize2, Menu, MessageSquare, MousePointer2, PanelRight,
  Paperclip, Plus, Search, SlidersHorizontal, SquarePen, Star, Tag,
  Target, UserRound, UsersRound, X,
} from 'lucide-react';

type Status = 'Backlog' | 'Todo' | 'In Progress' | 'Done';
type View = 'issues' | 'project' | 'detail' | 'inbox' | 'drafts' | 'mine' | 'views';
type Issue = { id: string; title: string; status: Status; description: string; priority: string; project: string; assignee: string; comments: string[] };

const initialIssues: Issue[] = [
  ['AS-29', 'Define product requirements (PRD)', 'Backlog'],
  ['AS-28', 'Create user flow diagram', 'Backlog'],
  ['AS-27', 'Prioritize features (MVP vs future scope)', 'Backlog'],
  ['AS-26', 'Define MVP feature list', 'Backlog'],
  ['AS-25', 'Create user personas (internal users)', 'In Progress'],
  ['AS-24', 'Define problem statement & hypothesis', 'In Progress'],
  ['AS-23', 'Create alignment summary document', 'Todo'],
  ['AS-22', 'Define success metrics (KPIs)', 'Todo'],
  ['AS-21', 'Create stakeholder insight summary', 'Done'],
  ['AS-20', 'Take notes & record key insights', 'Done'],
  ['AS-19', 'Conduct UX Designer interviews', 'Done'],
  ['AS-18', 'Conduct PM interviews', 'Done'],
  ['AS-17', 'Schedule interview sessions', 'Done'],
  ['AS-16', 'Prepare interview questions', 'Done'],
  ['AS-15', 'Define interview objectives', 'Done'],
  ['AS-14', 'Identify key stakeholders', 'Done'],
  ['AS-13', 'Identify key pain points', 'Done'],
  ['AS-12', 'Audit existing tools & data sources', 'Done'],
  ['AS-11', 'Conduct stakeholder interviews (PM, UX Designer, Researcher)', 'Done'],
].map(([id, title, status], index) => ({ id, title, status: status as Status, priority: index === 0 ? 'High' : 'No priority', description: index === 0 ? 'Align on the problem we are solving and document the requirements for the first version.\n\nInclude the audience, core workflows, and a clear definition of success.' : '', project: index < 4 ? 'AI UX Research Assistant' : 'User Insight & Behavior Analytics Dashboard', assignee: index === 0 ? 'Alex Smith' : 'Unassigned', comments: [] }));
const statuses: Status[] = ['Backlog', 'Todo', 'In Progress', 'Done'];

function StatusIcon({ status }: { status: Status }) {
  if (status === 'Done') return <CircleCheck className="status-icon status-done" fill="currentColor" />;
  if (status === 'Backlog') return <CircleDashed className="status-icon status-backlog" />;
  if (status === 'In Progress') return <span className="status-icon status-progress" />;
  return <Circle className="status-icon status-todo" />;
}

export default function LinearApp({ initialView = 'issues' }: { initialView?: View }) {
  const [view, setView] = useState<View>(initialView);
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [tab, setTab] = useState('Backlog');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('AS-29');
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newStatus, setNewStatus] = useState<Status>('Backlog');
  const [priority, setPriority] = useState('No priority');
  const [createMore, setCreateMore] = useState(false);
  const [drafts, setDrafts] = useState<{ title: string; description: string }[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [displayOpen, setDisplayOpen] = useState(false);
  const [showProperties, setShowProperties] = useState(true);
  const [collapsed, setCollapsed] = useState<Status[]>([]);
  const [toast, setToast] = useState('');
  const [comment, setComment] = useState('');
  const [starred, setStarred] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [menu, setMenu] = useState('');
  const [info, setInfo] = useState<{ title: string; text: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const issue = issues.find(item => item.id === selectedId) || issues[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('linear-study-issues-v1');
      const savedDrafts = localStorage.getItem('linear-study-drafts-v1');
      if (saved) setIssues(JSON.parse(saved));
      if (savedDrafts) setDrafts(JSON.parse(savedDrafts));
    } catch { /* The prototype still works when browser storage is unavailable. */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) { try { localStorage.setItem('linear-study-issues-v1', JSON.stringify(issues)); localStorage.setItem('linear-study-drafts-v1', JSON.stringify(drafts)); } catch {} } }, [issues, drafts, hydrated]);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 3200); return () => clearTimeout(timer); } }, [toast]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.target as HTMLElement).matches('input, textarea, select, [contenteditable]')) return;
      if (event.key === 'c') { event.preventDefault(); setCreateOpen(true); }
      if (event.key === '/') { event.preventDefault(); setSearchOpen(true); }
      if (event.key === 'Escape') { setMenu(''); setFilterOpen(false); setDisplayOpen(false); setSearchOpen(false); }
    }
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, []);

  const visibleIssues = useMemo(() => issues.filter(item => {
    if (view === 'project' && item.project !== 'User Insight & Behavior Analytics Dashboard') return false;
    if (view === 'mine' && item.assignee !== 'Alex Smith') return false;
    if (view === 'issues' && tab === 'Backlog' && item.status !== 'Backlog') return false;
    if (view === 'issues' && tab === 'Active' && !['Todo', 'In Progress'].includes(item.status)) return false;
    if (statusFilter !== 'All statuses' && item.status !== statusFilter) return false;
    return `${item.id} ${item.title}`.toLowerCase().includes(query.toLowerCase());
  }), [issues, query, view, tab, statusFilter]);

  function navigate(next: View) { setView(next); setMobileSidebar(false); setQuery(''); setMenu(''); setStatusFilter('All statuses'); }
  function openIssue(item: Issue) { setSelectedId(item.id); setView('detail'); }
  function updateIssue(patch: Partial<Issue>) { setIssues(items => items.map(item => item.id === selectedId ? { ...item, ...patch } : item)); }
  function addIssue(event: React.FormEvent) {
    event.preventDefault(); if (!title.trim()) return;
    const id = `AS-${Math.max(...issues.map(item => Number(item.id.split('-')[1]))) + 1}`;
    setIssues(items => [{ id, title: title.trim(), description, status: newStatus, priority, project: view === 'project' ? 'User Insight & Behavior Analytics Dashboard' : 'AI UX Research Assistant', assignee: 'Unassigned', comments: [] }, ...items]);
    setToast(`${id} created`); setTitle(''); setDescription('');
    if (!createMore) { setCreateOpen(false); if (view !== 'project') { setView('issues'); setTab('All issues'); } }
  }
  function saveDraft() { if (!title.trim()) { setToast('Add a title to save your draft'); return; } setDrafts(items => [...items, { title, description }]); setCreateOpen(false); setTitle(''); setDescription(''); setToast('Draft saved'); }
  function explain(title: string, text: string) { setInfo({ title, text }); setMenu(''); }

  return (
    <div className="linear-shell">
      {mobileSidebar && <button className="mobile-overlay" aria-label="Close navigation" onClick={() => setMobileSidebar(false)} />}
      <aside className={`sidebar ${mobileSidebar ? 'sidebar-open' : ''}`}>
        <div className="workspace-header">
          <Button className="workspace-switch" onClick={() => setMenu(menu === 'workspace' ? '' : 'workspace')} aria-expanded={menu === 'workspace'}><span className="workspace-avatar">AM</span><strong>AS Mobbin</strong><ChevronDown size={12} /></Button>
          <Button className="icon-button" aria-label="Search issues" onClick={() => { navigate('issues'); setTab('All issues'); setSearchOpen(true); }}><Search size={15} /></Button>
          <Button className="icon-button compose-button" aria-label="Create issue" title="Create issue (C)" onClick={() => setCreateOpen(true)}><SquarePen size={17} /></Button>
          {menu === 'workspace' && <div className="popover workspace-popover"><strong>AS Mobbin</strong><p>Workspace</p><Button onClick={() => explain('Workspace settings', 'This workspace is a local interface study. Your issues and drafts stay in this browser.')}>Workspace settings <ArrowUpRight size={13} /></Button><Button onClick={() => explain('Members', 'Alex Smith · Workspace owner')}>Members <UsersRound size={13} /></Button></div>}
        </div>
        <nav aria-label="Workspace navigation">
          <Button className={`nav-item ${view === 'drafts' ? 'nav-selected' : ''}`} onClick={() => navigate('drafts')}><FilePenLine />Drafts{drafts.length > 0 && <span className="nav-count">{drafts.length}</span>}</Button>
          <Button className={`nav-item ${view === 'inbox' ? 'nav-selected' : ''}`} onClick={() => navigate('inbox')}><Inbox />Inbox</Button>
          <Button className={`nav-item ${view === 'mine' ? 'nav-selected' : ''}`} onClick={() => navigate('mine')}><Target />My issues</Button>
          <Button className="nav-item" onClick={() => setMenu(menu === 'more' ? '' : 'more')}><Ellipsis />More</Button>
          {menu === 'more' && <div className="inline-menu"><Button onClick={() => navigate('views')}><Layers2 size={14} /> Views</Button><Button onClick={() => explain('Keyboard shortcuts', 'C — Create issue · / — Search issues · Escape — Close menus and dialogs')}>Keyboard shortcuts</Button></div>}
          <div className="nav-section-label">Your teams <ChevronDown size={10} /></div>
          <Button className="nav-item" onClick={() => explain('Engineering Team', 'No issues have been assigned to the Engineering Team yet. Create an issue to get started.')}><span className="team-emoji">▰</span>Engineering Team <ChevronRight className="tiny" /></Button>
          <Button className="nav-item" onClick={() => { navigate('issues'); setTab('Backlog'); }}><Globe className="team-globe" />AS Mobbin <ChevronDown className="tiny" /></Button>
          <div className="nested-navigation">
            <Button className={`nav-item ${['issues', 'detail'].includes(view) ? 'nav-selected' : ''}`} onClick={() => { navigate('issues'); setTab('Backlog'); }}><Copy />Issues</Button>
            <Button className={`nav-item ${view === 'project' ? 'nav-selected' : ''}`} onClick={() => navigate('project')}><Box />Projects</Button>
            <Button className={`nav-item ${view === 'views' ? 'nav-selected' : ''}`} onClick={() => navigate('views')}><Layers2 />Views</Button>
          </div>
          <div className="nav-section-label">Try <ChevronDown size={10} /></div>
          <Button className="nav-item" onClick={() => explain('Import issues', 'Create issues in this prototype with the compose button or the C keyboard shortcut. Imports are not connected to external services.')}><Copy />Import issues</Button>
          <Button className="nav-item" onClick={() => explain('Invite people', 'Your workspace has one local member, Alex Smith. Invitations are not sent from this prototype.')}><Plus />Invite people</Button>
          <Button className="nav-item" onClick={() => explain('Initiatives', 'Group related projects around a shared goal. Your User Insight & Behavior Analytics Dashboard is ready to organize.')}><Target />Initiatives</Button>
          <Button className="nav-item" onClick={() => { navigate('issues'); setTab('Active'); }}><Clock3 />Cycles</Button>
          <Button className="nav-item" onClick={() => explain('Connect GitHub', 'This interface study does not connect to GitHub. All issue actions run locally.')}><Github />Connect GitHub</Button>
        </nav>
        <Button className="whats-new" onClick={() => explain('What’s new', 'Web forms for Linear Asks\n\nCollect requests in one place and turn them into actionable issues.')}><span>What’s new</span><strong>Web forms for Linear Asks</strong></Button>
      </aside>

      <main className="main-panel">
        <header className="main-header">
          <Button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileSidebar(true)}><Menu size={18} /></Button>
          {view === 'detail' ? <><Button className="icon-button" aria-label="Back to issues" onClick={() => navigate('issues')}><ArrowLeft size={16} /></Button><span className="team-mark"><Globe size={14} /></span><Button className="breadcrumb-button" onClick={() => navigate('issues')}>AS Mobbin</Button><ChevronRight size={13} /><span className="muted">{issue.id}</span></> : <><span className="team-mark"><Globe size={14} /></span><Button className="breadcrumb-button" onClick={() => { navigate('issues'); setTab('Backlog'); }}>{view === 'inbox' ? 'Inbox' : view === 'drafts' ? 'Drafts' : view === 'mine' ? 'My issues' : view === 'views' ? 'Views' : 'AS Mobbin'}</Button></>}
          {view === 'project' && <><ChevronRight size={13} /><Box size={15} className="muted" /><strong className="project-breadcrumb">User Insight & Behavior Analytics Dashboard</strong><Button className={`icon-button ${starred ? 'starred' : ''}`} aria-label={starred ? 'Unstar project' : 'Star project'} onClick={() => setStarred(!starred)}><Star size={16} fill={starred ? 'currentColor' : 'none'} /></Button><Button className="icon-button" aria-label="Project options" onClick={() => explain('Project details', 'User Insight & Behavior Analytics Dashboard\n\nTeam: AS Mobbin\nStatus: In progress')}><Ellipsis size={18} /></Button></>}
          <div className="header-spacer" />
          <Button className="icon-button" aria-label="Notifications" onClick={() => navigate('inbox')}><Bell size={15} /></Button>
        </header>

        {['issues', 'project', 'mine', 'views'].includes(view) && <>
          <div className="toolbar">
            <div className="tabs" aria-label="Issue views">
              {(view === 'project' ? ['Overview', 'Updates', 'Issues'] : ['All issues', 'Active', 'Backlog']).map(item => <Button key={item} className={`tab ${(view === 'project' ? item === 'Issues' : item === tab) ? 'tab-active' : ''}`} onClick={() => { if (view === 'project' && item !== 'Issues') explain(item === 'Overview' ? 'Project overview' : 'Project updates', item === 'Overview' ? 'User Insight & Behavior Analytics Dashboard\n\nBuild a shared understanding of our users through interviews, clear research goals, and actionable insights.' : 'Project created by Alex Smith · March 30\n\nResearch is in progress.'); else setTab(item); }}>{item}</Button>)}
              <Button className="icon-button view-icon" aria-label="Save view" onClick={() => { setToast('View saved'); }}><Layers2 size={14} /></Button>
            </div>
            <div className="toolbar-actions">
              {searchOpen && <div className="search-field"><Search size={14} /><input ref={searchRef} aria-label="Search issues" placeholder="Search issues…" value={query} onChange={e => setQuery(e.target.value)} /><Button aria-label="Close search" className="icon-button" onClick={() => { setSearchOpen(false); setQuery(''); }}><X size={12} /></Button></div>}
              <div className="popover-anchor"><Button className={`round-button ${statusFilter !== 'All statuses' ? 'control-active' : ''}`} aria-label="Filter issues" aria-expanded={filterOpen} onClick={() => { setFilterOpen(!filterOpen); setDisplayOpen(false); }}><ListFilter size={16} /></Button>{filterOpen && <div className="popover filter-popover"><strong>Filter by status</strong>{['All statuses', ...statuses].map(status => <Button key={status} onClick={() => { setStatusFilter(status); setFilterOpen(false); }}>{status}{statusFilter === status && <Check size={14} />}</Button>)}</div>}</div>
              <div className="popover-anchor"><Button className="round-button" aria-label="Display options" aria-expanded={displayOpen} onClick={() => { setDisplayOpen(!displayOpen); setFilterOpen(false); }}><SlidersHorizontal size={15} /></Button>{displayOpen && <div className="popover display-popover"><strong>Display</strong><label><input type="checkbox" checked={showProperties} onChange={e => setShowProperties(e.target.checked)} />Show issue properties</label><Button onClick={() => { setCollapsed([]); setDisplayOpen(false); }}>Expand all groups</Button><Button onClick={() => { setCollapsed(statuses); setDisplayOpen(false); }}>Collapse all groups</Button></div>}</div>
              <Button className="round-button" aria-label="Open issue details" onClick={() => { const first = visibleIssues[0]; if (first) openIssue(first); }}><PanelRight size={15} /></Button>
            </div>
          </div>
          <div className="issue-list">
            {statuses.filter(status => visibleIssues.some(item => item.status === status)).map(status => <section className="issue-group" key={status}>
              <div className={`group-header ${status === 'Done' ? 'group-done' : ''}`}>
                <Button className="group-toggle" onClick={() => setCollapsed(items => items.includes(status) ? items.filter(item => item !== status) : [...items, status])} aria-expanded={!collapsed.includes(status)}><ChevronDown size={12} className={collapsed.includes(status) ? 'collapsed' : ''} /><StatusIcon status={status} /><span>{status}</span><span className="group-count">{visibleIssues.filter(item => item.status === status).length}</span></Button>
                <Button className="icon-button" aria-label={`Create ${status.toLowerCase()} issue`} onClick={() => { setNewStatus(status); setCreateOpen(true); }}><Plus size={14} /></Button>
              </div>
              {!collapsed.includes(status) && visibleIssues.filter(item => item.status === status).map(item => <Button key={item.id} className={`issue-row ${view === 'project' ? 'project-row' : ''}`} onClick={() => openIssue(item)}>
                {view !== 'project' && <><span className="priority-icon">{item.priority === 'High' ? '▂▅▇' : '---'}</span><span className="issue-id">{item.id}</span><StatusIcon status={item.status} /></>}
                <span className="issue-title">{item.title}{view === 'project' && item.status === 'Done' && Number(item.id.slice(3)) > 13 && <span className="parent-issue"> › Conduct stakeholder interviews (PM, UX Designer, Researcher)</span>}</span>
                {view !== 'project' && showProperties && <div className="issue-meta"><span className="project-pill"><Headphones size={14} />{item.project}</span><UserRound size={15} /><span>Apr 1</span></div>}
              </Button>)}
            </section>)}
            {visibleIssues.length === 0 && <div className="empty-state"><Filter size={30} /><h2>No issues match this view</h2><p>Try a different search or clear your status filter.</p><Button className="subtle-button" onClick={() => { setQuery(''); setStatusFilter('All statuses'); setTab('All issues'); }}>Clear filters</Button></div>}
          </div>
        </>}

        {view === 'detail' && <div className="detail-layout"><article className="issue-detail"><div className="detail-breadcrumb"><Box size={14} />{issue.project}<ChevronRight size={12} />{issue.id}</div><input className="detail-title" aria-label="Issue title" value={issue.title} onChange={event => updateIssue({ title: event.target.value })} /><textarea className="detail-description" aria-label="Issue description" placeholder="Add a description…" value={issue.description} onChange={event => updateIssue({ description: event.target.value })} /><Button className="subtle-button" onClick={() => explain('Sub-issues', 'Break a task into smaller steps using the create issue button. Sub-issue linking is not included in this interface study.')}><Plus size={13} /> Add sub-issue</Button><div className="activity-heading"><h2>Activity</h2><span>Subscribe</span></div><div className="activity-event"><span className="small-avatar">AS</span><p><strong>Alex Smith</strong> created the issue <span>· Apr 1</span></p></div>{issue.comments.map((text, index) => <div className="comment" key={index}><span className="small-avatar">AS</span><div><strong>Alex Smith <span>· Just now</span></strong><p>{text}</p></div></div>)}<form className="comment-form" onSubmit={event => { event.preventDefault(); if (comment.trim()) { updateIssue({ comments: [...issue.comments, comment.trim()] }); setComment(''); } }}><textarea aria-label="Write a comment" placeholder="Leave a comment…" value={comment} onChange={e => setComment(e.target.value)} /><Button type="submit" className="subtle-button" disabled={!comment.trim()}>Comment</Button></form></article><aside className="detail-properties"><h2>Properties</h2><label><StatusIcon status={issue.status} /><select aria-label="Issue status" value={issue.status} onChange={e => updateIssue({ status: e.target.value as Status })}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label><label><span className="priority-icon">▂▅▇</span><select aria-label="Issue priority" value={issue.priority} onChange={e => updateIssue({ priority: e.target.value })}>{['No priority', 'Urgent', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}</select></label><label><UserRound size={16} /><select aria-label="Issue assignee" value={issue.assignee} onChange={e => updateIssue({ assignee: e.target.value })}><option>Unassigned</option><option>Alex Smith</option></select></label><h2>Labels</h2><Button className="property-button" onClick={() => setToast('Research label added')}><Tag size={15} /> Add a label</Button><h2>Project</h2><Button className="property-button" onClick={() => navigate('project')}><Box size={15} />{issue.project}</Button><h2>Cycle</h2><Button className="property-button" onClick={() => setToast('Added to the current cycle')}><Clock3 size={15} /> Add to cycle</Button></aside></div>}

        {view === 'inbox' && <div className="empty-state"><Inbox size={38} strokeWidth={1.2} /><h2>You’re all caught up</h2><p>Updates on issues you follow will appear here.</p><Button className="subtle-button" onClick={() => navigate('issues')}>View your team’s issues</Button></div>}
        {view === 'drafts' && (drafts.length ? <div className="draft-list"><h1>Drafts</h1>{drafts.map((draft, index) => <Button className="draft-row" key={index} onClick={() => { setTitle(draft.title); setDescription(draft.description); setDrafts(items => items.filter((_, i) => i !== index)); setCreateOpen(true); }}><FilePenLine size={16} /><span>{draft.title}</span><ChevronRight size={14} /></Button>)}</div> : <div className="empty-state"><FilePenLine size={38} strokeWidth={1.2} /><h2>No drafts yet</h2><p>Issues you save as a draft will appear here.</p><Button className="subtle-button" onClick={() => setCreateOpen(true)}><Plus size={14} />Create an issue</Button></div>)}
      </main>

      <footer className="app-footer"><Button onClick={() => explain('Ask Linear', 'Try the keyboard shortcuts:\nC to create an issue\n/ to search all issues\nEscape to close a dialog')}><MousePointer2 size={14} />Ask Linear</Button><Button aria-label="Recent activity" onClick={() => navigate('inbox')}><Clock3 size={14} /></Button></footer>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogBackdrop className="modal-backdrop" />
        <DialogContent className="create-dialog" initialFocus="#new-issue-title">
          <div className="dialog-header"><span className="team-mark"><Globe size={13} /></span><span className="muted">AS</span><ChevronRight size={12} /><DialogTitle className="dialog-title">New issue</DialogTitle><div className="header-spacer" /><Button className="subtle-button save-draft" onClick={saveDraft}>Save as draft</Button><Button className="icon-button" aria-label="Expand editor" onClick={() => setToast('Editor is ready for your issue')}><Maximize2 size={14} /></Button><DialogClose className="icon-button" aria-label="Close new issue"><X size={16} /></DialogClose></div>
          <DialogDescription className="sr-only">Create an issue for the AS Mobbin team.</DialogDescription>
          <form onSubmit={addIssue}>
            <input id="new-issue-title" className="new-issue-title" aria-label="Issue title" placeholder="Issue title" value={title} onChange={event => setTitle(event.target.value)} required />
            <textarea className="new-issue-description" aria-label="Issue description" placeholder="Add description…" value={description} onChange={event => setDescription(event.target.value)} />
            <div className="new-issue-properties"><label className="property-pill"><StatusIcon status={newStatus} /><select aria-label="New issue status" value={newStatus} onChange={e => setNewStatus(e.target.value as Status)}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label><label className="property-pill"><span className="priority-icon">▂▅▇</span><select aria-label="New issue priority" value={priority} onChange={e => setPriority(e.target.value)}>{['No priority', 'Urgent', 'High', 'Medium', 'Low'].map(item => <option key={item}>{item}</option>)}</select></label><span className="property-pill"><UserRound size={14} />Assignee</span><span className="property-pill modal-project"><Box size={14} />{view === 'project' ? 'User Insight & Behavior…' : 'AI UX Research Assistant'}</span><span className="property-pill"><i className="label-dot" />New</span></div>
            <div className="dialog-footer"><Button className="round-button" aria-label="Attach a file" onClick={() => setToast('Attachments are not stored in this prototype')}><Paperclip size={14} /></Button><div className="header-spacer" /><label className="create-more"><input type="checkbox" checked={createMore} onChange={e => setCreateMore(e.target.checked)} /><span className="switch-track" />Create more</label><Button type="submit" className="primary-button">Create issue</Button></div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(info)} onOpenChange={open => { if (!open) setInfo(null); }}><DialogBackdrop className="modal-backdrop" /><DialogContent className="info-dialog"><div className="dialog-header"><DialogTitle>{info?.title}</DialogTitle><div className="header-spacer" /><DialogClose className="icon-button" aria-label="Close"><X size={16} /></DialogClose></div><DialogDescription>{info?.text}</DialogDescription><DialogClose className="subtle-button">Done</DialogClose></DialogContent></Dialog>
      {toast && <div className="toast" role="status"><CircleCheck size={15} />{toast}</div>}
    </div>
  );
}
