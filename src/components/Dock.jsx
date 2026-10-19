import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToId, useLenis } from '../lib/smooth'

const items = [
  { id: 'beranda', label: 'Awal' },
  { id: 'mempelai', label: 'Mempelai' },
  { id: 'acara', label: 'Acara' },
  { id: 'doa', label: 'Doa' },
  { id: 'ucapan', label: 'Ucapan' },
]

export default function Dock({ visible }) {
  const lenis = useLenis()
  const [active, setActive] = useState('beranda')

  useEffect(() => {
    if (!visible) return undefined
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [visible])

  return (
    <motion.nav
      aria-label="Navigasi bagian undangan"
      initial={{ y: 100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 1, delay: visible ? 1.4 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <ul className="flex items-center gap-0.5 rounded-full border border-gold-soft/40 bg-night/85 p-1 shadow-xl shadow-black/20 backdrop-blur">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => scrollToId(lenis, it.id)}
              aria-current={active === it.id ? 'true' : undefined}
              className="relative rounded-full px-3 py-2 text-xs text-gold-soft transition-colors sm:px-4 sm:text-sm"
            >
              {active === it.id && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full bg-gold-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative ${active === it.id ? 'text-night' : ''}`}>{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
