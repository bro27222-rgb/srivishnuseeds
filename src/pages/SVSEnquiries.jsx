import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SVSEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries`);
      setEnquiries(res.data);
    } catch (err) {
      alert("Failed to fetch enquiries");
    }
  };

  const markAsRead = async (id, isRead) => {
    if (isRead) return;
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries/${id}/read`);
      setEnquiries(enquiries.map(e => e._id === id ? { ...e, isRead: true } : e));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEnquiry = async (id) => {
    if(!window.confirm("Delete this enquiry?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries/${id}`);
      setEnquiries(enquiries.filter(e => e._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const unreadCount = enquiries.filter(e => !e.isRead).length;

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

        .svse-root {
          font-family: 'Inter', sans-serif;
          background: var(--svs-surface);
          min-height: 100vh;
          padding-bottom: 80px;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAVBAR ── */
        .svse-navbar {
          background: var(--svs-ink);
          position: sticky; top: 0; z-index: 200;
          box-shadow: 0 1px 0 rgba(27,186,107,0.15), 0 4px 24px rgba(0,0,0,0.35);
        }
        .svse-navbar-stripe {
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--svs-leaf) 30%, var(--svs-leaf-lt) 50%, var(--svs-leaf) 70%, transparent 100%);
        }
        .svse-nav-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 20px;
          padding: 0 32px; height: 68px;
        }
        .svse-back-btn {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.65);
          padding: 8px 16px; border-radius: 5px;
          cursor: pointer; font-size: 12px; font-weight: 600;
          font-family: 'Inter', sans-serif;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          flex-shrink: 0;
        }
        .svse-back-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.9);
        }
        .svse-back-btn svg { width: 13px; height: 13px; }
        .svse-nav-divider {
          width: 1px; height: 28px;
          background: rgba(255,255,255,0.10);
        }
        .svse-nav-title {
          font-family: 'DM Serif Display', serif;
          font-size: 15px; color: rgba(255,255,255,0.75);
        }

        /* ── PAGE HEADER ── */
        .svse-page-header {
          background: var(--svs-white);
          border-bottom: 1px solid var(--svs-border);
          padding: 48px 32px 44px;
          text-align: center;
        }
        .svse-header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 42px; margin-bottom: 12px;
          color: var(--svs-ink);
        }
        .svse-header-title em { color: var(--svs-leaf); font-style: italic; }
        .svse-header-meta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; color: var(--svs-text-muted);
          letter-spacing: 0.5px;
        }
        .svse-header-meta-sep { color: var(--svs-border-dk); }
        .svse-header-unread {
          color: var(--svs-leaf); font-weight: 600;
        }

        /* ── CONTAINER ── */
        .svse-container {
          max-width: 800px; margin: 0 auto;
          padding: 40px 28px 0;
        }

        .svse-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--svs-text-muted);
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .svse-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: var(--svs-border);
        }

        /* ── EMPTY STATE ── */
        .svse-empty {
          background: var(--svs-white);
          border: 1px solid var(--svs-border);
          border-radius: 10px;
          padding: 64px 32px;
          text-align: center;
        }
        .svse-empty-icon {
          width: 52px; height: 52px;
          border-radius: 10px;
          background: rgba(27,186,107,0.07);
          border: 1px solid rgba(27,186,107,0.20);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .svse-empty-icon svg { width: 22px; height: 22px; color: var(--svs-leaf); opacity: 0.7; }
        .svse-empty-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px; color: var(--svs-text-mid);
          margin-bottom: 8px;
        }
        .svse-empty-sub {
          font-size: 13px; color: var(--svs-text-muted);
        }

        /* ── LIST ── */
        .svse-list {
          display: flex; flex-direction: column; gap: 12px;
        }

        /* ── ENQUIRY CARD ── */
        .svse-card {
          position: relative;
          background: var(--svs-white);
          border: 1px solid var(--svs-border);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(17,29,20,0.05);
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .svse-card:hover {
          transform: translateY(-2px);
          border-color: var(--svs-leaf);
          box-shadow: 0 8px 24px rgba(17,29,20,0.09), 0 0 0 1px rgba(27,186,107,0.15);
        }

        /* Unread: green left accent */
        .svse-card.unread {
          border-left: 3px solid var(--svs-leaf);
        }
        .svse-card.read {
          border-left: 3px solid transparent;
        }

        /* Top stripe on unread, hidden on read */
        .svse-card-stripe {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
        }
        .svse-card.unread .svse-card-stripe {
          background: linear-gradient(90deg, transparent, var(--svs-leaf), var(--svs-leaf-lt), var(--svs-leaf), transparent);
        }

        .svse-card-body {
          padding: 20px 24px 18px;
        }

        /* Header row */
        .svse-card-head {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 16px;
          margin-bottom: 14px;
        }
        .svse-card-meta { flex: 1; min-width: 0; }

        .svse-card-name-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 4px;
        }
        .svse-card-name {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; color: var(--svs-ink);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          line-height: 1.2;
        }
        .svse-card-unread-pill {
          flex-shrink: 0;
          background: rgba(27,186,107,0.1);
          border: 1px solid rgba(27,186,107,0.3);
          color: var(--svs-leaf);
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 2px 8px; border-radius: 20px;
        }
        .svse-card-phone {
          font-size: 12px; font-weight: 500;
          color: var(--svs-text-muted);
          letter-spacing: 0.2px;
        }

        .svse-card-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 6px; flex-shrink: 0;
        }
        .svse-card-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: var(--svs-text-muted);
          letter-spacing: 0.5px;
        }

        /* Divider */
        .svse-card-divider {
          height: 1px; background: var(--svs-border);
          margin-bottom: 14px;
        }

        /* Message */
        .svse-card-message {
          font-size: 13px; font-weight: 400;
          color: var(--svs-text-mid);
          line-height: 1.75;
          background: #f7faf8;
          border-left: 2px solid var(--svs-border-dk);
          padding: 10px 14px;
          border-radius: 0 5px 5px 0;
          margin-bottom: 16px;
        }
        .svse-card.unread .svse-card-message {
          border-left-color: rgba(27,186,107,0.45);
          background: rgba(27,186,107,0.03);
        }

        /* Footer */
        .svse-card-foot {
          display: flex; justify-content: flex-end;
        }
        .svse-delete-btn {
          display: flex; align-items: center; gap: 6px;
          background: none;
          border: 1px solid rgba(229,62,62,0.3);
          color: #c53030;
          padding: 6px 14px; border-radius: 5px;
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .svse-delete-btn:hover {
          background: rgba(229,62,62,0.06);
          border-color: rgba(229,62,62,0.6);
        }
        .svse-delete-btn svg { width: 12px; height: 12px; }

        /* ── FOOTER ── */
        .svse-footer {
          text-align: center;
          margin-top: 52px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: var(--svs-text-muted);
          letter-spacing: 1px;
        }
      `}</style>

      <div className="svse-root">

        {/* NAVBAR */}
        <nav className="svse-navbar">
          <div className="svse-navbar-stripe" />
          <div className="svse-nav-inner">
            <button className="svse-back-btn" onClick={() => navigate('/admin/home')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Back
            </button>
            <div className="svse-nav-divider" />
            <div className="svse-nav-title">Customer Enquiries</div>
          </div>
        </nav>

        {/* PAGE HEADER */}
        <div className="svse-page-header">
          <h1 className="svse-header-title">Customer <em>Enquiries</em></h1>
          <div className="svse-header-meta">
            <span>{enquiries.length} {enquiries.length === 1 ? 'message' : 'messages'}</span>
            <span className="svse-header-meta-sep">·</span>
            <span className="svse-header-unread">{unreadCount} unread</span>
            <span className="svse-header-meta-sep">·</span>
            <span>auto-delete after 90 days</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="svse-container">
          <div className="svse-section-label">Inbox</div>

          {enquiries.length === 0 ? (
            <div className="svse-empty">
              <div className="svse-empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="svse-empty-title">No enquiries found</div>
              <p className="svse-empty-sub">Messages from farmers and dealers will appear here.</p>
            </div>
          ) : (
            <div className="svse-list">
              {enquiries.map((enq) => (
                <div
                  key={enq._id}
                  className={`svse-card ${enq.isRead ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(enq._id, enq.isRead)}
                >
                  <div className="svse-card-stripe" />

                  <div className="svse-card-body">
                    <div className="svse-card-head">
                      <div className="svse-card-meta">
                        <div className="svse-card-name-row">
                          <div className="svse-card-name">{enq.name}</div>
                          {!enq.isRead && <span className="svse-card-unread-pill">New</span>}
                        </div>
                        <div className="svse-card-phone">{enq.phone}</div>
                      </div>
                      <div className="svse-card-right">
                        <div className="svse-card-date">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div className="svse-card-divider" />

                    <p className="svse-card-message">{enq.message}</p>

                    <div className="svse-card-foot">
                      <button
                        className="svse-delete-btn"
                        onClick={(e) => { e.stopPropagation(); deleteEnquiry(enq._id); }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="svse-footer">© {new Date().getFullYear()} Sri Vishnu Seeds Pvt. Ltd.</p>
        </div>
      </div>
    </>
  );
}