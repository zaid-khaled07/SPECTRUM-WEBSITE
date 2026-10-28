import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion'

const VIEW_W = 1440
const VIEW_H = 220
const MID_Y = VIEW_H / 2

interface WaveLayer {
  id: string
  amplitude: number
  period: number
  phase: number
  stroke: string
  width: number
  opacity: number
  duration: number
  direction: 1 | -1
  nodes?: boolean
}

const LAYERS: WaveLayer[] = [
  {
    id: 'wave-back',
    amplitude: 70,
    period: 960,
    phase: 260,
    stroke: '#8B532C',
    width: 1.2,
    opacity: 0.24,
    duration: 74,
    direction: 1,
  },
  {
    id: 'wave-bark',
    amplitude: 52,
    period: 720,
    phase: 0,
    stroke: '#4B2F1F',
    width: 1.4,
    opacity: 0.32,
    duration: 58,
    direction: -1,
  },
  {
    id: 'wave-caramel',
    amplitude: 38,
    period: 520,
    phase: 130,
    stroke: '#B67845',
    width: 2,
    opacity: 0.6,
    duration: 40,
    direction: 1,
    nodes: true,
  },
  {
    id: 'wave-light',
    amplitude: 24,
    period: 350,
    phase: 40,
    stroke: '#D5A16A',
    width: 2.6,
    opacity: 0.75,
    duration: 28,
    direction: -1,
    nodes: true,
  },
]

const waveY = (x: number, layer: WaveLayer) =>
  MID_Y + layer.amplitude * Math.sin(((x + layer.phase) / layer.period) * Math.PI * 2)

const wavePath = (layer: WaveLayer) => {
  const step = 6
  const start = -layer.period * 2
  const end = VIEW_W + layer.period * 2
  const points: string[] = []
  for (let x = start; x <= end; x += step) {
    points.push(`${x} ${waveY(x, layer).toFixed(2)}`)
  }
  return `M ${points.join(' L ')}`
}

const NODE_X = (layer: WaveLayer) => {
  const gap = layer.period / 2
  const list: number[] = []
  for (let x = -layer.period * 2 + gap / 2; x <= VIEW_W + layer.period * 2; x += gap) {
    list.push(x)
  }
  return list
}

const LAYER_PATHS = LAYERS.map((layer) => ({
  ...layer,
  d: wavePath(layer),
  nodePoints: layer.nodes
    ? NODE_X(layer).map((x) => ({ x, y: waveY(x, layer) }))
    : [],
}))

export function SpectrumWave() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-espresso/10 bg-linen/60"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(213,161,106,0.16),transparent_68%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative h-[150px] w-full sm:h-[190px]"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          {LAYER_PATHS.map((layer, index) => (
            <motion.g
              key={layer.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, delay: 0.15 + index * 0.14, ease: EASE }}
            >
              <motion.g
                animate={
                  reduced
                    ? undefined
                    : { x: [0, layer.direction === 1 ? -layer.period : layer.period] }
                }
                transition={{
                  duration: layer.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <path
                  d={layer.d}
                  stroke={layer.stroke}
                  strokeOpacity={layer.opacity}
                  strokeWidth={layer.width}
                  strokeLinecap="round"
                />
                {layer.nodePoints.map((point, nodeIndex) => (
                  <g key={`${layer.id}-node-${nodeIndex}`}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={9}
                      fill={layer.stroke}
                      fillOpacity={0.16}
                    />
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={2.8}
                      fill={layer.stroke}
                      animate={
                        reduced ? undefined : { opacity: [0.25, 0.85, 0.25] }
                      }
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (nodeIndex % 8) * 0.4,
                      }}
                    />
                  </g>
                ))}
              </motion.g>
            </motion.g>
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-espresso/10 bg-cream/80 px-4 py-2 font-latin text-[8px] font-medium uppercase tracking-[0.22em] text-ink/55 shadow-[0_18px_40px_-28px_rgba(42,26,16,0.5)] backdrop-blur sm:gap-3 sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.3em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caramel" />
            </span>
            One Spectrum · Every Wavelength
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
