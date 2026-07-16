import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { saveFormSubmission } from '../lib/supabase';
import DragDrop from '../components/DragDrop';
import ComingSoonOverlay from '../components/ComingSoonOverlay';
import Logo from '../components/Logo';

// Style sheets for dealer page
import '../styles/reset.css';
import '../styles/dealer.css';

const TICKER_MESSAGES = [
  'Ranchi: 42 new SUV enquiries matching local dealers today',
  'Jamshedpur: Creta & Nexon EV buyer intent at all-time high',
  'Dhanbad: Average response time is under 1.5 hours',
  'List your inventory free · Pay only for accepted leads · Cancel anytime',
];

export default function DealerPage() {
  // Modal State
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonData, setComingSoonData] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Welcome Step Wizard States
  const [slide, setSlide] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState('');
  const [form, setForm] = useState({
    business: '',
    dealer_type: '',
    city: '',
    phone: ''
  });
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Why Partner Carousel State
  const [wcuIdx, setWcuIdx] = useState(0);
  const [wcuVisibleCount, setWcuVisibleCount] = useState(4);
  const wcuTrackRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchDxRef = useRef(0);

  // Parallax Hero Refs
  const heroRef = useRef(null);
  const slowRef = useRef([]);
  const midRef = useRef([]);
  const fastRef = useRef([]);
  const heroTextRef = useRef(null);
  const heroGraphicRef = useRef(null);

  // 3D Tilt Hover State for Hero Graphic Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Staggered Chart Bar Entry Animation State
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    setTilt({
      x: -(dy / yc) * 12,
      y: (dx / xc) * 12
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Auto-open welcome popup after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomeOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Rotate live ticker every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIdx(i => (i + 1) % TICKER_MESSAGES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // Intersection Observer for scroll reveals (.r)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    const revealElements = document.querySelectorAll('.r');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle Resize for Carousel Visible Counts
  useEffect(() => {
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      if (w >= 900) setWcuVisibleCount(4);
      else if (w >= 540) setWcuVisibleCount(2);
      else setWcuVisibleCount(1);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Parallax Scrolling Listener
  useEffect(() => {
    let ticking = false;

    const applyParallax = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heroH = hero.offsetHeight;
      const heroTop = hero.getBoundingClientRect().top;
      const viewportH = window.innerHeight;

      // Reset transforms when the hero is fully out of view.
      if (heroTop > viewportH || heroTop + heroH < 0) {
        slowRef.current.forEach(el => { if (el) el.style.transform = ''; });
        midRef.current.forEach(el => { if (el) el.style.transform = ''; });
        fastRef.current.forEach(el => { if (el) el.style.transform = ''; });
        if (heroTextRef.current) heroTextRef.current.style.transform = '';
        if (heroGraphicRef.current) heroGraphicRef.current.style.transform = '';
        ticking = false;
        return;
      }

      const visibleProgress = Math.min(1, Math.max(0, (viewportH - heroTop) / (viewportH + heroH)));
      const sy = Math.max(0, Math.min(viewportH - heroTop, heroH));

      slowRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.12}px)`; });
      midRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.22}px)`; });
      fastRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.35}px)`; });
      if (heroTextRef.current) heroTextRef.current.style.transform = `translateY(${sy * 0.18}px)`;
      if (heroGraphicRef.current) {
        const scale = 1 - visibleProgress * 0.045;
        heroGraphicRef.current.style.transform = `translate3d(0, ${sy * 0.2}px, 0) scale(${scale})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    applyParallax();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle slide step 1 segment pick
  const handleSelectSegment = (segmentVal) => {
    setSelectedSegment(segmentVal);
    setTimeout(() => {
      setSlide(1);
    }, 220);
  };

  // Enforce numeric only phone number inputs
  const handlePhoneInputChange = (val) => {
    const clean = val.replace(/\D/g, '');
    setForm(prev => ({ ...prev, phone: clean }));
    setPhoneError(false);
  };

  // Submit dealer registration
  const handleDealerSubmit = async (e) => {
    e.preventDefault();
    const { business, dealer_type, city, phone } = form;

    if (!business || !dealer_type || !city) {
      alert('Please fill in all details.');
      return;
    }
    if (phone.length !== 10) {
      setPhoneError(true);
      return;
    }

    setSubmitting(true);

    const payload = {
      dealership_name: business,
      dealership_type: dealer_type,
      city: city,
      phone: phone,
      segment: selectedSegment
    };

    try {
      await saveFormSubmission('dealer_registrations', payload, uploadedFiles);
    } catch (err) {
      console.error('Supabase submission error:', err);
      alert(`We could not save your registration. Please try again. (${err.message || 'Unknown error'})`);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setIsWelcomeOpen(false);
    setComingSoonData(payload);
    setIsComingSoonOpen(true);
  };

  // Reset popup state on close
  const handleCloseWelcome = () => {
    setIsWelcomeOpen(false);
    setSlide(0);
    setSelectedSegment('');
  };

  // Carousel calculations
  const totalCards = 5;
  const maxWcuIdx = Math.max(0, totalCards - wcuVisibleCount);
  const getWcuCardStep = () => {
    if (!wcuTrackRef.current || !wcuTrackRef.current.children[0]) return 0;
    const card = wcuTrackRef.current.children[0];
    const style = getComputedStyle(wcuTrackRef.current);
    const gap = parseFloat(style.gap) || 14;
    return card.getBoundingClientRect().width + gap;
  };

  const handleWcuGoTo = (n) => {
    const nextIdx = Math.max(0, Math.min(n, maxWcuIdx));
    setWcuIdx(nextIdx);
    if (wcuTrackRef.current) {
      wcuTrackRef.current.style.transform = `translateX(${-nextIdx * getWcuCardStep()}px)`;
    }
  };

  const handleWcuTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDxRef.current = 0;
    if (wcuTrackRef.current) {
      wcuTrackRef.current.style.transition = 'none';
    }
  };

  const handleWcuTouchMove = (e) => {
    touchDxRef.current = e.touches[0].clientX - touchStartXRef.current;
    if (wcuTrackRef.current) {
      wcuTrackRef.current.style.transform = `translateX(${-wcuIdx * getWcuCardStep() + touchDxRef.current}px)`;
    }
  };

  const handleWcuTouchEnd = () => {
    if (wcuTrackRef.current) {
      wcuTrackRef.current.style.transition = '';
    }
    const dx = touchDxRef.current;
    if (dx < -50) handleWcuGoTo(wcuIdx + 1);
    else if (dx > 50) handleWcuGoTo(wcuIdx - 1);
    else handleWcuGoTo(wcuIdx);
  };

  const handleAnchorLink = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dealer-portal-wrapper">
      
      {/* Welcome registration wizard overlay */}
      {isWelcomeOpen && (
        <div className="welcome-float open" onClick={(e) => { if (e.target === e.currentTarget) handleCloseWelcome(); }}>
          <div className="welcome-float-card">
            <div className="wf-topbar"></div>
            <div className="wf-header">
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                <Logo height={34} mode="light" />
              </Link>
              <button className="wf-close" onClick={handleCloseWelcome} aria-label="Close">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="wf-title-area">
              <div className="wf-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" />
                </svg>
                Become a Dealer
              </div>
              <div className="wf-subtitle">Get matched with verified buyers searching in your city.</div>
            </div>
            <div className="wf-divider"></div>

            <div className="wf-body">
              <div className="wf-slides-wrap">
                <div className="wf-slides" style={{ transform: `translateX(-${slide * 100}%)`, transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  
                  {/* SLIDE 1: Segment pick */}
                  <div className="wf-slide">
                    <div className="wf-pick-label">What do you primarily deal in?</div>
                    <div className="wf-cards">
                      
                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectSegment('Car')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectSegment('Car'); }}>
                        <div className="wf-card-img">
                          <img src="https://stimg2.cardekho.com/images/carNewsEditorImages/930x620/20220524_171353/29119/citroen0.jpg" alt="Car" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">Cars</div>
                          <div className="wf-card-desc">Hatchback · Sedan · SUV · Electric</div>
                        </div>
                        <div className="wf-card-arr">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectSegment('Bike / Scooter')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectSegment('Bike / Scooter'); }}>
                        <div className="wf-card-img">
                          <img src="https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/harleydavidson-x440-vivid1748859639431.jpg?q=80" alt="Bike" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">Bikes / Scooters</div>
                          <div className="wf-card-desc">Motorcycle · Scooter · Electric</div>
                        </div>
                        <div className="wf-card-arr">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectSegment('Truck / Commercial')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectSegment('Truck / Commercial'); }}>
                        <div className="wf-card-img">
                          <img src="https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/LPT-1009G_0.jpg?VersionId=.YV074BZ4D_qiab0v_KhKaAuW3F3ZHCm" alt="Truck" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">Trucks / Commercial</div>
                          <div className="wf-card-desc">Light · Medium · Heavy Commercial</div>
                        </div>
                        <div className="wf-card-arr">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SLIDE 2: Dealer Form */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={() => setSlide(0)}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>Back
                    </button>
                    <div className="wf-cat-chip">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{selectedSegment}s</span>
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Tell us about your dealership</div>
                    <form onSubmit={handleDealerSubmit} noValidate>
                      <div className="field">
                        <label htmlFor="dBiz">Dealership / Business Name</label>
                        <input id="dBiz" type="text" placeholder="e.g. Sharma Motors" value={form.business} onChange={(e) => setForm(prev => ({ ...prev, business: e.target.value }))} required />
                      </div>
                      <div className="field-row">
                        <div className="field">
                          <label htmlFor="dType">Dealership Type</label>
                          <select id="dType" value={form.dealer_type} onChange={(e) => setForm(prev => ({ ...prev, dealer_type: e.target.value }))} required>
                            <option value="" disabled>Select</option>
                            <option>Authorized Showroom</option>
                            <option>Multi-Brand Dealer</option>
                            <option>Used Vehicle Dealer</option>
                            <option>Sales + Service</option>
                          </select>
                        </div>
                        <div className="field">
                          <label htmlFor="dCity">City</label>
                          <select id="dCity" value={form.city} onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))} required>
                            <option value="" disabled>Select city</option>
                            <option>Ranchi</option><option>Dhanbad</option><option>Jamshedpur</option>
                            <option>Bokaro</option><option>Hazaribagh</option><option>Deoghar</option>
                            <option>Giridih</option><option>Ramgarh</option><option>Dumka</option>
                            <option>Chatra</option><option>Palamu</option><option>Gumla</option>
                            <option>Lohardaga</option><option>Simdega</option><option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="dPhone">Mobile Number</label>
                        <div className="phone-row">
                          <div className="ph-pre">+91</div>
                          <input id="dPhone" type="tel" inputMode="numeric" placeholder="98765 43210" maxLength={10} value={form.phone} onChange={(e) => handlePhoneInputChange(e.target.value)} required />
                        </div>
                        {phoneError && <div className="field-error" style={{ display: 'block', color: '#e74c3c', fontSize: '11px', marginTop: '5px' }}>Please enter a valid 10-digit number.</div>}
                      </div>

                      <DragDrop id="ddDealer" label="Dealer License / GST Certificate (Optional)" onFilesChange={setUploadedFiles} />

                      <button type="submit" className="btn-sub" style={{ marginTop: '16px' }} disabled={submitting}>
                        {submitting ? 'Submitting…' : 'Register as Dealer →'}
                      </button>
                    </form>
                    <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', marginTop: '8px' }}>Verified within 24 hours · No setup cost · Cancel anytime</p>
                  </div>

                </div>
              </div>
              <div className="wf-dots">
                <div className={`wf-dot ${slide === 0 ? 'active' : ''}`}></div>
                <div className={`wf-dot ${slide === 1 ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Slip overlay */}
      <ComingSoonOverlay isOpen={isComingSoonOpen} data={comingSoonData} prefix="BW-D" onClose={() => { setIsComingSoonOpen(false); setComingSoonData(null); }} />

      {/* Floating trigger */}
      <button className={`wf-trigger ${!isWelcomeOpen ? 'show' : ''}`} onClick={() => setIsWelcomeOpen(true)}>
        <div className="wf-trigger-dot"></div>
        Become a Dealer
      </button>

      {/* NAVBAR — Floating Pill */}
      <header className="bw-nav-header">
        <nav className="bw-nav-pill">
          {/* Logo */}
          <Link to="/" className="bw-nav-logo-link" style={{ textDecoration: 'none' }}>
            <span className="bw-nav-logo-circle">
              <img
                src="https://i.pinimg.com/736x/7c/18/e2/7c18e2091b090da645c0149aebee1f22.jpg"
                alt="BuyWheels"
              />
            </span>
            <span className="bw-nav-logo-text">Buy<span>Wheels</span></span>
          </Link>

          {/* Nav links (hidden on mobile) */}
          <ul className="bw-nav-links">
            <li><a href="#how" onClick={(e) => handleAnchorLink(e, 'how')}>How it Works</a></li>
            <li><a href="#segments" onClick={(e) => handleAnchorLink(e, 'segments')}>Vehicle Segments</a></li>
            <li><a href="#why" onClick={(e) => handleAnchorLink(e, 'why')}>Why Partner</a></li>
            <li><Link to="/" style={{ display: 'block', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'background 0.15s' }}>For Buyers</Link></li>
            <li><Link to="/agent" className="bw-link-accent" style={{ display: 'block', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none', transition: 'background 0.15s' }}>Agent</Link></li>
          </ul>

          {/* CTA */}
          <button className="btn-nav-pill" onClick={() => setIsWelcomeOpen(true)}>
            Become a Dealer
          </button>
        </nav>
      </header>

      {/* HERO SECTION — Premium Light Bloom */}
      <section className="hero-premium" id="heroSection" ref={heroRef}>

        {/* Bloom animated background */}
        <div className="hero-bloom-bg" aria-hidden="true">
          <div className="hero-bloom-mesh" />
          <div className="hero-blob hero-blob-a" />
          <div className="hero-blob hero-blob-b" />
          <div className="hero-blob hero-blob-c" />
          <div className="hero-blob hero-blob-d" />
          <div className="hero-blob hero-blob-e" />
        </div>

        {/* Main content */}
        <div className="hero-premium-in">
          
          <div className="hero-premium-content">
            {/* Live Ticker Pill */}
            <div className="hero-ticker-pill" role="status" aria-live="polite">
              {/* Trending up icon */}
              <span className="hero-ticker-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
              </span>
              <span className="hero-ticker-sep" />
              <span className="hero-ticker-text">{TICKER_MESSAGES[tickerIdx]}</span>
              <span className="hero-ticker-sep" />
              <span className="hero-ticker-live">
                <span className="hero-ticker-dot" />
                LIVE
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-premium-h1">
              Sell More.
              <span className="h1-line2">
                Stress Less.
                {/* Floating stamps capsule badge */}
                <span className="hero-stamps-badge" aria-hidden="true">
                  {/* Stamp 1: Store/Showroom building icon */}
                  <span className="hero-stamp hero-stamp-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </span>
                  {/* Stamp 2: Shield-check icon */}
                  <span className="hero-stamp hero-stamp-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 11 11 13 15 9" />
                    </svg>
                  </span>
                  {/* Stamp 3: Chat / leads bubble icon */}
                  <span className="hero-stamp hero-stamp-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            {/* Sub paragraph */}
            <p className="hero-premium-sub">
              Get matched with serious, ready-to-buy customers searching in your city — and pay only for the leads you choose to accept.
            </p>

            {/* CTAs */}
            <div className="hero-premium-btns">
              <button
                className="hero-premium-btn-primary"
                onClick={() => setIsWelcomeOpen(true)}
              >
                Become a Dealer Now
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button
                className="hero-premium-btn-secondary"
                onClick={(e) => handleAnchorLink(e, 'how')}
              >
                How It Works
              </button>
            </div>
          </div>

          <div className="hero-premium-visual">
            <div className="hero-graphic" ref={heroGraphicRef}>
              <div
                className="hero-graphic-inner"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: '1000px', width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <div
                  className="hg-card"
                  style={{
                    transform: isHovered
                      ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
                      : 'rotateX(0deg) rotateY(0deg) scale(1)',
                    transition: isHovered ? 'none' : 'transform 0.5s ease',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="hg-float-badge">Live Leads</div>
                  <div className="hg-row-top">
                    <div className="hg-label">This Month</div>
                    <div className="hg-pill"><div className="hg-pill-dot"></div>+38%</div>
                  </div>
                  <div className="hg-num">128<span>.</span></div>
                  <div className="hg-sub">Qualified buyer enquiries received</div>
                  <div className="hg-bars">
                    <div className="hg-bar" style={{ height: animateChart ? '30%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}></div>
                    <div className="hg-bar" style={{ height: animateChart ? '45%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}></div>
                    <div className="hg-bar" style={{ height: animateChart ? '38%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}></div>
                    <div className="hg-bar on" style={{ height: animateChart ? '62%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}></div>
                    <div className="hg-bar" style={{ height: animateChart ? '50%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s' }}></div>
                    <div className="hg-bar on" style={{ height: animateChart ? '78%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s' }}></div>
                    <div className="hg-bar on" style={{ height: animateChart ? '95%' : '0%', transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s' }}></div>
                  </div>
                  <div className="hg-foot">
                    <div className="hg-ava">RK</div>
                    <div className="hg-foot-txt"><b>Ranchi Motors</b> just received a new lead — Hyundai Creta, ₹15–25L</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Corner stats chip */}
        <div className="hero-corner-chip" aria-label="BuyWheels dealer stats">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
          </svg>
          <span className="hero-corner-chip-text">Zero Listing Fees · Pay Per Lead</span>
        </div>

      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="m-item">Zero Listing Fees<span className="m-dot"></span></span>
          <span className="m-item">Verified Buyer Intent<span className="m-dot"></span></span>
          <span className="m-item">Pay Per Lead<span className="m-dot"></span></span>
          <span className="m-item">Reach Buyers Citywide<span className="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · Trucks<span className="m-dot"></span></span>
          <span className="m-item">Real-Time Lead Alerts<span class="m-dot"></span></span>
          <span className="m-item">Zero Listing Fees<span class="m-dot"></span></span>
          <span className="m-item">Verified Buyer Intent<span class="m-dot"></span></span>
          <span className="m-item">Pay Per Lead<span class="m-dot"></span></span>
          <span className="m-item">Reach Buyers Citywide<span class="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · Trucks<span class="m-dot"></span></span>
          <span className="m-item">Real-Time Lead Alerts<span class="m-dot"></span></span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat r"><div className="stat-val">10<b>K+</b></div><div className="stat-lbl">Monthly Buyer Searches</div></div>
        <div className="stat r r1"><div className="stat-val">2<b>hr</b></div><div className="stat-lbl">Avg. Lead Freshness</div></div>
        <div className="stat r r2"><div className="stat-val"><b>₹</b>0</div><div className="stat-lbl">Setup Cost</div></div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-in">
          <div className="tag r">Process</div>
          <h2 className="sec-h r">How It <em>Works</em></h2>
          <p className="sec-p r">Three steps between your showroom and your next buyer.</p>
          <div className="steps">
            <div className="step r">
              <div className="step-n">01</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" /></svg></div>
              <div className="step-t">Register Your Dealership</div>
              <div className="step-d">Tell us what you sell, where, and your dealership type. Verification takes under 24 hours.</div>
            </div>
            <div className="step r r1">
              <div className="step-n">02</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
              <div className="step-t">Receive Matched Leads</div>
              <div className="step-d">Buyer enquiries that match your stock, city, and budget land directly in your inbox — nothing irrelevant.</div>
            </div>
            <div className="step r r2">
              <div className="step-n">03</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
              <div className="step-t">Close More Deals</div>
              <div className="step-d">Respond fast, quote your price, and convert serious enquiries into showroom visits and sales.</div>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE SEGMENTS */}
      <section className="section cats-sec" id="segments">
        <div className="section-in">
          <div className="tag r" style={{ color: 'rgba(255,255,255,.4)' }}><span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'rgba(255,255,255,.2)' }}></span>List With Us</div>
          <h2 className="sec-h r" style={{ color: '#fff' }}>List Across Every <em>Segment</em></h2>
          <p className="sec-p r" style={{ color: 'rgba(255,255,255,.4)' }}>One dealer account, every vehicle category buyers are searching for.</p>
          <div className="cats-grid">
            <div className="cat r" onClick={() => setIsWelcomeOpen(true)}>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M22.0963 8.35858C39.4674 -3.61904 63.3093 -2.25997 79.1672 11.6033C95.0251 25.4665 99.1691 48.0691 89.0768 65.6534C78.9845 83.2378 57.2144 91.5645 37.0396 85.5414C16.8647 79.5183 3.65586 59.9882 4.72517 38.895C5.79447 17.8018 20.3164 12.352 22.0963 8.35858Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M16 16L27 16C31 16 34 18 36 21L38 24H12L16 16Z" fill="currentColor" fillOpacity="0.15" /><path d="M6 32L4 27C3 24 4 22 7 21L15 21L21 14C23 12 25 11 28 11H35C39 11 42 13 44 17L46 22C47 25 47 27 45 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 21H38" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><circle cx="14" cy="32" r="6" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="36" cy="32" r="6" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="14" cy="32" r="2" fill="var(--orange)" /><circle cx="36" cy="32" r="2" fill="var(--orange)" /></svg>
              </div>
              <div className="cat-t">Cars</div>
              <div className="cat-s">Hatchback · Sedan · SUV</div>
              <div className="cat-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
            </div>
            <div className="cat r r1" onClick={() => setIsWelcomeOpen(true)}>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M85.4981 29.8057C95.5342 46.068 91.1353 68.0427 75.1437 80.4074C59.1522 92.772 36.31 91.3117 21.9056 76.8433C7.50119 62.3749 5.56846 39.5393 17.1864 23.1118C28.8043 6.68427 50.8179 1.13458 67.9351 10.3702C83.3986 18.7136 75.462 13.5434 85.4981 29.8057Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M28 20L36 20L31 29H18L28 20Z" fill="currentColor" fillOpacity="0.15" /><circle cx="12" cy="34" r="7" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="36" cy="34" r="7" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="12" cy="34" r="2" fill="var(--orange)" /><circle cx="36" cy="34" r="2" fill="var(--orange)" /><path d="M12 34L22 20H32L36 34" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M22 20L18 29H31" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </div>
              <div className="cat-t">Bikes</div>
              <div className="cat-s">Motorcycle · Scooter</div>
              <div className="cat-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
            </div>
            <div className="cat r r2" onClick={() => setIsWelcomeOpen(true)}>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M13.2504 70.8354C1.90962 54.06 6.3813 30.6558 23.3644 16.9205C40.3475 3.18526 64.912 3.12061 80.9997 16.7628C97.0874 30.4049 98.6659 54.5492 84.4447 70.2801C70.2235 86.011 44.9745 88.0065 29.6105 74.9221C26.1738 71.9942 24.5912 87.6108 13.2504 70.8354Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M4 16H22V26H4V16Z" fill="currentColor" fill-opacity="0.15" /><path d="M4 29V14C4 12.9 4.9 12 6 12H24V28" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M24 18H35C38 18 40 19 42 22L44 29V33C44 34.1 43.1 35 42 35H38" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M19 35H29" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><circle cx="14" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="34" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="14" cy="35" r="2" fill="var(--orange)" /><circle cx="34" cy="35" r="2" fill="var(--orange)" /></svg>
              </div>
              <div className="cat-t">Trucks</div>
              <div className="cat-s">Light · Heavy Commercial</div>
              <div className="cat-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
            </div>
            <div className="cat r r3" onClick={() => setIsWelcomeOpen(true)}>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M78.647 8.35858C96.0181 12.0232 107.13 29.6245 104.915 47.3821C102.7 65.1396 87.7554 78.4323 69.8327 79.5183C51.9099 80.6043 35.5398 69.2133 29.611 51.7828C23.6823 34.3523 30.6695 15.228 46.5413 6.46746C56.6343 0.887648 49.3789 2.1802 78.647 8.35858Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M8 14H40V24H8V14Z" fill="currentColor" fill-opacity="0.15" /><path d="M6 31V12C6 9.8 7.8 8 10 8H38C41.3 8 44 10.7 44 14V31C44 33.2 42.2 35 40 35H38" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 35H9" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><path d="M19 35H29" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><path d="M6 24H44" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><circle cx="14" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="34" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="14" cy="35" r="2" fill="var(--orange)" /><circle cx="34" cy="35" r="2" fill="var(--orange)" /></svg>
              </div>
              <div className="cat-t">Bus / Van</div>
              <div className="cat-s">Mini · Passenger · Tempo</div>
              <div className="cat-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section" style={{ background: 'var(--dark2)', textAlign: 'center' }}>
        <div className="section-in">
          <div className="tag r" style={{ color: 'rgba(255,255,255,.4)', justifyContent: 'center' }}><span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'rgba(255,255,255,.2)' }}></span>Partnership</div>
          <h2 className="sec-h r" style={{ color: '#fff', textAlign: 'center' }}>We Match You With<br />Buyers <em>Who Are Ready</em></h2>
          <p className="sec-p r" style={{ color: 'rgba(255,255,255,.4)', margin: '16px auto 36px', textAlign: 'center', maxWidth: '440px' }}>Every lead comes from a real buyer enquiry — budget, city, and vehicle type already qualified, before it ever reaches you.</p>
          <button className="btn-fill r r1" style={{ fontSize: '15px', padding: '16px 44px' }} onClick={() => setIsWelcomeOpen(true)}>Become a Partner Dealer →</button>
          <p style={{ marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,.2)', fontWeight: '300' }} className="r r2">Free to list · Pay only for accepted leads · Cancel anytime</p>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="wcu-sec" id="why">
        <div className="wcu-inner">
          <div className="wcu-top">
            <div className="wcu-top-left">
              <div className="wcu-eyebrow r">Why Partner</div>
              <h2 className="wcu-h r r1">Grow Your Dealership —<br /><em>Free, Fast</em> &amp; Verified</h2>
            </div>
            <div className="wcu-nav-btns">
              <button className="wcu-nav-btn" onClick={() => handleWcuGoTo(wcuIdx - 1)} disabled={wcuIdx <= 0} aria-label="Previous slide">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button className="wcu-nav-btn" onClick={() => handleWcuGoTo(wcuIdx + 1)} disabled={wcuIdx >= maxWcuIdx} aria-label="Next slide">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>

          <div className="wcu-viewport">
            <div
              className="wcu-track"
              ref={wcuTrackRef}
              onTouchStart={handleWcuTouchStart}
              onTouchMove={handleWcuTouchMove}
              onTouchEnd={handleWcuTouchEnd}
              style={{ display: 'flex', gap: '14px', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              
              <div className="wcu-card r">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="16" cy="16" r="12" />
                    <line x1="16" y1="8" x2="16" y2="10" />
                    <line x1="16" y1="22" x2="16" y2="24" />
                    <path d="M12 12.5a4 4 0 0 1 8 0c0 2.5-4 4-4 6" />
                    <circle cx="16" cy="20.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="wcu-card-t">Zero Listing Fees</div>
                <div className="wcu-card-d">List your full inventory at no cost. We only charge for the leads you choose to accept — never a flat subscription.</div>
                <div className="wcu-card-num">01</div>
              </div>

              <div className="wcu-card r r1">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 3L5 7.5v8C5 22 10 27.5 16 29c6-1.5 11-7 11-13.5v-8L16 3z" />
                    <polyline points="11 16 14.5 19.5 21 13" />
                  </svg>
                </div>
                <div className="wcu-card-t">Verified Buyer Intent</div>
                <div className="wcu-card-d">Every lead comes from a real enquiry, with budget, city, and vehicle type already qualified before it reaches you.</div>
                <div className="wcu-card-num">02</div>
              </div>

              <div className="wcu-card r r2">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="16" cy="16" r="12" />
                    <polyline points="16 9 16 16 21 19" />
                    <path d="M24 6l2-2M8 6L6 4" strokeWidth="1.4" />
                  </svg>
                </div>
                <div className="wcu-card-t">Real-Time Lead Alerts</div>
                <div className="wcu-card-d">New leads land in your inbox the moment a buyer submits a request — respond first and win the sale.</div>
                <div className="wcu-card-num">03</div>
              </div>

              <div className="wcu-card r r3">
                <div className="wcu-card-ico">
                  <svg width="28" height="26" viewBox="0 0 34 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 18v2h3v-1h16v1h3v-2" />
                    <path d="M3 18l2-6h22l2 6H3z" />
                    <path d="M8 12l2.5-5h11L24 12" />
                    <circle cx="9" cy="18.5" r="2.5" fill="currentColor" stroke="none" opacity=".15" />
                    <circle cx="9" cy="18.5" r="1.5" />
                    <circle cx="23" cy="18.5" r="2.5" fill="currentColor" stroke="none" opacity=".15" />
                    <circle cx="23" cy="18.5" r="1.5" />
                    <line x1="12" y1="15" x2="20" y2="15" />
                    <circle cx="29" cy="8" r="3.5" />
                    <circle cx="21" cy="8" r="3.5" />
                    <path d="M21 8l3-5 5 5" />
                  </svg>
                </div>
                <div className="wcu-card-t">Every Vehicle Segment</div>
                <div className="wcu-card-d">Cars, bikes, trucks, buses — list your full range across every category from one dealer account.</div>
                <div className="wcu-card-num">04</div>
              </div>

              <div className="wcu-card r r4">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18.9 19.5 19.5 0 0 1 5.07 12 19.8 19.8 0 0 1 1.99 3.38 2 2 0 0 1 3.96 1h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11l-.9.9a16 16 0 0 0 6.59 6.59l.9-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="translate(5,3)" />
                  </svg>
                </div>
                <div className="wcu-card-t">Dedicated Support</div>
                <div className="wcu-card-d">A dedicated partnerships manager helps you respond faster, manage leads, and close more deals.</div>
                <div className="wcu-card-num">05</div>
              </div>

            </div>
          </div>

          <div className="wcu-dots">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`wcu-dot ${wcuIdx === i ? 'on' : ''}`} onClick={() => handleWcuGoTo(i)} style={{ cursor: 'pointer' }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section faq-sec" id="faq">
        <div className="section-in">
          <div className="faq-grid">
            <div className="faq-info">
              <div className="tag r">FAQs</div>
              <h2 className="sec-h r r1">Frequently Asked<br /><em>Questions</em></h2>
              <p className="sec-p r r2">
                Everything you need to know about partnering with BuyWheels. Can't find the answer you're looking for? Reach out to our partner support team.
              </p>
            </div>
            <div className="faq-list r r3">
              {[
                { q: "How do dealer listing fees work?", a: "There are no subscription or listing fees. You only pay for qualified leads you accept." },
                { q: "How are leads matched to my showroom?", a: "Leads are matched in real-time based on your target city, vehicle segment, and brand." },
                { q: "What is the verification process?", a: "Upload your dealership license/GST info. Vetting takes less than 24 hours." },
                { q: "Can I pause receiving leads?", a: "Yes, you can pause or resume lead matching instantly from your dashboard." }
              ].map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <div className="faq-q-row">
                      <h3 className="faq-question">{item.q}</h3>
                      <svg 
                        className={`faq-arrow-ico ${isOpen ? 'rotate-180' : ''}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                    <div className={`faq-answer-wrap ${isOpen ? 'open' : ''}`}>
                      <div className="faq-answer">{item.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="final-in">
          <h2 className="r">Ready to Grow<br />Your Dealership?</h2>
          <p className="r r1">Join 500+ dealers already receiving qualified buyer leads every day.</p>
          <button className="btn-dark r r2" onClick={() => setIsWelcomeOpen(true)}>Become a Partner Dealer</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-in foot-in--rich">
          <div className="foot-logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Logo height={48} mode="dark" />
          </div>
          <div className="foot-links">
            <Link to="/">For Buyers</Link>
            <Link to="/agent">Become an Agent</Link>
            <a href="#">Dealer Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="foot-social">
            <div className="foot-social-label">Follow Us</div>
            <div className="foot-social-icons">
              <a href="https://www.instagram.com/cars.buywheels?igsh=Y2R3MXFuMWRobW03" target="_blank" rel="noopener noreferrer" className="foot-social-btn" aria-label="Instagram – BuyWheels Cars">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Cars</span>
              </a>
              <a href="https://www.instagram.com/bikes.buywheels?igsh=ZmhuZDIycnR1anJ6" target="_blank" rel="noopener noreferrer" className="foot-social-btn" aria-label="Instagram – BuyWheels Bikes">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Bikes</span>
              </a>
              <a href="https://youtube.com/@cars.buywheels?si=e8q4eaP_z8bUj915" target="_blank" rel="noopener noreferrer" className="foot-social-btn foot-social-btn--yt" aria-label="YouTube – BuyWheels Cars">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                <span>Cars</span>
              </a>
              <a href="https://youtube.com/@bikes.buywheels?si=SHUVnZ7v__I5hdCV" target="_blank" rel="noopener noreferrer" className="foot-social-btn foot-social-btn--yt" aria-label="YouTube – BuyWheels Bikes">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                <span>Bikes</span>
              </a>
            </div>
          </div>
          <div className="foot-copy">© 2025 BuyWheels. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
