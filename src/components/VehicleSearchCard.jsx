import React, { useState, useEffect, useRef } from 'react';
import catCar from '../assets/cat_car.png';
import catBike from '../assets/cat_bike.png';
import catScooter from '../assets/cat_scooter.png';
import catEv from '../assets/cat_ev.png';

const SEARCHABLE_VEHICLES = [
  // Cars
  { name: 'Hyundai Creta', category: 'Car', brand: 'Hyundai', bodyStyle: 'SUV', fuel: 'petrol', transmission: 'automatic' },
  { name: 'Maruti Swift', category: 'Car', brand: 'Maruti Suzuki', bodyStyle: 'Hatchback', fuel: 'petrol', transmission: 'manual' },
  { name: 'Tata Nexon EV', category: 'EV', brand: 'Tata Motors', bodyStyle: 'SUV', fuel: 'electric', transmission: 'automatic' },
  { name: 'Tata Nexon', category: 'Car', brand: 'Tata Motors', bodyStyle: 'SUV', fuel: 'petrol', transmission: 'manual' },
  { name: 'Mahindra Scorpio N', category: 'Car', brand: 'Mahindra', bodyStyle: 'SUV', fuel: 'diesel', transmission: 'automatic' },
  { name: 'Mahindra Thar Roxx', category: 'Car', brand: 'Mahindra', bodyStyle: 'SUV', fuel: 'diesel', transmission: 'automatic' },
  { name: 'Mahindra Thar', category: 'Car', brand: 'Mahindra', bodyStyle: 'SUV', fuel: 'petrol', transmission: 'manual' },
  { name: 'Toyota Fortuner', category: 'Car', brand: 'Toyota', bodyStyle: 'SUV', fuel: 'diesel', transmission: 'automatic' },
  { name: 'Tata Punch EV', category: 'EV', brand: 'Tata Motors', bodyStyle: 'SUV', fuel: 'electric', transmission: 'automatic' },
  { name: 'Tata Punch', category: 'Car', brand: 'Tata Motors', bodyStyle: 'SUV', fuel: 'petrol', transmission: 'manual' },
  { name: 'Maruti Dzire', category: 'Car', brand: 'Maruti Suzuki', bodyStyle: 'Sedan', fuel: 'petrol', transmission: 'automatic' },
  { name: 'Kia Seltos', category: 'Car', brand: 'Kia', bodyStyle: 'SUV', fuel: 'petrol', transmission: 'automatic' },

  // Bikes
  { name: 'Hero Splendor Plus', category: 'Bike / Scooter', brand: 'Hero MotoCorp', bodyStyle: 'Bike', fuel: 'petrol', transmission: 'geared' },
  { name: 'Honda Shine 125', category: 'Bike / Scooter', brand: 'Honda', bodyStyle: 'Bike', fuel: 'petrol', transmission: 'geared' },
  { name: 'Bajaj Pulsar NS200', category: 'Bike / Scooter', brand: 'Bajaj', bodyStyle: 'Bike', fuel: 'petrol', transmission: 'geared' },
  { name: 'Royal Enfield Classic 350', category: 'Bike / Scooter', brand: 'Royal Enfield', bodyStyle: 'Bike', fuel: 'petrol', transmission: 'geared' },
  { name: 'TVS Raider 125', category: 'Bike / Scooter', brand: 'TVS', bodyStyle: 'Bike', fuel: 'petrol', transmission: 'geared' },

  // Scooters
  { name: 'Honda Activa 6G', category: 'Bike / Scooter', brand: 'Honda', bodyStyle: 'Scooter', fuel: 'petrol', transmission: 'gearless' },
  { name: 'Ola S1 Pro', category: 'Bike / Scooter', brand: 'Ola Electric', bodyStyle: 'Scooter', fuel: 'electric', transmission: 'gearless' },
  { name: 'Ather 450X', category: 'Bike / Scooter', brand: 'Ather', bodyStyle: 'Scooter', fuel: 'electric', transmission: 'gearless' },
  { name: 'TVS iQube', category: 'Bike / Scooter', brand: 'TVS', bodyStyle: 'Scooter', fuel: 'electric', transmission: 'gearless' },
];

const CITIES = ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Giridih', 'Ramgarh'];

