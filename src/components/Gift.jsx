import { useState } from 'react'
import { wedding as w } from '../config'
import { copyText } from '../lib/helpers'
import { Reveal, WordReveal } from './Reveal'

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false)
  const onClick = async () => {
    const ok = await copyText(text)
    if (ok) {
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    }
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="mt-5 rounded-full border border-gold/60 px-6 py-2 text-sm text-gold-deep transition-colors duration-300 hover:bg-gold hover:text-ivory focus-visible:bg-gold focus-visible:text-ivory"
    >
      <span aria-live="polite">{done ? 'Tersalin' : 'Salin'}</span>
    </button>
  )
}

/** Ikon bank generik, dipakai bila file logo belum tersedia. */
function BankIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12L16 5l12 7z" />
      <path d="M7 14v9M13 14v9M19 14v9M25 14v9" strokeLinecap="round" />
      <path d="M4 26h24" strokeLinecap="round" />
    </svg>
  )
}

function BankLogo({ bank, logo }) {
  const [failed, setFailed] = useState(false)
  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={bank}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-10 w-auto max-w-[9rem] object-contain"
      />
    )
  }
  return (
    <span className="flex items-center gap-2.5 text-gold-deep">
      <BankIcon className="size-8" />
      <span className="font-display text-3xl">{bank}</span>
    </span>
  )
}

function Card({ children, index = 0, className = '' }) {
  return (
    <Reveal delay={index * 0.12} className={`border border-gold/40 bg-ivory/70 p-7 text-center ${className}`}>
      {children}
    </Reveal>
  )
}

export default function Gift() {
  return (
    <section id="hadiah" className="bg-paper px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <WordReveal text="Amplop digital" className="font-display text-5xl font-light text-ink sm:text-7xl" />
        <Reveal delay={0.2} className="mx-auto mt-8 max-w-xl">
          <p className="text-ink-soft">
            Kehadiran dan doa Anda sudah menjadi hadiah terindah bagi kami. Bila Anda ingin berbagi tanda kasih, kami
            menyediakan beberapa cara berikut.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {w.gifts.map((g, i) => (
            <Card key={`${g.bank}-${g.number}`} index={i}>
              <div className="flex h-10 items-center justify-center">
                <BankLogo bank={g.bank} logo={g.logo} />
              </div>
              <p className="mt-5 font-display text-3xl tabular-nums tracking-wide text-ink">{g.number}</p>
              <p className="mt-1 text-sm text-ink-soft">a.n. {g.name}</p>
              <CopyButton text={g.number} label={`Salin nomor rekening ${g.bank}`} />
            </Card>
          ))}

          {w.giftAddress && (
            <Card index={w.gifts.length} className="sm:col-span-2">
              <p className="font-display text-2xl text-gold-deep">Kirim hadiah ke alamat</p>
              <p className="mt-3 text-ink">{w.giftAddress.name}</p>
              <p className="mx-auto max-w-sm text-sm text-ink-soft">{w.giftAddress.text}</p>
              <CopyButton text={`${w.giftAddress.name}, ${w.giftAddress.text}`} label="Salin alamat" />
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
