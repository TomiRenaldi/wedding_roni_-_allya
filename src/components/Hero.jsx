import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { wedding as w } from '../config'
import { ease } from './Reveal'

function Letters({ text, start, delay = 0 }) {
  return (
    <span className="inline-block" aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} className="inline-block overflow-hidden px-[0.02em] pb-[0.12em] -mb-[0.12em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={start ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 1.3, ease, delay: delay + i * 0.08 }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero({ started }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const mark = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: started ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 1.2, ease, delay },
  })

  return (
    <section id="beranda" ref={ref} className="relative h-[110svh] min-h-[640px] bg-night">
      <div className="sticky top-0 h-svh min-h-[640px] overflow-hidden">
        {/* Latar */}
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          {w.heroImage ? (
            <img src={w.heroImage} alt="" className="size-full object-cover" />
          ) : (
            <div
              className="paper size-full bg-night"
              style={{
                backgroundImage:
                  'radial-gradient(55% 45% at 50% 42%, rgba(216,189,132,.20), transparent 70%), radial-gradient(90% 60% at 50% 110%, rgba(169,128,63,.22), transparent 70%)',
              }}
            />
          )}
          <div className="absolute inset-0 bg-night/55" />
        </motion.div>

        {/* Monogram besar sebagai tanda air */}
        <motion.div
          style={{ y: mark }}
          className="pointer-events-none absolute inset-0 grid place-items-center select-none"
          aria-hidden="true"
        >
          <span className="whitespace-nowrap font-display text-[17rem] font-light italic leading-none tracking-[-0.06em] text-gold-soft/[0.05] sm:text-[30rem]">
            {w.monogram || `${w.groom.nickname[0]}${w.bride.nickname[0]}`}
          </span>
        </motion.div>

        <div className="pointer-events-none absolute inset-4 border border-gold-soft/25 sm:inset-8" />

        {/* Konten */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory"
        >
          <motion.p {...fadeIn(0.5)} className="font-display text-lg italic text-gold-soft sm:text-2xl">
            Kami mengundang Anda ke pernikahan
          </motion.p>

          <h1 className="mt-6 font-display font-light leading-[0.95]">
            <span className="block text-[5.5rem] sm:text-[10rem]">
              <Letters text={w.groom.nickname} start={started} delay={0.7} />
            </span>
            <motion.span
              {...fadeIn(1.4)}
              className="my-1 block font-script text-6xl text-gold-soft sm:text-8xl"
            >
              &amp;
            </motion.span>
            <span className="block text-[5.5rem] sm:text-[10rem]">
              <Letters text={w.bride.nickname} start={started} delay={1.5} />
            </span>
          </h1>

          <motion.p {...fadeIn(2.3)} className="mt-9 font-display text-2xl text-ivory/95 sm:text-3xl">
            {w.dateLabel}
          </motion.p>
        </motion.div>

        {/* Penanda scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs text-gold-soft/80"
        >
          <span>Gulir ke bawah</span>
          <span className="relative h-12 w-px overflow-hidden bg-gold-soft/25">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-gold-soft"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
