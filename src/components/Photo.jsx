import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ease } from './Reveal'

function Placeholder({ label }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-paper via-gold-soft/60 to-gold/50">
      <div className="paper absolute inset-0" />
      <svg viewBox="0 0 100 100" className="relative size-1/3 max-w-24 text-gold-deep/50" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <circle cx="50" cy="38" r="14" />
        <path d="M20 86c0-18 13-28 30-28s30 10 30 28" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  )
}

/**
 * Foto dengan efek tirai (clip-path) saat muncul dan parallax halus saat di-scroll.
 * Tanpa `src`, tampil placeholder bergaya.
 */
export default function Photo({
  src,
  alt = '',
  ratio = 'aspect-[3/4]',
  className = '',
  reveal = true,
  parallax = true,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${ratio} ${className}`}
      initial={reveal ? { clipPath: 'inset(100% 0% 0% 0%)' } : false}
      whileInView={reveal ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.5, ease }}
    >
      <motion.div
        className="absolute inset-0"
        style={parallax ? { y, scale: 1.16 } : undefined}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <Placeholder label={alt} />
        )}
      </motion.div>
    </motion.div>
  )
}
