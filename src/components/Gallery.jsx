import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wedding as w } from '../config'
import { WordReveal } from './Reveal'
import Photo from './Photo'
import { useLenis } from '../lib/smooth'

const ratios = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
]

function Lightbox({ index, onClose, onMove }) {
  const item = w.gallery[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onMove])

  const ctrl =
    'absolute z-10 grid size-12 place-items-center rounded-full border border-gold-soft/40 text-2xl text-gold-soft transition-colors hover:bg-gold-soft hover:text-night'

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-night/95 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      onClick={onClose}
    >
      <button type="button" className={`${ctrl} right-4 top-4`} onClick={onClose} aria-label="Tutup">
        ×
      </button>
      <button
        type="button"
        className={`${ctrl} left-3 top-1/2 -translate-y-1/2`}
        onClick={(e) => {
          e.stopPropagation()
          onMove(-1)
        }}
        aria-label="Foto sebelumnya"
      >
        ‹
      </button>
      <button
        type="button"
        className={`${ctrl} right-3 top-1/2 -translate-y-1/2`}
        onClick={(e) => {
          e.stopPropagation()
          onMove(1)
        }}
        aria-label="Foto berikutnya"
      >
        ›
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.src ? (
            <img src={item.src} alt={item.alt} className="max-h-[82vh] max-w-[88vw] object-contain" />
          ) : (
            <Photo ratio="aspect-[3/4]" className="h-[70vh] max-w-[88vw]" alt={item.alt} reveal={false} parallax={false} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const lenis = useLenis()

  useEffect(() => {
    if (open === null) return undefined
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open, lenis])

  const close = useCallback(() => setOpen(null), [])
  const move = useCallback((d) => setOpen((i) => (i + d + w.gallery.length) % w.gallery.length), [])

  return (
    <section id="galeri" className="paper bg-ivory px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <WordReveal
          text="Potret kebersamaan"
          className="text-center font-display text-5xl font-light text-ink sm:text-7xl"
        />

        <div className="mt-16 columns-2 gap-3 sm:mt-24 sm:gap-5 md:columns-3">
          {w.gallery.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className="mb-3 block w-full break-inside-avoid text-left sm:mb-5"
              aria-label={`Perbesar ${item.alt}`}
            >
              <Photo src={item.src} alt={item.alt} ratio={ratios[i % ratios.length]} />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
      </AnimatePresence>
    </section>
  )
}
