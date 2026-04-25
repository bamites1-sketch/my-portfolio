import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, GitFork, Star, Globe } from 'lucide-react'

const TECH_COLORS = {
  React:       { bg: 'bg-cyan-500/10 dark:bg-cyan-400/10',       text: 'text-cyan-600 dark:text-cyan-400',       border: 'border-cyan-500/20' },
  'Node.js':   { bg: 'bg-green-500/10 dark:bg-green-400/10',     text: 'text-green-600 dark:text-green-400',     border: 'border-green-500/20' },
  Django:      { bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
  Tailwind:    { bg: 'bg-sky-500/10 dark:bg-sky-400/10',         text: 'text-sky-600 dark:text-sky-400',         border: 'border-sky-500/20' },
  MongoDB:     { bg: 'bg-green-600/10 dark:bg-green-500/10',     text: 'text-green-700 dark:text-green-400',     border: 'border-green-600/20' },
  Express:     { bg: 'bg-slate-500/10 dark:bg-slate-400/10',     text: 'text-slate-600 dark:text-slate-400',     border: 'border-slate-500/20' },
  PostgreSQL:  { bg: 'bg-blue-500/10 dark:bg-blue-400/10',       text: 'text-blue-600 dark:text-blue-400',       border: 'border-blue-500/20' },
  JWT:         { bg: 'bg-pink-500/10 dark:bg-pink-400/10',       text: 'text-pink-600 dark:text-pink-400',       border: 'border-pink-500/20' },
  'REST API':  { bg: 'bg-orange-500/10 dark:bg-orange-400/10',   text: 'text-orange-600 dark:text-orange-400',   border: 'border-orange-500/20' },
  Vite:        { bg: 'bg-teal-500/10 dark:bg-purple-400/10',   text: 'text-purple-600 dark:text-purple-400',   border: 'border-purple-500/20' },
  default:     { bg: 'bg-cyan-500/10 dark:bg-cyan-400/10',   text: 'text-cyan-600 dark:text-cyan-400',   border: 'border-cyan-500/20' },
}

const CAT_META = {
  Fullstack: { icon: '⚡', gradient: 'from-cyan-500/20 to-emerald-400/20', dark: 'dark:from-indigo-900/40 dark:to-purple-900/40' },
  Frontend:  { icon: '🎨', gradient: 'from-cyan-500/20 to-blue-500/20',    dark: 'dark:from-cyan-900/40 dark:to-blue-900/40'    },
  Backend:   { icon: '🔧', gradient: 'from-emerald-500/20 to-teal-500/20', dark: 'dark:from-emerald-900/40 dark:to-teal-900/40' },
}

function TechBadge({ name }) {
  const c = TECH_COLORS[name] || TECH_COLORS.default
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold
                      border ${c.bg} ${c.text} ${c.border}`}>
      {name}
    </span>
  )
}

function ImageSkeleton() {
  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600
                      border-t-indigo-400 animate-spin" />
    </div>
  )
}

function ImageFallback({ title, category }) {
  const meta = CAT_META[category] || CAT_META.Fullstack
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-3
                     bg-gradient-to-br ${meta.gradient} ${meta.dark}`}>
      <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-sm
                      flex items-center justify-center text-3xl shadow-inner">
        {meta.icon}
      </div>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center px-6 leading-snug">
        {title}
      </span>
    </div>
  )
}

function ProjectImage({ src, title, category, live }) {
  const [status, setStatus] = useState(src ? 'loading' : 'fallback')

  if (status === 'fallback') {
    return <ImageFallback title={title} category={category} />
  }

  return (
    <>
      {status === 'loading' && (
        <div className="absolute inset-0">
          <ImageSkeleton />
        </div>
      )}
      <img
        src={src}
        alt={title}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('fallback')}
        className={`w-full h-full object-cover object-top
                    group-hover:scale-105 transition-transform duration-500
                    ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
      />    </>
  )
}

export default function ProjectCard({ project, featured = false }) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(6,182,212,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden h-full
        bg-white dark:bg-white/[0.03]
        border border-slate-200 dark:border-white/[0.08]
        shadow-sm hover:border-cyan-300 dark:hover:border-cyan-500/50
        transition-colors duration-300
        ${featured ? 'ring-1 ring-cyan-400/30 dark:ring-cyan-500/20' : ''}
      `}>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1
                        px-2.5 py-1 rounded-full text-[11px] font-bold
                        bg-amber-400 text-amber-900 shadow-lg">
          <Star size={10} fill="currentColor" /> Featured
        </div>
      )}

      {/* Live badge top-right */}
      {project.live && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1
                        px-2 py-1 rounded-full text-[10px] font-semibold
                        bg-emerald-500/90 text-white shadow-md backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Live
        </div>
      )}

      {/* Screenshot / image area */}
      <div className={`relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800/60 flex-shrink-0
                       ${featured ? 'h-56' : 'h-48'}`}>
        <ProjectImage
          src={project.image}
          title={project.title}
          category={project.category}
          live={project.live}
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-12
                        bg-gradient-to-t from-white/80 dark:from-black/40 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Category chip */}
        <span className="self-start mb-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider
                         bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 dark:text-cyan-400
                         border border-cyan-100 dark:border-cyan-500/20">
          {project.category}
        </span>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
          {project.title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map(t => <TechBadge key={t} name={t} />)}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex-1 flex items-center justify-center gap-1.5
                         px-3 py-2 rounded-lg text-xs font-semibold text-white
                         bg-gradient-to-r from-cyan-500 to-emerald-500
                         hover:from-cyan-400 hover:to-emerald-400
                         shadow-sm hover:shadow-[0_0_18px_rgba(6,182,212,0.45)]
                         transition-colors duration-200"
            >
              <Globe size={12} /> Live Demo
            </motion.a>
          )}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={`flex items-center justify-center gap-1.5
                        px-3 py-2 rounded-lg text-xs font-semibold
                        border border-slate-200 dark:border-white/10
                        text-slate-600 dark:text-slate-300
                        hover:bg-slate-50 dark:hover:bg-white/[0.06]
                        hover:border-cyan-300 dark:hover:border-cyan-500/40
                        hover:text-cyan-600 dark:hover:text-cyan-400
                        transition-colors duration-200
                        ${!project.live ? 'flex-1' : ''}`}
          >
            <GitFork size={12} /> GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
