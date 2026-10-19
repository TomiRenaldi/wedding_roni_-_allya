import { useEffect, useState } from 'react'

/* ---------- Nama tamu dari ?to= ---------- */
export function getGuestName() {
  try {
    const raw = new URLSearchParams(window.location.search).get('to')
    return raw ? raw.trim().slice(0, 60) : ''
  } catch {
    return ''
  }
}

/* ---------- Hitung mundur ---------- */
function diffParts(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  }
}

export function useCountdown(target) {
  const [t, setT] = useState(() => diffParts(target))
  useEffect(() => {
    const id = setInterval(() => setT(diffParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

/* ---------- Kalender ---------- */
const stamp = (d) =>
  new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export function googleCalendarUrl(ev, title, location) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.title} – ${title}`,
    dates: `${stamp(ev.start)}/${stamp(ev.end)}`,
    details: `${ev.title} ${title}. ${ev.venue}.`,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

const esc = (s) => String(s).replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n')

export function downloadIcs(events, title, location) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//ID',
    'CALSCALE:GREGORIAN',
    ...events.flatMap((ev) => [
      'BEGIN:VEVENT',
      `UID:${ev.id}-${stamp(ev.start)}@wedding-invitation`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(ev.start)}`,
      `DTEND:${stamp(ev.end)}`,
      `SUMMARY:${esc(`${ev.title} – ${title}`)}`,
      `LOCATION:${esc(location)}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'undangan-pernikahan.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

/* ---------- Salin teks ---------- */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

/* ---------- Waktu relatif ---------- */
export function timeAgo(iso) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000
  const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' })
  const abs = Math.abs(diff)
  if (abs < 60) return 'baru saja'
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute')
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour')
  if (abs < 2592000) return rtf.format(Math.round(diff / 86400), 'day')
  return rtf.format(Math.round(diff / 2592000), 'month')
}

/* ---------- Ucapan (disimpan di perangkat; kirim ke endpoint bila diatur) ---------- */
const WISH_KEY = 'wedding-wishes-v1'

export function loadWishes() {
  try {
    return JSON.parse(localStorage.getItem(WISH_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveWish(wish) {
  const next = [wish, ...loadWishes()].slice(0, 100)
  try {
    localStorage.setItem(WISH_KEY, JSON.stringify(next))
  } catch {
    /* penyimpanan penuh atau diblokir: abaikan */
  }
  // Opsional: kirim ke Google Apps Script / layanan lain bila VITE_RSVP_ENDPOINT diisi.
  const endpoint = import.meta.env.VITE_RSVP_ENDPOINT
  if (endpoint) {
    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(wish),
    }).catch(() => {})
  }
  return next
}
