import React, { useState } from 'react';
import { saveBuyerEnquiry } from '../lib/supabase';

/* ─── EV Model Catalog ─────────────────────────────────────────────────── */
export const EV_CATALOG = {
  'tata-nexon-ev': {
    name: 'Tata Nexon EV',
    brand: 'Tata',
    price: '14.49 – 19.49 L',
    range: '465 km',
    img: 'https://images.91wheels.com/assets/c_images/gallery/tata/nexon-ev/tata-nexon-ev-1-1756780543.png?w=640&q=75',
    badge: 'Best Seller EV',
    variants: [
      { name: 'Creative (Long Range)', price: '14.49 L', range: '465 km' },
      { name: 'Fearless (Long Range)', price: '15.49 L', range: '465 km' },
      { name: 'Fearless+ (Long Range)', price: '16.79 L', range: '465 km' },
      { name: 'Empowered (Long Range)', price: '17.49 L', range: '465 km' },
      { name: 'Empowered+ (Long Range)', price: '19.49 L', range: '465 km' },
    ],
  },
  'tata-punch-ev': {
    name: 'Tata Punch EV',
    brand: 'Tata',
    price: '10.99 – 15.49 L',
    range: '421 km',
    img: 'https://images.91wheels.com/assets/c_images/gallery/tata/punch-ev/tata-punch-ev-0-1742465124.png?w=640&q=75',
    badge: 'Most Affordable EV',
    variants: [
      { name: 'Smart (Medium Range)', price: '10.99 L', range: '315 km' },
      { name: 'Smart+ (Medium Range)', price: '11.99 L', range: '315 km' },
      { name: 'Adventure (Long Range)', price: '13.49 L', range: '421 km' },
      { name: 'Empowered (Long Range)', price: '14.49 L', range: '421 km' },
      { name: 'Empowered+ (Long Range)', price: '15.49 L', range: '421 km' },
    ],
  },
  'mahindra-be6': {
    name: 'Mahindra BE 6',
    brand: 'Mahindra',
    price: '18.90 – 26.90 L',
    range: '682 km',
    img: 'https://images.91wheels.com/assets/c_images/gallery/mahindra/be-6/mahindra-be-6-0-1737526827.png?w=640&q=75',
    badge: 'New Launch',
    variants: [
      { name: 'Pack One (59 kWh)', price: '18.90 L', range: '556 km' },
      { name: 'Pack Two (79 kWh)', price: '22.90 L', range: '682 km' },
      { name: 'Pack Three (79 kWh)', price: '26.90 L', range: '682 km' },
    ],
  },
  'hyundai-creta-ev': {
    name: 'Hyundai Creta EV',
    brand: 'Hyundai',
    price: '17.99 – 23.49 L',
    range: '473 km',
    img: 'https://images.91wheels.com/assets/c_images/gallery/hyundai/creta-electric/hyundai-creta-electric-4-1753777116.png?w=640&q=75',
    badge: 'V2L Support',
    variants: [
      { name: 'Executive (Long Range)', price: '17.99 L', range: '473 km' },
      { name: 'Smart (Long Range)', price: '19.49 L', range: '473 km' },
      { name: 'Smart+ (Long Range)', price: '20.99 L', range: '473 km' },
      { name: 'Excellence (Long Range)', price: '23.49 L', range: '473 km' },
    ],
  },
  'mg-windsor-ev': {
    name: 'MG Windsor EV',
    brand: 'MG',
    price: '13.50 – 17.50 L',
    range: '332 km',
    img: 'https://images.91wheels.com/assets/c_images/gallery/mg/windsor-ev/mg-windsor-ev-0-1724152302.png?w=640&q=75',
    badge: 'Battery Lease Option',
    variants: [
      { name: 'Excite Pro (38 kWh)', price: '13.50 L', range: '332 km' },
      { name: 'Essence Pro (38 kWh)', price: '15.00 L', range: '332 km' },
      { name: 'Exclusive Pro (38 kWh)', price: '17.50 L', range: '332 km' },
    ],
  },
  'byd-atto3': {
    name: 'BYD Atto 3',
    brand: 'BYD',
    price: '24.99 – 26.99 L',
    range: '521 km',
    img: 'https://images.91wheels.com/assets/c_images/gallery/byd/atto-3/byd-atto-3-1-1739342614.png?w=640&q=75',
    badge: 'Blade Battery',
    variants: [
      { name: 'Standard (60.48 kWh)', price: '24.99 L', range: '521 km' },
      { name: 'Extended (60.48 kWh)', price: '26.99 L', range: '521 km' },
    ],
  },
};

