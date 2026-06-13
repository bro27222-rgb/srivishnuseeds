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

  // ── Error State ──
  if (error) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .svs-state {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #fdfaf4; font-family: 'Lato', sans-serif;
          gap: 14px; padding: 20px; text-align: center;
        }
        .svs-state-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #f87171);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; box-shadow: 0 8px 24px rgba(220,38,38,0.25);
        }
        .svs-state-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #dc2626; }
        .svs-state-sub { font-size: 14px; color: #9aab9a; max-width: 280px; line-height: 1.65; }
      `}</style>
      <div className="svs-state">
        <div className="svs-state-icon">✕</div>
        <div className="svs-state-title">Invalid Product Code</div>
        <div className="svs-state-sub">This QR code could not be verified. Please check the label and try again.</div>
      </div>
    </>
  );

  // ── Loading State ──
  if (!data) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .svs-state {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #fdfaf4; font-family: 'Lato', sans-serif;
          gap: 16px; padding: 20px; text-align: center;
        }
        .svs-load-emblem {
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, #174f19, #2d7d2d);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; box-shadow: 0 8px 24px rgba(23,79,25,0.28);
          animation: svsPulse 1.6s ease-in-out infinite;
        }
        @keyframes svsPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 24px rgba(23,79,25,0.28); }
          50% { transform: scale(1.06); box-shadow: 0 12px 32px rgba(23,79,25,0.42); }
        }
        .svs-load-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: #174f19; }
        .svs-load-sub { font-size: 11px; color: #9aab9a; letter-spacing: 2px; text-transform: uppercase; }
        .svs-dots span {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          background: #2d7d2d; margin: 0 3px;
          animation: svsDot 1.2s ease-in-out infinite;
        }
        .svs-dots span:nth-child(2) { animation-delay: 0.2s; }
        .svs-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes svsDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div className="svs-state">
        <div className="svs-load-emblem">🌾</div>
        <div className="svs-load-title">Verifying with Sri Vishnu Seeds</div>
        <div className="svs-load-sub">Please wait</div>
        <div className="svs-dots"><span /><span /><span /></div>
      </div>
    </>
  );

  // ── Verified State ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .svs-vp-root {
          min-height: 100vh;
          background: #fdfaf4;
          padding: 28px 14px 52px;
          font-family: 'Lato', sans-serif;
          -webkit-font-smoothing: antialiased;
          position: relative;
        }
        .svs-vp-root::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 40% at 15% 5%, rgba(23,79,25,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 95%, rgba(217,119,6,0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .svs-vp-card {
          position: relative; z-index: 1;
          max-width: 480px;
          margin: 0 auto;
          background: #fffdf9;
          border-radius: 20px;
          border: 1px solid #e8dfc8;
          box-shadow: 0 20px 60px rgba(23,79,25,0.13), 0 4px 16px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        /* Forest-to-harvest gradient top bar — matches SVS palette */
        .svs-vp-top {
          height: 5px;
          background: linear-gradient(90deg, #174f19, #2d7d2d, #d97706, #2d7d2d, #174f19);
        }

        /* HEADER */
        .svs-vp-header {
          text-align: center;
          padding: 28px 24px 22px;
          border-bottom: 1px solid #ede8de;
          background: linear-gradient(180deg, #f5ede0 0%, #fffdf9 100%);
        }
        .svs-vp-emblem {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #174f19, #2d7d2d);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin: 0 auto 14px;
          box-shadow: 0 6px 20px rgba(23,79,25,0.24);
        }
        .svs-vp-brand {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          font-weight: 700;
          color: #0b2d0e;
          letter-spacing: 0.6px;
          line-height: 1.3;
        }
        .svs-vp-pvt {
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #d97706;
          margin-top: 2px;
        }
        .svs-vp-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 14px;
          padding: 6px 16px;
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          border: 1px solid #6ee7b7;
          border-radius: 20px;
          color: #2d7d2d;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .svs-vp-check {
          width: 18px; height: 18px;
          background: linear-gradient(135deg, #2d7d2d, #4a9e4a);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 9px; font-weight: 700;
          flex-shrink: 0;
        }

        /* TABLE */
        .svs-vp-table { display: flex; flex-direction: column; }
        .svs-vp-row {
          display: flex;
          border-bottom: 1px solid #f0ebe0;
          transition: background 0.12s;
        }
        .svs-vp-row:last-child { border-bottom: none; }
        .svs-vp-row:hover { background: #faf7f0; }
        .svs-vp-lbl {
          flex: 1;
          padding: 11px 16px;
          background: #f7f4ee;
          font-size: 10px;
          font-weight: 700;
          color: #9aab9a;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          line-height: 1.5;
          border-right: 1px solid #ede8de;
        }
        .svs-vp-val {
          flex: 1.6;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.55;
        }
        .svs-vp-val.bold { font-weight: 700; color: #0b2d0e; font-size: 14px; }

        /* PDF BUTTON */
        .svs-vp-pdf-area {
          padding: 20px 20px 24px;
          background: linear-gradient(180deg, #fffdf9, #f5ede0);
          border-top: 1px solid #ede8de;
        }
        .svs-vp-pdf-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px;
          background: linear-gradient(135deg, #174f19 0%, #2d7d2d 100%);
          color: #fff;
          text-decoration: none;
          border-radius: 10px;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.8px;
          box-shadow: 0 4px 18px rgba(23,79,25,0.28);
          transition: transform 0.15s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .svs-vp-pdf-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .svs-vp-pdf-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 26px rgba(23,79,25,0.36);
        }

        /* FOOTER */
        .svs-vp-footer {
          text-align: center;
          margin-top: 18px;
          font-size: 11px;
          color: #bbb;
          letter-spacing: 0.3px;
        }
      `}</style>

      <div className="svs-vp-root">
        <div className="svs-vp-card">
          <div className="svs-vp-top" />

          {/* HEADER */}
          <div className="svs-vp-header">
            <div className="svs-vp-emblem">🌾</div>
            <div className="svs-vp-brand">SRI VISHNU SEEDS</div>
            <div className="svs-vp-pvt">Pvt. Ltd.</div>
            <div className="svs-vp-badge">
              <div className="svs-vp-check">✔</div>
              Genuine Product Verified
            </div>
          </div>

          {/* DETAILS */}
          <div className="svs-vp-table">
            <Row label="Label Number"      value={data.labelNumber}               bold />
            <Row label="Crop Name"         value={data.cropName}                  bold />
            <Row label="Packed Variety"    value={data.packedVariety} />
            <Row label="Lot Number"        value={data.packedLotNumber} />
            <Row label="Date of Testing"   value={formatDate(data.dateOfTesting)} />
            <Row label="Date of Packaging" value={formatDate(data.dateOfPackaging)} />
            <Row label="Date of Expiry"    value={formatDate(data.dateOfExpiry)} />
            <Row label="MRP"               value={data.mrp}                       bold />
            <Row label="Unit Sale Price"   value={data.unitSalePrice} />
            <Row label="Net Quantity"      value={data.netQty} />
            <Row label="Packed At"         value={data.packedAt} />
            <Row label="Plant Address"     value={data.plantAddress} />
            <Row label="Produced By"       value={data.producedBy} />
          </div>

          {/* PDF */}
          <div className="svs-vp-pdf-area">
            <a href={data.leafletUrl} target="_blank" rel="noreferrer" className="svs-vp-pdf-btn">
              📄 View Product Leaflet (PDF)
            </a>
          </div>
        </div>

        <p className="svs-vp-footer">© {new Date().getFullYear()} Sri Vishnu Seeds Pvt. Ltd.</p>
      </div>
    </>
  );
}

const Row = ({ label, value, bold }) => (
  <div className="svs-vp-row">
    <div className="svs-vp-lbl">{label}</div>
    <div className={`svs-vp-val${bold ? ' bold' : ''}`}>{value}</div>
  </div>
);