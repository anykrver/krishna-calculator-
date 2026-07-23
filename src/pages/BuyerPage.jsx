import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { saveBuyerEnquiry } from '../lib/supabase';
import DragDrop from '../components/DragDrop';
import ComingSoonOverlay from '../components/ComingSoonOverlay';
import Logo from '../components/Logo';
import vehicleCategoriesImage from '../assets/vehicle-categories-ai.png';
import busVanCategoryImage from '../assets/bus-van-category-ai.png';
import petrolFuelImage from '../assets/fuel-types/petrol.svg';
import dieselFuelImage from '../assets/fuel-types/diesel.svg';
import cngFuelImage from '../assets/fuel-types/cng.svg';
import electricFuelImage from '../assets/fuel-types/electric.svg';
import heroShowroomImg from '../assets/hero_showroom_vehicles_isolated.png';
import catCarImage from '../assets/cat_car.png';
import catBikeImage from '../assets/cat_bike.png';
import catEvImage from '../assets/cat_ev.png';
import catThreeWheelerImage from '../assets/cat_three_wheeler.png';

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

const POPULAR_CAR_BRANDS = [
  { name: 'Maruti Suzuki', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/maruti.jpg?w=200&q=50' },
  { name: 'Hyundai', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/hyundai.jpg?w=200&q=50' },
  { name: 'Tata', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/tata.jpg?w=200&q=50' },
  { name: 'Mahindra', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mahindra.jpg?w=200&q=50' },
  { name: 'Toyota', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/toyota.jpg?w=200&q=50' },
  { name: 'Kia', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/kia.jpg?w=200&q=50' },
  { name: 'Honda', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/honda.jpg?w=200&q=50' },
  { name: 'MG', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mg.jpg?w=200&q=50' },
  { name: 'Skoda', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/skoda.jpg?w=200&q=50' },
  { name: 'Volkswagen', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/volkswagen.jpg?w=200&q=50' },
  { name: 'Citroen', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/citroen.jpg?w=200&q=50' },
  { name: 'Renault', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/renault.jpg?w=200&q=50' },
  { name: 'Nissan', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/nissan.jpg?w=200&q=50' },
  { name: 'Jeep', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/jeep.jpg?w=200&q=50' },
  { name: 'BMW', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/bmw.jpg?w=200&q=50' }
];

const POPULAR_EV_BRANDS = [
  { name: 'Tata EV', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/tata.jpg?w=200&q=50' },
  { name: 'Ola Electric', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ola.jpg?w=200&q=50' },
  { name: 'Ather', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ather.jpg?w=200&q=50' },
  { name: 'MG EV', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mg.jpg?w=200&q=50' },
  { name: 'Mahindra EV', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mahindra.jpg?w=200&q=50' },
  { name: 'Hyundai EV', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/hyundai.jpg?w=200&q=50' },
  { name: 'TVS iQube', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/tvs.jpg?w=200&q=50' },
  { name: 'Chetak EV', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/bajaj.jpg?w=200&q=50' },
  { name: 'BMW EV', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/bmw.jpg?w=200&q=50' }
];

const POPULAR_BIKE_BRANDS = [
  { name: 'Royal Enfield', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/royalenfield.jpg?w=200&q=50' },
  { name: 'TVS', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/tvs.jpg?w=200&q=50' },
  { name: 'Bajaj', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/bajaj.jpg?w=200&q=50' },
  { name: 'Hero MotoCorp', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/heromotocorp.jpg?w=200&q=50' },
  { name: 'Honda', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/honda.jpg?w=200&q=50' },
  { name: 'Suzuki', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/suzuki.jpg?w=200&q=50' },
  { name: 'Jawa', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/jawa.jpg?w=200&q=50' },
  { name: 'Yamaha', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/yamaha.jpg?w=200&q=50' },
  { name: 'KTM', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ktm.jpg?w=200&q=50' },
  { name: 'Yezdi', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/yezdi.jpg?w=200&q=50' },
  { name: 'Aprilia', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/aprilia.jpg?w=200&q=50' },
  { name: 'Vida', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/hero-vida.jpg?w=200&q=50' },
  { name: 'BMW Motorrad', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/bmw.jpg?w=200&q=50' },
  { name: 'Ducati', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ducati.jpg?w=200&q=50' },
  { name: 'Harley-Davidson', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/harleydavidson.jpg?w=200&q=50' },
  { name: 'Kawasaki', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/kawasaki.jpg?w=200&q=50' },
  { name: 'Triumph', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/triumph.jpg?w=200&q=50' },
  { name: 'Ather', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ather.jpg?w=200&q=50' },
  { name: 'Ola Electric', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ola.jpg?w=200&q=50' }
];

const POPULAR_MODELS = {
  'Tata': ['Nexon', 'Punch', 'Harrier', 'Safari', 'Tiago', 'Altroz', 'Curvv'],
  'Tata Motors': ['Nexon', 'Punch', 'Harrier', 'Safari', 'Tiago', 'Altroz', 'Curvv', 'Nexon EV', 'Punch EV'],
  'Tata EV': ['Nexon EV', 'Punch EV', 'Tiago EV', 'Tigor EV', 'Curvv EV'],
  'Maruti Suzuki': ['Swift', 'Brezza', 'Baleno', 'Ertiga', 'Fronx', 'Grand Vitara', 'Dzire'],
  'Hyundai': ['Creta', 'Venue', 'i20', 'Exster', 'Verna', 'Alcazar', 'Tucson'],
  'Hyundai EV': ['Ioniq 5', 'Kona Electric'],
  'Mahindra': ['Thar', 'Scorpio-N', 'XUV700', 'XUV3XO', 'Bolero', 'Scorpio Classic'],
  'Mahindra EV': ['XUV400 EV', 'BE 05'],
  'Kia': ['Seltos', 'Sonet', 'Carens', 'EV6'],
  'Toyota': ['Fortuner', 'Innova Hycross', 'Urban Cruiser Taisor', 'Glanza', 'Hilux'],
  'Honda': ['City', 'Elevate', 'Amaze', 'Activa 6G', 'Shine 125', 'CB350'],
  'MG': ['Hector', 'Astor', 'Windsor EV', 'Comet EV', 'ZS EV'],
  'MG EV': ['Windsor EV', 'Comet EV', 'ZS EV'],
  'Volkswagen': ['Virtus', 'Taigun', 'Tiguan'],
  'Skoda': ['Slavia', 'Kushaq', 'Kodiaq'],
  'Renault': ['Kiger', 'Triber', 'Kwid'],
  'Nissan': ['Magnite'],
  'BYD': ['Atto 3', 'Seal', 'e6'],
  'Tesla': ['Model 3', 'Model Y'],

  'Hero MotoCorp': ['Splendor Plus', 'HF Deluxe', 'Xpulse 200 4V', 'Mavrick 440', 'Pleasure Plus', 'Xtreme 160R'],
  'TVS': ['Jupiter 110', 'Apache RTR 160 4V', 'Ntorq 125', 'Raider 125', 'iQube EV', 'Ronin'],
  'TVS iQube': ['iQube S', 'iQube ST', 'iQube Base'],
  'Bajaj': ['Pulsar N160', 'Pulsar 150', 'Chetak EV', 'Dominar 400', 'Freedom 125 CNG', 'Platina 110'],
  'Royal Enfield': ['Classic 350', 'Hunter 350', 'Bullet 350', 'Meteor 350', 'Himalayan 450', 'Continental GT 650'],
  'Yamaha': ['MT-15 V2', 'R15 V4', 'FZ-S V4', 'RayZR 125', 'Aerox 155'],
  'Suzuki': ['Access 125', 'Gixxer SF 150', 'Burgman Street', 'V-Strom SX'],
  'KTM': ['Duke 200', 'Duke 390', 'RC 200', 'Adventure 390'],
  'Ather': ['450X', '450S', 'Rizta Apex'],
  'Ola Electric': ['S1 Pro Gen 2', 'S1 Air', 'S1 X', 'Roadster'],
  'Chetak EV': ['Chetak Premium 2024', 'Chetak Urbane'],
  'VIDA': ['V1 Pro', 'V1 Plus'],
  'Revolt': ['RV400', 'RV400 BRZ'],
  'Aprilia': ['RS 457', 'SR 160'],
  'Vespa': ['ZX 125', 'VXT 150'],
  'Triumph': ['Speed 400', 'Scrambler 400 X'],
  'Jawa / Yezdi': ['Jawa 350', '42 Bobber', 'Yezdi Roadster'],
  'BMW Motorrad': ['G 310 R', 'G 310 GS', 'CE 02 EV']
};

export default function BuyerPage() {
  // Modal Overlays
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonData, setComingSoonData] = useState(null);
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  // Welcome Popup Wizard States
  const [welcomeSlide, setWelcomeSlide] = useState(0);
  const [welcomeCategory, setWelcomeCategory] = useState('Car');
  const [welcomeFuel, setWelcomeFuel] = useState('petrol');
  const [welcomeTransmission, setWelcomeTransmission] = useState('automatic');
  const [welcomeBudget, setWelcomeBudget] = useState('₹10–15L');
  const [welcomeBodyStyle, setWelcomeBodyStyle] = useState('SUV');
  const [welcomeBrandOtherText, setWelcomeBrandOtherText] = useState('');
  const [welcomeForm, setWelcomeForm] = useState({
    owner_name: '',
    brand: '',
    budget: '₹10–15L',
    city: '',
    phone: ''
  });
  const [welcomePhoneError, setWelcomePhoneError] = useState(false);
  const [welcomeSubmitting, setWelcomeSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedCompareCar, setSelectedCompareCar] = useState('creta');
  const [activePpTier, setActivePpTier] = useState('four-wheeler');

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

  // Auto-open welcome popup after 3000ms (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomeOpen(true);
    }, 3000);
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
    const fuel = (welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') ? welcomeFuel : 'electric';
    const c = FUEL_THEMES[fuel] || FUEL_THEMES.electric;
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
    setWelcomeBrandOtherText('');
    setWelcomeSlide(1); // Go to brand selection slide
  };

  const handleSelectWelcomeBrand = (brandName) => {
    setWelcomeForm(prev => ({ ...prev, brand: brandName }));
    setTimeout(() => {
      if (welcomeCategory === 'Car' || welcomeCategory === 'EV') {
        setWelcomeSlide(2); // Go to body style selection
      } else {
        // Bike / Scooter
        setWelcomeSlide(3); // Skip body style, go to fuel selection
      }
    }, 220);
  };

  const handleSelectWelcomeBodyStyle = (styleName) => {
    setWelcomeBodyStyle(styleName);
    setTimeout(() => {
      if (welcomeCategory === 'Car') {
        setWelcomeSlide(3); // Go to fuel selection
      } else {
        // EV: skips fuel & transmission
        setWelcomeFuel('electric');
        setWelcomeTransmission('automatic');
        setWelcomeSlide(5); // Go directly to budget selection
      }
    }, 220);
  };

  const handleSelectWelcomeFuel = (fuel) => {
    setWelcomeFuel(fuel);
    setTimeout(() => {
      setWelcomeSlide(4); // Go to transmission selection
    }, 220);
  };

  const handleSelectWelcomeTransmission = (trans) => {
    setWelcomeTransmission(trans);
    setTimeout(() => {
      setWelcomeSlide(5); // Go to budget selection
    }, 220);
  };

  const handleSelectWelcomeBudget = (budgetVal) => {
    setWelcomeBudget(budgetVal);
    setWelcomeForm(prev => ({ ...prev, budget: budgetVal }));
    setTimeout(() => {
      setWelcomeSlide(6); // Go to details form
    }, 220);
  };

  const handleWelcomeBack = () => {
    if (welcomeSlide === 1) {
      setWelcomeSlide(0);
    } else if (welcomeSlide === 2) {
      setWelcomeSlide(1);
    } else if (welcomeSlide === 3) {
      if (welcomeCategory === 'Bike / Scooter') {
        setWelcomeSlide(1);
      } else {
        setWelcomeSlide(2);
      }
    } else if (welcomeSlide === 4) {
      setWelcomeSlide(3);
    } else if (welcomeSlide === 5) {
      if (welcomeCategory === 'EV') {
        setWelcomeSlide(2);
      } else {
        setWelcomeSlide(4);
      }
    } else if (welcomeSlide === 6) {
      setWelcomeSlide(5);
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
    const { owner_name, brand, city, phone } = welcomeForm;
    const finalBrand = brand === 'Other' ? welcomeBrandOtherText : brand;

    if (!owner_name || !finalBrand || !welcomeBudget || !city) {
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
      vehicle_type: (welcomeCategory === 'Car' || welcomeCategory === 'EV') ? `${welcomeCategory} (${welcomeBodyStyle})` : welcomeCategory,
      brand: finalBrand,
      budget: welcomeBudget,
      city,
      phone,
      fuel: (welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') ? welcomeFuel : (welcomeCategory === 'EV' ? 'electric' : ''),
      transmission: welcomeTransmission,
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
          {welcomeFuel === 'petrol' ? (
            <optgroup label="Motorcycle & Scooter Brands">
              {BIKE_BRANDS.petrol.map((brand) => <option key={brand}>{brand}</option>)}
            </optgroup>
          ) : (
            <optgroup label="Electric Two-Wheeler Brands">
              {BIKE_BRANDS.electric.map((brand) => <option key={brand}>{brand}</option>)}
            </optgroup>
          )}
          <option>Other</option>
        </>
      );
    } else if (type === 'EV') {
      return (
        <>
          <option value="" disabled>Select brand</option>
          <optgroup label="Electric Car Brands">
            <option>Tata Motors</option>
            <option>MG Motor</option>
            <option>BYD</option>
            <option>Mahindra</option>
            <option>Hyundai</option>
            <option>Kia</option>
          </optgroup>
          <optgroup label="Electric Two-Wheeler Brands">
            {BIKE_BRANDS.electric.map((brand) => <option key={brand}>{brand}</option>)}
          </optgroup>
          <option>Tesla</option>
          <option>Other</option>
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

                      {/* EV */}
                      <div className="wf-card" tabIndex={0} onClick={() => handleSelectWelcomeCategory('EV')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeCategory('EV'); }}>
                        <div className="wf-card-img">
                          <img src={catEvImage} alt="EV" loading="eager" />
                        </div>
                        <div className="wf-card-text">
                          <div className="wf-card-name">EV</div>
                          <div className="wf-card-desc">Electric Cars · Bikes · Scooters</div>
                        </div>
                        <div className="wf-card-arr">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                     </div>
                  </div>

                  {/* SLIDE 1: Brand Selection */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={handleWelcomeBack}>
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
                    <div className="wf-pick-label" style={{ marginBottom: '12px' }}>Choose your Brand</div>
                    <div className="wf-fuel-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {welcomeCategory === 'Car' && POPULAR_CAR_BRANDS.map(brand => (
                        <div
                          key={brand.name}
                          className={`wf-fuel-card ${welcomeForm.brand === brand.name ? 'selected' : ''}`}
                          data-fuel="petrol"
                          onClick={() => handleSelectWelcomeBrand(brand.name)}
                          style={{ padding: '8px 6px', gap: '4px', borderRadius: '10px', background: '#fff' }}
                        >
                          <div className="wf-fuel-ico" style={{ width: '100%', height: '52px', borderRadius: '8px', background: '#fff', border: '1px solid #f0f0f0', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                          <div className="wf-fuel-name" style={{ fontSize: '11px', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', marginTop: '2px' }}>{brand.name}</div>
                        </div>
                      ))}

                      {welcomeCategory === 'EV' && POPULAR_EV_BRANDS.map(brand => (
                        <div
                          key={brand.name}
                          className={`wf-fuel-card ${welcomeForm.brand === brand.name ? 'selected' : ''}`}
                          data-fuel="electric"
                          onClick={() => handleSelectWelcomeBrand(brand.name)}
                          style={{ padding: '8px 6px', gap: '4px', borderRadius: '10px', background: '#fff' }}
                        >
                          <div className="wf-fuel-ico" style={{ width: '100%', height: '52px', borderRadius: '8px', background: '#fff', border: '1px solid #f0f0f0', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                          <div className="wf-fuel-name" style={{ fontSize: '11px', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', marginTop: '2px' }}>{brand.name}</div>
                        </div>
                      ))}

                      {welcomeCategory === 'Bike / Scooter' && POPULAR_BIKE_BRANDS.map(brand => (
                        <div
                          key={brand.name}
                          className={`wf-fuel-card ${welcomeForm.brand === brand.name ? 'selected' : ''}`}
                          data-fuel="electric"
                          onClick={() => handleSelectWelcomeBrand(brand.name)}
                          style={{ padding: '8px 6px', gap: '4px', borderRadius: '10px', background: '#fff' }}
                        >
                          <div className="wf-fuel-ico" style={{ width: '100%', height: '52px', borderRadius: '8px', background: '#fff', border: '1px solid #f0f0f0', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                          <div className="wf-fuel-name" style={{ fontSize: '11px', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', marginTop: '2px' }}>{brand.name}</div>
                        </div>
                      ))}

                      {/* Other brand option */}
                      <div
                        className={`wf-fuel-card ${welcomeForm.brand === 'Other' ? 'selected' : ''}`}
                        data-fuel="cng"
                        onClick={() => handleSelectWelcomeBrand('Other')}
                        style={{ padding: '8px 6px', gap: '4px', borderRadius: '10px', background: '#fff' }}
                      >
                        <div className="wf-fuel-ico" style={{ width: '100%', height: '52px', borderRadius: '8px', background: 'rgba(217, 119, 6, 0.08)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                          </svg>
                        </div>
                        <div className="wf-fuel-name" style={{ fontSize: '11px', fontWeight: '600', textAlign: 'center', marginTop: '2px' }}>Other</div>
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 2: Body Style Selection */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={handleWelcomeBack}>
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
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Choose Body Style</div>
                    <div className="wf-fuel-cards" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      
                      <div className={`wf-fuel-card ${welcomeBodyStyle === 'SUV' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeBodyStyle('SUV')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBodyStyle('SUV'); }}>
                        <div className="wf-fuel-ico" style={{ width: '48px', height: '48px' }}>
                          <img alt="SUV" src="https://ackodrive-prod.ackoassets.com/_next_static/icons/BrowseCard/SUV.svg" style={{ width: '36px', height: '36px' }} />
                        </div>
                        <div className="wf-fuel-name">SUV</div>
                        <div className="wf-fuel-desc">High seating · Sporty</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBodyStyle === 'Sedan' ? 'selected' : ''}`} data-fuel="diesel" tabIndex={0} onClick={() => handleSelectWelcomeBodyStyle('Sedan')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBodyStyle('Sedan'); }}>
                        <div className="wf-fuel-ico" style={{ width: '48px', height: '48px' }}>
                          <img alt="Sedan" src="https://ackodrive-prod.ackoassets.com/_next_static/icons/BrowseCard/sedan.svg" style={{ width: '36px', height: '36px' }} />
                        </div>
                        <div className="wf-fuel-name">Sedan</div>
                        <div className="wf-fuel-desc">Comfortable · Sleek</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBodyStyle === 'Hatchback' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeBodyStyle('Hatchback')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBodyStyle('Hatchback'); }}>
                        <div className="wf-fuel-ico" style={{ width: '48px', height: '48px' }}>
                          <img alt="Hatchback" src="https://ackodrive-prod.ackoassets.com/_next_static/icons/BrowseCard/hatchback.svg" style={{ width: '36px', height: '36px' }} />
                        </div>
                        <div className="wf-fuel-name">Hatchback</div>
                        <div className="wf-fuel-desc">Compact · City friendly</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBodyStyle === 'MPV' ? 'selected' : ''}`} data-fuel="cng" tabIndex={0} onClick={() => handleSelectWelcomeBodyStyle('MPV')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBodyStyle('MPV'); }}>
                        <div className="wf-fuel-ico" style={{ width: '48px', height: '48px' }}>
                          <img alt="MPV" src="https://ackodrive-prod.ackoassets.com/_next_static/icons/BrowseCard/MPV.svg" style={{ width: '36px', height: '36px' }} />
                        </div>
                        <div className="wf-fuel-name">MPV</div>
                        <div className="wf-fuel-desc">Spacious · Multi-utility</div>
                      </div>

                    </div>
                  </div>

                  {/* SLIDE 3: Fuel Type Select (Car & Bike) */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={handleWelcomeBack}>
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
                      {(welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') && (
                        <div className={`wf-fuel-card ${welcomeFuel === 'petrol' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeFuel('petrol')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('petrol'); }}>
                          <div className="wf-fuel-ico"><img src={petrolFuelImage} alt="Petrol" /></div>
                          <div className="wf-fuel-name">Petrol</div>
                          <div className="wf-fuel-desc">{welcomeCategory === 'Car' ? 'Most common · Smooth drive' : 'Most common · Smooth & responsive'}</div>
                        </div>
                      )}

                      {/* Diesel */}
                      {welcomeCategory === 'Car' && (
                        <div className={`wf-fuel-card ${welcomeFuel === 'diesel' ? 'selected' : ''}`} data-fuel="diesel" tabIndex={0} onClick={() => handleSelectWelcomeFuel('diesel')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('diesel'); }}>
                          <div className="wf-fuel-ico"><img src={dieselFuelImage} alt="Diesel" /></div>
                          <div className="wf-fuel-name">Diesel</div>
                          <div className="wf-fuel-desc">Better mileage · Highway ideal</div>
                        </div>
                      )}

                      {/* CNG */}
                      {welcomeCategory === 'Car' && (
                        <div className={`wf-fuel-card ${welcomeFuel === 'cng' ? 'selected' : ''}`} data-fuel="cng" tabIndex={0} onClick={() => handleSelectWelcomeFuel('cng')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('cng'); }}>
                          <div className="wf-fuel-ico"><img src={cngFuelImage} alt="CNG" /></div>
                          <div className="wf-fuel-name">CNG</div>
                          <div className="wf-fuel-desc">Low running cost · Eco-friendly</div>
                        </div>
                      )}

                      {/* Electric */}
                      {(welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') && (
                        <div className={`wf-fuel-card ${welcomeFuel === 'electric' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeFuel('electric')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeFuel('electric'); }}>
                          <div className="wf-fuel-ico"><img src={electricFuelImage} alt="Electric" /></div>
                          <div className="wf-fuel-name">Electric</div>
                          <div className="wf-fuel-desc">Zero emission · Future ready</div>
                          <div className="wf-fuel-badge">ECO</div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* SLIDE 2: Transmission Type Select */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={handleWelcomeBack}>
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
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Select transmission</div>
                    <div className="wf-fuel-cards">
                      {/* For Car / EV */}
                      {(welcomeCategory === 'Car' || welcomeCategory === 'EV') && (
                        <>
                          <div className={`wf-fuel-card ${welcomeTransmission === 'automatic' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeTransmission('automatic')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeTransmission('automatic'); }}>
                            <div className="wf-fuel-ico">
                              <img alt="Automatic" src="https://ackodrive-prod.ackoassets.com/_next_static/icons/BrowseCard/manual.svg" style={{ width: '36px', height: '36px' }} />
                            </div>
                            <div className="wf-fuel-name">Automatic</div>
                            <div className="wf-fuel-desc">Effortless drive · City traffic ideal</div>
                          </div>

                          <div className={`wf-fuel-card ${welcomeTransmission === 'manual' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeTransmission('manual')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeTransmission('manual'); }}>
                            <div className="wf-fuel-ico">
                              <img alt="Manual" src="https://ackodrive-prod.ackoassets.com/_next_static/icons/BrowseCard/manual.svg" style={{ width: '36px', height: '36px' }} />
                            </div>
                            <div className="wf-fuel-name">Manual</div>
                            <div className="wf-fuel-desc">Full control · Better efficiency</div>
                          </div>
                        </>
                      )}

                      {/* For Bike */}
                      {welcomeCategory === 'Bike / Scooter' && (
                        <>
                          <div className={`wf-fuel-card ${welcomeTransmission === 'gearless' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeTransmission('gearless')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeTransmission('gearless'); }}>
                            <div className="wf-fuel-ico">
                              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12h8" />
                                <rect x="10" y="8" width="10" height="8" rx="1.5" />
                                <path d="M14 6v2" />
                                <path d="M16 6v2" />
                              </svg>
                            </div>
                            <div className="wf-fuel-name">Gearless</div>
                            <div className="wf-fuel-desc">Scooter · Twist &amp; go ease</div>
                          </div>

                          <div className={`wf-fuel-card ${welcomeTransmission === 'geared' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeTransmission('geared')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeTransmission('geared'); }}>
                            <div className="wf-fuel-ico">
                              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                              </svg>
                            </div>
                            <div className="wf-fuel-name">Geared</div>
                            <div className="wf-fuel-desc">Motorcycle · Shift gears manually</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* SLIDE 3: Budget Range Select */}
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
                      {(welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') && (
                        <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span style={{ textTransform: 'capitalize' }}>{welcomeFuel}</span>
                        </div>
                      )}
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Select budget range</div>
                    <div className="wf-fuel-cards" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      
                      <div className={`wf-fuel-card ${welcomeBudget === 'Under ₹6L' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeBudget('Under ₹6L')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBudget('Under ₹6L'); }} style={{ padding: '12px 6px' }}>
                        <div className="wf-fuel-name" style={{ fontSize: '13px' }}>Under ₹6L</div>
                        <div className="wf-fuel-desc" style={{ fontSize: '9px' }}>Budget friendly · Entry</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBudget === '₹6–10L' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeBudget('₹6–10L')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBudget('₹6–10L'); }} style={{ padding: '12px 6px' }}>
                        <div className="wf-fuel-name" style={{ fontSize: '13px' }}>₹6–10L</div>
                        <div className="wf-fuel-desc" style={{ fontSize: '9px' }}>Popular compacts</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBudget === '₹10–15L' ? 'selected' : ''}`} data-fuel="petrol" tabIndex={0} onClick={() => handleSelectWelcomeBudget('₹10–15L')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBudget('₹10–15L'); }} style={{ padding: '12px 6px' }}>
                        <div className="wf-fuel-name" style={{ fontSize: '13px' }}>₹10–15L</div>
                        <div className="wf-fuel-desc" style={{ fontSize: '9px' }}>Sedans &amp; SUVs</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBudget === '₹15–25L' ? 'selected' : ''}`} data-fuel="diesel" tabIndex={0} onClick={() => handleSelectWelcomeBudget('₹15–25L')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBudget('₹15–25L'); }} style={{ padding: '12px 6px' }}>
                        <div className="wf-fuel-name" style={{ fontSize: '13px' }}>₹15–25L</div>
                        <div className="wf-fuel-desc" style={{ fontSize: '9px' }}>Premium SUVs &amp; EVs</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBudget === '₹25–50L' ? 'selected' : ''}`} data-fuel="cng" tabIndex={0} onClick={() => handleSelectWelcomeBudget('₹25–50L')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBudget('₹25–50L'); }} style={{ padding: '12px 6px' }}>
                        <div className="wf-fuel-name" style={{ fontSize: '13px' }}>₹25–50L</div>
                        <div className="wf-fuel-desc" style={{ fontSize: '9px' }}>Luxury crossovers</div>
                      </div>

                      <div className={`wf-fuel-card ${welcomeBudget === 'Above ₹50L' ? 'selected' : ''}`} data-fuel="electric" tabIndex={0} onClick={() => handleSelectWelcomeBudget('Above ₹50L')} onKeyDown={(e) => { if (e.key === 'Enter') handleSelectWelcomeBudget('Above ₹50L'); }} style={{ padding: '12px 6px' }}>
                        <div className="wf-fuel-name" style={{ fontSize: '13px' }}>Above ₹50L</div>
                        <div className="wf-fuel-desc" style={{ fontSize: '9px' }}>Premium luxury segment</div>
                      </div>

                    </div>
                  </div>

                  {/* SLIDE 4: Detail Form Submission */}
                  <div className="wf-slide">
                    <button className="wf-back" onClick={handleWelcomeBack}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>Back
                    </button>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeCategory}</span>
                      </div>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeForm.brand === 'Other' ? (welcomeBrandOtherText || 'Other') : welcomeForm.brand}</span>
                      </div>
                      {(welcomeCategory === 'Car' || welcomeCategory === 'EV') && (
                        <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{welcomeBodyStyle}</span>
                        </div>
                      )}
                      {(welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') && (
                        <div className="wf-cat-chip" id="wFuelChip" style={{ marginBottom: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span style={{ textTransform: 'capitalize' }}>{welcomeFuel}</span>
                        </div>
                      )}
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span style={{ textTransform: 'capitalize' }}>{welcomeTransmission}</span>
                      </div>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeBudget}</span>
                      </div>
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Fill in your details</div>
                    <form id="wForm" onSubmit={handleWelcomeSubmit} noValidate>
                      <div className="field wf-form">
                        <label htmlFor="wName">Full Name</label>
                        <input id="wName" name="owner_name" type="text" placeholder="Your Full Name" required style={{ height: '44px', fontSize: '13px' }} value={welcomeForm.owner_name} onChange={(e) => setWelcomeForm(prev => ({ ...prev, owner_name: e.target.value }))} />
                      </div>
                      <div className="field wf-form">
                        <label htmlFor="wModel">Vehicle Model (Optional)</label>
                        <input
                          id="wModel"
                          name="model"
                          type="text"
                          placeholder={welcomeForm.brand && POPULAR_MODELS[welcomeForm.brand] ? `e.g. ${POPULAR_MODELS[welcomeForm.brand][0]}` : "e.g. Creta, Swift, Activa, Nexon"}
                          style={{ height: '44px', fontSize: '13px' }}
                          value={welcomeForm.model || ''}
                          onChange={(e) => setWelcomeForm(prev => ({ ...prev, model: e.target.value }))}
                        />
                        {welcomeForm.brand && POPULAR_MODELS[welcomeForm.brand] && (
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {POPULAR_MODELS[welcomeForm.brand].map(m => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setWelcomeForm(prev => ({ ...prev, model: m }))}
                                style={{
                                  fontSize: '10.5px',
                                  padding: '3px 8px',
                                  borderRadius: '12px',
                                  border: (welcomeForm.model === m) ? '1px solid var(--orange, #F87629)' : '1px solid #ddd',
                                  background: (welcomeForm.model === m) ? 'rgba(248,118,41,0.12)' : '#f8f8f8',
                                  color: (welcomeForm.model === m) ? 'var(--orange, #F87629)' : '#444',
                                  cursor: 'pointer',
                                  fontWeight: (welcomeForm.model === m) ? '600' : 'normal',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {welcomeForm.brand === 'Other' ? (
                        <div className="field-row wf-form">
                          <div className="field wf-form">
                            <label htmlFor="wBrandSpec">Specify Brand</label>
                            <input
                              id="wBrandSpec"
                              name="brand_spec"
                              type="text"
                              placeholder="Specify Brand"
                              required
                              style={{ height: '44px', fontSize: '13px' }}
                              value={welcomeBrandOtherText}
                              onChange={(e) => setWelcomeBrandOtherText(e.target.value)}
                            />
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
                        </div>
                      ) : (
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
                      )}
                      
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
                {[0, 1, 2, 3, 4, 5, 6].map(idx => {
                  if (welcomeCategory === 'EV' && (idx === 3 || idx === 4)) return null;
                  if (welcomeCategory === 'Bike / Scooter' && idx === 2) return null;
                  return (
                    <div
                      key={idx}
                      className={`wf-dot ${welcomeSlide === idx ? 'active' : ''}`}
                    ></div>
                  );
                })}
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
        Get Offers Today 🔥
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
              <span className="hero-ticker-live">
                <span className="hero-ticker-dot" />
                LIVE
              </span>
              <span className="hero-ticker-sep" />
              <span className="hero-ticker-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>
              <span className="hero-ticker-text">Average response time: under 2 hours · Always free</span>
            </div>

            {/* Headline */}
            <h1 className="hero-premium-h1">
              Compare Prices.
              <span className="h1-line2 text-gradient-orange">Get Your Best Deal.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-premium-sub">
              Get side-by-side on-road quotes from 500+ verified dealerships in Jharkhand — 100% free.
            </p>

            {/* Search Card Container */}
            <div className="vsc-user-wrapper">
              <div className="vsc-user-card">
                <div className="vsc-uc-header">
                  <h2 className="vsc-uc-title">Find Your Right Vehicle</h2>
                  <div className="vsc-uc-city-wrap">
                    <button
                      type="button"
                      className="vsc-uc-city-btn"
                      id="city-selector-btn"
                      onClick={() => setIsWelcomeOpen(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-primary">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{welcomeForm.city || 'Select City'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down transition-transform duration-200">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="vsc-uc-search-body">
                  <div className="vsc-uc-search-flex">
                    <div className="vsc-uc-input-shell">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search ml-4 text-muted flex-shrink-0">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Type model name, e.g. Swift, Creta, Nexon…"
                        className="vsc-uc-input"
                        id="hero-search-input"
                        autoComplete="off"
                        value={heroSearchQuery}
                        onChange={(e) => setHeroSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (heroSearchQuery.trim()) {
                              setWelcomeForm(prev => ({ ...prev, model: heroSearchQuery.trim() }));
                            }
                            setIsWelcomeOpen(true);
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="vsc-uc-search-btn"
                      id="hero-search-btn"
                      onClick={() => {
                        if (heroSearchQuery.trim()) {
                          setWelcomeForm(prev => ({ ...prev, model: heroSearchQuery.trim() }));
                        }
                        setIsWelcomeOpen(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Quick Categories Grid */}
            <div className="hero-quick-cats">
              <div className="hero-quick-cat-item" onClick={() => { handleSelectWelcomeCategory('Car'); setIsWelcomeOpen(true); }}>
                <div className="hero-quick-cat-img-box">
                  <img src={catCarImage} alt="Cars" />
                </div>
                <div className="hero-quick-cat-info">
                  <span className="hero-quick-cat-title">Cars</span>
                  <span className="hero-quick-cat-sub">Hatchback · SUV</span>
                </div>
              </div>

              <div className="hero-quick-cat-item" onClick={() => { handleSelectWelcomeCategory('Bike / Scooter'); setWelcomeTransmission('geared'); setIsWelcomeOpen(true); }}>
                <div className="hero-quick-cat-img-box">
                  <img src={catBikeImage} alt="Bikes" />
                </div>
                <div className="hero-quick-cat-info">
                  <span className="hero-quick-cat-title">Bikes</span>
                  <span className="hero-quick-cat-sub">Motorcycles</span>
                </div>
              </div>

              <div className="hero-quick-cat-item" onClick={() => { handleSelectWelcomeCategory('Bike / Scooter'); setWelcomeTransmission('gearless'); setIsWelcomeOpen(true); }}>
                <div className="hero-quick-cat-img-box">
                  <img src={catBikeImage} alt="Scooters" />
                </div>
                <div className="hero-quick-cat-info">
                  <span className="hero-quick-cat-title">Scooters</span>
                  <span className="hero-quick-cat-sub">Gearless · EV</span>
                </div>
              </div>

              <div className="hero-quick-cat-item" onClick={() => { handleSelectWelcomeCategory('EV'); setIsWelcomeOpen(true); }}>
                <div className="hero-quick-cat-img-box">
                  <img src={catEvImage} alt="EVs" />
                </div>
                <div className="hero-quick-cat-info">
                  <span className="hero-quick-cat-title">EVs</span>
                  <span className="hero-quick-cat-sub">Electric Cars &amp; 2W</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Frame */}
          <div className="hero-premium-visual">
            <div className="hero-visual-frame">
              <img src={heroShowroomImg} alt="BuyWheels Cars, Bikes, Scooters, and EVs Showroom" className="hero-visual-img" />
            </div>
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
          <span className="m-item">Cars · Bikes · EVs<span className="m-dot"></span></span>
          <span className="m-item">Fully Electric Options<span className="m-dot"></span></span>
          <span className="m-item">500+ Verified Dealers<span className="m-dot"></span></span>
          <span className="m-item">Best Price Guaranteed<span className="m-dot"></span></span>
          <span className="m-item">Free Service<span className="m-dot"></span></span>
          <span className="m-item">Response in 2 Hours<span className="m-dot"></span></span>
          <span className="m-item">Cars · Bikes · EVs<span className="m-dot"></span></span>
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
            <div className="step r step-interactive" onClick={() => { setWelcomeSlide(0); setIsWelcomeOpen(true); }} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setWelcomeSlide(0); setIsWelcomeOpen(true); } }}>
              <div className="step-n">01</div>
              <div className="step-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <div className="step-t" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Submit Enquiry
                <span className="step-arrow" style={{ transition: 'transform 0.2s' }}>&rarr;</span>
              </div>
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

      {/* BUYWHEELS PRICE PROMISE SECTION */}
      <section className="section price-promise-section" id="price-promise">
        <div className="section-in">
          
          {/* BuyWheels Standard Section Header */}
          <div className="tag r">Price Guarantee</div>
          <h2 className="sec-h r">Price <em>Promise</em></h2>
          <p className="sec-p r">Bring us your written showroom quotation. If BuyWheels cannot beat your price, you receive guaranteed cashback directly upon vehicle delivery.</p>

          {/* Quotation Guarantee Quote Banner */}
          <div className="pp-quote-box r">
            <span className="pp-quote-mark">“</span>
            <p className="pp-quote-text">
              Bring us your written showroom quotation. BuyWheels promises to get you an even lower on-road price for your vehicle.
            </p>
            <span className="pp-quote-mark">”</span>
          </div>


          <div className="tag r" style={{ marginBottom: '8px' }}>Cashback Guarantee Tiers</div>
          <p className="sec-p r" style={{ marginBottom: '24px', maxWidth: '600px' }}>
            If BuyWheels is unable to beat your quotation price, you will receive guaranteed cash back directly after your vehicle delivery:
          </p>

          {/* Cashback Tiers Cards Grid */}
          <div className="pp-tiers-grid r">
            {/* Tier 1: Two-Wheeler */}
            <div 
              className={`pp-tier-card ${activePpTier === 'two-wheeler' ? 'active' : ''}`}
              onClick={() => setActivePpTier('two-wheeler')}
            >
              <div className="pp-tier-badge">Starter Savings</div>
              
              <div className="pp-tier-stage">
                <div className="pp-stage-glow"></div>
                <img src={catBikeImage} alt="Two Wheeler" className="pp-tier-real-img" />
              </div>

              <div className="pp-tier-content">
                <div className="pp-tier-type">Two-Wheeler</div>
                <div className="pp-tier-sub">Bikes · Scooters · EVs</div>

                <div className="pp-tier-cash-box">
                  <div className="pp-tier-amount">₹3,000</div>
                  <div className="pp-tier-label">Guaranteed Cashback</div>
                </div>

                <ul className="pp-tier-perks">
                  <li>
                    <span className="pp-perk-check">✓</span>
                    <span>Showroom Quote Price Beat</span>
                  </li>
                  <li>
                    <span className="pp-perk-check">✓</span>
                    <span>Direct Account Deposit</span>
                  </li>
                </ul>
              </div>

              <div className="pp-tier-action">
                <span>{activePpTier === 'two-wheeler' ? 'Selected Tier' : 'Select Category'}</span>
                {activePpTier === 'two-wheeler' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span className="pp-action-arrow">&rarr;</span>
                )}
              </div>
            </div>

            {/* Tier 2: Three-Wheeler */}
            <div 
              className={`pp-tier-card ${activePpTier === 'three-wheeler' ? 'active' : ''}`}
              onClick={() => setActivePpTier('three-wheeler')}
            >
              <div className="pp-tier-badge">Popular</div>
              
              <div className="pp-tier-stage">
                <div className="pp-stage-glow"></div>
                <img src={catThreeWheelerImage} alt="Three Wheeler" className="pp-tier-real-img" />
              </div>

              <div className="pp-tier-content">
                <div className="pp-tier-type">Three-Wheeler</div>
                <div className="pp-tier-sub">Auto · Passenger · Commercial</div>

                <div className="pp-tier-cash-box">
                  <div className="pp-tier-amount">₹4,000</div>
                  <div className="pp-tier-label">Guaranteed Cashback</div>
                </div>

                <ul className="pp-tier-perks">
                  <li>
                    <span className="pp-perk-check">✓</span>
                    <span>Showroom Quote Price Beat</span>
                  </li>
                  <li>
                    <span className="pp-perk-check">✓</span>
                    <span>Direct Account Deposit</span>
                  </li>
                </ul>
              </div>

              <div className="pp-tier-action">
                <span>{activePpTier === 'three-wheeler' ? 'Selected Tier' : 'Select Category'}</span>
                {activePpTier === 'three-wheeler' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span className="pp-action-arrow">&rarr;</span>
                )}
              </div>
            </div>

            {/* Tier 3: Four-Wheeler */}
            <div 
              className={`pp-tier-card highlight ${activePpTier === 'four-wheeler' ? 'active' : ''}`}
              onClick={() => setActivePpTier('four-wheeler')}
            >
              <div className="pp-tier-badge top-saver">Highest Value</div>
              
              <div className="pp-tier-stage">
                <div className="pp-stage-glow"></div>
                <img src={catCarImage} alt="Four Wheeler" className="pp-tier-real-img" />
              </div>

              <div className="pp-tier-content">
                <div className="pp-tier-type">Four-Wheeler</div>
                <div className="pp-tier-sub">Cars · SUVs · EVs</div>

                <div className="pp-tier-cash-box">
                  <div className="pp-tier-amount">₹5,000</div>
                  <div className="pp-tier-label">Guaranteed Cashback</div>
                </div>

                <ul className="pp-tier-perks">
                  <li>
                    <span className="pp-perk-check">✓</span>
                    <span>Showroom Quote Price Beat</span>
                  </li>
                  <li>
                    <span className="pp-perk-check">✓</span>
                    <span>Direct Account Deposit</span>
                  </li>
                </ul>
              </div>

              <div className="pp-tier-action">
                <span>{activePpTier === 'four-wheeler' ? 'Selected Tier' : 'Select Category'}</span>
                {activePpTier === 'four-wheeler' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span className="pp-action-arrow">&rarr;</span>
                )}
              </div>
            </div>
          </div>

          {/* Trust Features Strip */}
          <div className="pp-trust-strip r">
            <div className="pp-trust-item">
              <span className="pp-trust-check">✓</span>
              <span>Written Showroom Price Beat Guarantee</span>
            </div>
            <div className="pp-trust-item">
              <span className="pp-trust-check">✓</span>
              <span>No Hidden Conditions or Fees</span>
            </div>
            <div className="pp-trust-item">
              <span className="pp-trust-check">✓</span>
              <span>Direct Account Transfer Post-Delivery</span>
            </div>
          </div>

          {/* Footer Bar with Brand Motto & CTA */}
          <div className="pp-footer-bar r">
            <div className="pp-slogan-wrap">
              <div className="pp-shield-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pp-shield-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="pp-slogan-info">
                <span className="pp-slogan-title">BuyWheels Assurance</span>
                <span className="pp-slogan-text">Always On The Buyer’s Side · 100% Free Service</span>
              </div>
            </div>
            <button
              className="pp-cta-btn"
              onClick={() => { setWelcomeSlide(0); setIsWelcomeOpen(true); }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Upload Quote &amp; Save Money</span>
              <svg className="pp-cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* DEALER COMPARISON WIDGET */}
      <section className="section compare-section" id="compare">
        <div className="section-in">
          <div className="tag r">Live Comparison</div>
          <h2 className="sec-h r">Compare <em>Dealers</em></h2>
          <p className="sec-p r">Stop visiting multiple showrooms. BuyWheels connects you directly to 500+ verified car, bike &amp; EV dealerships in Jharkhand so you can compare real on-road quotes — 100% free.</p>

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
                        setWelcomeTransmission('automatic');
                        setWelcomeBudget(budgetVal);
                        setWelcomeBodyStyle(selectedCompareCar === 'nexonEv' ? 'SUV' : 'SUV'); // default
                        setWelcomeForm(prev => ({
                          ...prev,
                          brand: brandName,
                          budget: budgetVal
                        }));
                        setWelcomeSlide(6);
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
            <p className="cats-subheader">Compare prices and get direct showroom deals on all vehicle segments in Jharkhand</p>
          </div>
          <div className="cats-grid-new">
            
            {/* Card 1: Cars */}
            <div className="cat-card new-car-card r" onClick={() => { handleSelectWelcomeCategory('Car'); setIsWelcomeOpen(true); }}>
              <div className="cat-card-glow orange-glow" />
              <div className="cat-card-info">
                <span className="cat-card-badge orange-badge">🔥 1,200+ Deals Live</span>
                <h3 className="cat-card-title">Cars</h3>
                <p className="cat-card-subtitle">Hatchbacks, Sedans, SUVs</p>
                <div className="cat-card-features">
                  <span>⚡ Matched in 2 Hours</span>
                  <span>🤝 350+ Verified Dealers</span>
                </div>
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
                <span className="cat-card-badge blue-badge">⚡ 850+ Bikes Listed</span>
                <h3 className="cat-card-title">Bikes</h3>
                <p className="cat-card-subtitle">Scooters & Motorcycles</p>
                <div className="cat-card-features">
                  <span>⚡ Matched in 2 Hours</span>
                  <span>🤝 150+ Verified Dealers</span>
                </div>
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
                <span className="cat-card-badge green-badge">🌱 Zero Emission</span>
                <h3 className="cat-card-title">EVs</h3>
                <p className="cat-card-subtitle">Electric Cars & Two-Wheelers</p>
                <div className="cat-card-features">
                  <span>⚡ Matched in 2 Hours</span>
                  <span>🤝 80+ Eco Dealers</span>
                </div>
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
                <div className="wcu-card-t">Cars, Bikes &amp; EVs</div>
                <div className="wcu-card-d">Hatchbacks to SUVs, scooters to superbikes, and premium electric vehicles — every segment, one platform.</div>
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
