import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function SVSAdminHome() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch the number of new enquiries for the badge
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries/unread-count`)
      .then(res => setUnreadCount(res.data.count))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .svs-ah-root {
          min-height: 100vh;
          background: #0D1F0F;
          background-image:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(201,150,42,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 90% 80%, rgba(201,150,42,0.04) 0%, transparent 55%);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          padding: 0 20px 64px;
        }

        /* ── TOP NAV ── */
        .svs-ah-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 0;
          border-bottom: 1px solid rgba(201,150,42,0.15);
          margin-bottom: 56px;
        }
        .svs-ah-nav-logo {
          height: 46px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }
        .svs-ah-signout {
          display: flex; align-items: center; gap: 8px;
          background: transparent;
          border: 1px solid rgba(201,150,42,0.35);
          color: rgba(248,243,232,0.6);
          padding: 8px 18px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .svs-ah-signout:hover {
          border-color: rgba(201,150,42,0.65);
          color: #C9962A;
          background: rgba(201,150,42,0.05);
        }

        /* ── HERO ── */
        .svs-ah-hero {
          max-width: 640px;
          margin: 0 auto 52px;
          text-align: center;
        }
        .svs-ah-eyebrow {
          font-size: 9px; font-weight: 600;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: #C9962A; margin-bottom: 14px;
        }
        .svs-ah-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 600;
          color: #F8F3E8;
          line-height: 1.15;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }
        .svs-ah-title em {
          font-style: italic;
          color: #C9962A;
        }
        .svs-ah-divider {
          display: flex; align-items: center; gap: 10px;
          justify-content: center;
          margin: 18px auto 18px;
        }
        .svs-ah-divider-line {
          width: 52px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9962A);
        }
        .svs-ah-divider-line.rev {
          background: linear-gradient(90deg, #C9962A, transparent);
        }
        .svs-ah-divider-diamond {
          width: 5px; height: 5px;
          background: #C9962A;
          transform: rotate(45deg);
        }
        .svs-ah-sub {
          font-size: 13px; font-weight: 300;
          color: rgba(248,243,232,0.4);
          letter-spacing: 0.2px; line-height: 1.7;
        }

        /* ── CARDS GRID ── */
        .svs-ah-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          max-width: 740px;
          margin: 0 auto;
        }
        @media (max-width: 540px) {
          .svs-ah-grid { grid-template-columns: 1fr; }
          .svs-ah-title { font-size: 32px; }
        }

        .svs-ah-card {
          position: relative;
          background: #F8F3E8;
          border-radius: 3px;
          padding: 32px 28px 28px;
          cursor: pointer;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(201,150,42,0.3),
            0 0 0 4px rgba(13,31,15,0.6),
            0 0 0 5px rgba(201,150,42,0.12),
            0 16px 40px rgba(0,0,0,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .svs-ah-card::before {
          content: '';
          position: absolute; inset: 7px;
          border: 1px solid rgba(201,150,42,0.18);
          border-radius: 1px;
          pointer-events: none;
          z-index: 0;
        }
        .svs-ah-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 0 0 1px rgba(201,150,42,0.5),
            0 0 0 4px rgba(13,31,15,0.6),
            0 0 0 5px rgba(201,150,42,0.2),
            0 24px 56px rgba(0,0,0,0.5);
        }

        /* Gold top ribbon on card */
        .svs-ah-card-ribbon {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg,
            #5A7A5C 0%, #C9962A 30%, #E8B84B 50%, #C9962A 70%, #5A7A5C 100%
          );
        }

        .svs-ah-card-icon {
          width: 44px; height: 44px;
          background: #0D1F0F;
          border: 1px solid rgba(201,150,42,0.4);
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          margin-bottom: 20px;
          position: relative; z-index: 1;
        }
        .svs-ah-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: #0D1F0F;
          letter-spacing: 0.3px;
          margin-bottom: 10px;
          position: relative; z-index: 1;
        }
        .svs-ah-card-desc {
          font-size: 12px; font-weight: 400;
          color: #5A7A5C;
          line-height: 1.75;
          position: relative; z-index: 1;
        }
        .svs-ah-card-arrow {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 20px;
          font-size: 9px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #C9962A;
          position: relative; z-index: 1;
          transition: gap 0.2s;
        }
        .svs-ah-card:hover .svs-ah-card-arrow { gap: 10px; }

        /* ── BADGE ── */
        .svs-ah-badge {
          position: absolute;
          top: -10px; right: -10px;
          background: #C9962A;
          color: #0D1F0F;
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 10px rgba(201,150,42,0.5);
          z-index: 20;
          border: 2px solid #0D1F0F;
        }

        /* ── FOOTER ── */
        .svs-ah-footer {
          text-align: center;
          margin-top: 52px;
          font-size: 9px; font-weight: 400;
          color: rgba(248,243,232,0.2);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="svs-ah-root">

        {/* NAV */}
        <nav className="svs-ah-nav">
          <img src={logo} alt="SVS" className="svs-ah-nav-logo" />
          <button
            className="svs-ah-signout"
            onClick={() => { localStorage.removeItem('svs_token'); navigate('/admin/login'); }}
          >
            Sign Out
          </button>
        </nav>

        {/* HERO */}
        <div className="svs-ah-hero">
          <div className="svs-ah-eyebrow">Administration Portal</div>
          <h1 className="svs-ah-title">Welcome, <em>Admin</em></h1>
          <div className="svs-ah-divider">
            <div className="svs-ah-divider-line" />
            <div className="svs-ah-divider-diamond" />
            <div className="svs-ah-divider-line rev" />
          </div>
          <p className="svs-ah-sub">What would you like to do today?</p>
        </div>

        {/* CARDS */}
        <div className="svs-ah-grid">

          {/* Card 1: QR Generation */}
          <div className="svs-ah-card" onClick={() => navigate('/admin/dashboard')}>
            <div className="svs-ah-card-ribbon" />
            <div className="svs-ah-card-icon">🏷️</div>
            <div className="svs-ah-card-title">Generate QR Codes</div>
            <p className="svs-ah-card-desc">Create new batches, generate secure labels, and view production history.</p>
            <div className="svs-ah-card-arrow">Open →</div>
          </div>

          {/* Card 2: View Enquiries */}
          <div className="svs-ah-card" onClick={() => navigate('/admin/enquiries')} style={{ position: 'relative' }}>
            <div className="svs-ah-card-ribbon" />
            {unreadCount > 0 && (
              <div className="svs-ah-badge">{unreadCount}</div>
            )}
            <div className="svs-ah-card-icon">✉️</div>
            <div className="svs-ah-card-title">View Enquiries</div>
            <p className="svs-ah-card-desc">Check messages from farmers and dealers. Messages auto-delete after 90 days.</p>
            <div className="svs-ah-card-arrow">Open →</div>
          </div>

        </div>

        <p className="svs-ah-footer">© {new Date().getFullYear()} Sri Vishnu Seeds Pvt. Ltd.</p>
      </div>
    </>
  );
}