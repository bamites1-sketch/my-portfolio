import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, GitFork, Send, CheckCircle, MapPin, MessageSquare } from 'lucide-react'
import RevealWrapper from './ui/RevealWrapper'

const EMAIL = 'Beamlaktesfahunn@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
    background: focused === name ? 'rgba(6,182,212,0.08)' : 'var(--input-bg)',
    border: focused === name ? '1px solid rgba(6,182,212,0.5)' : '1px solid var(--border)',
    color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
    transition: 'all 0.25s ease', fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  })

  const contacts = [
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      color: '#06b6d4',
    },
    {
      icon: <GitFork size={18} />,
      label: 'GitHub',
      value: 'bamites1-sketch',
      href: 'https://github.com/bamites1-sketch',
      color: '#10b981',
    },
    {
      icon: <span style={{ fontSize: '15px' }}>✈️</span>,
      label: 'Telegram',
      value: '@BAM3_6',
      href: 'https://t.me/BAM3_6',
      color: '#22d3ee',
    },
    {
      icon: <MapPin size={18} />,
      label: 'Location',
      value: 'Kombolcha, Ethiopia',
      href: 'https://maps.google.com/?q=Kombolcha,Ethiopia',
      color: '#14b8a6',
    },
  ]

  return (
    <section id="contact" style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(6,182,212,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <RevealWrapper>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.15em', color: '#06b6d4', textTransform: 'uppercase' }}>
              Contact
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
              Let's <span className="gradient-text">work together</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1rem', maxWidth: '480px', margin: '0.75rem auto 0' }}>
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>
        </RevealWrapper>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem', alignItems: 'start',
        }}>
          {/* Left: Info */}
          <RevealWrapper direction="left" delay={100}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Beamlak Tesfahun
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                Full-Stack Developer · 3rd Year Software Engineering
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                Wollo University, Kombolcha
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem', fontSize: '0.95rem' }}>
                I'm currently open to internships, freelance projects, and full-time opportunities.
                Whether you have a question or just want to say hi — my inbox is always open.
              </p>

              <motion.div
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {contacts.map(({ icon, label, value, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
                    whileHover={{ x: 6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '0.875rem 1rem', borderRadius: '12px', textDecoration: 'none',
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${color}55`
                      e.currentTarget.style.background = `${color}0d`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'var(--bg-card)'
                    }}
                  >
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: `${color}18`, border: `1px solid ${color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '1px' }}>{label}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{value}</div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </RevealWrapper>

          {/* Right: Form */}
          <RevealWrapper direction="right" delay={200}>
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '2rem', borderRadius: '20px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <MessageSquare size={18} color="#06b6d4" />
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Send a message</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px' }}>Your Name</label>
                  <input type="text" placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    required style={inputStyle('name')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    required style={inputStyle('email')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px' }}>Message</label>
                  <textarea placeholder="Tell me about your project..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    required rows={5}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(6,182,212,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="glow-btn w-full py-3.5 rounded-xl border-none cursor-pointer
                             text-sm font-semibold text-white
                             flex items-center justify-center gap-2"
                >
                  {sent ? <><CheckCircle size={16} /> Message Sent!</> : <><Send size={16} /> Send Message</>}
                </motion.button>
              </div>
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}