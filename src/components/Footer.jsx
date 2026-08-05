import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-24 lg:pb-16" style={{ background: '#1e1d1c' }}>
      <div className="container-fluid px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1 & 2: Brand Info, Contacts, Social Links */}
          <div className="lg:col-span-2">
            <Link className="inline-flex mb-4" to="/">
              <img src="/logo.png" alt="Buywheels" className="h-14 lg:h-16 w-auto object-contain" style={{ imageRendering: 'crisp-edges' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
              <span style={{ display: 'none', alignItems: 'center', gap: 8, fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 24, color: '#fff' }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#FF6A00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>W</span> Buy<span style={{ color: '#FF6A00' }}>Wheels</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Jharkhand's buyer-first platform for new Cars &amp; Electric Vehicles. Compare prices across authorized dealerships and get the best deal.
            </p>

            <div className="space-y-3 mb-6">
              <a href="tel:+919296961232" className="flex items-center gap-3 text-sm text-white/70 hover:text-[#FF6A00] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone text-[#FF6A00]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +91 92969 61232
              </a>
              <a href="mailto:hello@buywheels.in" className="flex items-center gap-3 text-sm text-white/70 hover:text-[#FF6A00] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-[#FF6A00]">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                hello@buywheels.in
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-[#FF6A00] mt-0.5 flex-shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Main Road, Ranchi, Jharkhand 834001
              </div>
            </div>

            <div className="flex gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF6A00] transition-colors duration-200 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF6A00] transition-colors duration-200 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/cars.buywheels" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF6A00] transition-colors duration-200 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://youtube.com/@cars.buywheels" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF6A00] transition-colors duration-200 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF6A00] transition-colors duration-200 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Vehicles */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Vehicles</h3>
            <ul className="space-y-2.5">
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#cats">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  New Cars
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#cats">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Electric Vehicles
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#compare">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Compare Vehicles
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#how">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Finance &amp; EMI
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#trust">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Insurance
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#trust">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Buywheels Care
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#enquiry">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Test Drive
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#enquiry">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Best Price Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Dealers */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Dealers</h3>
            <ul className="space-y-2.5">
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/dealer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Find Dealers
                </Link>
              </li>
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/dealer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Ranchi Dealers
                </Link>
              </li>
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/dealer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Jamshedpur Dealers
                </Link>
              </li>
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/dealer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Dhanbad Dealers
                </Link>
              </li>
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/dealer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Company */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#trust">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  About Buywheels
                </a>
              </li>
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/agent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Careers
                </Link>
              </li>
              <li>
                <Link className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" to="/agent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Blog &amp; News
                </Link>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#enquiry">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Contact Us
                </a>
              </li>
              <li>
                <a className="text-sm text-white/60 hover:text-[#FF6A00] transition-colors duration-200 flex items-center gap-1 group" href="#trust">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  Media
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="py-10 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-1 text-white">Get the Best Deals in Your Inbox</h3>
              <p className="text-white/60 text-sm">Subscribe for exclusive offers, new launches, and buying guides.</p>
              {subscribed && <div className="text-xs text-[#FF6A00] font-bold mt-1">Thank you for subscribing to Buywheels updates!</div>}
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full lg:w-72 h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#FF6A00] focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto flex-shrink-0 px-6 h-12 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:bg-[#e05c00]"
                style={{ background: '#FF6A00' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center lg:text-left">
            © 2026 Buywheels. All rights reserved. | Serving Jharkhand with pride.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-white transition-colors" href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
