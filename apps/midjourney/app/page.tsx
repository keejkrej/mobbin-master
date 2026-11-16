"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp, Bell, Check, ChevronDown, ChevronUp, ChevronsUp, CircleHelp, CirclePlus,
  Compass, Download, Folder, Heart, Image as ImageIcon, Menu, MessagesSquare,
  MoreHorizontal, Paintbrush, Pencil, Search, Shuffle, SlidersHorizontal,
  SquarePen, Sun, SwatchBook, ThumbsUp, Trash2, Upload, UserCircle, X,
} from "lucide-react";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, Toggle } from "@study/ui";

type Artwork = { id: string; src: string; title: string; prompt: string; ratio?: string; type?: string };
type View = "Explore" | "Create" | "Organize" | "Personalize" | "Edit" | "Chat" | "Tasks";
const tomatoPrompt = "Two cute tomatoes sitting together watching the sunset, leaning on each other. The sunset is sitting above the water. The style of this image is painterly, giving off a warm tone and vibe to it. The sunset also has a purplish tone.";
const dogPrompt = "Two dogs sitting together watching the sunset, leaning on each other. The sunset is sitting above the water. The style of this image is painterly, giving off a warm tone and vibe to it. The sunset also has a purplish tone.";
const asset = (name: string) => "/midjourney/artwork/" + name;
const tomatoes: Artwork = { id: "tomatoes", src: asset("tomatoes.webp"), title: "Two tomatoes at sunset", prompt: tomatoPrompt, ratio: "16:9", type: "Imagine" };
const dogs: Artwork = { id: "dogs", src: asset("dogs.webp"), title: "Two dogs at sunset", prompt: dogPrompt, ratio: "1:1", type: "Edit" };
const subjects = ["Underwater dream", "Underwater dream", "Underwater dream", "Underwater dream", "Light in the forest", "Waterfall valley", "Ocean explorer", "Ice falls", "Wolf study", "Wolves in motion", "Ink wolves", "Wolf sketch", "Woodland dining", "Warm café interior", "Golden café", "Botanical café", "A city in motion", "Floating chair", "A gentle giant", "A summer festival", "Emerald garden", "Visitors from space", "A quiet encounter", "An unexpected visitor", "A cosmic journey", "Tiny racing car", "A pink city", "Dream machines", "Dogs at sunset", "Dogs at sunset", "Dogs at sunset", "Dogs at sunset", "Tomatoes at sunset", "Tomatoes at sunset", "A family at sunset", "Warm sunset"];
const initialArt: Artwork[] = subjects.map((title, i) => ({ id: "art-" + i, src: asset("grid-" + String(i).padStart(2,"0") + ".webp"), title, prompt: i >= 28 ? (i >= 32 ? tomatoPrompt : dogPrompt) : title + ", painterly composition, atmospheric light, thoughtful details.", ratio: "1:1", type: "Imagine" }));
const exploreArt: Artwork[] = [
  { id: "cat", src: asset("cat.webp"), title: "Curious cat", prompt: "A curious silver kitten against a vivid yellow background, luminous amber eyes, portrait photography." },
  { id: "painting", src: asset("painting.webp"), title: "A moment of light", prompt: "An ornate old master painting, a luminous figure surrounded by clouds, dramatic golden light." },
  { id: "museum", src: asset("museum.webp"), title: "Passing through", prompt: "A person walking through a quiet art museum, motion blur, golden picture frames, cool blue tones." },
  { id: "illustration", src: asset("illustration.webp"), title: "The little laboratory", prompt: "A playful hand-drawn laboratory, bright green walls, simple black outlines, whimsical illustration." },
  { id: "cyber", src: asset("cyber-2.webp"), title: "Future archive", prompt: "A luminous futuristic archive, a person exploring holographic collections, teal and gold, cinematic." },
  tomatoes, dogs, ...initialArt.slice(4, 10),
];
const nav = [{name:"Explore",icon:Compass},{name:"Create",icon:Paintbrush},{name:"Organize",icon:ImageIcon},{name:"Personalize",icon:SwatchBook},{name:"Edit",icon:SquarePen},{name:"Chat",icon:MessagesSquare},{name:"Tasks",icon:ThumbsUp}] as const;

