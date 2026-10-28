export type GoalIcon =
  | 'users'
  | 'compass'
  | 'trophy'
  | 'rocket'
  | 'graduation'
  | 'network'

export type MemberTier = 'president' | 'vice' | 'lead' | 'member'

export interface Goal {
  id: string
  label: string
  text: string
  icon: GoalIcon
}

export interface Member {
  id: string
  name: string
  latinName: string
  major: string
  role: string
  team: string
  tier: MemberTier
}

export interface SiteContent {
  version: 1
  updatedAt: string
  site: {
    teamName: string
    acronym: string
    taglineEn: string
    taglineAr: string
    university: string
    universityEn: string
  }
  hero: {
    badge: string
    title: string
    titleAccent: string
    philosophy: {
      ideaLabel: string
      idea: string
      offerLabel: string
      offer: string
      strengthLabel: string
      strength: string
    }
    primaryCta: string
    secondaryCta: string
  }
  goalsSection: {
    eyebrow: string
    title: string
    description: string
    quote: string
  }
  teamPage: {
    eyebrow: string
    title: string
    description: string
  }
  cta: {
    eyebrow: string
    title: string
    description: string
    button: string
  }
  goals: Goal[]
  members: Member[]
}
