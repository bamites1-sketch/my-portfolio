import { GitFork, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      padding: '3rem 1.5rem 2rem',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '200px', height: '1px',
        background: 'linear-gradient(90deg, transparent, #06b6d4, #10b981, transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1.5rem',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #06b6d4, #10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: '800', color: '#fff',
            }}>B</div>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Beamlak</span>
          </div>

          {/* Built with */}
          <p style={{
            fontSize: '0.85rem', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            Built with <Heart size={13} color="#ec4899" fill="#ec4899" /> by Beamlak · {new Date().getFullYear()}
          </p>

          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { icon: <GitFork size={16} />, href: 'https://github.com/bamites1-sketch' },
              { icon: <Mail size={16} />, href: 'mailto:Beamlaktesfahunn@gmail.com' },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'var(--input-bg)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--glow)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '2rem', paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          textAlign: 'center',
          fontSize: '0.78rem', color: 'var(--text-muted)',
        }}>
          © {new Date().getFullYear()} Beamlak · All rights reserved · Designed & built with passion
        </div>
      </div>
    </footer>
  )
}
