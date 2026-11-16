'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@study/ui';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, CircleHelp, Globe, Heart, Mail, Menu, Minus, Plus, Search, Share2, Star, Tag, X } from 'lucide-react';

type Stay = { id: number; name: string; city: string; price: number; rating: string; favorite: boolean; image: string };
const stays: Stay[] = [
  { id: 1, name: 'Apartment in Center City', city: 'Philadelphia', price: 240, rating: '4.93', favorite: true, image: 'stay-1.jpg' },
  { id: 2, name: 'Place to stay in Center City', city: 'Philadelphia', price: 103, rating: '4.84', favorite: true, image: 'stay-2.jpg' },
  { id: 3, name: 'Place to stay in Philadelphia', city: 'Philadelphia', price: 228, rating: '4.89', favorite: false, image: 'stay-3.jpg' },
  { id: 4, name: 'Apartment in Point Breeze', city: 'Philadelphia', price: 234, rating: '4.85', favorite: true, image: 'stay-4.jpg' },
  { id: 5, name: 'Room in West Philadelphia', city: 'Philadelphia', price: 123, rating: '4.91', favorite: true, image: 'stay-5.jpg' },
  { id: 6, name: 'Condo in Center City', city: 'Philadelphia', price: 371, rating: '4.99', favorite: true, image: 'stay-6.jpg' },
  { id: 7, name: 'Room in Fishtown', city: 'Philadelphia', price: 159, rating: '4.91', favorite: true, image: 'stay-7.jpg' },
  { id: 8, name: 'Apartment in Miami', city: 'Miami', price: 381, rating: '5.0', favorite: true, image: 'stay-8.jpg' },
  { id: 9, name: 'Room in Miami', city: 'Miami', price: 112, rating: '4.99', favorite: true, image: 'stay-9.jpg' },
  { id: 10, name: 'Room in Miami', city: 'Miami', price: 107, rating: '4.96', favorite: true, image: 'stay-10.jpg' },
  { id: 11, name: 'Room in Miami', city: 'Miami', price: 137, rating: '5.0', favorite: true, image: 'stay-11.jpg' },
  { id: 12, name: 'Apartment in Miami', city: 'Miami', price: 588, rating: '4.88', favorite: false, image: 'stay-12.jpg' },
  { id: 13, name: 'Room in Miami', city: 'Miami', price: 228, rating: '4.88', favorite: true, image: 'stay-13.jpg' },
  { id: 14, name: 'Apartment in Coral Gables', city: 'Miami', price: 228, rating: '4.97', favorite: true, image: 'stay-14.jpg' },
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({ id: n + 14, name: n % 2 ? 'Apartment in San Juan' : 'Room in San Juan', city: 'San Juan', price: 122 + n * 18, rating: '4.95', favorite: n !== 1, image: `stay-${n + 14}.jpg` })),
];

function AirbnbMark() {
  return <svg viewBox="0 0 32 34" aria-hidden="true"><path d="M16 1.9c-2.2 0-3.3 2.2-4.3 4.2C8.1 13.2 4.6 20.1 3 24.3c-2.8 7.1 2.4 9 6.2 6.5 2.7-1.7 5.1-4.4 6.8-7.3 1.7 2.9 4.1 5.6 6.8 7.3 3.8 2.5 9 .6 6.2-6.5-1.6-4.2-5.1-11.1-8.7-18.2-1-2-2.1-4.2-4.3-4.2Zm0 21.6c-2.7-4.5-4.2-7.6-4.2-10 0-5.2 8.4-5.2 8.4 0 0 2.4-1.5 5.5-4.2 10Z" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round"/></svg>;
}

