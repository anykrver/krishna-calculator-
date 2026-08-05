import React, { useState, useEffect } from 'react';

export const JHARKHAND_CITIES = [
  {
    name: 'Ranchi',
    state: 'Jharkhand',
    badge: 'Capital City',
    areas: [
      'Main Road / Overbridge',
      'Lalpur & Circular Road',
      'Kanke Road & Morabadi',
      'Doranda & Hinoo',
      'Harmu & Argora',
      'Ratu Road & Piska More',
      'Bariatu & Kokar',
      'Dhurwa & Tupudana',
      'Namkum & Tatisilwai'
    ]
  },
  {
    name: 'Jamshedpur',
    state: 'Jharkhand',
    badge: 'Steel City',
    areas: [
      'Bistupur & Sakchi',
      'Golmuri & Telco',
      'Kadma & Sonari',
      'Jugsalai & Station Road',
      'Mango & Dimna Road',
      'Adityapur & Gamharia',
      'Baridih & Birsanagar'
    ]
  },
  {
    name: 'Dhanbad',
    state: 'Jharkhand',
    badge: 'Coal Capital',
    areas: [
      'Bank More & Hirapur',
      'Saraidhela & Steel Gate',
      'Barwadda & Coal Nagar',
      'Govindpur & GT Road',
      'Jharia & Katras'
    ]
  },
  {
    name: 'Bokaro',
    state: 'Jharkhand',
    badge: 'Steel City',
    areas: [
      'Sector 4 (City Centre)',
      'Chas Main Market',
      'Sector 1 & Sector 3',
      'Sector 9 & Sector 12',
      'Bokaro Thermal'
    ]
  },
  {
    name: 'Hazaribagh',
    state: 'Jharkhand',
    badge: 'District HQ',
    areas: [
      'Main Town & Korrah',
      'Matwari & Canary Hill',
      'Pelawal & Demotand'
    ]
  },
  {
    name: 'Deoghar',
    state: 'Jharkhand',
    badge: 'Holy City',
    areas: [
      'Tower Chowk & VIP Road',
      'Castairs Town',
      'Jasidih Junction'
    ]
  },
  {
    name: 'Ramgarh',
    state: 'Jharkhand',
    badge: 'Cantonment',
    areas: [
      'Ramgarh Cantonment',
      'Main Market Road',
      'Barkakana & Patratu'
    ]
  },
  {
    name: 'Giridih',
    state: 'Jharkhand',
    badge: 'District HQ',
    areas: [
      'Main Town Market',
      'Pachamba'
    ]
  },
  {
    name: 'Dumka',
    state: 'Jharkhand',
    badge: 'Sub-Capital',
    areas: [
      'Rasikpur & Main Market',
      'Dumka Bus Stand Area'
    ]
  }
];

// Fallback compatibility lists
export const POPULAR_JHARKHAND_AREAS = JHARKHAND_CITIES.flatMap(c => 
  c.areas.map(a => `${a} - ${c.name}`)
);

export const ALL_JHARKHAND_AREAS = POPULAR_JHARKHAND_AREAS;

export default function AreaSearchModal({
  isOpen = true,
  onClose,
  selectedArea = 'Dhanbad',
  onSelectArea,
}) {
  // Parse initial state
  const initialCityName = typeof selectedArea === 'string' && selectedArea.includes('-')
    ? selectedArea.split('-').pop().trim()
    : (typeof selectedArea === 'string' ? selectedArea : 'Dhanbad');

  const initialAreaName = typeof selectedArea === 'string' && selectedArea.includes('-')
    ? selectedArea.split('-')[0].trim()
    : '';

  const [selectedCity, setSelectedCity] = useState(initialCityName);
  const [selectedLocality, setSelectedLocality] = useState(initialAreaName);
  const [customLocality, setCustomLocality] = useState('');

  useEffect(() => {
    if (selectedArea) {
      const city = typeof selectedArea === 'string' && selectedArea.includes('-')
        ? selectedArea.split('-').pop().trim()
        : (typeof selectedArea === 'string' ? selectedArea : 'Dhanbad');
      const locality = typeof selectedArea === 'string' && selectedArea.includes('-')
        ? selectedArea.split('-')[0].trim()
        : '';
      setSelectedCity(city);
      setSelectedLocality(locality);
    }
  }, [selectedArea]);

  if (!isOpen) return null;

  const currentCityObj = JHARKHAND_CITIES.find(c => c.name.toLowerCase() === selectedCity.toLowerCase()) || JHARKHAND_CITIES[0];

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    const newCityObj = JHARKHAND_CITIES.find(c => c.name === cityName);
    if (newCityObj && newCityObj.areas.length > 0) {
      setSelectedLocality(newCityObj.areas[0]);
    } else {
      setSelectedLocality('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalLocality = customLocality.trim() || selectedLocality;
    const formattedResult = finalLocality ? `${finalLocality} - ${selectedCity}` : selectedCity;
    if (onSelectArea) {
      onSelectArea(formattedResult);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative max-h-[92vh] flex flex-col animate-scale-in">
        
        {/* Header */}
        <div className="shrink-0 px-6 pt-5 pb-4 flex items-center justify-between border-b border-gray-100 bg-white">
          <div>
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-[#FF6A00]">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Choose Your Location
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Select your city and area to view local dealer offers</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-slate-900 transition-colors outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Location Form */}
        <form onSubmit={handleFormSubmit} className="p-5 flex-1 flex flex-col min-h-0 overflow-y-auto space-y-5 custom-scrollbar">
          
          {/* 1. Select City Section */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Select City (Jharkhand)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {JHARKHAND_CITIES.map((city) => {
                const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                return (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleCitySelect(city.name)}
                    className={`px-3 py-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00] shadow-sm font-bold ring-2 ring-[#FF6A00]/20'
                        : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-semibold truncate">{city.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-[#FF6A00]' : 'text-gray-400'}`}>
                      {city.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Select Area / Locality Section */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Select Area / Locality in {currentCityObj.name}
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {currentCityObj.areas.map((area) => {
                const isSelected = selectedLocality === area && !customLocality;
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setSelectedLocality(area);
                      setCustomLocality('');
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-semibold shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>

            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Or enter specific landmark / area name (Optional):
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`e.g. Bank More / Saraidhela, ${currentCityObj.name}`}
                value={customLocality}
                onChange={(e) => {
                  setCustomLocality(e.target.value);
                  setSelectedLocality('');
                }}
                className="w-full p-3 px-4 rounded-xl border border-gray-200 focus:border-[#FF6A00] focus:ring-2 focus:ring-[#FF6A00]/20 text-slate-800 text-sm bg-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#ff4500] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#FF6A00]/25 hover:shadow-xl hover:from-[#ff7e1a] hover:to-[#e63e00] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Confirm Location ({selectedCity})</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
