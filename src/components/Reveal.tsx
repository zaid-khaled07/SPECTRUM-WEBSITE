import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE, VIEWPORT } from '../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.3,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
