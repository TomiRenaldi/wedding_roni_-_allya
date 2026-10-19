import { motion, useScroll, useSpring } from 'framer-motion'

export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-gold-soft"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
