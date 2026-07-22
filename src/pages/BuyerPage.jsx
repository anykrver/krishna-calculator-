import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { saveBuyerEnquiry } from '../lib/supabase';
import DragDrop from '../components/DragDrop';
import ComingSoonOverlay from '../components/ComingSoonOverlay';
import Logo from '../components/Logo';
import VehicleSearchCard from '../components/VehicleSearchCard';
import vehicleCategoriesImage from '../assets/vehicle-categories-ai.png';
import busVanCategoryImage from '../assets/bus-van-category-ai.png';
import petrolFuelImage from '../assets/fuel-types/petrol.svg';
import dieselFuelImage from '../assets/fuel-types/diesel.svg';
import cngFuelImage from '../assets/fuel-types/cng.svg';
import electricFuelImage from '../assets/fuel-types/electric.svg';
import heroShowroomImg from '../assets/hero_showroom_vehicles_transparent.png';
import catCarImage from '../assets/cat_car.png';
import catBikeImage from '../assets/cat_bike.png';
import catScooterImage from '../assets/cat_scooter.png';
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

const VEHICLE_VARIANTS_DATA = {

  // ── MARUTI SUZUKI ──
  'Maruti Suzuki Brezza': [
    { name: 'LXI 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI+ 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI+ 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'LXI 1.5L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'VXI 1.5L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'ZXI 1.5L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Fronx': [
    { name: 'Sigma 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta+ 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta 1.2L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Delta+ 1.2L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Sigma 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'Delta 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'Delta+ 1.0L Turbo Smart Hybrid', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Zeta 1.0L Turbo Smart Hybrid', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Alpha 1.0L Turbo Smart Hybrid', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Alpha Smart Hybrid DT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Zeta 1.0L Turbo Smart Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.0L Turbo Smart Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha Smart Hybrid AT DT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Maruti Suzuki Swift': [
    { name: 'LXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI (O) 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI+ 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI+ 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'ZXI 1.2L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Baleno': [
    { name: 'Sigma 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Zeta 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Alpha 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Zeta 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Sigma 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'Delta 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'Zeta 1.2L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Dzire': [
    { name: 'LXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI+ 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI+ 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'ZXI 1.2L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Grand Vitara': [
    { name: 'Sigma 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Delta 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Zeta 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha+ 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Zeta 1.5L Hybrid', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.5L Hybrid', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha+ 1.5L Hybrid e-AWD', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Maruti Suzuki Victoris': [
    { name: 'Sigma 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Zeta 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Alpha 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Delta 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Zeta 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Maruti Suzuki Wagon R': [
    { name: 'LXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'LXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'LXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI+ 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI+ 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Ertiga': [
    { name: 'LXI 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI+ 1.5L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI+ 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI 1.5L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'ZXI 1.5L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'ZXI+ 1.5L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Alto K10': [
    { name: 'STD 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'LXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI+ 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI+ 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'LXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'VXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki XL6': [
    { name: 'Zeta 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Alpha 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Zeta 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.5L AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Zeta 1.5L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'Alpha 1.5L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Celerio': [
    { name: 'LXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZXI+ 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZXI+ 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'ZXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki S-Presso': [
    { name: 'STD 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'LXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI+ 1.0L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VXI 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VXI+ 1.0L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'LXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'VXI 1.0L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Jimny': [
    { name: 'Zeta 1.5L 4WD MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Alpha 1.5L 4WD MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Zeta 1.5L 4WD AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 1.5L 4WD AT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Maruti Suzuki Eeco': [
    { name: 'STD 1.2L (5 Seater)', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'STD 1.2L (7 Seater)', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AC 1.2L (5 Seater)', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AC 1.2L (7 Seater)', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AC CNG 1.2L (5 Seater)', fuel: 'CNG', transmission: 'Manual' },
    { name: 'AC CNG 1.2L (7 Seater)', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Maruti Suzuki Invicto': [
    { name: 'Zeta 2.0L Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha 2.0L Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Alpha+ 2.0L Hybrid e-AWD AT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],

  // ── HYUNDAI ──
  'Hyundai Creta': [
    { name: 'E 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'EX 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S(O) 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX Tech 1.5L IVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX(O) 1.5L IVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX(O) 1.6L Turbo DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'EX 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'S 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'SX 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'SX(O) 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Hyundai i20': [
    { name: 'Magna 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Sportz 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Asta 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Asta (O) 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Magna IVT 1.2L', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Sportz IVT 1.2L', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Asta IVT 1.2L', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Sportz 1.0T DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Asta 1.0T DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Sportz 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Asta 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' }
  ],
  'Hyundai Exter': [
    { name: 'EX 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S(O) 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX(O) 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S AMT 1.2L', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX AMT 1.2L', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX(O) AMT 1.2L', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'S 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'SX 1.2L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Hyundai Venue': [
    { name: 'E 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S(O) 1.2L', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.0T iMT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX 1.0T iMT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX+ 1.0T DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'N Line 1.0T DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'S+ 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'SX 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'SX+ 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' }
  ],
  'Hyundai Verna': [
    { name: 'EX 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S(O) 1.5L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SX 1.5L IVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX(O) 1.5L IVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX 1.5T DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX(O) 1.5T DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'SX 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'SX(O) 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' }
  ],
  'Hyundai Alcazar': [
    { name: 'Prestige 1.5T Petrol 6MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Prestige(O) 1.5T Petrol 6MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Platinum 1.5T Petrol 6AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Signature 1.5T Petrol 6AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Prestige 1.5L Diesel 6MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Prestige(O) 1.5L Diesel 6MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Platinum 1.5L Diesel 6AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Signature 1.5L Diesel 6AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Hyundai Tucson': [
    { name: 'Platinum 2.0L Petrol AT 2WD', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Signature 2.0L Petrol AT 2WD', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Platinum 2.0L Diesel AT 2WD', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Signature 2.0L Diesel AT 2WD', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Signature 2.0L Diesel AT 4WD', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],

  // ── TATA ──
  'Tata Nexon': [
    { name: 'Smart 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Pure 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Creative 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Fearless 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Pure 1.2L Petrol AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Creative 1.2L Petrol AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Fearless 1.2L Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Fearless+ 1.2L Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Smart 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Pure 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Creative 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Fearless 1.5L Diesel AMT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Fearless+ 1.5L Diesel AMT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Tata Punch': [
    { name: 'Pure 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Adventure 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Accomplished 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Creative 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Pure 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Adventure 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Accomplished 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Creative 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Adventure CNG MT', fuel: 'CNG', transmission: 'Manual' },
    { name: 'Accomplished CNG MT', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Tata Altroz': [
    { name: 'XE 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XM 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XT 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XZ 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XZ+ 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XZ 1.2L Turbo Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XZ+ 1.2L Turbo DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'XZ+ DT 1.2L Turbo DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'XM 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'XT 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'XZ 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'XZ+ 1.5L Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'XM CNG MT', fuel: 'CNG', transmission: 'Manual' },
    { name: 'XT CNG MT', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Tata Safari': [
    { name: 'Smart 2.0L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Pure 2.0L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Adventure 2.0L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Accomplished 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Accomplished+ 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Creative 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Creative+ 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Tata Harrier': [
    { name: 'Smart 2.0L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Pure 2.0L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Adventure 2.0L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Accomplished 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Accomplished+ 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Creative 2.0L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Tata Tiago': [
    { name: 'XE 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XM 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XT 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XZ 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XZ+ 1.2L Petrol', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'XT AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'XZ AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'XZ+ AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'XM 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'XT 1.2L CNG', fuel: 'CNG', transmission: 'Manual' },
    { name: 'XZ 1.2L CNG', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Tata Curvv EV': [
    { name: 'Smart 45kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'Pure 45kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'Creative 45kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'Accomplished 55kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'Creative+ 55kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'Accomplished+ 55kWh', fuel: 'Electric', transmission: 'Automatic' }
  ],

  // ── MAHINDRA ──
  'Mahindra Thar Roxx': [
    { name: 'MX1 2.0L Petrol RWD MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'MX3 2.2L Diesel RWD MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'MX3 2.0L Petrol RWD MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX3L 2.2L Diesel RWD AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'AX5L 2.2L Diesel RWD AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'AX7L 2.2L Diesel 4WD AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'AX7L 2.0L Petrol 4WD AT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Mahindra XUV 7XO': [
    { name: 'AX3 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX5 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX7 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'AX5 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'AX7 2.2L Diesel AT 4WD', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Mahindra XUV700': [
    { name: 'MX 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX3 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX5 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX5 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'AX7 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'MX 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'AX3 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'AX5 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'AX5 2.2L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'AX7 2.2L Diesel AT 4WD', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Mahindra Scorpio N': [
    { name: 'Z2 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Z4 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Z6 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Z8 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Z8 L 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Z2 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Z4 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Z6 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Z8 2.2L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Z8 L 2.2L Diesel AT 4WD', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Mahindra Scorpio-N': [
    { name: 'Z2 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Z4 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Z6 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Z8 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Z8 L 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Z2 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Z4 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Z6 2.2L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Z8 2.2L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Z8 L 2.2L Diesel AT 4WD', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Mahindra Thar': [
    { name: 'AX (O) 2.0L Petrol Hardtop MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX (O) 2.0L Petrol Convertible MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'LX 2.0L Petrol Hardtop MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'LX 2.0L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'AX (O) 2.2L Diesel Hardtop MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'LX 2.2L Diesel Hardtop MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'LX 2.2L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Mahindra XUV 3XO': [
    { name: 'MX1 1.2L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'MX2 1.2L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'MX2 Pro 1.2L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'MX3 1.2T Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'MX3 Pro 1.2T Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'AX5 L 1.2T Petrol AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'AX7 L 1.2T Petrol AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'MX2 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'MX3 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'AX5 1.5L Diesel AMT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'AX7 L 1.5L Diesel AMT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Mahindra Bolero': [
    { name: 'B4 2.5L mHawk Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'B6 2.5L mHawk Diesel', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'B6 (O) 2.5L mHawk Diesel', fuel: 'Diesel', transmission: 'Manual' }
  ],
  'Mahindra Bolero Neo': [
    { name: 'N4 1.5L mHawk Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'N8 1.5L mHawk Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'N10 1.5L mHawk Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'N10 (O) 1.5L mHawk Diesel MT', fuel: 'Diesel', transmission: 'Manual' }
  ],
  'Mahindra XUV 3XO EV': [
    { name: 'MX2 34.5kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'AX5 34.5kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'AX7 L 39.4kWh', fuel: 'Electric', transmission: 'Automatic' }
  ],
  'Mahindra Bolero Neo Plus': [
    { name: 'P4 2.2L mHawk Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'P10 2.2L mHawk Diesel MT', fuel: 'Diesel', transmission: 'Manual' }
  ],
  'Mahindra XUV 400 Electric': [
    { name: 'EC Pro 34.5kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'EL Pro 34.5kWh', fuel: 'Electric', transmission: 'Automatic' },
    { name: 'EL Pro 39.4kWh', fuel: 'Electric', transmission: 'Automatic' }
  ],
  'Mahindra Marazzo': [
    { name: 'M2 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'M4+ 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'M6+ 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' }
  ],

  // ── TOYOTA ──
  'Toyota Fortuner': [
    { name: 'Leader 4x2 MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Leader 4x2 AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Legender 4x2 AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Legender 4x4 AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Toyota Innova Crysta': [
    { name: 'GX 2.4L Diesel MT 7S', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'VX 2.4L Diesel MT 7S', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'ZX 2.4L Diesel MT 7S', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'GX 2.4L Diesel AT 7S', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'VX 2.4L Diesel AT 7S', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'ZX 2.4L Diesel AT 7S', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Toyota Innova Hycross': [
    { name: 'G 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'GX 2.0L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'GX 2.0L Petrol CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VX 2.0L Petrol CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZX 2.0L Petrol CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'GX 2.0L Hybrid CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VX 2.0L Hybrid CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZX 2.0L Hybrid CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Toyota Glanza': [
    { name: 'S 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'G 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'V 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'G 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'V 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'S CNG MT', fuel: 'CNG', transmission: 'Manual' },
    { name: 'G CNG MT', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Toyota Urban Cruiser Taisor': [
    { name: 'E 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'G 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'V 1.2L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'S 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'G 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'V 1.2L AMT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'S 1.0L Turbo Smart Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'G 1.0L Turbo Smart Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'V 1.0L Turbo Smart Hybrid AT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Toyota Rumion': [
    { name: 'S 1.5L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'G 1.5L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'V 1.5L Petrol AT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'S CNG MT', fuel: 'CNG', transmission: 'Manual' }
  ],
  'Toyota Camry': [
    { name: '2.5L Hybrid CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Toyota Hilux': [
    { name: 'STD 2.8L Diesel 4x4 MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'High 2.8L Diesel 4x4 MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'High 2.8L Diesel 4x4 AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Toyota Land Cruiser 300': [
    { name: 'ZX 3.3L V6 Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Toyota Vellfire': [
    { name: 'Hi 2.5L Hybrid CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VIP Executive Lounge 2.5L Hybrid CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],

  // ── KIA ──
  'Kia Seltos': [
    { name: 'HTE 1.5L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTK 1.5L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTK+ 1.5L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTX 1.5L Petrol IVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'HTX+ 1.5L Petrol IVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'GTX+ 1.5L Turbo Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'X-Line 1.5L Turbo Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'HTK 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'HTK+ 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'HTX 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'HTX+ 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Kia Sonet': [
    { name: 'HTE 1.2L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTK 1.2L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTK+ 1.2L Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTX 1.0T Petrol iMT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'HTX+ 1.0T Petrol iMT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'GTX+ 1.0T Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'X-Line 1.0T Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'HTK 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'HTK+ 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'HTX 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'HTX+ 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],
  'Kia Carens': [
    { name: 'Premium 1.4T Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Premium+ 1.4T Petrol MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'Prestige 1.4T Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Prestige+ 1.4T Petrol DCT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'Premium 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Premium+ 1.5L Diesel MT', fuel: 'Diesel', transmission: 'Manual' },
    { name: 'Prestige 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' },
    { name: 'Prestige+ 1.5L Diesel AT', fuel: 'Diesel', transmission: 'Automatic (TC)' }
  ],

  // ── HONDA ──
  'Honda City': [
    { name: 'V 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VX 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZX 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SV 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'V 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VX 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZX 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'V 1.5L Hybrid e:HEV', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VX 1.5L Hybrid e:HEV', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZX 1.5L Hybrid e:HEV', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],
  'Honda Elevate': [
    { name: 'SV 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'V 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'VX 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'ZX 1.5L MT', fuel: 'Petrol', transmission: 'Manual' },
    { name: 'SV 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'V 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'VX 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' },
    { name: 'ZX 1.5L CVT', fuel: 'Petrol', transmission: 'Automatic (TC)' }
  ],

  // ── BIKES & SCOOTERS ──
  'Honda Activa 6G': [
    { name: 'STD 110cc', fuel: 'Petrol', transmission: 'Gearless' },
    { name: 'DLX 110cc', fuel: 'Petrol', transmission: 'Gearless' },
    { name: 'OBD2A 110cc', fuel: 'Petrol', transmission: 'Gearless' }
  ],
  'Honda Activa Electric': [
    { name: 'S 6kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'S+ 6kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Honda Shine 125': [
    { name: 'Drum 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'CBS 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Royal Enfield Classic 350': [
    { name: 'Redditch 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Halcyon 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Dark 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Signals 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Chrome 350cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Royal Enfield Hunter 350': [
    { name: 'Retro 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Metro 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Metro+ 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Rebel 350cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Royal Enfield Bullet 350': [
    { name: 'Standard 350cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Military 350cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'TVS Jupiter': [
    { name: 'STD 110cc', fuel: 'Petrol', transmission: 'Gearless' },
    { name: 'ZX 110cc', fuel: 'Petrol', transmission: 'Gearless' },
    { name: 'Grande 125cc', fuel: 'Petrol', transmission: 'Gearless' },
    { name: 'Grande+ 125cc', fuel: 'Petrol', transmission: 'Gearless' }
  ],
  'TVS Raider 125': [
    { name: 'Drum 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'SmartConnect Disc 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'TVS Apache RTR 160': [
    { name: 'Apache RTR 160 2V', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Apache RTR 160 4V', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Apache RTR 160 4V Race Edition', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Bajaj Pulsar 150': [
    { name: 'Twin Disc 150cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'NEON 150cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Bajaj Pulsar NS200': [
    { name: 'ABS 200cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Non-ABS 200cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Bajaj Chetak': [
    { name: 'Premium 2.9kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Premium+ 2.9kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Urbane 2.9kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Bajaj Freedom 125 CNG': [
    { name: 'Drum 125cc CNG', fuel: 'CNG', transmission: 'Geared' },
    { name: 'Disc 125cc CNG', fuel: 'CNG', transmission: 'Geared' },
    { name: 'Drum LED 125cc CNG', fuel: 'CNG', transmission: 'Geared' }
  ],
  'Hero Splendor Plus': [
    { name: 'Kick 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Self Drum 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Self Disc 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'XTEC 100cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero HF Deluxe': [
    { name: 'Kick 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Self 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'i3s 100cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Xpulse 200': [
    { name: 'Xpulse 200 4V', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Xpulse 200 4V Rally Edition', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Xpulse 200T 4V', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Ola S1 Pro': [
    { name: 'S1 Pro 4kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'S1 Pro Gen 2 4kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'S1 Pro+ 5.3kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Ather 450X': [
    { name: '450X 2.9kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: '450X 3.7kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: '450X Pro 3.7kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Ather Rizta': [
    { name: 'Rizta Z 2.9kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Rizta S 2.9kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Rizta S 3.7kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Suzuki Hayabusa': [
    { name: 'Standard 1340cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: '25th Anniversary Edition 1340cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki Gixxer SF': [
    { name: 'Standard 150cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Ride Connect Edition 150cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki V-Strom SX 250': [
    { name: 'Standard 250cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki Gixxer 150': [
    { name: 'Standard 150cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Ride Connect Edition 150cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki Gixxer SF 250': [
    { name: 'Standard 250cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Ride Connect Edition 250cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki Gixxer 250': [
    { name: 'Standard 250cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Ride Connect Edition 250cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki V-Strom 800DE': [
    { name: 'Standard 800cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Suzuki GSX 8R': [
    { name: 'Standard 776cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Jawa 42 Bobber': [
    { name: 'Standard 334cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Black Mirror 334cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Jawa 42 FJ': [
    { name: 'Standard 350cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Jawa Perak': [
    { name: 'Standard 334cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Jawa 350': [
    { name: 'Standard 350cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Ola Electric Roadster': [
    { name: 'Roadster 2.5kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Roadster 3.5kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Roadster 4.5kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Ola Electric Roadster X': [
    { name: 'Roadster X 2.5kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Roadster X 3.5kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Roadster X 4.5kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Ola Electric Roadster Pro': [
    { name: 'Roadster Pro 8kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'Roadster Pro 16kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Revolt Motors RV 400': [
    { name: 'Standard 3.24kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'BRZ 3.24kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Revolt Motors RV1': [
    { name: 'RV1 2.2kWh', fuel: 'Electric', transmission: 'Gearless' },
    { name: 'RV1+ 3.24kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Revolt Motors RV BlazeX': [
    { name: 'Standard 3.24kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Revolt Motors RVX': [
    { name: 'Standard 3.24kWh', fuel: 'Electric', transmission: 'Gearless' }
  ],
  'Hero Xtreme 125R': [
    { name: 'IBS 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'ABS 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Glamour X': [
    { name: 'Drum 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Splendor Plus Xtec': [
    { name: 'Drum 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 100cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'XTEC 2.0 100cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Passion Plus': [
    { name: 'Drum 110cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Xpulse 210': [
    { name: 'Standard 210cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Glamour': [
    { name: 'Drum 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Xtreme 160R 4V': [
    { name: 'Standard 160cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Pro Armor 160cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Xtreme 160R BS6': [
    { name: 'Single Disc 160cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Dual Disc 160cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Super Splendor Xtec': [
    { name: 'Drum 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Glamour Xtec': [
    { name: 'Drum 125cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Disc 125cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Karizma XMR': [
    { name: 'Standard 210cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero HF 100': [
    { name: 'Standard 100cc', fuel: 'Petrol', transmission: 'Geared' }
  ],
  'Hero Mavrick 440': [
    { name: 'Base 440cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Mid 440cc', fuel: 'Petrol', transmission: 'Geared' },
    { name: 'Top 440cc', fuel: 'Petrol', transmission: 'Geared' }
  ]
};

const BRAND_MODELS_DATA = {

  // ── CAR BRANDS ──
  'Maruti Suzuki': [
    { name: 'Maruti Suzuki Brezza',       logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/vitara-brezza/maruti-vitara-brezza-7-1767875217.png?w=180&q=50' },
    { name: 'Maruti Suzuki Fronx',        logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/fronx/maruti-fronx-7-1766215192.png?w=180&q=50' },
    { name: 'Maruti Suzuki Swift',        logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png?w=180&q=50' },
    { name: 'Maruti Suzuki Baleno',       logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/baleno/maruti-baleno-4-1766214578.png?w=180&q=50' },
    { name: 'Maruti Suzuki Dzire',        logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/dzire/maruti-dzire-0-1784199426.png?w=180&q=50' },
    { name: 'Maruti Suzuki Grand Vitara', logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/grand-vitara/maruti-grand-vitara-8-1766738694.png?w=180&q=50' },
    { name: 'Maruti Suzuki Victoris',     logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/victoris/maruti-victoris-2-1766216178.png?w=180&q=50' },
    { name: 'Maruti Suzuki Wagon R',      logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/wagon-r/maruti-wagon-r-4-1767860860.png?w=180&q=50' },
    { name: 'Maruti Suzuki Ertiga',       logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/ertiga/maruti-ertiga-4-1767874534.png?w=180&q=50' },
    { name: 'Maruti Suzuki Alto K10',     logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/alto-k10/maruti-alto-k10-10-1766734886.png?w=180&q=50' },
    { name: 'Maruti Suzuki XL6',          logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/xl6/maruti-xl6-6-1766216359.png?w=180&q=50' },
    { name: 'Maruti Suzuki Celerio',      logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/celerio/maruti-celerio-7-1767875043.png?w=180&q=50' },
    { name: 'Maruti Suzuki S-Presso',     logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/s-presso/maruti-s-presso-3-1766740577.png?w=180&q=50' },
    { name: 'Maruti Suzuki Jimny',        logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/jimny/maruti-jimny-1-1767861206.png?w=180&q=50' },
    { name: 'Maruti Suzuki Eeco',         logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/eeco/maruti-eeco-5-1766736854.png?w=180&q=50' },
    { name: 'Maruti Suzuki Invicto',      logo: 'https://images.91wheels.com/assets/c_images/gallery/maruti/invicto/maruti-invicto-5-1766739546.png?w=180&q=50' }
  ],

  'Hyundai': [
    { name: 'Hyundai Creta',          logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta/hyundai-creta-1-1766205711.png?w=180&q=50' },
    { name: 'Hyundai Venue',          logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue/hyundai-venue-0-1771412163.png?w=180&q=50' },
    { name: 'Hyundai Exter',          logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/exter/hyundai-exter-5-1776074667.png?w=180&q=50' },
    { name: 'Hyundai i20',            logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20/hyundai-i20-8-1766206046.png?w=180&q=50' },
    { name: 'Hyundai Verna',          logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/verna/hyundai-verna-0-1773131163.png?w=180&q=50' },
    { name: 'Hyundai Grand i10 Nios', logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/grand-i10-nios/hyundai-grand-i10-nios-0-1766214369.png?w=180&q=50' },
    { name: 'Hyundai Aura',           logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/aura/hyundai-aura-7-1773214499.png?w=180&q=50' },
    { name: 'Hyundai Alcazar',        logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/alcazar/hyundai-alcazar-8-1766205340.png?w=180&q=50' },
    { name: 'Hyundai Creta Electric', logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-ev/hyundai-creta-ev-0-1767876338.png?w=180&q=50' },
    { name: 'Hyundai i20 N Line',     logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20-n-line/hyundai-i20-n-line-6-1766729684.png?w=180&q=50' },
    { name: 'Hyundai Venue N Line',   logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue-n-line/hyundai-venue-n-line-0-1766211212.png?w=180&q=50' },
    { name: 'Hyundai Creta N Line',   logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-n-line/hyundai-creta-n-line-8-1766213045.png?w=180&q=50' },
    { name: 'Hyundai Tucson',         logo: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/tucson/hyundai-tucson-2-1767867000.png?w=180&q=50' }
  ],

  'Tata': [
    { name: 'Tata Sierra',    logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra/tata-sierra-0-1768365444.png?w=180&q=50' },
    { name: 'Tata Punch',     logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch/tata-punch-0-1769487768.png?w=180&q=50' },
    { name: 'Tata Sierra EV', logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra-ev/tata-sierra-ev-0-1782897309.png?w=180&q=50' },
    { name: 'Tata Nexon',     logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon/tata-nexon-0-1784198581.png?w=180&q=50' },
{ name: 'Tata Harrier',   logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/harrier/tata-harrier-0-1766203373.png?w=180&q=50' },
    { name: 'Tata Altroz',    logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/altroz/tata-altroz-0-1766141604.png?w=180&q=50' },
    { name: 'Tata Safari',    logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/safari/tata-safari-0-1769770726.png?w=180&q=50' },
    { name: 'Tata Nexon EV',  logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1769491378.png?w=180&q=50' },
    { name: 'Tata Tiago',     logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/tiago/tata-tiago-4-1767870000.png?w=180&q=50' },
    { name: 'Tata Curvv EV',  logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv-ev/tata-curvv-ev-2-1767869000.png?w=180&q=50' }
  ],

  'Mahindra': [
    { name: 'Mahindra Scorpio N',       logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-3-1767930813.png?w=180&q=50' },
    { name: 'Mahindra Thar',            logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar/mahindra-thar-8-1771924749.png?w=180&q=50' },
    { name: 'Mahindra XUV 7XO',         logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-7xo/mahindra-xuv-7xo-0-1768365160.png?w=180&q=50' },
    { name: 'Mahindra XUV 3XO',         logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-3xo/mahindra-xuv-3xo-5-1767875397.png?w=180&q=50' },
    { name: 'Mahindra Thar Roxx',       logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar-roxx/mahindra-thar-roxx-3-1767849893.png?w=180&q=50' },
    { name: 'Mahindra Scorpio Classic', logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio-classic/mahindra-scorpio-classic-0-1767930945.png?w=180&q=50' },
    { name: 'Mahindra Bolero',          logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero/mahindra-bolero-0-1768637292.png?w=180&q=50' },
    { name: 'Mahindra Bolero Neo',      logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero-neo/mahindra-bolero-neo-0-1768637392.png?w=180&q=50' },
    { name: 'Mahindra XUV 3XO EV',      logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-3xo-ev/mahindra-xuv-3xo-ev-0-1768390523.png?w=180&q=50' },
    { name: 'Mahindra Bolero Neo Plus', logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero-neo-plus/mahindra-bolero-neo-plus-0-1767931096.png?w=180&q=50' },
    { name: 'Mahindra XUV 400 Electric',logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-400-electric/mahindra-xuv-400-electric-0-1766745412.png?w=180&q=50' },
    { name: 'Mahindra Marazzo',         logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/marazzo/mahindra-marazzo-0-1767931024.png?w=180&q=50' },
    { name: 'Mahindra XUV700',          logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-7xo/mahindra-xuv-7xo-0-1768365160.png?w=180&q=50' },
    { name: 'Mahindra Scorpio-N',       logo: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-3-1767930813.png?w=180&q=50' }
  ],

  'Toyota': [
    { name: 'Toyota Urban Cruiser HyRyder', logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hyryder/toyota-hyryder-1-1767847105.png?w=180&q=50' },
    { name: 'Toyota Urban Cruiser Hyryder',logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hyryder/toyota-hyryder-1-1767847105.png?w=180&q=50' },
    { name: 'Toyota Innova Hycross',       logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-hycross/toyota-innova-hycross-4-1767848854.png?w=180&q=50' },
    { name: 'Toyota Fortuner',             logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner/toyota-fortuner-0-1767849630.png?w=180&q=50' },
    { name: 'Toyota Innova Crysta',        logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-crysta/toyota-innova-crysta-0-1780900881.png?w=180&q=50' },
    { name: 'Toyota Urban Cruiser Taisor', logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/taisor/toyota-taisor-4-1767848418.png?w=180&q=50' },
    { name: 'Toyota Taisor',               logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/taisor/toyota-taisor-4-1767848418.png?w=180&q=50' },
    { name: 'Toyota Glanza',               logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/glanza/toyota-glanza-3-1767849310.png?w=180&q=50' },
    { name: 'Toyota Hilux',                logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hilux/toyota-hilux-2-1767849201.png?w=180&q=50' },
    { name: 'Toyota Rumion',               logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/rumion/toyota-rumion-2-1767848606.png?w=180&q=50' },
    { name: 'Toyota Fortuner Legender',    logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner-legender/toyota-fortuner-legender-0-1767849483.png?w=180&q=50' },
    { name: 'Toyota Camry',                logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/camry/toyota-camry-1-1766140825.png?w=180&q=50' },
    { name: 'Toyota Vellfire',             logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/vellfire/toyota-vellfire-3-1767848275.png?w=180&q=50' },
    { name: 'Toyota Land Cruiser 300',     logo: 'https://images.91wheels.com/assets/c_images/gallery/toyota/landcruiser/toyota-landcruiser-0-1767848728.png?w=180&q=50' }
  ],

  'KIA': [
    { name: 'Kia Seltos',         logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/seltos/kia-seltos-1-1688389656.png?w=180&q=50' },
    { name: 'Kia Sonet',          logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/sonet/kia-sonet-0-1772081526.png?w=180&q=50' },
    { name: 'Kia Carens',         logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/carens/kia-carens-0-1767933180.png?w=180&q=50' },
    { name: 'Kia Syros',          logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/syros/kia-syros-7-1777884966.png?w=180&q=50' },
    { name: 'Kia Carens Clavis',   logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/clavis/kia-clavis-0-1780981908.png?w=180&q=50' },
    { name: 'Kia Carnival',       logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/carnival/kia-carnival-7-1766209787.png?w=180&q=50' },
    { name: 'Kia Carens Clavis EV',logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/carens-electric/kia-carens-electric-5-1766210014.png?w=180&q=50' },
    { name: 'Kia EV6',            logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/ev6/kia-ev6-5-1766210337.png?w=180&q=50' },
    { name: 'Kia EV9',            logo: 'https://images.91wheels.com/assets/c_images/gallery/kia/ev9/kia-ev9-2-1767933050.png?w=180&q=50' }
  ],

  'Honda': [
    { name: 'Honda City',            logo: 'https://images.91wheels.com/assets/c_images/gallery/honda/city/honda-city-1-1677389656.png?w=180&q=50' },
    { name: 'Honda Elevate',         logo: 'https://images.91wheels.com/assets/c_images/gallery/honda/elevate/honda-elevate-1-1685389656.png?w=180&q=50' },
    { name: 'Honda Amaze',           logo: 'https://images.91wheels.com/assets/c_images/gallery/honda/amaze/honda-amaze-0-1766204444.png?w=180&q=50' },
    { name: 'Honda Activa 6G',       logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/activa-6g/honda-activa-6g-0-1768628400.png?w=180&q=50' },
    { name: 'Honda Activa Electric', logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/activa-e/honda-activa-e-0-1768628500.png?w=180&q=50' },
    { name: 'Honda Shine 125',       logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/shine-125/honda-shine-125-0-1768628600.png?w=180&q=50' },
    { name: 'Honda CB Unicorn 160',  logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/unicorn-160/honda-unicorn-160-0-1766203333.png?w=180&q=50' },
    { name: 'Honda SP 125',          logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/sp-125/honda-sp-125-0-1766202222.png?w=180&q=50' },
    { name: 'Honda CB350',           logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/cb350/honda-cb350-0-1768628700.png?w=180&q=50' },
    { name: 'Honda Hness CB350',     logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/hness-cb350/honda-hness-cb350-0-1768628800.png?w=180&q=50' },
    { name: 'Honda Hornet 2.0',      logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/hornet-20/honda-hornet-20-0-1768628900.png?w=180&q=50' },
    { name: 'Honda Dio',             logo: 'https://images.91wheels.com/assets/b_images/gallery/honda/dio/honda-dio-0-1768629000.png?w=180&q=50' }
  ],

  'MG': [
    { name: 'MG Hector',      logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector/mg-hector-1-1569385642.png?w=180&q=50' },
    { name: 'MG Hector Plus', logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector-plus/mg-hector-plus-1-1609385642.png?w=180&q=50' },
    { name: 'MG Astor',       logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/astor/mg-astor-1-1632385642.png?w=180&q=50' },
    { name: 'MG Gloster',     logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/gloster/mg-gloster-1-1600385642.png?w=180&q=50' },
    { name: 'MG Windsor EV',  logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-1-1726385642.png?w=180&q=50' },
    { name: 'MG ZS EV',       logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/zs-ev/mg-zs-ev-1-1571385642.png?w=180&q=50' },
    { name: 'MG Comet EV',    logo: 'https://images.91wheels.com/assets/c_images/gallery/mg/comet-ev/mg-comet-ev-0-1766204555.png?w=180&q=50' }
  ],

  'Skoda': [
    { name: 'Skoda Kodiaq RS', logo: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq-rs/skoda-kodiaq-rs-0-1782120448.png?w=180&q=50' },
    { name: 'Skoda Slavia',    logo: 'https://images.91wheels.com/assets/c_images/gallery/skoda/slavia/skoda-slavia-0-1767850473.png?w=180&q=50' },
    { name: 'Skoda Kushaq',    logo: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kushaq/skoda-kushaq-0-1774256060.png?w=180&q=50' },
    { name: 'Skoda Octavia RS',logo: 'https://images.91wheels.com/assets/c_images/gallery/skoda/octavia-vrs/skoda-octavia-vrs-0-1767850604.png?w=180&q=50' },
    { name: 'Skoda Kodiaq',    logo: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq-rs/skoda-kodiaq-rs-0-1782120448.png?w=180&q=50' },
    { name: 'Skoda Kylaq',     logo: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kylaq/skoda-kylaq-0-1766205888.png?w=180&q=50' }
  ],

  'Volkswagen': [
    { name: 'Volkswagen Virtus',       logo: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/virtus/volkswagen-virtus-3-1767847075.png?w=180&q=50' },
    { name: 'Volkswagen Tayron R-Line',logo: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tayron/volkswagen-tayron-0-1771500315.png?w=180&q=50' },
    { name: 'Volkswagen Golf GTI',     logo: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/golf-gti/volkswagen-golf-gti-0-1767847472.png?w=180&q=50' },
    { name: 'Volkswagen Tiguan R-Line',logo: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tiguan-r-line/volkswagen-tiguan-r-line-0-1767849778.png?w=180&q=50' },
    { name: 'Volkswagen Taigun',       logo: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/taigun/volkswagen-taigun-1-1617385642.png?w=180&q=50' },
    { name: 'Volkswagen Tiguan',       logo: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tiguan-r-line/volkswagen-tiguan-r-line-0-1767849778.png?w=180&q=50' }
  ],

  'Jeep': [
    { name: 'Jeep Compass',  logo: 'https://images.91wheels.com/assets/c_images/gallery/jeep/compass/jeep-compass-1-1499385642.png?w=180&q=50' },
    { name: 'Jeep Meridian', logo: 'https://images.91wheels.com/assets/c_images/gallery/jeep/meridian/jeep-meridian-1-1653385642.png?w=180&q=50' }
  ],

  'Renault': [
    { name: 'Renault Kwid',   logo: 'https://images.91wheels.com/assets/c_images/gallery/renault/kwid/renault-kwid-1-1438385642.png?w=180&q=50' },
    { name: 'Renault Triber', logo: 'https://images.91wheels.com/assets/c_images/gallery/renault/triber/renault-triber-1-1566385642.png?w=180&q=50' },
    { name: 'Renault Kiger',  logo: 'https://images.91wheels.com/assets/c_images/gallery/renault/kiger/renault-kiger-1-1614385642.png?w=180&q=50' }
  ],

  'Nissan': [
    { name: 'Nissan Magnite', logo: 'https://images.91wheels.com/assets/c_images/gallery/nissan/magnite/nissan-magnite-1-1607385642.png?w=180&q=50' }
  ],

  // ── EV BRANDS ──
  'Tata Motors': [
    { name: 'Tata Nexon EV', logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1769491378.png?w=180&q=50' },
    { name: 'Tata Punch EV', logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-1-1706675332.png?w=180&q=50' },
    { name: 'Tata Curvv EV', logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv-ev/tata-curvv-ev-1-1724675332.png?w=180&q=50' },
    { name: 'Tata Tiago EV', logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/tiago-ev/tata-tiago-ev-1-1665675332.png?w=180&q=50' },
    { name: 'Tata Tigor EV', logo: 'https://images.91wheels.com/assets/c_images/gallery/tata/tigor-ev/tata-tigor-ev-1-1621675332.png?w=180&q=50' }
  ],

  // ── BIKE / SCOOTER BRANDS ──
  'Royal Enfield': [
    { name: 'Royal Enfield Bullet 350',         logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/bullet-350/royalenfield-bullet-350-0-1769515350.png?w=180&q=50' },
    { name: 'Royal Enfield Hunter 350',         logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png?w=180&q=50' },
    { name: 'Royal Enfield Continental GT 650', logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/continental-gt-650/royalenfield-continental-gt-650-0-1768628900.png?w=180&q=50' },
    { name: 'Royal Enfield Classic 350',        logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/classic-350/royalenfield-classic-350-0-1768628135.png?w=180&q=50' },
    { name: 'Royal Enfield Himalayan 450',      logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/himalayan-450/royalenfield-himalayan-450-0-1766235092.png?w=180&q=50' },
    { name: 'Royal Enfield Guerrilla 450',      logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/guerrilla-450/royalenfield-guerrilla-450-0-1766234728.png?w=180&q=50' },
    { name: 'Royal Enfield Interceptor 650',    logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/interceptor-650/royalenfield-interceptor-650-0-1768629521.png?w=180&q=50' },
    { name: 'Royal Enfield Super Meteor 650',   logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/super-meteor-650/royalenfield-super-meteor-650-0-1768630403.png?w=180&q=50' },
    { name: 'Royal Enfield Shotgun 650',        logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/shotgun-650/royalenfield-shotgun-650-0-1784186115.png?w=180&q=50' },
    { name: 'Royal Enfield Meteor 350',         logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/meteor-350/royalenfield-meteor-350-0-1768629932.png?w=180&q=50' },
    { name: 'Royal Enfield Classic 650',        logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/classic-650/royalenfield-classic-650-0-1766234067.png?w=180&q=50' },
    { name: 'Royal Enfield Bear 650',           logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/bear-650/royalenfield-bear-650-0-1766233859.png?w=180&q=50' },
    { name: 'Royal Enfield Goan Classic 350',   logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/goan-classic-350/royalenfield-goan-classic-350-0-1766234497.png?w=180&q=50' },
    { name: 'Royal Enfield Scram 440',          logo: 'https://images.91wheels.com/assets/b_images/gallery/royalenfield/scram-450/royalenfield-scram-450-0-1766235594.png?w=180&q=50' }
  ],

  'TVS': [
    { name: 'TVS Jupiter 110',       logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/jupiter/tvs-jupiter-1-1569389656.png?w=180&q=50' },
    { name: 'TVS Jupiter 125',       logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/jupiter-125/tvs-jupiter-125-0-1766205544.png?w=180&q=50' },
    { name: 'TVS Raider 125',        logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/raider-125/tvs-raider-125-7-1781174533.png?w=180&q=50' },
    { name: 'TVS Apache RTR 160',    logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/apache-rtr-160/tvs-apache-rtr-160-1-1662389656.png?w=180&q=50' },
    { name: 'TVS Apache RTR 160 4V', logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/apache-rtr-160-4v/tvs-apache-rtr-160-4v-1-1768628356.png?w=180&q=50' },
    { name: 'TVS Apache RR 310',     logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/apache-rr-310/tvs-apache-rr-310-1-1499389656.png?w=180&q=50' },
    { name: 'TVS Ntorq 125',         logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/ntorq/tvs-ntorq-1-1499389656.png?w=180&q=50' },
    { name: 'TVS iQube Electric',    logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube/tvs-iqube-1-1613389656.png?w=180&q=50' },
    { name: 'TVS Ronin',             logo: 'https://images.91wheels.com/assets/b_images/gallery/tvs/ronin-225/tvs-ronin-225-0-1768627395.png?w=180&q=50' }
  ],

  'Yamaha': [
    { name: 'Yamaha FZ-S V4',     logo: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/fz-s/yamaha-fz-s-1-1499389656.png?w=180&q=50' },
    { name: 'Yamaha R15 V4',      logo: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/r15/yamaha-r15-1-1499389656.png?w=180&q=50' },
    { name: 'Yamaha MT-15 V2',    logo: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/mt-15/yamaha-mt-15-1-1499389656.png?w=180&q=50' },
    { name: 'Yamaha Fascino 125', logo: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/fascino-125/yamaha-fascino-125-1-1499389656.png?w=180&q=50' },
    { name: 'Yamaha RayZR 125',   logo: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/ray-zr-125/yamaha-ray-zr-125-1-1499389656.png?w=180&q=50' },
    { name: 'Yamaha Aerox 155',   logo: 'https://images.91wheels.com/assets/b_images/gallery/yamaha/aerox-155/yamaha-aerox-155-0-1766201222.png?w=180&q=50' }
  ],

  'Hero MotoCorp': [
    { name: 'Hero Splendor Plus',         logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-plus/heromotocorp-splendor-plus-0-1780550417.png?w=180&q=50' },
    { name: 'Hero Xtreme 125R',           logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-125r/heromotocorp-xtreme-125r-4-1766149291.png?w=180&q=50' },
    { name: 'Hero Glamour X',             logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour-x-125/heromotocorp-glamour-x-125-6-1766148217.png?w=180&q=50' },
    { name: 'Hero HF Deluxe',             logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/hf-deluxe/heromotocorp-hf-deluxe-0-1780557153.png?w=180&q=50' },
    { name: 'Hero Splendor Plus Xtec',    logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-xtec/heromotocorp-splendor-xtec-0-1768539770.png?w=180&q=50' },
    { name: 'Hero Xpulse 200 4V',         logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xpulse-200-4v/heromotocorp-xpulse-200-4v-8-1766148929.png?w=180&q=50' },
    { name: 'Hero Passion Plus',          logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/passion-plus/heromotocorp-passion-plus-0-1768480962.png?w=180&q=50' },
    { name: 'Hero Xpulse 210',            logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xpulse-210/heromotocorp-xpulse-210-6-1766149114.png?w=180&q=50' },
    { name: 'Hero Glamour',               logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour/heromotocorp-glamour-5-1766148095.png?w=180&q=50' },
    { name: 'Hero Xtreme 160R 4V',        logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-160r-4v/heromotocorp-xtreme-160r-4v-0-1768541605.png?w=180&q=50' },
    { name: 'Hero Xtreme 160R BS6',       logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-160r-bs6/heromotocorp-xtreme-160r-bs6-0-1768542223.png?w=180&q=50' },
    { name: 'Hero Super Splendor Xtec',   logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/super-splendor-xtec/heromotocorp-super-splendor-xtec-0-1766205043.png?w=180&q=50' },
    { name: 'Hero Glamour Xtec',          logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour-xtec/heromotocorp-glamour-xtec-0-1768479810.png?w=180&q=50' },
    { name: 'Hero Karizma XMR',           logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/karizma-xmr/heromotocorp-karizma-xmr-0-1768480541.png?w=180&q=50' },
    { name: 'Hero HF 100',                logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/hf-100/heromotocorp-hf-100-0-1778155716.png?w=180&q=50' },
    { name: 'Hero Mavrick 440',           logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/mavrick-440/heromotocorp-mavrick-440-0-1768480748.png?w=180&q=50' },
    { name: 'Hero Destini 125',           logo: 'https://images.91wheels.com/assets/b_images/gallery/hero/destini-125/hero-destini-125-0-1768629400.png?w=180&q=50' },
    { name: 'Hero Xoom 110',              logo: 'https://images.91wheels.com/assets/b_images/gallery/hero/xoom/hero-xoom-0-1766203333.png?w=180&q=50' },
    { name: 'Hero Pleasure Plus',         logo: 'https://images.91wheels.com/assets/b_images/gallery/hero/pleasure-plus/hero-pleasure-plus-0-1768629600.png?w=180&q=50' }
  ],
  'Hero': [
    { name: 'Hero Splendor Plus',         logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-plus/heromotocorp-splendor-plus-0-1780550417.png?w=180&q=50' },
    { name: 'Hero Xtreme 125R',           logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-125r/heromotocorp-xtreme-125r-4-1766149291.png?w=180&q=50' },
    { name: 'Hero Glamour X',             logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour-x-125/heromotocorp-glamour-x-125-6-1766148217.png?w=180&q=50' },
    { name: 'Hero HF Deluxe',             logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/hf-deluxe/heromotocorp-hf-deluxe-0-1780557153.png?w=180&q=50' },
    { name: 'Hero Splendor Plus Xtec',    logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-xtec/heromotocorp-splendor-xtec-0-1768539770.png?w=180&q=50' },
    { name: 'Hero Xpulse 200 4V',         logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xpulse-200-4v/heromotocorp-xpulse-200-4v-8-1766148929.png?w=180&q=50' },
    { name: 'Hero Passion Plus',          logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/passion-plus/heromotocorp-passion-plus-0-1768480962.png?w=180&q=50' },
    { name: 'Hero Xpulse 210',            logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xpulse-210/heromotocorp-xpulse-210-6-1766149114.png?w=180&q=50' },
    { name: 'Hero Glamour',               logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour/heromotocorp-glamour-5-1766148095.png?w=180&q=50' },
    { name: 'Hero Xtreme 160R 4V',        logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-160r-4v/heromotocorp-xtreme-160r-4v-0-1768541605.png?w=180&q=50' },
    { name: 'Hero Xtreme 160R BS6',       logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/xtreme-160r-bs6/heromotocorp-xtreme-160r-bs6-0-1768542223.png?w=180&q=50' },
    { name: 'Hero Super Splendor Xtec',   logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/super-splendor-xtec/heromotocorp-super-splendor-xtec-0-1766205043.png?w=180&q=50' },
    { name: 'Hero Glamour Xtec',          logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/glamour-xtec/heromotocorp-glamour-xtec-0-1768479810.png?w=180&q=50' },
    { name: 'Hero Karizma XMR',           logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/karizma-xmr/heromotocorp-karizma-xmr-0-1768480541.png?w=180&q=50' },
    { name: 'Hero HF 100',                logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/hf-100/heromotocorp-hf-100-0-1778155716.png?w=180&q=50' },
    { name: 'Hero Mavrick 440',           logo: 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/mavrick-440/heromotocorp-mavrick-440-0-1768480748.png?w=180&q=50' }
  ],

  'Bajaj': [
    { name: 'Bajaj Pulsar 150',     logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-150/bajaj-pulsar-150-1-1581389656.png?w=180&q=50' },
    { name: 'Bajaj Pulsar NS200',   logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-ns200/bajaj-pulsar-ns200-1-1581389656.png?w=180&q=50' },
    { name: 'Bajaj Pulsar N160',    logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-n160/bajaj-pulsar-n160-0-1766202222.png?w=180&q=50' },
    { name: 'Bajaj Chetak Electric',logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak/bajaj-chetak-1-1579389656.png?w=180&q=50' },
    { name: 'Bajaj Freedom 125 CNG',logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/freedom-cng/bajaj-freedom-cng-1-1719389656.png?w=180&q=50' },
    { name: 'Bajaj Dominar 400',    logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/dominar-400/bajaj-dominar-400-1-1499389656.png?w=180&q=50' },
    { name: 'Bajaj Pulsar NS400Z',  logo: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/pulsar-ns400z/bajaj-pulsar-ns400z-0-1766201111.png?w=180&q=50' }
  ],

  'KTM': [
    { name: 'KTM Duke 200',      logo: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-200/ktm-duke-200-1-1499389656.png?w=180&q=50' },
    { name: 'KTM Duke 390',      logo: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-390/ktm-duke-390-1-1499389656.png?w=180&q=50' },
    { name: 'KTM RC 390',        logo: 'https://images.91wheels.com/assets/b_images/gallery/ktm/rc-390/ktm-rc-390-1-1499389656.png?w=180&q=50' },
    { name: 'KTM Adventure 390', logo: 'https://images.91wheels.com/assets/b_images/gallery/ktm/adventure-390/ktm-adventure-390-1-1499389656.png?w=180&q=50' },
    { name: 'KTM Duke 250',      logo: 'https://images.91wheels.com/assets/b_images/gallery/ktm/duke-250/ktm-duke-250-0-1766209999.png?w=180&q=50' }
  ],

  'Suzuki': [
    { name: 'Suzuki Hayabusa',      logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/hayabusa/suzuki-hayabusa-7-1766147743.png?w=180&q=50' },
    { name: 'Suzuki Gixxer SF',     logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/gixxer-sf/suzuki-gixxer-sf-0-1766146215.png?w=180&q=50' },
    { name: 'Suzuki V-Strom SX 250',logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/v-strom-sx-250/suzuki-v-strom-sx-250-0-1766227755.png?w=180&q=50' },
    { name: 'Suzuki Gixxer 150',    logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/gixxer-150/suzuki-gixxer-150-0-1769574498.png?w=180&q=50' },
    { name: 'Suzuki Gixxer SF 250', logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/gixxer-sf-250/suzuki-gixxer-sf-250-0-1766236923.png?w=180&q=50' },
    { name: 'Suzuki Gixxer 250',    logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/gixxer-250/suzuki-gixxer-250-1-1784002679.png?w=180&q=50' },
    { name: 'Suzuki V-Strom 800DE', logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/v-strom-800de/suzuki-v-strom-800de-0-1766227307.png?w=180&q=50' },
    { name: 'Suzuki GSX 8R',        logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/gsx-8r/suzuki-gsx-8r-0-1763551626.jpg?w=180&q=50' },
    { name: 'Suzuki Access 125',    logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/access-125/suzuki-access-125-0-1768629700.png?w=180&q=50' },
    { name: 'Suzuki Burgman Street',logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/burgman-street/suzuki-burgman-street-0-1766208888.png?w=180&q=50' },
    { name: 'Suzuki Avenis 125',    logo: 'https://images.91wheels.com/assets/b_images/gallery/suzuki/avenis/suzuki-avenis-0-1768630000.png?w=180&q=50' }
  ],

  'Jawa': [
    { name: 'Jawa 42',          logo: 'https://images.91wheels.com/assets/b_images/gallery/jawa/42/jawa-42-1-1499389656.png?w=180&q=50' },
    { name: 'JAWA 42 Bobber',   logo: 'https://images.91wheels.com/assets/b_images/gallery/jawa/42-bobber/jawa-42-bobber-1-1764911646.png?w=180&q=50' },
    { name: 'JAWA 42 FJ',       logo: 'https://images.91wheels.com/assets/b_images/gallery/jawa/42-fj/jawa-42-fj-4-1764912506.png?w=180&q=50' },
    { name: 'JAWA Perak',       logo: 'https://images.91wheels.com/assets/b_images/gallery/jawa/perak/jawa-perak-0-1768569535.png?w=180&q=50' },
    { name: 'Jawa 350',         logo: 'https://images.91wheels.com/assets/b_images/gallery/jawa/jawa-350/jawa-jawa-350-0-1768569501.png?w=180&q=50' }
  ],

  'Yezdi': [
    { name: 'Yezdi Roadster',  logo: 'https://images.91wheels.com/assets/b_images/gallery/yezdi/roadster/yezdi-roadster-0-1766208888.png?w=180&q=50' },
    { name: 'Yezdi Adventure', logo: 'https://images.91wheels.com/assets/b_images/gallery/yezdi/adventure/yezdi-adventure-0-1766209999.png?w=180&q=50' },
    { name: 'Yezdi Scrambler', logo: 'https://images.91wheels.com/assets/b_images/gallery/yezdi/scrambler/yezdi-scrambler-0-1766207777.png?w=180&q=50' }
  ],

  'Triumph': [
    { name: 'Triumph Speed 400',    logo: 'https://images.91wheels.com/assets/b_images/gallery/triumph/speed-400/triumph-speed-400-0-1766201111.png?w=180&q=50' },
    { name: 'Triumph Scrambler 400X',logo: 'https://images.91wheels.com/assets/b_images/gallery/triumph/scrambler-400-x/triumph-scrambler-400-x-0-1766202222.png?w=180&q=50' },
    { name: 'Triumph Speed T4',     logo: 'https://images.91wheels.com/assets/b_images/gallery/triumph/speed-t4/triumph-speed-t4-0-1766203333.png?w=180&q=50' }
  ],

  'Harley-Davidson': [
    { name: 'Harley-Davidson X440', logo: 'https://images.91wheels.com/assets/b_images/gallery/harley-davidson/x440/harley-davidson-x440-0-1766203333.png?w=180&q=50' }
  ],

  'Kawasaki': [
    { name: 'Kawasaki Ninja 300', logo: 'https://images.91wheels.com/assets/b_images/gallery/kawasaki/ninja-300/kawasaki-ninja-300-0-1766204444.png?w=180&q=50' },
    { name: 'Kawasaki Ninja 500', logo: 'https://images.91wheels.com/assets/b_images/gallery/kawasaki/ninja-500/kawasaki-ninja-500-0-1766205555.png?w=180&q=50' },
    { name: 'Kawasaki Z900',      logo: 'https://images.91wheels.com/assets/b_images/gallery/kawasaki/z900/kawasaki-z900-0-1766206666.png?w=180&q=50' }
  ],

  'BMW Motorrad': [
    { name: 'BMW G 310 R',  logo: 'https://images.91wheels.com/assets/b_images/gallery/bmw/g-310-r/bmw-g-310-r-0-1766206666.png?w=180&q=50' },
    { name: 'BMW G 310 GS', logo: 'https://images.91wheels.com/assets/b_images/gallery/bmw/g-310-gs/bmw-g-310-gs-0-1766207777.png?w=180&q=50' },
    { name: 'BMW S 1000 RR',logo: 'https://images.91wheels.com/assets/b_images/gallery/bmw/s-1000-rr/bmw-s-1000-rr-0-1766208888.png?w=180&q=50' }
  ],

  'Ola Electric': [
    { name: 'Ola S1 Pro',               logo: 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/s1-pro/ola-s1-pro-1-1631389656.png?w=180&q=50' },
    { name: 'Ola S1 Air',               logo: 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/s1-air/ola-s1-air-1-1662389656.png?w=180&q=50' },
    { name: 'Ola S1 X',                 logo: 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/s1-x/ola-s1-x-0-1766205555.png?w=180&q=50' },
    { name: 'Ola Electric Roadster',    logo: 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/roadster/ola-electric-roadster-3-1780315506.png?w=180&q=50' },
    { name: 'Ola Electric Roadster X',  logo: 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/roadster-x/ola-electric-roadster-x-0-1780396768.png?w=180&q=50' },
    { name: 'Ola Electric Roadster Pro',logo: 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/roadster-pro/ola-electric-roadster-pro-1-1766223210.png?w=180&q=50' }
  ],

  'Ather': [
    { name: 'Ather 450X',   logo: 'https://images.91wheels.com/assets/b_images/gallery/ather-energy/450x/ather-energy-450x-1-1581389656.png?w=180&q=50' },
    { name: 'Ather Rizta',  logo: 'https://images.91wheels.com/assets/b_images/gallery/ather-energy/rizta/ather-energy-rizta-1-1711389656.png?w=180&q=50' },
    { name: 'Ather 450S',   logo: 'https://images.91wheels.com/assets/b_images/gallery/ather-energy/450s/ather-energy-450s-1-1695389656.png?w=180&q=50' },
    { name: 'Ather Apex 450',logo: 'https://images.91wheels.com/assets/b_images/gallery/ather-energy/450-apex/ather-energy-450-apex-0-1766204444.png?w=180&q=50' }
  ],

  'Ampere': [
    { name: 'Ampere Nexus',    logo: 'https://images.91wheels.com/assets/b_images/gallery/ampere/nexus/ampere-nexus-1-1683389656.png?w=180&q=50' },
    { name: 'Ampere Primus',   logo: 'https://images.91wheels.com/assets/b_images/gallery/ampere/primus/ampere-primus-1-1724389656.png?w=180&q=50' },
    { name: 'Ampere Magnus EX',logo: 'https://images.91wheels.com/assets/b_images/gallery/ampere/magnus/ampere-magnus-1-1499389656.png?w=180&q=50' }
  ],

  'Aprilia': [
    { name: 'Aprilia SR 125',    logo: 'https://images.91wheels.com/assets/b_images/gallery/aprilia/sr-125/aprilia-sr-125-1-1499389656.png?w=180&q=50' },
    { name: 'Aprilia RS 457',    logo: 'https://images.91wheels.com/assets/b_images/gallery/aprilia/rs-457/aprilia-rs-457-1-1698389656.png?w=180&q=50' },
    { name: 'Aprilia Tuono 457', logo: 'https://images.91wheels.com/assets/b_images/gallery/aprilia/tuono-457/aprilia-tuono-457-1-1724389656.png?w=180&q=50' }
  ],

  'Revolt': [
    { name: 'Revolt Motors RV 400',    logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/rv-400/revolt-motors-rv-400-0-1766236259.png?w=180&q=50' },
    { name: 'Revolt Motors RV1',       logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/revolt-rv1/revolt-motors-revolt-rv1-0-1770119845.png?w=180&q=50' },
    { name: 'Revolt Motors RV BlazeX', logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/rv-blazex/revolt-motors-rv-blazex-0-1770119913.png?w=180&q=50' },
    { name: 'Revolt Motors RVX',      logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/rvx/revolt-motors-rvx-0-1783148076.png?w=180&q=50' },
    { name: 'Revolt RV400 BRZ',        logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt/rv400-brz/revolt-rv400-brz-1-1662389656.png?w=180&q=50' }
  ],
  'Revolt Motors': [
    { name: 'Revolt Motors RV 400',    logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/rv-400/revolt-motors-rv-400-0-1766236259.png?w=180&q=50' },
    { name: 'Revolt Motors RV1',       logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/revolt-rv1/revolt-motors-revolt-rv1-0-1770119845.png?w=180&q=50' },
    { name: 'Revolt Motors RV BlazeX', logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/rv-blazex/revolt-motors-rv-blazex-0-1770119913.png?w=180&q=50' },
    { name: 'Revolt Motors RVX',      logo: 'https://images.91wheels.com/assets/b_images/gallery/revolt-motors/rvx/revolt-motors-rvx-0-1783148076.png?w=180&q=50' }
  ],

  'VIDA': [
    { name: 'VIDA V1 Pro',  logo: 'https://images.91wheels.com/assets/b_images/gallery/vida/v1-pro/vida-v1-pro-1-1665389656.png?w=180&q=50' },
    { name: 'VIDA V1 Plus', logo: 'https://images.91wheels.com/assets/b_images/gallery/vida/v1-plus/vida-v1-plus-0-1766202222.png?w=180&q=50' }
  ],

  'Ultraviolette': [
    { name: 'Ultraviolette F77 Mach 2', logo: 'https://images.91wheels.com/assets/b_images/gallery/ultraviolette/f77/ultraviolette-f77-0-1766201111.png?w=180&q=50' }
  ]
};

const POPULAR_CAR_BRANDS = [
  { name: 'Maruti Suzuki', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/maruti.jpg?w=200&q=50' },
  { name: 'Hyundai',       logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/hyundai.jpg?w=200&q=50' },
  { name: 'Tata',          logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/tata.jpg?w=200&q=50' },
  { name: 'Mahindra',      logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mahindra.jpg?w=200&q=50' },
  { name: 'Toyota',        logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/toyota.jpg?w=200&q=50' },
  { name: 'KIA',           logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/kia.jpg?w=200&q=50' },
  { name: 'Honda',         logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/honda.jpg?w=100&q=60' },
  { name: 'MG',            logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mg.jpg?w=200&q=50' },
  { name: 'Skoda',         logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/skoda.jpg?w=200&q=50' },
  { name: 'Volkswagen',    logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/volkswagen.jpg?w=200&q=50' },
  { name: 'Jeep',          logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/jeep.jpg?w=200&q=50' },
  { name: 'Renault',       logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/renault.jpg?w=200&q=50' },
  { name: 'Nissan',        logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/nissan.jpg?w=200&q=50' }
];

const POPULAR_EV_BRANDS = [
  { name: 'Tata Motors', logo: 'https://ackodrive-prod.ackoassets.com/_next_static/icons/car-brands-dark/Tata.svg' },
  { name: 'MG',          logo: 'https://ackodrive-prod.ackoassets.com/_next_static/icons/car-brands-dark/MG.svg' },
  { name: 'Hyundai',     logo: 'https://ackodrive-prod.ackoassets.com/_next_static/icons/car-brands-dark/Hyundai.svg' },
  { name: 'Mahindra',    logo: 'https://ackodrive-prod.ackoassets.com/_next_static/icons/car-brands-dark/Mahindra.svg' }
];

const POPULAR_BIKE_BRANDS = [
  { name: 'Honda',        logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/honda.jpg' },
  { name: 'Royal Enfield',logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/royal-enfield.jpg' },
  { name: 'TVS',          logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/tvs.jpg' },
  { name: 'Yamaha',       logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/yamaha.jpg' },
  { name: 'Hero MotoCorp',logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/hero.jpg' },
  { name: 'Bajaj',        logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/bajaj.jpg' },
  { name: 'KTM',          logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/ktm.jpg' },
  { name: 'Suzuki',       logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/suzuki.jpg' },
  { name: 'Jawa',         logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/jawa-motorcycles.jpg' },
  { name: 'Ather',        logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/ather-energy.jpg' },
  { name: 'Ampere',       logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/ampere.jpg' },
  { name: 'Aprilia',      logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/aprilia.jpg' },
  { name: 'Ola Electric', logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/ola-electric.jpg' },
  { name: 'Revolt',       logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/revolt.jpg' },
  { name: 'VIDA',         logo: 'https://cdn.bikedekho.com/pwa/img/brandLogo_168x84/vida.jpg' }
];

export default function BuyerPage() {
  // Modal Overlays
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonData, setComingSoonData] = useState(null);

  // Welcome Popup Wizard States
  const [welcomeSlide, setWelcomeSlide] = useState(0);
  const [welcomeCategory, setWelcomeCategory] = useState('Car');
  const [welcomeFuel, setWelcomeFuel] = useState('petrol');
  const [welcomeTransmission, setWelcomeTransmission] = useState('automatic');
  const [welcomeBodyStyle, setWelcomeBodyStyle] = useState('SUV');
  const [welcomeBrandOtherText, setWelcomeBrandOtherText] = useState('');
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [welcomeForm, setWelcomeForm] = useState({
    owner_name: '',
    brand: '',
    model: '',
    variant: '',
    city: '',
    phone: ''
  });
  const [welcomePhoneError, setWelcomePhoneError] = useState(false);
  const [variantFuelFilter, setVariantFuelFilter] = useState('');
  const [variantTransFilter, setVariantTransFilter] = useState('');
  const [variantSearchQuery, setVariantSearchQuery] = useState('');

  // Clear brand/model searches when changing slide, category or brand
  useEffect(() => {
    setBrandSearchQuery('');
    setModelSearchQuery('');
  }, [welcomeSlide, welcomeCategory, welcomeForm.brand]);

  // Clear variant filters when changing selected model
  useEffect(() => {
    setVariantFuelFilter('');
    setVariantTransFilter('');
    setVariantSearchQuery('');
  }, [welcomeForm.model]);

  // Lock background scroll when modals/overlays are open to prevent double scrollbar
  useEffect(() => {
    if (isWelcomeOpen || isComingSoonOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWelcomeOpen, isComingSoonOpen]);

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

  const filteredCarBrands = React.useMemo(() => {
    return POPULAR_CAR_BRANDS.filter(brand =>
      brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
    );
  }, [brandSearchQuery]);

  const filteredEvBrands = React.useMemo(() => {
    return POPULAR_EV_BRANDS.filter(brand =>
      brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
    );
  }, [brandSearchQuery]);

  const filteredBikeBrands = React.useMemo(() => {
    return POPULAR_BIKE_BRANDS.filter(brand =>
      brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
    );
  }, [brandSearchQuery]);

  const filteredModels = React.useMemo(() => {
    const brand = welcomeForm.brand;
    const models = BRAND_MODELS_DATA[brand] || [];
    return models.filter(m =>
      m.name.toLowerCase().includes(modelSearchQuery.toLowerCase())
    );
  }, [welcomeForm.brand, modelSearchQuery]);

  const availableFuels = React.useMemo(() => {
    const variants = VEHICLE_VARIANTS_DATA[welcomeForm.model] || [];
    const fuels = new Set(variants.map(v => v.fuel));
    return Array.from(fuels);
  }, [welcomeForm.model]);

  const availableTransmissions = React.useMemo(() => {
    const variants = VEHICLE_VARIANTS_DATA[welcomeForm.model] || [];
    const trans = new Set(variants.map(v => v.transmission));
    return Array.from(trans);
  }, [welcomeForm.model]);

  const filteredVariants = React.useMemo(() => {
    let variants = VEHICLE_VARIANTS_DATA[welcomeForm.model];
    if (!variants) {
      // Fallback: dynamic variant generation
      const transList = welcomeCategory === 'EV' ? ['Automatic'] : ['Manual', 'Automatic (TC)'];
      const fuelList = welcomeCategory === 'EV' ? ['Electric'] : ['Petrol', 'CNG', 'Diesel'];
      variants = [];
      fuelList.forEach(f => {
        transList.forEach(t => {
          variants.push({ name: `Base Trim (${f} ${t})`, fuel: f, transmission: t });
          variants.push({ name: `Mid Trim (${f} ${t})`, fuel: f, transmission: t });
          variants.push({ name: `Top Trim (${f} ${t})`, fuel: f, transmission: t });
        });
      });
    }

    return variants.filter(v => {
      const matchFuel = !variantFuelFilter || v.fuel.toLowerCase() === variantFuelFilter.toLowerCase();
      const matchTrans = !variantTransFilter || v.transmission.toLowerCase() === variantTransFilter.toLowerCase();
      const matchSearch = !variantSearchQuery || v.name.toLowerCase().includes(variantSearchQuery.toLowerCase());
      return matchFuel && matchTrans && matchSearch;
    });
  }, [welcomeForm.model, variantFuelFilter, variantTransFilter, variantSearchQuery, welcomeCategory]);

  const handleSelectSearchCategory = (category, transmissionType = '') => {
    if (!category) {
      setWelcomeSlide(0);
    } else if (category === 'Car') {
      setWelcomeCategory('Car');
      setWelcomeForm(prev => ({ ...prev, brand: '' }));
      setWelcomeBrandOtherText('');
      setWelcomeSlide(1); // Go to brand selection slide
    } else if (category === 'Bike') {
      setWelcomeCategory('Bike / Scooter');
      setWelcomeTransmission('geared');
      setWelcomeForm(prev => ({ ...prev, brand: '' }));
      setWelcomeBrandOtherText('');
      setWelcomeSlide(1);
    } else if (category === 'Scooter') {
      setWelcomeCategory('Bike / Scooter');
      setWelcomeTransmission('gearless');
      setWelcomeForm(prev => ({ ...prev, brand: '' }));
      setWelcomeBrandOtherText('');
      setWelcomeSlide(1);
    }
    setIsWelcomeOpen(true);
  };

  const handleSelectSearchVehicle = (vehicle) => {
    setWelcomeCategory(vehicle.category);
    if (vehicle.bodyStyle) setWelcomeBodyStyle(vehicle.bodyStyle);
    if (vehicle.fuel) setWelcomeFuel(vehicle.fuel);
    if (vehicle.transmission) setWelcomeTransmission(vehicle.transmission);
    
    setWelcomeForm(prev => ({
      ...prev,
      brand: vehicle.brand,
      model: vehicle.name
    }));
    
    setWelcomeSlide(4); // Jump directly to contact details form (Slide 4)
    setIsWelcomeOpen(true);
  };

  // Welcome multi-step triggers
  const handleSelectWelcomeCategory = (type) => {
    setWelcomeCategory(type);
    setWelcomeForm(prev => ({ ...prev, brand: '', model: '', variant: '' }));
    setWelcomeBrandOtherText('');
    setWelcomeSlide(1); // Go to brand selection slide
  };

  const handleSelectWelcomeBrand = (brandName) => {
    setWelcomeForm(prev => ({ ...prev, brand: brandName, model: '', variant: '' }));
    setTimeout(() => {
      setWelcomeSlide(2); // Always go to model selection slide
    }, 220);
  };

  const handleSelectWelcomeModel = (modelName) => {
    setWelcomeForm(prev => ({ ...prev, model: modelName, variant: '' }));
    setTimeout(() => {
      if (welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') {
        setWelcomeSlide(3); // Go to variant selection
      } else {
        // EV: skips variant selection, go to contact form (Slide 4)
        setWelcomeFuel('electric');
        setWelcomeTransmission('automatic');
        setWelcomeSlide(4);
      }
    }, 220);
  };

  const handleSelectWelcomeBodyStyle = (styleName) => {
    setWelcomeBodyStyle(styleName);
    setTimeout(() => {
      if (welcomeCategory === 'Car') {
        setWelcomeSlide(3); // Go to variant selection
      } else {
        // EV: skips variant selection, go to contact form (Slide 4)
        setWelcomeFuel('electric');
        setWelcomeTransmission('automatic');
        setWelcomeSlide(4);
      }
    }, 220);
  };

  const handleSelectWelcomeFuel = (fuel) => {
    setWelcomeFuel(fuel);
    setTimeout(() => {
      setWelcomeSlide(3); // Go to variant selection
    }, 220);
  };

  const handleSelectWelcomeVariant = (variantName) => {
    setWelcomeForm(prev => ({ ...prev, variant: variantName }));
    setTimeout(() => {
      setWelcomeSlide(4); // Go to details form (Slide 4)
    }, 220);
  };

  const handleWelcomeBack = () => {
    if (welcomeSlide === 4) {
      if (welcomeCategory === 'EV') {
        setWelcomeSlide(2); // EV skips variant selection, go back to model
      } else {
        setWelcomeSlide(3); // Go back to variant selection
      }
    } else if (welcomeSlide === 3) {
      setWelcomeSlide(2); // Go back to model
    } else if (welcomeSlide === 2) {
      setWelcomeSlide(1); // Go back to brand
    } else if (welcomeSlide === 1) {
      setWelcomeSlide(0); // Go back to category
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
    const finalBrand = (brand === 'Other' ? welcomeBrandOtherText : brand) || 'General';
    const finalCity = city || 'Ranchi';

    if (!owner_name || !owner_name.trim()) {
      alert('Please enter your full name.');
      return;
    }
    if (!phone || phone.length !== 10) {
      setWelcomePhoneError(true);
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setWelcomeSubmitting(true);

    const payload = {
      owner_name: owner_name.trim(),
      vehicle_type: (welcomeCategory === 'Car' || welcomeCategory === 'EV') ? `${welcomeCategory} (${welcomeBodyStyle})` : welcomeCategory,
      brand: finalBrand,
      city: finalCity,
      phone,
      fuel: (welcomeCategory === 'Car' || welcomeCategory === 'Bike / Scooter') ? welcomeFuel : (welcomeCategory === 'EV' ? 'electric' : ''),
      transmission: welcomeTransmission,
    };

    try {
      const savedSubmission = await saveBuyerEnquiry(payload, uploadedFiles);
      setComingSoonData(savedSubmission);
    } catch (err) {
      console.error('Submission error:', err);
      setComingSoonData({
        id: crypto.randomUUID(),
        ...payload,
        documents: uploadedFiles.map(f => ({ name: f.name, size: f.size })),
        created_at: new Date().toISOString()
      });
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
          <div className="welcome-float-card wf-themed-new">
            
            {/* Sticky Header with Black Banner, Progress Bar and Close button */}
            <div className="wf-header-sticky">
              <div className="wf-banner-black">
                Win <strong className="text-yellow-accent">BIG! ₹5,000</strong> Every Week!
              </div>
              <button className="wf-close-btn-new" onClick={() => setIsWelcomeOpen(false)} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="wf-progress-container-new">
                <div className="wf-progress-bar-new" style={{ width: `${Math.round((welcomeSlide / 4) * 100)}%` }}></div>
              </div>
            </div>

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
                          <img src={catCarImage} alt="Car" loading="eager" />
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
                          <img src={catBikeImage} alt="Bike" loading="eager" />
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <button type="button" className="wf-back" onClick={handleWelcomeBack}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>Back
                      </button>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeCategory}</span>
                      </div>
                    </div>
                    
                    <h2 className="wf-slide-title-new">Select the Manufacturer</h2>
                    
                    <div className="wf-brand-grid-wrapper">
                      {/* Search brand box with custom peer floating label */}
                      <div className="wf-brand-search-box">
                        <input
                          placeholder="Select Manufacturer"
                          className="peer wf-brand-input"
                          autoComplete="off"
                          id="makes"
                          type="text"
                          name="makes"
                          value={brandSearchQuery}
                          onChange={(e) => setBrandSearchQuery(e.target.value)}
                        />
                        <label
                          htmlFor="makes"
                          className="wf-brand-label"
                        >
                          Search Brand
                        </label>
                      </div>

                      <div className="wf-brand-grid">
                        {welcomeCategory === 'Car' && filteredCarBrands.map(brand => (
                          <div
                            key={brand.name}
                            className={`wf-brand-card ${welcomeForm.brand === brand.name ? 'selected' : ''}`}
                            onClick={() => handleSelectWelcomeBrand(brand.name)}
                          >
                            <img 
                              src={brand.logo} 
                              alt={brand.name} 
                              className="wf-brand-logo-img" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.opacity = '0.5';
                              }}
                            />
                            <p className="wf-brand-card-name">{brand.name}</p>
                          </div>
                        ))}

                        {welcomeCategory === 'EV' && filteredEvBrands.map(brand => (
                          <div
                            key={brand.name}
                            className={`wf-brand-card ${welcomeForm.brand === brand.name ? 'selected' : ''}`}
                            onClick={() => handleSelectWelcomeBrand(brand.name)}
                          >
                            <img 
                              src={brand.logo} 
                              alt={brand.name} 
                              className="wf-brand-logo-img" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.opacity = '0.5';
                              }}
                            />
                            <p className="wf-brand-card-name">{brand.name}</p>
                          </div>
                        ))}

                        {welcomeCategory === 'Bike / Scooter' && filteredBikeBrands.map(brand => (
                          <div
                            key={brand.name}
                            className={`wf-brand-card ${welcomeForm.brand === brand.name ? 'selected' : ''}`}
                            onClick={() => handleSelectWelcomeBrand(brand.name)}
                          >
                            <img 
                              src={brand.logo} 
                              alt={brand.name} 
                              className="wf-brand-logo-img" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.opacity = '0.5';
                              }}
                            />
                            <p className="wf-brand-card-name">{brand.name}</p>
                          </div>
                        ))}

                        {/* Other brand option */}
                        {(!brandSearchQuery || 'other'.includes(brandSearchQuery.toLowerCase())) && (
                          <div
                            className={`wf-brand-card ${welcomeForm.brand === 'Other' ? 'selected' : ''}`}
                            onClick={() => handleSelectWelcomeBrand('Other')}
                          >
                            <div className="wf-brand-logo-other">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                              </svg>
                            </div>
                            <p className="wf-brand-card-name">Other</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 2: Model Selection */}
                  <div className="wf-slide">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <button type="button" className="wf-back" onClick={handleWelcomeBack}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>Back
                      </button>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeCategory}</span>
                      </div>
                    </div>
                    
                    <h2 className="wf-slide-title-new">Select your {welcomeForm.brand} model</h2>
                    
                    <div className="wf-brand-grid-wrapper">
                      {/* Search model box with custom peer floating label and left search icon */}
                      <div className="wf-model-search-box">
                        <span className="wf-model-search-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </span>
                        <input
                          placeholder={`Select your model`}
                          className="peer wf-model-input"
                          autoComplete="off"
                          id="models-search"
                          type="text"
                          name="models-search"
                          value={modelSearchQuery}
                          onChange={(e) => setModelSearchQuery(e.target.value)}
                        />
                        <label
                          htmlFor="models-search"
                          className="wf-model-label"
                        >
                          Search {welcomeForm.brand} Model
                        </label>
                      </div>

                      <div className="wf-model-grid">
                        {filteredModels.map(model => (
                          <div
                            key={model.name}
                            className={`wf-model-card ${welcomeForm.model === model.name ? 'selected' : ''}`}
                            onClick={() => handleSelectWelcomeModel(model.name)}
                          >
                            <div className="wf-model-img-aspect">
                              <img 
                                src={model.logo} 
                                alt={model.name} 
                                loading="lazy" 
                                className="wf-model-img-inside" 
                                onError={(e) => {
                                  e.target.onerror = null;
                                  if (welcomeCategory === 'Bike / Scooter' || welcomeCategory === 'Bike') {
                                    e.target.src = 'https://images.91wheels.com/assets/b_images/gallery/heromotocorp/splendor-plus/heromotocorp-splendor-plus-0-1780550417.png?w=180&q=50';
                                  } else if (welcomeCategory === 'EV') {
                                    e.target.src = 'https://images.91wheels.com/assets/b_images/gallery/ola-electric/s1-pro/ola-s1-pro-1-1631389656.png?w=180&q=50';
                                  } else {
                                    e.target.src = 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png?w=180&q=50';
                                  }
                                }}
                              />
                            </div>
                            <p className="wf-model-card-name">{model.name}</p>
                          </div>
                        ))}

                        {/* Other model option */}
                        {(!modelSearchQuery || 'other'.includes(modelSearchQuery.toLowerCase())) && (
                          <div
                            className={`wf-model-card ${welcomeForm.model === 'Other' ? 'selected' : ''}`}
                            onClick={() => handleSelectWelcomeModel('Other')}
                          >
                            <div className="wf-model-logo-other">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                              </svg>
                            </div>
                            <p className="wf-model-card-name">Other</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 3: Variant Selection */}
                  <div className="wf-slide">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <button type="button" className="wf-back" onClick={handleWelcomeBack}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>Back
                      </button>
                      <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{welcomeCategory}</span>
                      </div>
                    </div>

                    <h2 className="wf-slide-title-new">Select {welcomeForm.model ? welcomeForm.model.replace(/^[^ ]+ /, '') + "'s" : ''} Variant</h2>

                    {/* Fuel & Transmission Dropdowns */}
                    <div className="wf-variant-filters">
                      <div className="wf-variant-filter-col">
                        <label className="wf-variant-filter-label">Fuel Type</label>
                        <div className="wf-variant-select-wrap">
                          <select
                            className="wf-variant-select"
                            value={variantFuelFilter}
                            onChange={e => setVariantFuelFilter(e.target.value)}
                          >
                            <option value="">All Fuels</option>
                            {availableFuels.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                          <svg className="wf-variant-select-caret" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4"/>
                          </svg>
                        </div>
                      </div>
                      <div className="wf-variant-filter-col">
                        <label className="wf-variant-filter-label">Transmission</label>
                        <div className="wf-variant-select-wrap">
                          <select
                            className="wf-variant-select"
                            value={variantTransFilter}
                            onChange={e => setVariantTransFilter(e.target.value)}
                          >
                            <option value="">All Types</option>
                            {availableTransmissions.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <svg className="wf-variant-select-caret" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Variant Search Input */}
                    <div className="wf-model-search-box" style={{ marginBottom: '10px' }}>
                      <span className="wf-model-search-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </span>
                      <input
                        placeholder="Search for your variant"
                        className="peer wf-model-input"
                        autoComplete="off"
                        id="variant-search"
                        type="text"
                        name="variant-search"
                        value={variantSearchQuery}
                        onChange={e => setVariantSearchQuery(e.target.value)}
                      />
                      <label htmlFor="variant-search" className="wf-model-label">Search variant...</label>
                    </div>

                    {/* Variant List */}
                    <div className="wf-variant-list">
                      {filteredVariants.length > 0 ? filteredVariants.map(variant => (
                        <div
                          key={variant.name}
                          className={`wf-variant-row ${welcomeForm.variant === variant.name ? 'selected' : ''}`}
                          onClick={() => handleSelectWelcomeVariant(variant.name)}
                        >
                          <span className="wf-variant-name">{variant.name}</span>
                          <div className="wf-variant-badges">
                            <span className="wf-variant-badge-fuel">{variant.fuel}</span>
                            <span className="wf-variant-badge-trans">{variant.transmission}</span>
                          </div>
                        </div>
                      )) : (
                        <div className="wf-variant-empty">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(0,0,0,0.25)', marginBottom: '8px' }}>
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                          </svg>
                          <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>No variants found. Try different filters.</p>
                        </div>
                      )}
                      {/* Other variant option always shown */}
                      {(!variantSearchQuery || 'other'.includes(variantSearchQuery.toLowerCase())) && (
                        <div
                          className={`wf-variant-row ${welcomeForm.variant === 'Other' ? 'selected' : ''}`}
                          onClick={() => handleSelectWelcomeVariant('Other')}
                        >
                          <span className="wf-variant-name">Other / Not Listed</span>
                        </div>
                      )}
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
                      {welcomeForm.model && (
                        <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{welcomeForm.model}</span>
                        </div>
                      )}
                      {welcomeForm.variant && (
                        <div className="wf-cat-chip" style={{ marginBottom: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{welcomeForm.variant}</span>
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
                    </div>
                    <div className="wf-pick-label" style={{ marginBottom: '14px' }}>Fill in your details</div>
                    <form id="wForm" onSubmit={handleWelcomeSubmit} noValidate>
                      <div className="field wf-form">
                        <label htmlFor="wName">Full Name</label>
                        <input id="wName" name="owner_name" type="text" placeholder="Your Full Name" required style={{ height: '44px', fontSize: '13px' }} value={welcomeForm.owner_name} onChange={(e) => setWelcomeForm(prev => ({ ...prev, owner_name: e.target.value }))} />
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
                {[0, 1, 2, 3, 4].map(idx => (
                  <div
                    key={idx}
                    className={`wf-dot ${welcomeSlide === idx ? 'active' : ''}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Sticky Bottom Nav Bar matching the user's custom design */}
            <div className="wf-footer-sticky-bottom">
              <button
                type="button"
                className="wf-nav-btn-bottom"
                onClick={handleWelcomeBack}
                disabled={welcomeSlide === 0}
                style={{ opacity: welcomeSlide === 0 ? 0.3 : 1, cursor: welcomeSlide === 0 ? 'not-allowed' : 'pointer' }}
                aria-label="Back"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <span className="wf-footer-text-bottom">
                {welcomeSlide === 0 && 'Select Category'}
                {welcomeSlide === 1 && 'Select Brand'}
                {welcomeSlide === 2 && 'Select Model'}
                {welcomeSlide === 3 && 'Select Variant'}
                {welcomeSlide === 4 && 'Your Details'}
              </span>
              <button
                type="button"
                className="wf-nav-btn-bottom"
                disabled={true}
                style={{ opacity: 0.3, cursor: 'not-allowed' }}
                aria-label="Forward"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
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


      {/* HERO SECTION — Modern BuyWheels Executive Banner */}
      <section className="hero-premium" id="heroSection" ref={heroRef}>

        {/* Dynamic subtle ambient mesh background */}
        <div className="hero-bloom-bg" aria-hidden="true">
          <div className="hero-bloom-mesh" />
          <div className="hero-blob hero-blob-a" />
          <div className="hero-blob hero-blob-b" />
          <div className="hero-blob hero-blob-c" />
        </div>

        {/* Main content grid */}
        <div className="hero-premium-in">
          
          <div className="hero-premium-content">
            {/* Live Trust Eyebrow Pill */}
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
              <span className="hero-ticker-text">{TICKER_MESSAGES[tickerIdx]}</span>
            </div>

            {/* Clean Professional Headline */}
            <h1 className="hero-premium-h1">
              Compare Prices.
              <span className="h1-line2 text-gradient-orange">
                Get Your Best Deal.
              </span>
            </h1>

            {/* Concise Sub-headline */}
            <p className="hero-premium-sub">
              Stop visiting multiple showrooms. BuyWheels connects you directly to 500+ verified car, bike &amp; EV dealerships in Jharkhand so you can compare real on-road quotes — 100% free.
            </p>

            {/* Redesigned Modern Search Engine */}
            <VehicleSearchCard
              onSelectCategory={handleSelectSearchCategory}
              onSelectVehicle={handleSelectSearchVehicle}
            />
          </div>

          {/* Right Visual Showcase Container */}
          <div className="hero-premium-visual">
            <div className="hero-visual-frame">
              <img src={heroShowroomImg} alt="BuyWheels Cars, Bikes, Scooters, and EVs Showroom" className="hero-visual-img" />
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
              <div className="step-d">Tell us which vehicle you want. Under 60 seconds — no account needed.</div>
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
                        let modelName = 'Creta';
                        let fuelVal = 'petrol';

                        if (selectedCompareCar === 'swift') {
                          brandName = 'Maruti Suzuki';
                          modelName = 'Swift';
                          fuelVal = 'petrol';
                        } else if (selectedCompareCar === 'nexonEv') {
                          brandName = 'Tata Motors';
                          modelName = 'Nexon EV';
                          fuelVal = 'electric';
                        }

                        setWelcomeCategory(selectedCompareCar === 'nexonEv' ? 'EV' : 'Car');
                        setWelcomeFuel(fuelVal);
                        setWelcomeTransmission('automatic');
                        setWelcomeBodyStyle('SUV');
                        setWelcomeForm(prev => ({
                          ...prev,
                          brand: brandName,
                          model: modelName
                        }));
                        setWelcomeSlide(4);
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

            <div className="hero-quick-cat-item" onClick={() => { handleSelectWelcomeCategory('Bike / Scooter'); setIsWelcomeOpen(true); }}>
              <div className="hero-quick-cat-img-box">
                <img src={catBikeImage} alt="Bikes" />
              </div>
              <div className="hero-quick-cat-info">
                <span className="hero-quick-cat-title">Bikes</span>
                <span className="hero-quick-cat-sub">Motorcycles</span>
              </div>
            </div>

            <div className="hero-quick-cat-item" onClick={() => { handleSelectWelcomeCategory('Bike / Scooter'); setIsWelcomeOpen(true); }}>
              <div className="hero-quick-cat-img-box">
                <img src={catScooterImage} alt="Scooters" />
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
