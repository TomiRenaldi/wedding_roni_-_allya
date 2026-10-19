import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { wedding as w } from '../config'
import { WordReveal, ease } from './Reveal'

function Item({ item, index }) {
  const left = index % 2 === 0
  return (
    <div className="relative grid pl-12 md:grid-cols-2 md:pl-0">
      <motion.span
        className="absolute left-4 top-2 z-10 size-3.5 -translate-x-1/2 rounded-full border-2 border-gold bg-paper md:left-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -30% 0px' }}
        transition={{ duration: 0.6, ease }}
      />
      <motion.div
        className={`md:max-w-sm ${left ? 'md:col-start-1 md:justify-self-end md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'}`}
        initial={{ opacity: 0, x: left ? -36 : 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -22% 0px' }}
        transition={{ duration: 1.2, ease }}
      >
        <p className="font-display text-4xl font-light text-gold-deep">{item.year}</p>
        <h3 className="mt-1 font-display text-2xl text-ink">{item.title}</h3>
        <p className="mt-2 text-ink-soft">{item.text}</p>
      </motion.div>
    </div>
  )
}

export default function Story() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="cerita" className="bg-paper px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <WordReveal
          text="Perjalanan kami"
          className="text-center font-display text-5xl font-light text-ink sm:text-7xl"
        />

        <div ref={ref} className="relative mt-20 space-y-16 sm:mt-28 sm:space-y-24">
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-gold/25 md:left-1/2" />
          <motion.div
            className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-gold md:left-1/2"
            style={{ scaleY, originY: 0 }}
          />
          {w.story.map((item, i) => (
            <Item key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