export default function Midjourney() {
  const [view,setView] = useState<View>("Create");
  const [selected,setSelected] = useState<Artwork|null>(tomatoes);
  const [artworks,setArtworks] = useState<Artwork[]>(initialArt);
  const [prompt,setPrompt] = useState("");
  const [query,setQuery] = useState("");
  const [favorites,setFavorites] = useState<string[]>([]);
  const [mobileNav,setMobileNav] = useState(false);
  const [isMobile,setIsMobile] = useState(false);
  const [dark,setDark] = useState(false);
  const [settingsOpen,setSettingsOpen] = useState(false);
  const [uploadOpen,setUploadOpen] = useState(false);
  const [helpOpen,setHelpOpen] = useState(false);
  const [folderOpen,setFolderOpen] = useState(false);
  const [folderName,setFolderName] = useState("");
  const [folders,setFolders] = useState<string[]>([]);
  const [folderItems,setFolderItems] = useState<Record<string,string[]>>({});
  const [activeFolder,setActiveFolder] = useState("All images");
  const [uploads,setUploads] = useState<Artwork[]>([
    {id:"upload-1",src:asset("cyber-1.webp"),title:"Future archive reference",prompt:"A futuristic archive with glowing displays."},
    {id:"upload-2",src:asset("cyber-2.webp"),title:"Future archive reference 2",prompt:"A person exploring a futuristic archive."},
  ]);
  const [imageRef,setImageRef] = useState<Artwork|null>(null);
  const [likedOnly,setLikedOnly] = useState(false);
  const [layout,setLayout] = useState("Square");
  const [size,setSize] = useState("Small");
  const [foldersExpanded,setFoldersExpanded] = useState(false);
  const [filtersExpanded,setFiltersExpanded] = useState(false);
  const [viewsExpanded,setViewsExpanded] = useState(true);
  const [optionsOpen,setOptionsOpen] = useState(false);
  const [accountOpen,setAccountOpen] = useState(false);
  const [aspect,setAspect] = useState("16:9");
  const [stylize,setStylize] = useState(700);
  const [weird,setWeird] = useState(200);
  const [chaos,setChaos] = useState(30);
  const [model,setModel] = useState("6.1");
  const [toast,setToast] = useState("");
  const [zoomed,setZoomed] = useState(false);
  const [channel,setChannel] = useState("General Chaos");
  const [chatText,setChatText] = useState("");
  const [chatMessages,setChatMessages] = useState<string[]>([]);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const media=window.matchMedia("(max-width: 760px)");
    const change=()=>{setIsMobile(media.matches);if(!media.matches)setMobileNav(false);};
    change(); media.addEventListener("change",change); return()=>media.removeEventListener("change",change);
  },[]);
  useEffect(()=>{ if(!toast)return; const timer=window.setTimeout(()=>setToast(""),3000); return()=>window.clearTimeout(timer); },[toast]);
  useEffect(()=>{
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMobileNav(false);setOptionsOpen(false);setAccountOpen(false);setZoomed(false);}};
    window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);
  },[]);
  function navigate(next:View){setView(next);setSelected(null);setMobileNav(false);setOptionsOpen(false);setQuery("");}
  function openArt(art:Artwork){setSelected(art.id==="art-33"?tomatoes:art.id==="art-29"?dogs:art);setView("Create");setZoomed(false);}
  function toggleFavorite(id:string){setFavorites(old=>old.includes(id)?old.filter(value=>value!==id):[...old,id]);}
  function imagine(){
    if(!prompt.trim()&&!imageRef)return;
    const text=prompt.trim()||imageRef!.prompt;
    const samples=[tomatoes,dogs,exploreArt[0],exploreArt[2]];
    const created=samples.map((sample,index)=>({...sample,id:"created-"+Date.now()+"-"+index,title:text.slice(0,60),prompt:text,type:"Imagine",ratio:aspect}));
    setArtworks(old=>[...created,...old]);setSelected(created[0]);setView("Create");setPrompt("");setImageRef(null);setToast("4 preview variations added");
  }
  function creationAction(action:string){
    if(!selected)return;
    if(action==="Editor"){setView("Edit");setPrompt(selected.prompt);setImageRef(selected);setSelected(null);return;}
    const next={...selected,id:"variation-"+Date.now(),type:action.includes("Upscale")?"Upscale":"Imagine"};
    setArtworks(old=>[next,...old]);setSelected(next);setToast(action+" preview added");setOptionsOpen(false);
  }
  function usePrompt(){if(selected){setPrompt(selected.prompt);promptRef.current?.focus();setToast("Prompt added");}}
  function addUpload(file:File){
    if(!file.type.startsWith("image/")){setToast("Choose an image file");return;}
    const item={id:"upload-"+Date.now(),src:URL.createObjectURL(file),title:file.name,prompt:"An image inspired by "+file.name};
    setUploads(old=>[...old,item]);setToast("Image added to references");
  }
  const folderIsEmpty=view==="Organize"&&activeFolder!=="All images"&&!(folderItems[activeFolder]?.length);
  const allDisplay=(view==="Explore"?exploreArt:artworks).filter(art=>(view!=="Organize"||activeFolder==="All images"||(folderItems[activeFolder]||[]).includes(art.id))&&(!query||[art.title,art.prompt].some(text=>text.toLowerCase().includes(query.toLowerCase())))&&(!likedOnly||favorites.includes(art.id)));
  const thumbnails=[...initialArt.slice(32),dogs];
  function settingRange(label:string,value:number,onChange:(v:number)=>void,max:number){return <label className="range-field"><span>{label}<output>{value}</output></span><input type="range" min="0" max={max} value={value} onChange={event=>onChange(Number(event.target.value))}/></label>;}

  return <div className={"mj-app "+(dark?"dark ":"")+(mobileNav?"nav-open":"")}>
    {mobileNav&&<Button className="mobile-scrim" aria-label="Close navigation" onClick={()=>setMobileNav(false)}/>}
    <aside className="sidebar" inert={isMobile&&!mobileNav} aria-label="Midjourney navigation">
      <a href="/" className="wordmark">Midjourney</a>
      <nav>{nav.map(({name,icon:Icon})=><div key={name}>
        <Button className={"nav-button "+(view===name?"active":"")} onClick={()=>navigate(name)} aria-current={view===name?"page":undefined}><Icon/><span>{name}</span></Button>
        {name==="Chat"&&<div className="channels">{["General Chaos","Prompt Craft","Daily Theme","Newbies"].map(item=><Button key={item} onClick={()=>{navigate("Chat");setChannel(item);}}>{item}</Button>)}</div>}
      </div>)}</nav>
      <div className="sidebar-bottom">
        <Button className="nav-button" onClick={()=>setHelpOpen(true)}><CircleHelp/><span>Help</span></Button>
        <Button className="nav-button" onClick={()=>{setToast("You’re up to date");}}><Bell/><span>Updates</span></Button>
        <Button className="nav-button" onClick={()=>setDark(!dark)}><Sun/><span>{dark?"Dark Mode":"Light Mode"}</span></Button>
        <div className="account-wrap"><Button className="account-button" onClick={()=>setAccountOpen(!accountOpen)} aria-expanded={accountOpen}><UserCircle/><span>My Account</span><MoreHorizontal/></Button>
          {accountOpen&&<div className="account-menu"><strong>Midjourney member</strong><span>Personal workspace</span><Button onClick={()=>{setSettingsOpen(true);setAccountOpen(false);}}>Image preferences</Button><a href="/">Back to design studies</a></div>}
        </div>
      </div>
    </aside>
    <main className="workspace">
      <div className="mobile-top"><Button className="icon-button" aria-label="Open navigation" onClick={()=>setMobileNav(true)}><Menu/></Button><span>Midjourney</span><span>{view}</span></div>
      <header className="topbar">
        <form className={"imagine-bar "+(imageRef?"has-reference":"")} onSubmit={event=>{event.preventDefault();imagine();}}>
          <div className="imagine-main"><Button className={"icon-button add-image "+(imageRef?"accent":"")} aria-label="Add image reference" onClick={()=>setUploadOpen(true)}><ImageIcon/></Button>
            <textarea ref={promptRef} aria-label="Imagine prompt" placeholder="What will you imagine?" rows={1} value={prompt} onChange={event=>setPrompt(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();imagine();}}}/>
            {prompt.trim()&&<Button type="submit" className="icon-button imagine-submit" aria-label="Imagine"><ArrowUp/></Button>}
            <Button className="icon-button" aria-label="Image settings" onClick={()=>setSettingsOpen(true)}><SlidersHorizontal/></Button>
          </div>
          {imageRef&&<div className="reference-strip"><img src={imageRef.src} alt={imageRef.title}/><span>Image reference</span><Button className="icon-button" aria-label="Remove image reference" onClick={()=>setImageRef(null)}><X/></Button></div>}
        </form>
        <div className="search-bar"><Search/><input aria-label="Search images" placeholder="Search" value={query} onChange={event=>{setQuery(event.target.value);if(selected)setSelected(null);}}/>{query&&<Button className="icon-button" aria-label="Clear search" onClick={()=>setQuery("")}><X/></Button>}{view==="Organize"&&<Button className="organize-button" onClick={()=>setFolderOpen(true)}><Folder/>Organize</Button>}</div>
      </header>

      {selected?<section className={"image-detail "+(zoomed?"zoomed":"")} aria-label="Image detail">
        <div className="image-stage"><Button className="icon-button close-detail" aria-label="Close image detail" onClick={()=>setSelected(null)}><X/></Button>
          <img className="hero-artwork" src={selected.src} alt={selected.title}/>
        </div>
        <aside className="detail-panel" aria-label="Image information">
          <div className="detail-meta"><span>{selected.type||"Imagine"}</span><small>1h</small><div className="detail-tools">
            <Button className="icon-button" aria-label="Copy image prompt" onClick={usePrompt}><Menu/></Button>
            <a className="icon-button" href={selected.src} download="midjourney-study.webp" aria-label="Download image"><Download/></a>
            <Button className="icon-button" aria-label={zoomed?"Zoom out":"Zoom image"} onClick={()=>setZoomed(!zoomed)}><Search/></Button>
            <Toggle className="icon-button favorite" aria-label="Favorite image" pressed={favorites.includes(selected.id)} onPressedChange={()=>toggleFavorite(selected.id)}><Heart/></Toggle>
          </div></div>
          <p className="image-prompt">{selected.prompt}</p>
          <div className="parameters">{["chaos "+chaos,"ar "+(selected.ratio||aspect),"v "+model,"stylize "+stylize,"weird "+weird].map(value=><span key={value}>{value}</span>)}</div>
          <div className="version-strip" aria-label="Image variations">{thumbnails.map((art,index)=><Button key={art.id} onClick={()=>openArt(index===1?tomatoes:index===4?dogs:art)} aria-label={"View variation "+(index+1)}><img src={art.src} alt=""/></Button>)}</div>
          <div className="creation-actions">
            <div className="actions-heading"><span>Creation Actions</span><Button onClick={()=>setOptionsOpen(!optionsOpen)} aria-expanded={optionsOpen}>More options</Button></div>
            {optionsOpen&&<div className="more-options"><Button onClick={()=>creationAction("Vary")}><Shuffle/>Vary<Check/></Button><Button onClick={()=>creationAction("Upscale")}><ChevronsUp/>Upscale<Check/></Button><Button onClick={()=>{setPrompt(selected.prompt);setOptionsOpen(false);}}><Pencil/>Remix</Button><Button onClick={()=>{setImageRef(selected);setOptionsOpen(false);}}><ImageIcon/>Use in prompt<Check/></Button></div>}
            <div className="action-row"><span>Vary</span><Button onClick={()=>creationAction("Subtle variation")}>Subtle</Button><Button onClick={()=>creationAction("Strong variation")}>Strong</Button></div>
            <div className="action-row"><span>Upscale</span><Button onClick={()=>creationAction("Upscale subtle")}>Subtle</Button><Button onClick={()=>creationAction("Upscale creative")}>Creative</Button></div>
            <div className="action-row"><span>More</span><Button onClick={()=>creationAction("Rerun")}>Rerun</Button><Button onClick={()=>creationAction("Editor")}>Editor</Button></div>
            <div className="action-row use-row"><span>Use</span><Button onClick={()=>{setImageRef(selected);setToast("Image reference added");}}>Image</Button><Button onClick={()=>{setImageRef(selected);setToast("Style reference added");}}>Style</Button><Button onClick={usePrompt}>Prompt</Button></div>
          </div>
        </aside>
      </section>:view==="Organize"||view==="Create"||view==="Explore"?<section className={"gallery-layout "+(view==="Explore"?"explore-layout":"")}>
        <div className="gallery-main">
          <div className="gallery-heading"><h1>{view==="Explore"?"Explore":activeFolder==="All images"?"Today":activeFolder}</h1>{view!=="Explore"&&<Button className="icon-button" aria-label="New folder" onClick={()=>setFolderOpen(true)}><CirclePlus/></Button>}{view==="Explore"&&<div className="explore-tabs"><Button className={!likedOnly?"selected":""} onClick={()=>setLikedOnly(false)}>Random</Button><Button className={likedOnly?"selected":""} onClick={()=>setLikedOnly(true)}>Likes</Button></div>}</div>
          <div className={view==="Explore"?"explore-grid":"organize-grid "+size.toLowerCase()+" "+layout.toLowerCase()}>
            {allDisplay.map((art,index)=><Button className={"art-tile tile-"+index%5} key={art.id} onClick={()=>openArt(art)} aria-label={"Open "+art.title+" "+(index+1)}><img src={art.src} alt={art.title}/>{favorites.includes(art.id)&&<span className="tile-liked"><Heart/></span>}<span className="tile-caption">{art.title}</span></Button>)}
          </div>
          {!allDisplay.length&&<div className="empty-state"><ImageIcon/><h2>{folderIsEmpty?"This folder is empty":"No images found"}</h2><p>{folderIsEmpty?"Add images from your workspace to start this collection.":"Try another search or turn off your filters."}</p><Button onClick={()=>{if(folderIsEmpty)setFolderItems(old=>({...old,[activeFolder]:artworks.map(art=>art.id)}));setQuery("");setLikedOnly(false);}} className="neutral-button">{folderIsEmpty?"Add workspace images":"Clear filters"}</Button></div>}
          {view!=="Explore"&&allDisplay.length>0&&<div className="end-marker"><span/>You’ve reached the end</div>}
        </div>
        {view!=="Explore"&&<aside className="organize-options" aria-label="Gallery options">
          <section><Button className="option-title" onClick={()=>setFoldersExpanded(!foldersExpanded)} aria-expanded={foldersExpanded}>Folders<ChevronDown/></Button>{foldersExpanded&&<div className="option-content folder-list"><Button onClick={()=>setActiveFolder("All images")} className={activeFolder==="All images"?"selected":""}><Folder/>All images</Button>{folders.map(folder=><Button key={folder} onClick={()=>setActiveFolder(folder)} className={activeFolder===folder?"selected":""}><Folder/>{folder}</Button>)}<Button onClick={()=>setFolderOpen(true)}><CirclePlus/>New folder</Button></div>}</section>
          <section><Button className="option-title" onClick={()=>setFiltersExpanded(!filtersExpanded)} aria-expanded={filtersExpanded}>Filters<ChevronDown/></Button>{filtersExpanded&&<div className="option-content"><label className="check-field"><input type="checkbox" checked={likedOnly} onChange={event=>setLikedOnly(event.target.checked)}/>Liked images</label></div>}</section>
          <section><Button className="option-title" onClick={()=>setViewsExpanded(!viewsExpanded)} aria-expanded={viewsExpanded}>View Options{viewsExpanded?<ChevronUp/>:<ChevronDown/>}</Button>{viewsExpanded&&<div className="option-content"><fieldset><legend>Layout</legend>{["Square","Full"].map(value=><label key={value}><input type="radio" name="layout" value={value} checked={layout===value} onChange={()=>setLayout(value)}/>{value}</label>)}</fieldset><fieldset><legend>Image Size</legend>{["Small","Medium","Large"].map(value=><label key={value}><input type="radio" name="size" value={value} checked={size===value} onChange={()=>setSize(value)}/>{value}</label>)}</fieldset></div>}</section>
        </aside>}
      </section>:view==="Edit"?<section className="editor-view"><h1>Edit your image</h1><p>Bring an idea a little closer to what you imagined.</p>{imageRef?<img src={imageRef.src} alt={imageRef.title}/>:<Button className="editor-drop" onClick={()=>setUploadOpen(true)}><Upload/>Choose an image</Button>}<div className="editor-actions"><Button className="neutral-button" onClick={()=>setUploadOpen(true)}>Choose image</Button><Button className="primary-button" disabled={!imageRef} onClick={()=>{if(imageRef){setSelected({...imageRef,prompt:prompt||imageRef.prompt,type:"Edit"});setView("Create");setToast("Edit preview ready");}}}>Preview edit</Button></div></section>
      :view==="Personalize"?<section className="simple-view"><h1>Personalize</h1><p>Find the images that feel most like you.</p><div className="personalize-pair">{[exploreArt[0],exploreArt[1]].map(art=><Button key={art.id} onClick={()=>{toggleFavorite(art.id);setToast("Preference saved");}} aria-label={"Prefer "+art.title}><img src={art.src} alt={art.title}/><span>{favorites.includes(art.id)?"Selected":"Choose this image"}</span></Button>)}</div></section>
      :view==="Chat"?<section className="simple-view chat-view"><h1>{channel}</h1><p>A place to share ideas and talk about what you’re making.</p><div className="chat-messages"><p className="community-note">Welcome to {channel}. What are you imagining today?</p>{chatMessages.map((message,index)=><p className="chat-bubble" key={index}>{message}</p>)}</div><form onSubmit={event=>{event.preventDefault();if(chatText.trim()){setChatMessages(old=>[...old,chatText]);setChatText("");}}}><input aria-label="Community message" placeholder="Write a message…" value={chatText} onChange={event=>setChatText(event.target.value)}/><Button type="submit" className="primary-button" disabled={!chatText.trim()}>Send</Button></form></section>
      :<section className="simple-view"><h1>Tasks</h1><p>Your recent creative activity.</p><div className="task-item"><Check/><span>All previews are ready</span><small>{artworks.length} images in your workspace</small></div></section>}
    </main>
    {toast&&<div className="toast" role="status"><Check/>{toast}</div>}

    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}><DialogContent className="mj-dialog settings-dialog"><div className="dialog-heading"><DialogTitle>Image settings</DialogTitle><DialogClose className="icon-button" aria-label="Close image settings"><X/></DialogClose></div><DialogDescription>Shape the next thing you imagine.</DialogDescription><fieldset className="aspect-field"><legend>Image Size</legend>{["1:1","16:9","9:16"].map(value=><label key={value}><input type="radio" name="aspect" checked={aspect===value} onChange={()=>setAspect(value)}/><span>{value==="1:1"?"Square":value==="16:9"?"Landscape":"Portrait"}</span><small>{value}</small></label>)}</fieldset>{settingRange("Stylization",stylize,setStylize,1000)}{settingRange("Weirdness",weird,setWeird,3000)}{settingRange("Variety",chaos,setChaos,100)}<label className="model-field">Model<select value={model} onChange={event=>setModel(event.target.value)}><option>6.1</option><option>6</option><option>5.2</option></select></label><div className="dialog-actions"><Button className="neutral-button" onClick={()=>{setAspect("16:9");setStylize(700);setWeird(200);setChaos(30);setModel("6.1");}}>Reset</Button><DialogClose className="primary-button">Done</DialogClose></div></DialogContent></Dialog>
    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}><DialogContent className="mj-dialog upload-dialog"><div className="dialog-heading"><DialogTitle>Image references</DialogTitle><DialogClose className="icon-button" aria-label="Close image references"><X/></DialogClose></div><DialogDescription>Choose an image to use in your next prompt.</DialogDescription><div className="upload-grid"><Button className="upload-drop" onClick={()=>inputRef.current?.click()} onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();const file=event.dataTransfer.files[0];if(file)addUpload(file);}}><Upload/><strong>Choose a file</strong><span>or drop it here</span></Button>{uploads.map(art=><div className="upload-card" key={art.id}><Button onClick={()=>{setImageRef(art);setUploadOpen(false);}} aria-label={"Use "+art.title}><img src={art.src} alt={art.title}/></Button><div><Button className="icon-button" aria-label={"Inspect "+art.title} onClick={()=>{setSelected(art);setView("Create");setUploadOpen(false);}}><CircleHelp/></Button><Button className="icon-button" aria-label={"Remove "+art.title} onClick={()=>setUploads(old=>old.filter(image=>image.id!==art.id))}><Trash2/></Button></div></div>)}</div><input ref={inputRef} type="file" accept="image/*" hidden onChange={event=>{const file=event.target.files?.[0];if(file)addUpload(file);event.target.value="";}}/></DialogContent></Dialog>
    <Dialog open={folderOpen} onOpenChange={setFolderOpen}><DialogContent className="mj-dialog"><div className="dialog-heading"><DialogTitle>New folder</DialogTitle><DialogClose className="icon-button" aria-label="Close new folder"><X/></DialogClose></div><DialogDescription>A little space for a new collection.</DialogDescription><form onSubmit={event=>{event.preventDefault();if(folderName.trim()){setFolders(old=>[...old,folderName.trim()]);setActiveFolder(folderName.trim());setFolderItems(old=>({...old,[folderName.trim()]:[]}));setView("Organize");setSelected(null);setFolderName("");setFolderOpen(false);setFoldersExpanded(true);setToast("Folder created");}}}><label className="field-label" htmlFor="folder-name">Folder name</label><input className="text-input" id="folder-name" placeholder="My collection" value={folderName} onChange={event=>setFolderName(event.target.value)} autoFocus/><div className="dialog-actions"><DialogClose className="neutral-button">Cancel</DialogClose><Button className="primary-button" type="submit" disabled={!folderName.trim()}>Create folder</Button></div></form></DialogContent></Dialog>
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}><DialogContent className="mj-dialog"><div className="dialog-heading"><DialogTitle>A little help imagining</DialogTitle><DialogClose className="icon-button" aria-label="Close help"><X/></DialogClose></div><DialogDescription>Describe what you want to see, then press Enter. Add an image reference or adjust Image settings to explore a direction.</DialogDescription><p className="help-copy">This study uses a small local collection of reference artwork. Preview actions demonstrate the interface without generating new images or sending your files anywhere.</p><div className="dialog-actions"><DialogClose className="primary-button">Got it</DialogClose></div></DialogContent></Dialog>
  </div>;
}
