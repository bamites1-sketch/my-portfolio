import { useGitHubProfile, useGitHubRepos } from '../hooks/useGitHub'
import RevealWrapper from './ui/RevealWrapper'
import { motion } from 'framer-motion'
import { GitBranch, Users, BookOpen, Star, TrendingUp } from 'lucide-react'

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3776ab',
  HTML: '#e34f26', CSS: '#1572b6', Java: '#ed8b00',
}

function StatCard({ icon, label, value, color, delay }) {
  return (
    <RevealWrapper delay={delay} direction="up">
      <div style={{
        padding: '1.5rem', borderRadius: '16px',
        background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)', transition: 'all 0.3s ease',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.borderColor = `${color}44`
          e.currentTarget.style.boxShadow = `0 16px 40px ${color}22`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: `${color}18`, border: `1px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1rem', color,
        }}>
          {icon}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          {value}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{label}</div>
      </div>
    </RevealWrapper>
  )
}

export default function GitHubStats() {
  const { data: profile } = useGitHubProfile()
  const { repos } = useGitHubRepos()

  // Compute language distribution
  const langCount = {}
  repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1 })
  const totalLang = Object.values(langCount).reduce((a, b) => a + b, 0)
  const langs = Object.entries(langCount).sort((a, b) => b[1] - a[1])

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0)

  const stats = [
    { icon: <BookOpen size={20} />, label: 'Public Repos',  value: profile?.public_repos ?? '—', color: '#06b6d4' },
    { icon: <Users size={20} />,    label: 'Followers',     value: profile?.followers ?? '—',    color: '#10b981' },
    { icon: <Star size={20} />,     label: 'Total Stars',   value: totalStars,                   color: '#f59e0b' },
    { icon: <TrendingUp size={20} />,label: 'Following',    value: profile?.following ?? '—',    color: '#14b8a6' },
  ]

  return (
    <section id="stats" style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 70% 40%, rgba(16,185,129,0.05) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <RevealWrapper>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em', color: '#06b6d4', textTransform: 'uppercase' }}>
              GitHub Stats
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
              By the <span className="gradient-text">numbers</span>
            </h2>
          </div>
        </RevealWrapper>

        {/* Stat cards */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } }}
            >
              <StatCard {...s} delay={0} />
            </motion.div>
          ))}
        </motion.div>

        {/* Language distribution */}
        {langs.length > 0 && (
          <RevealWrapper delay={200}>
            <div style={{
              padding: '2rem', borderRadius: '20px',
              background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <GitBranch size={16} color="#06b6d4" />
                <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Most Used Languages</span>
              </div>

              {/* Bar chart */}
              <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                {langs.map(([lang, count]) => (
                  <div
                    key={lang}
                    style={{
                      width: `${(count / totalLang) * 100}%`,
                      background: LANG_COLORS[lang] || '#06b6d4',
                      transition: 'width 1s ease',
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {langs.map(([lang, count]) => (
                  <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: LANG_COLORS[lang] || '#06b6d4',
                    }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{lang}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {Math.round((count / totalLang) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}


      </div>
    </section>
  )
}
