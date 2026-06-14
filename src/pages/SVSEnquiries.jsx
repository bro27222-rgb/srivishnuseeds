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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .svs-eq-root {
          min-height: 100vh;
          background: #0D1F0F;
          background-image:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(201,150,42,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 90% 80%, rgba(201,150,42,0.04) 0%, transparent 55%);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          padding: 0 20px 72px;
        }

        /* ── TOP NAV ── */
        .svs-eq-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(201,150,42,0.15);
          margin-bottom: 48px;
        }
        .svs-eq-back {
          display: flex; align-items: center; gap: 8px;
          background: transparent;
          border: 1px solid rgba(201,150,42,0.3);
          color: rgba(248,243,232,0.55);
          padding: 7px 14px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 2.2px; text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .svs-eq-back:hover {
          border-color: rgba(201,150,42,0.6);
          color: #C9962A;
          background: rgba(201,150,42,0.05);
        }

        /* ── PAGE HEADER ── */
        .svs-eq-header {
          max-width: 720px;
          margin: 0 auto 40px;
        }
        .svs-eq-eyebrow {
          font-size: 9px; font-weight: 600;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: #C9962A; margin-bottom: 10px;
        }
        .svs-eq-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 600;
          color: #F8F3E8;
          letter-spacing: 0.4px;
          margin-bottom: 16px;
          line-height: 1.15;
        }
        .svs-eq-divider {
          display: flex; align-items: center; gap: 10px;
        }
        .svs-eq-divider-line {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, #C9962A, transparent);
        }
        .svs-eq-divider-diamond {
          width: 5px; height: 5px;
          background: rgba(201,150,42,0.5);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .svs-eq-count {
          font-size: 10px; font-weight: 500;
          color: rgba(248,243,232,0.3);
          letter-spacing: 1.5px;
        }

        /* ── EMPTY STATE ── */
        .svs-eq-empty {
          max-width: 720px; margin: 60px auto;
          text-align: center;
        }
        .svs-eq-empty-icon {
          width: 60px; height: 60px;
          border: 1px solid rgba(201,150,42,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin: 0 auto 20px;
        }
        .svs-eq-empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-style: italic;
          color: rgba(248,243,232,0.3);
        }

        /* ── LIST ── */
        .svs-eq-list {
          max-width: 720px;
          margin: 0 auto;
          display: flex; flex-direction: column;
          gap: 16px;
        }

        /* ── ENQUIRY CARD ── */
        .svs-eq-card {
          position: relative;
          background: #F8F3E8;
          border-radius: 3px;
          cursor: pointer;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(201,150,42,0.25),
            0 0 0 4px rgba(13,31,15,0.5),
            0 0 0 5px rgba(201,150,42,0.10),
            0 12px 32px rgba(0,0,0,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .svs-eq-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(201,150,42,0.45),
            0 0 0 4px rgba(13,31,15,0.55),
            0 0 0 5px rgba(201,150,42,0.18),
            0 18px 44px rgba(0,0,0,0.45);
        }
        .svs-eq-card::before {
          content: '';
          position: absolute; inset: 7px;
          border: 1px solid rgba(201,150,42,0.15);
          border-radius: 1px;
          pointer-events: none;
          z-index: 0;
        }

        /* Unread ribbon */
        .svs-eq-card-ribbon {
          position: absolute; top: 0; left: 0; right: 0;
          height: 4px;
        }
        .svs-eq-card-ribbon.unread {
          background: linear-gradient(90deg,
            #5A7A5C 0%, #C9962A 30%, #E8B84B 50%, #C9962A 70%, #5A7A5C 100%
          );
        }
        .svs-eq-card-ribbon.read {
          background: rgba(201,150,42,0.15);
        }

        /* Unread left accent bar */
        .svs-eq-card-accent {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #C9962A, #E8B84B, #C9962A);
        }

        .svs-eq-card-body {
          padding: 22px 24px 18px 24px;
          position: relative; z-index: 1;
        }

        /* Header row */
        .svs-eq-card-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
          gap: 12px;
        }
        .svs-eq-card-meta { flex: 1; min-width: 0; }
        .svs-eq-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700;
          color: #0D1F0F;
          letter-spacing: 0.3px;
          line-height: 1.2;
          margin-bottom: 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .svs-eq-card-phone {
          font-size: 11px; font-weight: 500;
          color: #5A7A5C; letter-spacing: 0.3px;
        }
        .svs-eq-card-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 8px;
          flex-shrink: 0;
        }
        .svs-eq-card-date {
          font-size: 9px; font-weight: 600;
          color: rgba(90,122,92,0.7);
          letter-spacing: 1.8px; text-transform: uppercase;
        }
        .svs-eq-card-unread-dot {
          width: 8px; height: 8px;
          background: #C9962A;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(201,150,42,0.6);
        }

        /* Divider */
        .svs-eq-card-rule {
          height: 1px;
          background: linear-gradient(90deg, rgba(201,150,42,0.25), rgba(201,150,42,0.08), transparent);
          margin-bottom: 14px;
        }

        /* Message */
        .svs-eq-card-message {
          font-size: 13px; font-weight: 400;
          color: #1C2B1D;
          line-height: 1.75;
          background: rgba(201,150,42,0.05);
          border-left: 2px solid rgba(201,150,42,0.3);
          padding: 10px 14px;
          border-radius: 0 2px 2px 0;
          margin-bottom: 16px;
          font-style: italic;
        }

        /* Footer row */
        .svs-eq-card-foot {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .svs-eq-delete-btn {
          display: flex; align-items: center; gap: 6px;
          background: #0D1F0F;
          border: 1px solid rgba(180,40,40,0.5);
          color: rgba(248,100,100,0.8);
          padding: 6px 14px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .svs-eq-delete-btn:hover {
          border-color: rgba(220,50,50,0.8);
          color: #f87171;
          background: rgba(220,50,50,0.08);
        }

        /* ── FOOTER ── */
        .svs-eq-footer {
          text-align: center;
          margin-top: 52px;
          font-size: 9px; font-weight: 400;
          color: rgba(248,243,232,0.2);
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="svs-eq-root">

        {/* NAV */}
        <nav className="svs-eq-nav">
          <button className="svs-eq-back" onClick={() => navigate('/admin/home')}>
            ← Back
          </button>
        </nav>

        {/* HEADER */}
        <div className="svs-eq-header">
          <div className="svs-eq-eyebrow">Administration · Inbox</div>
          <h1 className="svs-eq-title">Customer Enquiries</h1>
          <div className="svs-eq-divider">
            <div className="svs-eq-divider-line" />
            <div className="svs-eq-divider-diamond" />
            <span className="svs-eq-count">
              {enquiries.length} {enquiries.length === 1 ? 'message' : 'messages'} &nbsp;·&nbsp;{' '}
              {enquiries.filter(e => !e.isRead).length} unread
            </span>
          </div>
        </div>

        {/* EMPTY STATE */}
        {enquiries.length === 0 ? (
          <div className="svs-eq-empty">
            <div className="svs-eq-empty-icon">✉</div>
            <p className="svs-eq-empty-text">No enquiries found.</p>
          </div>
        ) : (
          <div className="svs-eq-list">
            {enquiries.map((enq) => (
              <div
                key={enq._id}
                className="svs-eq-card"
                onClick={() => markAsRead(enq._id, enq.isRead)}
              >
                <div className={`svs-eq-card-ribbon ${enq.isRead ? 'read' : 'unread'}`} />
                {!enq.isRead && <div className="svs-eq-card-accent" />}

                <div className="svs-eq-card-body">
                  <div className="svs-eq-card-head">
                    <div className="svs-eq-card-meta">
                      <div className="svs-eq-card-name">{enq.name}</div>
                      <div className="svs-eq-card-phone">📞 {enq.phone}</div>
                    </div>
                    <div className="svs-eq-card-right">
                      <div className="svs-eq-card-date">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      {!enq.isRead && <div className="svs-eq-card-unread-dot" />}
                    </div>
                  </div>

                  <div className="svs-eq-card-rule" />

                  <p className="svs-eq-card-message">{enq.message}</p>

                  <div className="svs-eq-card-foot">
                    <button
                      className="svs-eq-delete-btn"
                      onClick={(e) => { e.stopPropagation(); deleteEnquiry(enq._id); }}
                    >
                      ✕ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="svs-eq-footer">© {new Date().getFullYear()} Sri Vishnu Seeds Pvt. Ltd.</p>
      </div>
    </>
  );
}