import { motion } from 'framer-motion'
import { ease } from './Reveal'

const SKIN = '#EBCBA2'
const SKIN_SHADE = '#E0BC8E'
const HAIR = '#2B2118'
const GOLD = '#B38B4D'
const GOLD_DEEP = '#8A6428'

function Face() {
  return (
    <g>
      <circle cx="96" cy="171" r="7" fill="#E8A98F" opacity=".45" />
      <circle cx="144" cy="171" r="7" fill="#E8A98F" opacity=".45" />
      <path d="M100 152q6 5 12 0M128 152q6 5 12 0" stroke={HAIR} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M108 176q12 10 24 0" stroke="#9B5B43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
  )
}

function Groom() {
  return (
    <>
      <rect x="108" y="196" width="24" height="46" rx="8" fill={SKIN_SHADE} />
      {/* Jas */}
      <path d="M20 320C20 255 60 232 120 232C180 232 220 255 220 320Z" fill={HAIR} />
      <path d="M96 236L120 292L144 236Z" fill="#F7F1E3" />
      <path d="M82 244L96 236L120 292L108 306Z" fill="#3A2C20" />
      <path d="M158 244L144 236L120 292L132 306Z" fill="#3A2C20" />
      {/* Dasi kupu-kupu */}
      <path d="M120 241L103 231L103 251Z" fill={GOLD} />
      <path d="M120 241L137 231L137 251Z" fill={GOLD} />
      <circle cx="120" cy="241" r="4.5" fill={GOLD_DEEP} />
      {/* Kepala */}
      <circle cx="78" cy="152" r="7" fill={SKIN_SHADE} />
      <circle cx="162" cy="152" r="7" fill={SKIN_SHADE} />
      <ellipse cx="120" cy="150" rx="42" ry="50" fill={SKIN} />
      <path d="M76 146C72 98 98 82 122 82C150 82 170 100 164 146C158 124 146 112 120 112C96 112 84 124 76 146Z" fill={HAIR} />
      <Face />
    </>
  )
}

function Bride() {
  return (
    <>
      {/* Kerudung tipis di belakang, lalu rambut */}
      <path
        d="M52 150C52 86 88 62 120 62C152 62 188 86 188 150L204 306L36 306Z"
        fill="#FFFFFF"
        opacity=".55"
        stroke="#D8BD84"
        strokeWidth="1.5"
      />
      <path d="M70 150C62 100 88 76 120 76C152 76 178 100 170 150L178 252C178 266 62 266 62 252Z" fill={HAIR} />
      <rect x="108" y="196" width="24" height="50" rx="8" fill={SKIN_SHADE} />
      {/* Gaun */}
      <path d="M26 320C26 262 66 240 120 240C174 240 214 262 214 320Z" fill="#FBF7EC" stroke="#D8BD84" strokeWidth="2" />
      <path d="M92 242C100 274 140 274 148 242Z" fill={SKIN} />
      <path d="M92 242C100 274 140 274 148 242" stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="120" cy="268" r="3.5" fill={GOLD} />
      {/* Kepala */}
      <ellipse cx="120" cy="150" rx="42" ry="50" fill={SKIN} />
      <path d="M78 148C74 104 98 88 124 88C152 88 168 108 162 148C158 128 150 112 120 112C100 114 86 126 78 148Z" fill={HAIR} />
      <path d="M78 148C76 170 80 192 72 210C90 206 92 180 88 150Z" fill={HAIR} />
      <path d="M162 148C164 170 160 192 168 210C150 206 148 180 152 150Z" fill={HAIR} />
      {/* Bunga di rambut */}
      <g>
        <circle cx="150" cy="94" r="4.5" fill="#D8BD84" />
        <circle cx="156" cy="100" r="4.5" fill="#D8BD84" />
        <circle cx="150" cy="106" r="4.5" fill="#D8BD84" />
        <circle cx="144" cy="100" r="4.5" fill="#D8BD84" />
        <circle cx="150" cy="100" r="3" fill="#A9803F" />
      </g>
      <Face />
    </>
  )
}

/** Ilustrasi karakter sederhana. kind: 'groom' | 'bride'. */
export default function Avatar({ kind, label }) {
  return (
    <motion.div
      className="relative aspect-[3/4] overflow-hidden rounded-t-[999px]"
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.5, ease }}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 240 320" className="size-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <rect width="240" height="320" fill="#EFE3C6" />
        <circle cx="120" cy="136" r="100" fill="#E3CD9C" opacity=".55" />
        {kind === 'bride' ? <Bride /> : <Groom />}
      </svg>
    </motion.div>
  )
}
