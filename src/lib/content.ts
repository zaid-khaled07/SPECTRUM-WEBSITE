import { createDefaultContent } from '../data/defaults'
import type { Goal, GoalIcon, Member, MemberTier, SiteContent } from '../types'

export const CONTENT_STORAGE_KEY = 'spectrum:content:v2'

const GOAL_ICONS: GoalIcon[] = [
  'users',
  'compass',
  'trophy',
  'rocket',
  'graduation',
  'network',
]
const MEMBER_TIERS: MemberTier[] = ['president', 'vice', 'lead', 'member']

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const asText = (value: unknown, fallback: string) =>
  typeof value === 'string' ? value : fallback

const asId = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim() ? value : fallback

const normalizeGoal = (raw: unknown, fallback: Goal): Goal => {
  if (!isRecord(raw)) return fallback
  const icon = raw.icon
  return {
    id: asId(raw.id, fallback.id),
    label: asText(raw.label, fallback.label),
    text: asText(raw.text, fallback.text),
    icon: GOAL_ICONS.includes(icon as GoalIcon) ? (icon as GoalIcon) : fallback.icon,
  }
}

const normalizeMember = (raw: unknown, fallback: Member): Member => {
  if (!isRecord(raw)) return fallback
  const tier = raw.tier
  return {
    id: asId(raw.id, fallback.id),
    name: asText(raw.name, fallback.name),
    latinName: asText(raw.latinName, fallback.latinName),
    major: asText(raw.major, fallback.major),
    role: asText(raw.role, fallback.role),
    team: asText(raw.team, fallback.team),
    tier: MEMBER_TIERS.includes(tier as MemberTier)
      ? (tier as MemberTier)
      : fallback.tier,
  }
}

export function normalizeContent(raw: unknown): SiteContent {
  const fallback = createDefaultContent()
  if (!isRecord(raw)) return fallback

  const site = isRecord(raw.site) ? raw.site : {}
  const hero = isRecord(raw.hero) ? raw.hero : {}
  const philosophy = isRecord(hero.philosophy) ? hero.philosophy : {}
  const goalsSection = isRecord(raw.goalsSection) ? raw.goalsSection : {}
  const teamPage = isRecord(raw.teamPage) ? raw.teamPage : {}
  const cta = isRecord(raw.cta) ? raw.cta : {}

  const goals = Array.isArray(raw.goals)
    ? raw.goals.map((goal, index) =>
        normalizeGoal(goal, fallback.goals[index] ?? fallback.goals[0]),
      )
    : fallback.goals

  const members = Array.isArray(raw.members)
    ? raw.members.map((member, index) =>
        normalizeMember(member, fallback.members[index] ?? fallback.members[0]),
      )
    : fallback.members

  return {
    version: 1,
    updatedAt: asText(raw.updatedAt, ''),
    site: {
      teamName: asText(site.teamName, fallback.site.teamName),
      acronym: asText(site.acronym, fallback.site.acronym),
      taglineEn: asText(site.taglineEn, fallback.site.taglineEn),
      taglineAr: asText(site.taglineAr, fallback.site.taglineAr),
      university: asText(site.university, fallback.site.university),
      universityEn: asText(site.universityEn, fallback.site.universityEn),
    },
    hero: {
      badge: asText(hero.badge, fallback.hero.badge),
      title: asText(hero.title, fallback.hero.title),
      titleAccent: asText(hero.titleAccent, fallback.hero.titleAccent),
      philosophy: {
        ideaLabel: asText(philosophy.ideaLabel, fallback.hero.philosophy.ideaLabel),
        idea: asText(philosophy.idea, fallback.hero.philosophy.idea),
        offerLabel: asText(philosophy.offerLabel, fallback.hero.philosophy.offerLabel),
        offer: asText(philosophy.offer, fallback.hero.philosophy.offer),
        strengthLabel: asText(
          philosophy.strengthLabel,
          fallback.hero.philosophy.strengthLabel,
        ),
        strength: asText(philosophy.strength, fallback.hero.philosophy.strength),
      },
      primaryCta: asText(hero.primaryCta, fallback.hero.primaryCta),
      secondaryCta: asText(hero.secondaryCta, fallback.hero.secondaryCta),
    },
    goalsSection: {
      eyebrow: asText(goalsSection.eyebrow, fallback.goalsSection.eyebrow),
      title: asText(goalsSection.title, fallback.goalsSection.title),
      description: asText(goalsSection.description, fallback.goalsSection.description),
      quote: asText(goalsSection.quote, fallback.goalsSection.quote),
    },
    teamPage: {
      eyebrow: asText(teamPage.eyebrow, fallback.teamPage.eyebrow),
      title: asText(teamPage.title, fallback.teamPage.title),
      description: asText(teamPage.description, fallback.teamPage.description),
    },
    cta: {
      eyebrow: asText(cta.eyebrow, fallback.cta.eyebrow),
      title: asText(cta.title, fallback.cta.title),
      description: asText(cta.description, fallback.cta.description),
      button: asText(cta.button, fallback.cta.button),
    },
    goals,
    members,
  }
}

export function loadContent(): SiteContent {
  try {
    const stored = window.localStorage.getItem(CONTENT_STORAGE_KEY)
    if (!stored) return createDefaultContent()
    return normalizeContent(JSON.parse(stored))
  } catch {
    return createDefaultContent()
  }
}

export function persistContent(content: SiteContent) {
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content))
}

export function parseImportedContent(rawText: string): SiteContent {
  let parsed: unknown
  try {
    parsed = JSON.parse(rawText)
  } catch {
    throw new Error('The file is not valid JSON.')
  }
  if (
    !isRecord(parsed) ||
    !isRecord(parsed.hero) ||
    !Array.isArray(parsed.goals) ||
    !Array.isArray(parsed.members)
  ) {
    throw new Error('The file structure does not match this site’s content.')
  }
  return normalizeContent(parsed)
}

export const getMajorCount = (members: Member[]) =>
  new Set(members.map((member) => member.major.trim()).filter(Boolean)).size

export const TIER_LABELS: Record<MemberTier, string> = {
  president: 'Team President',
  vice: 'Vice President',
  lead: 'Team Lead',
  member: 'Member',
}

export const TIER_OPTIONS: { value: MemberTier; label: string }[] = [
  { value: 'president', label: 'Team President' },
  { value: 'vice', label: 'Vice President' },
  { value: 'lead', label: 'Team Lead' },
  { value: 'member', label: 'Member' },
]

export const GOAL_ICON_OPTIONS: { value: GoalIcon; label: string }[] = [
  { value: 'users', label: 'Community' },
  { value: 'compass', label: 'Direction & Expansion' },
  { value: 'trophy', label: 'Achievement' },
  { value: 'rocket', label: 'Initiative' },
  { value: 'graduation', label: 'Learning' },
  { value: 'network', label: 'Networking' },
]
