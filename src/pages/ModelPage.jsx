import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_BRANDS, BRAND_MODELS, getBrandBySlug } from './BrandPage';
import { CAR_CATALOG, BIKE_CATALOG } from '../lib/supabase';
import { TestDriveConfirmationCard } from '../components/TestDriveModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AreaSearchModal from '../components/AreaSearchModal';
import '../styles/reset.css';
import '../styles/buyer.css';

// ── Explicit model catalog overrides for specific models ───────────────────────
const BE_6E_CATALOG_DATA = {
  name: 'Mahindra BE 6e', price: '18.90-26.90 L', type: 'Electric SUV', fuel: 'Electric',
  img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png?w=640&q=75',
  desc: 'Mahindra BE 6e is the cutting-edge electric SUV built on the ground-up INGLO EV platform. Features 682 km ARAI range, dual 12.3-inch displays, ultra-fast 175 kW DC charging, and 5-Star safety.',
  specs: { engine: 'Permanent Magnet Synchronous Motor', power: '286 bhp (AWD) / 231 bhp (RWD)', torque: '380 Nm', transmission: 'Single-Speed Automatic', seating: '5', mileage: '682 km Range (79 kWh)', safety: '5-Star GNCAP Safety Platform' },
  variants: [
    { name: 'Pack 1 Standard (59 kWh)', price: '18.90 L', fuel: 'Electric' },
    { name: 'Pack 2 Standard (59 kWh)', price: '21.90 L', fuel: 'Electric' },
    { name: 'Pack 2 Long Range (79 kWh)', price: '23.90 L', fuel: 'Electric' },
    { name: 'Pack 3 Luxury Pack (79 kWh)', price: '25.90 L', fuel: 'Electric' },
    { name: 'Pack 3 Three-Vector AWD (79 kWh)', price: '26.90 L', fuel: 'Electric' },
  ],
  colors: ['Stealth Black', 'Everest White', 'Desert Gold', 'Sonic Silver', 'Crimson Red'],
  highlights: ['INGLO Dedicated EV Platform', '682 km Certified Ultra-Long Range', '175 kW DC Fast Charge (20-80% in 20m)', 'Level 2+ ADAS Safety Suite', 'Dual 12.3-inch Curved Displays & Vision Roof'],
};

const SKODA_SLAVIA_CATALOG = {
  name: 'Skoda Slavia', price: '10.00-18.54 L', type: 'Sedan', fuel: 'Petrol',
  img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/slavia/skoda-slavia-0-1767850473.png?w=640&q=75',
  desc: 'The Skoda Slavia is a premium mid-size sedan offering 5-Star GNCAP safety, powerful 1.0L & 1.5L TSI Turbo engines, ventilated seats, and elegant Czech craftsmanship.',
  specs: { engine: '1.0L TSI / 1.5L TSI EVO', power: '115 bhp / 150 bhp', torque: '178 Nm / 250 Nm', transmission: '6-Speed MT / 6-Speed AT / 7-Speed DSG', seating: '5', mileage: '19.47 kmpl', safety: '5-Star GNCAP' },
  variants: [
    { name: '1.0L TSI Active MT', price: '10.00 L', fuel: 'Petrol' },
    { name: '1.0L TSI Ambition MT', price: '12.39 L', fuel: 'Petrol' },
    { name: '1.0L TSI Ambition AT', price: '13.69 L', fuel: 'Petrol' },
    { name: '1.0L TSI Style MT', price: '14.59 L', fuel: 'Petrol' },
    { name: '1.0L TSI Style AT', price: '15.89 L', fuel: 'Petrol' },
    { name: '1.5L TSI Style MT', price: '16.19 L', fuel: 'Petrol' },
    { name: '1.5L TSI Style DSG', price: '17.39 L', fuel: 'Petrol' },
    { name: '1.5L TSI Monte Carlo DSG', price: '18.54 L', fuel: 'Petrol' },
  ],
  colors: ['Tornado Red', 'Candy White', 'Brilliant Silver', 'Carbon Steel', 'Deep Black', 'Lava Blue'],
  highlights: ['5-Star GNCAP Safety Rating', '1.5L TSI Engine with ACT', '10-inch Touchscreen', 'Electric Sunroof & Ventilated Seats', 'Subwoofer Sound System'],
};

