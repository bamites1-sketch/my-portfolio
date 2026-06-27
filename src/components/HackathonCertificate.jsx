import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import RevealWrapper from './ui/RevealWrapper'
import certImage from '../assets/hackathon-cert.jpg.jpg'

export default function HackathonCertificate() {
  return (
    <section
      id="certificate"
      className="relative py-28 px-6 bg-white dark:bg-slate-900/50 transition-colors duration-300"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full
                        bg-amber-500/5 dark:bg-amber-500/5 blur-[80px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        
        {/* Header */}
        <RevealWrapper>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-amber-50 dark:bg-amber-500/10
                            border border-amber-200 dark:border-amber-500/25 mb-4">
              <Award size={16} className="text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Recognition
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight
                           text-slate-900 dark:text-white mb-3">
              Hackathon <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-red-400
                                         bg-clip-text text-transparent">
                Certificate
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
              THRIVE 2018 Hackathon Challenge Organized by Qelem Meda Technologies in collaboration with Wollo University
            </p>
          </div>
        </RevealWrapper>

        {/* Certificate Card */}
        <RevealWrapper delay={100}>
          <motion.div
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            className="relative group"
          >
            {/* Gradient border effect */}
            <div className="absolute -inset-1 rounded-2xl
                            bg-gradient-to-r from-amber-400 via-orange-400 to-red-400
                            opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
            
            {/* Certificate container */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden
                            border border-slate-200 dark:border-slate-700
                            shadow-lg dark:shadow-2xl
                            group-hover:shadow-2xl dark:group-hover:shadow-amber-500/20
                            transition-shadow duration-300">
              
              {/* Certificate image */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
                <motion.img
                  src={certImage}
                  alt="THRIVE Hackathon Certificate of Achievement"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Details section */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      THRIVE 2018 Hackathon
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                      Certificate of Achievement
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      May 14–15, 2026 · Wollo University, Kombolcha
                    </p>
                  </div>
                  <motion.a
                    href={certImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(217, 119, 6, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                               bg-gradient-to-r from-amber-500 to-orange-500
                               text-white font-semibold text-sm
                               shadow-lg hover:shadow-xl transition-all duration-200
                               whitespace-nowrap"
                  >
                    <ExternalLink size={16} />
                    View Full
                  </motion.a>
                </div>

                {/* Badge */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      Organized by Qelem Meda Technologies · KIOT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </RevealWrapper>
      </div>
    </section>
  )
}
