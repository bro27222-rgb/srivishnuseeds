import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// ── Public site components ──
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Crops      from './components/Crops'
import Facilities from './components/Facilities'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

// ── QR / Admin pages ──
import SVSLogin           from './pages/SVSLogin'
import SVSAdminDashboard  from './pages/SVSAdminDashboard'
import SVSVerifyProduct   from './pages/SVSVerifyProduct'

// ── Auth guard ──
function ProtectedRoute({ children }) {
  return localStorage.getItem('svs_isAdmin') === 'true'
    ? children
    : <Navigate to="/admin/login" replace />
}

// ── Main one-page site ──
function MainSite() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Crops />
        <Facilities />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<MainSite />} />

        {/* Admin */}
        <Route path="/admin/login" element={<SVSLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <SVSAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* QR scan landing page */}
        <Route path="/verify/:labelNumber" element={<SVSVerifyProduct />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}