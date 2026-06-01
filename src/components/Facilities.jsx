import React from 'react'
import { MapPin, Building2, Warehouse, Leaf } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const facilities = [
  {
    type: 'Registered Office',
    icon: Building2,
    accentColor: '#174f19',
    lightColor: '#e0f0e0',
    lines: [
      'M/s Sri Vishnu Seeds Pvt. Ltd.',
      '2/4/1247/4/3/A/A/1, Tulasi Road',
      'Vajpayee Colony, Hanamkonda',
      'Warangal District — 506 001',
      'Telangana, India',
    ],
    badge: 'Head Office',
  },
  {
    type: 'Processing & Storage Unit',
    icon: Warehouse,
    accentColor: '#8c581f',
    lightColor: '#f2e8d8',
    lines: [
      'M/s Sri Vishnu Seeds Pvt. Ltd.',
      'C/o Parameshwara Seeds',
      '1-91, KC Camp Road, Ippala Narsingapur',
      'Huzurabad (V & M)',
      'Karimnagar District — 505 468',
      'Telangana, India',
    ],
    badge: 'Processing Unit',
  },
]

export default function Facilities() {
  const [ref, visible] = useReveal()

  return (
    <section id="facilities" className="py-24 md:py-32 bg-cream relative overflow-hidden">

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: `radial-gradient(circle at 10% 20%, rgba(23,79,25,0.07) 0%, transparent 55%), radial-gradient(circle at 90% 80%, rgba(140,88,31,0.06) 0%, transparent 55%)` }} />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-earth-600 text-xs tracking-[0.3em] uppercase mb-3">Infrastructure</p>
          <h2 className="font-display text-4xl md:text-5xl text-forest-900 font-bold mb-4 heading-underline">
            Our Facilities
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-8 mb-4">
            <Leaf size={14} className="text-harvest-500 flex-shrink-0" />
          </div>
          <p className="font-body text-gray-500 text-lg max-w-lg mx-auto mt-4 leading-relaxed">
            State-of-the-art seed processing and storage infrastructure — built to uphold the highest standards of quality.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {facilities.map(({ type, icon: Icon, accentColor, lightColor, lines, badge }) => (
            <div
              key={type}
              className="card-lift relative bg-white rounded-2xl overflow-hidden shadow-card border border-forest-50 group"
            >
              {/* Top accent strip */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }} />

              <div className="p-8">
                {/* Badge + Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: lightColor }}
                  >
                    <Icon size={26} strokeWidth={1.5} style={{ color: accentColor }} />
                  </div>
                  <span
                    className="font-accent text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-semibold"
                    style={{ backgroundColor: lightColor, color: accentColor }}
                  >
                    {badge}
                  </span>
                </div>

                {/* Type label */}
                <h3 className="font-display text-forest-900 text-xl font-bold mb-5">{type}</h3>

                {/* Address */}
                <div className="flex gap-3">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: accentColor }} strokeWidth={1.8} />
                  <address className="not-italic font-body text-gray-600 text-sm leading-7 space-y-0">
                    {lines.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </address>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 0 1.5px ${accentColor}33` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
