import React, { useState } from 'react';
import { saveBuyerEnquiry } from '../lib/supabase';
import Logo from './Logo';

export function TestDriveConfirmationCard({ bookingDetails, onScheduleAnother, onClose }) {
  const {
    name = 'Rahul verma',
    vehicle = 'Skoda Slavia',
    variant = '1.0L TSI Style',
    date = '2026-08-20',
    timeSlot = 'Morning (10 AM - 1 PM)',
    location = 'Ranchi',
    phone = '09142231533'
  } = bookingDetails || {};

  const cleanPhone = phone.replace(/\D/g, '') || '09142231533';
  const fullPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone}` : phone;

  const whatsappMessage = encodeURIComponent(
    `Hi BuyWheels! My test drive request for ${vehicle} (${variant}) on ${date} (${timeSlot}) in ${location} is registered under ${name}. Please connect me with the dealer.`
  );

  const bookingRef = `BW-TD-${Math.floor(100000 + Math.random() * 900000)}`;

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

      {/* Orange gradient header */}
      <div className="bg-gradient-to-br from-[#FF6A00] via-[#ff5500] to-[#e03d00] px-6 pt-8 pb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize:'30px 30px'}} />
        <div className="mb-4 flex justify-center">
          <Logo height={44} mode="dark" />
        </div>
        <div className="w-14 h-14 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="text-white font-extrabold text-xl tracking-tight mb-1">Test Drive Booked!</h3>
        <p className="text-white/80 text-xs">Your request is confirmed. We'll connect you soon.</p>
      </div>

      {/* Ticket notch edge */}
      <div className="relative -mt-3 flex justify-between px-3">
        {Array.from({length: 16}).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 shrink-0" />
        ))}
      </div>
      <div className="border-t-2 border-dashed border-orange-200 mx-6 mb-5" />

      {/* Booking details body */}
      <div className="px-6 pb-6">
        {/* Booking ref badge */}
        <div className="flex items-center justify-center mb-5">
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 text-center">
            <p className="text-[9px] font-bold text-[#FF6A00] uppercase tracking-widest mb-0.5">Booking Reference</p>
            <p className="text-sm font-extrabold text-dark tracking-widest">{bookingRef}</p>
          </div>
        </div>

        {/* Detail rows */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-5">
          {[
            { icon: '👤', label: 'Name', value: name },
            { icon: '🚗', label: 'Vehicle', value: vehicle },
            { icon: '⚙️', label: 'Variant', value: variant, highlight: true },
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
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">{row.value}</span>
              ) : (
                <span className="text-xs font-bold text-dark text-right max-w-[55%]">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[11px] text-orange-800 leading-relaxed">A showroom rep will call <span className="font-bold">{fullPhone}</span> within <span className="font-bold">2 hours</span> to confirm your slot.</p>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <a
            href={`https://wa.me/917903611997?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 no-underline"
            style={{ whiteSpace: 'nowrap' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.002 3.66 3.745-.983z" /></svg>
            WhatsApp
          </a>
          <a
            href="tel:+917903611997"
            className="flex items-center justify-center gap-2 bg-[#1E1D1C] hover:bg-[#302F2E] text-white text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 no-underline"
            style={{ whiteSpace: 'nowrap' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            Call BuyWheels
          </a>
        </div>
        <button
          onClick={onScheduleAnother || onClose}
          className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-[#FF6A00] border border-gray-200 hover:border-orange-200 rounded-xl transition-all"
        >
          Schedule Another Test Drive
        </button>
      </div>
    </div>
  );
}

export default function TestDriveModal({
  isOpen,
  onClose,
  initialVehicle = 'Skoda Slavia',
  initialVariant = '1.0L TSI Style',
  variantsList = ['1.0L TSI Active', '1.0L TSI Ambition', '1.0L TSI Style', '1.5L TSI Monte Carlo'],
  initialLocation = 'Ranchi'
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Rahul verma',
    phone: '09142231533',
    vehicle: initialVehicle,
    variant: initialVariant,
    date: '2026-08-20',
    timeSlot: 'Morning (10 AM - 1 PM)',
    location: initialLocation
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveBuyerEnquiry({
        owner_name: formData.name,
        vehicle_type: `${formData.vehicle} (${formData.variant}) - Test Drive`,
        brand: formData.vehicle.split(' ')[0] || 'General',
        model: formData.vehicle.split(' ').slice(1).join(' ') || formData.vehicle,
        variant: formData.variant,
        budget: 'Test Drive Request',
        city: formData.location || 'Ranchi',
        phone: formData.phone,
        fuel: 'Petrol/Diesel',
        transmission: 'Standard'
      });
    } catch (err) {
      console.error('Test drive Supabase error:', err);
      alert(`Could not save your test drive request. Please try again.\n${err.message || ''}`);
      return;
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
        {submitted ? (
          <TestDriveConfirmationCard
            bookingDetails={formData}
            onScheduleAnother={resetForm}
            onClose={onClose}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-border shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>

            <div className="mb-6 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF6A00] bg-orange-50 px-3 py-1 rounded-full border border-orange-200/50">
                BuyWheels Doorstep &amp; Showroom
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-dark mt-2 mb-1">
                Book a Test Drive
              </h3>
              <p className="text-xs text-muted">
                Experience {formData.vehicle} in person. Free doorstep options available.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm font-semibold text-gray-600 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9142231533"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))
                    }
                    className="flex-1 px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none"
                  />
                </div>
              </div>

              {/* Vehicle & Variant selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.vehicle}
                    onChange={(e) => setFormData((p) => ({ ...p, vehicle: e.target.value }))}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Variant
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variantsList.map((v) => {
                      const isSelected = formData.variant === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, variant: v }))}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-semibold shadow-sm'
                              : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Time Slot
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Morning (10 AM - 1 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (4 PM - 7 PM)'].map((slot) => {
                      const isSelected = formData.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, timeSlot: slot }))}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#FF6A00] bg-[#FF6A00] text-white font-semibold shadow-sm'
                              : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/5 hover:text-[#FF6A00]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>



              <button
                type="submit"
                className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-[#FF6A00] to-[#ff4500] hover:from-[#e05c00] hover:to-[#e03d00] text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 active:scale-98"
              >
                Confirm Test Drive Request →
              </button>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function EnquiryConfirmationCard({ enquiryDetails, onSubmitAnother, onClose }) {
  const {
    name = 'Rahul verma',
    vehicle = 'Skoda Slavia',
    variant = '1.0L TSI Style',
    budget = '₹10–15L',
    fuel = 'Petrol',
    transmission = 'Automatic',
    location = 'Ranchi',
    phone = '09142231533',
    refId = `BW-ENQ-${Math.floor(100000 + Math.random() * 900000)}`
  } = enquiryDetails || {};

  const cleanPhone = phone.replace(/\D/g, '') || '09142231533';
  const fullPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone}` : phone;

  const whatsappMessage = encodeURIComponent(
    `Hi BuyWheels! I submitted a price enquiry for ${vehicle} (${variant}) in ${location} under ${name} (Ref: ${refId}). Please connect me with verified dealers!`
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

      {/* Orange gradient header */}
      <div className="bg-gradient-to-br from-[#FF6A00] via-[#ff5500] to-[#e03d00] px-6 pt-8 pb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize:'30px 30px'}} />
        <div className="mb-4 flex justify-center">
          <Logo height={44} mode="dark" />
        </div>
        <div className="w-14 h-14 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="text-white font-extrabold text-xl tracking-tight mb-1">Enquiry Registered!</h3>
        <p className="text-white/80 text-xs">Dealers will contact you with exclusive pricing soon.</p>
      </div>

      {/* Ticket notch edge */}
      <div className="relative -mt-3 flex justify-between px-3">
        {Array.from({length: 16}).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 shrink-0" />
        ))}
      </div>
      <div className="border-t-2 border-dashed border-orange-200 mx-6 mb-5" />

      {/* Body */}
      <div className="px-6 pb-6">
        {/* Ref ID badge */}
        <div className="flex items-center justify-center mb-5">
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 text-center">
            <p className="text-[9px] font-bold text-[#FF6A00] uppercase tracking-widest mb-0.5">Reference ID</p>
            <p className="text-sm font-extrabold text-dark tracking-widest">{refId}</p>
          </div>
        </div>

        {/* Detail rows */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-5">
          {[
            { icon: '👤', label: 'Name', value: name },
            { icon: '🚗', label: 'Vehicle', value: vehicle },
            { icon: '⚙️', label: 'Variant', value: variant, highlight: true },
            { icon: '⛽', label: 'Fuel & Trans', value: `${fuel} • ${transmission}` },
            { icon: '📞', label: 'Contact', value: fullPhone },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
              <div className="flex items-center gap-2.5">
                <span className="text-sm">{row.icon}</span>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{row.label}</span>
              </div>
              {row.highlight ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-lg">{row.value}</span>
              ) : (
                <span className="text-xs font-bold text-dark text-right max-w-[55%]">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[11px] text-orange-800 leading-relaxed">Verified BuyWheels dealers will call <span className="font-bold">{fullPhone}</span> within <span className="font-bold">2 hours</span> with exclusive pricing & offers.</p>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <a
            href={`https://wa.me/917903611997?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 no-underline"
            style={{ whiteSpace: 'nowrap' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.002 3.66 3.745-.983z" /></svg>
            WhatsApp
          </a>
          <a
            href="tel:+917903611997"
            className="flex items-center justify-center gap-2 bg-[#1E1D1C] hover:bg-[#302F2E] text-white text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 no-underline"
            style={{ whiteSpace: 'nowrap' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            Call BuyWheels
          </a>
        </div>
        <button
          onClick={onSubmitAnother || onClose}
          className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-[#FF6A00] border border-gray-200 hover:border-orange-200 rounded-xl transition-all"
        >
          Submit Another Enquiry
        </button>
      </div>
    </div>
  );
}

