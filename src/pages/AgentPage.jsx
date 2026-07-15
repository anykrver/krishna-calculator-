import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { saveFormSubmission } from '../lib/supabase';
import DragDrop from '../components/DragDrop';
import ComingSoonOverlay from '../components/ComingSoonOverlay';
import Logo from '../components/Logo';

// Style sheets for agent page
import '../styles/reset.css';
import '../styles/agent.css';

const STEP_META = [
  { pill: 'Step 1 of 3', title: 'Become an Agent', sub: 'Help buyers find their dream vehicle — earn commission on every deal.' },
  { pill: 'Step 2 of 3', title: 'Your Details', sub: 'Tell us about yourself so we can set up your agent profile.' },
  { pill: 'Step 3 of 3', title: 'Almost Done', sub: 'Final details — optional but help us set you up faster.' }
];

export default function AgentPage() {
  // Modal State
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonData, setComingSoonData] = useState(null);

  // Welcome Step Wizard States
  const [slide, setSlide] = useState(0);
  const [selectedExp, setSelectedExp] = useState('');
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    segment: '',
    email: '',
    languages: '',
    referral_code: ''
  });
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Earnings Calculator State
  const [calcRefs, setCalcRefs] = useState(10);
  const [calcPrice, setCalcPrice] = useState(8); // in Lakhs
  const [calcConv, setCalcConv] = useState(30); // in %

  // Testimonials Carousel State
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
      const scrollY = window.scrollY;
      const hero = heroRef.current;
      if (!hero) return;

      const heroH = hero.offsetHeight;

      // Reset transforms when scrolled past
      if (scrollY > heroH + 120) {
        slowRef.current.forEach(el => { if (el) el.style.transform = ''; });
        midRef.current.forEach(el => { if (el) el.style.transform = ''; });
        fastRef.current.forEach(el => { if (el) el.style.transform = ''; });
        if (heroTextRef.current) heroTextRef.current.style.transform = '';
        if (heroGraphicRef.current) heroGraphicRef.current.style.transform = '';
        ticking = false;
        return;
      }

      const sy = Math.max(0, Math.min(scrollY, heroH));
      const progress = sy / heroH;

      slowRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.12}px)`; });
      midRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.22}px)`; });
      fastRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.35}px)`; });
      if (heroTextRef.current) heroTextRef.current.style.transform = `translateY(${sy * 0.18}px)`;
      if (heroGraphicRef.current) {
        const sc = 1 - progress * 0.06;
        heroGraphicRef.current.style.transform = `translateY(${sy * 0.28}px) scale(${sc})`;
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

  // Handle slide step 1 experience pick
  const handleSelectExp = (label) => {
    setSelectedExp(label);
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

  // Validate step 2 and go to step 3
  const handleGoToStep3 = () => {
    const { first_name, last_name, phone, city, segment } = form;
    if (!first_name || !last_name || !city || !segment) {
      alert('Please fill in all required fields.');
      return;
    }
    if (phone.length !== 10) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSlide(2);
  };

  // Submit agent registration
  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      experience: selectedExp
    };

    try {
      await saveFormSubmission('agent_registrations', payload, uploadedFiles);
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
    setSelectedExp('');
  };

  // Earnings calculations
  const calcData = useMemo(() => {
    const deals = Math.max(1, Math.round(calcRefs * calcConv / 100));
    const commRate = 0.01;
    const perDeal = Math.round(calcPrice * 100000 * commRate);
    const monthly = deals * perDeal;
    const annual = monthly * 12;
    const weekly = Math.round(monthly / 4);

    return { deals, perDeal, monthly, annual, weekly };
  }, [calcRefs, calcPrice, calcConv]);

  const fmtINR = (n) => {
    if (n >= 100000) return '₹' + Math.round(n / 1000) + 'K';
    if (n >= 1000) return '₹' + n.toLocaleString('en-IN');
    return '₹' + n;
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

  const currentStepMeta = STEP_META[slide] || STEP_META[0];

  return (
    <div className="agent-portal-wrapper">
      
      {/* Welcome multi-step wizard overlay */}
      {isWelcomeOpen && (
        <div className="welcome-float open" onClick={(e) => { if (e.target === e.currentTarget) handleCloseWelcome(); }}>
          <div className="welcome-float-card">
            <div className="wf-topbar"></div>
            <div className="wf-header">
              <div className="wf-logo-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Logo height={34} mode="light" showText={false} />
                <span className="wf-step-pill">{currentStepMeta.pill}</span>
              </div>
              <button className="wf-close" onClick={handleCloseWelcome} aria-label="Close">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="wf-title-area">
              <div className="wf-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                {currentStepMeta.title}
              </div>
              <div className="wf-subtitle">{currentStepMeta.sub}</div>
            </div>
            <div className="wf-divider"></div>

            <div className="wf-body">
              <div className="wf-slides-wrap">
                <div className="wf-slides" style={{ transform: `translateX(-${slide * 100}%)`, transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  
                  {/* SLIDE 1: Background pick */}
                  <div className="wf-slide">
                    <div className="wf-pick-label">What's your background?</div>
                    <div className="exp-cards">
                      
                      <div className={`exp-card ${selectedExp === 'New to Sales' ? 'selected' : ''}`} tabIndex={0} onClick={() => handleSelectExp('New to Sales')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectExp('New to Sales'); }}>
                        <div className="exp-ico">🌱</div>
                        <div className="exp-name">New to Sales</div>
                        <div className="exp-desc">No experience required — we train you</div>
                      </div>

                      <div className={`exp-card ${selectedExp === 'Sales Professional' ? 'selected' : ''}`} tabIndex={0} onClick={() => handleSelectExp('Sales Professional')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectExp('Sales Professional'); }}>
                        <div className="exp-ico">💼</div>
                        <div className="exp-name">Sales Professional</div>
                        <div className="exp-desc">Experience in B2C or retail sales</div>
                      </div>

                      <div className={`exp-card ${selectedExp === 'Auto Industry' ? 'selected' : ''}`} tabIndex={0} onClick={() => handleSelectExp('Auto Industry')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectExp('Auto Industry'); }}>
                        <div className="exp-ico">🚗</div>
                        <div className="exp-name">Auto Industry</div>
                        <div className="exp-desc">Worked at a showroom or dealership</div>
                      </div>

                      <div className={`exp-card ${selectedExp === 'Finance / Loans' ? 'selected' : ''}`} tabIndex={0} onClick={() => handleSelectExp('Finance / Loans')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectExp('Finance / Loans'); }}>
                        <div className="exp-ico">🏦</div>
                        <div className="exp-name">Finance / Loans</div>
                        <div className="exp-desc">Banking, NBFC or vehicle finance</div>
                      </div>

                    </div>
                    <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', marginTop: '12px' }}>Choose the closest match — you can update later</p>
                  </div>

                  {/* SLIDE 2: Personal Details */}
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
                      <span>{selectedExp}</span>
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Your personal details</div>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="aFname">First Name</label>
                        <input id="aFname" type="text" placeholder="Rahul" value={form.first_name} onChange={(e) => setForm(prev => ({ ...prev, first_name: e.target.value }))} required />
                      </div>
                      <div className="field">
                        <label htmlFor="aLname">Last Name</label>
                        <input id="aLname" type="text" placeholder="Sharma" value={form.last_name} onChange={(e) => setForm(prev => ({ ...prev, last_name: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="aPhone">Mobile Number</label>
                      <div className="phone-row">
                        <div className="ph-pre">+91</div>
                        <input id="aPhone" type="tel" inputMode="numeric" placeholder="98765 43210" maxLength={10} value={form.phone} onChange={(e) => handlePhoneInputChange(e.target.value)} required />
                      </div>
                      {phoneError && <div className="field-error" style={{ display: 'block' }}>Please enter a valid 10-digit number.</div>}
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="aCity">Your City</label>
                        <select id="aCity" value={form.city} onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))} required>
                          <option value="" disabled>Select city</option>
                          <option>Ranchi</option><option>Dhanbad</option><option>Jamshedpur</option>
                          <option>Bokaro</option><option>Hazaribagh</option><option>Deoghar</option>
                          <option>Giridih</option><option>Ramgarh</option><option>Dumka</option>
                          <option>Chatra</option><option>Palamu</option><option>Gumla</option>
                          <option>Lohardaga</option><option>Simdega</option><option>Other</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="aSegment">Vehicle Segment</label>
                        <select id="aSegment" value={form.segment} onChange={(e) => setForm(prev => ({ ...prev, segment: e.target.value }))} required>
                          <option value="" disabled>Select</option>
                          <option>Cars</option><option>Bikes / Scooters</option>
                          <option>Trucks / Commercial</option><option>All Segments</option>
                        </select>
                      </div>
                    </div>
                    <button type="button" className="btn-sub" onClick={handleGoToStep3}>Next →</button>
                    <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', marginTop: '8px' }}>Your details are kept private and secure</p>
                  </div>

                  {/* SLIDE 3: Additional details */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={() => setSlide(1)}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>Back
                    </button>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{selectedExp}</span>
                      </div>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{form.first_name} {form.last_name ? form.last_name[0] + '.' : ''}</span>
                      </div>
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Almost done — a few more details</div>
                    <div className="field">
                      <label htmlFor="aEmail">Email Address (optional)</label>
                      <input id="aEmail" type="email" placeholder="rahul@example.com" value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
                    </div>
                    <div className="field">
                      <label htmlFor="aLang">Languages You Speak</label>
                      <select id="aLang" value={form.languages} onChange={(e) => setForm(prev => ({ ...prev, languages: e.target.value }))}>
                        <option value="" disabled>Select</option>
                        <option>Hindi</option><option>English</option>
                        <option>Hindi + English</option><option>Hindi + English + Regional</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="aRefCode">Referral Code (optional)</label>
                      <input id="aRefCode" type="text" placeholder="e.g. BW-2025" value={form.referral_code} onChange={(e) => setForm(prev => ({ ...prev, referral_code: e.target.value }))} />
                    </div>
                    
                    <DragDrop id="ddAgent" label="ID Proof (optional)" onFilesChange={setUploadedFiles} />

                    <button type="submit" className="btn-sub" style={{ marginTop: '16px' }} onClick={handleAgentSubmit} disabled={submitting}>
                      {submitting ? 'Submitting…' : 'Register as Agent →'}
                    </button>
                    <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', marginTop: '8px' }}>Training kit sent within 24 hours · No target pressure</p>
                  </div>

                </div>
              </div>

              <div className="wf-dots">
                <div className={`wf-dot ${slide === 0 ? 'active' : ''}`}></div>
                <div className={`wf-dot ${slide === 1 ? 'active' : ''}`}></div>
                <div className={`wf-dot ${slide === 2 ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Slip overlay */}
      <ComingSoonOverlay isOpen={isComingSoonOpen} data={comingSoonData} prefix="BW-A" onClose={() => { setIsComingSoonOpen(false); setComingSoonData(null); }} />

      {/* Floating agent registration trigger */}
      <button className={`wf-trigger ${!isWelcomeOpen ? 'show' : ''}`} onClick={() => setIsWelcomeOpen(true)}>
        <div className="wf-trigger-dot"></div>
        Become an Agent
      </button>

      {/* NAVBAR */}
      <nav>
        <div className="nav-in">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <Logo height={42} mode="dark" />
            <span className="nav-badge">Agent</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/" style={{ color: 'rgba(255,255,255,.5)' }}>For Buyers</Link></li>
            <li><Link to="/dealer" style={{ color: 'rgba(255,255,255,.5)' }}>Become a Dealer</Link></li>
            <li><a href="#how" onClick={(e) => handleAnchorLink(e, 'how')}>How it Works</a></li>
            <li><a href="#commission" onClick={(e) => handleAnchorLink(e, 'commission')}>Earn</a></li>
            <li><a href="#calculator" onClick={(e) => handleAnchorLink(e, 'calculator')}>Calculator</a></li>
            <li><a href="#why" onClick={(e) => handleAnchorLink(e, 'why')}>Why Join</a></li>
          </ul>
          <button className="btn-nav" onClick={() => setIsWelcomeOpen(true)}>Become an Agent</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="heroSection" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true">
          <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="orbGrad" cx="65%" cy="50%" r="45%"><stop offset="0%" stopColor="#FF6A00" stopOpacity="0.18" /><stop offset="100%" stopColor="#FF6A00" stopOpacity="0" /></radialGradient>
              <radialGradient id="orbGrad2" cx="20%" cy="80%" r="35%"><stop offset="0%" stopColor="#FF6A00" stopOpacity="0.08" /><stop offset="100%" stopColor="#FF6A00" stopOpacity="0" /></radialGradient>
              <pattern id="heroGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,106,0,0.07)" strokeWidth="1" /></pattern>
            </defs>
            <g className="parallax-slow" ref={el => { if (el) slowRef.current[0] = el; }}>
              <rect width="1200" height="560" fill="url(#heroGrid)" />
              <line x1="-100" y1="500" x2="500" y2="-100" stroke="rgba(255,106,0,0.06)" strokeWidth="60" />
              <line x1="700" y1="660" x2="1300" y2="60" stroke="rgba(255,106,0,0.04)" strokeWidth="40" />
            </g>
            <g className="parallax-mid" ref={el => { if (el) midRef.current[0] = el; }}>
              <ellipse cx="780" cy="280" rx="320" ry="260" fill="url(#orbGrad)">
                <animate attributeName="rx" values="320;370;320" dur="7s" repeatCount="indefinite" />
                <animate attributeName="ry" values="260;300;260" dur="7s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;1;0.8" dur="7s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="200" cy="420" rx="220" ry="180" fill="url(#orbGrad2)">
                <animate attributeName="rx" values="220;260;220" dur="9s" begin="-3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="9s" begin="-3s" repeatCount="indefinite" />
              </ellipse>
            </g>
            <g className="parallax-mid" ref={el => { if (el) midRef.current[1] = el; }}>
              <circle cx="950" cy="280" r="180" fill="none" stroke="rgba(255,106,0,0.08)" strokeWidth="1" strokeDasharray="8 12">
                <animateTransform attributeName="transform" type="rotate" from="0 950 280" to="360 950 280" dur="30s" repeatCount="indefinite"/>
              </circle>
              <circle cx="950" cy="280" r="130" fill="none" stroke="rgba(255,106,0,0.05)" strokeWidth="1" strokeDasharray="5 15">
                <animateTransform attributeName="transform" type="rotate" from="360 950 280" to="0 950 280" dur="20s" repeatCount="indefinite"/>
              </circle>
            </g>
            <g className="parallax-fast" ref={el => { if (el) fastRef.current[0] = el; }}>
              <circle cx="120" cy="80" r="2.5" fill="#FF6A00" opacity="0.5"><animate attributeName="cy" values="80;60;80" dur="5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.5;0.9;0.5" dur="5s" repeatCount="indefinite" /></circle>
              <circle cx="340" cy="40" r="1.8" fill="#FF6A00" opacity="0.35"><animate attributeName="cy" values="40;20;40" dur="6.5s" begin="-2s" repeatCount="indefinite" /></circle>
              <circle cx="600" cy="100" r="3" fill="#FF6A00" opacity="0.3"><animate attributeName="cy" values="100;75;100" dur="8s" begin="-4s" repeatCount="indefinite" /></circle>
              <circle cx="900" cy="60" r="2" fill="#FF6A00" opacity="0.4"><animate attributeName="cy" values="60;35;60" dur="5.5s" begin="-1s" repeatCount="indefinite" /></circle>
              <circle cx="1050" cy="120" r="2.5" fill="#FF6A00" opacity="0.25"><animate attributeName="cy" values="120;95;120" dur="7s" begin="-3.5s" repeatCount="indefinite" /></circle>
            </g>
          </svg>
        </div>
        <div className="hero-in">
          <div className="hero-text" ref={heroTextRef}>
            <div className="eyebrow"><div className="eyebrow-bar"></div><div className="eyebrow-txt">For Agents & Referral Partners</div></div>
            <h1>Refer.<br /><em>Earn.</em><br />Repeat.</h1>
            <p class="hero-sub">Connect buyers with verified dealers — earn a commission on every vehicle purchase you help close. No targets, no pressure.</p>
            <div className="hero-btns">
              <button className="btn-fill" onClick={() => setIsWelcomeOpen(true)}>Become an Agent</button>
              <button className="btn-ghost" onClick={(e) => handleAnchorLink(e, 'calculator')}>Calculate Earnings</button>
            </div>
          </div>
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
                <div className="hg-float-badge">Agent Earnings</div>
                <div className="hg-top">
                  <div className="hg-label-sm">This Month</div>
                  <div className="hg-pill"><div className="hg-pill-dot"></div>+62% vs last month</div>
                </div>
                <div className="hg-earn-row">
                  <div className="hg-earn-num">₹<span>18,400</span></div>
                </div>
                <div className="hg-sub">Total commission earned · 6 deals closed</div>
                <div className="hg-breakdown">
                  <div className="hg-bk-row"><div className="hg-bk-type">Cars</div><div className="hg-bk-track"><div className="hg-bk-fill" style={{ width: '85%' }}></div></div><div className="hg-bk-val">₹12K</div></div>
                  <div className="hg-bk-row"><div className="hg-bk-type">Bikes</div><div className="hg-bk-track"><div className="hg-bk-fill" style={{ width: '35%' }}></div></div><div className="hg-bk-val">₹3.8K</div></div>
                  <div className="hg-bk-row"><div className="hg-bk-type">Trucks</div><div className="hg-bk-track"><div className="hg-bk-fill" style={{ width: '22%' }}></div></div><div className="hg-bk-val">₹2.6K</div></div>
                </div>
                <div className="hg-foot">
                  <div className="hg-pay-item">
                    <div className="hg-ava">RS</div>
                    <div className="hg-pay-info"><div className="hg-pay-name">Rahul Sharma</div><div className="hg-pay-sub">Hyundai Creta · Ranchi · 2 days ago</div></div>
                    <div className="hg-pay-amt">+₹3,200</div>
                  </div>
                  <div className="hg-pay-item">
                    <div className="hg-ava blue">PK</div>
                    <div className="hg-pay-info"><div className="hg-pay-name">Priya Kumari</div><div className="hg-pay-sub">Honda Activa · Dhanbad · 4 days ago</div></div>
                    <div className="hg-pay-amt">+₹850</div>
                  </div>
                  <div className="hg-pay-item">
                    <div className="hg-ava green">AM</div>
                    <div className="hg-pay-info"><div className="hg-pay-name">Arjun Mahto</div><div className="hg-pay-sub">Tata Truck · Jamshedpur · 6 days ago</div></div>
                    <div className="hg-pay-amt">+₹4,500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="m-item">Earn Per Referral<span className="m-dot"></span></span>
          <span className="m-item">No Targets · No Pressure<span class="m-dot"></span></span>
          <span className="m-item">Weekly Payouts<span class="m-dot"></span></span>
          <span className="m-item">Free to Join<span class="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · Trucks<span class="m-dot"></span></span>
          <span className="m-item">Training Provided<span class="m-dot"></span></span>
          <span className="m-item">Earn Per Referral<span class="m-dot"></span></span>
          <span className="m-item">No Targets · No Pressure<span class="m-dot"></span></span>
          <span className="m-item">Weekly Payouts<span class="m-dot"></span></span>
          <span className="m-item">Free to Join<span class="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · Trucks<span class="m-dot"></span></span>
          <span className="m-item">Training Provided<span class="m-dot"></span></span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat r"><div className="stat-val"><b>₹</b>5<b>K+</b></div><div className="stat-lbl">Avg. Monthly Earnings</div></div>
        <div className="stat r r1"><div className="stat-val">1<b>%</b></div><div className="stat-lbl">Commission Per Deal</div></div>
        <div className="stat r r2"><div className="stat-val"><b>₹</b>0</div><div className="stat-lbl">Cost to Join</div></div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-in">
          <div className="tag r">Process</div>
          <h2 className="sec-h r">How It <em>Works</em></h2>
          <p className="sec-p r">Four steps from registration to receiving your first commission payout.</p>
          <div className="steps">
            <div className="step r">
              <div className="step-n">01</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
              <div className="step-t">Register Free</div>
              <div className="step-d">Sign up as an agent in under 2 minutes. Verified within 24 hours — no fee, no deposit.</div>
            </div>
            <div className="step r r1">
              <div className="step-n">02</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg></div>
              <div className="step-t">Share Your Link</div>
              <div className="step-d">Get a unique agent referral link. Share it with anyone searching for a car, bike, or truck.</div>
            </div>
            <div className="step r r2">
              <div className="step-n">03</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div>
              <div className="step-t">Buyer Gets Quotes</div>
              <div className="step-d">Your referred buyer gets matched with dealers, receives competitive quotes, and chooses the best deal.</div>
            </div>
            <div className="step r r3">
              <div className="step-n">04</div>
              <div className="step-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg></div>
              <div className="step-t">You Get Paid</div>
              <div className="step-d">Once the deal closes, your commission is credited directly to your account every week.</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMISSION TABLE */}
      <section className="section comm-sec" id="commission">
        <div className="section-in">
          <div className="tag r" style={{ color: 'rgba(255,255,255,.4)' }}><span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'rgba(255,255,255,.2)' }}></span>Commission</div>
          <h2 className="sec-h r" style={{ color: '#fff' }}>What You <em>Earn</em></h2>
          <p className="sec-p r" style={{ color: 'rgba(255,255,255,.4)' }}>Commission is calculated on the final on-road vehicle price. No caps, no hidden deductions.</p>
          <div className="comm-grid">
            <div className="comm-card r">
              <div className="comm-badge">Most Popular</div>
              <div className="comm-vtype">Hatchback / Sedan</div>
              <div className="comm-ico">🚗</div>
              <div className="comm-pct">1<span>%</span></div>
              <div className="comm-desc">On every car purchase referred — e.g. ₹8L car = ₹8,000 commission for you</div>
            </div>
            <div className="comm-card r r1">
              <div className="comm-vtype">SUV / Premium Car</div>
              <div className="comm-ico">🚙</div>
              <div className="comm-pct">1<span>%</span></div>
              <div className="comm-desc">Higher vehicle value = higher payout. ₹20L SUV = ₹20,000 per closed deal</div>
            </div>
            <div className="comm-card r r2">
              <div className="comm-vtype">Bike / Scooter</div>
              <div className="comm-ico">🏍️</div>
              <div className="comm-pct">0.8<span>%</span></div>
              <div className="comm-desc">Quick closures with high volume. Ideal for urban areas with strong two-wheeler demand</div>
            </div>
            <div className="comm-card r r3">
              <div className="comm-badge" style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}>Highest Payout</div>
              <div className="comm-vtype">Truck / Commercial</div>
              <div className="comm-ico">🚛</div>
              <div className="comm-pct">1.2<span>%</span></div>
              <div className="comm-desc">Highest per-deal commission. ₹15L truck = ₹18,000 earned for a single referral</div>
            </div>
          </div>
        </div>
      </section>

      {/* EARNINGS CALCULATOR */}
      <section className="section calc-sec" id="calculator">
        <div className="section-in">
          <div className="tag r">Estimate</div>
          <h2 className="sec-h r">Calculate Your <em>Earnings</em></h2>
          <p className="sec-p r">Adjust the sliders to see how much you could make every month as a BuyWheels agent.</p>
          <div className="calc-wrap">
            <div className="calc-left r">
              <div className="calc-card">
                <div className="calc-input-group">
                  <label>Referrals per month: <span id="refCount">{calcRefs}</span></label>
                  <input type="range" className="calc-slider" min="1" max="50" value={calcRefs} onChange={(e) => setCalcRefs(parseInt(e.target.value))} />
                  <div className="calc-val">{calcRefs} buyers referred</div>
                </div>
                <div className="calc-input-group">
                  <label>Avg. vehicle price: <span id="priceLabel">₹{calcPrice}L</span></label>
                  <input type="range" className="calc-slider" min="1" max="50" value={calcPrice} onChange={(e) => setCalcPrice(parseInt(e.target.value))} />
                  <div className="calc-val">₹{(calcPrice * 100000).toLocaleString('en-IN')}</div>
                </div>
                <div className="calc-input-group">
                  <label>Avg. conversion rate: <span id="convLabel">{calcConv}%</span></label>
                  <input type="range" className="calc-slider" min="5" max="80" value={calcConv} onChange={(e) => setCalcConv(parseInt(e.target.value))} />
                  <div className="calc-val">{calcConv}% of referrals close</div>
                </div>
                <div className="calc-breakdown">
                  <div className="calc-bk-row"><div className="calc-bk-label">Closed deals / month</div><div className="calc-bk-val">{calcData.deals}</div></div>
                  <div className="calc-bk-row"><div className="calc-bk-label">Commission rate</div><div className="calc-bk-val">1%</div></div>
                  <div className="calc-bk-row"><div className="calc-bk-label">Commission per deal</div><div className="calc-bk-val">{fmtINR(calcData.perDeal)}</div></div>
                </div>
              </div>
            </div>
            <div className="calc-right r r1">
              <div className="calc-card">
                <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>Estimated Monthly Earnings</div>
                </div>
                <div className="calc-result">
                  <div className="calc-result-label">You could earn</div>
                  <div className="calc-result-num">{fmtINR(calcData.monthly)}</div>
                  <div className="calc-result-sub">per month as an agent</div>
                </div>
                <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="calc-bk-row" style={{ background: 'rgba(255,255,255,.04)', borderRadius: '8px', padding: '10px 14px', border: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.45)' }}>Annual projection</span>
                    <span className="calc-bk-val" style={{ fontFamily: 'var(--ff-h)', fontSize: '18px', fontWeight: 700, color: 'var(--orange)' }}>{fmtINR(calcData.annual)}</span>
                  </div>
                  <div className="calc-bk-row" style={{ background: 'rgba(255,255,255,.04)', borderRadius: '8px', padding: '10px 14px', border: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.45)' }}>Weekly payout</span>
                    <span className="calc-bk-val" style={{ fontFamily: 'var(--ff-h)', fontSize: '18px', fontWeight: 700, color: 'var(--orange)' }}>{fmtINR(calcData.weekly)}</span>
                  </div>
                </div>
                <div style={{ marginTop: '18px', background: 'rgba(248,118,41,0.08)', border: '1px solid rgba(248,118,41,0.2)', padding: '12px 14px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>This is an estimate. Actual earnings depend on your referral volume and vehicle segment. No guarantees — your effort drives your income.</p>
                </div>
                <button className="btn-sub" onClick={() => setIsWelcomeOpen(true)} style={{ marginTop: '16px', clipPath: 'none', borderRadius: '4px' }}>Start Earning Now →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN CAROUSEL */}
      <section className="wcu-sec" id="why">
        <div className="wcu-inner">
          <div className="wcu-top">
            <div className="wcu-top-left">
              <div className="wcu-eyebrow r">Why Join</div>
              <h2 className="wcu-h r r1">Earn On Your Own<br /><em>Terms</em> — Always Free</h2>
            </div>
            <div className="wcu-nav-btns">
              <button className="wcu-nav-btn" onClick={() => handleWcuGoTo(wcuIdx - 1)} disabled={wcuIdx <= 0} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button className="wcu-nav-btn" onClick={() => handleWcuGoTo(wcuIdx + 1)} disabled={wcuIdx >= maxWcuIdx} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
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
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="16" r="12" /><line x1="16" y1="8" x2="16" y2="10" /><line x1="16" y1="22" x2="16" y2="24" />
                    <path d="M12 12.5a4 4 0 0 1 8 0c0 2.5-4 4-4 6" /><circle cx="16" cy="20.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="wcu-card-t">100% Free to Join</div>
                <div className="wcu-card-d">No registration fee, no monthly subscription, no deposit. Sign up, get verified, and start earning immediately.</div>
                <div className="wcu-card-num">01</div>
              </div>

              <div className="wcu-card r r1">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="28" height="20" rx="2" /><path d="M2 12h28M10 18h4M10 22h6" />
                  </svg>
                </div>
                <div className="wcu-card-t">Weekly Payouts</div>
                <div className="wcu-card-d">Commissions are calculated every week and credited directly to your bank or UPI. No delays, no waiting months.</div>
                <div className="wcu-card-num">02</div>
              </div>

              <div className="wcu-card r r2">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3L5 7.5v8C5 22 10 27.5 16 29c6-1.5 11-7 11-13.5v-8L16 3z" /><polyline points="11 16 14.5 19.5 21 13" />
                  </svg>
                </div>
                <div className="wcu-card-t">No Targets</div>
                <div className="wcu-card-d">Work at your own pace — part-time or full-time. No minimum referral quotas and no pressure from managers.</div>
                <div className="wcu-card-num">03</div>
              </div>

              <div className="wcu-card r r3">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="13" y2="11" />
                  </svg>
                </div>
                <div className="wcu-card-t">Training Provided</div>
                <div className="wcu-card-d">New to sales? We send a full training kit with scripts, objection handling, and product knowledge — all free.</div>
                <div className="wcu-card-num">04</div>
              </div>

              <div className="wcu-card r r4">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="8" /><path d="M12 4H6a2 2 0 0 0-2 2v6" /><line x1="14.5" y1="9.5" x2="10" y2="4" />
                  </svg>
                </div>
                <div className="wcu-card-t">Unlimited Earning</div>
                <div className="wcu-card-d">No ceiling on what you can earn. The more referrals you close, the more you make — with bonus tiers for top agents.</div>
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

      {/* FINAL CTA */}
      <section className="final">
        <div className="final-in">
          <h2 className="r">Start Earning<br />Your First Commission</h2>
          <p className="r r1">Join 2,000+ agents already earning with BuyWheels — free to join, no targets, weekly payouts.</p>
          <button className="btn-dark r r2" onClick={() => setIsWelcomeOpen(true)}>Become an Agent Now</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-in">
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Logo height={48} mode="dark" />
          </div>
          <div className="foot-links">
            <Link to="/">For Buyers</Link>
            <Link to="/dealer">Become a Dealer</Link>
            <a href="#">Agent Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="foot-copy">© 2025 BuyWheels. All rights reserved.</div>
        </div>
      </footer>

    </div>
  );
}
