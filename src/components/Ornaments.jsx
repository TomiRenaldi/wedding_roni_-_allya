export function Corner({ className = '' }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M1 79V22C1 10 10 1 22 1h57" />
      <path d="M9 79V30C9 19 19 9 30 9h49" opacity=".45" />
      <circle cx="22" cy="22" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-current opacity-50 sm:w-20" />
      <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
        <path d="M6 0l6 6-6 6-6-6z" />
      </svg>
      <span className="h-px w-12 bg-current opacity-50 sm:w-20" />
    </div>
  )
}

export function Sprig({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 12h38" opacity=".6" />
      <path d="M80 12h38" opacity=".6" />
      <path d="M60 4c-4 4-4 12 0 16 4-4 4-12 0-16z" />
      <path d="M48 12c4-5 9-5 12 0-3 5-8 5-12 0z" />
      <path d="M72 12c-4-5-9-5-12 0 3 5 8 5 12 0z" />
    </svg>
  )
}
