interface SpectrumArcsProps {
  className?: string
  strokeWidth?: number
}

const RADII = [112, 92, 72, 52, 32]

export function SpectrumArcs({ className = '', strokeWidth = 1.6 }: SpectrumArcsProps) {
  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {RADII.map((radius, index) => (
        <path
          key={radius}
          d={`M${120 - radius} 138a${radius} ${radius} 0 0 1 ${radius * 2} 0`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={0.18 + index * 0.14}
          strokeLinecap="round"
        />
      ))}
      <circle cx="120" cy="138" r="4" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}

export function BinaryString({ className = '' }: { className?: string }) {
  return (
    <span className={`font-latin text-[10px] tracking-[0.38em] ${className}`} dir="ltr">
      01001110 01010011
    </span>
  )
}
