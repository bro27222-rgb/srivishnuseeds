import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function SVSAdminHome() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries/unread-count`)
      .then(res => setUnreadCount(res.data.count))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --svs-ink:        #111d14;
          --svs-forest:     #1d4528;
          --svs-leaf:       #1bba6b;
          --svs-leaf-lt:    #34d884;
          --svs-surface:    #f2f6f3;
          --svs-white:      #ffffff;
          --svs-border:     #d4e0d8;
          --svs-border-dk:  #c0d0c5;
          --svs-text:       #111d14;
          --svs-text-mid:   #3d5245;
          --svs-text-muted: #7a9180;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .svsh-root {
          font-family: 'Inter', sans-serif;
          background: var(--svs-surface);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAVBAR ── */
        .svsh-navbar {
          background: var(--svs-ink);
          position: sticky; top: 0; z-index: 200;
          box-shadow: 0 1px 0 rgba(27,186,107,0.15), 0 4px 24px rgba(0,0,0,0.35);
        }
        .svsh-navbar-stripe {
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--svs-leaf) 30%, var(--svs-leaf-lt) 50%, var(--svs-leaf) 70%, transparent 100%);
        }
        .svsh-nav-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px; height: 68px;
        }
        .svsh-nav-brand { display: flex; align-items: center; gap: 14px; }
        .svsh-nav-logo-ring {
          width: 40px; height: 40px; border-radius: 8px;
          background: rgba(27,186,107,0.10);
          border: 1px solid rgba(27,186,107,0.28);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 6px;
        }
        .svsh-nav-logo-ring img { width: 100%; height: 100%; object-fit: contain; filter: brightness(1.1); }
        .svsh-nav-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #fff; line-height: 1.2; }
        .svsh-nav-tag { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(27,186,107,0.65); letter-spacing: 1px; text-transform: uppercase; }
        .svsh-logout-btn {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.65);
          padding: 8px 16px; border-radius: 5px;
          cursor: pointer; font-size: 12px; font-weight: 600;
          font-family: 'Inter', sans-serif;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .svsh-logout-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.9);
        }
        .svsh-logout-btn svg { width: 13px; height: 13px; }

        /* ── PAGE HEADER ── */
        .svsh-page-header {
          background: var(--svs-white);
          border-bottom: 1px solid var(--svs-border);
          padding: 56px 32px 52px;
          text-align: center;
        }
        .svsh-header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 46px; margin-bottom: 12px;
          color: var(--svs-ink);
        }
        .svsh-header-title em { color: var(--svs-leaf); font-style: italic; }
        .svsh-header-sub { font-size: 14px; color: var(--svs-text-muted); }

        /* ── MAIN CONTENT ── */
        .svsh-container {
          max-width: 860px; margin: 0 auto;
          padding: 52px 28px 80px;
        }

        .svsh-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--svs-text-muted);
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .svsh-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: var(--svs-border);
        }

        /* ── CARDS GRID ── */
        .svsh-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 580px) {
          .svsh-grid { grid-template-columns: 1fr; }
          .svsh-header-title { font-size: 34px; }
        }

        .svsh-card {
          position: relative;
          background: var(--svs-white);
          border: 1px solid var(--svs-border);
          border-radius: 10px;
          padding: 32px 28px 28px;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(17,29,20,0.06), 0 1px 3px rgba(17,29,20,0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .svsh-card:hover {
          transform: translateY(-3px);
          border-color: var(--svs-leaf);
          box-shadow: 0 12px 36px rgba(17,29,20,0.10), 0 0 0 1px rgba(27,186,107,0.2);
        }

        /* Green top stripe — matches form card stripe in dashboard */
        .svsh-card-stripe {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--svs-leaf), var(--svs-leaf-lt), var(--svs-leaf), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .svsh-card:hover .svsh-card-stripe { opacity: 1; }

        .svsh-card-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 9px;
          background: rgba(27,186,107,0.08);
          border: 1px solid rgba(27,186,107,0.22);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 22px;
        }
        .svsh-card-icon-wrap svg { width: 20px; height: 20px; color: var(--svs-leaf); }

        .svsh-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px; font-weight: 400;
          color: var(--svs-ink);
          margin-bottom: 10px; line-height: 1.2;
        }
        .svsh-card-desc {
          font-size: 13px; font-weight: 400;
          color: var(--svs-text-muted);
          line-height: 1.7;
        }
        .svsh-card-cta {
          display: flex; align-items: center; gap: 6px;
          margin-top: 24px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.8px; text-transform: uppercase;
          color: var(--svs-leaf);
          font-family: 'Inter', sans-serif;
        }
        .svsh-card-cta svg { width: 14px; height: 14px; transition: transform 0.18s; }
        .svsh-card:hover .svsh-card-cta svg { transform: translateX(3px); }

        /* ── UNREAD BADGE ── */
        .svsh-badge {
          position: absolute; top: -9px; right: -9px;
          background: #e53e3e;
          color: #fff;
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          box-shadow: 0 2px 8px rgba(229,62,62,0.4);
          border: 2px solid var(--svs-white);
          z-index: 10;
        }

        /* ── FOOTER ── */
        .svsh-footer {
          text-align: center;
          margin-top: 64px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--svs-text-muted);
          letter-spacing: 1px;
        }
      `}</style>

      <div className="svsh-root">

        {/* NAVBAR */}
        <nav className="svsh-navbar">
          <div className="svsh-navbar-stripe" />
          <div className="svsh-nav-inner">
            <div className="svsh-nav-brand">
              <div className="svsh-nav-logo-ring"><img src={logo} alt="SVS" /></div>
              <div>
                <div className="svsh-nav-name">SRI VISHNU SEEDS PVT. LTD.</div>
                <div className="svsh-nav-tag">Administration Portal</div>
              </div>
            </div>
            <button
              className="svsh-logout-btn"
              onClick={() => { localStorage.removeItem('svs_token'); navigate('/admin/login'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>
        </nav>

        {/* PAGE HEADER */}
        <div className="svsh-page-header">
          <h1 className="svsh-header-title">Welcome, <em>Admin</em></h1>
          <p className="svsh-header-sub">What would you like to do today?</p>
        </div>

        {/* MAIN */}
        <div className="svsh-container">
          <div className="svsh-section-label">Quick Access</div>

          <div className="svsh-grid">

            {/* Card 1: QR Generation */}
            <div className="svsh-card" onClick={() => navigate('/admin/dashboard')}>
              <div className="svsh-card-stripe" />
              <div className="svsh-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="17" y="17" width="3" height="3"/>
                  <rect x="14" y="14" width="3" height="3"/>
                </svg>
              </div>
              <div className="svsh-card-title">Generate QR Codes</div>
              <p className="svsh-card-desc">Create new batches, generate secure labels, and view production history.</p>
              <div className="svsh-card-cta">
                Open
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>

            {/* Card 2: View Enquiries */}
            <div className="svsh-card" onClick={() => navigate('/admin/enquiries')} style={{ position: 'relative' }}>
              <div className="svsh-card-stripe" />
              {unreadCount > 0 && (
                <div className="svsh-badge">{unreadCount}</div>
              )}
              <div className="svsh-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="svsh-card-title">View Enquiries</div>
              <p className="svsh-card-desc">Check messages from farmers and dealers. Messages auto-delete after 90 days.</p>
              <div className="svsh-card-cta">
                Open
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>

          </div>

          <p className="svsh-footer">© {new Date().getFullYear()} Sri Vishnu Seeds Pvt. Ltd.</p>
        </div>
      </div>
    </>
  );
}