function StayCard({ stay, saved, toggleSaved, onSelect }: { stay: Stay; saved: number[]; toggleSaved: (id: number) => void; onSelect: (stay: Stay) => void }) {
    const isSaved = saved.includes(stay.id);
    return <article className="stay-card">
      <div className="stay-photo-wrap">
        <Button className="stay-photo-button" onClick={() => onSelect(stay)} aria-label={`View ${stay.name}, $${stay.price} for 2 nights`}><img src={`/airbnb/images/${stay.image}`} alt={stay.name} className="stay-photo" /></Button>
        {stay.favorite && <span className="favorite-badge">Guest favorite</span>}
        <Button className={`save-button ${isSaved ? 'is-saved' : ''}`} aria-label={`${isSaved ? 'Remove' : 'Save'} ${stay.name}${isSaved ? ' from' : ' to'} wishlist`} aria-pressed={isSaved} onClick={() => toggleSaved(stay.id)}><Heart size={28} /></Button>
      </div>
      <Button className="stay-title" onClick={() => onSelect(stay)}>{stay.name}</Button>
      <p className="stay-meta">${stay.price} for 2 nights <span>·</span> <Star size={11} fill="currentColor" strokeWidth={0} /> {stay.rating}</p>
    </article>;
  }

function StayRow({ title, items, saved, toggleSaved, onSelect, onCity }: { title: string; items: Stay[]; saved: number[]; toggleSaved: (id: number) => void; onSelect: (stay: Stay) => void; onCity: (city: string) => void }) {
    const row = useRef<HTMLDivElement>(null);
    return <section className="stay-section"><div className="section-heading"><Button className="section-title" onClick={() => onCity(items[0]?.city || '')}>{title}<ChevronRight size={21} strokeWidth={2.5} /></Button><div className="carousel-controls"><Button aria-label={`Previous ${title}`} onClick={() => row.current?.scrollBy({ left: -500, behavior: 'smooth' })}><ChevronLeft size={17}/></Button><Button aria-label={`Next ${title}`} onClick={() => row.current?.scrollBy({ left: 500, behavior: 'smooth' })}><ChevronRight size={17}/></Button></div></div><div className="stay-grid" ref={row}>{items.map((stay) => <StayCard key={stay.id} stay={stay} saved={saved} toggleSaved={toggleSaved} onSelect={onSelect}/>)}</div></section>;
  }


