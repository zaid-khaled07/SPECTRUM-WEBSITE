import { useId } from 'react'

export function SpectrumMark({ className = 'h-11 w-11' }: { className?: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const backgroundId = `mark-bg-${rawId}`
  const glowId = `mark-glow-${rawId}`

  return (
    <svg
      viewBox="0 0 80 80"
      role="img"
      aria-label="Spectrum SPC logo"
      className={className}
    >
      <defs>
        <linearGradient id={backgroundId} x1="10" y1="4" x2="70" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#553722" />
          <stop offset="0.55" stopColor="#33200F" />
          <stop offset="1" stopColor="#1D110A" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.78" r="0.7">
          <stop stopColor="#F2D3A9" stopOpacity="0.4" />
          <stop offset="1" stopColor="#F2D3A9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="80" height="80" rx="21" fill={`url(#${backgroundId})`} />
      <rect
        x="0.75"
        y="0.75"
        width="78.5"
        height="78.5"
        rx="20.25"
        fill="none"
        stroke="#E6D3BB"
        strokeOpacity="0.2"
      />
      <circle cx="40" cy="60" r="30" fill={`url(#${glowId})`} />

      <g fill="none" strokeLinecap="round">
        <path d="M7 61a33 33 0 0 1 66 0" stroke="#F3E5D0" strokeOpacity="0.22" strokeWidth="1.7" />
        <path d="M13 61a27 27 0 0 1 54 0" stroke="#D5A16A" strokeOpacity="0.55" strokeWidth="2.2" />
        <path d="M19 61a21 21 0 0 1 42 0" stroke="#C98B55" strokeWidth="2.6" />
        <path d="M25 61a15 15 0 0 1 30 0" stroke="#F7EFE3" strokeWidth="3" />
      </g>

      <circle cx="40" cy="61" r="3.6" fill="#F7EFE3" />
      <circle cx="40" cy="61" r="8" fill="none" stroke="#F7EFE3" strokeOpacity="0.24" />
      <path d="M40 61v-7" stroke="#F7EFE3" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" />

      <text x="11" y="20" fill="#E6D3BB" fillOpacity="0.46" fontFamily="monospace" fontSize="7" letterSpacing="1">
        101
      </text>
      <text x="55" y="20" fill="#E6D3BB" fillOpacity="0.46" fontFamily="monospace" fontSize="7" letterSpacing="1">
        010
      </text>
    </svg>
  )
}

interface SpectrumLogoProps {
  light?: boolean
  compact?: boolean
  className?: string
}

export function SpectrumLogo({ light = false, compact = false, className = '' }: SpectrumLogoProps) {
  const primary = light ? 'text-ivory' : 'text-espresso'
  const muted = light ? 'text-cream/55' : 'text-ink/50'
  const badge = light
    ? 'border-cream/25 bg-cream/10 text-cream/80'
    : 'border-espresso/15 bg-espresso/5 text-espresso/70'

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <SpectrumMark className={compact ? 'h-10 w-10 shrink-0' : 'h-12 w-12 shrink-0'} />
      <span className="flex min-w-0 flex-col gap-[5px]">
        <span className="flex items-center gap-2">
          <span
            className={`font-latin text-[16px] font-semibold uppercase leading-none tracking-[0.17em] sm:text-[17px] ${primary}`}
            dir="ltr"
          >
            Spectrum
          </span>
          <span
            className={`rounded-full border px-1.5 py-[2px] font-latin text-[8.5px] font-semibold tracking-[0.12em] ${badge}`}
            dir="ltr"
          >
            SPC
          </span>
        </span>
        <span
          className={`font-latin text-[8px] uppercase leading-none tracking-[0.21em] sm:text-[8.5px] ${muted}`}
          dir="ltr"
        >
          From Binary to Beyond
        </span>
      </span>
    </span>
  )
}
