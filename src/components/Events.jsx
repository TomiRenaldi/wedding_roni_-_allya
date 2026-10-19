import { AnimatePresence, motion } from 'framer-motion'
import { wedding as w } from '../config'
import { downloadIcs, googleCalendarUrl, useCountdown } from '../lib/helpers'
import { Reveal, WordReveal } from './Reveal'
import { Corner } from './Ornaments'

const pad = (n) => String(n).padStart(2, '0')

function Digit({ value, label }) {
  return (
    <div className="px-1 text-center sm:px-4">
      <div className="relative h-[1.1em] overflow-hidden font-display text-5xl font-light tabular-nums text-ivory sm:text-7xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ y: '70%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-70%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-1 text-xs text-gold-soft/80 sm:text-sm">{label}</p>
    </div>
  )
}

function Countdown() {
  const t = useCountdown(w.date)
  if (t.done) {
    return <p className="text-center font-display text-3xl italic text-gold-soft">Hari bahagia itu tiba hari ini.</p>
  }
  return (
    <div
      className="mx-auto grid max-w-xl grid-cols-4 divide-x divide-gold-soft/20"
      role="timer"
      aria-label="Hitung mundur menuju hari pernikahan"
    >
      <Digit value={pad(t.d)} label="Hari" />
      <Digit value={pad(t.h)} label="Jam" />
      <Digit value={pad(t.m)} label="Menit" />
      <Digit value={pad(t.s)} label="Detik" />
    </div>
  )
}

function EventCard({ ev, index }) {
  return (
    <Reveal delay={index * 0.15} className="relative border border-gold-soft/25 p-8 text-center sm:p-10">
      <Corner className="absolute -left-px -top-px size-8 text-gold-soft" />
      <Corner className="absolute -right-px -top-px size-8 rotate-90 text-gold-soft" />
      <Corner className="absolute -bottom-px -right-px size-8 rotate-180 text-gold-soft" />
      <Corner className="absolute -bottom-px -left-px size-8 -rotate-90 text-gold-soft" />
      <h3 className="font-display text-4xl font-light text-gold-soft sm:text-5xl">{ev.title}</h3>
      <p className="mt-5 font-display text-xl text-ivory">{ev.dayLabel}</p>
      <p className="mt-1 text-ivory/80">{ev.timeLabel}</p>
      <p className="mt-5 font-display text-xl text-ivory">{ev.venue}</p>
      <p className="mx-auto mt-1 max-w-xs text-sm text-ivory/70">{ev.address}</p>
    </Reveal>
  )
}

export default function Events() {
  const mapQuery = encodeURIComponent(w.map.query)
  const location = `${w.events[0].venue}, ${w.events[0].address}`
  const btn =
    'rounded-full border border-gold-soft/60 px-6 py-3 text-sm text-gold-soft transition-colors duration-300 hover:bg-gold-soft hover:text-night focus-visible:bg-gold-soft focus-visible:text-night'

  return (
    <section id="acara" className="paper bg-night px-6 py-28 text-ivory sm:py-40">
      <div className="mx-auto max-w-5xl">
        <WordReveal
          text="Simpan tanggalnya"
          className="text-center font-display text-5xl font-light text-gold-soft sm:text-7xl"
        />

        <Reveal className="mt-14 sm:mt-20">
          <Countdown />
        </Reveal>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {w.events.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} index={i} />
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="overflow-hidden border border-gold-soft/25 p-2">
            <iframe
              title={`Peta lokasi ${w.events[0].venue}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full sm:aspect-video"
              style={{ border: 0, filter: 'sepia(.35) saturate(.8) contrast(.95)' }}
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              className={btn}
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka di Google Maps
            </a>
            <a
              className={btn}
              href={googleCalendarUrl(w.events[0], w.title, location)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Simpan ke Google Calendar
            </a>
            <button type="button" className={btn} onClick={() => downloadIcs(w.events, w.title, location)}>
              Unduh file kalender
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
