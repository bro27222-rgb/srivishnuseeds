import React from 'react'
import { Leaf, Shield, TrendingUp, Heart } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    icon: Shield,
    title: 'Certified Quality',
    desc: 'Every seed batch is rigorously tested for germination rate, genetic purity, and disease resistance before it reaches your farm.',
  },
  {
    icon: TrendingUp,
    title: 'High-Yield Varieties',
    desc: 'Our seed varieties are developed to maximise productivity per acre, helping farmers achieve consistently superior harvests season after season.',
  },
  {
    icon: Heart,
    title: 'Farmer-First Philosophy',
    desc: 'Built by farmers, for farmers. We offer transparent pricing, expert agronomy guidance, and crop-specific support at every growth stage.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Agriculture',
    desc: 'We promote eco-conscious farming practices — choosing seed traits that reduce chemical dependency and preserve our precious soil health.',
  },
]

export default function About() {
  const [sectionRef, visible] = useReveal()

  return (
    <section id="about" className="py-24 md:py-32 bg-cream relative overflow-hidden">

      {/* ── Background Decorations ── */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-forest-50 opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-harvest-50 opacity-40 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}
      >

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <p className="font-accent text-earth-600 text-xs tracking-[0.3em] uppercase mb-3">
            Who We Are
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-forest-900 font-bold mb-6 heading-underline">
            Our Story
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-8 mb-8">
            <Leaf size={14} className="text-harvest-500 flex-shrink-0" />
          </div>
        </div>

        {/* ── Two-column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left: Visual Card */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              {/* Stylized farm landscape illustration */}
              <div
                className="w-full h-80 md:h-96"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 80%, rgba(74,158,74,0.6) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 30%, rgba(217,119,6,0.3) 0%, transparent 50%),
                    linear-gradient(180deg, #0b2d0e 0%, #174f19 30%, #2d7d2d 55%, #4a9e4a 75%, #8bc88b 90%, #c8e6c8 100%)
                  `,
                }}
              >
                {/* Abstract rice paddy rows */}
                <svg className="absolute bottom-0 w-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {[0,1,2,3,4,5].map(i => (
                    <ellipse
                      key={i}
                      cx={300}
                      cy={160 + i * 12}
                      rx={280 + i * 20}
                      ry={18}
                      fill={`rgba(18,${90 - i*8},18,0.4)`}
                    />
                  ))}
                  {/* Crop silhouettes */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={i}
                      x1={20 + i * 30}
                      y1={100}
                      x2={20 + i * 30}
                      y2={140}
                      stroke={`rgba(100,200,100,${0.4 + (i % 3) * 0.2})`}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {/* Sun */}
                <div className="absolute top-12 right-12 w-16 h-16 rounded-full"
                  style={{ background: 'radial-gradient(circle, #fcd34d 40%, rgba(251,191,36,0.3) 70%, transparent 100%)' }}
                />
              </div>

              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-forest-100">
                <div className="font-accent text-forest-700 text-xs tracking-[0.2em] uppercase mb-1">Established</div>
                <div className="font-display text-forest-900 text-2xl font-bold">1998 — Warangal, Telangana</div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -top-6 -right-6 bg-harvest-500 text-white rounded-2xl p-5 shadow-elegant hidden md:block">
              <div className="font-display text-3xl font-bold">25+</div>
              <div className="font-body text-harvest-100 text-xs mt-1 leading-tight">Years<br/>of Trust</div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-forest-900 font-bold leading-snug mb-6">
              A Trusted Seed Partner for{' '}
              <span className="text-gradient-green italic">Every Indian Farmer</span>
            </h3>

            <div className="space-y-4 font-body text-gray-600 text-base leading-relaxed">
              <p>
                Founded in the agricultural heartland of Telangana, <strong className="text-forest-700">Sri Vishnu Seeds Pvt. Ltd.</strong> has
                spent over two and a half decades nurturing India's farming community with seeds that don't just grow —
                they transform livelihoods.
              </p>
              <p>
                We operate with a singular conviction: that the quality of a seed determines the destiny of a harvest.
                From our processing facility in Karimnagar to farms across India, each seed we produce carries the
                promise of genetic purity, disease resistance, and maximum yield — tested, certified, and trusted.
              </p>
              <p>
                Our team of agronomists and seed scientists work year-round developing crop varieties attuned to
                India's diverse agro-climatic zones, ensuring every farmer — regardless of land size or region —
                has access to the best seeds available.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-forest-200 to-transparent" />
              <span className="font-accent text-forest-600 text-xs tracking-[0.25em] uppercase">जय किसान</span>
              <div className="h-px flex-1 bg-gradient-to-l from-forest-200 to-transparent" />
            </div>
          </div>
        </div>

        {/* ── Pillars Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className="card-lift bg-white rounded-2xl p-6 shadow-card border border-forest-50"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-100 to-forest-50 flex items-center justify-center mb-4 shadow-sm">
                <Icon size={22} className="text-forest-600" strokeWidth={1.5} />
              </div>
              <h4 className="font-display text-forest-900 font-semibold text-lg mb-2">{title}</h4>
              <p className="font-body text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
