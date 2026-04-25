import { useState } from 'react'
import { motion } from 'framer-motion'
import RevealWrapper from './ui/RevealWrapper'

const CATEGORIES = {
  Frontend: [
    { name: 'React', icon: '⚛️', level: 80 },
    { name: 'JavaScript', icon: '🟨', level: 85 },
    { name: 'TypeScript', icon: '🔷', level: 65 },
    { name: 'HTML5', icon: '🌐', level: 90 },
    { name: 'CSS3', icon: '🎨', level: 85 },
    { name: 'Tailwind CSS', icon: '💨', level: 80 },
  ],
  Backend: [
    { name: 'Node.js', icon: '🟢', level: 70 },
    { name: 'Express.js', icon: '🚂', level: 70 },
    { name: 'Python', icon: '🐍', level: 65 },
    { name: 'Django', icon: '🎸', level: 55 },
    { name: 'REST APIs', icon: '🔌', level: 75 },
  ],
  Database: [
    { name: 'MongoDB', icon: '🍃', level: 70 },
    { name: 'MySQL', icon: '🐬', level: 65 },
    { name: 'PostgreSQL', icon: '🐘', level: 55 },
  ],
  Tools: [
    { name: 'Git', icon: '🔀', level: 80 },
    { name: 'GitHub', icon: '🐙', level: 80 },
    { name: 'VS Code', icon: '💙', level: 90 },
    { name: 'Figma', icon: '🎭', level: 60 },
    { name: 'Linux', icon: '🐧', level: 60 },
  ],
}

const CAT_COLORS = {
  Frontend: { from: '#06b6d4', to: '#22d3ee' },
  Backend:  { from: '#10b981', to: '#34d399' },
  Database: { from: '#f59e0b', to: '#fbbf24' },
  Tools:    { from: '#14b8a6', to: '#2dd4bf' },
}

function SkillCard({ skill, color, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <RevealWrapper delay={delay} direction="up">
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 12px 30px ${color.from}25` }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '1.25rem', borderRadius: '14px',
          background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          border: hovered ? `1px solid ${color.from}44` : '1px solid rgba(255,255,255,0.07)',
          transition: 'border 0.3s ease',
          cursor: 'default',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>{skill.name}</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: color.from }}>{skill.level}%</span>
        </div>
        <div style={{ height: '4px', borderRadius: '2px', background: 'var(--bg-card-hover)', overflow: 'hidden' }}>
          <motion.div
            style={{
              height: '100%', borderRadius: '2px',
              background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
              boxShadow: `0 0 8px ${color.from}88`,
            }}
            initial={{ width: '0%' }}
            animate={{ width: hovered ? `${skill.level}%` : '0%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </RevealWrapper>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend')

  return (
    <section id="skills" style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(6,182,212,0.05) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <RevealWrapper>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em', color: '#06b6d4', textTransform: 'uppercase' }}>
              Skills
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
              My <span className="gradient-text">Tech Stack</span>
            </h2>
          </div>
        </RevealWrapper>

        {/* Category tabs */}
        <RevealWrapper delay={100}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.keys(CATEGORIES).map(cat => {
              const color = CAT_COLORS[cat]
              const isActive = activeTab === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    padding: '0.6rem 1.5rem', borderRadius: '100px', border: 'none',
                    cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600',
                    transition: 'all 0.25s ease',
                    background: isActive ? `linear-gradient(135deg, ${color.from}, ${color.to})` : 'var(--input-bg)',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    boxShadow: isActive ? `0 0 20px ${color.from}44` : 'none',
                    border: isActive ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </RevealWrapper>

        {/* Skills grid */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {CATEGORIES[activeTab].map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={{ hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } }}
            >
              <SkillCard skill={skill} color={CAT_COLORS[activeTab]} delay={0} />
            </motion.div>
          ))}
        </motion.div>

        {/* All skills overview */}
        <RevealWrapper delay={200}>
          <div style={{
            marginTop: '4rem', padding: '2rem', borderRadius: '20px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
              Full Stack Overview
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
              {Object.values(CATEGORIES).flat().map(skill => (
                <span key={skill.name} style={{
                  padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem',
                  fontWeight: '500', color: 'var(--text-primary)',
                  background: 'var(--input-bg)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  transition: 'all 0.2s ease', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--glow)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                >
                  <span>{skill.icon}</span> {skill.name}
                </span>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