export default function VehicleSearchCard({ onSelectCategory, onSelectVehicle }) {
  const [activeTab, setActiveTab] = useState('Car'); // 'Car' | 'Bike' | 'Scooter' | 'EV'
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const cardRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowCityDropdown(false);
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter model suggestions based on active tab and search query
  useEffect(() => {
    let list = SEARCHABLE_VEHICLES;
    if (activeTab === 'Car') {
      list = list.filter(v => v.category === 'Car');
    } else if (activeTab === 'Bike') {
      list = list.filter(v => v.category === 'Bike / Scooter' && v.transmission === 'geared');
    } else if (activeTab === 'Scooter') {
      list = list.filter(v => v.category === 'Bike / Scooter' && v.transmission === 'gearless');
    } else if (activeTab === 'EV') {
      list = list.filter(v => v.category === 'EV' || v.fuel === 'electric');
    }

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = list.filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.brand.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6));
  }, [query, activeTab]);

  const handleSelectCity = (cityName) => {
    setSelectedCity(cityName);
    setShowCityDropdown(false);
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setQuery('');
    setSuggestions([]);
    if (tabKey === 'Car') onSelectCategory('Car');
    else if (tabKey === 'Bike') onSelectCategory('Bike', 'geared');
    else if (tabKey === 'Scooter') onSelectCategory('Scooter', 'gearless');
    else if (tabKey === 'EV') onSelectCategory('EV');
  };

  const handleSuggestionClick = (vehicle) => {
    setQuery(vehicle.name);
    setShowDropdown(false);
    onSelectVehicle({
      ...vehicle,
      city: selectedCity || 'Ranchi'
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      if (activeTab === 'Car') onSelectCategory('Car');
      else if (activeTab === 'Bike') onSelectCategory('Bike', 'geared');
      else if (activeTab === 'Scooter') onSelectCategory('Scooter', 'gearless');
      else if (activeTab === 'EV') onSelectCategory('EV');
      else onSelectCategory('Car');
      return;
    }

    const exactMatch = SEARCHABLE_VEHICLES.find(
      v => v.name.toLowerCase() === query.trim().toLowerCase()
    );
    if (exactMatch) {
      onSelectVehicle({ ...exactMatch, city: selectedCity || 'Ranchi' });
    } else if (suggestions.length > 0) {
      onSelectVehicle({ ...suggestions[0], city: selectedCity || 'Ranchi' });
    } else {
      if (activeTab === 'Car') onSelectCategory('Car');
      else if (activeTab === 'Bike') onSelectCategory('Bike', 'geared');
      else if (activeTab === 'Scooter') onSelectCategory('Scooter', 'gearless');
      else if (activeTab === 'EV') onSelectCategory('EV');
    }
  };

  const CATEGORY_TABS = [
    { key: 'Car', label: 'Car', img: catCar },
    { key: 'Bike', label: 'Bike', img: catBike },
    { key: 'Scooter', label: 'Scooter', img: catScooter },
    { key: 'EV', label: 'EV', img: catEv },
  ];

  return (
    <div className="vsc-user-wrapper" ref={cardRef}>
      <div className="vsc-user-card">
        
        {/* HEADER ROW */}
        <div className="vsc-uc-header">
          <h2 className="vsc-uc-title">Find Your Right Vehicle</h2>
          <div className="vsc-uc-city-wrap">
            <button
              type="button"
              className="vsc-uc-city-btn"
              id="city-selector-btn"
              onClick={() => setShowCityDropdown(!showCityDropdown)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-primary">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{selectedCity || 'Select City'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down transition-transform duration-200 ${showCityDropdown ? 'rotate-180' : ''}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* City Dropdown Menu */}
            {showCityDropdown && (
              <div className="vsc-uc-city-dropdown">
                {CITIES.map(city => (
                  <div
                    key={city}
                    className={`vsc-uc-city-item ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => handleSelectCity(city)}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <span>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MAIN SEARCH ROW */}
        <div className="vsc-uc-search-body">
          <div className="vsc-uc-search-flex">
            <div className="vsc-uc-input-shell">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search ml-4 text-muted flex-shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder={
                  activeTab === 'Car' ? 'Type model name, e.g. Swift, Creta, Nexon…' :
                  activeTab === 'Bike' ? 'Type model name, e.g. Pulsar, Splendor, Classic 350…' :
                  activeTab === 'Scooter' ? 'Type model name, e.g. Activa 6G, Ather 450X…' :
                  'Type model name, e.g. Nexon EV, Punch EV, Ola S1…'
                }
                className="vsc-uc-input"
                id="hero-search-input"
                value={query}
                autoComplete="off"
                onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
              />
              
              {/* Auto-suggest dropdown */}
              {showDropdown && suggestions.length > 0 && (
                <ul className="vsc-uc-suggestions-dropdown">
                  {suggestions.map((v, i) => (
                    <li key={i} className="vsc-uc-suggestion-item" onClick={() => handleSuggestionClick(v)}>
                      <span className="vsc-uc-sug-name">{v.name}</span>
                      <span className="vsc-uc-sug-meta">{v.brand} · {v.category}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              className="vsc-uc-search-btn"
              id="hero-search-btn"
              onClick={handleSearchSubmit}
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
  );
}
