import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { saveBuyerEnquiry } from '../lib/supabase';
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
import heroShowroomImg from '../assets/hero_showroom_vehicles_isolated.png';
import catCarImage from '../assets/cat_car.png';
import catBikeImage from '../assets/cat_bike.png';
import catEvImage from '../assets/cat_ev.png';

// Import CSS stylesheets for styling isolation
import '../styles/reset.css';
import '../styles/buyer.css';

const FUEL_THEMES = {
  petrol:   { accent: '#FF6A00', accentD: '#e05c00', bg: 'rgba(255,106,0,0.08)', border: 'rgba(255,106,0,0.3)', glow: 'rgba(255,106,0,0.18)' },
  diesel:   { accent: '#2563EB', accentD: '#1d4ed8', bg: 'rgba(37,99,235,0.08)', border: 'rgba(37,99,235,0.3)', glow: 'rgba(37,99,235,0.18)' },
  cng:      { accent: '#D97706', accentD: '#b45309', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.3)', glow: 'rgba(217,119,6,0.18)' },
  electric: { accent: '#16A34A', accentD: '#15803d', bg: 'rgba(22,163,74,0.08)', border: 'rgba(22,163,74,0.3)', glow: 'rgba(22,163,74,0.18)' }
};

const COMPARISON_DATA = {
  creta: {
    name: 'Hyundai Creta (SX)',
    segment: 'SUV',
    exShowroom: '₹14,80,000',
    dealers: [
      {
        name: 'Dealer A (Ranchi Motors)',
        dealType: 'Good Deal',
        discount: '₹22,000',
        finalPrice: '₹14,58,000',
        benefits: [
          '3-Year Extended Warranty',
          'Free Basic Accessories Kit',
          'Fast 7-Day Delivery',
          'Standard Support'
        ],
        ctaText: 'View Ranchi Offer',
        popular: false
      },
      {
        name: 'Dealer B (Jamshedpur Wheels)',
        dealType: 'BEST DEAL',
        discount: '₹55,000',
        finalPrice: '₹14,25,000',
        benefits: [
          'Everything in Dealer A',
          'Direct Cash Discount of ₹55k',
          '1-Year Zero-Dep Insurance Free',
          'Immediate Stock/Delivery',
          'Priority 24/7 Support'
        ],
        ctaText: 'Claim Jamshedpur Deal',
        popular: true
      },
      {
        name: 'Dealer C (Dhanbad Auto)',
        dealType: 'Competitive',
        discount: '₹30,000',
        finalPrice: '₹14,50,000',
        benefits: [
          'Exchange Bonus up to ₹20,000',
          'Free First 3 Services',
          'Road-Side Assistance (RSA)',
          '10-Day Delivery'
        ],
        ctaText: 'View Dhanbad Offer',
        popular: false
      }
    ]
  },
  swift: {
    name: 'Maruti Swift (VXI)',
    segment: 'Hatchback',
    exShowroom: '₹7,30,000',
    dealers: [
      {
        name: 'Dealer A (Ranchi Motors)',
        dealType: 'Good Deal',
        discount: '₹12,000',
        finalPrice: '₹7,18,000',
        benefits: [
          '2-Year Extended Warranty',
          'Standard Accessories',
          '5-Day Delivery',
          'Standard Support'
        ],
        ctaText: 'View Ranchi Offer',
        popular: false
      },
      {
        name: 'Dealer B (Jamshedpur Wheels)',
        dealType: 'BEST DEAL',
        discount: '₹35,000',
        finalPrice: '₹6,95,000',
        benefits: [
          'Everything in Dealer A',
          'Direct Cash Discount of ₹35k',
          'Free Registration Support',
          'Immediate Stock/Delivery',
          'Priority 24/7 Support'
        ],
        ctaText: 'Claim Jamshedpur Deal',
        popular: true
      },
      {
        name: 'Dealer C (Dhanbad Auto)',
        dealType: 'Competitive',
        discount: '₹18,000',
        finalPrice: '₹7,12,000',
        benefits: [
          'Corporate Discount & RSA',
          'Free Seat Covers & Matting',
          'Free 1st Service',
          '7-Day Delivery'
        ],
        ctaText: 'View Dhanbad Offer',
        popular: false
      }
    ]
  },
  nexonEv: {
    name: 'Tata Nexon EV (Fearless)',
    segment: 'Electric SUV',
    exShowroom: '₹16,99,000',
    dealers: [
      {
        name: 'Dealer A (Ranchi Motors)',
        dealType: 'Good Deal',
        discount: '₹25,000',
        finalPrice: '₹16,74,000',
        benefits: [
          'Free Home Charger Installation',
          '8-Year Battery Warranty',
          '15-Day Delivery',
          'Standard Support'
        ],
        ctaText: 'View Ranchi Offer',
        popular: false
      },
      {
        name: 'Dealer B (Jamshedpur Wheels)',
        dealType: 'BEST DEAL',
        discount: '₹70,000',
        finalPrice: '₹16,29,000',
        benefits: [
          'Everything in Dealer A',
          'Additional ₹45,000 Discount',
          'Free 3-Year Charging Network Access',
          'Immediate Stock/Delivery',
          'Priority 24/7 Support'
        ],
        ctaText: 'Claim Jamshedpur Deal',
        popular: true
      },
      {
        name: 'Dealer C (Dhanbad Auto)',
        dealType: 'Competitive',
        discount: '₹40,000',
        finalPrice: '₹16,59,000',
        benefits: [
          'Free Charging Cable & Accessories',
          'Free RSA for 5 Years',
          'Tata ZConnect App (3 Yrs Free)',
          '10-Day Delivery'
        ],
        ctaText: 'View Dhanbad Offer',
        popular: false
      }
    ]
  }
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedCompareCar, setSelectedCompareCar] = useState('creta');

  useEffect(() => {
    if (!isWelcomeOpen) {
      setUploadedFiles([]);
    }
  }, [isWelcomeOpen]);

  // Why Choose Us Carousel State
  const [wcuIdx, setWcuIdx] = useState(0);
  const [wcuVisibleCount, setWcuVisibleCount] = useState(4);
  const wcuTrackRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchDxRef = useRef(0);

  // Live ticker for premium hero
  const TICKER_MESSAGES = [
    '58 dealer quotes matched in Jharkhand today',
    'Ranchi: Tata Nexon XT quotes down ₹12,000 this week',
    'Dhanbad: Maruti Swift VXi most enquired today',
    'Jamshedpur: 3 dealers competing on Hyundai Creta',
    'Average response time: under 2 hours · Always free',
  ];
  const [tickerIdx, setTickerIdx] = useState(0);

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

  // Rotate live ticker every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setTickerIdx(i => (i + 1) % TICKER_MESSAGES.length);
    }, 3500);
    return () => clearInterval(t);
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

      // Disable parallax on small screens to avoid pushing hero content below viewport.
      if (window.innerWidth < 760) {
        slowRef.current.forEach(el => { if (el) el.style.transform = ''; });
        midRef.current.forEach(el => { if (el) el.style.transform = ''; });
        fastRef.current.forEach(el => { if (el) el.style.transform = ''; });
        if (heroTextRef.current) heroTextRef.current.style.transform = '';
        if (heroCarRef.current) heroCarRef.current.style.transform = '';
        ticking = false;
        return;
      }

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
      const savedSubmission = await saveBuyerEnquiry(payload, uploadedFiles);
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
              <div className="wf-subtitle">Verified dealers across Jharkhand will respond within 2 hours.</div>
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

                      <DragDrop id="ddBuyer" label="Attach Documents (Optional)" onFilesChange={setUploadedFiles} />

                      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={welcomeSubmitting}>
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



      {/* Coming Soon Receipt Overlay */}
      <ComingSoonOverlay isOpen={isComingSoonOpen} data={comingSoonData} prefix="BW" onClose={() => { setIsComingSoonOpen(false); setComingSoonData(null); }} />

      {/* Re-open floating deal trigger button */}
      <button className={`wf-trigger ${!isWelcomeOpen ? 'show' : ''}`} id="wfTrigger" onClick={() => setIsWelcomeOpen(true)}>
        <div className="wf-trigger-dot"></div>
        Get Best Deal
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
            <li><a href="#compare" onClick={(e) => handleAnchorLink(e, 'compare')}>Compare Deals</a></li>
            <li><a href="#cats" onClick={(e) => handleAnchorLink(e, 'cats')}>Our Vehicles</a></li>
            <li><a href="#enquiry" onClick={(e) => handleAnchorLink(e, 'enquiry')}>Get Quotes</a></li>
            <li><Link to="/dealer" className="bw-link-accent" style={{ display: 'block', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none', transition: 'background 0.15s' }}>Dealer</Link></li>
            <li><Link to="/agent" className="bw-link-accent" style={{ display: 'block', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none', transition: 'background 0.15s' }}>Agent</Link></li>
          </ul>

          {/* CTA */}
          <button className="btn-nav" onClick={() => setIsWelcomeOpen(true)}>
            Get Best Deal
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
              Compare Prices.
              <span className="h1-line2">
                Get Your Best Deal
                {/* Floating stamps capsule badge */}
                <span className="hero-stamps-badge" aria-hidden="true">
                  {/* Stamp 1: Car icon */}
                  <span className="hero-stamp hero-stamp-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="2" />
                      <path d="M9 17h6" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                  </span>
                  {/* Stamp 2: Motorbike icon */}
                  <span className="hero-stamp hero-stamp-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m18 14-1-3" />
                      <path d="m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" />
                      <path d="M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" />
                      <circle cx="19" cy="17" r="3" />
                      <circle cx="5" cy="17" r="3" />
                    </svg>
                  </span>
                  {/* Stamp 3: Steering Wheel icon */}
                  <span className="hero-stamp hero-stamp-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="2.5" />
                      <path d="M12 12v10" />
                      <path d="M12 12L3.34 7" />
                      <path d="M12 12l8.66-5" />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            {/* Sub paragraph */}
            <p className="hero-premium-sub">
              Stop visiting multiple showrooms. BuyWheels connects you to verified dealerships across Jharkhand so you can compare real quotes and choose the best deal — all from one place, completely free.
            </p>

            {/* CTAs */}
            <div className="hero-premium-btns">
              <button
                id="heroGetQuotesBtn"
                className="btn-primary"
                onClick={() => setIsWelcomeOpen(true)}
              >
                Get Free Dealer Quotes
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button
                id="heroHowItWorksBtn"
                className="btn-secondary"
                onClick={(e) => handleAnchorLink(e, 'how')}
              >
                ▶ How It Works
              </button>
            </div>
          </div>

          <div className="hero-premium-visual">
            <img src={heroShowroomImg} alt="BuyWheels Cars, Bikes, and EVs Showroom" className="hero-visual-img" />
          </div>

        </div>

        {/* Corner stats chip */}
        <div className="hero-corner-chip" aria-label="BuyWheels platform stats">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
          </svg>
          <span className="hero-corner-chip-text">500+ Verified Dealers · ₹0 Cost to You</span>
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
          <p class="sec-p r">Three steps between you and the best vehicle deal in Jharkhand.</p>
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
              <div className="step-d">Verified dealers across Jharkhand compete and send you real, best-price quotes within hours.</div>
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

      {/* DEALER COMPARISON WIDGET */}
      <section className="section compare-section" id="compare">
        <div className="section-in">
          <div className="tag r">Live Comparison</div>
          <h2 className="sec-h r">Compare <em>Dealers</em></h2>
          <p className="sec-p r">Stop visiting multiple showrooms. BuyWheels negotiates with verified dealerships side-by-side to find your best deal.</p>

          {/* Model Toggle Buttons */}
          <div className="compare-selector-wrap r">
            <div className="compare-selector">
              {Object.keys(COMPARISON_DATA).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`compare-tab-btn ${selectedCompareCar === key ? 'active' : ''}`}
                  onClick={() => setSelectedCompareCar(key)}
                >
                  {COMPARISON_DATA[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="compare-grid mt-14 max-w-6xl mx-auto">
            {COMPARISON_DATA[selectedCompareCar].dealers.map((dealer, idx) => {
              return (
                <div
                  key={idx}
                  className={`compare-card transition-all duration-700 ${dealer.popular ? 'popular-card' : ''}`}
                >
                  {dealer.popular && (
                    <span className="popular-card-badge">
                      🏆 Overall Best Deal
                    </span>
                  )}
                  
                  {/* Top section: Dealer tag and Name */}
                  <div className="comp-card-header">
                    <span className="compare-tag" style={{ background: dealer.popular ? 'rgba(255,106,0,0.15)' : '#f3f4f6', color: dealer.popular ? 'var(--orange)' : 'var(--dark)' }}>
                      {dealer.dealType}
                    </span>
                    <h3 className="compare-dealer-name">{dealer.name}</h3>
                  </div>

                  {/* Middle section: Price & Savings */}
                  <div className="comp-card-price-section">
                    <div className="price-primary-row">
                      <p className="compare-price">{dealer.finalPrice}</p>
                      <span className="savings-highlight">Save {dealer.discount}</span>
                    </div>
                    <div className="compare-savings">
                      <span>Ex-Showroom: {COMPARISON_DATA[selectedCompareCar].exShowroom}</span>
                    </div>
                  </div>

                  <hr className="compare-card-divider" />

                  {/* Benefits section (fills empty space) */}
                  <div className="comp-card-benefits">
                    <ul className="compare-benefits">
                      {dealer.benefits.slice(0, 4).map((benefit, bIdx) => (
                        <li key={bIdx} className="benefit-item">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: dealer.popular ? 'var(--orange)' : '#16a34a', flexShrink: 0 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="benefit-text">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom section: CTA button */}
                  <div className="comp-card-action">
                    <button
                      type="button"
                      className={`compare-btn ${dealer.popular ? 'btn-pill-primary' : 'btn-pill-outline'}`}
                      onClick={() => {
                        let brandName = 'Hyundai';
                        let budgetVal = '₹10–15L';
                        let fuelVal = 'petrol';
                        let slideNum = 1;

                        if (selectedCompareCar === 'swift') {
                          brandName = 'Maruti Suzuki';
                          budgetVal = '₹6–10L';
                          fuelVal = 'petrol';
                          slideNum = 1;
                        } else if (selectedCompareCar === 'nexonEv') {
                          brandName = 'Tata Motors';
                          budgetVal = '₹15–25L';
                          fuelVal = 'electric';
                          slideNum = 2; // Jump directly to detail form for electric EV
                        }

                        setWelcomeCategory(selectedCompareCar === 'nexonEv' ? 'EV' : 'Car');
                        setWelcomeFuel(fuelVal);
                        setWelcomeForm(prev => ({
                          ...prev,
                          brand: brandName,
                          budget: budgetVal
                        }));
                        setWelcomeSlide(slideNum);
                        setIsWelcomeOpen(true);
                      }}
                    >
                      {dealer.ctaText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section cats-sec" id="cats">
        <div className="section-in">
          <div className="cats-header r">
            <div className="tag-centered">EXPLORE TOP CATEGORIES</div>
            <h2 className="sec-h-centered">Find Your Perfect Ride</h2>
          </div>
          <div className="cats-grid-new">
            
            {/* Card 1: Cars */}
            <div className="cat-card new-car-card r" onClick={() => { handleSelectWelcomeCategory('Car'); setIsWelcomeOpen(true); }}>
              <div className="cat-card-glow orange-glow" />
              <div className="cat-card-info">
                <h3 className="cat-card-title">Cars</h3>
                <p className="cat-card-subtitle">Explore 1000+ cars</p>
                <button className="cat-card-btn">EXPLORE CARS &rarr;</button>
              </div>
              <div className="cat-card-img-wrap">
                <img src={catCarImage} alt="Cars" className="cat-car-img" />
              </div>
            </div>

            {/* Card 2: Bikes */}
            <div className="cat-card new-bike-card r r1" onClick={() => { handleSelectWelcomeCategory('Bike / Scooter'); setIsWelcomeOpen(true); }}>
              <div className="cat-card-glow blue-glow" />
              <div className="cat-card-info">
                <h3 className="cat-card-title">Bikes</h3>
                <p className="cat-card-subtitle">Explore 500+ bikes</p>
                <button className="cat-card-btn">EXPLORE BIKES &rarr;</button>
              </div>
              <div className="cat-card-img-wrap">
                <img src={catBikeImage} alt="Bikes" className="cat-bike-img" />
              </div>
            </div>

            {/* Card 3: EVs */}
            <div className="cat-card new-ev-card r r2" onClick={() => { handleSelectWelcomeCategory('EV'); setIsWelcomeOpen(true); }}>
              <div className="cat-card-glow green-glow" />
              <div className="cat-card-info">
                <h3 className="cat-card-title">EVs</h3>
                <p className="cat-card-subtitle">Drive the future</p>
                <button className="cat-card-btn">EXPLORE EVS &rarr;</button>
              </div>
              <div className="cat-card-img-wrap">
                <img src={catEvImage} alt="EVs" className="cat-ev-img" />
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
            Tell us what you're looking for and verified dealers across Jharkhand will compete to give you the best price.
          </p>
          <button className="btn-primary r r1" style={{ fontSize: '15px', padding: '16px 44px' }} onClick={() => { setWelcomeSlide(0); setIsWelcomeOpen(true); }}>Submit Enquiry Now →</button>
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

      {/* FAQ SECTION */}
      <section className="section faq-sec" id="faq">
        <div className="section-in">
          <div className="faq-grid">
            <div className="faq-info">
              <div className="tag r">FAQs</div>
              <h2 className="sec-h r r1">Frequently Asked<br /><em>Questions</em></h2>
              <p className="sec-p r r2">
                Everything you need to know about the product and process. Can't find the answer you're looking for? Feel free to contact our friendly support team.
              </p>
            </div>
            <div className="faq-list r r3">
              {[
                { q: "How does BuyWheels get me the best price?", a: "Dealers compete for your business, driving prices down." },
                { q: "Is this service really free?", a: "Yes, always 100% free for buyers. Dealers pay a fee to participate." },
                { q: "When will I get quotes after submitting?", a: "Usually within 2 hours of submitting your enquiry." },
                { q: "Do you share my phone number with every dealer?", a: "No, only matched, verified dealers who bid on your request get access to contact you." }
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
          <h2 className="r">Ready to Find<br />Your Best Deal?</h2>
          <p className="r r1">Submit your enquiry in 60 seconds. Let verified dealers compete for your business.</p>
          <button className="btn-secondary r r2" onClick={() => setIsWelcomeOpen(true)}>Submit Enquiry Now</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-in foot-in--rich">
          <div className="foot-logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Logo height={48} mode="dark" />
          </div>
          <div className="foot-links">
            <Link to="/dealer">Become a Dealer</Link>
            <Link to="/agent">Become an Agent</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="foot-social">
            <div className="foot-social-label">Follow Us</div>
            <div className="foot-social-icons">
              {/* Instagram Cars */}
              <a href="https://www.instagram.com/cars.buywheels?igsh=Y2R3MXFuMWRobW03" target="_blank" rel="noopener noreferrer" className="foot-social-btn" aria-label="Instagram – BuyWheels Cars">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Cars</span>
              </a>
              {/* Instagram Bikes */}
              <a href="https://www.instagram.com/bikes.buywheels?igsh=ZmhuZDIycnR1anJ6" target="_blank" rel="noopener noreferrer" className="foot-social-btn" aria-label="Instagram – BuyWheels Bikes">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Bikes</span>
              </a>
              {/* YouTube Cars */}
              <a href="https://youtube.com/@cars.buywheels?si=e8q4eaP_z8bUj915" target="_blank" rel="noopener noreferrer" className="foot-social-btn foot-social-btn--yt" aria-label="YouTube – BuyWheels Cars">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                <span>Cars</span>
              </a>
              {/* YouTube Bikes */}
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
