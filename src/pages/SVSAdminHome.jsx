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
    <div style={{ minHeight: '100vh', background: '#f2f6f3', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <img src={logo} alt="SVS" style={{ height: '50px' }} />
          <button 
            onClick={() => { localStorage.removeItem('svs_token'); navigate('/admin/login'); }}
            style={{ background: '#111d14', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>

        <h1 style={{ fontSize: '32px', color: '#111d14', marginBottom: '10px' }}>Welcome, Admin</h1>
        <p style={{ color: '#7a9180', marginBottom: '40px' }}>What would you like to do today?</p>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Card 1: QR Generation */}
          <div 
            onClick={() => navigate('/admin/dashboard')}
            style={{ background: '#fff', padding: '30px', borderRadius: '10px', cursor: 'pointer', border: '1px solid #d4e0d8', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '20px', color: '#1d4528', marginBottom: '10px' }}>Generate QR Codes</h2>
            <p style={{ color: '#7a9180', fontSize: '14px' }}>Create new batches, generate secure labels, and view production history.</p>
          </div>

          {/* Card 2: View Enquiries */}
          <div 
            onClick={() => navigate('/admin/enquiries')}
            style={{ position: 'relative', background: '#fff', padding: '30px', borderRadius: '10px', cursor: 'pointer', border: '1px solid #d4e0d8', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            {/* WhatsApp Style Badge */}
            {unreadCount > 0 && (
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#e53e3e', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                {unreadCount}
              </div>
            )}
            <h2 style={{ fontSize: '20px', color: '#1d4528', marginBottom: '10px' }}>View Enquiries</h2>
            <p style={{ color: '#7a9180', fontSize: '14px' }}>Check messages from farmers and dealers. Messages auto-delete after 90 days.</p>
          </div>

        </div>
      </div>
    </div>
  );
}