import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { saveFormSubmission } from '../lib/supabase';
import DragDrop from '../components/DragDrop';
import ComingSoonOverlay from '../components/ComingSoonOverlay';
import Logo from '../components/Logo';
import vehicleCategoriesImage from '../assets/vehicle-categories-ai.png';
import truckCategoryImage from '../assets/truck-category-ai.png';
import busVanCategoryImage from '../assets/bus-van-category-ai.png';
import petrolFuelImage from '../assets/fuel-types/petrol.svg';
import dieselFuelImage from '../assets/fuel-types/diesel.svg';
import cngFuelImage from '../assets/fuel-types/cng.svg';
import electricFuelImage from '../assets/fuel-types/electric.svg';

// Import CSS stylesheets for styling isolation
import '../styles/reset.css';
import '../styles/buyer.css';

const FUEL_THEMES = {
  petrol:   { accent: '#FF6A00', accentD: '#e05c00', bg: 'rgba(255,106,0,0.08)', border: 'rgba(255,106,0,0.3)', glow: 'rgba(255,106,0,0.18)' },
  diesel:   { accent: '#2563EB', accentD: '#1d4ed8', bg: 'rgba(37,99,235,0.08)', border: 'rgba(37,99,235,0.3)', glow: 'rgba(37,99,235,0.18)' },
  cng:      { accent: '#D97706', accentD: '#b45309', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.3)', glow: 'rgba(217,119,6,0.18)' },
  electric: { accent: '#16A34A', accentD: '#15803d', bg: 'rgba(22,163,74,0.08)', border: 'rgba(22,163,74,0.3)', glow: 'rgba(22,163,74,0.18)' }
};

// Current brands marketed in India. Kept in one place so every buyer form
// offers the same, up-to-date list.
const CAR_BRANDS = {
  massMarket: ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Kia', 'Toyota', 'Honda', 'MG', 'Renault', 'Nissan', 'Škoda', 'Volkswagen', 'Citroën', 'Jeep', 'Force Motors', 'Isuzu', 'BYD', 'VinFast'],
  premium: ['Audi', 'BMW', 'Mercedes-Benz', 'MINI', 'Volvo', 'Lexus', 'Land Rover', 'Jaguar', 'Porsche', 'Bentley', 'Lamborghini', 'Ferrari', 'Maserati', 'Rolls-Royce']
};

const BIKE_BRANDS = {
  petrol: ['Hero MotoCorp', 'Honda', 'TVS', 'Bajaj', 'Royal Enfield', 'Yamaha', 'Suzuki', 'KTM', 'Jawa', 'Yezdi', 'Harley-Davidson', 'Triumph', 'Kawasaki', 'Ducati', 'BMW Motorrad', 'Aprilia', 'Vespa', 'Benelli', 'Keeway', 'Moto Morini', 'Zontes'],
  electric: ['Ather', 'Ola Electric', 'VIDA', 'Chetak', 'Ultraviolette', 'Revolt', 'Oben', 'River', 'Simple Energy', 'Ampere', 'BGauss', 'Joy e-bike', 'Komaki', 'Matter']
};

