import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import profileImg from '../assets/profile.jpg'
import ThemeToggle from './ThemeToggle'

const links = ['About', 'Projects', 'Skills', 'Certificate', 'Stats', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
    setActive(id)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease-in-out',
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px',
      }}>
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden',
            boxShadow: '0 0 12px rgba(6,182,212,0.5)',
            border: '2px solid rgba(6,182,212,0.5)',
            flexShrink: 0,
          }}>
            <img
              src={profileImg}
              alt="Beamlak"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              onError={e => {
                e.target.style.display = 'none'
                e.target.parentNode.style.background = 'linear-gradient(135deg, #06b6d4, #10b981)'
                e.target.parentNode.style.display = 'flex'
                e.target.parentNode.style.alignItems = 'center'
                e.target.parentNode.style.justifyContent = 'center'
                e.target.parentNode.style.fontSize = '14px'
                e.target.parentNode.style.fontWeight = '800'
                e.target.parentNode.style.color = '#fff'
                e.target.parentNode.textContent = 'B'
              }}
            />
          </div>
          <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', transition: 'color 0.3s ease' }}>
            Beamlak
          </span>
        </a>

        {/* Desktop links + toggle */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden-mobile">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.5rem 1rem', borderRadius: '8px',
                fontSize: '0.875rem', fontWeight: '500',
                color: active === link ? 'var(--accent)' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { if (active !== link) e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { if (active !== link) e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {link}
            </button>
          ))}
          <div style={{ marginLeft: '0.5rem' }}>
            <ThemeToggle />
          </div>
          <button
            onClick={() => scrollTo('Contact')}
            className="glow-btn"
            style={{
              marginLeft: '0.75rem', padding: '0.5rem 1.25rem',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '0.875rem', fontWeight: '600', color: '#fff',
            }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile right side */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="show-mobile">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '1rem 1.5rem 1.5rem',
          transition: 'background 0.3s ease',
        }}>
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.75rem 0', fontSize: '1rem', fontWeight: '500',
                color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)',
                transition: 'color 0.2s ease',
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="glow-btn"
            style={{
              marginTop: '1rem', width: '100%', padding: '0.75rem',
              borderRadius: '10px', border: 'none', cursor: 'pointer',
              fontSize: '0.9rem', fontWeight: '600', color: '#fff',
            }}
          >
            Hire Me
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