const MODEL_CATALOG = {
  'skoda': {
    'slavia': SKODA_SLAVIA_CATALOG,
    'kushaq': {
      name: 'Skoda Kushaq', price: '10.69-19.34 L', type: 'SUV', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kushaq/skoda-kushaq-0-1774256060.png?w=640&q=75',
      desc: 'Skoda Kushaq is a robust SUV engineered for Indian roads. Features 5-Star GNCAP safety, high ground clearance, 10-inch Infotainment, and TSI Turbo Performance.',
      specs: { engine: '1.0L TSI / 1.5L TSI EVO', power: '115 bhp / 150 bhp', torque: '178 Nm / 250 Nm', transmission: '6-Speed MT / 6-Speed AT / 7-Speed DSG', seating: '5', mileage: '19.76 kmpl', safety: '5-Star GNCAP' },
      variants: [
        { name: '1.0L TSI Active MT', price: '10.69 L', fuel: 'Petrol' },
        { name: '1.0L TSI Ambition MT', price: '12.59 L', fuel: 'Petrol' },
        { name: '1.0L TSI Ambition AT', price: '13.99 L', fuel: 'Petrol' },
        { name: '1.0L TSI Style MT', price: '14.99 L', fuel: 'Petrol' },
        { name: '1.5L TSI Style DSG', price: '17.99 L', fuel: 'Petrol' },
        { name: '1.5L TSI Monte Carlo DSG', price: '19.34 L', fuel: 'Petrol' },
      ],
      colors: ['Honey Orange', 'Tornado Red', 'Candy White', 'Carbon Steel', 'Brilliant Silver'],
      highlights: ['5-Star Adult & Child GNCAP Safety', 'Active Cylinder Technology', 'Ventilated Front Seats', 'MySkoda Connect App', 'Wireless CarPlay & Android Auto'],
    },
    'kodiaq': {
      name: 'Skoda Kodiaq', price: '36.99-39.99 L', type: 'SUV', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq/skoda-kodiaq-0-1767851128.png?w=640&q=75',
      desc: 'The luxury 4x4 7-seater SUV from Skoda. Kodiaq features a 2.0L TSI engine, 7-Speed DSG 4x4 transmission, Dynamic Chassis Control, and CANTON 12-speaker audio.',
      specs: { engine: '2.0L TSI Turbo Petrol', power: '190 bhp', torque: '320 Nm', transmission: '7-Speed DSG 4x4', seating: '7', mileage: '13.32 kmpl', safety: '9 Airbags & 5-Star Euro NCAP' },
      variants: [
        { name: '2.0L TSI Style 4x4 DSG', price: '36.99 L', fuel: 'Petrol' },
        { name: '2.0L TSI Sportline 4x4 DSG', price: '38.49 L', fuel: 'Petrol' },
        { name: '2.0L TSI L&K 4x4 DSG', price: '39.99 L', fuel: 'Petrol' },
      ],
      colors: ['Moon White', 'Lava Blue', 'Graphite Grey', 'Magic Black'],
      highlights: ['Dynamic Chassis Control (DCC)', '4x4 All Wheel Drive System', 'CANTON 12-Speaker Sound', 'Virtual Cockpit Display', 'Panoramic Sunroof'],
    },
    'kylaq': {
      name: 'Skoda Kylaq', price: '7.59-12.99 L', type: 'SUV', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kylaq/skoda-kylaq-7-1775204345.png?w=640&q=75',
      desc: 'The all-new Skoda Kylaq sub-4m SUV brings European engineering, 1.0L TSI Turbo power, 6 airbags standard, and modern tech to a wider audience.',
      specs: { engine: '1.0L TSI Turbo Petrol', power: '115 bhp', torque: '178 Nm', transmission: '6-Speed MT / 6-Speed Torque Converter AT', seating: '5', mileage: '20.1 kmpl', safety: '6 Airbags Standard & 5-Star Platform' },
      variants: [
        { name: '1.0L TSI Classic MT', price: '7.59 L', fuel: 'Petrol' },
        { name: '1.0L TSI Signature MT', price: '9.59 L', fuel: 'Petrol' },
        { name: '1.0L TSI Signature AT', price: '10.89 L', fuel: 'Petrol' },
        { name: '1.0L TSI Prestige AT', price: '12.99 L', fuel: 'Petrol' },
      ],
      colors: ['Olive Gold', 'Tornado Red', 'Candy White', 'Carbon Steel', 'Brilliant Silver'],
      highlights: ['6 Airbags Standard Across All Variants', 'Electric Sunroof & Wireless Charger', '10.1-inch Infotainment Display', 'Multi-Collision Braking System'],
    }
  },
  'mahindra-ev': {
    'be-6e': BE_6E_CATALOG_DATA,
  },
  'mahindra': {
    'be-6e': BE_6E_CATALOG_DATA,
    'scorpio-n': {
      name: 'Mahindra Scorpio N', price: '13.49-24.95 L', type: 'SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-3-1767930813.png?w=640&q=75',
      desc: 'The Big Daddy of SUVs. Mahindra Scorpio N combines muscular design, 4XPLOR terrain management, 5-Star GNCAP safety, and luxury interiors.',
      specs: { engine: '2.0L mStallion TGDi / 2.2L mHawk Diesel', power: '200 bhp / 172 bhp', torque: '380 Nm / 400 Nm', transmission: '6-Speed Manual / 6-Speed Automatic', seating: '6 / 7', mileage: '19 kmpl', safety: '5-Star GNCAP' },
      variants: [
        { name: 'Z2 2L mStallion Petrol MT', price: '13.49 L', fuel: 'Petrol' },
        { name: 'Z2 2.2L mHawk Diesel MT', price: '13.99 L', fuel: 'Diesel' },
        { name: 'Z4 2L mStallion Petrol MT', price: '15.44 L', fuel: 'Petrol' },
        { name: 'Z4 2.2L mHawk Diesel MT', price: '15.85 L', fuel: 'Diesel' },
        { name: 'Z4 2.2L mHawk 4WD Diesel MT', price: '18.02 L', fuel: 'Diesel' },
        { name: 'Z6 2.2L mHawk Diesel MT', price: '16.90 L', fuel: 'Diesel' },
        { name: 'Z6 2.2L mHawk Diesel AT', price: '18.52 L', fuel: 'Diesel' },
        { name: 'Z8 (S) Petrol MT', price: '17.25 L', fuel: 'Petrol' },
        { name: 'Z8 L Diesel 4WD AT', price: '24.95 L', fuel: 'Diesel' },
      ],
      colors: ['Deep Forest', 'Everest White', 'Napoli Black', 'Dazzling Silver', 'Grand Canyon'],
      highlights: ['4XPLOR Terrain System', 'AdrenoX Connected System', 'Single Pane Sunroof', 'Dual Zone FATC', 'Sony 12-Speaker Sound System'],
    },
    'thar': {
      name: 'Mahindra Thar', price: '11.35-17.60 L', type: 'Off-road SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar/mahindra-thar-8-1771924749.png?w=640&q=75',
      desc: 'The iconic lifestyle 4x4 SUV. Mahindra Thar offers incredible off-road capability, aggressive stance, and option of Hard Top / Convertible Top.',
      specs: { engine: '2.0L mStallion / 1.5L Diesel / 2.2L mHawk', power: '150 bhp / 117 bhp / 130 bhp', torque: '320 Nm / 300 Nm / 300 Nm', transmission: 'Manual / Automatic', seating: '4', mileage: '15.2 kmpl', safety: '4-Star GNCAP' },
      variants: [
        { name: 'AX Opt 1.5 Diesel RWD Hard Top', price: '11.35 L', fuel: 'Diesel' },
        { name: 'LX 1.5 Diesel RWD Hard Top', price: '12.80 L', fuel: 'Diesel' },
        { name: 'LX 2.0 Petrol RWD AT Hard Top', price: '14.10 L', fuel: 'Petrol' },
        { name: 'LX 2.2 Diesel 4WD Hard Top', price: '15.75 L', fuel: 'Diesel' },
        { name: 'LX 2.2 Diesel 4WD AT Hard Top', price: '17.60 L', fuel: 'Diesel' },
      ],
      colors: ['Napoli Black', 'Galaxy Grey', 'Rocky Beige', 'Red Rage', 'Aquamarine'],
      highlights: ['4WD Shift-on-Fly Transfer Case', 'Mechanical Locking Rear Differential', 'Washable Rubber Floor', '7-inch Touchscreen'],
    },
    'xuv700': {
      name: 'Mahindra XUV700', price: '13.99-26.99 L', type: 'SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-7xo/mahindra-xuv-7xo-0-1768365160.png?w=640&q=75',
      desc: 'Mahindra XUV700 sets new benchmarks with ADAS Level 2, dual 10.25-inch screens, 3D Sound by Sony, and powerful mStallion & mHawk engines.',
      specs: { engine: '2.0L mStallion / 2.2L mHawk', power: '200 bhp / 185 bhp', torque: '380 Nm / 450 Nm', transmission: 'Manual / Automatic', seating: '5 / 7', mileage: '16.57 kmpl', safety: '5-Star GNCAP' },
      variants: [
        { name: 'MX Petrol MT 5 Seater', price: '13.99 L', fuel: 'Petrol' },
        { name: 'AX3 Petrol MT 5 Seater', price: '16.39 L', fuel: 'Petrol' },
        { name: 'AX5 Petrol MT 7 Seater', price: '17.99 L', fuel: 'Petrol' },
        { name: 'AX7 Diesel MT 7 Seater', price: '21.49 L', fuel: 'Diesel' },
        { name: 'AX7 Luxury Pack AWD AT', price: '26.99 L', fuel: 'Diesel' },
      ],
      colors: ['Midnight Black', 'Electric Blue', 'Dazzling Silver', 'Red Rage', 'Everest White'],
      highlights: ['ADAS Level 2 Safety', 'Skyroof (Largest Sunroof)', 'Flush Door Handles', 'Sony 3D Audio', 'Blind View Monitor'],
    },
  },
  'hyundai': {
    'creta': {
      name: 'Hyundai Creta', price: '11.00-20.15 L', type: 'SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta/hyundai-creta-1-1766205711.png?w=640&q=75',
      desc: 'The Hyundai Creta is India top-selling mid-size SUV, offering a perfect blend of style, comfort, and technology. It features a bold design, spacious cabin, and a range of modern features.',
      specs: { engine: '1.5L Petrol / 1.5L Diesel', power: '115 bhp / 116 bhp', torque: '144 Nm / 250 Nm', transmission: 'Manual / Automatic', seating: '5', mileage: '17.4 kmpl', safety: '5-Star GNCAP' },
      variants: [
        { name: 'E', price: '11.00 L', fuel: 'Petrol' },
        { name: 'EX', price: '12.16 L', fuel: 'Petrol' },
        { name: 'S', price: '13.42 L', fuel: 'Petrol' },
        { name: 'S(O)', price: '14.48 L', fuel: 'Petrol' },
        { name: 'SX', price: '15.73 L', fuel: 'Petrol' },
        { name: 'SX(O)', price: '19.22 L', fuel: 'Diesel' },
        { name: 'SX Tech', price: '20.15 L', fuel: 'Diesel' },
      ],
      colors: ['Atlas White', 'Abyss Black', 'Titan Grey', 'Ranger Khaki', 'Fiery Red', 'Starry Night'],
      highlights: ['Panoramic Sunroof', 'ADAS Level 2', 'BlueLink Connected Car', '10.25" Touchscreen', 'Bose Sound System'],
    },
    'venue': {
      name: 'Hyundai Venue', price: '7.94-13.38 L', type: 'SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue/hyundai-venue-0-1771412163.png?w=640&q=75',
      desc: 'The Hyundai Venue is a compact SUV packed with premium features at an affordable price. It offers segment-first features like a connected car tech and a sporty design.',
      specs: { engine: '1.2L / 1.0L Turbo / 1.5L Diesel', power: '83 bhp / 120 bhp / 100 bhp', torque: '115 Nm / 172 Nm / 240 Nm', transmission: 'Manual / DCT / iMT', seating: '5', mileage: '18.15 kmpl', safety: '3-Star GNCAP' },
      variants: [
        { name: 'E', price: '7.94 L', fuel: 'Petrol' },
        { name: 'S', price: '9.45 L', fuel: 'Petrol' },
        { name: 'S(O)', price: '10.45 L', fuel: 'Petrol' },
        { name: 'SX', price: '11.35 L', fuel: 'Petrol' },
        { name: 'SX+', price: '13.38 L', fuel: 'Petrol' },
      ],
      colors: ['Polar White', 'Typhoon Silver', 'Titan Grey', 'Fiery Red', 'Deep Forest'],
      highlights: ['BlueLink Connected Car', 'Sunroof', 'Wireless Charger', 'Bose Sound System', 'TPMS'],
    },
    'exter': {
      name: 'Hyundai Exter', price: '6.13-10.23 L', type: 'Micro SUV', fuel: 'Petrol/CNG',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/exter/hyundai-exter-5-1776074667.png?w=640&q=75',
      desc: 'Hyundai Exter is an adventurous micro-SUV that brings premium features to the entry-level segment. Bold design, connected features, and exceptional fuel efficiency.',
      specs: { engine: '1.2L Petrol / 1.2L CNG', power: '83 bhp / 68.9 bhp', torque: '114 Nm / 95.2 Nm', transmission: 'Manual / AMT', seating: '5', mileage: '19.4 kmpl', safety: '3-Star GNCAP' },
      variants: [
        { name: 'EX', price: '6.13 L', fuel: 'Petrol' },
        { name: 'S', price: '7.20 L', fuel: 'Petrol' },
        { name: 'SX', price: '8.49 L', fuel: 'Petrol' },
        { name: 'SX(O)', price: '10.23 L', fuel: 'Petrol' },
      ],
      colors: ['Starry Night', 'Atlas White', 'Ranger Khaki', 'Abyss Black', 'Fiery Red'],
      highlights: ['Dashcam', 'BlueLink Connected Car', 'Sunroof', 'Wireless Charger', 'Voice Commands'],
    },
    'i20': {
      name: 'Hyundai i20', price: '7.04-11.21 L', type: 'Hatchback', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20/hyundai-i20-0-1785148547.png?w=640&q=75',
      desc: 'The Hyundai i20 is a premium hatchback that redefined the segment with its bold design, feature-loaded cabin, and spirited performance. Perfect for the modern urban driver.',
      specs: { engine: '1.2L Petrol / 1.0L Turbo / 1.5L Diesel', power: '83 bhp / 120 bhp / 100 bhp', torque: '115 Nm / 172 Nm / 240 Nm', transmission: 'Manual / IVT / DCT', seating: '5', mileage: '20.35 kmpl', safety: '3-Star GNCAP' },
      variants: [
        { name: 'Magna', price: '7.04 L', fuel: 'Petrol' },
        { name: 'Sportz', price: '8.29 L', fuel: 'Petrol' },
        { name: 'Asta', price: '9.49 L', fuel: 'Petrol' },
        { name: 'Asta(O)', price: '11.21 L', fuel: 'Diesel' },
      ],
      colors: ['Polar White', 'Typhoon Silver', 'Titan Grey', 'Fiery Red', 'Starry Night'],
      highlights: ['Sunroof', 'BlueLink Connected', '10.25" Touchscreen', 'Bose 7-Speaker', 'ADAS'],
    },
    'verna': {
      name: 'Hyundai Verna', price: '10.90-17.38 L', type: 'Sedan', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/verna/hyundai-verna-0-1773131163.png?w=640&q=75',
      desc: 'The 5th-gen Hyundai Verna is a bold, tech-heavy sedan with a fastback roofline. Packed with ADAS safety and luxury features, it redefines the C-segment sedan.',
      specs: { engine: '1.5L NA / 1.5L Turbo', power: '115 bhp / 160 bhp', torque: '144 Nm / 253 Nm', transmission: 'Manual / IVT / DCT', seating: '5', mileage: '20.6 kmpl', safety: '3-Star GNCAP' },
      variants: [
        { name: 'EX', price: '10.90 L', fuel: 'Petrol' },
        { name: 'S', price: '12.49 L', fuel: 'Petrol' },
        { name: 'SX', price: '14.29 L', fuel: 'Petrol' },
        { name: 'SX Tech', price: '17.38 L', fuel: 'Petrol' },
      ],
      colors: ['Atlas White', 'Abyss Black', 'Titan Grey', 'Fiery Red', 'Robust Emerald'],
      highlights: ['ADAS Level 2', 'Panoramic Sunroof', 'Bose Sound System', 'BlueLink OTA', 'Ventilated Seats'],
    },
    'grand-i10-nios': {
      name: 'Hyundai Grand i10 Nios', price: '5.92-9.12 L', type: 'Hatchback', fuel: 'Petrol/CNG',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/grand-i10-nios/hyundai-grand-i10-nios-0-1766214369.png?w=640&q=75',
      desc: 'The Hyundai Grand i10 Nios is a cheerful and practical hatchback offering excellent fuel efficiency and a feature-loaded cabin, ideal for city driving.',
      specs: { engine: '1.2L Petrol / 1.2L CNG', power: '83 bhp / 68.9 bhp', torque: '114 Nm / 95.2 Nm', transmission: 'Manual / AMT', seating: '5', mileage: '20.7 kmpl', safety: 'NA' },
      variants: [
        { name: 'Era', price: '5.92 L', fuel: 'Petrol' },
        { name: 'Magna', price: '6.80 L', fuel: 'Petrol' },
        { name: 'Sportz', price: '7.60 L', fuel: 'Petrol' },
        { name: 'Asta', price: '9.12 L', fuel: 'Petrol' },
      ],
      colors: ['Polar White', 'Typhoon Silver', 'Fiery Red', 'Aqua Teal', 'Abyss Black'],
      highlights: ['Wireless Charger', 'BlueLink', 'Rear AC Vents', 'Push Button Start', 'Trunk Light'],
    },
    'aura': {
      name: 'Hyundai Aura', price: '6.35-9.22 L', type: 'Compact Sedan', fuel: 'Petrol/CNG',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/aura/hyundai-aura-7-1773214499.png?w=640&q=75',
      desc: 'The Hyundai Aura is a compact sedan with a dynamic design and strong fuel efficiency. It offers the practicality of a boot with the charm of a premium hatchback.',
      specs: { engine: '1.2L Petrol / 1.2L CNG', power: '83 bhp / 68.9 bhp', torque: '114 Nm / 95.2 Nm', transmission: 'Manual / AMT', seating: '5', mileage: '20.5 kmpl', safety: 'NA' },
      variants: [
        { name: 'E', price: '6.35 L', fuel: 'Petrol' },
        { name: 'S', price: '7.49 L', fuel: 'Petrol' },
        { name: 'SX', price: '8.35 L', fuel: 'Petrol' },
        { name: 'SX+', price: '9.22 L', fuel: 'Petrol' },
      ],
      colors: ['Polar White', 'Typhoon Silver', 'Fiery Red', 'Abyss Black', 'Titan Grey'],
      highlights: ['BlueLink Connected', 'Wireless Charger', 'LED DRLs', 'Cruise Control', 'Rear Camera'],
    },
    'alcazar': {
      name: 'Hyundai Alcazar', price: '14.99-21.46 L', type: '3-Row SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/alcazar/hyundai-alcazar-8-1766205340.png?w=640&q=75',
      desc: 'Built on the Creta platform, the Hyundai Alcazar is a 3-row SUV with executive styling, captain seating in the 2nd row, and a powerful 2.0L engine option.',
      specs: { engine: '1.5L Turbo / 2.0L Petrol / 1.5L Diesel', power: '158 bhp / 159 bhp / 116 bhp', torque: '253 Nm / 192 Nm / 250 Nm', transmission: 'Manual / DCT / Automatic', seating: '6/7', mileage: '14.5 kmpl', safety: 'NA' },
      variants: [
        { name: 'Prestige', price: '14.99 L', fuel: 'Petrol' },
        { name: 'Platinum', price: '16.74 L', fuel: 'Petrol' },
        { name: 'Signature', price: '19.24 L', fuel: 'Diesel' },
        { name: 'Signature(O)', price: '21.46 L', fuel: 'Diesel' },
      ],
      colors: ['Atlas White', 'Abyss Black', 'Titan Grey', 'Ranger Khaki', 'Fiery Red'],
      highlights: ['Captain Seats', 'Panoramic Sunroof', 'ADAS Level 2', 'BlueLink', '10.25" Dual Screens'],
    },
    'creta-ev': {
      name: 'Hyundai Creta Electric', price: '17.99-23.50 L', type: 'Electric SUV', fuel: 'Electric',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-ev/hyundai-creta-ev-0-1767876338.png?w=640&q=75',
      desc: 'The Hyundai Creta Electric is an all-electric SUV with impressive range, fast charging, and all the premium features of the ICE Creta — now emission-free.',
      specs: { engine: 'Electric Motor', power: '135 bhp / 170 bhp', torque: '255 Nm / 350 Nm', transmission: 'Single-speed AT', seating: '5', mileage: '473 km / 390 km range', safety: '5-Star GNCAP' },
      variants: [
        { name: 'Long Range Executive', price: '17.99 L', fuel: 'Electric' },
        { name: 'Long Range Smart', price: '19.49 L', fuel: 'Electric' },
        { name: 'Long Range S', price: '20.99 L', fuel: 'Electric' },
        { name: 'Long Range SX', price: '22.49 L', fuel: 'Electric' },
        { name: 'Long Range SX Tech', price: '23.50 L', fuel: 'Electric' },
      ],
      colors: ['Atlas White', 'Abyss Black', 'Starry Night', 'Robust Emerald', 'Titan Grey'],
      highlights: ['473km Range', 'V2L (Vehicle-to-Load)', 'ADAS Level 2', 'BlueLink EV', 'Panoramic Sunroof'],
    },
    'i20-n-line': {
      name: 'Hyundai i20 N Line', price: '9.99-13.06 L', type: 'Sporty Hatchback', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20-n-line/hyundai-i20-n-line-6-1766729684.png?w=640&q=75',
      desc: 'The i20 N Line is the sporty heart of the i20 family, featuring exclusive N styling, sport-tuned suspension, and the powerful 1.0T GDi engine for a thrilling drive.',
      specs: { engine: '1.0L Turbo GDi', power: '120 bhp', torque: '172 Nm', transmission: '7-speed DCT', seating: '5', mileage: '20.96 kmpl', safety: 'NA' },
      variants: [
        { name: 'N6 MT', price: '9.99 L', fuel: 'Petrol' },
        { name: 'N8 MT', price: '11.19 L', fuel: 'Petrol' },
        { name: 'N8 DCT', price: '12.22 L', fuel: 'Petrol' },
        { name: 'N8(O) DCT', price: '13.06 L', fuel: 'Petrol' },
      ],
      colors: ['Phantom Black', 'Titan Grey', 'Atlas White', 'Starry Night', 'Thunder Blue'],
      highlights: ['N Sport Button', 'Paddle Shifters', 'N-branded Interior', 'Sport-Tuned Suspension', 'Dual Exhaust Tips'],
    },
    'venue-n-line': {
      name: 'Hyundai Venue N Line', price: '12.16-14.63 L', type: 'Sporty SUV', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue-n-line/hyundai-venue-n-line-0-1766211212.png?w=640&q=75',
      desc: 'Venue N Line takes the already stylish Venue and turns up the sportiness with N-specific design, suspension tuning, and DCT transmission for an engaging SUV experience.',
      specs: { engine: '1.0L Turbo GDi', power: '120 bhp', torque: '172 Nm', transmission: '7-speed DCT / 6-speed iMT', seating: '5', mileage: '18.27 kmpl', safety: 'NA' },
      variants: [
        { name: 'N6 iMT', price: '12.16 L', fuel: 'Petrol' },
        { name: 'N8 DCT', price: '13.49 L', fuel: 'Petrol' },
        { name: 'N8(O) DCT', price: '14.63 L', fuel: 'Petrol' },
      ],
      colors: ['Phantom Black', 'Titan Grey', 'Atlas White', 'Cyber Yellow', 'Deep Forest'],
      highlights: ['N Sport Mode', 'Paddle Shifters', 'Sport Seats', 'Bose Sound System', 'Sunroof'],
    },
    'creta-n-line': {
      name: 'Hyundai Creta N Line', price: '16.82-19.59 L', type: 'Sporty SUV', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-n-line/hyundai-creta-n-line-8-1766213045.png?w=640&q=75',
      desc: 'The most powerful Creta yet. The Creta N Line pairs the 1.5T Turbo engine with sport-tuned suspension, exclusive N styling, and ADAS for a truly driver-focused SUV.',
      specs: { engine: '1.5L Turbo GDi', power: '158 bhp', torque: '253 Nm', transmission: '7-speed DCT', seating: '5', mileage: '16.84 kmpl', safety: 'NA' },
      variants: [
        { name: 'N8 DCT', price: '16.82 L', fuel: 'Petrol' },
        { name: 'N10 DCT', price: '18.18 L', fuel: 'Petrol' },
        { name: 'N10(O) DCT', price: '19.59 L', fuel: 'Petrol' },
      ],
      colors: ['Phantom Black', 'Atlas White', 'Titan Grey', 'Fiery Red', 'Starry Night'],
      highlights: ['N Sport Button', 'ADAS Level 2', 'Panoramic Sunroof', 'Bose Sound', 'Paddle Shifters'],
    },
  },
  'maruti-suzuki': {
    'swift': {
      name: 'Maruti Suzuki Swift', price: '6.49-9.64 L', type: 'Hatchback', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-0-1716461406.png?w=640&q=75',
      desc: 'The iconic Maruti Suzuki Swift returns bigger and better in its 4th generation. With a new Z-series engine, aggressive styling, and enhanced tech, it continues to dominate the hatchback segment.',
      specs: { engine: '1.2L Z12E Petrol', power: '82 bhp', torque: '112 Nm', transmission: 'Manual / AMT', seating: '5', mileage: '24.8 kmpl', safety: '3-Star GNCAP' },
      variants: [
        { name: 'LXI', price: '6.49 L', fuel: 'Petrol' },
        { name: 'VXI', price: '7.24 L', fuel: 'Petrol' },
        { name: 'ZXI', price: '8.29 L', fuel: 'Petrol' },
        { name: 'ZXI+', price: '9.64 L', fuel: 'Petrol' },
      ],
      colors: ['Speedy Blue', 'Magma Grey', 'Lucent Orange', 'Pearl Arctic White', 'Midnight Black'],
      highlights: ['Heads-Up Display', 'HUD', '9" Touchscreen', 'Lane Watch Camera', 'Wireless Charging'],
    },
    'brezza': {
      name: 'Maruti Suzuki Brezza', price: '8.34-14.14 L', type: 'SUV', fuel: 'Petrol',
      img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/brezza/maruti-brezza-0-1716461406.png?w=640&q=75',
      desc: 'Maruti Brezza is India most trusted compact SUV. Bold styling, advanced safety, and the efficiency of a mild-hybrid system make it the go-to family SUV.',
      specs: { engine: '1.5L K-Series Smart Hybrid', power: '103 bhp', torque: '137 Nm', transmission: 'Manual / AMT / AT', seating: '5', mileage: '19.89 kmpl', safety: '4-Star GNCAP' },
      variants: [
        { name: 'LXI', price: '8.34 L', fuel: 'Petrol' },
        { name: 'VXI', price: '9.99 L', fuel: 'Petrol' },
        { name: 'ZXI', price: '12.29 L', fuel: 'Petrol' },
        { name: 'ZXI+', price: '14.14 L', fuel: 'Petrol' },
      ],
      colors: ['Bluish Black', 'Splendid Silver', 'Brave Khaki', 'Earthen Brown', 'Pearl Arctic White'],
      highlights: ['9-Speaker Arkamys', 'HUD', 'Panoramic Roof', '360 Camera', 'ADAS'],
    },
  },
  'tata': {
    'nexon': {
      name: 'Tata Nexon', price: '7.99-15.80 L', type: 'SUV', fuel: 'Petrol/Diesel',
      img: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon/tata-nexon-0-1716461406.png?w=640&q=75',
      desc: 'Tata Nexon is India first 5-Star GNCAP-rated car. The safest compact SUV with bold styling and turbocharged engines delivers an exciting driving experience.',
      specs: { engine: '1.2L Turbo Petrol / 1.5L Diesel', power: '120 bhp / 115 bhp', torque: '170 Nm / 260 Nm', transmission: 'Manual / AMT / AT', seating: '5', mileage: '17.01 kmpl', safety: '5-Star GNCAP' },
      variants: [
        { name: 'Smart', price: '7.99 L', fuel: 'Petrol' },
        { name: 'Pure', price: '9.49 L', fuel: 'Petrol' },
        { name: 'Creative', price: '11.19 L', fuel: 'Petrol' },
        { name: 'Fearless', price: '13.49 L', fuel: 'Diesel' },
        { name: 'Accomplished', price: '15.80 L', fuel: 'Diesel' },
      ],
      colors: ['Flame Red', 'Daytona Grey', 'Pristine White', 'Intense Teal', 'Calgary White Gold'],
      highlights: ['5-Star GNCAP', 'Harman Sound', 'iRA Connected Car', 'ADAS', 'Electric Sunroof'],
    },
  },
};

