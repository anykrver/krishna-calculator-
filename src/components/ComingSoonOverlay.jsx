import React, { useEffect, useState, useMemo } from 'react';
import Logo from './Logo';

export default function ComingSoonOverlay({ isOpen, data, onClose, prefix = 'BW' }) {
  const [particles, setParticles] = useState([]);

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
        <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {label}
          </span>
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600', textAlign: 'right' }}>
            {val}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="cs-overlay show">
      {/* Dynamic Keyframes injected for particles */}
      <style>
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

      <div className="cs-content" style={{ maxWidth: '600px', width: '100%', zIndex: 2 }}>
        <div id="receiptContainer" style={{ width: '100%' }}>
          {receiptMeta && (
            <div style={{ background: 'rgba(30, 29, 28, 0.95)', border: '2px solid #FF6A00', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative', fontFamily: "'Nunito', sans-serif" }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #FF6A00, #e05c00)', borderRadius: '14px 14px 0 0' }}></div>
              
              <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '800', letterSpacing: '1px', color: '#fff', textTransform: 'uppercase' }}>
                    {prefix === 'BW' ? 'Submission Receipt' : prefix === 'BW-D' ? 'Dealer Confirmation' : 'Agent Confirmation'}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: '#FF6A00', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Verified &amp; Stored in Supabase</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reference ID</span>
                  <strong style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace' }}>{receiptMeta.transactionId}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timestamp</span>
                  <strong style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace' }}>{receiptMeta.dateTimeStr}</strong>
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                  Details Summary
                </h4>
                {renderReceiptItems()}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '28px', opacity: 0.65 }}>
                <svg width="200" height="40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <g fill="#ffffff">
                    <rect x="0" width="1" height="20" /><rect x="2" width="2" height="20" /><rect x="5" width="1" height="20" /><rect x="7" width="3" height="20" /><rect x="11" width="1" height="20" /><rect x="13" width="1" height="20" /><rect x="15" width="2" height="20" /><rect x="18" width="4" height="20" /><rect x="23" width="1" height="20" /><rect x="25" width="2" height="20" /><rect x="28" width="1" height="20" /><rect x="30" width="3" height="20" /><rect x="34" width="2" height="20" /><rect x="37" width="1" height="20" /><rect x="39" width="1" height="20" /><rect x="41" width="4" height="20" /><rect x="46" width="1" height="20" /><rect x="48" width="2" height="20" /><rect x="51" width="2" height="20" /><rect x="54" width="1" height="20" /><rect x="56" width="3" height="20" /><rect x="60" width="1" height="20" /><rect x="62" width="1" height="20" /><rect x="64" width="4" height="20" /><rect x="69" width="2" height="20" /><rect x="72" width="1" height="20" /><rect x="74" width="2" height="20" /><rect x="77" width="3" height="20" /><rect x="81" width="1" height="20" /><rect x="83" width="1" height="20" /><rect x="85" width="4" height="20" /><rect x="90" width="2" height="20" /><rect x="93" width="1" height="20" /><rect x="95" width="2" height="20" /><rect x="98" width="2" height="20" />
                  </g>
                </svg>
                <span style={{ display: 'block', fontSize: '8px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginTop: '4px' }}>SECURE DIGITAL TRANSMISSION</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    height: '46px',
                    background: 'transparent',
                    border: '1.5px solid #FF6A00',
                    color: '#fff',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    height: '46px',
                    background: '#FF6A00',
                    border: 'none',
                    color: '#fff',
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
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