export default function BuyerPage() {
  // Modal Overlays
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonData, setComingSoonData] = useState(null);

  // Welcome Popup Wizard States
  const [welcomeSlide, setWelcomeSlide] = useState(0);
  const [welcomeCategory, setWelcomeCategory] = useState('Car');
  const [welcomeFuel, setWelcomeFuel] = useState('petrol');
  const [welcomeForm, setWelcomeForm] = useState({
    owner_name: '',
    brand: '',
    budget: '',
    city: '',
    phone: ''
  });
  const [welcomePhoneError, setWelcomePhoneError] = useState(false);
  const [welcomeSubmitting, setWelcomeSubmitting] = useState(false);

  // Enquiry Modal States
  const [enquiryForm, setEnquiryForm] = useState({
    owner_name: '',
    vehicle_type: '',
    brand: '',
    budget: '',
    phone: ''
  });
  const [enquiryPhoneError, setEnquiryPhoneError] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquiryUploadedFiles, setEnquiryUploadedFiles] = useState([]);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Why Choose Us Carousel State
  const [wcuIdx, setWcuIdx] = useState(0);
  const [wcuVisibleCount, setWcuVisibleCount] = useState(4);
  const wcuTrackRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchDxRef = useRef(0);

  // Refs for Parallax Hero Animation
  const heroRef = useRef(null);
  const slowRef = useRef([]);
  const midRef = useRef([]);
  const fastRef = useRef([]);
  const heroTextRef = useRef(null);
  const heroCarRef = useRef(null);

  // Auto-open welcome popup after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomeOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll reveals (.r, .r1, .r2 etc.)
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

  // Parallax Scrolling listener
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
        if (heroCarRef.current) heroCarRef.current.style.transform = '';
        ticking = false;
        return;
      }

      const visibleProgress = Math.min(1, Math.max(0, (viewportH - heroTop) / (viewportH + heroH)));
      const sy = Math.max(0, Math.min(viewportH - heroTop, heroH));

      slowRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.12}px)`; });
      midRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.22}px)`; });
      fastRef.current.forEach(el => { if (el) el.style.transform = `translateY(${sy * 0.35}px)`; });
      if (heroTextRef.current) heroTextRef.current.style.transform = `translateY(${sy * 0.18}px)`;
      if (heroCarRef.current) {
        const scale = 1 - visibleProgress * 0.045;
        heroCarRef.current.style.transform = `translate3d(0, ${sy * 0.2}px, 0) scale(${scale})`;
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
    // Run once on load
    applyParallax();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Set local dynamic variables on welcome float card
  const welcomeThemeStyle = React.useMemo(() => {
    const fuel = welcomeCategory === 'Car' ? welcomeFuel : 'petrol';
    const c = FUEL_THEMES[fuel] || FUEL_THEMES.petrol;
    return {
      '--fuel-accent': c.accent,
      '--fuel-accent-d': c.accentD,
      '--fuel-accent-bg': c.bg,
      '--fuel-accent-border': c.border,
      '--fuel-accent-glow': c.glow
    };
  }, [welcomeCategory, welcomeFuel]);

  // Welcome multi-step triggers
  const handleSelectWelcomeCategory = (type) => {
    setWelcomeCategory(type);
    setWelcomeForm(prev => ({ ...prev, brand: '' })); // reset brand option
    if (type === 'Car') {
      setWelcomeSlide(1);
    } else {
      setWelcomeFuel('petrol');
      setWelcomeSlide(2);
    }
  };

  const handleSelectWelcomeFuel = (fuel) => {
    setWelcomeFuel(fuel);
    setTimeout(() => {
      setWelcomeSlide(2);
    }, 220);
  };

  const handleWelcomeBack = () => {
    if (welcomeSlide === 2 && welcomeCategory === 'Car') {
      setWelcomeSlide(1);
    } else {
      setWelcomeSlide(0);
    }
  };

  // Enforce numeric only mobile inputs
  const handlePhoneInputChange = (val, setter, errorSetter) => {
    const clean = val.replace(/\D/g, '');
    setter(clean);
    if (errorSetter) errorSetter(false);
  };

  const handleWelcomeSubmit = async (e) => {
    e.preventDefault();
    const { owner_name, brand, budget, city, phone } = welcomeForm;

    if (!owner_name || !brand || !budget || !city) {
      alert('Please fill all details.');
      return;
    }
    if (phone.length !== 10) {
      setWelcomePhoneError(true);
      return;
    }

    setWelcomeSubmitting(true);

    const payload = {
      owner_name,
      vehicle_type: welcomeCategory,
      brand,
      budget,
      city,
      phone,
      fuel: welcomeCategory === 'Car' ? welcomeFuel : '',
    };

    try {
      const savedSubmission = await saveFormSubmission('buyer_enquiries', payload);
      setComingSoonData(savedSubmission);
    } catch (err) {
      console.error('Supabase submission error:', err);
      alert(`We could not save your enquiry. Please try again. (${err.message || 'Unknown error'})`);
      setWelcomeSubmitting(false);
      return;
    }

    setWelcomeSubmitting(false);
    setIsWelcomeOpen(false);
    setIsComingSoonOpen(true);
  };

  // Main Enquiry modal submit
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const { owner_name, vehicle_type, brand, budget, phone } = enquiryForm;

    if (!owner_name || !vehicle_type || !brand || !budget) {
      alert('Please fill all details.');
      return;
    }
    if (phone.length !== 10) {
      setEnquiryPhoneError(true);
      return;
    }

    setEnquirySubmitting(true);

    const payload = {
      owner_name,
      vehicle_type,
      brand,
      budget,
      phone,
      city: 'Ranchi' // default रांची city for home enquiry
    };

    try {
      const savedSubmission = await saveFormSubmission('buyer_enquiries', payload, enquiryUploadedFiles);
      setComingSoonData(savedSubmission);
    } catch (err) {
      console.error('Supabase submission error:', err);
      alert(`We could not save your enquiry. Please try again. (${err.message || 'Unknown error'})`);
      setEnquirySubmitting(false);
      return;
    }

    setEnquirySubmitting(false);
    setEnquirySuccess(true);
  };

  // Welcome Form select options generator
  const getBrandOptions = (type) => {
    if (type === 'Bike / Scooter') {
      return (
        <>
          <option value="" disabled>Select brand</option>
          <optgroup label="Motorcycle & scooter brands">
            {BIKE_BRANDS.petrol.map((brand) => <option key={brand}>{brand}</option>)}
          </optgroup>
          <optgroup label="Electric two-wheeler brands">
            {BIKE_BRANDS.electric.map((brand) => <option key={brand}>{brand}</option>)}
          </optgroup>
          <option>Other</option>
        </>
      );
    } else if (type === 'Truck') {
      return (
        <>
          <option value="" disabled>Select brand</option>
          <option>Tata Motors</option><option>Ashok Leyland</option><option>Mahindra</option>
          <option>Eicher</option><option>BharatBenz</option><option>Force Motors</option><option>Other</option>
        </>
      );
    } else {
      return (
        <>
          <option value="" disabled>Select brand</option>
          <optgroup label="Car brands in India">
            {CAR_BRANDS.massMarket.map((brand) => <option key={brand}>{brand}</option>)}
          </optgroup>
          <optgroup label="Luxury & performance brands">
            {CAR_BRANDS.premium.map((brand) => <option key={brand}>{brand}</option>)}
          </optgroup>
          <option>Other</option>
        </>
      );
    }
  };

  // Carousel GoTo calculations
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

  // Carousel touch swipe handlers
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

  // Anchor Smooth Scrolls
  const handleAnchorLink = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="buyer-portal-wrapper">
      {/* Welcome Floating Multi-Step Popup overlay */}
      {isWelcomeOpen && (
        <div className="welcome-float open" onClick={(e) => { if (e.target === e.currentTarget) setIsWelcomeOpen(false); }}>
          <div className="welcome-float-card wf-themed" style={welcomeThemeStyle}>
            <div className="wf-topbar"></div>
            <div className="wf-header">
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
                <Logo height={34} mode="light" />
              </Link>
              <button className="wf-close" onClick={() => setIsWelcomeOpen(false)} aria-label="Close">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="wf-title-area">
              <div className="wf-title">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                Get Best Deals
              </div>
              <div className="wf-subtitle">Verified dealers in Ranchi will respond within 2 hours.</div>
            </div>
            <div className="wf-divider"></div>
            
            <div className="wf-body">
              <div className="wf-slides-wrap">
                <div className="wf-slides" style={{ display: 'flex', transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)', transform: `translateX(-${welcomeSlide * 100}%)` }}>
                  
                  {/* SLIDE 0: Category Select */}
                  <div className="wf-slide">
                    <div className="wf-pick-label">What are you looking for?</div>
                    <div className="wf-cards">
                      
                      {/* Car */}
                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectWelcomeCategory('Car')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeCategory('Car'); }}>
                        <div className="wf-card-img">
                          <img src="https://stimg2.cardekho.com/images/carNewsEditorImages/930x620/20220524_171353/29119/citroen0.jpg" alt="Car" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">Car</div>
                          <div className="wf-card-desc">Hatchback · Sedan · SUV · Electric</div>
                        </div>
                        <div className="wf-card-arr">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Bike */}
                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectWelcomeCategory('Bike / Scooter')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeCategory('Bike / Scooter'); }}>
                        <div className="wf-card-img">
                          <img src="https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/harleydavidson-x440-vivid1748859639431.jpg?q=80" alt="Bike" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">Bike / Scooter</div>
                          <div className="wf-card-desc">Motorcycle · Scooter · Electric</div>
                        </div>
                        <div className="wf-card-arr">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Truck */}
                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectWelcomeCategory('Truck')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeCategory('Truck'); }}>
                        <div className="wf-card-img">
                          <img src="https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/LPT-1009G_0.jpg?VersionId=.YV074BZ4D_qiab0v_KhKaAuW3F3ZHCm" alt="Truck" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">Truck</div>
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

                  {/* SLIDE 1: Fuel Type Select (Car Only) */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={() => setWelcomeSlide(0)}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>Back
                    </button>
                    <div className="wf-cat-chip">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{welcomeCategory}</span>
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Select fuel type</div>
                    <div className="wf-fuel-cards">
                      
                      {/* Petrol */}
                      <div className={`wf-fuel-card ${welcomeFuel === 'petrol' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeFuel('petrol')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('petrol'); }}>
                        <div className="wf-fuel-ico"><img src={petrolFuelImage} alt="Petrol" /></div>
                        <div className="wf-fuel-name">Petrol</div>
                        <div className="wf-fuel-desc">Most common · Smooth drive</div>
                      </div>

                      {/* Diesel */}
                      <div className={`wf-fuel-card ${welcomeFuel === 'diesel' ? 'selected' : ''}`} data-fuel="diesel" tabIndex={0} onClick={() => handleSelectWelcomeFuel('diesel')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('diesel'); }}>
                        <div className="wf-fuel-ico"><img src={dieselFuelImage} alt="Diesel" /></div>
                        <div className="wf-fuel-name">Diesel</div>
                        <div className="wf-fuel-desc">Better mileage · Highway ideal</div>
                      </div>

                      {/* CNG */}
                      <div className={`wf-fuel-card ${welcomeFuel === 'cng' ? 'selected' : ''}`} data-fuel="cng" tabIndex={0} onClick={() => handleSelectWelcomeFuel('cng')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('cng'); }}>
                        <div className="wf-fuel-ico"><img src={cngFuelImage} alt="CNG" /></div>
                        <div className="wf-fuel-name">CNG</div>
                        <div className="wf-fuel-desc">Low running cost · Eco-friendly</div>
                      </div>

                      {/* Electric */}
                      <div className={`wf-fuel-card ${welcomeFuel === 'electric' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeFuel('electric')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('electric'); }}>
                        <div className="wf-fuel-ico"><img src={electricFuelImage} alt="Electric" /></div>
                        <div className="wf-fuel-name">Electric</div>
                        <div className="wf-fuel-desc">Zero emission · Future ready</div>
                        <div className="wf-fuel-badge">ECO</div>
                      </div>

                    </div>
                  </div>

                  {/* SLIDE 2: Detail Form Submission */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={handleWelcomeBack}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>Back
                    </button>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeCategory}</span>
                      </div>
                      {welcomeCategory === 'Car' && (
                        <div className="wf-cat-chip" id="wFuelChip" style={{ marginBottom: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span style={{ textTransform: 'capitalize' }}>{welcomeFuel}</span>
                        </div>
                      )}
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Fill in your details</div>
                    <form id="wForm" onSubmit={handleWelcomeSubmit} noValidate>
                      <div className="field wf-form">
                        <label htmlFor="wName">Full Name</label>
                        <input id="wName" name="owner_name" type="text" placeholder="Your Full Name" required style={{ height: '44px', fontSize: '13px' }} value={welcomeForm.owner_name} onChange={(e) => setWelcomeForm(prev => ({ ...prev, owner_name: e.target.value }))} />
                      </div>
                      <div className="field-row wf-form">
                        <div className="field wf-form">
                          <label htmlFor="wBrand">Brand</label>
                          <select id="wBrand" name="brand" required value={welcomeForm.brand} onChange={(e) => setWelcomeForm(prev => ({ ...prev, brand: e.target.value }))}>
                            {getBrandOptions(welcomeCategory)}
                          </select>
                        </div>
                        <div className="field wf-form">
                          <label htmlFor="wBudget">Budget</label>
                          <select id="wBudget" name="budget" required value={welcomeForm.budget} onChange={(e) => setWelcomeForm(prev => ({ ...prev, budget: e.target.value }))}>
                            <option value="" disabled>Select</option>
                            <option>Under ₹3L</option>
                            <option>₹3–6L</option>
                            <option>₹6–10L</option>
                            <option>₹10–15L</option>
                            <option>₹15–25L</option>
                            <option>₹25–50L</option>
                            <option>Above ₹50L</option>
                          </select>
                        </div>
                      </div>
                      <div className="field wf-form">
                        <label htmlFor="wCity">City</label>
                        <select id="wCity" name="city" required value={welcomeForm.city} onChange={(e) => setWelcomeForm(prev => ({ ...prev, city: e.target.value }))}>
                          <option value="" disabled>Select city</option>
                          <option>Ranchi</option><option>Dhanbad</option><option>Jamshedpur</option>
                          <option>Bokaro</option><option>Hazaribagh</option><option>Deoghar</option>
                          <option>Giridih</option><option>Ramgarh</option><option>Dumka</option>
                          <option>Chatra</option><option>Palamu</option><option>Gumla</option>
                          <option>Lohardaga</option><option>Simdega</option><option>Other</option>
                        </select>
                      </div>
                      <div className="field wf-form">
                        <label htmlFor="wPhone">Mobile Number</label>
                        <div className="phone-row">
                          <div className="ph-pre" style={{ height: '44px', fontSize: '13px' }}>+91</div>
                          <input id="wPhone" name="phone" type="tel" inputMode="numeric" placeholder="98765 43210" maxLength={10} required style={{ height: '44px', fontSize: '13px' }} value={welcomeForm.phone} onChange={(e) => handlePhoneInputChange(e.target.value, (v) => setWelcomeForm(p => ({ ...p, phone: v })), setWelcomePhoneError)} />
                        </div>
                        {welcomePhoneError && <div className="field-error" id="wPhoneError" style={{ display: 'block', color: '#e74c3c', fontSize: '11px', marginTop: '5px' }}>Please enter a valid 10-digit number.</div>}
                      </div>
                      <button type="submit" className="btn-sub" style={{ height: '48px', fontSize: '14px', marginTop: '4px' }} disabled={welcomeSubmitting}>
                        {welcomeSubmitting ? 'Submitting…' : 'Get Best Deals →'}
                      </button>
                    </form>
                    <p style={{ fontSize: '10px', color: '#bbb', textAlign: 'center', marginTop: '8px' }}>Shared with matched dealers only · Always free</p>
                  </div>

                </div>
              </div>
              <div className="wf-dots">
                <div className={`wf-dot ${welcomeSlide === 0 ? 'active' : ''}`} id="wDot0"></div>
                <div className={`wf-dot ${welcomeSlide === 1 ? 'active' : ''}`} id="wDot1"></div>
                <div className={`wf-dot ${welcomeSlide === 2 ? 'active' : ''}`} id="wDot2"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Enquiry modal popup */}
      {isModalOpen && (
        <div className="modal-overlay open" role="dialog" aria-modal="true" aria-label="Get Best Deals Enquiry" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="modal" id="modalBox">
            <button className="modal-close" onClick={() => { setIsModalOpen(false); setEnquirySuccess(false); }} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!enquirySuccess ? (
              <div id="fBody">
                <div className="modal-body">
                  <div className="fbox-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Get Best Deals
                  </div>
                  <div className="fbox-sub">Verified dealers in Ranchi will respond within 2 hours.</div>
                  <form id="mForm" onSubmit={handleEnquirySubmit} noValidate>
                    <div className="field">
                      <label htmlFor="mName">Full Name</label>
                      <input id="mName" name="owner_name" type="text" placeholder="Your Full Name" required value={enquiryForm.owner_name} onChange={(e) => setEnquiryForm(prev => ({ ...prev, owner_name: e.target.value }))} />
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="vt">Vehicle Type</label>
                        <select id="vt" name="vehicle_type" required value={enquiryForm.vehicle_type} onChange={(e) => setEnquiryForm(prev => ({ ...prev, vehicle_type: e.target.value, brand: '' }))}>
                          <option value="" disabled>Select type</option>
                          <option>Car</option>
                          <option>Bike / Scooter</option>
                          <option>Truck</option>
                          <option>Bus / Van</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="br">Brand</label>
                        <select id="br" name="brand" required value={enquiryForm.brand} onChange={(e) => setEnquiryForm(prev => ({ ...prev, brand: e.target.value }))}>
                          {getBrandOptions(enquiryForm.vehicle_type)}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="bu">Budget Range</label>
                      <select id="bu" name="budget" required value={enquiryForm.budget} onChange={(e) => setEnquiryForm(prev => ({ ...prev, budget: e.target.value }))}>
                        <option value="" disabled>Select budget</option>
                        <option>Under ₹3 Lakh</option>
                        <option>₹3 – 6 Lakh</option>
                        <option>₹6 – 10 Lakh</option>
                        <option>₹10 – 15 Lakh</option>
                        <option>₹15 – 25 Lakh</option>
                        <option>₹25 – 50 Lakh</option>
                        <option>Above ₹50 Lakh</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="ph">Mobile Number</label>
                      <div className="phone-row">
                        <div className="ph-pre">+91</div>
                        <input id="ph" name="phone" type="tel" inputmode="numeric" placeholder="98765 43210" maxLength={10} required value={enquiryForm.phone} onChange={(e) => handlePhoneInputChange(e.target.value, (v) => setEnquiryForm(p => ({ ...p, phone: v })), setEnquiryPhoneError)} />
                      </div>
                      {enquiryPhoneError && <div className="field-error" id="phError" style={{ display: 'block', color: '#e74c3c', fontSize: '11px', marginTop: '5px' }}>Please enter a valid 10-digit mobile number.</div>}
                    </div>
                    
                    <DragDrop id="ddModal" onFilesChange={setEnquiryUploadedFiles} />

                    <button type="submit" className="btn-sub" disabled={enquirySubmitting}>
                      {enquirySubmitting ? 'Submitting…' : 'Get Best Deals →'}
                    </button>
                  </form>
                  <div className="fnote">Shared only with matched dealers · Never sold · Always free</div>
                </div>
              </div>
            ) : (
              <div className="fsuccess" id="fOk" style={{ display: 'block' }}>
                <div className="scheck">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="s-t">Enquiry Submitted!</div>
                <div className="s-d">Verified dealers in Ranchi will reach out within 2 hours with their best quotes.</div>
                <button
                  type="button"
                  className="btn-dark"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))', padding: '13px 32px' }}
                  onClick={() => {
                    setIsModalOpen(false);
                    setEnquirySuccess(false);
                    setIsComingSoonOpen(true);
                  }}
                >
                  Done →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Coming Soon Receipt Overlay */}
      <ComingSoonOverlay isOpen={isComingSoonOpen} data={comingSoonData} prefix="BW" onClose={() => { setIsComingSoonOpen(false); setComingSoonData(null); }} />

      {/* Re-open floating deal trigger button */}
      <button className={`wf-trigger ${!isWelcomeOpen ? 'show' : ''}`} id="wfTrigger" onClick={() => setIsWelcomeOpen(true)}>
        <div className="wf-trigger-dot"></div>
        Get Best Deal
      </button>

      {/* NAVBAR */}
      <nav>
        <div className="nav-in">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <Logo height={42} mode="dark" />
          </Link>
          <ul className="nav-links">
            <li><a href="#how" onClick={(e) => handleAnchorLink(e, 'how')}>How it Works</a></li>
            <li><a href="#cats" onClick={(e) => handleAnchorLink(e, 'cats')}>Our Vehicles</a></li>
            <li><a href="#enquiry" onClick={(e) => handleAnchorLink(e, 'enquiry')}>Get Quotes</a></li>
            <li><Link to="/dealer" style={{ color: 'var(--orange)', fontWeight: 600 }}>Become a Dealer</Link></li>
            <li><Link to="/agent" style={{ color: 'var(--orange)', fontWeight: 600 }}>Become an Agent</Link></li>
          </ul>
          <button className="btn-nav" onClick={() => setIsWelcomeOpen(true)}>Contact Now</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="heroSection" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true">
          <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="orbGrad" cx="65%" cy="50%" r="45%">
                <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="orbGrad2" cx="20%" cy="80%" r="35%">
                <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
              </radialGradient>
              <pattern id="heroGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,106,0,0.07)" strokeWidth="1" />
              </pattern>
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
                <animateTransform attributeName="transform" type="rotate" from="0 950 280" to="360 950 280" dur="30s" repeatCount="indefinite" />
              </circle>
              <circle cx="950" cy="280" r="130" fill="none" stroke="rgba(255,106,0,0.05)" strokeWidth="1" strokeDasharray="5 15">
                <animateTransform attributeName="transform" type="rotate" from="360 950 280" to="0 950 280" dur="20s" repeatCount="indefinite" />
              </circle>
            </g>
            <g className="parallax-fast" ref={el => { if (el) fastRef.current[0] = el; }}>
              <circle cx="120" cy="80" r="2.5" fill="#FF6A00" opacity="0.5"><animate attributeName="cy" values="80;60;80" dur="5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.5;0.9;0.5" dur="5s" repeatCount="indefinite" /></circle>
              <circle cx="340" cy="40" r="1.8" fill="#FF6A00" opacity="0.35"><animate attributeName="cy" values="40;20;40" dur="6.5s" begin="-2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.35;0.7;0.35" dur="6.5s" begin="-2s" repeatCount="indefinite" /></circle>
              <circle cx="600" cy="100" r="3" fill="#FF6A00" opacity="0.3"><animate attributeName="cy" values="100;75;100" dur="8s" begin="-4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0.6;0.3" dur="8s" begin="-4s" repeatCount="indefinite" /></circle>
              <circle cx="900" cy="60" r="2" fill="#FF6A00" opacity="0.4"><animate attributeName="cy" values="60;35;60" dur="5.5s" begin="-1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.4;0.8;0.4" dur="5.5s" begin="-1s" repeatCount="indefinite" /></circle>
              <circle cx="1050" cy="120" r="2.5" fill="#FF6A00" opacity="0.25"><animate attributeName="cy" values="120;95;120" dur="7s" begin="-3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.25;0.5;0.25" dur="7s" begin="-3.5s" repeatCount="indefinite" /></circle>
            </g>
          </svg>
        </div>
        <div className="hero-in">
          <div className="hero-text" ref={heroTextRef}>
            <div className="eyebrow"><span className="eyebrow-dot"></span><div className="eyebrow-txt">Ranchi's trusted vehicle marketplace</div></div>
            <h1>Buy smarter.<br /><em>Drive</em> happier.</h1>
            <p className="hero-sub">Tell us what you want. Verified local dealers compete with their best price — with no pressure and no cost to you.</p>
            <div className="hero-btns">
              <button className="btn-fill" onClick={() => setIsWelcomeOpen(true)}>Get my best price <span>→</span></button>
              <button className="btn-ghost" onClick={(e) => handleAnchorLink(e, 'how')}>How it Works</button>
            </div>
            <div className="hero-trust-row" aria-label="BuyWheels service benefits">
              <span>✓ Free for buyers</span><span>✓ Verified dealers</span><span>✓ Quotes within 2 hours</span>
            </div>
          </div>
          <div className="hero-car" ref={heroCarRef}>
            <img src="https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/pc/creta-kv.png" alt="Latest Car" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="hero-offer-card">
              <div className="offer-icon">✓</div>
              <div><strong>Dealers are ready to quote</strong><span>Compare offers in one place</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span className="m-item">500+ Verified Dealers<span className="m-dot"></span></span>
          <span className="m-item">Best Price Guaranteed<span className="m-dot"></span></span>
          <span className="m-item">Free Service<span className="m-dot"></span></span>
          <span className="m-item">Response in 2 Hours<span className="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · Trucks<span className="m-dot"></span></span>
          <span className="m-item">Fully Electric Options<span className="m-dot"></span></span>
          <span className="m-item">500+ Verified Dealers<span className="m-dot"></span></span>
          <span className="m-item">Best Price Guaranteed<span className="m-dot"></span></span>
          <span className="m-item">Free Service<span className="m-dot"></span></span>
          <span className="m-item">Response in 2 Hours<span className="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · Trucks<span className="m-dot"></span></span>
          <span className="m-item">Fully Electric Options<span className="m-dot"></span></span>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat r"><div className="stat-val">500<b>+</b></div><div className="stat-lbl">Verified Dealers</div></div>
        <div className="stat r r1"><div class="stat-val">2<b>hr</b></div><div className="stat-lbl">Avg. Response</div></div>
        <div className="stat r r2"><div className="stat-val"><b>₹</b>0</div><div className="stat-lbl">Cost to You</div></div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-in">
          <div className="tag r">Process</div>
          <h2 className="sec-h r">How It <em>Works</em></h2>
          <p class="sec-p r">Three steps between you and the best vehicle deal in Ranchi.</p>
          <div className="steps">
            <div className="step r">
              <div className="step-n">01</div>
              <div className="step-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div className="step-t">Submit Enquiry</div>
              <div className="step-d">Tell us which vehicle you want and your budget. Under 60 seconds — no account needed.</div>
            </div>
            <div className="step r r1">
              <div className="step-n">02</div>
              <div className="step-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="step-t">Dealers Send Quotes</div>
              <div className="step-d">Verified dealers in Ranchi compete and send you real, best-price quotes within hours.</div>
            </div>
            <div className="step r r2">
              <div className="step-n">03</div>
              <div className="step-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="step-t">Choose Best Deal</div>
              <div className="step-d">Compare side-by-side and pick the dealer you trust. Visit only when you're ready to buy.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section cats-sec" id="cats">
        <div className="section-in">
          <div className="tag r" style={{ color: 'rgba(255,255,255,.4)' }}>
            <span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'rgba(255,255,255,.2)' }} />
            Browse
          </div>
          <h2 className="sec-h r" style={{ color: '#fff' }}>Explore Your <em>Dream Vehicles</em></h2>
          <p className="sec-p r" style={{ color: 'rgba(255,255,255,.4)' }}>Find deals across every vehicle type in Ranchi.</p>
          <div className="cats-grid">
            
            {/* Car */}
            <div className="cat r" onClick={() => { handleSelectWelcomeCategory('Car'); setIsWelcomeOpen(true); }}>
              <div className="cat-media"><img src={vehicleCategoriesImage} alt="Modern SUV" style={{ objectPosition: '0% 0%' }} /></div>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M22.0963 8.35858C39.4674 -3.61904 63.3093 -2.25997 79.1672 11.6033C95.0251 25.4665 99.1691 48.0691 89.0768 65.6534C78.9845 83.2378 57.2144 91.5645 37.0396 85.5414C16.8647 79.5183 3.65586 59.9882 4.72517 38.895C5.79447 17.8018 20.3164 12.352 22.0963 8.35858Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M16 16L27 16C31 16 34 18 36 21L38 24H12L16 16Z" fill="currentColor" fillOpacity="0.15" /><path d="M6 32L4 27C3 24 4 22 7 21L15 21L21 14C23 12 25 11 28 11H35C39 11 42 13 44 17L46 22C47 25 47 27 45 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 21H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="14" cy="32" r="6" fill="var(--dark2)" stroke="currentColor" strokeWidth="3" /><circle cx="36" cy="32" r="6" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="14" cy="32" r="2" fill="var(--orange)" /><circle cx="36" cy="32" r="2" fill="var(--orange)" /></svg>
              </div>
              <div className="cat-t">Car</div>
              <div className="cat-s">Hatchback · Sedan · SUV</div>
              <div className="cat-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Bike */}
            <div className="cat r r1" onClick={() => { handleSelectWelcomeCategory('Bike / Scooter'); setIsWelcomeOpen(true); }}>
              <div className="cat-media"><img src={vehicleCategoriesImage} alt="Motorcycle and scooter" style={{ objectPosition: '100% 0%' }} /></div>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M85.4981 29.8057C95.5342 46.068 91.1353 68.0427 75.1437 80.4074C59.1522 92.772 36.31 91.3117 21.9056 76.8433C7.50119 62.3749 5.56846 39.5393 17.1864 23.1118C28.8043 6.68427 50.8179 1.13458 67.9351 10.3702C83.3986 18.7136 75.462 13.5434 85.4981 29.8057Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M28 20L36 20L31 29H18L28 20Z" fill="currentColor" fillOpacity="0.15" /><circle cx="12" cy="34" r="7" fill="var(--dark2)" stroke="currentColor" strokeWidth="3" /><circle cx="36" cy="34" r="7" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="12" cy="34" r="2" fill="var(--orange)" /><circle cx="36" cy="34" r="2" fill="var(--orange)" /><path d="M12 34L22 20H32L36 34" stroke="currentColor" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 20L18 29H31" stroke="currentColor" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="cat-t">Bike</div>
              <div className="cat-s">Motorcycle · Scooter</div>
              <div className="cat-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Truck */}
            <div className="cat r r2" onClick={() => { handleSelectWelcomeCategory('Truck'); setIsWelcomeOpen(true); }}>
              <div className="cat-media"><img src={truckCategoryImage} alt="Commercial cargo truck" /></div>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M13.2504 70.8354C1.90962 54.06 6.3813 30.6558 23.3644 16.9205C40.3475 3.18526 64.912 3.12061 80.9997 16.7628C97.0874 30.4049 98.6659 54.5492 84.4447 70.2801C70.2235 86.011 44.9745 88.0065 29.6105 74.9221C26.1738 71.9942 24.5912 87.6108 13.2504 70.8354Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M4 16H22V26H4V16Z" fill="currentColor" fillOpacity="0.15" /><path d="M4 29V14C4 12.9 4.9 12 6 12H24V28" stroke="currentColor" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 18H35C38 18 40 19 42 22L44 29V33C44 34.1 43.1 35 42 35H38" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M19 35H29" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><circle cx="14" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="34" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="14" cy="35" r="2" fill="var(--orange)" /><circle cx="34" cy="35" r="2" fill="var(--orange)" /></svg>
              </div>
              <div className="cat-t">Truck</div>
              <div className="cat-s">Light · Heavy Commercial</div>
              <div className="cat-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Bus / Van */}
            <div className="cat r r3" onClick={() => { handleSelectWelcomeCategory('Bus / Van'); setIsWelcomeOpen(true); }}>
              <div className="cat-media"><img src={busVanCategoryImage} alt="Passenger minibus" /></div>
              <div className="svg-wrap">
                <svg className="bg-shape" viewBox="0 0 100 100" fill="currentColor"><path d="M78.647 8.35858C96.0181 12.0232 107.13 29.6245 104.915 47.3821C102.7 65.1396 87.7554 78.4323 69.8327 79.5183C51.9099 80.6043 35.5398 69.2133 29.611 51.7828C23.6823 34.3523 30.6695 15.228 46.5413 6.46746C56.6343 0.887648 49.3789 2.1802 78.647 8.35858Z" /></svg>
                <svg className="icon" viewBox="0 0 48 48" fill="none"><path d="M8 14H40V24H8V14Z" fill="currentColor" fill-opacity="0.15" /><path d="M6 31V12C6 9.8 7.8 8 10 8H38C41.3 8 44 10.7 44 14V31C44 33.2 42.2 35 40 35H38" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 35H9" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><path d="M19 35H29" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><path d="M6 24H44" stroke="currentColor" stroke-width="3" stroke-linecap="round" /><circle cx="14" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="34" cy="35" r="5" fill="var(--dark2)" stroke="currentColor" stroke-width="3" /><circle cx="14" cy="35" r="2" fill="var(--orange)" /><circle cx="34" cy="35" r="2" fill="var(--orange)" /></svg>
              </div>
              <div className="cat-t">Bus / Van</div>
              <div className="cat-s">Mini · Passenger · Tempo</div>
              <div className="cat-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BAND / ENQUIRY TRIGGER */}
      <section className="section" id="enquiry" style={{ background: 'var(--dark2)', textAlign: 'center' }}>
        <div className="section-in">
          <div className="tag r" style={{ color: 'rgba(255,255,255,.4)', justifyContent: 'center' }}>
            <span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'rgba(255,255,255,.2)' }} />
            Enquiry
          </div>
          <h2 className="sec-h r" style={{ color: '#fff', textAlign: 'center' }}>We Have Creative<br />Services <em>For You</em></h2>
          <p className="sec-p r" style={{ color: 'rgba(255,255,255,.4)', margin: '16px auto 36px', textAlign: 'center', maxWidth: '420px' }}>
            Tell us what you're looking for and verified dealers in Ranchi will compete to give you the best price.
          </p>
          <button className="btn-fill r r1" style={{ fontSize: '15px', padding: '16px 44px' }} onClick={() => setIsModalOpen(true)}>Submit Enquiry Now →</button>
          <p style={{ marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,.2)', fontWeight: 300 }} className="r r2">Shared only with matched dealers · Never sold · Always free</p>
        </div>
      </section>

      {/* WHY CHOOSE US CAROUSEL */}
      <section className="wcu-sec" id="trust">
        <div className="wcu-inner">
          
          {/* Header */}
          <div className="wcu-top">
            <div className="wcu-top-left">
              <div className="wcu-eyebrow r">Why Choose Us</div>
              <h2 className="wcu-h r r1">Find Your Best Deal —<br /><em>Free, Fast</em> &amp; Verified</h2>
            </div>
            <div className="wcu-nav-btns">
              <button className="wcu-nav-btn" id="wcuPrev" aria-label="Previous slide" disabled={wcuIdx <= 0} onClick={() => handleWcuGoTo(wcuIdx - 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button className="wcu-nav-btn" id="wcuNext" aria-label="Next slide" disabled={wcuIdx >= maxWcuIdx} onClick={() => handleWcuGoTo(wcuIdx + 1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="wcu-viewport">
            <div
              className="wcu-track"
              id="wcuTrack"
              ref={wcuTrackRef}
              onTouchStart={handleWcuTouchStart}
              onTouchMove={handleWcuTouchMove}
              onTouchEnd={handleWcuTouchEnd}
              style={{ display: 'flex', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
            >
              
              {/* Card 1 — Free to Use */}
              <div className="wcu-card r">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="16" r="12"/>
                    <line x1="16" y1="8" x2="16" y2="10"/>
                    <line x1="16" y1="22" x2="16" y2="24"/>
                    <path d="M12 12.5a4 4 0 0 1 8 0c0 2.5-4 4-4 6"/>
                    <circle cx="16" cy="20.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <div className="wcu-card-t">100% Free for Buyers</div>
                <div className="wcu-card-d">BuyWheels charges dealers — never you. Submit your enquiry, get real quotes, close the deal. Zero cost, always.</div>
                <div className="wcu-card-num">01</div>
              </div>

              {/* Card 2 — Verified Dealers */}
              <div className="wcu-card r r1">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3L5 7.5v8C5 22 10 27.5 16 29c6-1.5 11-7 11-13.5v-8L16 3z"/>
                    <polyline points="11 16 14.5 19.5 21 13"/>
                  </svg>
                </div>
                <div className="wcu-card-t">500+ Verified Dealers</div>
                <div className="wcu-card-d">Every showroom is manually vetted — credentials checked, ratings reviewed. Only trusted dealers make the cut.</div>
                <div className="wcu-card-num">02</div>
              </div>

              {/* Card 3 — Fast Response */}
              <div className="wcu-card r r2">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="16" r="12"/>
                    <polyline points="16 9 16 16 21 19"/>
                    <path d="M24 6l2-2M8 6L6 4" strokeWidth="1.4"/>
                  </svg>
                </div>
                <div className="wcu-card-t">Response in 2 Hours</div>
                <div className="wcu-card-d">Matched dealers respond fast — average 2 hours. No chasing, no waiting. Real quotes land directly with you.</div>
                <div className="wcu-card-num">03</div>
              </div>

              {/* Card 4 — All Vehicle Types */}
              <div className="wcu-card r r3">
                <div className="wcu-card-ico">
                  <svg width="28" height="26" viewBox="0 0 34 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 18v2h3v-1h16v1h3v-2"/>
                    <path d="M3 18l2-6h22l2 6H3z"/>
                    <path d="M8 12l2.5-5h11L24 12"/>
                    <circle cx="9" cy="18.5" r="2.5" fill="currentColor" stroke="none" opacity=".15"/>
                    <circle cx="9" cy="18.5" r="1.5"/>
                    <circle cx="23" cy="18.5" r="2.5" fill="currentColor" stroke="none" opacity=".15"/>
                    <circle cx="23" cy="18.5" r="1.5"/>
                    <line x1="12" y1="15" x2="20" y2="15"/>
                    <circle cx="29" cy="8" r="3.5"/>
                    <circle cx="21" cy="8" r="3.5"/>
                    <path d="M21 8l3-5 5 5"/>
                  </svg>
                </div>
                <div className="wcu-card-t">Cars, Bikes &amp; Trucks</div>
                <div className="wcu-card-d">Hatchbacks to SUVs, scooters to superbikes, LCVs to heavy trucks — every vehicle segment, one platform.</div>
                <div className="wcu-card-num">04</div>
              </div>

              {/* Card 5 — No Spam */}
              <div className="wcu-card r r4">
                <div className="wcu-card-ico">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18.9 19.5 19.5 0 0 1 5.07 12 19.8 19.8 0 0 1 1.99 3.38 2 2 0 0 1 3.96 1h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11l-.9.9a16 16 0 0 0 6.59 6.59l.9-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" transform="translate(5,3)"/>
                    <line x1="2" y1="2" x2="30" y2="30" strokeWidth="1.6"/>
                  </svg>
                </div>
                <div className="wcu-card-t">No Spam Calls</div>
                <div className="wcu-card-d">Your number goes only to dealers matched to your exact search. We never sell or share your data — guaranteed.</div>
                <div className="wcu-card-num">05</div>
              </div>

            </div>
          </div>

          {/* Dots Indicator */}
          <div className="wcu-dots" id="wcuDots">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`wcu-dot ${wcuIdx === i ? 'on' : ''}`} onClick={() => handleWcuGoTo(i)}></div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div className="final-in">
          <h2 className="r">Ready to Find<br />Your Best Deal?</h2>
          <p className="r r1">Submit your enquiry in 60 seconds. Let verified dealers compete for your business.</p>
          <button className="btn-dark r r2" onClick={() => setIsWelcomeOpen(true)}>Submit Enquiry Now</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-in">
          <div className="foot-logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Logo height={48} mode="dark" />
          </div>
          <div className="foot-links">
            <Link to="/dealer">Become a Dealer</Link>
            <Link to="/agent">Become an Agent</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="foot-copy">© 2025 BuyWheels. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
