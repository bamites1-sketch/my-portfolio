import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import RevealWrapper from './ui/RevealWrapper'
import { ParallaxWrapper } from './ui/RevealWrapper'
import { Layers } from 'lucide-react'

const FILTERS = ['All', 'Frontend', 'Backend', 'Fullstack']

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const sectionRef = useRef(null)

  const featured  = projects.filter(p => p.featured)
  const filtered  = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-6 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300"
    >
      {/* Subtle background glow with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ParallaxWrapper speed={0.4}>
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full
                          bg-teal-500/5 dark:bg-teal-500/5 blur-[80px] -translate-y-1/2" />
        </ParallaxWrapper>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <RevealWrapper>
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-cyan-500 dark:text-cyan-400">
              Projects
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-black tracking-tight
                           text-slate-900 dark:text-white">
              Things I've{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500
                               bg-clip-text text-transparent">
                built
              </span>
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto text-base">
              A mix of real projects — from fullstack apps to polished UIs.
            </p>
          </div>
        </RevealWrapper>

        {/* Featured strip */}
        {featured.length > 0 && (
          <RevealWrapper delay={100}>
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-500 to-emerald-400" />
                <span className="text-sm font-semibold text-cyan-500 dark:text-cyan-400">
                  Featured Projects
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {featured.map((p, i) => (
                  <RevealWrapper key={p.id} delay={i * 80} direction="up">
                    <ProjectCard project={p} featured />
                  </RevealWrapper>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* Filter tabs */}
        <RevealWrapper delay={150}>
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f, i) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-semibold border
                  transition-colors duration-200
                  ${filter === f
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white border-transparent shadow-[0_0_16px_rgba(6,182,212,0.35)]'
                    : 'bg-white dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/[0.08] hover:border-cyan-300 dark:hover:border-cyan-500/40 hover:text-cyan-500 dark:hover:text-cyan-400'
                  }
                `}
              >
                {f}
                <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${filter === f
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500'
                  }`}>
                  {f === 'All' ? projects.length : projects.filter(p => p.category === f).length}
                </span>
              </motion.button>
            ))}
          </div>
        </RevealWrapper>

        {/* All projects grid */}
        {filtered.length > 0 ? (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16,1,0.3,1] } } }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-slate-400 dark:text-slate-500">
            <Layers size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No projects in this category yet.</p>
          </div>
        )}

      </div>
    </section>
  )
}
