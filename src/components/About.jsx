import RevealWrapper from './ui/RevealWrapper'
import { ParallaxWrapper } from './ui/RevealWrapper'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Heart, Code2 } from 'lucide-react'
import profileImg from '../assets/profile.jpg'

const techStack = [
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'Tailwind', icon: '🎨', color: '#38bdf8' },
  { name: 'MongoDB', icon: '🍃', color: '#47a248' },
  { name: 'MySQL', icon: '🐬', color: '#4479a1' },
  { name: 'Git', icon: '🔀', color: '#f05032' },
  { name: 'VS Code', icon: '💙', color: '#007acc' },
  { name: 'Express', icon: '🚂', color: '#ffffff' },
  { name: 'HTML/CSS', icon: '🌐', color: '#e34f26' },
]

const highlights = [
  { icon: <GraduationCap size={16} />, text: '3rd Year Software Engineering @ Wollo University, Kombolcha' },
  { icon: <MapPin size={16} />, text: 'Kombolcha, Ethiopia' },
  { icon: <Heart size={16} />, text: 'Passionate about UI/UX & Modern Web' },
  { icon: <Code2 size={16} />, text: 'Full-Stack Development Focus' },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      {/* Subtle background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Section label */}
        <RevealWrapper>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em',
              color: '#06b6d4', textTransform: 'uppercase',
            }}>About Me</span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800',
              letterSpacing: '-0.03em', marginTop: '0.5rem', color: 'var(--text-primary)',
            }}>
              The developer <span className="gradient-text">behind the code</span>
            </h2>
          </div>
        </RevealWrapper>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem', alignItems: 'center',
        }}>
          {/* Left: Text */}
          <RevealWrapper direction="left" delay={100}>
            <div>
              <p style={{
                fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
              }}>
                I'm <strong style={{ color: 'var(--text-primary)' }}>Beamlak Tesfahun</strong>, a passionate full-stack developer and 3rd year software engineering student at{' '}
                <strong style={{ color: '#6ee7b7' }}>Wollo University, Kombolcha</strong>, Ethiopia. I love
                building beautiful, functional, and impactful web applications.
              </p>
              <p style={{
                fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}>
                My journey in tech is driven by curiosity and a desire to create. I specialize in
                full-stack development with a strong eye for design — bridging the gap between
                engineering and user experience.
              </p>

              {/* Highlights */}
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {highlights.map(({ icon, text }) => (
                  <motion.div
                    key={text}
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'var(--accent-soft)', border: '1px solid rgba(6,182,212,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#6ee7b7', flexShrink: 0,
                      }}
                    >
                      {icon}
                    </motion.div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </RevealWrapper>

          {/* Right: Card */}
          <RevealWrapper direction="right" delay={200}>
            <ParallaxWrapper speed={0.25}>
            <div style={{
              borderRadius: '20px', padding: '2rem',
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}>
              {/* Avatar area */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%',
                  margin: '0 auto 1rem', position: 'relative',
                  boxShadow: '0 0 0 3px rgba(6,182,212,0.5), 0 0 30px rgba(6,182,212,0.3)',
                }}>
                  <img
                    src={profileImg}
                    alt="Beamlak"
                    style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      objectFit: 'cover', objectPosition: 'top',
                      display: 'block',
                    }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.parentNode.style.background = 'linear-gradient(135deg, #06b6d4, #10b981)'
                      e.target.parentNode.innerHTML += '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;color:#fff">B</span>'
                    }}
                  />
                </div>
                <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Beamlak</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  💻 Full-Stack Developer · 3rd Year SE Student
                </div>
              </div>

              {/* Stats row */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1px', background: 'var(--bg-card-hover)',
                borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem',
              }}>
                {[
                  { label: 'Projects', value: '3+' },
                  { label: 'Commits', value: '50+' },
                  { label: 'Learning', value: '∞' },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    padding: '1rem', textAlign: 'center',
                    background: 'rgba(10,10,15,0.6)',
                  }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#6ee7b7' }}>{value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {techStack.slice(0, 8).map(({ name, icon }) => (
                  <span key={name} style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem',
                    fontWeight: '500', color: 'var(--text-primary)',
                    background: 'var(--bg-card-hover)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    transition: 'all 0.2s ease', cursor: 'default',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--glow)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  >
                    <span>{icon}</span> {name}
                  </span>
                ))}
              </div>
            </div>
            </ParallaxWrapper>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
