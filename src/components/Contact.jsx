import React, { useState } from 'react'
import { Phone, Mail, MapPin, Send, Leaf, CheckCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const contactMethods = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    color: '#174f19',
    light: '#e0f0e0',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@srivishnu seeds.in',
    href: 'mailto:info@srivishnuseeds.in',
    color: '#8c581f',
    light: '#f2e8d8',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Hanamkonda, Telangana',
    href: 'https://maps.google.com',
    color: '#0e7490',
    light: '#e0f7ff',
  },
]

export default function Contact() {
  const [ref, visible] = useReveal()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-parchment relative overflow-hidden">

      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-700 via-harvest-500 to-forest-700 opacity-60" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(ellipse at 70% 30%, rgba(45,125,45,0.07) 0%, transparent 55%)` }} />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-10 reveal ${visible ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-accent text-earth-600 text-xs tracking-[0.3em] uppercase mb-3">Reach Out</p>
          <h2 className="font-display text-4xl md:text-5xl text-forest-900 font-bold mb-4 heading-underline">
            Get In Touch
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-8 mb-4">
            <Leaf size={14} className="text-harvest-500 flex-shrink-0" />
          </div>
          <p className="font-body text-gray-500 text-lg max-w-lg mx-auto mt-4 leading-relaxed">
            Whether you're a farmer, dealer, or distributor — we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/* Left: Contact methods */}
          <div className="space-y-5">
            {contactMethods.map(({ icon: Icon, label, value, href, color, light }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift flex items-center gap-5 bg-white rounded-2xl p-5 shadow-card border border-forest-50 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: light }}>
                  <Icon size={22} strokeWidth={1.6} style={{ color }} />
                </div>
                <div>
                  <p className="font-accent text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color }}>{label}</p>
                  <p className="font-body text-forest-900 font-semibold text-sm group-hover:text-forest-600 transition-colors">{value}</p>
                </div>
              </a>
            ))}

            {/* Quote block */}
            <div className="mt-6 bg-gradient-to-br from-forest-800 to-forest-950 rounded-2xl p-7 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Leaf size={64} className="text-white" />
              </div>
              <p className="font-display text-white/90 text-lg italic leading-relaxed mb-3">
                "Good seed is the first step to a good harvest."
              </p>
              <p className="font-accent text-harvest-300 text-xs tracking-[0.2em] uppercase">— Our Founding Philosophy</p>
            </div>
          </div>

          {/* Right: Enquiry form */}
          <div className="bg-white rounded-2xl p-8 shadow-card border border-forest-50">
            <h3 className="font-display text-forest-900 text-2xl font-bold mb-6">Send an Enquiry</h3>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle size={48} className="text-forest-500" strokeWidth={1.5} />
                <p className="font-display text-forest-800 text-xl font-semibold">Thank you!</p>
                <p className="font-body text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5 block">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the crops you're interested in..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3.5">
                  <Send size={15} />
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