const FUEL_COLORS = {
  Petrol: { bg: '#FFF5EC', color: '#FF6A00', border: '#FFD4A8' },
  Diesel: { bg: '#EEF4FF', color: '#2563EB', border: '#BFDBFE' },
  Electric: { bg: '#ECFDF5', color: '#16A34A', border: '#A7F3D0' },
  Hybrid: { bg: '#F0FDF4', color: '#22C55E', border: '#86EFAC' },
  Various: { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' },
};

const getFuelColor = (fuel) => FUEL_COLORS[fuel] || FUEL_COLORS.Various;
function resolveModelData(slug, modelSlug) {
  const brandObj = getBrandBySlug(slug) || {
    name: (slug || 'Brand').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    slug: (slug || 'brand').toLowerCase(),
    country: 'International',
    founded: 1950,
    segment: 'Automobile'
  };

  const brandSlug = brandObj.slug;

  if (MODEL_CATALOG[brandSlug] && MODEL_CATALOG[brandSlug][modelSlug]) {
    return MODEL_CATALOG[brandSlug][modelSlug];
  }
  if (MODEL_CATALOG[slug] && MODEL_CATALOG[slug][modelSlug]) {
    return MODEL_CATALOG[slug][modelSlug];
  }

  const modelsForBrand = [...(BRAND_MODELS[brandSlug] || []), ...(BRAND_MODELS[slug] || [])];
  const foundModel = modelsForBrand.find(
    (m) => m.slug === modelSlug || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === modelSlug
  );

  const rawModelName = foundModel ? foundModel.name : modelSlug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const fullModelName = rawModelName.toLowerCase().includes(brandObj.name.toLowerCase()) ? rawModelName : `${brandObj.name} ${rawModelName}`;
  const priceStr = foundModel?.price ? foundModel.price : '8.49-15.99 L';
  const typeStr = foundModel?.type || (brandObj.segment === 'EV' ? 'Electric SUV' : 'SUV');
  const fuelStr = foundModel?.fuel || (brandObj.segment === 'EV' ? 'Electric' : 'Petrol');
  const imgUrl = foundModel?.img || 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png';

  let variantNames = [];
  const COMBINED = { ...CAR_CATALOG, ...BIKE_CATALOG };
  const catalogBrandKey = Object.keys(COMBINED).find(k => k.toLowerCase() === brandObj.name.toLowerCase() || k.toLowerCase() === slug.toLowerCase()) || brandObj.name;
  const catalogCars = COMBINED[catalogBrandKey] || COMBINED[brandObj.name] || [];
  const catalogCar = catalogCars.find(c => c.name.toLowerCase() === rawModelName.toLowerCase() || rawModelName.toLowerCase().includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(rawModelName.toLowerCase()));

  if (catalogCar && catalogCar.variants && catalogCar.variants.length > 0) {
    variantNames = catalogCar.variants;
  } else {
    if (fuelStr.includes('Electric')) {
      variantNames = ['Pack 1 Standard', 'Pack 2 Long Range', 'Smart EV', 'Empowered EV'];
    } else if (brandObj.name.includes('Mahindra')) {
      variantNames = ['MX1', 'AX3', 'AX5', 'AX7', 'AX7 Luxury Pack AWD'];
    } else {
      variantNames = ['Base Trim (STD)', 'Mid Trim', 'Top Trim', 'Automatic', 'CNG Eco Trim'];
    }
  }

  const numMatch = priceStr.match(/(\d+\.?\d*)/);
  const basePriceNum = numMatch ? parseFloat(numMatch[1]) : 7.5;

  const variants = variantNames.map((vName, idx) => {
    const vPrice = (basePriceNum + idx * 0.95).toFixed(2);
    return {
      name: typeof vName === 'string' ? vName : vName.name,
      price: `${vPrice} L`,
      fuel: fuelStr.includes('/') ? fuelStr.split('/')[idx % 2] : fuelStr
    };
  });

  return {
    name: fullModelName,
    price: priceStr.includes('₹') ? priceStr.replace('₹', '') : priceStr,
    type: typeStr,
    fuel: fuelStr,
    img: imgUrl,
    desc: `The ${fullModelName} is a standout ${typeStr.toLowerCase()} offering modern features, energetic performance, premium craftsmanship, and exceptional efficiency.`,
    specs: {
      engine: fuelStr.includes('Electric') ? 'Permanent Magnet Synchronous Motor' : '1.2L Turbo / 1.5L i-VTEC / 2.0L Engine',
      power: fuelStr.includes('Electric') ? '135 bhp' : '115 bhp @ 6000 rpm',
      torque: fuelStr.includes('Electric') ? '250 Nm' : '144 Nm @ 4500 rpm',
      transmission: fuelStr.includes('Electric') ? 'Automatic 1-Speed' : '5-Speed Manual / 6-Speed Automatic / AMT',
      seating: typeStr.includes('MPV') || typeStr.includes('3-Row') ? '6 / 7' : '5',
      mileage: fuelStr.includes('Electric') ? '425 km Range' : '20.4 kmpl',
      safety: '5-Star Safety Rating (GNCAP)'
    },
    variants: variants,
    colors: ['Pearl Arctic White', 'Midnight Black', 'Splendid Silver', 'Titan Grey', 'Fiery Red', 'Deep Blue'],
    highlights: [
      'Panoramic Sunroof & Airy Cabin',
      '10.25-inch Touchscreen Infotainment',
      'ADAS Safety Technology Suite',
      'Automatic Climate Control',
      'Wireless Phone Charging & Apple CarPlay / Android Auto'
    ]
  };
}

export default function ModelPage({ openPopup }) {
  const { slug, model } = useParams();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [activeTab, setActiveTab] = useState('variants');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [transFilter, setTransFilter] = useState('All');
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('826001 - Bank More / Hirapur - Dhanbad');

  const brand = getBrandBySlug(slug) || {
    name: (slug || 'Brand').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    slug: (slug || 'brand').toLowerCase(),
    country: 'International',
    founded: 1950,
    segment: 'Automobile',
    logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/maruti.jpg?w=200&q=50'
  };

  const modelData = resolveModelData(slug, model);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fullHref = window.location.href.toLowerCase();
    const hashStr = window.location.hash.toLowerCase();
    if (
      openPopup ||
      fullHref.includes('/popup') ||
      fullHref.includes('enquriy') ||
      fullHref.includes('enquiry') ||
      fullHref.includes('open=true') ||
      hashStr.includes('/popup') ||
      hashStr.includes('enquiry') ||
      hashStr.includes('varient') ||
      hashStr.includes('variant')
    ) {
      setEnquiryOpen(true);
    }
  }, [openPopup, slug, model]);

  if (!modelData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', gap: 16, background: '#f5f4f2' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#302F2E' }}>Model details loading...</h2>
        <Link to={'/brand/' + slug} style={{ background: '#FF6A00', color: '#fff', padding: '12px 28px', borderRadius: 9999, textDecoration: 'none', fontWeight: 700 }}>
          Back to {brand.name}
        </Link>
      </div>
    );
  }

  const fuelPrimary = modelData.fuel ? modelData.fuel.split('/')[0] : 'Petrol';
  const fc = getFuelColor(fuelPrimary);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) { setPhoneError(true); return; }
    setPhoneError(false);
    setSubmitted(true);
  };

  const TAB_STYLE = (active) => ({
    padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none',
    background: active ? '#FF6A00' : 'transparent',
    color: active ? '#fff' : '#666',
    borderRadius: 9999,
    transition: 'all 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Nunito, system-ui, sans-serif', background: '#f5f4f2', overflowX: 'hidden' }}>

      {/* UNIFIED NAVBAR */}
      <Navbar
        onOpenAreaModal={() => setIsAreaModalOpen(true)}
        onOpenBookModal={() => setEnquiryOpen(true)}
        selectedArea={selectedArea}
      />

      {/* HERO - Dark band with car image */}
      <section style={{ background: 'linear-gradient(135deg,#1e1d1c 0%,#302F2E 70%,#3a3836 100%)', padding: '40px 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,106,0,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 12, color: 'rgba(255,255,255,0.4)', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span>&#8250;</span>
            <Link to={'/brand/' + slug} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{brand.name}</Link>
            <span>&#8250;</span>
            <span style={{ color: '#FF6A00' }}>{modelData.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              {/* Brand logo + type pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ width: 40, height: 32, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, flexShrink: 0 }}>
                  <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: fc.color, padding: '3px 10px', borderRadius: 9999 }}>{modelData.type}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 9999, background: fc.bg, color: fc.color, border: '1px solid ' + fc.border }}>{modelData.fuel}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.1 }}>{modelData.name}</h1>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#FF6A00', marginBottom: 8 }}>&#8377;{modelData.price} <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>ex-showroom</span></div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 24px', lineHeight: 1.6, maxWidth: 480 }}>{modelData.desc}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => setEnquiryOpen(true)} style={{ background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,106,0,0.35)' }}>
                  Get Best Price &#8594;
                </button>
                <Link to={'/brand/' + slug} style={{ color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', padding: '13px 24px', borderRadius: 9999, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  All {brand.name} Cars
                </Link>
              </div>
            </div>
          </div>

          {/* Car Image */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <img
              src={modelData.img}
              alt={modelData.name}
              referrerPolicy="no-referrer"
              style={{ maxWidth: '100%', width: 600, objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* KEY SPECS STRIP */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0eeec', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', display: 'flex', overflowX: 'auto', gap: 0 }}>
          {[
            { icon: '&#9889;', lbl: 'Power', val: modelData.specs.power.split('/')[0].trim() },
            { icon: '&#128299;', lbl: 'Torque', val: modelData.specs.torque.split('/')[0].trim() },
            { icon: '&#128663;', lbl: 'Transmission', val: modelData.specs.transmission.split('/')[0].trim() },
            { icon: '&#129380;', lbl: 'Fuel Economy', val: modelData.specs.mileage },
            { icon: '&#128101;', lbl: 'Seating', val: modelData.specs.seating + ' Seater' },
            { icon: '&#11088;', lbl: 'Safety', val: modelData.specs.safety },
          ].map((s, i) => (
            <div key={i} style={{ padding: '16px 24px', textAlign: 'center', borderRight: i < 5 ? '1px solid #f0eeec' : 'none', minWidth: 120, flexShrink: 0 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: s.icon }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1e1d1c', marginBottom: 2 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS — Variants / Highlights / Colors */}
      <div style={{ maxWidth: 960, margin: '32px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 6, background: '#fff', padding: 6, borderRadius: 9999, border: '1px solid #e5e7eb', marginBottom: 24, overflowX: 'auto', width: 'fit-content' }}>
          {['variants', 'highlights', 'colors'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={TAB_STYLE(activeTab === tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'variants' && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>All Variants</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1e1d1c', margin: '0 0 14px' }}>{modelData.name} Variants & Prices</h2>

            {/* Fuel & Transmission Filter Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18, background: '#fff', padding: 12, borderRadius: 14, border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#6b7280', minWidth: 44 }}>Fuel:</span>
                {['All', 'Petrol', 'Diesel', 'CNG', 'Electric'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFuelFilter(f)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                      border: fuelFilter === f ? '1.5px solid #FF6A00' : '1px solid #d1d5db',
                      background: fuelFilter === f ? '#fff7ed' : '#f9fafb',
                      color: fuelFilter === f ? '#c2410c' : '#374151',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#6b7280', minWidth: 44 }}>Trans:</span>
                {['All', 'Manual', 'Automatic'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTransFilter(t)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                      border: transFilter === t ? '1.5px solid #FF6A00' : '1px solid #d1d5db',
                      background: transFilter === t ? '#fff7ed' : '#f9fafb',
                      color: transFilter === t ? '#c2410c' : '#374151',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {modelData.variants
                .filter(v => {
                  const checkMatchesFuel = (vObj, targetFuel) => {
                    if (!targetFuel || targetFuel === 'All') return true;
                    const target = targetFuel.toLowerCase();
                    const text = ((vObj.fuel || '') + ' ' + (vObj.name || '')).toLowerCase();
                    if (target === 'electric') return text.includes('electric') || text.includes('ev');
                    if (target === 'cng') return text.includes('cng') || text.includes('icng');
                    return text.includes(target);
                  };

                  const checkMatchesTrans = (vObj, targetTrans) => {
                    if (!targetTrans || targetTrans === 'All') return true;
                    const text = ((vObj.trans || '') + ' ' + (vObj.name || '')).toLowerCase();
                    const isAuto = text.includes('automatic') || text.includes('at') || text.includes('amt') || text.includes('dct') || text.includes('tc') || text.includes('ivt') || text.includes('cvt') || text.includes('ags') || text.includes('dca') || text.includes('auto');
                    if (targetTrans === 'Automatic') return isAuto;
                    if (targetTrans === 'Manual') return !isAuto || text.includes('manual') || text.includes('mt');
                    return true;
                  };

                  return checkMatchesFuel(v, fuelFilter) && checkMatchesTrans(v, transFilter);
                })
                .map((v, i) => {
                  const vfc = getFuelColor(v.fuel);
                  const isSelected = selectedVariant === i;
                  return (
                    <div key={v.name} onClick={() => setSelectedVariant(isSelected ? null : i)}
                      style={{ background: '#fff', border: isSelected ? '2px solid #FF6A00' : '1.5px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.18s', boxShadow: isSelected ? '0 6px 20px rgba(255,106,0,0.12)' : '0 1px 4px rgba(0,0,0,0.04)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: isSelected ? '#FF6A00' : '#f5f4f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isSelected ? '#fff' : '#888', fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#1e1d1c' }}>{v.name}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 9999, background: vfc.bg, color: vfc.color, border: '1px solid ' + vfc.border, display: 'inline-block', marginTop: 4 }}>{v.fuel}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 17, fontWeight: 800, color: '#FF6A00' }}>&#8377;{v.price}</div>
                        <div style={{ fontSize: 10, color: '#9CA3AF' }}>Ex-showroom</div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {selectedVariant !== null && (
              <button onClick={() => { setEnquiryOpen(true); }} style={{ marginTop: 16, width: '100%', background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,106,0,0.3)' }}>
                Get Best Price for {modelData.variants[selectedVariant]?.name} &#8594;
              </button>
            )}
          </div>
        )}

        {activeTab === 'highlights' && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Key Features</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1e1d1c', margin: '0 0 16px' }}>What Makes it Special</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
              {modelData.highlights.map((h, i) => (
                <div key={h} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6A00,#ff4500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1e1d1c' }}>{h}</span>
                </div>
              ))}
            </div>
            {/* Specs table */}
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Technical Specs</div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
              {Object.entries(modelData.specs).map(([key, val], i) => (
                <div key={key} style={{ display: 'flex', borderBottom: i < Object.keys(modelData.specs).length - 1 ? '1px solid #f0eeec' : 'none' }}>
                  <div style={{ flex: '0 0 40%', padding: '14px 20px', fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'capitalize', background: '#fafafa' }}>{key.replace(/_/g, ' ')}</div>
                  <div style={{ flex: 1, padding: '14px 20px', fontSize: 13, fontWeight: 700, color: '#1e1d1c' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Available Colors</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1e1d1c', margin: '0 0 20px' }}>{modelData.name} Color Options</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {modelData.colors.map((color) => (
                <div key={color} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6A00,#ffb347)', border: '2px solid rgba(255,106,0,0.2)' }} />
                  {color}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ON-PAGE ENQUIRY SECTION */}
      <section id="enquiry" style={{ maxWidth: 960, margin: '40px auto 20px', padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: 24, border: '1.5px solid #e5e7eb', padding: '32px 24px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Direct Dealer Deals</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e1d1c', margin: '0 0 8px' }}>Get Best Price Quote for {modelData.name}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 24px' }}>Select your variant and receive competitive, verified quotes from top authorized dealers near you.</p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Variant</label>
              <div className="flex flex-wrap gap-2">
                {modelData.variants && modelData.variants.map((v, idx) => {
                  const isSelected = (selectedVariant !== null && selectedVariant !== undefined ? selectedVariant : 0) === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedVariant(idx)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-semibold shadow-sm'
                          : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                      }`}
                    >
                      {v.name} — ₹{v.price} ({v.fuel})
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Full Name</label>
              <input type="text" required placeholder="Your Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', padding: '13px 16px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Mobile Number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ padding: '13px 14px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, color: '#666', background: '#f9f8f6', minWidth: 54, textAlign: 'center' }}>+91</div>
                <input type="tel" inputMode="numeric" required placeholder="98765 43210" maxLength={10} value={form.phone} onChange={e => { setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g,'') })); setPhoneError(false); }} style={{ flex: 1, padding: '13px 16px', border: '1.5px solid ' + (phoneError ? '#DC2626' : '#e5e7eb'), borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>City / Pincode</label>
              <input type="text" placeholder="e.g. Ranchi, Jamshedpur, Dhanbad" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} style={{ width: '100%', padding: '13px 16px', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '15px', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,106,0,0.3)' }}>
                Get Verified Dealer Offers for {modelData.variants[selectedVariant]?.name || modelData.name} &#8594;
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* STICKY BOTTOM CTA (mobile) */}
      <div style={{ height: 80 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99, background: '#fff', borderTop: '1px solid #e5e7eb', padding: '12px 20px', display: 'flex', gap: 10, boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#888' }}>Starting from</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#FF6A00' }}>&#8377;{modelData.variants[selectedVariant]?.price || modelData.price.split('-')[0].trim()}</div>
        </div>
        <button onClick={() => setEnquiryOpen(true)} style={{ background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,106,0,0.3)', flexShrink: 0 }}>
          Get Best Price &#8594;
        </button>
      </div>

      {/* ENQUIRY MODAL */}
      {enquiryOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', padding: 16 }}
          onClick={e => { if (e.target === e.currentTarget) { setEnquiryOpen(false); setSubmitted(false); } }}>
          <div style={{ width: '100%', maxWidth: 480, background: '#fff', borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            {submitted ? (
              <TestDriveConfirmationCard
                bookingDetails={{
                  name: form.name || 'Rahul verma',
                  vehicle: modelData.name || 'Skoda Slavia',
                  variant: (selectedVariant !== null && modelData.variants?.[selectedVariant]?.name) || '1.0L TSI Style',
                  date: '2026-08-20',
                  timeSlot: 'Morning (10 AM - 1 PM)',
                  location: form.city || 'Ranchi',
                  phone: form.phone || '09142231533'
                }}
                onScheduleAnother={() => setSubmitted(false)}
                onClose={() => { setEnquiryOpen(false); setSubmitted(false); }}
              />
            ) : (
              <div style={{ padding: '24px 20px 32px' }}>
                <div style={{ width: 40, height: 4, background: '#e5e7eb', borderRadius: 2, margin: '0 auto 16px' }} />
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <img src={modelData.img} alt={modelData.name} referrerPolicy="no-referrer" style={{ width: 80, height: 52, objectFit: 'contain', background: '#f5f4f2', borderRadius: 10, padding: 6 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#1e1d1c' }}>Get Best Price</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{modelData.variants[selectedVariant]?.name || modelData.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#FF6A00' }}>&#8377;{modelData.variants[selectedVariant]?.price || modelData.price}</div>
                  </div>
                </div>

                {BRAND_MODELS[slug] && BRAND_MODELS[slug].length > 1 && (
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Model</label>
                    <div className="grid grid-cols-2 gap-2">
                      {BRAND_MODELS[slug].map((m, idx) => {
                        const isSelected = (modelData.slug || model) === m.slug;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              navigate('/brand/' + slug + '/' + m.slug);
                            }}
                            className={`px-3 py-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00] shadow-sm font-bold ring-2 ring-[#FF6A00]/20'
                                : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-xs font-bold truncate block w-full">{m.name}</span>
                            <span className={`text-[10px] block mt-1 ${isSelected ? 'text-[#FF6A00] font-semibold' : 'text-gray-400'}`}>
                              {m.price ? `₹${m.price}` : 'Get Quote'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {modelData.variants && modelData.variants.map((v, idx) => {
                      const isSelected = (selectedVariant !== null && selectedVariant !== undefined ? selectedVariant : 0) === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedVariant(idx)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-semibold shadow-sm'
                              : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                          }`}
                        >
                          {v.name} — ₹{v.price} ({v.fuel})
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Full Name</label>
                  <input type="text" required placeholder="Your Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Mobile Number</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, color: '#666', background: '#f9f8f6', minWidth: 52 }}>+91</div>
                    <input type="tel" inputMode="numeric" required placeholder="98765 43210" maxLength={10} value={form.phone} onChange={e => { setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g,'') })); setPhoneError(false); }} style={{ flex: 1, padding: '12px 14px', border: '1.5px solid ' + (phoneError ? '#DC2626' : '#e5e7eb'), borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  {phoneError && <div style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }}>Please enter a valid 10-digit number.</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>City</label>
                  <input type="text" placeholder="e.g. Ranchi, Jamshedpur, Dhanbad" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 4, boxShadow: '0 6px 20px rgba(255,106,0,0.3)' }}>Get Best Deals from Dealers &#8594;</button>
                <p style={{ fontSize: 10, color: '#bbb', textAlign: 'center', margin: 0 }}>Shared only with verified dealers &middot; Always free</p>
              </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UNIFIED FOOTER */}
      <Footer />

      {isAreaModalOpen && (
        <AreaSearchModal
          isOpen={isAreaModalOpen}
          onClose={() => setIsAreaModalOpen(false)}
          onSelectArea={(areaStr) => {
            setSelectedArea(areaStr);
            setIsAreaModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
