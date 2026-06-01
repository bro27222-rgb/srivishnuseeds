import React, { useEffect } from 'react'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Crops     from './components/Crops'
import Facilities from './components/Facilities'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

export default function App() {
  // Scroll-reveal observer
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
