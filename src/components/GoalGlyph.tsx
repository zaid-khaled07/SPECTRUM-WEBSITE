import {
  Compass,
  GraduationCap,
  Network,
  Rocket,
  Trophy,
  Users,
} from 'lucide-react'
import type { GoalIcon } from '../types'

const ICONS = {
  users: Users,
  compass: Compass,
  trophy: Trophy,
  rocket: Rocket,
  graduation: GraduationCap,
  network: Network,
} as const

export function GoalGlyph({
  icon,
  className = 'h-5 w-5',
}: {
  icon: GoalIcon
  className?: string
}) {
  const Icon = ICONS[icon] ?? Users
  return <Icon className={className} strokeWidth={1.7} aria-hidden="true" />
}
