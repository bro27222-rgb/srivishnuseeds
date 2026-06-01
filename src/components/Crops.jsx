import React, { useState } from 'react'
import { Sprout, CheckCircle, ChevronRight, Zap, Shield } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const crops = [
  {
    id: 'maize',
    name: 'Maize',
    hindi: 'मक्का',
    tagline: 'The Golden Grain',
    color: { from: '#f59e0b', to: '#d97706', light: '#fef3c7', text: '#92400e' },
    bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 40%, #d97706 70%, #fbbf24 100%)',
    yieldStat: '9–11 Tonnes/Acre',
    features: ['High Germination Rate (95%+)', 'Drought-Tolerant Hybrids', 'Disease Resistant', 'Suitable for Kharif & Rabi'],
    desc: 'Our Maize varieties are engineered for exceptional stalk strength and ear fill. With superior disease resistance against turcicum leaf blight and northern corn leaf blight, our hybrids consistently deliver 9–11 tonnes per acre under optimal conditions.',
    icon: '🌽',
  },
  {
    id: 'bajra',
    name: 'Bajra',
    hindi: 'बाजरा',
    tagline: 'Pearl Millet Excellence',
    color: { from: '#2d7d2d', to: '#174f19', light: '#e0f0e0', text: '#0b2d0e' },
    bgGradient: 'linear-gradient(135deg, #0b2d0e 0%, #174f19 40%, #2d7d2d 70%, #4a9e4a 100%)',
    yieldStat: '3–4 Tonnes/Acre',
    features: ['Downy Mildew Resistant', 'Heat & Drought Tolerant', 'Short Duration (75–85 days)', 'High Protein Content'],
    desc: 'Built for India\'s arid and semi-arid zones, our Bajra hybrids are champions of resilience. With inherent resistance to downy mildew — the most destructive Bajra pathogen — and exceptional heat tolerance, they thrive where other crops struggle.',
    icon: '🌾',
  },
  {
    id: 'paddy',
    name: 'Paddy',
    hindi: 'धान',
    tagline: 'Rice of Premium Purity',
    color: { from: '#0e7490', to: '#0c4a6e', light: '#e0f7ff', text: '#0c4a6e' },
    bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0e7490 40%, #0891b2 70%, #38bdf8 100%)',
    yieldStat: '7–9 Tonnes/Acre',
    features: ['Blast Disease Resistant', 'High Milling Quality', 'Medium Slender Grain', 'Suitable for Wetlands'],
    desc: 'Our Paddy varieties combine the fine-grain eating quality demanded by today\'s consumer market with the robust agronomic traits needed in the field. Bred for resistance against neck blast and sheath blight — the two biggest threats to rice cultivation in India.',
    icon: '🌿',
  },
  {
    id: 'native',
    name: 'Native Indian Crops',
    hindi: 'देशी फसलें',
    tagline: 'Heritage Seed Varieties',
    color: { from: '#7c3aed', to: '#4c1d95', light: '#ede9fe', text: '#4c1d95' },
    bgGradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 40%, #7c3aed 70%, #a78bfa 100%)',
    yieldStat: 'Region-Specific',
    features: ['Heirloom & Open-Pollinated', 'Adapted to Local Conditions', 'Sorghum, Jowar, Foxtail Millet', 'Chemical-Free Cultivation Ready'],
    desc: 'India\'s agricultural heritage is priceless. Our collection of native open-pollinated varieties — including Sorghum (Jowar), Foxtail Millet (Kangni), Finger Millet (Ragi), and traditional Kharif pulses — preserves genetic diversity while offering outstanding adaptability.',
    icon: '🌱',
  },
]

function CropCard({ crop }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer card-lift border border-white/80 shadow-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top image/visual area */}
      <div className="relative h-52 overflow-hidden" style={{ background: crop.bgGradient }}>
        {/* Abstract pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={50 + i * 50}
              cy={100 + Math.sin(i) * 40}
              r={20 + i * 5}
              fill="white"
              opacity={0.3 - i * 0.03}
            />
          ))}
        </svg>

        {/* Crop emoji / icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110 transform transition-transform select-none">
            {crop.icon}
          </span>
        </div>

        {/* Yield badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
          <Zap size={11} className="text-harvest-600" />
          <span className="font-body text-xs font-bold text-forest-700">{crop.yieldStat}</span>
        </div>

        {/* Hindi name */}
        <div className="absolute bottom-4 left-4">
          <span className="font-display text-white/40 text-2xl italic">{crop.hindi}</span>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-accent text-xs tracking-[0.2em] uppercase mb-1" style={{ color: crop.color.text }}>
              {crop.tagline}
            </p>
            <h3 className="font-display text-forest-900 text-2xl font-bold">{crop.name}</h3>
          </div>
          <ChevronRight
            size={20}
            className="text-gray-300 group-hover:text-forest-500 transition-colors mt-1 flex-shrink-0"
          />
        </div>

        <p className="font-body text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {crop.desc}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2">
          {crop.features.slice(0, 3).map(f => (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-semibold"
              style={{ backgroundColor: crop.color.light, color: crop.color.text }}
            >
              <CheckCircle size={10} />
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: crop.bgGradient }}
      />
    </div>
  )
}

export default function Crops() {
  const [sectionRef, visible] = useReveal()

  return (
    <section id="crops" className="py-24 md:py-32 bg-parchment relative overflow-hidden">

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 80% 50%, rgba(217,119,6,0.06) 0%, transparent 60%),
                          radial-gradient(circle at 20% 80%, rgba(45,125,45,0.08) 0%, transparent 50%)`,
      }} />

      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-earth-600 text-xs tracking-[0.3em] uppercase mb-3">
            Seed Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-forest-900 font-bold mb-4 heading-underline">
            Our Crops
          </h2>
          <p className="font-body text-gray-500 text-lg max-w-xl mx-auto mt-8 leading-relaxed">
            Carefully bred, scientifically tested, and field-proven varieties
            designed for the unique soil and climate conditions of Indian agriculture.
          </p>
        </div>

        {/* Crops Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {crops.map((crop, i) => (
            <div
              key={crop.id}
              style={{ animation: `fadeUp 0.7s ease ${i * 0.12}s both` }}
            >
              <CropCard crop={crop} />
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-card border border-forest-50">
            <Shield size={15} className="text-forest-500" />
            <span className="font-body text-sm text-gray-600">
              All varieties are <strong className="text-forest-700">ICAR certified</strong> and compliant with the Seeds Act of India
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
