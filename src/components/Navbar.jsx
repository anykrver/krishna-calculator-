import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({
  selectedCity = 'Dhanbad',
  onOpenAreaModal,
  onOpenBookModal,
  onAnchorLink
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavAnchor = (e, id) => {
    if (onAnchorLink) {
      onAnchorLink(e, id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const cityDisplayName = typeof selectedCity === 'string' && selectedCity.includes(' - ')
    ? selectedCity.split(' - ').pop().trim()
    : (selectedCity || 'Dhanbad');

  // Dynamic Theme Classes
  const linkClass = isScrolled
    ? 'text-slate-700 hover:text-[#FF6A00] hover:bg-slate-100'
    : 'text-white/90 hover:text-white hover:bg-white/10';

  const topBarTextClass = isScrolled
    ? 'text-slate-600'
    : 'text-white/70';

  const topBarBorderClass = isScrolled
    ? 'border-slate-200'
    : 'border-white/10';

  const iconBtnClass = isScrolled
    ? 'text-slate-700 hover:bg-slate-100'
    : 'text-white hover:bg-white/10';

  const cityBtnClass = isScrolled
    ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
    : 'bg-white/10 text-white border-white/20 hover:bg-white/20';

  const loginBtnClass = isScrolled
    ? 'text-slate-800 hover:bg-slate-100 border-slate-300'
    : 'text-white/90 hover:bg-white/10 border-white/20';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md border-b border-slate-200 text-slate-800' : 'bg-transparent border-b border-white/10 text-white'}`}>
      {/* Top Utility Bar (Hidden on Mobile, Visible lg:block) */}
      <div className={`hidden lg:block border-b transition-all duration-300 ${topBarBorderClass}`}>
        <div className="container-fluid flex items-center justify-between h-9 px-4 lg:px-8">
          <div className={`flex items-center gap-1 text-xs ${topBarTextClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Serving Jharkhand — Ranchi, Jamshedpur, Dhanbad &amp; more</span>
          </div>

          <div className={`flex items-center gap-6 text-xs ${topBarTextClass}`}>
            <a href="tel:+919296961232" className="flex items-center gap-1 hover:text-[#FF6A00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 92969 61232</span>
            </a>
            <Link className="hover:text-[#FF6A00] transition-colors" to="/dealer">Find Dealers</Link>
            <a className="hover:text-[#FF6A00] transition-colors" href="#trust" onClick={(e) => handleNavAnchor(e, 'trust')}>About Us</a>
            <a className="hover:text-[#FF6A00] transition-colors" href="#enquiry" onClick={(e) => handleNavAnchor(e, 'enquiry')}>Contact</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-fluid flex items-center h-16 lg:h-20 px-4 lg:px-8">
        
        {/* Mobile View Header */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <button
              className={`p-1.5 rounded-xl transition-colors ${iconBtnClass}`}
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>

            <Link className="flex items-center justify-center pl-0.5" to="/">
              <img src="/logo.png" alt="Buywheels" className="object-contain h-11 sm:h-14 w-auto py-1" style={{ imageRendering: 'crisp-edges' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
              <span style={{ display: 'none', alignItems: 'center', gap: 6, fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 18, color: isScrolled ? '#1e1d1c' : '#fff' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>W</span> Buy<span style={{ color: '#FF6A00' }}>Wheels</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className={`p-1.5 sm:p-2 rounded-xl transition-colors ${iconBtnClass}`}
              aria-label="Search"
              onClick={() => { const searchInput = document.getElementById('hero-search-input'); if (searchInput) searchInput.focus(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>

            <button
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${cityBtnClass}`}
              title="Search your Area or Pincode"
              onClick={() => onOpenAreaModal && onOpenAreaModal()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-[#FF6A00] shrink-0">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="truncate max-w-[70px] sm:max-w-[110px]">{cityDisplayName}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down shrink-0 opacity-70">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop View Header */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <Link className="flex items-center flex-shrink-0" to="/">
            <img src="/logo.png" alt="Buywheels" className="object-contain h-20 w-auto py-2" style={{ imageRendering: 'crisp-edges' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
            <span style={{ display: 'none', alignItems: 'center', gap: 8, fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 22, color: isScrolled ? '#1e1d1c' : '#fff' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>W</span> Buy<span style={{ color: '#FF6A00' }}>Wheels</span>
            </span>
          </Link>

          {/* Nav Links for XL screen */}
          <nav className="hidden xl:flex items-center gap-1 ml-6">
            <a className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#cats" onClick={(e) => handleNavAnchor(e, 'cats')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <path d="M9 17h6"></path>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
              Cars
            </a>

            <a className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#cats" onClick={(e) => handleNavAnchor(e, 'cats')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              EV
            </a>

            <a className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#compare" onClick={(e) => handleNavAnchor(e, 'compare')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-compare">
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                <path d="M11 18H8a2 2 0 0 1-2-2V9"></path>
              </svg>
              Compare
            </a>

            <a className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#brands" onClick={(e) => handleNavAnchor(e, 'brands')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag">
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
              Offers
            </a>

            <a className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#trust" onClick={(e) => handleNavAnchor(e, 'trust')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
              Care
            </a>

            <Link className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} to="/dealer">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M10 18h4"></path>
              </svg>
              Dealers
            </Link>

            <Link className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} to="/agent">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Blog
            </Link>
          </nav>

          {/* Nav Links for LG to XL screens */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5 ml-4">
            <a className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#cats" onClick={(e) => handleNavAnchor(e, 'cats')}>Cars</a>
            <a className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#cats" onClick={(e) => handleNavAnchor(e, 'cats')}>EV</a>
            <a className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#compare" onClick={(e) => handleNavAnchor(e, 'compare')}>Compare</a>
            <a className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#brands" onClick={(e) => handleNavAnchor(e, 'brands')}>Offers</a>
            <a className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${linkClass}`} href="#trust" onClick={(e) => handleNavAnchor(e, 'trust')}>Care</a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${cityBtnClass}`}
              title="Search your Area or Pincode"
              onClick={() => onOpenAreaModal && onOpenAreaModal()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-[#FF6A00] shrink-0">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="truncate max-w-[140px]">{cityDisplayName}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down shrink-0 opacity-70">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>

            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${iconBtnClass}`}
              onClick={() => { const searchInput = document.getElementById('hero-search-input'); if (searchInput) searchInput.focus(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="hidden lg:block text-sm font-medium">Search</span>
            </button>

            <Link className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${loginBtnClass}`} to="/dealer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Login
            </Link>

            <button
              onClick={() => onOpenBookModal && onOpenBookModal()}
              className="hidden lg:flex items-center gap-2 px-5 py-2 bg-primary text-white font-heading font-semibold rounded-xl text-sm hover:bg-primary-600 hover:shadow-primary transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#FF6A00' }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className={`${isScrolled ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#1e1d1c] text-white border-white/10'} border-b px-6 py-4 flex flex-col gap-3 shadow-xl`}>
          <a className={`${isScrolled ? 'text-slate-800 hover:text-[#FF6A00]' : 'text-white/90 hover:text-white'} text-sm font-medium py-1`} href="#cats" onClick={(e) => handleNavAnchor(e, 'cats')}>Cars &amp; Vehicles</a>
          <a className={`${isScrolled ? 'text-slate-800 hover:text-[#FF6A00]' : 'text-white/90 hover:text-white'} text-sm font-medium py-1`} href="#compare" onClick={(e) => handleNavAnchor(e, 'compare')}>Compare Deals</a>
          <a className={`${isScrolled ? 'text-slate-800 hover:text-[#FF6A00]' : 'text-white/90 hover:text-white'} text-sm font-medium py-1`} href="#brands" onClick={(e) => handleNavAnchor(e, 'brands')}>Browse Brands</a>
          <Link className={`${isScrolled ? 'text-slate-800 hover:text-[#FF6A00]' : 'text-white/90 hover:text-white'} text-sm font-medium py-1`} to="/dealer">Dealer Portal</Link>
          <Link className={`${isScrolled ? 'text-slate-800 hover:text-[#FF6A00]' : 'text-white/90 hover:text-white'} text-sm font-medium py-1`} to="/agent">Agent Portal</Link>
          <button
            onClick={() => { setIsMobileMenuOpen(false); onOpenBookModal && onOpenBookModal(); }}
            className="w-full mt-2 py-2.5 bg-[#FF6A00] text-white font-bold rounded-xl text-center text-sm shadow-md"
          >
            Book Now / Get Best Deal
          </button>
        </div>
      )}
    </header>
  );
}
