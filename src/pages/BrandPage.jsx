import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TestDriveConfirmationCard } from '../components/TestDriveModal';
import { saveBuyerEnquiry, CAR_CATALOG, BIKE_CATALOG } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AreaSearchModal from '../components/AreaSearchModal';
import '../styles/reset.css';
import '../styles/buyer.css';

export const ALL_BRANDS = [
  { name: 'Maruti Suzuki', slug: 'maruti-suzuki', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/maruti.jpg?w=200&q=50', country: 'Japan/India', founded: 1981, segment: 'Mass Market' },
  { name: 'Hyundai', slug: 'hyundai', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/hyundai.jpg?w=200&q=50', country: 'South Korea', founded: 1967, segment: 'Mass Market' },
  { name: 'Tata', slug: 'tata', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/tata.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'Mass Market' },
  { name: 'Mahindra', slug: 'mahindra', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mahindra.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'Mass Market' },
  { name: 'Mahindra EV', slug: 'mahindra-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mahindra.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'EV' },
  { name: 'Tata EV', slug: 'tata-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/tata.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'EV' },
  { name: 'Hyundai EV', slug: 'hyundai-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/hyundai.jpg?w=200&q=50', country: 'South Korea', founded: 1967, segment: 'EV' },
  { name: 'MG EV', slug: 'mg-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mg.jpg?w=200&q=50', country: 'UK/China', founded: 1924, segment: 'EV' },
  { name: 'BMW EV', slug: 'bmw-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/bmw.jpg?w=200&q=50', country: 'Germany', founded: 1916, segment: 'Premium EV' },
  { name: 'TVS iQube', slug: 'tvs-iqube', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/tvs.jpg?w=200&q=50', country: 'India', founded: 1978, segment: 'EV' },
  { name: 'Chetak EV', slug: 'chetak-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/bajaj.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'EV' },
  { name: 'Toyota', slug: 'toyota', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/toyota.jpg?w=200&q=50', country: 'Japan', founded: 1937, segment: 'Mass Market' },
  { name: 'KIA', slug: 'kia', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/kia.jpg?w=200&q=50', country: 'South Korea', founded: 1944, segment: 'Mass Market' },
  { name: 'BMW', slug: 'bmw', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/bmw.jpg?w=200&q=50', country: 'Germany', founded: 1916, segment: 'Premium' },
  { name: 'Honda', slug: 'honda', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/honda.jpg?w=100&q=60', country: 'Japan', founded: 1948, segment: 'Mass Market' },
  { name: 'MG', slug: 'mg', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mg.jpg?w=200&q=50', country: 'UK/China', founded: 1924, segment: 'Mass Market' },
  { name: 'Skoda', slug: 'skoda', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/skoda.jpg?w=200&q=50', country: 'Czech Republic', founded: 1895, segment: 'Mass Market' },
  { name: 'Volkswagen', slug: 'volkswagen', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/volkswagen.jpg?w=200&q=50', country: 'Germany', founded: 1937, segment: 'Mass Market' },
  { name: 'Land Rover', slug: 'land-rover', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/landrover.jpg?w=200&q=50', country: 'UK', founded: 1948, segment: 'Luxury' },
  { name: 'Jeep', slug: 'jeep', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/jeep.jpg?w=200&q=50', country: 'USA', founded: 1943, segment: 'Mass Market' },
  { name: 'Audi', slug: 'audi', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/audi.jpg?w=200&q=50', country: 'Germany', founded: 1909, segment: 'Premium' },
  { name: 'Volvo', slug: 'volvo', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/volvo.jpg?w=200&q=50', country: 'Sweden', founded: 1927, segment: 'Premium' },
  { name: 'Jaguar', slug: 'jaguar', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/jaguar.jpg?w=200&q=50', country: 'UK', founded: 1935, segment: 'Luxury' },
  { name: 'Porsche', slug: 'porsche', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/porsche.jpg?w=200&q=50', country: 'Germany', founded: 1931, segment: 'Luxury' },
  { name: 'Citroen', slug: 'citroen', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/citroen.jpg?w=200&q=50', country: 'France', founded: 1919, segment: 'Mass Market' },
  { name: 'Nissan', slug: 'nissan', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/nissan.jpg?w=200&q=50', country: 'Japan', founded: 1933, segment: 'Mass Market' },
  { name: 'Lamborghini', slug: 'lamborghini', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/lamborghini.jpg?w=200&q=50', country: 'Italy', founded: 1963, segment: 'Hypercar' },
  { name: 'Renault', slug: 'renault', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/renault.jpg?w=200&q=50', country: 'France', founded: 1899, segment: 'Mass Market' },
  { name: 'Lexus', slug: 'lexus', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/lexus.jpg?w=200&q=50', country: 'Japan', founded: 1989, segment: 'Luxury' },
  { name: 'Rolls-Royce', slug: 'rolls-royce', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/rollsroyce.jpg?w=200&q=50', country: 'UK', founded: 1906, segment: 'Ultra Luxury' },
  { name: 'Mini', slug: 'mini', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mini.jpg?w=200&q=50', country: 'UK', founded: 1959, segment: 'Premium' },
  { name: 'BYD', slug: 'byd', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/byd-auto.jpg?w=200&q=50', country: 'China', founded: 1995, segment: 'Mass Market' },
  { name: 'Ferrari', slug: 'ferrari', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/ferrari.jpg?w=200&q=50', country: 'Italy', founded: 1939, segment: 'Hypercar' },
  { name: 'Maserati', slug: 'maserati', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/maserati.jpg?w=200&q=50', country: 'Italy', founded: 1914, segment: 'Luxury' },
  { name: 'Isuzu', slug: 'isuzu', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/isuzu.jpg?w=200&q=50', country: 'Japan', founded: 1916, segment: 'Mass Market' },
  { name: 'Mclaren', slug: 'mclaren', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mclaren.jpg?w=200&q=50', country: 'UK', founded: 1963, segment: 'Hypercar' },
  { name: 'Force', slug: 'force', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/force.jpg?w=200&q=50', country: 'India', founded: 1958, segment: 'Mass Market' },
  { name: 'Bentley', slug: 'bentley', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/bentley.jpg?w=200&q=50', country: 'UK', founded: 1919, segment: 'Ultra Luxury' },
  { name: 'Aston Martin', slug: 'aston-martin', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/astonmartin.jpg?w=200&q=50', country: 'UK', founded: 1913, segment: 'Luxury' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/mercedesbenz.jpg?w=200&q=50', country: 'Germany', founded: 1926, segment: 'Premium' },
  { name: 'Tesla', slug: 'tesla', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/tesla.jpeg?w=200&q=50', country: 'USA', founded: 2003, segment: 'Premium EV' },
  { name: 'Bajaj', slug: 'bajaj', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/bajaj.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'Mass Market' },
  { name: 'Strom Motors', slug: 'strom-motors', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/strom-motors.jpg?w=200&q=50', country: 'India', founded: 2017, segment: 'EV' },
  { name: 'Pravaig', slug: 'pravaig', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/pravaig.jpg?w=200&q=50', country: 'India', founded: 2019, segment: 'EV' },
  { name: 'Genesis', slug: 'genesis', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/genesis.jpg?w=200&q=50', country: 'South Korea', founded: 2015, segment: 'Luxury' },
  { name: 'Royal Enfield', slug: 'royal-enfield', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/royalenfield.jpg?w=200&q=50', country: 'India', founded: 1901, segment: 'Bikes' },
  { name: 'TVS', slug: 'tvs', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/tvs.jpg?w=200&q=50', country: 'India', founded: 1978, segment: 'Bikes' },
  { name: 'Bajaj', slug: 'bajaj', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/bajaj.jpg?w=200&q=50', country: 'India', founded: 1945, segment: 'Bikes' },
  { name: 'Hero MotoCorp', slug: 'hero-motocorp', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/heromotocorp.jpg?w=200&q=50', country: 'India', founded: 1984, segment: 'Bikes' },
  { name: 'Honda Bikes', slug: 'honda-bikes', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/honda.jpg?w=200&q=50', country: 'Japan', founded: 1948, segment: 'Bikes' },
  { name: 'Suzuki Bikes', slug: 'suzuki-bikes', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/suzuki.jpg?w=200&q=50', country: 'Japan', founded: 1909, segment: 'Bikes' },
  { name: 'Jawa', slug: 'jawa', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/jawa.jpg?w=200&q=50', country: 'Czech/India', founded: 1929, segment: 'Bikes' },
  { name: 'Yamaha', slug: 'yamaha', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/yamaha.jpg?w=200&q=50', country: 'Japan', founded: 1955, segment: 'Bikes' },
  { name: 'KTM', slug: 'ktm', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ktm.jpg?w=200&q=50', country: 'Austria', founded: 1934, segment: 'Bikes' },
  { name: 'Yezdi', slug: 'yezdi', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/yezdi.jpg?w=200&q=50', country: 'India', founded: 1969, segment: 'Bikes' },
  { name: 'Aprilia', slug: 'aprilia', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/aprilia.jpg?w=200&q=50', country: 'Italy', founded: 1945, segment: 'Bikes' },
  { name: 'Vida', slug: 'vida', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/hero-vida.jpg?w=200&q=50', country: 'India', founded: 2022, segment: 'EV' },
  { name: 'BMW Motorrad', slug: 'bmw-motorrad', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/bmw.jpg?w=200&q=50', country: 'Germany', founded: 1923, segment: 'Bikes' },
  { name: 'Ducati', slug: 'ducati', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ducati.jpg?w=200&q=50', country: 'Italy', founded: 1926, segment: 'Premium Bikes' },
  { name: 'Harley-Davidson', slug: 'harley-davidson', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/harleydavidson.jpg?w=200&q=50', country: 'USA', founded: 1903, segment: 'Premium Bikes' },
  { name: 'Kawasaki', slug: 'kawasaki', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/kawasaki.jpg?w=200&q=50', country: 'Japan', founded: 1896, segment: 'Bikes' },
  { name: 'Triumph', slug: 'triumph', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/triumph.jpg?w=200&q=50', country: 'UK', founded: 1902, segment: 'Bikes' },
  { name: 'Ather', slug: 'ather', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ather.jpg?w=200&q=50', country: 'India', founded: 2013, segment: 'EV' },
  { name: 'Ola Electric', slug: 'ola-electric', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/bikes/ola.jpg?w=200&q=50', country: 'India', founded: 2017, segment: 'EV' },
  { name: 'Haval', slug: 'haval', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/haval.jpg?w=200&q=50', country: 'China', founded: 2013, segment: 'Mass Market' },
  { name: 'VinFast', slug: 'vinfast', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/vinfast.jpg?w=200&q=50', country: 'Vietnam', founded: 2017, segment: 'Mass Market' },
  { name: 'GMC', slug: 'gmc', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/gmc.jpg?w=200&q=50', country: 'USA', founded: 1911, segment: 'Mass Market' },
  { name: 'Lotus', slug: 'lotus', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/lotus.jpg?w=200&q=50', country: 'UK', founded: 1948, segment: 'Hypercar' },
  { name: 'Gensol EV', slug: 'gensol-ev', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/gensol-ev.jpg?w=200&q=50', country: 'India', founded: 2019, segment: 'EV' },
  { name: 'JSW', slug: 'jsw', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/jsw.jpg?w=200&q=50', country: 'India', founded: 2023, segment: 'EV' },
  { name: 'Chery', slug: 'chery', logo: 'https://91w.s3.ap-south-1.amazonaws.com/production/images/brand-logos/cars/chery.jpg?w=200&q=50', country: 'China', founded: 1997, segment: 'Mass Market' },
];

export const BRAND_MODELS = {
  'maruti-suzuki': [
    { name: 'Swift', slug: 'swift', price: '6.49-9.64 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png' },
    { name: 'Dzire', slug: 'dzire', price: '6.79-10.00 L', type: 'Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/dzire/maruti-dzire-0-1784199426.png' },
    { name: 'Brezza', slug: 'brezza', price: '8.34-14.14 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/brezza-facelift/maruti-brezza-facelift-0-1777021932.png' },
    { name: 'Fronx', slug: 'fronx', price: '7.51-13.07 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/fronx/maruti-fronx-7-1766215192.png' },
    { name: 'Baleno', slug: 'baleno', price: '6.61-10.12 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/baleno/maruti-baleno-4-1766214578.png' },
    { name: 'Grand Vitara', slug: 'grand-vitara', price: '10.99-20.35 L', type: 'SUV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/grand-vitara/maruti-grand-vitara-8-1766738694.png' },
    { name: 'Ertiga', slug: 'ertiga', price: '8.69-13.02 L', type: 'MPV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/ertiga/maruti-ertiga-4-1767874534.png' },
    { name: 'Wagon R', slug: 'wagon-r', price: '5.54-7.59 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/wagon-r/maruti-wagon-r-4-1767860860.png' },
    { name: 'Alto K10', slug: 'alto-k10', price: '3.99-5.96 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/alto-k10/maruti-alto-k10-10-1766734886.png' },
    { name: 'XL6', slug: 'xl6', price: '11.61-14.77 L', type: 'MPV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/xl6/maruti-xl6-6-1766216359.png' },
    { name: 'Celerio', slug: 'celerio', price: '5.37-7.14 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/celerio/maruti-celerio-7-1767875043.png' },
    { name: 'Jimny', slug: 'jimny', price: '12.74-14.95 L', type: 'Off-road SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/jimny/maruti-jimny-1-1767861206.png' },
    { name: 'Invicto', slug: 'invicto', price: '25.21-29.01 L', type: 'MPV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/invicto/maruti-invicto-5-1766739546.png' },
    { name: 'Eeco', slug: 'eeco', price: '5.32-6.58 L', type: 'Van', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/eeco/maruti-eeco-5-1766736854.png' },
    { name: 'S-Presso', slug: 's-presso', price: '4.26-6.12 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/maruti/s-presso/maruti-s-presso-3-1766740577.png' },
  ],
  'tata': [
    { name: 'Sierra', slug: 'sierra', price: '11.49-21.29 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra/tata-sierra-0-1768365444.png' },
    { name: 'Punch', slug: 'punch', price: '6.13-9.54 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch/tata-punch-0-1769487768.png' },
    { name: 'Nexon', slug: 'nexon', price: '7.99-15.80 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon/tata-nexon-0-1784198581.png' },
    { name: 'Harrier', slug: 'harrier', price: '15.49-26.44 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/harrier/tata-harrier-0-1766203373.png' },
    { name: 'Safari', slug: 'safari', price: '16.19-27.34 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/safari/tata-safari-0-1769770726.png' },
    { name: 'Curvv', slug: 'curvv', price: '9.99-18.99 L', type: 'SUV Coupe', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv/tata-curvv-0-1769674441.png' },
    { name: 'Altroz', slug: 'altroz', price: '6.60-10.74 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/altroz/tata-altroz-0-1766141604.png' },
    { name: 'Tiago', slug: 'tiago', price: '5.60-8.29 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/tiago-facelift/tata-tiago-facelift-0-1779969867.png' },
    { name: 'Tigor', slug: 'tigor', price: '5.99-8.75 L', type: 'Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/tigor/tata-tigor-0-1769767058.png' },
    { name: 'Punch EV', slug: 'punch-ev', price: '9.99-14.49 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-0-1772877841.png' },
    { name: 'Nexon EV', slug: 'nexon-ev', price: '14.49-19.49 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1769491378.png' },
    { name: 'Sierra EV', slug: 'sierra-ev', price: '18.79-26.48 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra-ev/tata-sierra-ev-0-1782897309.png' },
  ],
  'mahindra': [
    { name: 'Scorpio-N', slug: 'scorpio-n', price: '13.49-24.95 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio/mahindra-scorpio-3-1767930813.png' },
    { name: 'Thar', slug: 'thar', price: '11.35-17.60 L', type: 'Off-road SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar/mahindra-thar-8-1771924749.png' },
    { name: 'Thar Roxx', slug: 'thar-roxx', price: '12.52-22.49 L', type: 'Off-road SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/thar-roxx/mahindra-thar-roxx-3-1767849893.png' },
    { name: 'XUV700', slug: 'xuv700', price: '13.99-26.99 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-7xo/mahindra-xuv-7xo-0-1768365160.png' },
    { name: 'XUV3XO', slug: 'xuv3xo', price: '7.49-15.49 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-3xo/mahindra-xuv-3xo-5-1767875397.png' },
    { name: 'Scorpio Classic', slug: 'scorpio-classic', price: '13.62-17.42 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/scorpio-classic/mahindra-scorpio-classic-0-1767930945.png' },
    { name: 'Bolero', slug: 'bolero', price: '9.79-10.91 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero/mahindra-bolero-0-1768637292.png' },
    { name: 'Bolero Neo', slug: 'bolero-neo', price: '9.95-12.15 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/bolero-neo/mahindra-bolero-neo-0-1768637392.png' },
    { name: 'XEV 9e', slug: 'xev-9e', price: '21.90-30.50 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xev-9e/mahindra-xev-9e-0-1767875526.png' },
    { name: 'BE 6e', slug: 'be-6e', price: '18.90-26.90 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png' },
  ],
  'mahindra-ev': [
    { name: 'XEV 9e', slug: 'xev-9e', price: '21.90-30.50 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xev-9e/mahindra-xev-9e-0-1767875526.png' },
    { name: 'BE 6e', slug: 'be-6e', price: '18.90-26.90 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png' },
    { name: 'XUV400 EV', slug: 'xuv400-ev', price: '15.49-19.39 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/xuv-3xo/mahindra-xuv-3xo-5-1767875397.png' },
    { name: 'BE 05', slug: 'be-05', price: '25.00 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6e/mahindra-be-6e-4-1767931326.png' },
  ],
  'tata-ev': [
    { name: 'Punch EV', slug: 'punch-ev', price: '9.99-14.49 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-0-1772877841.png' },
    { name: 'Nexon EV', slug: 'nexon-ev', price: '14.49-19.49 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-0-1769491378.png' },
    { name: 'Curvv EV', slug: 'curvv-ev', price: '17.49-21.99 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/curvv/tata-curvv-0-1769674441.png' },
    { name: 'Sierra EV', slug: 'sierra-ev', price: '18.79-26.48 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/tata/sierra-ev/tata-sierra-ev-0-1782897309.png' },
  ],
  'hyundai-ev': [
    { name: 'Creta Electric', slug: 'creta-ev', price: '18.03-23.50 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-ev/hyundai-creta-ev-0-1767876338.png' },
    { name: 'Ioniq 5', slug: 'ioniq-5', price: '46.05-55.71 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/ioniq-5/hyundai-ioniq-5-7-1777884283.png' },
  ],
  'mg-ev': [
    { name: 'Windsor EV', slug: 'windsor-ev', price: '14.70-19.00 L', type: 'Electric MPV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-0-1781267952.png' },
    { name: 'Comet EV', slug: 'comet-ev', price: '7.63-10.23 L', type: 'Electric Hatchback', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/comet-ev/mg-comet-ev-0-1767868185.png' },
    { name: 'ZS EV', slug: 'zs-ev', price: '18.98-25.44 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/zs-ev/mg-zs-ev-0-1767854266.png' },
  ],
  'bmw-ev': [
    { name: 'i4', slug: 'i4', price: '72.50 L', type: 'Electric Sedan', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/3-series-gran-limousine/bmw-3-series-gran-limousine-7-1778487062.png' },
    { name: 'iX1', slug: 'ix1', price: '66.90 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x1/bmw-x1-0-1766216634.png' },
  ],
  'tvs-iqube': [
    { name: 'iQube Electric', slug: 'iqube-electric', price: '1.17-1.85 L', type: 'Electric Scooter', fuel: 'Electric', img: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png' },
    { name: 'iQube S', slug: 'iqube-s', price: '1.46 L', type: 'Electric Scooter', fuel: 'Electric', img: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png' },
    { name: 'iQube ST', slug: 'iqube-st', price: '1.85 L', type: 'Electric Scooter', fuel: 'Electric', img: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png' },
    { name: 'TVS X', slug: 'tvs-x', price: '2.50 L', type: 'Electric Scooter', fuel: 'Electric', img: 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png' },
  ],
  'chetak-ev': [
    { name: 'Chetak C35 Premium', slug: 'chetak-c35', price: '1.15-1.35 L', type: 'Electric Scooter', fuel: 'Electric', img: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak/bajaj-chetak-7-1777549806.png' },
    { name: 'Chetak C30 Urbane', slug: 'chetak-c30', price: '95,998', type: 'Electric Scooter', fuel: 'Electric', img: 'https://images.91wheels.com/assets/b_images/gallery/bajaj/chetak-c30/bajaj-chetak-c30-7-1777550694.png' },
  ],
  'hyundai': [
    { name: 'Creta', slug: 'creta', price: '10.91-20.11 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta/hyundai-creta-1-1766205711.png' },
    { name: 'Venue', slug: 'venue', price: '8.00-13.38 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/venue/hyundai-venue-0-1771412163.png' },
    { name: 'Exter', slug: 'exter', price: '5.81-10.23 L', type: 'Micro SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/exter/hyundai-exter-5-1776074667.png' },
    { name: 'i20', slug: 'i20', price: '6.00-11.21 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/i20/hyundai-i20-8-1766206046.png' },
    { name: 'Verna', slug: 'verna', price: '10.99-17.38 L', type: 'Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/verna/hyundai-verna-0-1773131163.png' },
    { name: 'Grand i10 Nios', slug: 'grand-i10-nios', price: '5.60-9.12 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/grand-i10-nios/hyundai-grand-i10-nios-0-1766214369.png' },
    { name: 'Aura', slug: 'aura', price: '6.35-9.22 L', type: 'Compact Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/aura/hyundai-aura-7-1773214499.png' },
    { name: 'Alcazar', slug: 'alcazar', price: '14.99-21.46 L', type: '3-Row SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/alcazar/hyundai-alcazar-8-1766205340.png' },
    { name: 'Creta Electric', slug: 'creta-ev', price: '18.03-23.50 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-ev/hyundai-creta-ev-0-1767876338.png' },
    { name: 'Ioniq 5', slug: 'ioniq-5', price: '46.05-55.71 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/ioniq-5/hyundai-ioniq-5-7-1777884283.png' },
  ],
  'toyota': [
    { name: 'Urban Cruiser HyRyder', slug: 'urban-cruiser-hyryder', price: '11.31-20.19 L', type: 'SUV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hyryder/toyota-hyryder-1-1767847105.png' },
    { name: 'Innova Hycross', slug: 'innova-hycross', price: '18.70-30.98 L', type: 'MPV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-hycross/toyota-innova-hycross-4-1767848854.png' },
    { name: 'Fortuner', slug: 'fortuner', price: '34.75-51.44 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner/toyota-fortuner-0-1767849630.png' },
    { name: 'Fortuner Legender', slug: 'fortuner-legender', price: '43.66-47.64 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/fortuner-legender/toyota-fortuner-legender-0-1767849483.png' },
    { name: 'Innova Crysta', slug: 'innova-crysta', price: '19.72-26.55 L', type: 'MPV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/innova-crysta/toyota-innova-crysta-0-1780900881.png' },
    { name: 'Taisor', slug: 'taisor', price: '7.43-13.04 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/taisor/toyota-taisor-4-1767848418.png' },
    { name: 'Glanza', slug: 'glanza', price: '6.73-10.00 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/glanza/toyota-glanza-3-1767849310.png' },
    { name: 'Rumion', slug: 'rumion', price: '10.44-13.73 L', type: 'MPV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/rumion/toyota-rumion-2-1767848606.png' },
    { name: 'Camry', slug: 'camry', price: '46.17 L', type: 'Sedan', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/camry/toyota-camry-1-1766140825.png' },
    { name: 'Hilux', slug: 'hilux', price: '30.40-37.90 L', type: 'Pickup', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/hilux-facelift/toyota-hilux-facelift-0-1774329934.png' },
    { name: 'Land Cruiser 300', slug: 'land-cruiser-300', price: '2.10-2.25 Cr', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/landcruiser/toyota-landcruiser-0-1767848728.png' },
    { name: 'Vellfire', slug: 'vellfire', price: '1.20-1.30 Cr', type: 'Luxury MPV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/toyota/vellfire/toyota-vellfire-3-1767848275.png' },
  ],
  'kia': [
    { name: 'Seltos', slug: 'seltos', price: '10.89-20.65 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/seltos/kia-seltos-0-1768365864.png' },
    { name: 'Sonet', slug: 'sonet', price: '7.99-15.89 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/sonet/kia-sonet-0-1766740698.png' },
    { name: 'Carens', slug: 'carens', price: '10.44-19.99 L', type: 'MPV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/kia/carens/kia-carens-0-1766735122.png' },
  ],
  'honda': [
    { name: 'City', slug: 'city', price: '12.00-21.00 L', type: 'Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/city-facelift/honda-city-facelift-0-1779451233.png' },
    { name: 'Elevate', slug: 'elevate', price: '11.60-16.71 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/elevate/honda-elevate-0-1775644182.png' },
    { name: 'Amaze', slug: 'amaze', price: '7.51-9.99 L', type: 'Compact Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/amaze/honda-amaze-0-1766208026.png' },
    { name: 'Amaze 2nd Gen', slug: 'amaze-2nd-gen', price: '6.98-9.86 L', type: 'Compact Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/amaze-2021-2024/honda-amaze-2021-2024-0-1766204516.png' },
    { name: 'ZR-V', slug: 'zr-v', price: '47.99 L', type: 'SUV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/honda/zr-v/honda-zr-v-0-1779448926.png' },
  ],
  'mg': [
    { name: 'Windsor EV', slug: 'windsor-ev', price: '14.70-19.00 L', type: 'Electric MPV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-0-1781267952.png' },
    { name: 'Hector', slug: 'hector', price: '11.99-21.41 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector/mg-hector-0-1769857188.png' },
    { name: 'Hector Plus', slug: 'hector-plus', price: '17.30-22.80 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/hector-plus-facelift/mg-hector-plus-facelift-0-1767854391.png' },
    { name: 'Astor', slug: 'astor', price: '9.98-16.79 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/astor/mg-astor-2-1767854900.png' },
    { name: 'Comet EV', slug: 'comet-ev', price: '7.63-10.23 L', type: 'Electric Hatchback', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/comet-ev/mg-comet-ev-0-1767868185.png' },
    { name: 'ZS EV', slug: 'zs-ev', price: '18.98-25.44 L', type: 'Electric SUV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/zs-ev/mg-zs-ev-0-1767854266.png' },
    { name: 'Majestor', slug: 'majestor', price: '40.99-45.00 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/majestor/mg-majestor-0-1778145158.png' },
    { name: 'Cyberster EV', slug: 'cyberster-ev', price: '82.49 L', type: 'Sports EV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/cyberster-ev/mg-cyberster-ev-2-1767854717.png' },
    { name: 'M9', slug: 'm9', price: '65.00 L', type: 'Luxury MPV', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/mg/m9/mg-m9-3-1766221878.png' },
  ],
  'skoda': [
    { name: 'Kylaq', slug: 'kylaq', price: '7.59-12.99 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kylaq/skoda-kylaq-7-1775204345.png' },
    { name: 'Slavia', slug: 'slavia', price: '10.00-18.54 L', type: 'Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/slavia/skoda-slavia-0-1767850473.png' },
    { name: 'Kushaq', slug: 'kushaq', price: '10.69-19.34 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kushaq/skoda-kushaq-0-1774256060.png' },
    { name: 'Kodiaq', slug: 'kodiaq', price: '36.99-39.99 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq/skoda-kodiaq-0-1767851128.png' },
    { name: 'Kodiaq RS', slug: 'kodiaq-rs', price: '66.99 L', type: 'Performance SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/kodiaq-rs/skoda-kodiaq-rs-0-1782120448.png' },
    { name: 'Octavia RS', slug: 'octavia-vrs', price: '45.00 L', type: 'Performance Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/skoda/octavia-vrs/skoda-octavia-vrs-0-1767850604.png' },
  ],
  'volkswagen': [
    { name: 'Virtus', slug: 'virtus', price: '10.50-19.00 L', type: 'Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/virtus/volkswagen-virtus-3-1767847075.png' },
    { name: 'Taigun', slug: 'taigun', price: '11.00-19.74 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/taigun/volkswagen-taigun-0-1777890574.png' },
    { name: 'Tayron R-Line', slug: 'tayron', price: '41.99 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tayron/volkswagen-tayron-0-1771500315.png' },
    { name: 'Golf GTI', slug: 'golf-gti', price: '50.91 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/golf-gti/volkswagen-golf-gti-0-1767847472.png' },
    { name: 'Tiguan R-Line', slug: 'tiguan-r-line', price: '47.11 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/volkswagen/tiguan-r-line/volkswagen-tiguan-r-line-0-1767849778.png' },
  ],
  'renault': [
    { name: 'Triber', slug: 'triber', price: '5.81-8.69 L', type: 'MPV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/renault/triber/renault-triber-6-1765012460.png' },
    { name: 'Duster', slug: 'duster', price: '10.49-18.69 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/renault/duster/renault-duster-1-1773734226.png' },
    { name: 'Kiger', slug: 'kiger', price: '5.81-10.99 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/renault/kiger/renault-kiger-7-1766211181.png' },
    { name: 'Kwid', slug: 'kwid', price: '4.53-6.33 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/renault/kwid-facellift/renault-kwid-facellift-0-1783327771.png' },
  ],
  'nissan': [
    { name: 'Magnite', slug: 'magnite', price: '5.65-11.50 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/nissan/magnite/nissan-magnite-7-1767852828.png' },
    { name: 'Tekton', slug: 'tekton', price: '10.49-18.59 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/nissan/tekton/nissan-tekton-7-1783586272.png' },
    { name: 'Gravite', slug: 'gravite', price: '5.73-8.50 L', type: 'MPV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/nissan/gravite/nissan-gravite-0-1774603430.png' },
    { name: 'X-Trail', slug: 'x-trail', price: '48.20 L', type: 'SUV', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/nissan/x-trail/nissan-x-trail-3-1767852668.png' },
  ],
  'citroen': [
    { name: 'C3 X', slug: 'c3', price: '4.99-10.00 L', type: 'Hatchback', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c3/citroen-c3-0-1773128524.png' },
    { name: 'Aircross X', slug: 'c3-aircross', price: '8.89-14.50 L', type: 'SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c3-aircross/citroen-c3-aircross-0-1773130211.png' },
    { name: 'Basalt X', slug: 'basalt', price: '8.55-13.95 L', type: 'Coupe SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/citroen/basalt/citroen-basalt-0-1767868810.png' },
    { name: 'eC3 X', slug: 'c3-ev', price: '11.99-13.26 L', type: 'Electric Hatchback', fuel: 'Electric', img: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c3-ev/citroen-c3-ev-5-1775639635.png' },
    { name: 'C5 Aircross', slug: 'c5-aircross', price: '37.32 L', type: 'Luxury SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/citroen/c5-aircross/citroen-c5-aircross-0-1766141820.png' },
  ],
  'jeep': [
    { name: 'Compass', slug: 'compass', price: '17.99-30.70 L', type: 'SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/jeep/compass/jeep-compass-3-1764915112.png' },
    { name: 'Meridian', slug: 'meridian', price: '23.33-37.82 L', type: '3-Row SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/jeep/meridian/jeep-meridian-3-1767933471.png' },
    { name: 'Wrangler', slug: 'wrangler', price: '64.58-68.31 L', type: 'Off-road SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/jeep/wrangler/jeep-wrangler-6-1773212262.png' },
    { name: 'Grand Cherokee', slug: 'grand-cherokee', price: '63.00 L', type: 'Luxury SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/jeep/grand-cherokee/jeep-grand-cherokee-3-1764915555.png' },
  ],
  'bmw': [
    { name: '3 Series LWB', slug: '3-series-gran-limousine', price: '62.00 L', type: 'Luxury Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/3-series-gran-limousine/bmw-3-series-gran-limousine-7-1778487062.png' },
    { name: '2 Series Gran Coupe', slug: '2-series', price: '45.80 L', type: 'Coupe', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/2-series/bmw-2-series-0-1772877490.png' },
    { name: 'M5', slug: 'm5', price: '2.08 Cr', type: 'Sports Sedan', fuel: 'Hybrid', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/m5/bmw-m5-0-1766215775.png' },
    { name: 'X1', slug: 'x1', price: '50.90 L', type: 'Luxury SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x1/bmw-x1-0-1766216634.png' },
    { name: 'X3', slug: 'x3', price: '74.90 L', type: 'Luxury SUV', fuel: 'Diesel', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x3/bmw-x3-5-1766216924.png' },
    { name: 'X5', slug: 'x5', price: '97.00 L', type: 'Luxury SUV', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/x5/bmw-x5-0-1766217132.png' },
    { name: '5 Series LWB', slug: '5-series', price: '72.90 L', type: 'Luxury Sedan', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/5-series/bmw-5-series-0-1766209229.png' },
    { name: 'Z4', slug: 'z4', price: '90.90 L', type: 'Roadster', fuel: 'Petrol', img: 'https://images.91wheels.com/assets/c_images/gallery/bmw/z4/bmw-z4-0-1766218974.png' },
  ],
  'mercedes-benz': [
    { name: 'C-Class', price: '57.00-62.00 L', type: 'Sedan', fuel: 'Petrol' },
    { name: 'E-Class', price: '77.50-83.00 L', type: 'Sedan', fuel: 'Petrol' },
    { name: 'GLC', price: '67.00-73.00 L', type: 'SUV', fuel: 'Petrol' },
    { name: 'GLE', price: '92.00+ L', type: 'SUV', fuel: 'Petrol' },
    { name: 'S-Class', price: '1.71 Cr+', type: 'Sedan', fuel: 'Petrol' },
    { name: 'EQS', price: '1.55 Cr+', type: 'Electric Sedan', fuel: 'Electric' },
  ],
  'audi': [
    { name: 'Q3', price: '44.89-52.75 L', type: 'SUV', fuel: 'Petrol' },
    { name: 'Q5', price: '67.26-78.58 L', type: 'SUV', fuel: 'Petrol' },
    { name: 'Q7', price: '88.92 L+', type: 'SUV', fuel: 'Petrol' },
    { name: 'A4', price: '42.34-50.99 L', type: 'Sedan', fuel: 'Petrol' },
    { name: 'A6', price: '63.99-71.99 L', type: 'Sedan', fuel: 'Petrol' },
    { name: 'e-tron GT', price: '1.80 Cr', type: 'Electric', fuel: 'Electric' },
  ],
  'land-rover': [
    { name: 'Defender', price: '1.02 Cr+', type: 'Off-road SUV', fuel: 'Diesel' },
    { name: 'Discovery Sport', price: '67.90-73.60 L', type: 'SUV', fuel: 'Petrol' },
    { name: 'Range Rover Evoque', price: '72.27 L+', type: 'SUV', fuel: 'Petrol' },
    { name: 'Range Rover Sport', price: '1.74 Cr+', type: 'SUV', fuel: 'Petrol' },
  ],
  'porsche': [
    { name: 'Cayenne', price: '1.30 Cr+', type: 'SUV', fuel: 'Petrol' },
    { name: 'Macan', price: '76.39 L+', type: 'SUV', fuel: 'Petrol' },
    { name: '911', price: '2.31 Cr+', type: 'Sports Car', fuel: 'Petrol' },
    { name: 'Taycan', price: '1.90 Cr+', type: 'Electric', fuel: 'Electric' },
  ],
  'volvo': [
    { name: 'XC40', price: '44.90-55.90 L', type: 'SUV', fuel: 'Petrol' },
    { name: 'XC60', price: '63.90-73.90 L', type: 'SUV', fuel: 'Petrol' },
    { name: 'XC90', price: '93.90 L', type: 'SUV', fuel: 'Petrol' },
  ],
  'tesla': [
    { name: 'Model Y', price: '59.89 L', type: 'Electric SUV', fuel: 'Electric' },
    { name: 'Model 3', price: '34.99 L', type: 'Electric Sedan', fuel: 'Electric' },
  ],
  'byd': [
    { name: 'Atto 3', price: '33.99-39.99 L', type: 'Electric SUV', fuel: 'Electric' },
    { name: 'Seal', price: '41.00-53.00 L', type: 'Electric Sedan', fuel: 'Electric' },
    { name: 'eMAX 7', price: '26.90-29.90 L', type: 'Electric MPV', fuel: 'Electric' },
  ],
  'jaguar': [
    { name: 'F-Pace', price: '69.54 L+', type: 'SUV', fuel: 'Petrol' },
    { name: 'F-Type', price: '1.42 Cr+', type: 'Sports Car', fuel: 'Petrol' },
  ],
  'lamborghini': [
    { name: 'Urus', price: '4.17 Cr+', type: 'SUV', fuel: 'Petrol' },
    { name: 'Huracan', price: '3.22 Cr+', type: 'Sports Car', fuel: 'Petrol' },
    { name: 'Revuelto', price: '8.00 Cr+', type: 'Hypercar', fuel: 'Petrol' },
  ],
  'ferrari': [
    { name: 'Roma', price: '3.80 Cr', type: 'GT Coupe', fuel: 'Petrol' },
    { name: '296 GTB', price: '4.90 Cr', type: 'Sports Car', fuel: 'Petrol' },
  ],
  'rolls-royce': [
    { name: 'Ghost', price: '6.90 Cr', type: 'Sedan', fuel: 'Petrol' },
    { name: 'Cullinan', price: '6.95 Cr', type: 'SUV', fuel: 'Petrol' },
    { name: 'Phantom', price: '9.50 Cr', type: 'Sedan', fuel: 'Petrol' },
  ],
  'bentley': [
    { name: 'Bentayga', price: '4.10 Cr+', type: 'SUV', fuel: 'Petrol' },
    { name: 'Continental GT', price: '3.50 Cr+', type: 'Coupe', fuel: 'Petrol' },
  ],
  'mclaren': [
    { name: 'Artura', price: '4.75 Cr', type: 'Sports Car', fuel: 'Petrol' },
    { name: '750S', price: '5.21 Cr', type: 'Sports Car', fuel: 'Petrol' },
  ],
  'mini': [
    { name: 'Cooper', price: '39.90-45.90 L', type: 'Hatchback', fuel: 'Petrol' },
    { name: 'Countryman', price: '54.90 L+', type: 'SUV', fuel: 'Petrol' },
  ],
  'lexus': [
    { name: 'ES', price: '61.37 L+', type: 'Sedan', fuel: 'Hybrid' },
    { name: 'NX', price: '64.90 L+', type: 'SUV', fuel: 'Hybrid' },
    { name: 'RX', price: '99.90 L', type: 'SUV', fuel: 'Hybrid' },
  ],
};

const FUEL_COLORS = {
  Petrol: { bg: '#FFF5EC', color: '#FF6A00', border: '#FFD4A8' },
  Diesel: { bg: '#EEF4FF', color: '#2563EB', border: '#BFDBFE' },
  Electric: { bg: '#ECFDF5', color: '#16A34A', border: '#A7F3D0' },
  Hybrid: { bg: '#F0FDF4', color: '#22C55E', border: '#86EFAC' },
  Various: { bg: '#F5F4F2', color: '#6B7280', border: '#E5E7EB' },
};

const getFuelColor = (fuel) => FUEL_COLORS[fuel] || FUEL_COLORS.Various;

const SEGMENT_COLORS = {
  'Mass Market': '#FF6A00',
  'Premium': '#2563EB',
  'Luxury': '#7C3AED',
  'Ultra Luxury': '#B45309',
  'Hypercar': '#DC2626',
  'EV': '#16A34A',
  'Premium EV': '#0D9488',
};

export function getBrandBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  let found = ALL_BRANDS.find(b => b.slug === cleanSlug);
  if (found) return found;

  const ALIASES = {
    'mahendra': 'mahindra',
    'mahendra-e': 'mahindra-ev',
    'mahendra-ev': 'mahindra-ev',
    'mahindra-e': 'mahindra-ev',
    'mahindra-ev': 'mahindra-ev',
    'tata-ev': 'tata-ev',
    'hyundai-ev': 'hyundai-ev',
    'mg-ev': 'mg-ev',
    'bmw-ev': 'bmw-ev',
    'tvs-iqube': 'tvs-iqube',
    'tvsiqube': 'tvs-iqube',
    'chetak': 'chetak-ev',
    'chetak-ev': 'chetak-ev',
    'ola': 'ola-electric',
    'hero': 'hero-motocorp',
    'honda': 'honda',
    'suzuki': 'maruti-suzuki',
    'skoda': 'skoda',
    'volkswagen': 'volkswagen',
    'vw': 'volkswagen'
  };

  const aliasTarget = ALIASES[cleanSlug];
  if (aliasTarget) {
    found = ALL_BRANDS.find(b => b.slug === aliasTarget);
    if (found) return found;
  }

  const stripped = cleanSlug.replace(/[^a-z0-9]+/g, '');
  return ALL_BRANDS.find(b => {
    const bStripped = b.slug.replace(/[^a-z0-9]+/g, '');
    const bNameStripped = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    return bStripped === stripped || bNameStripped === stripped || (stripped.length >= 4 && (bStripped.includes(stripped) || stripped.includes(bStripped)));
  }) || null;
}

export function getModelVariants(brandName, modelName) {
  if (!modelName) return ['Standard Trim', 'Top Trim'];
  const COMBINED = { ...CAR_CATALOG, ...BIKE_CATALOG };
  const bKey = Object.keys(COMBINED).find(k => k.toLowerCase() === (brandName || '').toLowerCase());
  if (bKey && COMBINED[bKey]) {
    const foundCar = COMBINED[bKey].find(c => c.name.toLowerCase() === modelName.toLowerCase() || modelName.toLowerCase().includes(c.name.toLowerCase()));
    if (foundCar && foundCar.variants && foundCar.variants.length > 0) {
      return foundCar.variants.map(v => typeof v === 'string' ? v : v.name);
    }
  }
  return ['Base Trim (STD)', 'Mid Trim (Ambition/Plus)', 'Top Trim (Style/Luxury)', 'Automatic / DSG Trim'];
}

export default function BrandPage({ openPopup }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariantText, setSelectedVariantText] = useState('');
  const [selectedModelImg, setSelectedModelImg] = useState('');
  const [selectedModelPrice, setSelectedModelPrice] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState('826001 - Bank More / Hirapur - Dhanbad');

  useEffect(() => {
    const fullHref = window.location.href.toLowerCase();
    const hashStr = window.location.hash.toLowerCase();
    if (
      openPopup ||
      fullHref.includes('/popup') ||
      fullHref.includes('/enquiry') ||
      hashStr.includes('/popup') ||
      hashStr.includes('/enquiry')
    ) {
      setEnquiryOpen(true);
    }
  }, [openPopup, slug]);

  const brand = getBrandBySlug(slug);
  let models = BRAND_MODELS[slug];
  if (!models && brand) {
    const isBikeBrand = brand.segment === 'Bikes' || brand.segment === 'Premium Bikes' || brand.segment === 'EV' || brand.name.includes('Bikes');
    const COMBINED = isBikeBrand ? { ...BIKE_CATALOG, ...CAR_CATALOG } : { ...CAR_CATALOG, ...BIKE_CATALOG };
    const bName = brand.name.toLowerCase();
    const cleanBrandName = bName.replace(/\s+(bikes|ev|motors|motorrad)$/i, '').trim();

    const key = Object.keys(COMBINED).find(k => {
      const kSlug = k.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const kLower = k.toLowerCase();
      return kSlug === slug ||
             kLower === bName ||
             kLower === cleanBrandName ||
             bName === kLower ||
             (cleanBrandName.length > 2 && (kLower.includes(cleanBrandName) || cleanBrandName.includes(kLower)));
    });

    if (key && COMBINED[key]) {
      models = COMBINED[key].map(m => ({
        name: m.name,
        slug: m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: 'Get Quote',
        type: brand.segment || 'Vehicle',
        fuel: brand.segment === 'EV' ? 'Electric' : 'Petrol',
        img: m.thumbnail || (isBikeBrand ? 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png' : 'https://images.91wheels.com/assets/c_images/gallery/maruti/swift/maruti-swift-7-1767861017.png')
      }));
    }
  }
  if (!models) {
    models = [{ name: 'Contact Dealer', price: 'Get Quote', type: 'Various', fuel: 'Various' }];
  }

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [slug]);

  if (!brand) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', background: '#f5f4f2', gap: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#302F2E' }}>Brand not found</h2>
        <Link to="/" style={{ background: '#FF6A00', color: '#fff', padding: '12px 28px', borderRadius: 9999, textDecoration: 'none', fontWeight: 700 }}>Back to Home</Link>
      </div>
    );
  }

  const segmentColor = SEGMENT_COLORS[brand.segment] || '#FF6A00';

  const handleEnquiry = (model) => {
    setSelectedModel(typeof model === 'string' ? model : model.name);
    setSelectedModelImg(typeof model === 'object' ? (model.img || '') : '');
    setSelectedModelPrice(typeof model === 'object' ? (model.price || '') : '');
    setEnquiryOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) { setPhoneError(true); return; }
    setPhoneError(false);
    setSubmitting(true);

    const activeModelName = selectedModel || (models[0] ? models[0].name : '');
    const activeVariant = selectedVariantText || (getModelVariants(brand.name, activeModelName)[0] || 'Standard');

    try {
      await saveBuyerEnquiry({
        owner_name: form.name,
        vehicle_type: `${brand.name} ${activeModelName} (${activeVariant})`,
        brand: brand.name,
        model: activeModelName,
        variant: activeVariant,
        budget: 'Quote Enquiry',
        city: form.city || selectedArea || 'Ranchi',
        phone: form.phone,
        fuel: 'Petrol/Diesel',
        transmission: 'Standard'
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Brand page Supabase error:', err);
      alert(`Could not save your enquiry. Please try again. (${err.message || 'Unknown error'})`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Nunito, system-ui, sans-serif', background: '#f5f4f2', overflowX: 'hidden' }}>

      {/* UNIFIED NAVBAR */}
      <Navbar
        onOpenAreaModal={() => setIsAreaModalOpen(true)}
        onOpenBookModal={() => setEnquiryOpen(true)}
        selectedArea={selectedArea}
      />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg,#1e1d1c 0%,#302F2E 60%,#3a3836 100%)', padding: '52px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,106,0,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <span>&#8250;</span><span>Cars</span><span>&#8250;</span>
            <span style={{ color: '#FF6A00' }}>{brand.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <div style={{ width: 100, height: 80, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.24)' }}>
              <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: segmentColor, padding: '3px 12px', borderRadius: 9999, letterSpacing: 0.5 }}>{brand.segment}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Est. {brand.founded} &middot; {brand.country}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(26px,5vw,42px)', fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.1 }}>{brand.name} Cars</h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{models.length} models &middot; Compare dealer prices in Jharkhand</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 36, flexWrap: 'wrap' }}>
            {[{ val: '500+', lbl: 'Verified Dealers' },{ val: '2hr', lbl: 'Avg. Response' },{ val: '&#8377;0', lbl: 'Cost to You' }].map((s) => (
              <div key={s.lbl}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#FF6A00', lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: s.val }} />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS GRID */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Explore Range</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e1d1c', margin: 0 }}>{brand.name} Models in India</h2>
          </div>
          <button onClick={() => setEnquiryOpen(true)} style={{ background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,106,0,0.3)' }}>&#127919; Get Free Quotes</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 16 }}>
          {models.map((model) => {
            const fc = getFuelColor(model.fuel);
            const modelSlug = model.slug || model.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const modelPath = '/brand/' + slug + '/' + modelSlug;
            return (
              <div key={model.name}
                style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform 0.2s,box-shadow 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
                onClick={() => handleEnquiry(model)}
              >
                <div style={{ height: 3, background: 'linear-gradient(90deg,' + segmentColor + ',' + segmentColor + '88)' }} />

                {/* Vehicle Image */}
                <div style={{ background: '#f9f8f6', padding: '12px 16px 0', display: 'flex', justifyContent: 'center', height: 110, alignItems: 'center' }}>
                  <img
                    src={model.img || 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png'}
                    alt={model.name}
                    referrerPolicy="no-referrer"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.91wheels.com/assets/b_images/gallery/tvs/iqube-electric/tvs-iqube-electric-0-1769674235.png';
                    }}
                  />
                </div>

                <div style={{ padding: '14px 16px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#1e1d1c', marginBottom: 2 }}>{model.name}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{model.type}</div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 9999, background: fc.bg, color: fc.color, border: '1px solid ' + fc.border, whiteSpace: 'nowrap', marginLeft: 8 }}>{model.fuel}</div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Ex-showroom price</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#FF6A00' }}>&#8377;{model.price}</div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); handleEnquiry(model); }}
                      style={{ flex: 1, textAlign: 'center', background: '#1e1d1c', color: '#fff', border: 'none', padding: '9px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      View Variants
                    </button>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); handleEnquiry(model); }}
                      style={{ flex: 1, background: 'linear-gradient(135deg,#FF6A00,#ff4500)', color: '#fff', border: 'none', padding: '9px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      Get Price &#8594;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY BUYWHEELS */}
      <section style={{ background: '#fff', borderTop: '1px solid #f0eeec', borderBottom: '1px solid #f0eeec', padding: '40px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Why BuyWheels?</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1e1d1c', margin: 0 }}>Buy Your {brand.name} the Smart Way</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 16 }}>
            {[
              { icon: '&#127379;', title: '100% Free', desc: 'No charges ever for buyers. Zero cost, always.' },
              { icon: '&#127942;', title: 'Best Price', desc: 'Dealers compete. You get the lowest on-road price.' },
              { icon: '&#9989;', title: 'Verified Dealers', desc: '500+ vetted dealerships across Jharkhand.' },
              { icon: '&#9889;', title: '2hr Response', desc: 'Real quotes from dealers in under 2 hours.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '20px 16px', background: '#f9f8f6', borderRadius: 14, border: '1px solid #eee', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1d1c', marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER BRANDS */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6A00', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Explore More</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1e1d1c', margin: '0 0 20px' }}>Other Car Brands</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: 12 }}>
          {ALL_BRANDS.filter((b) => b.slug !== slug).slice(0, 20).map((b) => (
            <Link key={b.slug} to={'/brand/' + b.slug} style={{ textDecoration: 'none', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6A00'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ width: '100%', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.3 }}>{b.name}</span>
            </Link>
          ))}
        </div>
      </section>

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

      {/* ENQUIRY MODAL */}
      {enquiryOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) { setEnquiryOpen(false); setSubmitted(false); } }}>
          <div style={{ width: '100%', maxWidth: 480, background: '#fff', borderRadius: '20px 20px 0 0', padding: '28px 24px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.18)' }}>
            <div style={{ width: 40, height: 4, background: '#e5e7eb', borderRadius: 2, margin: '0 auto 20px' }} />
            {submitted ? (
              <TestDriveConfirmationCard
                bookingDetails={{
                  name: form.name || 'Rahul verma',
                  vehicle: `${brand.name} ${selectedModel || (models[0] ? models[0].name : '')}`,
                  variant: selectedVariantText || (getModelVariants(brand.name, selectedModel || (models[0] ? models[0].name : ''))[0] || 'Base Trim'),
                  date: '2026-08-20',
                  timeSlot: 'Morning (10 AM - 1 PM)',
                  location: form.city || 'Ranchi',
                  phone: form.phone || '09142231533'
                }}
                onScheduleAnother={() => setSubmitted(false)}
                onClose={() => { setEnquiryOpen(false); setSubmitted(false); }}
              />
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Car image hero strip */}
                <div style={{ background: 'linear-gradient(135deg,#1e1d1c,#302F2E)', borderRadius: 16, padding: '16px 20px 0', marginBottom: 4, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,106,0,0.12)', filter: 'blur(30px)', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 28, background: '#fff', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, flexShrink: 0 }}>
                      <img src={brand.logo} alt={brand.name} referrerPolicy="no-referrer" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{brand.name}</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{selectedModel || (models[0] ? models[0].name : 'All Models')}</div>
                    </div>
                    {(selectedModelPrice || (models[0] && models[0].price)) && (
                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Ex-showroom</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FF6A00' }}>&#8377;{selectedModelPrice || models[0].price}</div>
                      </div>
                    )}
                  </div>
                  {(selectedModelImg || (models[0] && models[0].img)) ? (
                    <div style={{ display: 'flex', justifyContent: 'center', height: 120 }}>
                      <img
                        src={selectedModelImg || models[0].img}
                        alt={selectedModel || (models[0] && models[0].name)}
                        referrerPolicy="no-referrer"
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
                        onError={e => { e.target.parentElement.style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                      <img src={brand.logo} alt={brand.name} referrerPolicy="no-referrer" style={{ maxHeight: 56, objectFit: 'contain', opacity: 0.6 }} />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Model</label>
                  <div className="grid grid-cols-2 gap-2">
                    {models.map((m, idx) => {
                      const activeModelName = selectedModel || (models[0] ? models[0].name : '');
                      const isSelected = activeModelName.toLowerCase() === m.name.toLowerCase();
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedModel(m.name);
                            setSelectedModelImg(m.img || '');
                            setSelectedModelPrice(m.price || '');
                            setSelectedVariantText('');
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

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const activeModelName = selectedModel || (models[0] ? models[0].name : '');
                      const variantsList = getModelVariants(brand.name, activeModelName);
                      return variantsList.map((vName, idx) => {
                        const isSelected = (selectedVariantText || variantsList[0]) === vName;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedVariantText(vName)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-semibold shadow-sm'
                                : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                            }`}
                          >
                            {vName}
                          </button>
                        );
                      });
                    })()}
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
