import { useEffect, useMemo, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { wedding as w } from './config'
import { getGuestName } from './lib/helpers'
import { SmoothScroll, useLenis } from './lib/smooth'
import Cover from './components/Cover'
import Hero from './components/Hero'
import Couple from './components/Couple'
import Events from './components/Events'
import Doa from './components/Doa'
import Gift from './components/Gift'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import Dock from './components/Dock'
import MusicButton from './components/MusicButton'
import ProgressBar from './components/ProgressBar'

// play() mengembalikan Promise di browser modern; di browser lama bisa undefined.
function playAudio(audio, setPlaying) {
  try {
    const result = audio.play()
    if (result && typeof result.then === 'function') {
      result.then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      setPlaying(true)
    }
  } catch {
    setPlaying(false)
  }
}

function Invitation() {
  const guest = useMemo(getGuestName, [])
  const lenis = useLenis()
  const audioRef = useRef(null)
  const [opened, setOpened] = useState(false)
  const [coverGone, setCoverGone] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [hasMusic, setHasMusic] = useState(Boolean(w.music?.src))

  // Kunci scroll selama sampul masih tampil.
  useEffect(() => {
    window.scrollTo(0, 0)
    if (opened) {
      document.documentElement.style.overflow = ''
      lenis?.start()
    } else {
      document.documentElement.style.overflow = 'hidden'
      lenis?.stop()
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [opened, lenis])

  const open = () => {
    setOpened(true)
    const audio = audioRef.current
    if (audio && hasMusic) {
      audio.volume = 0.7
      playAudio(audio, setPlaying)
    }
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) playAudio(audio, setPlaying)
    else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {hasMusic && (
        <audio
          ref={audioRef}
          src={w.music.src}
          loop
          preload="none"
          onError={() => setHasMusic(false)}
        />
      )}

      {!coverGone && <Cover guest={guest} opened={opened} onOpen={open} onDone={() => setCoverGone(true)} />}

      {opened && <ProgressBar />}
      {hasMusic && <MusicButton playing={playing} onToggle={toggleMusic} visible={opened} />}
      <Dock visible={opened} />

      <main>
        <Hero started={opened} />
        <Couple />
        <Events />
        <Doa />
        <Gift />
        <Rsvp guest={guest} />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Invitation />
      </SmoothScroll>
    </MotionConfig>
  )
}
