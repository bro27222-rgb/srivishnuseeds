import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateLabelsPDF } from '../utils/pdfGenerator';
import SVSBatchHistory from './SVSBatchHistory';
import logo from '../assets/logo.png';

// ── Sri Vishnu Seeds facility addresses ──
const addressOption1 = `M/s Sri Vishnu Seeds Pvt. Ltd.\n2/4/1247/4/3/A/A/1, Tulasi Road\nVajpayee Colony, Hanamkonda\nWarangal District — 506 001\nTelangana, India`;

const addressOption2 = `M/s Sri Vishnu Seeds Pvt. Ltd.\nC/o Parameshwara Seeds\n1-91, KC Camp Road, Ippala Narsingapur\nHuzurabad (V & M)\nKarimnagar District — 505 468\nTelangana, India`;

export default function SVSAdminDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '', variety: '', packedLotNumber: '',
    dateOfTesting: '', packagingDate: '', dateOfExpiry: '',
    mrp: '', totalWeight: '', netQty: '', unitSalePrice: '',
    packedAt: addressOption1,
    plantAddress: addressOption1,
    producedBy: 'SRI VISHNU SEEDS PVT. LTD.',
    quantity: 10
  });

  const [loading, setLoading] = useState(false);

  // Auto-calculate unit price & bag quantity
  useEffect(() => {
    const mrpVal = parseFloat(String(formData.mrp).replace(/[^0-9.]/g, ''));
    const netQtyVal = parseFloat(String(formData.netQty).replace(/[^0-9.]/g, ''));
    const totalWeightVal = parseFloat(String(formData.totalWeight).replace(/[^0-9.]/g, ''));

    let updates = {};

    if (!isNaN(mrpVal) && !isNaN(netQtyVal) && netQtyVal > 0) {
      const calculated = `Rs ${(mrpVal / netQtyVal).toFixed(2)} / Kg`;
      if (formData.unitSalePrice !== calculated) updates.unitSalePrice = calculated;
    }

    if (!isNaN(totalWeightVal) && !isNaN(netQtyVal) && netQtyVal > 0) {
      const bags = Math.ceil(totalWeightVal / netQtyVal).toString();
      if (String(formData.quantity) !== bags) updates.quantity = bags;
    }

    if (Object.keys(updates).length > 0) setFormData(prev => ({ ...prev, ...updates }));
  }, [formData.mrp, formData.netQty, formData.totalWeight]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogout = () => {
    localStorage.removeItem('svs_isAdmin');
    navigate('/admin/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    // Update this leaflet URL to your Sri Vishnu Seeds PDF on Cloudinary
    data.append('leaflet', 'https://res.cloudinary.com/dd183sn87/image/upload/v1781378510/srivishnuSeedslogo_mhhnym.jpg');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/generate`, data);
      await generateLabelsPDF(response.data.labelNumbers);
      alert("Batch created successfully!");
      window.location.reload();
    } catch (err) {
      alert("Error generating batch. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --svs-ink:         #111d14;
          --svs-forest:      #1d4528;
          --svs-leaf:        #1bba6b;
          --svs-leaf-lt:     #34d884;
          --svs-sand:        #f0be3d;
          --svs-surface:     #f2f6f3;
          --svs-white:       #ffffff;
          --svs-border:      #d4e0d8;
          --svs-border-dk:   #c0d0c5;
          --svs-text:        #111d14;
          --svs-text-mid:    #3d5245;
          --svs-text-muted:  #7a9180;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .svsd-root {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          background: var(--svs-surface);
          min-height: 100vh;
          padding-bottom: 80px;
          -webkit-font-smoothing: antialiased;
        }

        /* ════════════════════════════════
           NAVBAR
        ════════════════════════════════ */
        .svsd-navbar {
          background: var(--svs-ink);
          position: sticky;
          top: 0;
          z-index: 200;
          box-shadow: 0 1px 0 rgba(27,186,107,0.15), 0 4px 24px rgba(0,0,0,0.35);
        }

        /* Leaf-green accent stripe */
        .svsd-navbar-stripe {
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--svs-leaf) 30%, var(--svs-leaf-lt) 50%, var(--svs-leaf) 70%, transparent 100%);
        }

        /* Field-row scan lines on navbar — signature element */
        .svsd-navbar-inner-wrap {
          position: relative;
          overflow: hidden;
        }
        .svsd-navbar-inner-wrap::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 14px,
            rgba(27,186,107,0.04) 14px, rgba(27,186,107,0.04) 15px
          );
          pointer-events: none;
        }

        .svsd-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          height: 68px;
          position: relative; z-index: 1;
        }

        .svsd-nav-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .svsd-nav-logo-ring {
          width: 40px; height: 40px;
          border-radius: 8px;
          background: rgba(27,186,107,0.10);
          border: 1px solid rgba(27,186,107,0.28);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 6px;
          flex-shrink: 0;
        }
        .svsd-nav-logo-ring img { width: 100%; height: 100%; object-fit: contain; filter: brightness(1.1); }

        .svsd-nav-text {}
        .svsd-nav-name {
          font-family: 'DM Serif Display', serif;
          font-size: 15px; font-weight: 400;
          color: #fff;
          letter-spacing: -0.2px;
          line-height: 1.2;
        }
        .svsd-nav-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500;
          letter-spacing: 1px; text-transform: uppercase;
          color: rgba(27,186,107,0.65);
          margin-top: 2px;
        }

        .svsd-nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .svsd-nav-indicator {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          background: rgba(27,186,107,0.10);
          border: 1px solid rgba(27,186,107,0.24);
          border-radius: 4px;
        }
        .svsd-nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--svs-leaf);
          box-shadow: 0 0 8px rgba(27,186,107,0.70);
          animation: svsNavPulse 2.2s ease-in-out infinite;
        }
        @keyframes svsNavPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .svsd-nav-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.5px; text-transform: uppercase;
          color: var(--svs-leaf);
        }

        .svsd-logout-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.65);
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.3px;
          transition: all 0.18s ease;
        }
        .svsd-logout-btn svg { width: 13px; height: 13px; }
        .svsd-logout-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.28);
          color: #fff;
        }

        /* ════════════════════════════════
           PAGE HEADER / HERO
        ════════════════════════════════ */
        .svsd-page-header {
          background: var(--svs-white);
          border-bottom: 1px solid var(--svs-border);
          padding: 48px 32px 44px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        /* Dot-grid background on page header */
        .svsd-page-header::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(17,29,20,0.055) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }
        /* Leaf-glow bloom at the bottom center */
        .svsd-page-header::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 50%; transform: translateX(-50%);
          width: 480px; height: 160px;
          background: radial-gradient(ellipse, rgba(27,186,107,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        .svsd-header-content { position: relative; z-index: 1; }

        .svsd-header-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          padding: 5px 13px;
          background: rgba(27,186,107,0.07);
          border: 1px solid rgba(27,186,107,0.20);
          border-radius: 4px;
        }
        .svsd-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--svs-leaf);
          box-shadow: 0 0 5px rgba(27,186,107,0.6);
        }
        .svsd-eyebrow-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--svs-leaf);
        }

        .svsd-header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 42px; font-weight: 400;
          color: var(--svs-ink);
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 12px;
        }
        .svsd-header-title em {
          font-style: italic;
          color: var(--svs-leaf);
        }
        .svsd-header-sub {
          font-family: 'Inter', sans-serif;
          font-size: 13px; color: var(--svs-text-muted);
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Minimal dot-rule divider */
        .svsd-header-rule {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 200px;
          margin: 22px auto 0;
        }
        .svsd-header-rule::before,
        .svsd-header-rule::after {
          content: '';
          flex: 1; height: 1px;
          background: var(--svs-border);
        }
        .svsd-rule-diamond {
          width: 6px; height: 6px;
          background: var(--svs-leaf);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(27,186,107,0.5);
        }

        /* ════════════════════════════════
           CONTAINER
        ════════════════════════════════ */
        .svsd-container {
          max-width: 1050px;
          margin: 0 auto;
          padding: 36px 28px 0;
        }

        /* ════════════════════════════════
           FORM CARD
        ════════════════════════════════ */
        .svsd-form-card {
          background: var(--svs-white);
          border-radius: 10px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 4px 6px rgba(17,29,20,0.04),
            0 16px 48px rgba(17,29,20,0.08);
          border: 1px solid var(--svs-border);
          overflow: hidden;
        }

        /* Leaf-green top stripe on the form card */
        .svsd-form-stripe {
          height: 3px;
          background: var(--svs-leaf);
        }

        /* ════════════════════════════════
           FORM GRID
        ════════════════════════════════ */
        .svsd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 720px) {
          .svsd-grid { grid-template-columns: 1fr; }
          .svsd-col:first-child { border-right: none; border-bottom: 1px solid var(--svs-border); }
          .svsd-header-title { font-size: 30px; }
          .svsd-nav-indicator { display: none; }
        }

        .svsd-col {
          padding: 32px 36px 28px;
        }
        .svsd-col:first-child {
          position: relative;
        }
        /* Gradient column divider */
        .svsd-col:first-child::after {
          content: '';
          position: absolute;
          top: 28px; right: 0; bottom: 28px;
          width: 1px;
          background: linear-gradient(180deg, transparent, var(--svs-border) 15%, var(--svs-border) 85%, transparent);
        }

        /* ════════════════════════════════
           SECTION HEADERS
        ════════════════════════════════ */
        .svsd-sec {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--svs-border);
        }
        .svsd-sec + .svsd-sec,
        .svsd-sec-gap {
          margin-top: 30px;
        }
        .svsd-sec-mark {
          width: 26px; height: 26px;
          border-radius: 6px;
          background: rgba(27,186,107,0.08);
          border: 1px solid rgba(27,186,107,0.20);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .svsd-sec-mark svg { width: 13px; height: 13px; color: var(--svs-leaf); }
        .svsd-sec-title {
          font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          color: var(--svs-text-muted);
        }

        /* ════════════════════════════════
           FIELDS + INPUTS
        ════════════════════════════════ */
        .svsd-field { margin-bottom: 18px; }
        .svsd-label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.5px; text-transform: uppercase;
          color: var(--svs-text-mid);
          margin-bottom: 7px;
        }
        .svsd-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid var(--svs-border-dk);
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 400;
          color: var(--svs-text);
          background: #f7faf8;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.15s;
          letter-spacing: 0px;
          -webkit-appearance: none;
          appearance: none;
        }
        .svsd-input:focus {
          border-color: var(--svs-leaf);
          box-shadow: 0 0 0 3px rgba(27,186,107,0.12);
          background: #fff;
        }
        .svsd-input::placeholder { color: #aabcb2; font-weight: 400; font-size: 13px; }
        .svsd-input[type="date"] { color: var(--svs-text); }

        /* Select wrapper + custom chevron */
        .svsd-select-wrap { position: relative; }
        .svsd-select-wrap::after {
          content: '';
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid var(--svs-text-muted);
          pointer-events: none;
        }

        /* Read-only address textarea */
        .svsd-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid var(--svs-border);
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; line-height: 1.7;
          color: var(--svs-text-muted);
          background: #f7faf8;
          resize: none;
          outline: none;
          cursor: not-allowed;
          letter-spacing: 0px;
        }

        .svsd-preview-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          color: rgba(122,145,128,0.60);
          margin-bottom: 5px;
          display: block;
        }

        /* ════════════════════════════════
           BOTTOM PANEL — ink dark, signature scan-line
        ════════════════════════════════ */
        .svsd-final-panel {
          border-top: 2px solid var(--svs-ink);
          background: var(--svs-ink);
          padding: 28px 36px 36px;
          position: relative;
          overflow: hidden;
        }
        /* Field-row scan lines — dark panel signature */
        .svsd-final-panel::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 28px,
            rgba(27,186,107,0.04) 28px, rgba(27,186,107,0.04) 29px
          );
          pointer-events: none;
        }
        /* Scoped label and input overrides for dark panel */
        .svsd-final-panel .svsd-label {
          color: rgba(255,255,255,0.45);
        }
        .svsd-final-panel .svsd-input {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
          color: #fff;
        }
        .svsd-final-panel .svsd-input:focus {
          border-color: var(--svs-leaf);
          background: rgba(255,255,255,0.09);
          box-shadow: 0 0 0 3px rgba(27,186,107,0.15);
        }
        .svsd-final-panel .svsd-input::placeholder { color: rgba(255,255,255,0.25); }

        .svsd-final-row {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        .svsd-final-qty { width: 180px; flex-shrink: 0; }

        /* Batch count display — terminal/monospace aesthetic */
        .svsd-qty-display {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: rgba(27,186,107,0.08);
          border: 1px solid rgba(27,186,107,0.22);
          border-radius: 6px;
          margin-top: 12px;
        }
        .svsd-qty-icon {
          width: 32px; height: 32px;
          border-radius: 5px;
          background: rgba(27,186,107,0.15);
          border: 1px solid rgba(27,186,107,0.28);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .svsd-qty-icon svg { width: 14px; height: 14px; color: var(--svs-leaf); }
        .svsd-qty-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 28px; font-weight: 600;
          color: var(--svs-leaf);
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .svsd-qty-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(27,186,107,0.55);
          margin-top: 3px;
        }

        /* ════════════════════════════════
           SUBMIT BUTTON
        ════════════════════════════════ */
        .svsd-submit-btn {
          width: 100%;
          padding: 18px 32px;
          background: var(--svs-leaf);
          color: #fff;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.8px; text-transform: uppercase;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.20),
            0 10px 30px rgba(27,186,107,0.35);
          transition: background 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;
          position: relative; overflow: hidden;
          z-index: 1;
        }
        .svsd-submit-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.07);
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .svsd-submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
          transition: left 0.5s ease;
        }
        .svsd-submit-btn:hover:not(:disabled)::after { left: 100%; }
        .svsd-submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .svsd-submit-btn:hover:not(:disabled) {
          background: #16a359;
          transform: translateY(-2px);
          box-shadow:
            0 6px 10px rgba(0,0,0,0.22),
            0 16px 44px rgba(27,186,107,0.44);
        }
        .svsd-submit-btn:active:not(:disabled) { transform: translateY(0); }
        .svsd-submit-btn:disabled { opacity: 0.60; cursor: not-allowed; }

        .svsd-spinner-row {
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .svsd-spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.28);
          border-top-color: #fff;
          border-radius: 50%;
          animation: svsSpinAnim 0.85s linear infinite;
          flex-shrink: 0;
        }
        @keyframes svsSpinAnim { to { transform: rotate(360deg); } }
      `}</style>

      <div className="svsd-root">

        {/* ── NAVBAR ── */}
        <nav className="svsd-navbar">
          <div className="svsd-navbar-stripe" />
          <div className="svsd-navbar-inner-wrap">
            <div className="svsd-nav-inner">
              <div className="svsd-nav-brand">
                <div className="svsd-nav-logo-ring">
                  <img src={logo} alt="Sri Vishnu Seeds" />
                </div>
                <div className="svsd-nav-text">
                  <div className="svsd-nav-name">SRI VISHNU SEEDS PVT. LTD.</div>
                  <div className="svsd-nav-tag">Batch Management Portal</div>
                </div>
              </div>
              <div className="svsd-nav-right">
                <div className="svsd-nav-indicator">
                  <div className="svsd-nav-dot" />
                  <span className="svsd-nav-status">Active</span>
                </div>
                <button onClick={handleLogout} className="svsd-logout-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* ── PAGE HEADER ── */}
        <div className="svsd-page-header">
          <div className="svsd-header-content">
            <div className="svsd-header-eyebrow">
              <div className="svsd-eyebrow-dot" />
              <span className="svsd-eyebrow-text">Admin Dashboard</span>
            </div>
            <h1 className="svsd-header-title">Generate <em>Batch Labels</em></h1>
            <p className="svsd-header-sub">Fill in product details below to generate QR-secured labels and batch records</p>
            <div className="svsd-header-rule">
              <div className="svsd-rule-diamond" />
            </div>
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="svsd-container">
          <form onSubmit={handleSubmit} className="svsd-form-card">
            <div className="svsd-form-stripe" />

            <div className="svsd-grid">

              {/* ── COLUMN 1 ── */}
              <div className="svsd-col">
                <div className="svsd-sec">
                  <div className="svsd-sec-mark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <span className="svsd-sec-title">Product Identification</span>
                </div>

                <div className="svsd-field">
                  <label className="svsd-label">Product Name</label>
                  <input className="svsd-input" name="productName" placeholder="e.g. Paddy" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Variety</label>
                  <input className="svsd-input" name="variety" placeholder="e.g. Moksha" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Packed Lot Number</label>
                  <input className="svsd-input" name="packedLotNumber" placeholder="Enter lot number" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Packed Lot Quantity (Kg)</label>
                  <input className="svsd-input" name="totalWeight" placeholder="e.g. 1000 Kg" value={formData.totalWeight} onChange={handleChange} />
                </div>

                <div className="svsd-sec svsd-sec-gap">
                  <div className="svsd-sec-mark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span className="svsd-sec-title">Batch Dates</span>
                </div>

                <div className="svsd-field">
                  <label className="svsd-label">Date of Testing</label>
                  <input className="svsd-input" type="date" name="dateOfTesting" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Packaging Date</label>
                  <input className="svsd-input" type="date" name="packagingDate" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Date of Expiry</label>
                  <input className="svsd-input" type="date" name="dateOfExpiry" onChange={handleChange} required />
                </div>
              </div>

              {/* ── COLUMN 2 ── */}
              <div className="svsd-col">
                <div className="svsd-sec">
                  <div className="svsd-sec-mark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span className="svsd-sec-title">Commercials</span>
                </div>

                <div className="svsd-field">
                  <label className="svsd-label">MRP</label>
                  <input className="svsd-input" name="mrp" placeholder="e.g. Rs 1620.00" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Net Quantity</label>
                  <input className="svsd-input" name="netQty" placeholder="e.g. 12 Kg" onChange={handleChange} required />
                </div>
                <div className="svsd-field">
                  <label className="svsd-label">Unit Sale Price</label>
                  <input className="svsd-input" name="unitSalePrice" placeholder="Auto-calculated" value={formData.unitSalePrice} onChange={handleChange} required />
                </div>

                <div className="svsd-sec svsd-sec-gap">
                  <div className="svsd-sec-mark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <span className="svsd-sec-title">Facility &amp; Logistics</span>
                </div>

                <div className="svsd-field">
                  <label className="svsd-label">Packed At</label>
                  <div className="svsd-select-wrap">
                    <select className="svsd-input" name="packedAt" value={formData.packedAt} onChange={handleChange} required style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      <option value={addressOption1}>Registered Office — Hanamkonda</option>
                      <option value={addressOption2}>Processing Unit — Huzurabad, Karimnagar</option>
                    </select>
                  </div>
                  <span className="svsd-preview-label">Address Preview</span>
                  <textarea className="svsd-textarea" style={{ height: '108px' }} value={formData.packedAt} readOnly />
                </div>

                <div className="svsd-field">
                  <label className="svsd-label">Plant Address</label>
                  <div className="svsd-select-wrap">
                    <select className="svsd-input" name="plantAddress" value={formData.plantAddress} onChange={handleChange} required style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      <option value={addressOption1}>Registered Office — Hanamkonda</option>
                      <option value={addressOption2}>Processing Unit — Huzurabad, Karimnagar</option>
                    </select>
                  </div>
                  <span className="svsd-preview-label">Full Address Preview</span>
                  <textarea className="svsd-textarea" style={{ height: '108px' }} value={formData.plantAddress} readOnly />
                </div>

                <div className="svsd-field">
                  <label className="svsd-label">Produced By</label>
                  <input className="svsd-input" name="producedBy" value={formData.producedBy} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* ── BOTTOM PANEL ── */}
            <div className="svsd-final-panel">
              <div className="svsd-final-row">
                <div className="svsd-final-qty">
                  <label className="svsd-label">Bags to Generate</label>
                  <input className="svsd-input" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                  <div className="svsd-qty-display">
                    <div className="svsd-qty-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      </svg>
                    </div>
                    <div>
                      <div className="svsd-qty-num">{formData.quantity}</div>
                      <div className="svsd-qty-label">Labels</div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="svsd-submit-btn">
                {loading ? (
                  <span className="svsd-spinner-row">
                    <div className="svsd-spinner" />
                    Processing Batch…
                  </span>
                ) : (
                  'Generate Labels & Secure Data'
                )}
              </button>
            </div>

          </form>
        </div>

        <SVSBatchHistory />
      </div>
    </>
  );
}