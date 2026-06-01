import React from 'react'
import { Leaf, Phone, Mail, ArrowUp } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '#home'       },
  { label: 'About Us',   href: '#about'      },
  { label: 'Our Crops',  href: '#crops'      },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Contact',    href: '#contact'    },
]

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest-950 text-white relative overflow-hidden">
      {/* Top decorative strip */}
      <div className="h-1 w-full bg-gradient-to-r from-forest-700 via-harvest-500 to-forest-700" />

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")` }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center shadow-md flex-shrink-0">
                {/* Replace with: <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1" /> */}
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div className="leading-tight">
                <span className="font-accent text-sm font-semibold tracking-wide text-white block">Sri Vishnu Seeds</span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-body font-light text-harvest-400 block">Pvt. Ltd.</span>
              </div>
            </div>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
              Rooted in Telangana. Serving farmers across India with certified, high-yield seeds since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent text-xs tracking-[0.25em] uppercase text-harvest-400 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-harvest-600 group-hover:bg-harvest-400 transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <h4 className="font-accent text-xs tracking-[0.25em] uppercase text-harvest-400 mb-5">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 font-body text-sm text-white/60 hover:text-white transition-colors group">
                <Phone size={14} className="text-harvest-500 group-hover:text-harvest-400 transition-colors flex-shrink-0" strokeWidth={1.8} />
                +91 98765 43210
              </a>
              <a href="mailto:info@srivishnuseeds.in" className="flex items-center gap-3 font-body text-sm text-white/60 hover:text-white transition-colors group">
                <Mail size={14} className="text-harvest-500 group-hover:text-harvest-400 transition-colors flex-shrink-0" strokeWidth={1.8} />
                info@srivishnuseeds.in
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-body text-xs text-white/40 leading-relaxed">
                Hanamkonda District — 506 001<br />Telangana, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/35 text-center sm:text-left">
            © {year} Sri Vishnu Seeds Pvt. Ltd. All rights reserved. &nbsp;|&nbsp; ICAR Certified &nbsp;|&nbsp; Seeds Act Compliant
          </p>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-200 flex-shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
