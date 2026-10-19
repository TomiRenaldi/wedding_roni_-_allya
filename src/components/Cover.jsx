import { motion } from 'framer-motion'
import { wedding as w } from '../config'
import { Corner, Divider } from './Ornaments'
import { ease } from './Reveal'

const doorEase = [0.76, 0, 0.24, 1]

export default function Cover({ guest, opened, onOpen, onDone }) {
  const enter = (i) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.3, ease, delay: 0.35 + i * 0.16 },
  })

  return (
    <div
      className="fixed inset-0 z-[60]"
      style={{ pointerEvents: opened ? 'none' : 'auto' }}
      role="dialog"
      aria-label="Sampul undangan"
    >
      {/* Dua daun pintu yang terbuka ke samping */}
      <motion.div
        className="paper absolute inset-y-0 left-0 w-1/2 bg-night"
        initial={false}
        animate={{ x: opened ? '-101%' : '0%' }}
        transition={{ duration: 1.7, ease: doorEase, delay: opened ? 0.3 : 0 }}
        onAnimationComplete={() => opened && onDone()}
      />
      <motion.div
        className="paper absolute inset-y-0 right-0 w-1/2 bg-night"
        initial={false}
        animate={{ x: opened ? '101%' : '0%' }}
        transition={{ duration: 1.7, ease: doorEase, delay: opened ? 0.3 : 0 }}
      />
      <motion.div
        className="absolute inset-y-0 left-1/2 w-px bg-gold-soft/30"
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-gold-soft"
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 50% at 50% 48%, rgba(216,189,132,.14), transparent 70%)' }}
        />
        <Corner className="absolute left-5 top-5 size-14 sm:left-8 sm:top-8 sm:size-20" />
        <Corner className="absolute right-5 top-5 size-14 rotate-90 sm:right-8 sm:top-8 sm:size-20" />
        <Corner className="absolute bottom-5 right-5 size-14 rotate-180 sm:bottom-8 sm:right-8 sm:size-20" />
        <Corner className="absolute bottom-5 left-5 size-14 -rotate-90 sm:bottom-8 sm:left-8 sm:size-20" />

        <motion.p {...enter(0)} className="relative font-display text-lg italic text-gold-soft/90 sm:text-xl">
          Undangan pernikahan
        </motion.p>

        <motion.h1 {...enter(1)} className="relative mt-5 font-display font-light leading-[0.92] text-ivory">
          <span className="block text-[4.5rem] sm:text-[7rem]">{w.groom.nickname}</span>
          <span className="my-1 block font-script text-5xl text-gold-soft sm:text-6xl">&amp;</span>
          <span className="block text-[4.5rem] sm:text-[7rem]">{w.bride.nickname}</span>
        </motion.h1>

        <motion.div {...enter(2)} className="relative mt-7 w-full">
          <Divider className="text-gold-soft" />
        </motion.div>

        <motion.div {...enter(3)} className="relative mt-9">
          <p className="text-sm text-gold-soft/80">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="mt-1 max-w-xs break-words font-display text-2xl text-ivory sm:max-w-md sm:text-3xl">
            {guest || 'Tamu Undangan'}
          </p>
        </motion.div>

        <motion.button
          {...enter(4)}
          type="button"
          onClick={onOpen}
          className="group relative mt-9 overflow-hidden rounded-full border border-gold-soft/70 px-9 py-3.5 text-sm tracking-wide text-gold-soft transition-colors duration-500 hover:text-night focus-visible:text-night"
        >
          <span className="absolute inset-0 -translate-x-full bg-gold-soft transition-transform duration-500 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0" />
          <span className="relative">Buka Undangan</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
