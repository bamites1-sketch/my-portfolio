import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import HackathonCertificate from './components/HackathonCertificate'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

function Loader() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1.5rem',
    }}>
      <div style={{
        width: '50px', height: '50px', borderRadius: '14px',
        background: 'linear-gradient(135deg, #06b6d4, #10b981)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px', fontWeight: '900', color: '#fff',
        boxShadow: '0 0 40px rgba(6,182,212,0.5)',
        animation: 'pulse-glow 1.5s ease-in-out infinite',
      }}>B</div>
      <div style={{
        width: '120px', height: '2px', borderRadius: '1px',
        background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: '1px',
          background: 'linear-gradient(90deg, #06b6d4, #10b981)',
          animation: 'loading-bar 1.2s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;  margin-left: 0; }
          50%  { width: 80%; margin-left: 0; }
          100% { width: 0%;  margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {loading && <Loader />}
      <ScrollProgress />
      <div style={{
        opacity: loading ? 0 : 1,
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        transition: 'opacity 0.6s ease, background-color 0.3s ease-in-out',
      }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <HackathonCertificate />
          <GitHubStats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
