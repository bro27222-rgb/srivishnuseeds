import React, { useEffect, useRef } from 'react'
import { ArrowDown, Sprout, Award, Users } from 'lucide-react'

const stats = [
  { icon: Award,   value: '25+', label: 'Years of Excellence' },
  { icon: Sprout,  value: '50+', label: 'Crop Varieties'      },
  { icon: Users,   value: '1L+', label: 'Farmers Served'      },
]

export default function Hero() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const y = window.scrollY
      parallaxRef.current.style.transform = `translateY(${y * 0.4}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToProducts = () => {
    const el = document.getElementById('crops')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Parallax Background ── */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-110"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(45,125,45,0.45) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(217,119,6,0.25) 0%, transparent 50%),
            linear-gradient(160deg,
              #0b2d0e 0%,
              #113d14 25%,
              #1e4d10 45%,
              #2a4a08 65%,
              #3d3808 80%,
              #4a3005 100%
            )
          `,
        }}
      />

      {/* ── SVG Field Silhouette ── */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-20 pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,200 C120,140 240,260 360,200 C480,140 600,220 720,180 C840,140 960,240 1080,180 C1200,120 1320,220 1440,160 L1440,320 L0,320 Z"
          fill="#4a9e4a"
        />
        <path
          d="M0,240 C180,180 360,280 540,230 C720,180 900,270 1080,220 C1260,170 1380,240 1440,210 L1440,320 L0,320 Z"
          fill="#2d7d2d"
        />
      </svg>

      {/* ── Floating Decorative Circles ── */}
      <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full border border-harvest-400/20 animate-float pointer-events-none" />
      <div className="absolute top-1/3 right-20 w-40 h-40 rounded-full border border-harvest-400/10 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/4 left-16 w-24 h-24 rounded-full bg-harvest-400/8 animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* ── Grain Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16">
        <div className="max-w-3xl">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}
          >
            <span className="w-2 h-2 rounded-full bg-harvest-400 animate-pulse" />
            <span className="font-body text-xs text-white/90 tracking-[0.15em] uppercase font-semibold">
              Trusted by Indian Farmers Since 1998
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-white mb-2"
            style={{ animation: 'fadeUp 0.7s ease 0.2s both' }}
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              Cultivating
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              India's{' '}
              <span className="text-gradient-gold italic">Future.</span>
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="mt-6 text-lg md:text-xl text-white/75 font-body font-light leading-relaxed max-w-xl"
            style={{ animation: 'fadeUp 0.7s ease 0.35s both' }}
          >
            Premium quality seeds for a bountiful harvest and sustainable farming —
            rooted in the heart of Telangana, reaching every corner of India.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4 mt-10"
            style={{ animation: 'fadeUp 0.7s ease 0.5s both' }}
          >
            <button onClick={scrollToProducts} className="btn-primary text-sm px-7 py-3.5 shadow-hero">
              <Sprout size={16} strokeWidth={2} />
              Explore Our Seeds
            </button>
            <a
              href="#about"
              onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-outline text-sm px-7 py-3.5"
            >
              Our Story
            </a>
          </div>

          {/* Divider */}
          <div
            className="mt-16 w-24 h-px bg-gradient-to-r from-harvest-400 via-harvest-300 to-transparent"
            style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}
          />
        </div>

        {/* ── Stats Bar ── */}
        <div
          className="mt-12 flex flex-wrap gap-6 md:gap-12"
          style={{ animation: 'fadeUp 0.7s ease 0.7s both' }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:bg-harvest-500/20 transition-colors duration-300">
                <Icon size={18} className="text-harvest-300" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-display text-white text-xl font-bold leading-none">{value}</div>
                <div className="font-body text-white/60 text-xs mt-0.5 tracking-wide">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-70">
        <span className="font-body text-white/60 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown size={16} className="text-white/60 animate-bounce" />
      </div>

      {/* ── Bottom Wave ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
    </section>
  )
}
