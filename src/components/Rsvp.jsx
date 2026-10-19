import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wedding as w } from '../config'
import { loadWishes, saveWish, timeAgo } from '../lib/helpers'
import { Reveal, WordReveal, ease } from './Reveal'

const options = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'ragu', label: 'Masih ragu' },
  { value: 'tidak', label: 'Berhalangan' },
]
const badge = {
  hadir: 'Hadir',
  ragu: 'Masih ragu',
  tidak: 'Berhalangan',
}

const field =
  'w-full rounded-none border border-gold-soft/40 bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-gold-soft focus:outline-none'

export default function Rsvp({ guest }) {
  const [name, setName] = useState(guest || '')
  const [attendance, setAttendance] = useState('hadir')
  const [count, setCount] = useState('1')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(null)
  const [mine, setMine] = useState([])

  useEffect(() => setMine(loadWishes()), [])
  useEffect(() => {
    if (guest) setName(guest)
  }, [guest])

  const wishes = useMemo(
    () => [...mine, ...w.sampleWishes].sort((a, b) => new Date(b.at) - new Date(a.at)),
    [mine],
  )

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Tulis nama Anda terlebih dahulu.')
      return
    }
    setError('')
    const wish = {
      id: `w${Date.now()}`,
      name: name.trim().slice(0, 60),
      attendance,
      count: attendance === 'hadir' ? Number(count) : 0,
      message: message.trim().slice(0, 400),
      at: new Date().toISOString(),
    }
    setMine(saveWish(wish))
    setSent(wish)
    setMessage('')
  }

  const waText = sent
    ? `Halo, saya ${sent.name}. Konfirmasi kehadiran di pernikahan ${w.groom.nickname} & ${w.bride.nickname}: ${
        badge[sent.attendance]
      }${sent.attendance === 'hadir' ? ` (${sent.count} orang)` : ''}.`
    : ''

  return (
    <section id="ucapan" className="paper bg-night px-6 py-28 text-ivory sm:py-40">
      <div className="mx-auto max-w-5xl">
        <WordReveal
          text="Konfirmasi & doa restu"
          className="text-center font-display text-5xl font-light text-gold-soft sm:text-7xl"
        />
        <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl text-center text-ivory/75">
          Mohon konfirmasi kehadiran Anda dan tinggalkan ucapan untuk kami.
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal variant="left">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="rsvp-name" className="mb-2 block text-sm text-gold-soft">
                  Nama
                </label>
                <input
                  id="rsvp-name"
                  className={field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  autoComplete="name"
                  placeholder="Nama lengkap Anda"
                />
              </div>

              <fieldset>
                <legend className="mb-2 text-sm text-gold-soft">Kehadiran</legend>
                <div className="grid grid-cols-3 gap-2">
                  {options.map((o) => (
                    <label key={o.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value={o.value}
                        checked={attendance === o.value}
                        onChange={() => setAttendance(o.value)}
                        className="peer sr-only"
                      />
                      <span className="block border border-gold-soft/40 px-2 py-3 text-center text-sm transition-colors peer-checked:border-gold-soft peer-checked:bg-gold-soft peer-checked:text-night peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-soft">
                        {o.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <AnimatePresence initial={false}>
                {attendance === 'hadir' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="overflow-hidden"
                  >
                    <label htmlFor="rsvp-count" className="mb-2 block text-sm text-gold-soft">
                      Jumlah tamu
                    </label>
                    <select
                      id="rsvp-count"
                      className={`${field} bg-night`}
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} orang
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="rsvp-msg" className="mb-2 block text-sm text-gold-soft">
                  Ucapan dan doa
                </label>
                <textarea
                  id="rsvp-msg"
                  rows={4}
                  className={`${field} resize-none`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={400}
                  placeholder="Tulis ucapan untuk kedua mempelai"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-gold-soft">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-gold-soft px-8 py-3.5 text-night transition-colors duration-300 hover:bg-ivory"
              >
                Kirim konfirmasi
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border border-gold-soft/40 p-5 text-center"
                    role="status"
                  >
                    <p className="font-display text-xl text-gold-soft">Terima kasih, {sent.name}.</p>
                    <p className="mt-1 text-sm text-ivory/75">Konfirmasi Anda sudah tercatat.</p>
                    <a
                      href={`https://wa.me/${w.whatsapp}?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded-full border border-gold-soft/60 px-6 py-2.5 text-sm text-gold-soft transition-colors hover:bg-gold-soft hover:text-night"
                    >
                      Kabari kami lewat WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal variant="right">
            <h3 className="font-display text-3xl text-gold-soft">Ucapan untuk kami</h3>
            <div
              className="slim-scroll mt-6 max-h-[32rem] space-y-4 overflow-y-auto pr-3"
              data-lenis-prevent
              tabIndex={0}
              aria-label="Daftar ucapan"
            >
              {wishes.length === 0 && <p className="text-ivory/60">Belum ada ucapan. Jadilah yang pertama.</p>}
              <AnimatePresence initial={false}>
                {wishes.map((wish) => (
                  <motion.article
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="border border-gold-soft/20 p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="font-display text-xl text-ivory">{wish.name}</p>
                      <p className="text-xs text-gold-soft/70">{timeAgo(wish.at)}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gold-soft">{badge[wish.attendance]}</p>
                    {wish.message && <p className="mt-2 text-ivory/80">{wish.message}</p>}
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
