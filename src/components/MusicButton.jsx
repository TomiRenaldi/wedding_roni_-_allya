import { motion } from 'framer-motion'

export default function MusicButton({ playing, onToggle, visible }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Jeda musik' : 'Putar musik'}
      aria-pressed={playing}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.8, delay: visible ? 1.6 : 0, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed right-4 top-5 z-40 grid size-11 place-items-center rounded-full border border-gold-soft/60 bg-night/80 text-gold-soft backdrop-blur transition-colors hover:bg-gold-soft hover:text-night"
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-current"
              animate={{ height: ['30%', '100%', '45%', '85%', '30%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="size-4 translate-x-px" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  )
}