/* ─── EV Confirmation Receipt Card ──────────────────────────────────────── */
export function EVConfirmationCard({ bookingDetails, onScheduleAnother, onClose }) {
  const {
    name = 'Rahul Verma',
    vehicle = 'Tata Nexon EV',
    variant = 'Fearless+ (Long Range)',
    range = '465 km',
    date = '2026-08-20',
    timeSlot = 'Morning (10 AM - 1 PM)',
    phone = '09142231533',
  } = bookingDetails || {};

  const cleanPhone = phone.replace(/\D/g, '') || '09142231533';
  const fullPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone}` : phone;
  const bookingRef = `BW-EV-${Math.floor(100000 + Math.random() * 900000)}`;

  const whatsappMessage = encodeURIComponent(
    `Hi BuyWheels! My EV test drive request for ${vehicle} (${variant}) on ${date} (${timeSlot}) is registered under ${name}. Please connect me with the dealer.`
  );

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card relative overflow-hidden transition-all duration-300">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          title="Close"
        >
          ✕
        </button>
      )}

      {/* Green gradient header */}
      <div className="bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#14532d] px-6 pt-8 pb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        {/* EV Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 rounded-full mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span className="text-white/90 font-extrabold text-[10px] tracking-widest uppercase">BuyWheels EV</span>
        </div>
        {/* Check circle */}
        <div className="w-14 h-14 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="text-white font-extrabold text-xl tracking-tight mb-1">EV Test Drive Booked! ⚡</h3>
        <p className="text-white/80 text-xs">Your electric future starts here. We'll connect you soon.</p>
      </div>

      {/* Ticket notch */}
      <div className="relative -mt-3 flex justify-between px-3">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 shrink-0" />
        ))}
      </div>
      <div className="border-t-2 border-dashed border-green-200 mx-6 mb-5" />

      {/* Body */}
      <div className="px-6 pb-6">
        {/* Booking ref */}
        <div className="flex items-center justify-center mb-5">
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-center">
            <p className="text-[9px] font-bold text-green-700 uppercase tracking-widest mb-0.5">Booking Reference</p>
            <p className="text-sm font-extrabold text-dark tracking-widest">{bookingRef}</p>
          </div>
        </div>

        {/* Detail rows */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-5">
          {[
            { icon: '👤', label: 'Name', value: name },
            { icon: '⚡', label: 'EV Model', value: vehicle },
            { icon: '🔋', label: 'Variant', value: variant, highlight: true },
            { icon: '🛣️', label: 'Range', value: range },
            { icon: '📅', label: 'Date', value: date },
            { icon: '🕐', label: 'Time Slot', value: timeSlot },
            { icon: '📞', label: 'Contact', value: fullPhone },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
              <div className="flex items-center gap-2.5">
                <span className="text-sm">{row.icon}</span>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{row.label}</span>
              </div>
              {row.highlight ? (
                <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200/60 px-2 py-0.5 rounded-lg">{row.value}</span>
              ) : (
                <span className="text-xs font-bold text-dark text-right max-w-[55%]">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[11px] text-green-800 leading-relaxed">Our EV specialist will call <span className="font-bold">{fullPhone}</span> within <span className="font-bold">2 hours</span> to confirm your test drive slot.</p>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <a
            href={`https://wa.me/919142231533?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 no-underline"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.002 3.66 3.745-.983z" /></svg>
            WhatsApp
          </a>
          <a
            href={`tel:+91${cleanPhone}`}
            className="flex items-center justify-center gap-2 bg-[#1E1D1C] hover:bg-[#302F2E] text-white text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            Call Specialist
          </a>
        </div>
        <button
          onClick={onScheduleAnother || onClose}
          className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-green-600 border border-gray-200 hover:border-green-200 rounded-xl transition-all"
        >
          Schedule Another EV Drive
        </button>
      </div>
    </div>
  );
}