export default function AirbnbApp() {
  const [saved, setSaved] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'home' | 'saved'>('home');
  const [destination, setDestination] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(0);
  const [searchPanel, setSearchPanel] = useState<'where' | 'checkin' | 'checkout' | 'guests' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Stay | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [loginComplete, setLoginComplete] = useState(false);
  const [toast, setToast] = useState('');
  const [reservation, setReservation] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => { try { const stored = JSON.parse(localStorage.getItem('airbnb-study-saved') || '[]'); if (Array.isArray(stored)) setSaved(stored.filter((v) => typeof v === 'number')); } catch {} setLoaded(true); }, []);
  useEffect(() => { if (loaded) { try { localStorage.setItem('airbnb-study-saved', JSON.stringify(saved)); } catch {} } }, [saved, loaded]);
  useEffect(() => { const id = Number(new URLSearchParams(window.location.search).get('stay')); if (id) setSelected(stays.find((stay) => stay.id === id) || null); }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 3500); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => {
    function close(event: MouseEvent) { if (headerRef.current && !headerRef.current.contains(event.target as Node)) { setSearchPanel(null); setMenuOpen(false); } }
    function escape(event: KeyboardEvent) { if (event.key === 'Escape') { setSearchPanel(null); setMenuOpen(false); } }
    document.addEventListener('click', close); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', escape); };
  }, []);

  function toggleSaved(id: number) { setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function openModal(name: string) { setMenuOpen(false); setSearchPanel(null); setModal(name); }
  function home() { setView('home'); setSelected(null); setSearchTerm(''); setDestination(''); }
  function runSearch() { setSearchTerm(destination.trim()); setSearchPanel(null); setView('home'); setSelected(null); }
  function selectStay(stay: Stay) { setSelected(stay); setReservation(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function selectCity(city: string) { setDestination(city); setSearchTerm(city); }
  function dateLabel(value: string) { return value ? new Date(value + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Add dates'; }
  const visibleStays = stays.filter((stay) => (view !== 'saved' || saved.includes(stay.id)) && (!searchTerm || `${stay.city} ${stay.name}`.toLowerCase().includes(searchTerm.toLowerCase())));


  return <div className="airbnb-app">
    <header ref={headerRef} className={`site-header ${selected ? 'compact-header' : ''}`}>
      <div className="topbar">
        <Button className="brand" onClick={home} aria-label="Airbnb home"><AirbnbMark/><span>airbnb</span></Button>
        <nav className="primary-nav" aria-label="Explore Airbnb">
          <Button className="nav-item active" onClick={home}><img src="/airbnb/images/homes.png" alt=""/><span>Homes</span></Button>
          <Button className="nav-item" onClick={() => openModal('Experiences')}><span className="nav-art"><img src="/airbnb/images/experiences.png" alt=""/><span className="new-badge">NEW</span></span><span>Experiences</span></Button>
          <Button className="nav-item" onClick={() => openModal('Services')}><span className="nav-art"><img src="/airbnb/images/services.png" alt=""/><span className="new-badge">NEW</span></span><span>Services</span></Button>
        </nav>
        <div className="header-actions"><Button className="host-button" onClick={() => openModal('Become a host')}>Become a host</Button><Button className="round-button" aria-label="Language and currency" onClick={() => openModal('Language and currency')}><Globe size={19}/></Button><Button className="round-button menu-button" aria-label="Open main menu" aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setSearchPanel(null); }}><Menu size={20}/>{saved.length > 0 && <span className="menu-dot"/>}</Button></div>
      </div>
      {!selected && <div className="search-area"><form className="search-bar" onSubmit={(event) => { event.preventDefault(); runSearch(); }}>
        <label className={`search-field destination-field ${searchPanel === 'where' ? 'focused' : ''}`}><span>Where</span><input aria-label="Search destinations" placeholder="Search destinations" value={destination} onChange={(event) => setDestination(event.target.value)} onFocus={() => { setSearchPanel('where'); setMenuOpen(false); }}/></label>
        <Button className={`search-field date-field ${searchPanel === 'checkin' ? 'focused' : ''}`} onClick={() => setSearchPanel(searchPanel === 'checkin' ? null : 'checkin')}><span>Check in</span><span className="search-placeholder">{dateLabel(checkIn)}</span></Button>
        <Button className={`search-field date-field ${searchPanel === 'checkout' ? 'focused' : ''}`} onClick={() => setSearchPanel(searchPanel === 'checkout' ? null : 'checkout')}><span>Check out</span><span className="search-placeholder">{dateLabel(checkOut)}</span></Button>
        <Button className={`search-field guest-field ${searchPanel === 'guests' ? 'focused' : ''}`} onClick={() => setSearchPanel(searchPanel === 'guests' ? null : 'guests')}><span>Who</span><span className="search-placeholder">{guests ? `${guests} guest${guests === 1 ? '' : 's'}` : 'Add guests'}</span></Button>
        <Button type="submit" className="search-button" aria-label="Search stays"><Search size={23}/></Button>
      </form>
      {searchPanel && <div className={`search-popover panel-${searchPanel}`}>
        {searchPanel === 'where' && <><h3>Suggested destinations</h3>{['Philadelphia', 'Miami', 'San Juan'].filter((city) => city.toLowerCase().includes(destination.toLowerCase())).map((city) => <Button className="destination-option" key={city} onClick={() => { setDestination(city); setSearchPanel('checkin'); }}><span className="destination-icon"><Search size={20}/></span><span><strong>{city}</strong><small>{city === 'Philadelphia' ? 'For its rich history and great food' : city === 'Miami' ? 'For sunshine and beach days' : 'For colorful streets and coastal stays'}</small></span></Button>)}</>}
        {(searchPanel === 'checkin' || searchPanel === 'checkout') && <><h3>{searchPanel === 'checkin' ? 'When are you arriving?' : 'When are you leaving?'}</h3><label className="date-picker-label">{searchPanel === 'checkin' ? 'Check-in date' : 'Check-out date'}<input type="date" aria-label={searchPanel === 'checkin' ? 'Check-in date' : 'Check-out date'} min={searchPanel === 'checkout' && checkIn ? checkIn : undefined} value={searchPanel === 'checkin' ? checkIn : checkOut} onChange={(event) => searchPanel === 'checkin' ? setCheckIn(event.target.value) : setCheckOut(event.target.value)}/></label><Button className="dark-button" onClick={() => setSearchPanel(searchPanel === 'checkin' ? 'checkout' : 'guests')}>Next</Button></>}
        {searchPanel === 'guests' && <><div className="guest-counter"><div><h3>Guests</h3><p>Ages 2 and above</p></div><div><Button className="counter-button" aria-label="Remove guest" disabled={guests === 0} onClick={() => setGuests(Math.max(0, guests - 1))}><Minus size={16}/></Button><span aria-live="polite">{guests}</span><Button className="counter-button" aria-label="Add guest" disabled={guests === 16} onClick={() => setGuests(guests + 1)}><Plus size={16}/></Button></div></div><Button className="dark-button" onClick={() => setSearchPanel(null)}>Done</Button></>}
      </div>}
      </div>}
      {menuOpen && <div className="main-menu"><Button onClick={() => openModal('Help Center')}><CircleHelp size={20}/>Help Center</Button><div className="menu-divider"/><Button className="host-menu-item" onClick={() => openModal('Become a host')}><span><strong>Become a host</strong><small>It’s easy to start hosting and<br/>earn extra income.</small></span><img src="/airbnb/images/homes.png" alt=""/></Button><div className="menu-divider"/><Button onClick={() => { setView('saved'); setSelected(null); setSearchTerm(''); setMenuOpen(false); }}>Wishlists{saved.length > 0 && <span className="saved-count">{saved.length}</span>}</Button><Button onClick={() => openModal('Refer a Host')}>Refer a Host</Button><Button onClick={() => openModal('Find a co-host')}>Find a co-host</Button><Button onClick={() => openModal('Gift cards')}>Gift cards</Button><div className="menu-divider"/><Button onClick={() => { setLoginComplete(false); openModal('Log in or sign up'); }}>Log in or sign up</Button></div>}
    </header>

    <main>
      {selected ? <section className="detail-page"><Button className="back-button" onClick={() => setSelected(null)}><ArrowLeft size={19}/>Back to homes</Button><div className="detail-title-row"><h1>{selected.name}</h1><div><Button className="text-button" onClick={() => { void navigator.clipboard?.writeText(`${window.location.origin}/airbnb/?stay=${selected.id}`).then(() => setToast('Link copied to clipboard')).catch(() => setToast('Share this stay from your browser address bar')); }}><Share2 size={17}/>Share</Button><Button className="text-button" onClick={() => toggleSaved(selected.id)}><Heart size={17} fill={saved.includes(selected.id) ? 'currentColor' : 'none'}/>{saved.includes(selected.id) ? 'Saved' : 'Save'}</Button></div></div><img className="detail-hero" src={`/airbnb/images/${selected.image}`} alt={selected.name}/><div className="detail-columns"><div><h2>A welcoming stay in {selected.city}</h2><p>2 guests · 1 bedroom · 1 bed · 1 bath</p><div className="detail-rating"><Star size={18} fill="currentColor"/>{selected.rating}<span>Guest favorite</span></div><hr/><h3>Make yourself at home</h3><p className="detail-description">A comfortable place to slow down and explore {selected.city}. Enjoy a private space with everything you need for a relaxing visit.</p><div className="amenities"><span>Wi-Fi</span><span>Kitchen</span><span>Air conditioning</span><span>Self check-in</span></div></div><aside className="booking-card"><p><strong>${selected.price}</strong> for 2 nights</p><div className="booking-dates"><label>CHECK-IN<input type="date" aria-label="Reservation check-in" value={checkIn} onChange={(event) => setCheckIn(event.target.value)}/></label><label>CHECKOUT<input type="date" aria-label="Reservation checkout" min={checkIn || undefined} value={checkOut} onChange={(event) => setCheckOut(event.target.value)}/></label></div><label className="booking-guests">GUESTS<select aria-label="Reservation guests" value={guests || 1} onChange={(event) => setGuests(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} guest{n === 1 ? '' : 's'}</option>)}</select></label><Button className="pink-button" onClick={() => setReservation(true)}>{reservation ? <><Check size={18}/>Dates selected</> : 'Reserve'}</Button><p className="booking-note" role="status">{reservation ? 'Your selection is ready. This study does not create a booking.' : 'You won’t be charged yet'}</p><hr/><div className="total-row"><strong>Total</strong><strong>${selected.price}</strong></div></aside></div></section>
      : view === 'saved' || searchTerm ? <div className="content-area results-area"><Button className="back-button" onClick={home}><ArrowLeft size={19}/>Explore homes</Button><h1>{view === 'saved' ? 'Wishlists' : `Stays in ${searchTerm}`}</h1><p className="results-count">{visibleStays.length} {view === 'saved' ? 'saved places' : 'places to stay'}</p>{visibleStays.length ? <div className="results-grid">{visibleStays.map((stay) => <StayCard key={stay.id} stay={stay} saved={saved} toggleSaved={toggleSaved} onSelect={selectStay}/>)}</div> : <div className="empty-state"><Heart size={42}/><h2>{view === 'saved' ? 'Your next trip starts here' : 'No stays found here'}</h2><p>{view === 'saved' ? 'Save the places you love by tapping the heart on a home.' : 'Try Philadelphia, Miami, or San Juan.'}</p><Button className="dark-button" onClick={home}>Explore homes</Button></div>}</div>
      : <div className="content-area"><StayRow saved={saved} toggleSaved={toggleSaved} onSelect={selectStay} onCity={selectCity} title="Popular homes in Philadelphia" items={stays.filter((stay) => stay.city === 'Philadelphia')}/><StayRow saved={saved} toggleSaved={toggleSaved} onSelect={selectStay} onCity={selectCity} title="Available next month in Miami" items={stays.filter((stay) => stay.city === 'Miami')}/><StayRow saved={saved} toggleSaved={toggleSaved} onSelect={selectStay} onCity={selectCity} title="Stay in San Juan" items={stays.filter((stay) => stay.city === 'San Juan')}/></div>}
    </main>
    {!selected && <div className="fees-toast"><Tag size={24} fill="#ff385c" stroke="#ff385c"/><span>Prices include all fees</span></div>}
    <footer className="site-footer"><span>© 2026 Airbnb design study</span><span>·</span><Button onClick={() => openModal('About this study')}>About this study</Button><span>·</span><Button onClick={() => openModal('Help Center')}>Support</Button><a href="https://mobbin.com/screens/f08bfe78-f88c-445b-8969-a0f9b08942f5" target="_blank" rel="noreferrer">Mobbin reference ↗</a></footer>
    {toast && <div className="feedback-toast" role="status">{toast}</div>}

    <Dialog open={modal !== null} onOpenChange={(open) => { if (!open) setModal(null); }}>
      <DialogContent className="modal-content"><div className="modal-heading"><DialogClose className="modal-close" aria-label="Close dialog"><X size={19}/></DialogClose><DialogTitle>{modal}</DialogTitle></div><div className="modal-body">
      {modal === 'Log in or sign up' ? loginComplete ? <div className="login-success"><span><Check size={32}/></span><h2>You’re all set</h2><DialogDescription>You can explore and save homes in this local study. No account was created.</DialogDescription><DialogClose className="dark-button">Continue exploring</DialogClose></div> : <><h2>Welcome to Airbnb</h2><form onSubmit={(event) => { event.preventDefault(); setLoginComplete(true); }}><div className="login-fields">{loginMethod === 'phone' && <label><span>Country code</span><select aria-label="Country code"><option>United States (+1)</option><option>United Kingdom (+44)</option><option>Germany (+49)</option><option>France (+33)</option></select></label>}<input type={loginMethod === 'phone' ? 'tel' : 'email'} aria-label={loginMethod === 'phone' ? 'Phone number' : 'Email address'} placeholder={loginMethod === 'phone' ? 'Phone number' : 'Email address'} required/></div><p className="privacy-copy">{loginMethod === 'phone' ? 'We’ll call or text you to confirm your number. Standard message and data rates apply.' : 'We’ll send an email to confirm your address.'} <button type="button" onClick={() => setToast('This local study does not send or store contact details.')}>Privacy Policy</button></p><Button className="pink-button" type="submit">Continue</Button></form><div className="or-divider"><span>or</span></div><Button className="social-button" onClick={() => setLoginComplete(true)}><span className="google-g">G</span>Continue with Google</Button><Button className="social-button" onClick={() => setLoginComplete(true)}><span className="apple-mark">●</span>Continue with Apple</Button><Button className="social-button" onClick={() => setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone')}><Mail size={21}/>Continue with {loginMethod === 'phone' ? 'email' : 'phone'}</Button><Button className="social-button" onClick={() => setLoginComplete(true)}><span className="facebook-f">f</span>Continue with Facebook</Button></>
      : modal === 'Language and currency' ? <><h2>Choose your preferences</h2><label className="preference-label">Language<select onChange={(event) => setToast(`${event.target.value} selected for this visit`)}><option>English (United States)</option><option>English (United Kingdom)</option></select></label><label className="preference-label">Currency<select onChange={(event) => setToast(`${event.target.value} selected; reference prices stay in USD`)}><option>USD — United States dollar</option><option>EUR — Euro</option><option>GBP — Pound sterling</option></select></label><DialogClose className="dark-button">Done</DialogClose></>
      : modal === 'Experiences' || modal === 'Services' ? <><img className="category-illustration" src={`/airbnb/images/${modal.toLowerCase()}.png`} alt=""/><h2>{modal === 'Experiences' ? 'Discover something new' : 'A little something extra'}</h2><DialogDescription>{modal === 'Experiences' ? 'Explore a city through food, art, and the people who know it best.' : 'Make your stay special with a chef, a photographer, or a wellness session.'}</DialogDescription><div className="category-options">{(modal === 'Experiences' ? ['Food & drink', 'Art & culture', 'Outdoors'] : ['Chefs', 'Photography', 'Wellness']).map((item) => <Button key={item} className="outline-button" onClick={() => { setModal(null); setToast(`${item} selected. The prototype focuses on stays.`); }}>{item}<ChevronRight size={18}/></Button>)}</div></>
      : modal === 'About this study' ? <><h2>A study of Airbnb’s interface</h2><DialogDescription>Recreated from Mobbin web references with Next.js and Vercel UI SDK. Search, wishlists, and selections work locally. Prices and property details are demonstration content. This is not Airbnb.</DialogDescription><a className="reference-link" href="https://mobbin.com/screens/f08bfe78-f88c-445b-8969-a0f9b08942f5" target="_blank" rel="noreferrer">Open the source on Mobbin ↗</a></>
      : <><h2>{modal === 'Help Center' ? 'How can we help?' : modal}</h2><DialogDescription>{modal === 'Help Center' ? 'Explore homes, save your favorites, or select a stay to see its details.' : modal === 'Gift cards' ? 'Give someone a new place to explore.' : 'Share your space and welcome guests from around the world.'}</DialogDescription><div className="help-options">{(modal === 'Help Center' ? ['Finding a place to stay', 'Managing your wishlist', 'Choosing dates and guests'] : ['Learn how it works', 'Get started']).map((item) => <Button key={item} className="outline-button" onClick={() => setToast(modal === 'Help Center' ? 'Use the search bar, heart buttons, and stay cards to explore.' : 'This option is a preview in the local design study.')}><span>{item}</span><ChevronRight size={18}/></Button>)}</div></>}
      </div></DialogContent>
    </Dialog>
  </div>;
}
