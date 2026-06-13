import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SVSVerifyProduct() {
  const { labelNumber } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/verify/${labelNumber}`)
      .then(res => setData(res.data))
      .catch(() => setError(true));
  }, [labelNumber]);

  const sharedStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0c1f0d; }
    .svsvp-state-root {
      min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: #0c1f0d;
      font-family: 'Lato', sans-serif;
      -webkit-font-smoothing: antialiased;
      padding: 32px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .svsvp-state-root::before {
      content: '';
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 70% 50% at 20% 20%, rgba(23,79,25,0.3) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 80% 80%, rgba(217,119,6,0.12) 0%, transparent 55%);
      pointer-events: none;
    }
    .svsvp-state-grid {
      position: absolute; inset: 0;
      background-image:
        repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px),
        repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px);
      pointer-events: none;
    }
    .svsvp-state-content { position: relative; z-index: 1; }
  `;

  // ── Error State ──
  if (error) return (
    <>
      <style>{`
        ${sharedStyles}
        .svsvp-err-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(145deg, #7f1d1d, #dc2626);
          border: 2px solid rgba(248,113,113,0.25);
          box-shadow: 0 0 0 8px rgba(220,38,38,0.08), 0 20px 48px rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px;
        }
        .svsvp-err-cross {
          width: 24px; height: 24px;
          position: relative;
        }
        .svsvp-err-cross::before,
        .svsvp-err-cross::after {
          content: '';
          position: absolute;
          width: 22px; height: 2.5px;
          background: #fff;
          border-radius: 2px;
          top: 50%; left: 50%;
        }
        .svsvp-err-cross::before { transform: translate(-50%,-50%) rotate(45deg); }
        .svsvp-err-cross::after { transform: translate(-50%,-50%) rotate(-45deg); }
        .svsvp-err-eyebrow {
          font-size: 9px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #f87171; margin-bottom: 10px;
        }
        .svsvp-err-title {
          font-family: 'Playfair Display', serif;
          font-size: 30px; font-weight: 700;
          color: #fff; margin-bottom: 14px;
          letter-spacing: -0.3px;
        }
        .svsvp-err-sub {
          font-size: 14px; color: rgba(255,255,255,0.4);
          max-width: 300px; line-height: 1.7;
          margin: 0 auto;
        }
        .svsvp-err-divider {
          width: 40px; height: 1px;
          background: rgba(248,113,113,0.35);
          margin: 20px auto 20px;
        }
        .svsvp-err-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
      `}</style>
      <div className="svsvp-state-root">
        <div className="svsvp-state-grid" />
        <div className="svsvp-state-content">
          <div className="svsvp-err-icon">
            <div className="svsvp-err-cross" />
          </div>
          <div className="svsvp-err-eyebrow">Verification Failed</div>
          <div className="svsvp-err-title">Invalid Product Code</div>
          <div className="svsvp-err-divider" />
          <div className="svsvp-err-sub">
            This QR code could not be verified. Please check the label and try again, or contact Sri Vishnu Seeds directly.
          </div>
          <div className="svsvp-err-divider" />
          <div className="svsvp-err-label">Sri Vishnu Seeds Pvt. Ltd.</div>
        </div>
      </div>
    </>
  );

  // ── Loading State ──
  if (!data) return (
    <>
      <style>{`
        ${sharedStyles}
        .svsvp-load-emblem {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(145deg, #174f19, #2d7d2d);
          border: 2px solid rgba(217,119,6,0.30);
          box-shadow:
            0 0 0 10px rgba(45,125,45,0.07),
            0 0 0 20px rgba(45,125,45,0.04),
            0 20px 56px rgba(0,0,0,0.40);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 32px;
          animation: svsvpPulse 2s ease-in-out infinite;
        }
        @keyframes svsvpPulse {
          0%, 100% { box-shadow: 0 0 0 10px rgba(45,125,45,0.07), 0 0 0 20px rgba(45,125,45,0.04), 0 20px 56px rgba(0,0,0,0.40); }
          50% { box-shadow: 0 0 0 14px rgba(45,125,45,0.10), 0 0 0 28px rgba(45,125,45,0.05), 0 24px 64px rgba(0,0,0,0.50); }
        }
        .svsvp-load-leaf {
          width: 32px; height: 32px;
          border: 2.5px solid rgba(255,255,255,0.6);
          border-top-color: #fff;
          border-radius: 50%;
          animation: svsvpSpin 1s linear infinite;
        }
        @keyframes svsvpSpin { to { transform: rotate(360deg); } }
        .svsvp-load-eyebrow {
          font-size: 9px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #d97706; margin-bottom: 10px;
        }
        .svsvp-load-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700;
          color: #fff; letter-spacing: -0.3px;
          margin-bottom: 6px;
        }
        .svsvp-load-sub {
          font-size: 12px; color: rgba(255,255,255,0.3);
          letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 28px;
        }
        .svsvp-load-bar {
          width: 180px; height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          margin: 0 auto;
          overflow: hidden;
        }
        .svsvp-load-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #174f19, #d97706, #174f19);
          background-size: 200% 100%;
          border-radius: 2px;
          animation: svsvpSlide 1.6s ease-in-out infinite;
        }
        @keyframes svsvpSlide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div className="svsvp-state-root">
        <div className="svsvp-state-grid" />
        <div className="svsvp-state-content">
          <div className="svsvp-load-emblem">
            <div className="svsvp-load-leaf" />
          </div>
          <div className="svsvp-load-eyebrow">Sri Vishnu Seeds Pvt. Ltd.</div>
          <div className="svsvp-load-title">Verifying Product</div>
          <div className="svsvp-load-sub">Please wait</div>
          <div className="svsvp-load-bar"><div className="svsvp-load-bar-fill" /></div>
        </div>
      </div>
    </>
  );

  // ── Verified State ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0c1f0d; }

        .svsvp-root {
          min-height: 100vh;
          background: #0c1f0d;
          font-family: 'Lato', sans-serif;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow-x: hidden;
        }

        /* Background atmosphere */
        .svsvp-bg {
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 15% 0%, rgba(23,79,25,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 100%, rgba(217,119,6,0.12) 0%, transparent 50%);
          pointer-events: none; z-index: 0;
        }
        .svsvp-bg-grid {
          position: fixed; inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 64px, rgba(255,255,255,0.012) 64px, rgba(255,255,255,0.012) 65px),
            repeating-linear-gradient(90deg, transparent, transparent 64px, rgba(255,255,255,0.012) 64px, rgba(255,255,255,0.012) 65px);
          pointer-events: none; z-index: 0;
        }

        .svsvp-page {
          position: relative; z-index: 1;
          padding: 28px 16px 64px;
          max-width: 520px;
          margin: 0 auto;
        }

        /* Main card */
        .svsvp-card {
          background: #fffdf9;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 2px 0 rgba(217,119,6,0.0),
            0 32px 80px rgba(0,0,0,0.55),
            0 8px 24px rgba(0,0,0,0.20);
        }

        /* Gold-to-forest top stripe */
        .svsvp-card-stripe {
          height: 4px;
          background: linear-gradient(90deg, #0b2d0e, #174f19, #d97706, #fbbf24, #d97706, #174f19, #0b2d0e);
        }

        /* HEADER */
        .svsvp-header {
          background: linear-gradient(160deg, #0b2d0e 0%, #174f19 55%, #1e6420 100%);
          padding: 32px 28px 28px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .svsvp-header::before {
          content: '';
          position: absolute;
          bottom: -40px; left: 50%;
          transform: translateX(-50%);
          width: 300px; height: 80px;
          background: rgba(217,119,6,0.06);
          border-radius: 50%;
          filter: blur(24px);
        }
        .svsvp-header-rings {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none; overflow: hidden;
        }
        .svsvp-hring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(217,119,6,0.10);
        }
        .svsvp-hring-1 { width: 160px; height: 160px; }
        .svsvp-hring-2 { width: 260px; height: 260px; border-color: rgba(217,119,6,0.06); }

        .svsvp-emblem {
          position: relative; z-index: 1;
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(145deg, #1e6b20, #2d7d2d);
          border: 2px solid rgba(217,119,6,0.40);
          box-shadow: 0 0 0 6px rgba(217,119,6,0.08), 0 12px 32px rgba(0,0,0,0.40);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .svsvp-emblem-inner {
          width: 28px; height: 28px;
          position: relative;
        }
        /* Custom SVG leaf mark */
        .svsvp-emblem svg { width: 28px; height: 28px; }

        .svsvp-brand {
          position: relative; z-index: 1;
          font-family: 'Cinzel', serif;
          font-size: 16px; font-weight: 700;
          color: #fff; letter-spacing: 1.5px;
          margin-bottom: 3px;
        }
        .svsvp-pvt {
          font-size: 9px; font-weight: 600;
          letter-spacing: 4px; text-transform: uppercase;
          color: #d97706; margin-bottom: 20px;
        }

        /* Verified badge */
        .svsvp-badge {
          position: relative; z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(45,125,45,0.18);
          border: 1px solid rgba(110,231,183,0.30);
          border-radius: 32px;
        }
        .svsvp-badge-check {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(34,197,94,0.35);
        }
        .svsvp-badge-check svg { width: 10px; height: 10px; color: #fff; }
        .svsvp-badge-text {
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #86efac;
        }

        /* Section divider */
        .svsvp-section-divider {
          display: flex;
          align-items: center;
          gap: 0;
          background: linear-gradient(90deg, #f0ebe0, #e8dfc8);
          padding: 8px 20px;
          border-bottom: 1px solid #ede8de;
        }
        .svsvp-section-label {
          font-size: 8px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #9aab9a;
        }
        .svsvp-section-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, #ddd5c0, transparent);
          margin-left: 12px;
        }

        /* Data rows */
        .svsvp-rows {}
        .svsvp-row {
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid #f0ebe0;
          transition: background 0.12s;
        }
        .svsvp-row:last-child { border-bottom: none; }
        .svsvp-row:hover { background: #faf7f0; }

        .svsvp-lbl {
          width: 38%;
          flex-shrink: 0;
          padding: 12px 16px;
          background: #f7f4ee;
          border-right: 1px solid #ede8de;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.8px; text-transform: uppercase;
          color: #9aab9a;
          display: flex; align-items: center;
          line-height: 1.4;
        }
        .svsvp-val {
          flex: 1;
          padding: 12px 16px;
          font-size: 13px; font-weight: 500;
          color: #1a1a1a;
          line-height: 1.55;
          display: flex; align-items: center;
        }
        .svsvp-val.bold {
          font-family: 'Playfair Display', serif;
          font-weight: 700; color: #0b2d0e;
          font-size: 14px;
        }
        .svsvp-val.highlight {
          color: #174f19;
          font-weight: 700;
        }

        /* PDF button area */
        .svsvp-pdf-area {
          padding: 20px 20px 24px;
          background: linear-gradient(160deg, #0b2d0e 0%, #174f19 100%);
          position: relative;
          overflow: hidden;
        }
        .svsvp-pdf-area::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px);
          pointer-events: none;
        }
        .svsvp-pdf-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
          position: relative; z-index: 1;
        }
        .svsvp-pdf-btn {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 14px 20px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(217,119,6,0.40);
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-family: 'Cinzel', serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .svsvp-pdf-btn:hover {
          background: rgba(217,119,6,0.18);
          border-color: rgba(217,119,6,0.70);
          transform: translateY(-1px);
        }
        .svsvp-pdf-icon {
          width: 32px; height: 32px;
          border-radius: 6px;
          background: rgba(217,119,6,0.20);
          border: 1px solid rgba(217,119,6,0.35);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .svsvp-pdf-icon svg { width: 14px; height: 14px; color: #d97706; }

        /* Footer */
        .svsvp-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="svsvp-root">
        <div className="svsvp-bg" />
        <div className="svsvp-bg-grid" />

        <div className="svsvp-page">
          <div className="svsvp-card">
            <div className="svsvp-card-stripe" />

            {/* HEADER */}
            <div className="svsvp-header">
              <div className="svsvp-header-rings">
                <div className="svsvp-hring svsvp-hring-1" />
                <div className="svsvp-hring svsvp-hring-2" />
              </div>

              <div className="svsvp-emblem">
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 4C14 4 8 8 8 16C8 20 10.5 23 14 24C17.5 23 20 20 20 16C20 8 14 4 14 4Z" fill="rgba(255,255,255,0.85)"/>
                  <path d="M14 24V12M10 14C10 14 12 16 14 16C16 16 18 14 18 14" stroke="#174f19" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="svsvp-brand">SRI VISHNU SEEDS</div>
              <div className="svsvp-pvt">Pvt. Ltd.</div>
              <div className="svsvp-badge">
                <div className="svsvp-badge-check">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3"/>
                  </svg>
                </div>
                <div className="svsvp-badge-text">Genuine Product Verified</div>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="svsvp-section-divider">
              <span className="svsvp-section-label">Product Details</span>
              <div className="svsvp-section-line" />
            </div>

            <div className="svsvp-rows">
              <Row label="Label Number"      value={data.labelNumber}               bold />
              <Row label="Crop Name"         value={data.cropName}                  bold />
              <Row label="Packed Variety"    value={data.packedVariety} />
              <Row label="Lot Number"        value={data.packedLotNumber} />
            </div>

            <div className="svsvp-section-divider">
              <span className="svsvp-section-label">Dates</span>
              <div className="svsvp-section-line" />
            </div>

            <div className="svsvp-rows">
              <Row label="Date of Testing"   value={formatDate(data.dateOfTesting)} />
              <Row label="Date of Packaging" value={formatDate(data.dateOfPackaging)} />
              <Row label="Date of Expiry"    value={formatDate(data.dateOfExpiry)} />
            </div>

            <div className="svsvp-section-divider">
              <span className="svsvp-section-label">Pricing</span>
              <div className="svsvp-section-line" />
            </div>

            <div className="svsvp-rows">
              <Row label="MRP"               value={data.mrp}                       bold />
              <Row label="Unit Sale Price"   value={data.unitSalePrice} />
              <Row label="Net Quantity"      value={data.netQty} />
            </div>

            <div className="svsvp-section-divider">
              <span className="svsvp-section-label">Facility</span>
              <div className="svsvp-section-line" />
            </div>

            <div className="svsvp-rows">
              <Row label="Packed At"         value={data.packedAt} />
              <Row label="Plant Address"     value={data.plantAddress} />
              <Row label="Produced By"       value={data.producedBy} />
            </div>

            {/* PDF */}
            <div className="svsvp-pdf-area">
              <div className="svsvp-pdf-label">Product Information Leaflet</div>
              <a href={data.leafletUrl} target="_blank" rel="noreferrer" className="svsvp-pdf-btn">
                <div className="svsvp-pdf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                View Product Leaflet
              </a>
            </div>
          </div>

          <p className="svsvp-footer">© {new Date().getFullYear()} Sri Vishnu Seeds Pvt. Ltd. — Hanamkonda, Telangana</p>
        </div>
      </div>
    </>
  );
}

const Row = ({ label, value, bold }) => (
  <div className="svsvp-row">
    <div className="svsvp-lbl">{label}</div>
    <div className={`svsvp-val${bold ? ' bold' : ''}`}>{value}</div>
  </div>
);