/* ─── EV Modal (Form + Confirmation) ────────────────────────────────────── */
export default function EVModal({
  isOpen,
  onClose,
  initialEVKey = 'tata-nexon-ev',
}) {
  const evList = Object.entries(EV_CATALOG);
  const [selectedKey, setSelectedKey] = useState(initialEVKey);
  const evData = EV_CATALOG[selectedKey] || EV_CATALOG['tata-nexon-ev'];

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (10 AM - 1 PM)',
  });
  const [phoneError, setPhoneError] = useState(false);

  if (!isOpen) return null;

  const selectedVariant = evData.variants[selectedVariantIdx];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    try {
      await saveBuyerEnquiry({
        owner_name: formData.name,
        vehicle_type: `${evData.name} (${selectedVariant?.name || 'EV'}) - EV Test Drive`,
        brand: evData.brand || 'EV',
        budget: 'EV Test Drive',
        city: 'Ranchi',
        phone: formData.phone,
        fuel: 'Electric',
        transmission: 'Automatic'
      });
    } catch (err) {
      console.warn('EV save notice:', err);
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', date: '', timeSlot: 'Morning (10 AM - 1 PM)' });
    setPhoneError(false);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl">
        {submitted ? (
          <EVConfirmationCard
            bookingDetails={{
              name: formData.name,
              vehicle: evData.name,
              variant: selectedVariant.name,
              range: selectedVariant.range,
              date: formData.date,
              timeSlot: formData.timeSlot,
              phone: formData.phone,
            }}
            onScheduleAnother={resetForm}
            onClose={onClose}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-border shadow-2xl relative overflow-hidden">
            {/* Green header strip */}
            <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <div className="text-white font-extrabold text-xs tracking-widest uppercase">BuyWheels EV</div>
                  <div className="text-white/70 text-[10px]">Book EV Test Drive — Free & Zero Commitment</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              {/* EV Model Selector */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Select EV Model
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {evList.map(([key, ev]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { setSelectedKey(key); setSelectedVariantIdx(0); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-left transition-all ${
                        selectedKey === key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                    >
                      <img
                        src={ev.img}
                        alt={ev.name}
                        className="w-10 h-7 object-contain rounded flex-shrink-0 bg-gray-50"
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="min-w-0">
                        <div className={`text-[11px] font-bold truncate ${selectedKey === key ? 'text-green-700' : 'text-gray-700'}`}>{ev.name}</div>
                        <div className="text-[10px] text-gray-400">🔋 {ev.range}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected EV Thumbnail + Details */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 mb-4 flex gap-3 items-center">
                <img
                  src={evData.img}
                  alt={evData.name}
                  className="w-24 h-16 object-contain rounded-xl bg-white p-1 shadow-sm flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    {evData.badge}
                  </div>
                  <div className="font-extrabold text-sm text-gray-900 truncate">{evData.name}</div>
                  <div className="text-xs text-green-700 font-bold">₹{evData.price}</div>
                  <div className="text-[11px] text-gray-500">🔋 Up to {evData.range} range</div>
                </div>
              </div>

              {/* Variant Selector */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Select Variant
                </label>
                <div className="space-y-1.5">
                  {evData.variants.map((v, idx) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 text-left transition-all ${
                        selectedVariantIdx === idx
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-100 bg-gray-50 hover:border-green-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedVariantIdx === idx ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                          {selectedVariantIdx === idx && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className={`text-xs font-semibold ${selectedVariantIdx === idx ? 'text-green-800' : 'text-gray-700'}`}>{v.name}</div>
                          <div className="text-[10px] text-gray-400">🔋 {v.range}</div>
                        </div>
                      </div>
                      <span className={`text-xs font-extrabold flex-shrink-0 ${selectedVariantIdx === idx ? 'text-green-700' : 'text-gray-500'}`}>₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Mobile Number</label>
                  <div className="flex gap-2">
                    <span className="px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 flex items-center flex-shrink-0">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => { setFormData((p) => ({ ...p, phone: e.target.value.replace(/\D/g, '') })); setPhoneError(false); }}
                      className={`flex-1 px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none ${phoneError ? 'border-red-400' : 'border-gray-200'}`}
                    />
                  </div>
                  {phoneError && <p className="text-[11px] text-red-500 mt-1">Please enter a valid 10-digit number.</p>}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Time Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData((p) => ({ ...p, timeSlot: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                    >
                      <option>Morning (10 AM - 1 PM)</option>
                      <option>Afternoon (1 PM - 4 PM)</option>
                      <option>Evening (4 PM - 7 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 mt-1 bg-gradient-to-r from-[#16a34a] to-[#15803d] hover:from-[#15803d] hover:to-[#14532d] text-white font-bold text-sm rounded-xl shadow-lg shadow-green-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Book EV Test Drive →
                </button>
                <p className="text-[10px] text-gray-400 text-center">100% free · Zero commitment · EV specialist callback</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
