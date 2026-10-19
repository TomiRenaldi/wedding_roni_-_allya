import { wedding as w } from '../config'
import { Reveal, WordReveal } from './Reveal'
import { Sprig } from './Ornaments'

export default function Footer() {
  return (
    <footer className="paper bg-night px-6 pb-32 pt-24 text-center text-ivory sm:pt-32">
      <div className="mx-auto max-w-2xl border-t border-gold-soft/20 pt-20">
        <Reveal variant="fade">
          <Sprig className="mx-auto w-28 text-gold-soft" />
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <p className="text-ivory/80">{w.closing}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <p className="font-display text-xl italic text-gold-soft">Kami yang berbahagia,</p>
        </Reveal>
        <WordReveal
          as="p"
          text={`${w.groom.nickname} & ${w.bride.nickname}`}
          className="mt-3 font-script text-7xl text-ivory sm:text-8xl"
          delay={0.2}
        />
        <Reveal delay={0.3} className="mt-3 text-sm text-ivory/60">
          beserta keluarga besar kami.
        </Reveal>
      </div>
    </footer>
  )
}
