import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { SpectrumMark } from '../components/SpectrumLogo'
import { SpectrumArcs } from '../components/SpectrumArcs'
import { CountUp, Reveal } from '../components/Reveal'
import { getMajorCount, TIER_LABELS } from '../lib/content'
import { getInitials, padNumber } from '../lib/arabic'
import { EASE } from '../lib/motion'
import type { Member } from '../types'
import type { Route } from '../hooks/useHashRoute'

interface TeamProps {
  navigate: (route: Route) => void
  onGoals: () => void
}

const AVATAR_GRADIENTS = [
  'from-[#B67845] via-[#8B532C] to-[#3A2416]',
  'from-[#6B4A33] via-[#4B2F1F] to-[#22150D]',
  'from-[#D5A16A] via-[#B67845] to-[#6E3F22]',
  'from-[#8A5A3B] via-[#67432C] to-[#2B1A10]',
  'from-[#C99B6B] via-[#A06840] to-[#4B2F1F]',
]

const TEAM_DOTS: Record<string, string> = {
  'Logic Team': 'bg-caramel',
  'Research Team': 'bg-espresso',
  'Relations Team': 'bg-[#9A6A45]',
  'Media Team': 'bg-[#D5A16A]',
  Meetings: 'bg-dune',
}

export function Team({ navigate, onGoals }: TeamProps) {
  const { content } = useContent()
  const { members, teamPage } = content

  const president = members.find((member) => member.tier === 'president')
  const vice = members.filter((member) => member.tier === 'vice')
  const leads = members.filter((member) => member.tier === 'lead')
  const leadership = members.filter((member) => member.tier !== 'member')
  const memberNumber = (member: Member) => members.indexOf(member) + 1

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-8 sm:pt-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-caramel/10 blur-[110px]" />
          <div className="absolute right-0 top-32 h-64 w-64 bg-dots opacity-40" />
        </div>

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 font-latin text-[11px] text-ink/45">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="transition hover:text-espresso"
            >
              Home
            </button>
            <span className="text-ink/40">/</span>
            <span className="text-caramel-dark">{teamPage.eyebrow}</span>
          </nav>

          <div className="grain grain-light relative overflow-hidden rounded-[2.25rem] border border-cream/10 bg-espresso text-cream shadow-warm sm:rounded-[2.75rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #F7EFE3 1px, transparent 1px), linear-gradient(to bottom, #F7EFE3 1px, transparent 1px)',
                backgroundSize: '58px 58px',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,rgba(213,161,106,0.2),transparent_50%)]" />
            <SpectrumArcs className="pointer-events-none absolute -left-10 -bottom-16 h-72 w-[460px] text-cream/10 sm:h-80 sm:w-[560px]" />

            <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="max-w-2xl"
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-[10px] font-medium tracking-[0.16em] text-cream/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-caramel-light" />
                  {teamPage.eyebrow}
                  <span className="text-cream/25">/</span>
                  <span className="font-latin" dir="ltr">
                    SPC TEAM
                  </span>
                </span>
                <h1 className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.7rem)] font-semibold leading-[1.25] text-cream">
                  {teamPage.title}
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-8 text-cream/60">
                  {teamPage.description}
                </p>

                <div className="mt-9 flex max-w-lg items-stretch divide-x divide-cream/10 border-t border-cream/10 pt-6">
                  {[
                    { value: leadership.length, label: 'Leadership Team' },
                    { value: getMajorCount(leadership), label: 'Majors' },
                    { value: leads.length, label: 'Team Leads' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-1 flex-col gap-1 px-4 first:pl-0">
                      <span className="font-display text-2xl font-semibold text-cream sm:text-[28px]">
                        <CountUp value={stat.value} />
                      </span>
                      <span className="text-[10px] text-cream/40">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                className="relative hidden h-56 w-56 shrink-0 items-center justify-center lg:flex xl:h-64 xl:w-64"
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-full border border-cream/[0.08]" />
                <div className="absolute inset-5 rounded-full border border-dashed border-cream/[0.12]" />
                <div className="absolute inset-12 rounded-full bg-caramel/15 blur-2xl" />
                <SpectrumMark className="relative h-24 w-24 xl:h-28 xl:w-28" />
                <span className="absolute -left-2 top-10 h-1.5 w-1.5 rounded-full bg-caramel-light shadow-[0_0_18px_rgba(213,161,106,0.9)]" />
                <span className="absolute bottom-6 right-2 h-1 w-1 rounded-full bg-cream/35" />
                <span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-latin text-[8px] uppercase tracking-[0.32em] text-cream/30"
                  dir="ltr"
                >
                  One team · Many spectra
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 sm:py-16" aria-labelledby="org-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-1/3 h-96 w-96 rounded-full bg-dune/25 blur-[120px]" />
        </div>

        <div className="shell relative">
          <h2 id="org-heading" className="sr-only">
            Spectrum team structure
          </h2>

          {members.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-espresso/20 bg-ivory/60 p-10 text-center">
                <Users className="mx-auto h-8 w-8 text-caramel-dark" />
                <p className="mt-4 font-display text-lg text-espresso">No members to show yet</p>
                <p className="mt-2 text-sm text-ink/50">Members are added from the admin dashboard.</p>
              </div>
            </Reveal>
          ) : (
            <div className="mx-auto max-w-5xl">
              {president && (
                <Reveal>
                  <PresidentCard member={president} number={memberNumber(president)} />
                </Reveal>
              )}

              {vice.length > 0 && (
                <>
                  <Connector />
                  <GroupLabel
                    title={vice.length === 1 ? 'Vice President' : 'Vice Presidents'}
                    count={vice.length}
                  />
                  <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-4">
                    {vice.map((member) => (
                      <ViceCard key={member.id} member={member} number={memberNumber(member)} />
                    ))}
                  </div>
                </>
              )}

              {leads.length > 0 && (
                <>
                  <Connector />
                  <GroupLabel title="Team Leads" count={leads.length} />
                  <div className="flex flex-wrap justify-center gap-4">
                    {leads.map((member) => (
                      <MemberCard key={member.id} member={member} number={memberNumber(member)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <Reveal className="mt-16">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] border border-espresso/10 bg-ivory/70 px-6 py-9 text-center shadow-card backdrop-blur sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linen text-caramel-dark">
                  <Target className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-lg text-espresso">Every member adds a different color</p>
                  <p className="mt-1 text-xs leading-6 text-ink/50">
                    Explore the goals that bring us together and shape our next step.
                  </p>
                </div>
              </div>
              <button type="button" onClick={onGoals} className="btn-secondary group shrink-0">
                Explore Our Goals
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Connector() {
  const reduced = useReducedMotion()
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <motion.div
        initial={reduced ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative h-14 w-px origin-top bg-gradient-to-b from-espresso/10 via-espresso/25 to-espresso/10"
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream bg-caramel" />
      </motion.div>
    </div>
  )
}

function GroupLabel({ title, count }: { title: string; count: number }) {
  return (
    <Reveal className="mb-8 flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-espresso/15 sm:w-16" />
      <span className="inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-cream/80 px-4 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-ink/60">
        {title}
        <span className="font-latin text-caramel-dark" dir="ltr">
          / {count}
        </span>
      </span>
      <span className="h-px w-10 bg-espresso/15 sm:w-16" />
    </Reveal>
  )
}

function PresidentCard({ member, number }: { member: Member; number: number }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="grain grain-light relative overflow-hidden rounded-[2.25rem] bg-espresso p-6 text-cream shadow-warm sm:p-9"
    >
      <SpectrumArcs className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-96 text-cream/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-caramel/60 to-transparent" />

      <div className="relative grid items-center gap-7 md:grid-cols-[auto_1fr_auto]">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.75rem] border border-cream/15 bg-gradient-to-br from-[#C98B55] via-[#96613A] to-[#3A2416] sm:h-28 sm:w-28">
            <span className="font-latin text-2xl font-semibold text-cream sm:text-3xl">
              {getInitials(member.latinName || member.name)}
            </span>
            <SpectrumArcs className="absolute -bottom-1 left-0 w-full text-cream/25" />
          </div>
          <span className="absolute -bottom-2 -left-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-espresso bg-caramel-light text-espresso">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 text-[9px] font-semibold tracking-[0.18em] text-caramel-light">
            Team President
            <span className="h-1 w-1 rounded-full bg-caramel-light/60" />
            Leadership
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold uppercase text-cream sm:text-[32px]">
            {member.name}
          </h3>
          {member.latinName && member.latinName !== member.name && (
            <p
              className="mt-1 text-left font-latin text-[10px] uppercase tracking-[0.22em] text-cream/35"
              dir="ltr"
            >
              {member.latinName}
            </p>
          )}
          <p className="mt-3 text-sm leading-7 text-cream/70">{member.role}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/[0.06] px-3 py-1.5 text-[10px] text-cream/60">
              <GraduationCap className="h-3.5 w-3.5 text-caramel-light" strokeWidth={1.7} />
              {member.major}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/[0.06] px-3 py-1.5 text-[10px] text-cream/60">
              <span className="h-1.5 w-1.5 rounded-full bg-caramel-light" />
              {member.team}
            </span>
          </div>
        </div>

        <div className="hidden flex-col items-end gap-3 md:flex">
          <span className="font-latin text-[76px] font-light leading-none text-cream/[0.14]">
            {padNumber(number)}
          </span>
          <span
            className="font-latin text-[8px] uppercase tracking-[0.28em] text-cream/25"
            dir="ltr"
          >
            SPC / Leadership
          </span>
        </div>
      </div>
    </motion.article>
  )
}

function ViceCard({ member, number }: { member: Member; number: number }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="relative w-full overflow-hidden rounded-[2rem] border border-espresso/10 bg-gradient-to-br from-sand via-linen to-ivory p-6 shadow-card sm:p-8"
    >
      <SpectrumArcs className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-72 text-espresso/10" />
      <span className="absolute left-6 top-5 font-latin text-[11px] tracking-[0.16em] text-ink/40">
        {padNumber(number)}
      </span>
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] border border-espresso/10 bg-gradient-to-br from-[#6B4A33] to-[#22150D]">
          <span className="font-latin text-xl font-semibold text-cream">
            {getInitials(member.latinName || member.name)}
          </span>
          <SpectrumArcs className="absolute -bottom-1 left-0 w-full text-cream/25" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full border border-espresso/10 bg-white/50 px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-caramel-dark">
            {TIER_LABELS[member.tier]}
          </span>
          <h3 className="mt-2 font-display text-xl font-semibold uppercase text-espresso sm:text-2xl">
            {member.name}
          </h3>
          {member.latinName && member.latinName !== member.name && (
            <p
              className="mt-0.5 text-left font-latin text-[9px] uppercase tracking-[0.18em] text-ink/35"
              dir="ltr"
            >
              {member.latinName}
            </p>
          )}
          <p className="mt-2 text-[13px] leading-7 text-ink/65">{member.role}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-ink/50">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-caramel-dark" strokeWidth={1.7} />
              {member.major}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${TEAM_DOTS[member.team] ?? 'bg-caramel'}`} />
              {member.team}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function MemberCard({ member, number }: { member: Member; number: number }) {
  const accent = AVATAR_GRADIENTS[number % AVATAR_GRADIENTS.length]

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group relative w-full overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-ivory p-6 shadow-card transition-colors duration-500 hover:border-caramel/35 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
    >
      <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-caramel/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.3rem] border border-espresso/10 bg-gradient-to-br">
          <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
          <span className="relative font-latin text-lg font-semibold text-cream">
            {getInitials(member.latinName || member.name)}
          </span>
          <SpectrumArcs className="absolute -bottom-1 left-0 w-full text-cream/30" />
        </div>
        <span className="font-latin text-[11px] tracking-[0.16em] text-ink/35">
          {padNumber(number)}
        </span>
      </div>

      <div className="relative mt-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-espresso/10 bg-linen/60 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-caramel-dark">
          <span className={`h-1 w-1 rounded-full ${TEAM_DOTS[member.team] ?? 'bg-caramel'}`} />
          {member.team}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold uppercase text-espresso">{member.name}</h3>
        {member.latinName && member.latinName !== member.name && (
          <p
            className="mt-1 text-left font-latin text-[9px] uppercase tracking-[0.18em] text-ink/35"
            dir="ltr"
          >
            {member.latinName}
          </p>
        )}
        <p className="mt-3 min-h-[3.5rem] text-[13px] leading-7 text-ink/65">{member.role}</p>
      </div>

      <div className="relative mt-5 flex items-center gap-2 border-t border-espresso/10 pt-4 text-[10px] text-ink/50">
        <GraduationCap className="h-3.5 w-3.5 shrink-0 text-caramel-dark" strokeWidth={1.7} />
        <span>{member.major}</span>
      </div>

      <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-caramel to-caramel/0 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  )
}
