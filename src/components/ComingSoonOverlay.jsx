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
            background: #ffffff !important;
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
            animation: popIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.93) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .cs-bg-grid {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(rgba(248, 118, 41, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(248, 118, 41, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridShift 25s linear infinite;
            pointer-events: none;
          }
          @keyframes gridShift {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }
          .cs-bg-orb {
            position: absolute;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(248, 118, 41, 0.08) 0%, rgba(255, 106, 0, 0.02) 50%, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: orbPulse 8s ease-in-out infinite;
            pointer-events: none;
          }
          @keyframes orbPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
          }
          .cs-nav {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: #ffffff !important;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            align-items: center;
            padding: 0 24px;
            z-index: 10;
          }
          .cs-corner {
            display: none !important;
          }
        `}
        {particles.map((p) => `
          @keyframes ${p.kfName} {
            0% { opacity: 0; transform: translate(0,0) scale(0.8); }
            10% { opacity: ${p.maxOp}; }
            90% { opacity: ${p.maxOp * 0.5}; }
            100% { opacity: 0; transform: translate(${p.dx}px, -${p.dy}px) scale(1.2); }
          }
        `).join('\n')}
      </style>

      <div className="cs-bg-grid"></div>
      <div className="cs-bg-orb"></div>
      
      <div id="cs-particles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6A00, #FFA500)',
              boxShadow: '0 0 8px rgba(255, 106, 0, 0.4)',
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

      <nav className="cs-nav">
        <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo height={42} mode="light" />
        </a>
      </nav>

      <div className="cs-content" style={{ zIndex: 2 }}>
        <div id="receiptContainer" style={{ width: '100%', maxWidth: 460 }}>
          {receiptMeta && (
            <EnquiryConfirmationCard
              enquiryDetails={{
                name: data?.owner_name || data?.full_name || (data?.first_name ? `${data.first_name} ${data.last_name || ''}` : 'Rahul verma'),
                vehicle: data?.segment || 'All Segments',
                variant: data?.experience || 'Sales Professional',
                fuel: data?.city || 'Ranchi',
                transmission: data?.email || 'No Email',
                phone: data?.phone || '09142231533',
                refId: receiptMeta.transactionId,
                isAgent: prefix === 'BW-A'
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
