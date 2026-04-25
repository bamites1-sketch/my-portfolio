import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const variants = {
  up:    { hidden: { opacity: 0, y: 60, scale: 0.97, filter: 'blur(6px)' },   visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } },
  down:  { hidden: { opacity: 0, y: -60, scale: 0.97, filter: 'blur(6px)' },  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } },
  left:  { hidden: { opacity: 0, x: -60, scale: 0.97, filter: 'blur(6px)' },  visible: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' } },
  right: { hidden: { opacity: 0, x: 60, scale: 0.97, filter: 'blur(6px)' },   visible: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' } },
  scale: { hidden: { opacity: 0, scale: 0.82, filter: 'blur(8px)' },           visible: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
  fade:  { hidden: { opacity: 0, filter: 'blur(4px)' },                        visible: { opacity: 1, filter: 'blur(0px)' } },
}

export default function RevealWrapper({ children, delay = 0, direction = 'up', className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '-40px' }}
      variants={variants[direction]}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper — element moves at a different speed than scroll
export function ParallaxWrapper({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const distance = 80 * speed
  const rawY = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(rawY, { stiffness: 50, damping: 18, restDelta: 0.001 })

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
