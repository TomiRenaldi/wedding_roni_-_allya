import { wedding as w } from '../config'
import { Reveal, WordReveal } from './Reveal'
import Photo from './Photo'
import Avatar from './Avatar'
import { Sprig } from './Ornaments'

function Person({ p, side, kind }) {
  return (
    <div className="text-center">
      <Reveal variant="fade" duration={1.4}>
        <div className="mx-auto w-60 rounded-t-[999px] border border-gold/40 p-2 sm:w-72">
          {p.photo ? (
            <Photo
              src={p.photo}
              alt={`Foto ${p.nickname}`}
              ratio="aspect-[3/4]"
              className="rounded-t-[999px]"
            />
          ) : (
            <Avatar kind={kind} label={`Ilustrasi ${p.nickname}`} />
          )}
        </div>
      </Reveal>
      <Reveal variant={side === 'left' ? 'left' : 'right'} delay={0.15} className="mt-8">
        <h3 className="font-display text-4xl font-light text-ink sm:text-5xl">{p.fullName}</h3>
        <p className="mx-auto mt-3 max-w-xs text-ink-soft">{p.parents}</p>
        {p.instagram && (
          <a
            href={`https://instagram.com/${p.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-ink"
          >
            @{p.instagram}
          </a>
        )}
      </Reveal>
    </div>
  )
}

export default function Couple() {
  return (
    <section id="mempelai" className="paper bg-ivory px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant="fade">
            <Sprig className="mx-auto w-28 text-gold" />
          </Reveal>
          <WordReveal
            as="p"
            text={w.quote.text}
            className="mt-8 font-display text-2xl font-light italic leading-snug text-ink sm:text-4xl"
          />
          {w.quote.source && (
            <Reveal delay={0.4} className="mt-4 text-sm text-ink-soft">
              {w.quote.source}
            </Reveal>
          )}
        </div>

        <Reveal className="mx-auto mt-20 max-w-xl text-center sm:mt-28">
          <p className="text-ink-soft">
            Dengan memohon rahmat dan ridho Allah SWT, kami akan melangsungkan pernikahan putra-putri kami:
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-16 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          <Person p={w.groom} side="left" kind="groom" />
          <Reveal variant="scale" delay={0.1} className="self-center text-center">
            <span className="font-script text-7xl text-gold sm:text-8xl">&amp;</span>
          </Reveal>
          <Person p={w.bride} side="right" kind="bride" />
        </div>
      </div>
    </section>
  )
}
