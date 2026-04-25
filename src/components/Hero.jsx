import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Mail, ArrowDown, Sparkles, Zap, GitFork } from 'lucide-react'
import profileImg from '../assets/profile.jpg'
import { staggerContainer } from '../utils/animations'

const TYPED_STRINGS = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  '3rd Year Software Engineering Student',
  'Problem Solver',
]

function TypedText() {
  const [index, setIndex]         = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = TYPED_STRINGS[index]
    let t
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 2000)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    else { setDeleting(false); setIndex((index + 1) % TYPED_STRINGS.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, index])

  return (
    <span className="text-emerald-500 dark:text-emerald-400">
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-emerald-500 dark:bg-emerald-400
                       ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
    </span>
  )
}

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Parallax on scroll — blobs drift at different speeds
  const { scrollY } = useScroll()
  const blob1Y = useSpring(useTransform(scrollY, [0, 600], [0, -80]),  { stiffness: 80, damping: 30, mass: 0.5 })
  const blob2Y = useSpring(useTransform(scrollY, [0, 600], [0, -50]),  { stiffness: 80, damping: 30, mass: 0.5 })
  const blob3Y = useSpring(useTransform(scrollY, [0, 600], [0, -30]),  { stiffness: 80, damping: 30, mass: 0.5 })
  const contentY = useSpring(useTransform(scrollY, [0, 400], [0, -40]), { stiffness: 100, damping: 35, mass: 0.5 })
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6
                 bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors duration-300"
    >
      {/* ── Background blobs with parallax ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: blob1Y }}
          className="animate-blob1 absolute top-[8%] left-[10%] w-[520px] h-[520px] rounded-full
                     bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] blur-[50px]" />
        <motion.div style={{ y: blob2Y }}
          className="animate-blob2 absolute top-[35%] right-[5%] w-[420px] h-[420px] rounded-full
                     bg-[radial-gradient(circle,rgba(16,185,129,0.10)_0%,transparent_70%)] blur-[50px]" />
        <motion.div style={{ y: blob3Y }}
          className="animate-blob3 absolute bottom-[8%] left-[38%] w-[360px] h-[360px] rounded-full
                     bg-[radial-gradient(circle,rgba(20,184,166,0.08)_0%,transparent_70%)] blur-[50px]" />
        <div className="absolute inset-0
                        [background-image:linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)]
                        dark:[background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
                        [background-size:60px_60px]" />
      </div>

      <FloatingCode />

      {/* ── Main content — fades + rises as you scroll away ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-3xl text-center"
        variants={staggerContainer(0.12, 0.2)}
        initial="hidden"
        animate="visible"
      >
        {/* Profile image */}
        <motion.div
          className="flex justify-center mb-7"
          variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full
                            bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-500
                            opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-300" />
            <motion.img
              src={profileImg}
              alt="Beamlak"
              whileHover={{ scale: 1.07 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover object-top
                         border-[3px] border-cyan-400 dark:border-cyan-500
                         shadow-[0_0_0_4px_rgba(6,182,212,0.2)]
                         hover:shadow-[0_0_32px_rgba(6,182,212,0.5)]
                         transition-shadow duration-300
                         animate-[float_4s_ease-in-out_infinite]"
              onError={e => {
                e.target.style.display = 'none'
                Object.assign(e.target.parentNode.style, {
                  background: 'linear-gradient(135deg,#06b6d4,#10b981)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.5rem', fontWeight: '900', color: '#fff',
                  width: '128px', height: '128px', borderRadius: '50%',
                })
                e.target.parentNode.textContent = 'B'
              }}
            />
          </div>
        </motion.div>

        {/* Available badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
                     bg-cyan-50 dark:bg-cyan-500/10
                     border border-cyan-200 dark:border-cyan-500/25"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >
          <Sparkles size={13} className="text-cyan-500 dark:text-cyan-400" />
          <span className="text-xs font-semibold tracking-wide text-cyan-600 dark:text-cyan-400">
            Available for opportunities
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
        >
          <span className="text-slate-800 dark:text-slate-100">Hello, I'm </span>
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Beamlak
          </span>
        </motion.h1>

        {/* Typed role */}
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl font-semibold h-9 mb-5"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } } }}
        >
          <TypedText />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10
                     text-slate-500 dark:text-slate-400"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          I build clean, scalable, and modern web applications that solve real-world problems.
          Passionate about crafting exceptional digital experiences.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >
          <motion.button
            onClick={() => scrollTo('projects')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6,182,212,0.55)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl
                       text-sm font-semibold text-white cursor-pointer border-none
                       bg-gradient-to-r from-cyan-500 to-emerald-500"
          >
            <Zap size={15} /> View Projects
          </motion.button>
          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl cursor-pointer
                       text-sm font-semibold
                       text-cyan-600 dark:text-cyan-400
                       bg-cyan-50 dark:bg-cyan-500/10
                       border border-cyan-200 dark:border-cyan-500/30
                       hover:bg-cyan-100 dark:hover:bg-cyan-500/20
                       transition-colors duration-200"
          >
            <Mail size={15} /> Contact Me
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex gap-3 justify-center"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
        >
          {[
            { icon: <GitFork size={16} />, href: 'https://github.com/bamites1-sketch', label: 'GitHub' },
            { icon: <Mail size={16} />,    href: 'mailto:Beamlaktesfahunn@gmail.com',   label: 'Email'  },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                         text-slate-500 dark:text-slate-400
                         bg-white dark:bg-white/[0.04]
                         border border-slate-200 dark:border-white/[0.09]
                         hover:text-cyan-600 dark:hover:text-cyan-400
                         hover:border-cyan-300 dark:hover:border-cyan-500/50
                         shadow-sm transition-colors duration-200"
            >
              {icon} {label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <span className="text-[10px] tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 font-medium">Scroll</span>
        <ArrowDown size={14} className="text-cyan-400 dark:text-cyan-500" />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </section>
  )
}

function FloatingCode() {
  const snippets = [
    { text: 'const dev = "Beamlak"', x: '5%',  y: '22%', delay: '0s'   },
    { text: 'npm run build',         x: '78%', y: '16%', delay: '1s'   },
    { text: '<Component />',         x: '86%', y: '58%', delay: '2s'   },
    { text: 'git push origin main',  x: '2%',  y: '68%', delay: '0.5s' },
    { text: 'async/await',           x: '74%', y: '78%', delay: '1.5s' },
  ]
  return (
    <>
      {snippets.map((s, i) => (
        <div key={i}
             className="floating-code animate-float hidden lg:block absolute pointer-events-none
                        px-3 py-1.5 rounded-lg font-mono text-xs
                        text-teal-600/60 dark:text-teal-400/45
                        bg-white/70 dark:bg-white/[0.04]
                        border border-teal-200/50 dark:border-teal-500/15
                        backdrop-blur-sm shadow-sm"
             style={{ left: s.x, top: s.y, animationDelay: s.delay }}>
          {s.text}
        </div>
      ))}
    </>
  )
}
