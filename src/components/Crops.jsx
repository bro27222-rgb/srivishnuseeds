import React, { useState } from 'react'
import { CheckCircle, Zap, Shield, X, Sprout, ChevronDown } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

// Local crop images — place these files in your /public folder (or src/assets and import them)
import bajraImg    from '../assets/BAJRA.jpeg'
import jowarImg    from '../assets/JOWAR.jpeg'
import maizeImg    from '../assets/MAIZE.jpeg'
import paddyImg    from '../assets/PADDY.jpeg'
import sunflowerImg from '../assets/SUNFLOWER.jpeg'

const crops = [
  {
    id: 'paddy',
    name: 'Paddy',
    hindi: 'धान',
    tagline: 'Rice of Premium Purity',
    image: paddyImg,
    color: { light: '#e0f7ff', text: '#0c4a6e', accent: '#0e7490' },
    bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0e7490 40%, #0891b2 70%, #38bdf8 100%)',
    yieldStat: '7–9 Tonnes/Acre',
    features: ['Blast Disease Resistant', 'High Milling Quality', 'Medium Slender Grain', 'Suitable for Wetlands'],
    desc: 'Our Paddy varieties combine fine-grain eating quality with robust agronomic traits — bred for resistance against neck blast and sheath blight, the two biggest threats to rice cultivation in India.',
    varieties: ['Moksha', 'Akarsha', 'Kamakshi'],
  },
  {
    id: 'maize',
    name: 'Maize',
    hindi: 'मक्का',
    tagline: 'The Golden Grain',
    image: maizeImg,
    color: { light: '#fef3c7', text: '#92400e', accent: '#d97706' },
    bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 40%, #d97706 70%, #fbbf24 100%)',
    yieldStat: '9–11 Tonnes/Acre',
    features: ['High Germination Rate (95%+)', 'Drought-Tolerant Hybrids', 'Disease Resistant', 'Kharif & Rabi Suitable'],
    desc: 'Engineered for exceptional stalk strength and ear fill, our Maize hybrids deliver superior resistance against turcicum leaf blight and northern corn leaf blight.',
    varieties: ['Tejas', 'Saanvi', 'Amogha', 'Bansi', 'Ujjvala'],
  },
  {
    id: 'jowar',
    name: 'Jowar',
    hindi: 'ज्वार',
    tagline: 'Sorghum Heritage',
    image: jowarImg,
    color: { light: '#fce7f3', text: '#831843', accent: '#be185d' },
    bgGradient: 'linear-gradient(135deg, #831843 0%, #be185d 40%, #ec4899 70%, #f9a8d4 100%)',
    yieldStat: '4–6 Tonnes/Acre',
    features: ['Drought Hardy', 'Dual-Purpose Grain & Fodder', 'Open-Pollinated', 'Low Water Requirement'],
    desc: 'A cornerstone of dryland farming, our Jowar varieties are adapted to India\'s semi-arid regions with exceptional drought tolerance and dual utility as both grain and high-quality fodder.',
    varieties: ['Vasista'],
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    hindi: 'सूरजमुखी',
    tagline: 'Golden Oilseed',
    image: sunflowerImg,
    color: { light: '#fefce8', text: '#713f12', accent: '#ca8a04' },
    bgGradient: 'linear-gradient(135deg, #713f12 0%, #a16207 40%, #ca8a04 70%, #fde047 100%)',
    yieldStat: '1.5–2 Tonnes/Acre',
    features: ['High Oil Content (42–44%)', 'Downy Mildew Tolerant', 'Uniform Maturity', 'Good Head Size'],
    desc: 'Our Sunflower hybrids are bred for high oil content and uniform head formation. With broad adaptability across soil types, these varieties are a profitable choice for oilseed rotation.',
    varieties: ['Aditya', 'Mitra'],
  },
  {
    id: 'bajra',
    name: 'Bajra',
    hindi: 'बाजरा',
    tagline: 'Pearl Millet Excellence',
    image: bajraImg,
    color: { light: '#e0f0e0', text: '#0b2d0e', accent: '#2d7d2d' },
    bgGradient: 'linear-gradient(135deg, #0b2d0e 0%, #174f19 40%, #2d7d2d 70%, #4a9e4a 100%)',
    yieldStat: '3–4 Tonnes/Acre',
    features: ['Downy Mildew Resistant', 'Heat & Drought Tolerant', 'Short Duration (75–85 days)', 'High Protein Content'],
    desc: 'Built for India\'s arid and semi-arid zones, our Bajra hybrids are champions of resilience — thriving in the heat where other crops struggle.',
    varieties: ['Sindhu'],
  },
]

