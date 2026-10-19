import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

const variants = {
  up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
}

export function Reveal({ children, variant = 'up', delay = 0, duration = 1.2, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </Tag>
  )
}

/** Judul yang muncul kata demi kata dari balik garis (mask reveal). */
export function WordReveal({ text, as = 'h2', className = '', delay = 0 }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          {i > 0 && ' '}
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '115%' },
                show: { y: '0%', transition: { duration: 1.15, ease } },
              }}
            >
              {word}
            </motion.span>
          </span>
        </span>
      ))}
    </Tag>
  )
}
