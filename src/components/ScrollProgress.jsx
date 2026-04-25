import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #06b6d4, #14b8a6, #10b981)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(6,182,212,0.6)',
      }}
    />
  )
}
