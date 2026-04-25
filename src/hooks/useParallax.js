import { useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function useParallax(distance = 80) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, { stiffness: 60, damping: 20, restDelta: 0.001 })
  return { ref, y }
}

export function useParallaxOpacity() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [0, 1]),
    { stiffness: 80, damping: 20 }
  )
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [60, 0]),
    { stiffness: 80, damping: 20 }
  )
  return { ref, opacity, y }
}
