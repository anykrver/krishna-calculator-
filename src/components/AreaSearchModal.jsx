import React, { useState, useMemo } from 'react';

export const POPULAR_JHARKHAND_AREAS = [
  '834001 - Main Road / Overbridge - Ranchi',
  '834002 - Doranda / Hinoo - Ranchi',
  '834004 - Kanke Road / Morabadi - Ranchi',
  '831001 - Bistupur / Sakchi - Jamshedpur',
  '826001 - Bank More / Hirapur - Dhanbad',
  '827004 - Sector 4 / City Centre - Bokaro',
  '825301 - Main Town / Korrah - Hazaribagh',
  '829122 - Ramgarh Cantonment - Ramgarh',
];

export const ALL_JHARKHAND_AREAS = [
  '834001 - Main Road - Ranchi',
  '834001 - Lalpur - Ranchi',
  '834001 - Kokar - Ranchi',
  '834001 - Upper Bazaar - Ranchi',
  '834001 - Kantatoli - Ranchi',
  '834002 - Doranda - Ranchi',
  '834002 - Hinoo - Ranchi',
  '834002 - Harmu Housing Colony - Ranchi',
  '834002 - Argora - Ranchi',
  '834003 - Tupudana - Ranchi',
  '834004 - Dhurwa - Ranchi',
  '834005 - Ratu Road - Ranchi',
  '834006 - Kanke Road - Ranchi',
  '834008 - Morabadi - Ranchi',
  '834009 - Bariatu - Ranchi',
  '834010 - Namkum - Ranchi',
  '831001 - Bistupur - Jamshedpur',
  '831001 - Sakchi - Jamshedpur',
  '831003 - Golmuri - Jamshedpur',
  '831004 - Telco Colony - Jamshedpur',
  '831005 - Kadma - Jamshedpur',
  '831006 - Jugsalai - Jamshedpur',
  '831011 - Sonari - Jamshedpur',
  '831012 - Mango - Jamshedpur',
  '831013 - Adityapur - Jamshedpur',
  '831017 - Baridih - Jamshedpur',
  '826001 - Bank More - Dhanbad',
  '826001 - Hirapur - Dhanbad',
  '826004 - Saraidhela - Dhanbad',
  '826004 - Steel Gate - Dhanbad',
  '826004 - Barwadda - Dhanbad',
  '826005 - Coal Nagar - Dhanbad',
  '828109 - Govindpur - Dhanbad',
  '828111 - Jharia - Dhanbad',
  '828113 - Katras - Dhanbad',
  '827001 - Sector 1 - Bokaro',
  '827004 - Sector 4 (City Centre) - Bokaro',
  '827009 - Sector 9 - Bokaro',
  '827012 - Sector 12 - Bokaro',
  '827013 - Chas - Bokaro',
  '829107 - Bokaro Thermal - Bokaro',
  '825301 - Main Town - Hazaribagh',
  '825301 - Korrah - Hazaribagh',
  '825301 - Matwari - Hazaribagh',
  '825301 - Canary Hill Road - Hazaribagh',
  '825301 - Pelawal - Hazaribagh',
  '825301 - Demotand - Hazaribagh',
  '829122 - Ramgarh Cantonment - Ramgarh',
  '829122 - Main Market - Ramgarh',
  '829101 - Barkakana - Ramgarh',
  '829119 - Patratu - Ramgarh',
  '825314 - Ghato - Ramgarh',
  '825316 - Kuju - Ramgarh',
  '814112 - Castairs Town - Deoghar',
  '814112 - VIP Road / Tower Chowk - Deoghar',
  '814113 - Jasidih - Deoghar',
  '815301 - Main Town - Giridih',
  '815301 - Pachamba - Giridih',
  '814101 - Main Market / Rasikpur - Dumka',
  '822101 - Main Town / Six Mule - Daltonganj',
  '833201 - Main Market / Sadar - Chaibasa',
  '825409 - Jhumri Telaiya - Koderma',
  '835207 - Main Town - Gumla',
];

