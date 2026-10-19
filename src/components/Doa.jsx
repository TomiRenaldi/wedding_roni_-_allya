import { wedding as w } from '../config'
import { Reveal, WordReveal } from './Reveal'
import { Sprig } from './Ornaments'

export default function Doa() {
  const { arabic, translation, source } = w.doa
  return (
    <section id="doa" className="paper bg-ivory px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal variant="fade">
          <Sprig className="mx-auto w-28 text-gold" />
        </Reveal>

        <WordReveal
          text="Doa dan harapan"
          className="mt-8 font-display text-5xl font-light text-ink sm:text-7xl"
        />

        <Reveal variant="fade" duration={2} delay={0.2} className="mt-14 sm:mt-20">
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-3xl leading-[2.3] text-ink sm:text-5xl sm:leading-[2.2]"
          >
            {arabic}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mx-auto mt-12 max-w-2xl">
          <p className="font-display text-xl font-light italic leading-relaxed text-ink-soft sm:text-2xl">
            {translation}
          </p>
          <p className="mt-6 text-sm text-gold-deep">{source}</p>
        </Reveal>
      </div>
    </section>
  )
}