function VarietiesModal({ crop, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header image strip */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="font-display text-white/50 text-lg italic mr-2">{crop.hindi}</span>
              <h3 className="font-display text-white text-3xl font-bold">{crop.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Varieties list */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sprout size={15} style={{ color: crop.color.accent }} />
            <p className="font-accent text-xs tracking-[0.25em] uppercase font-semibold" style={{ color: crop.color.accent }}>
              Available Varieties
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {crop.varieties.map((v, i) => (
              <div
                key={v}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 border"
                style={{
                  backgroundColor: crop.color.light,
                  borderColor: crop.color.accent + '33',
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <CheckCircle size={13} style={{ color: crop.color.accent }} className="flex-shrink-0" />
                <span className="font-body font-semibold text-sm" style={{ color: crop.color.text }}>{v}</span>
              </div>
            ))}
          </div>

          <p className="font-body text-gray-500 text-xs mt-5 leading-relaxed text-center">
            Contact us for seed availability, pricing, and agronomy guidance.
          </p>
        </div>
      </div>
    </div>
  )
}

function CropCard({ crop, onClick }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer card-lift border border-white/80 shadow-card"
      onClick={onClick}
    >
      {/* Crop photograph */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}
        />

        {/* Yield badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
          <Zap size={11} style={{ color: crop.color.accent }} />
          <span className="font-body text-xs font-bold text-forest-700">{crop.yieldStat}</span>
        </div>

        {/* Hindi name */}
        <div className="absolute bottom-4 left-4">
          <span className="font-display text-white/60 text-2xl italic drop-shadow">{crop.hindi}</span>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-accent text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: crop.color.accent }}>
              {crop.tagline}
            </p>
            <h3 className="font-display text-forest-900 text-xl font-bold">{crop.name}</h3>
          </div>
          <div
            className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110"
            style={{ backgroundColor: crop.color.light }}
          >
            <ChevronDown size={14} style={{ color: crop.color.accent }} />
          </div>
        </div>

        <p className="font-body text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {crop.desc}
        </p>

        {/* Varieties count pill + CTA */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold"
            style={{ backgroundColor: crop.color.light, color: crop.color.text }}
          >
            <Sprout size={10} />
            {crop.varieties.length} {crop.varieties.length === 1 ? 'Variety' : 'Varieties'}
          </span>
          <span
            className="font-body text-xs font-semibold underline-offset-2 group-hover:underline transition-all"
            style={{ color: crop.color.accent }}
          >
            View varieties →
          </span>
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
  const [activeCrop, setActiveCrop] = useState(null)

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
          <p className="font-body text-gray-400 text-sm mt-2">
            Tap any crop to explore available seed varieties.
          </p>
        </div>

        {/* Crops Grid — 5 cards, wraps nicely on all screen sizes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-7">
          {crops.map((crop, i) => (
            <div
              key={crop.id}
              style={{ animation: `fadeUp 0.7s ease ${i * 0.12}s both` }}
            >
              <CropCard crop={crop} onClick={() => setActiveCrop(crop)} />
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

      {/* Varieties Modal */}
      {activeCrop && (
        <VarietiesModal crop={activeCrop} onClose={() => setActiveCrop(null)} />
      )}
    </section>
  )
}