export default function AreaSearchModal({
  isOpen = true,
  onClose,
  selectedArea = '826001 - Bank More / Hirapur - Dhanbad',
  onSelectArea,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle single selection
  const handleSelect = (area) => {
    if (onSelectArea) {
      onSelectArea(area);
    }
    if (onClose) {
      onClose();
    }
  };

  // Filter areas based on user search query
  const queryLower = searchQuery.toLowerCase().trim();

  const filteredPopular = useMemo(() => {
    if (!queryLower) return POPULAR_JHARKHAND_AREAS;
    return POPULAR_JHARKHAND_AREAS.filter((area) =>
      area.toLowerCase().includes(queryLower)
    );
  }, [queryLower]);

  const filteredAll = useMemo(() => {
    if (!queryLower) return ALL_JHARKHAND_AREAS;
    return ALL_JHARKHAND_AREAS.filter((area) =>
      area.toLowerCase().includes(queryLower)
    );
  }, [queryLower]);

  if (!isOpen) return null;

  // Helper function to check if item is selected
  const isItemSelected = (item) => {
    if (!selectedArea) return false;
    if (selectedArea === item) return true;
    
    // Partial match fallback for area pincodes & names (e.g., '826001 - Bank More - Dhanbad' vs '826001 - Bank More / Hirapur - Dhanbad')
    const itemPincode = item.split(' - ')[0];
    const selectedPincode = typeof selectedArea === 'string' ? selectedArea.split(' - ')[0] : '';
    const itemCity = item.split(' - ').pop();
    const selectedCity = typeof selectedArea === 'string' ? selectedArea.split(' - ').pop() : '';

    if (itemPincode && selectedPincode && itemPincode === selectedPincode && itemCity === selectedCity) {
      // Check sub-location match
      const itemSub = item.split(' - ')[1] || '';
      const selectedSub = typeof selectedArea === 'string' ? (selectedArea.split(' - ')[1] || '') : '';
      if (itemSub && selectedSub && (itemSub.includes(selectedSub) || selectedSub.includes(itemSub))) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      {/* Modal Dialog Container - Bottom Sheet on Mobile, Centered on Desktop (NO double scrollbars) */}
      <div className="w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative max-h-[90vh] flex flex-col animate-scale-in">
        {/* Header - Fixed Height (shrink-0) */}
        <div className="shrink-0 px-5 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <h3 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin text-[#FF6A00] shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Search your Area or Pincode
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-slate-900 transition-colors outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content Container - Uses min-h-0 so child flex item can scroll without overflowing modal */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Search Box - Fixed (shrink-0) */}
          <div className="shrink-0 relative mb-3.5">
            <div className="relative flex items-center rounded-xl border border-[#FF6A00]/40 hover:border-[#FF6A00]/60 focus-within:border-[#FF6A00] focus-within:ring-2 focus-within:ring-[#FF6A00]/20 bg-white transition-all shadow-sm">
              <span className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </span>
              <input
                type="text"
                id="pinecode"
                name="pincode"
                placeholder="Pincode e.g. 834001 or area (Ranchi, Jamshedpur, Dhanbad...)"
                autoComplete="off"
                className="w-full py-3.5 pl-10 pr-10 text-sm font-medium text-slate-800 bg-transparent outline-none placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-slate-600 hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* THE ONLY SCROLL CONTAINER - flex-1 overflow-y-auto min-h-0 */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-4 space-y-4 custom-scrollbar [-webkit-overflow-scrolling:touch]">
            {/* Popular Jharkhand Areas Section */}
            {filteredPopular.length > 0 && (
              <div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 px-1">
                  Popular Jharkhand Areas
                </div>
                <div className="divide-y divide-gray-100 rounded-xl bg-gray-50/50 border border-gray-100 overflow-hidden">
                  {filteredPopular.map((area) => {
                    const selected = isItemSelected(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleSelect(area)}
                        className={`w-full text-left px-3.5 py-3 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#FF6A00]/10 text-[#FF6A00] font-semibold'
                            : 'text-slate-700 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                        }`}
                      >
                        <span className="truncate">{area}</span>
                        {selected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check text-[#FF6A00] shrink-0 ml-2"
                          >
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Jharkhand Areas Section */}
            {filteredAll.length > 0 && (
              <div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 px-1 mt-2">
                  All Jharkhand Areas
                </div>
                <div className="divide-y divide-gray-100 rounded-xl bg-white border border-gray-100 overflow-hidden">
                  {filteredAll.map((area, idx) => {
                    const selected = isItemSelected(area);
                    return (
                      <button
                        key={`${area}-${idx}`}
                        type="button"
                        onClick={() => handleSelect(area)}
                        className={`w-full text-left px-3.5 py-3 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#FF6A00]/10 text-[#FF6A00] font-semibold'
                            : 'text-slate-700 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                        }`}
                      >
                        <span className="truncate">{area}</span>
                        {selected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check text-[#FF6A00] shrink-0 ml-2"
                          >
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state if search returns zero matches */}
            {filteredPopular.length === 0 && filteredAll.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-700">No areas found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try searching for a different pincode or city name
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
