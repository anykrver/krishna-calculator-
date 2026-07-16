import React, { useEffect, useState, useMemo } from 'react';
import Logo from './Logo';

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
        <div id="receiptContainer" style={{ width: '100%' }}>
          {receiptMeta && (
            <div className="receipt-card">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #FF6A00, #e05c00)', borderRadius: '14px 14px 0 0' }}></div>
              
              <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="receipt-header-title">
                    {prefix === 'BW' ? 'Submission Receipt' : prefix === 'BW-D' ? 'Dealer Confirmation' : 'Agent Confirmation'}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#FF6A00', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Verified &amp; Stored in Supabase</p>
              </div>

              <div className="receipt-meta-grid">
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reference ID</span>
                  <strong style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace', wordBreak: 'break-all' }}>{receiptMeta.transactionId}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timestamp</span>
                  <strong style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace', wordBreak: 'break-all' }}>{receiptMeta.dateTimeStr}</strong>
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                  Details Summary
                </h4>
                {renderReceiptItems()}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '28px', opacity: 0.65 }}>
                <svg width="200" height="40" viewBox="0 0 100 20" preserveAspectRatio="none" style={{ maxWidth: '100%' }}>
                  <g fill="#ffffff">
                    <rect x="0" width="1" height="20" /><rect x="2" width="2" height="20" /><rect x="5" width="1" height="20" /><rect x="7" width="3" height="20" /><rect x="11" width="1" height="20" /><rect x="13" width="1" height="20" /><rect x="15" width="2" height="20" /><rect x="18" width="4" height="20" /><rect x="23" width="1" height="20" /><rect x="25" width="2" height="20" /><rect x="28" width="1" height="20" /><rect x="30" width="3" height="20" /><rect x="34" width="2" height="20" /><rect x="37" width="1" height="20" /><rect x="39" width="1" height="20" /><rect x="41" width="4" height="20" /><rect x="46" width="1" height="20" /><rect x="48" width="2" height="20" /><rect x="51" width="2" height="20" /><rect x="54" width="1" height="20" /><rect x="56" width="3" height="20" /><rect x="60" width="1" height="20" /><rect x="62" width="1" height="20" /><rect x="64" width="4" height="20" /><rect x="69" width="2" height="20" /><rect x="72" width="1" height="20" /><rect x="74" width="2" height="20" /><rect x="77" width="3" height="20" /><rect x="81" width="1" height="20" /><rect x="83" width="1" height="20" /><rect x="85" width="4" height="20" /><rect x="90" width="2" height="20" /><rect x="93" width="1" height="20" /><rect x="95" width="2" height="20" /><rect x="98" width="2" height="20" />
                  </g>
                </svg>
                <span style={{ display: 'block', fontSize: '8px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginTop: '4px' }}>SECURE DIGITAL TRANSMISSION</span>
              </div>

              <div className="receipt-actions">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="receipt-btn receipt-btn-secondary"
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="receipt-btn receipt-btn-primary"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
