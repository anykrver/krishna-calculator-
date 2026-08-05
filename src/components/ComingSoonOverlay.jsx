import React, { useEffect, useState, useMemo } from 'react';
import Logo from './Logo';
import { EnquiryConfirmationCard } from './TestDriveModal';

export default function ComingSoonOverlay({ isOpen, data: rawData, onClose, prefix = 'BW' }) {
  const [particles, setParticles] = useState([]);

  // Extract first object if data is an array
  const data = Array.isArray(rawData) ? rawData[0] : rawData;

  // Generate reference ID and timestamp on mount/data change
  const receiptMeta = useMemo(() => {
    if (!data) return null;
    const transactionId = data.id ? `${prefix}-${String(data.id).slice(0, 8).toUpperCase()}` : `${prefix}-${Math.floor(100000 + Math.random() * 900000)}-${Date.now().toString().slice(-4)}`;
    const savedAt = data.created_at ? new Date(data.created_at) : new Date();
    const dateTimeStr = savedAt.toLocaleDateString('en-IN', { dateStyle: 'medium' }) + ' ' + savedAt.toLocaleTimeString('en-IN', { timeStyle: 'short' });
    return { transactionId, dateTimeStr };
  }, [data, prefix]);

  // Generate particle metadata once on load
  useEffect(() => {
    if (!isOpen) return;
    const list = [];
    const count = 25;
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dx = (Math.random() - 0.5) * 200;
      const dy = Math.random() * 300 + 100;
      const dur = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      const maxOp = Math.random() * 0.5 + 0.1;
      const kfName = `cpf_${i}_${Date.now()}`;
      list.push({ id: i, size, left, top, dx, dy, dur, delay, maxOp, kfName });
    }
    setParticles(list);
  }, [isOpen]);

  if (!isOpen) return null;

  // Render receipt items
  const renderReceiptItems = () => {
    if (!data) return null;
    return Object.entries(data).map(([key, val]) => {
      if (!val) return null;
      if (['id', 'created_at', 'documents'].includes(key)) return null;
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return (
        <div key={key} className="receipt-item">
          <span className="receipt-item-label">
            {label}
          </span>
          <span className="receipt-item-value">
            {val}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="cs-overlay show">
      {/* Dynamic Keyframes and mobile responsive utility classes */}
      <style>
        {`
          .cs-overlay {
            overflow-y: auto !important;
            justify-content: flex-start !important;
            padding: 80px 24px 40px !important;
            -webkit-overflow-scrolling: touch;
          }
          @media (max-width: 480px) {
            .cs-overlay {
              padding: 70px 12px 24px !important;
            }
          }
          .cs-content {
            box-sizing: border-box;
            width: 100% !important;
            max-width: 600px !important;
            padding: 0 !important;
            margin-top: auto;
            margin-bottom: auto;
          }
          .receipt-card {
            background: rgba(30, 29, 28, 0.95);
            border: 2px solid #FF6A00;
            border-radius: 16px;
            padding: 28px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            position: relative;
            font-family: 'Nunito', sans-serif;
            width: 100%;
            box-sizing: border-box;
          }
          @media (max-width: 480px) {
            .receipt-card {
              padding: 20px 16px;
              border-radius: 12px;
            }
          }
          .receipt-header-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 1px;
            color: #fff;
            text-transform: uppercase;
          }
          @media (max-width: 480px) {
            .receipt-header-title {
              font-size: 16px;
              letter-spacing: 0.5px;
            }
          }
          .receipt-meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 24px;
            background: rgba(255, 255, 255, 0.03);
            padding: 14px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-sizing: border-box;
          }
          @media (max-width: 480px) {
            .receipt-meta-grid {
              grid-template-columns: 1fr;
              gap: 12px;
              padding: 12px;
            }
            .receipt-meta-grid > div {
              text-align: center !important;
            }
          }
          .receipt-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 16px;
            padding: 8px 0;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
          }
          .receipt-item-label {
            color: rgba(255,255,255,0.5);
            font-size: 13px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            flex-shrink: 0;
          }
          .receipt-item-value {
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            word-break: break-word;
          }
          @media (max-width: 480px) {
            .receipt-item {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
              padding: 10px 0;
            }
            .receipt-item-value {
              text-align: left;
              font-size: 13px;
            }
          }
          .receipt-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          .receipt-btn {
            flex: 1;
            min-width: 140px;
            height: 46px;
            font-family: 'Orbitron', sans-serif;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s;
            box-sizing: border-box;
          }
          .receipt-btn-primary {
            background: #FF6A00;
            border: none;
            color: #fff;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          }
          .receipt-btn-primary:hover {
            background: #e05c00;
          }
          .receipt-btn-secondary {
            background: transparent;
            border: 1.5px solid #FF6A00;
            color: #fff;
          }
          .receipt-btn-secondary:hover {
            background: rgba(255, 106, 0, 0.1);
          }
          @media (max-width: 480px) {
            .receipt-btn {
              font-size: 11px;
              letter-spacing: 1px;
              height: 42px;
            }
          }
        `}
        {particles.map((p) => `
          @keyframes ${p.kfName} {
            0% { opacity: 0; transform: translate(0,0); }
            10% { opacity: ${p.maxOp}; }
            90% { opacity: ${p.maxOp * 0.5}; }
            100% { opacity: 0; transform: translate(${p.dx}px, -${p.dy}px); }
          }
        `).join('\n')}
      </style>

      <div className="cs-bg-grid"></div>
      <div className="cs-bg-orb"></div>
      <div className="cs-bg-accent"></div>
      
      <div id="cs-particles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'var(--orange)',
              opacity: 0,
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `${p.kfName} ${p.dur}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="cs-corner tl"></div>
      <div className="cs-corner tr"></div>
      <div className="cs-corner bl"></div>
      <div className="cs-corner br"></div>

      <nav className="cs-nav">
        <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo height={34} mode="dark" />
        </a>
      </nav>

      <div className="cs-content" style={{ zIndex: 2 }}>
        <div id="receiptContainer" style={{ width: '100%', maxWidth: 460 }}>
          {receiptMeta && (
            <EnquiryConfirmationCard
              enquiryDetails={{
                name: data?.owner_name || data?.full_name || 'Rahul verma',
                vehicle: data?.model ? `${data?.brand || ''} ${data?.model}` : (data?.brand || data?.vehicle_type || 'Skoda Slavia'),
                variant: data?.variant || '1.0L TSI Style',
                budget: data?.budget || '₹10–15L',
                fuel: data?.fuel || 'Petrol',
                transmission: data?.transmission || 'Automatic',
                location: data?.city || 'Ranchi',
                phone: data?.phone || '09142231533',
                refId: receiptMeta.transactionId
              }}
              onSubmitAnother={onClose}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
