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
    if (isRead) return; // Already read
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
    <div style={{ minHeight: '100vh', background: '#f2f6f3', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <button onClick={() => navigate('/admin/home')} style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#1bba6b', cursor: 'pointer', fontWeight: 'bold' }}>
          ← Back to Home
        </button>
        
        <h1 style={{ fontSize: '28px', color: '#111d14', marginBottom: '20px' }}>Customer Enquiries</h1>

        {enquiries.length === 0 ? (
          <p>No enquiries found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {enquiries.map((enq) => (
              <div 
                key={enq._id} 
                onClick={() => markAsRead(enq._id, enq.isRead)}
                style={{ 
                  background: enq.isRead ? '#fff' : '#e6f7ef', 
                  border: enq.isRead ? '1px solid #d4e0d8' : '1px solid #1bba6b',
                  padding: '20px', borderRadius: '8px', cursor: 'pointer' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>{enq.name}</strong>
                  <span style={{ fontSize: '12px', color: '#7a9180' }}>
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ marginBottom: '10px', color: '#3d5245' }}>📞 {enq.phone}</div>
                <p style={{ color: '#111d14', background: '#f7faf8', padding: '10px', borderRadius: '4px' }}>
                  {enq.message}
                </p>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteEnquiry(enq._id); }}
                    style={{ background: '#ff4d4f', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}