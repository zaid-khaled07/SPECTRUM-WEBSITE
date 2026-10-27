import { useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Fingerprint,
  Layers,
  Lightbulb,
  Users,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { SpectrumMark } from '../components/SpectrumLogo'
import { SpectrumArcs } from '../components/SpectrumArcs'
import { GoalGlyph } from '../components/GoalGlyph'
import { CountUp, Reveal } from '../components/Reveal'
import { getMajorCount } from '../lib/content'
import { getInitials } from '../lib/arabic'
import { JOIN_FORM_URL } from '../lib/links'
import { EASE, VIEWPORT } from '../lib/motion'
import type { Route } from '../hooks/useHashRoute'

interface HomeProps {
  navigate: (route: Route) => void
  onGoals: () => void
}

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export function Home({ navigate, onGoals }: HomeProps) {
  const { content } = useContent()
  const { hero, goals, goalsSection, members, cta } = content
  const memberCount = members.length
  const majorCount = getMajorCount(members)
  const president = members.find((member) => member.tier === 'president')

  useEffect(() => {
    if (window.sessionStorage.getItem('spectrum:scroll-target') !== 'goals') return
    window.sessionStorage.removeItem('spectrum:scroll-target')
    const timer = window.setTimeout(() => {
      document.getElementById('goals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 420)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-16 h-[520px] w-[520px] rounded-full bg-caramel/10 blur-[110px]" />
          <div className="absolute -right-32 top-0 h-[420px] w-[420px] rounded-full border border-espresso/[0.05]" />
          <div className="absolute -right-10 top-24 h-[280px] w-[280px] rounded-full border border-espresso/[0.06]" />
          <div className="absolute right-[8%] top-8 h-24 w-24 bg-dots opacity-50" />
          <div className="absolute bottom-10 left-[42%] hidden h-px w-72 bg-gradient-to-l from-transparent via-espresso/15 to-transparent lg:block" />
        </div>

        <div className="shell relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 xl:gap-16">
            <motion.div variants={heroStagger} initial="hidden" animate="visible">
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-white/55 px-4 py-2 text-[11px] font-medium text-ink/65 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
                  {hero.badge}
                </span>
                <span className="font-latin text-[9px] uppercase tracking-[0.26em] text-ink/35" dir="ltr">
                  SPC · BAU
                </span>
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="mt-6 font-display text-[clamp(2.55rem,5.8vw,5rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink"
              >
                <span className="block">{hero.title}</span>
                <span className="mt-1 flex items-baseline gap-3 sm:mt-1.5 sm:gap-4">
                  <span className="font-latin text-[0.6em] font-light leading-none text-espresso/20">
                    |
                  </span>
                  <span
                    className="text-gradient font-latin font-semibold leading-[1.05]"
                    dir="ltr"
                  >
                    {hero.titleAccent}
                  </span>
                </span>
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mt-6 max-w-xl text-base leading-8 text-ink/65 sm:text-lg sm:leading-9"
              >
                {hero.subtitle}
              </motion.p>

              <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={JOIN_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary group"
                >
                  {hero.primaryCta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <button type="button" onClick={onGoals} className="btn-secondary group">
                  {hero.secondaryCta}
                  <ArrowRight className="h-4 w-4 text-caramel-dark transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </motion.div>

              <motion.div
                variants={heroItem}
                className="mt-9 flex max-w-md items-stretch divide-x divide-espresso/10 rounded-2xl border border-espresso/10 bg-white/40 px-2 py-4 backdrop-blur-sm"
              >
                {[
                  { value: memberCount, label: 'Team Members' },
                  { value: goals.length, label: 'Clear Goals' },
                  { value: majorCount, label: 'Majors' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-1 flex-col items-center gap-1 px-2">
                    <span className="font-display text-2xl font-semibold text-espresso">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="text-[10px] text-ink/45">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <HeroVisual
              presidentName={president?.name}
              presidentLatinName={president?.latinName}
              presidentRole={president?.role}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="relative mt-14 overflow-hidden rounded-[2rem] border border-espresso/10 bg-ivory/80 shadow-card backdrop-blur sm:mt-16"
          >
            <div className="grid divide-y divide-espresso/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {[
                { label: hero.philosophy.ideaLabel, text: hero.philosophy.idea, Icon: Lightbulb },
                { label: hero.philosophy.offerLabel, text: hero.philosophy.offer, Icon: Layers },
                { label: hero.philosophy.strengthLabel, text: hero.philosophy.strength, Icon: Fingerprint },
              ].map((item, index) => (
                <div key={item.label} className="group relative p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-caramel-dark">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-caramel/20 bg-caramel/[0.07] text-caramel-dark">
                        <item.Icon className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                      {item.label}
                    </span>
                    <span className="font-latin text-[10px] tracking-[0.18em] text-ink/40">
                      / {`0${index + 1}`}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-8 text-ink/70">{item.text}</p>
                  <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-caramel to-caramel/0 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee />

      <section id="goals" className="relative scroll-mt-32 overflow-hidden py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-1/4 h-80 w-80 rounded-full bg-dune/30 blur-[100px]" />
          <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-l from-transparent via-espresso/10 to-transparent" />
        </div>

        <div className="shell relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">{goalsSection.eyebrow}</span>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.25] text-espresso">
                {goalsSection.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-ink/60">
                {goalsSection.description}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <button
                type="button"
                onClick={() => navigate('/team')}
                className="group inline-flex items-center gap-3 rounded-full border border-espresso/15 bg-white/40 px-5 py-3 text-sm font-medium text-espresso transition hover:border-espresso/30 hover:bg-white/70"
              >
                <Users className="h-4 w-4 text-caramel-dark" strokeWidth={1.7} />
                Meet the Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <motion.article
                key={goal.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group relative flex min-h-[248px] flex-col overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-ivory p-6 shadow-card transition-colors duration-500 hover:border-espresso sm:p-7"
              >
                <div className="absolute inset-0 bg-espresso opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-caramel/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-espresso/10 bg-linen text-espresso transition-colors duration-500 group-hover:border-cream/15 group-hover:bg-cream/10 group-hover:text-caramel-light">
                    <GoalGlyph icon={goal.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-latin text-[11px] tracking-[0.16em] text-ink/35 transition-colors duration-500 group-hover:text-cream/30">
                    {`0${index + 1}`}
                  </span>
                </div>

                <p className="relative mt-7 text-[11px] font-semibold tracking-[0.18em] text-caramel-dark transition-colors duration-500 group-hover:text-caramel-light">
                  {goal.label}
                </p>
                <p className="relative mt-3 font-display text-[17px] leading-8 text-ink/85 transition-colors duration-500 group-hover:text-cream">
                  {goal.text}
                </p>

                <div className="relative mt-auto flex items-center gap-1.5 pt-7">
                  <span className="h-0.5 w-8 rounded-full bg-caramel/60 transition-all duration-500 group-hover:w-12 group-hover:bg-caramel-light" />
                  <span className="h-0.5 w-4 rounded-full bg-caramel/30 transition-colors group-hover:bg-caramel-light/40" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="grain grain-light relative overflow-hidden bg-bark py-16 text-cream sm:py-20">
        <SpectrumArcs className="pointer-events-none absolute -right-16 -top-8 h-[360px] w-[540px] rotate-180 text-cream/[0.07]" />
        <SpectrumArcs className="pointer-events-none absolute -bottom-10 -left-20 h-[360px] w-[540px] text-cream/[0.07]" />
        <div className="shell relative">
          <Reveal className="flex flex-col items-center text-center">
            <span className="font-latin text-[10px] uppercase tracking-[0.34em] text-caramel-light/80" dir="ltr">
              Spectrum · Strength in difference
            </span>
            <blockquote className="mt-6 max-w-4xl font-display text-[clamp(1.7rem,3.7vw,3rem)] font-medium leading-[1.55] text-cream">
              “{goalsSection.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-1.5">
              <span className="h-1 w-12 rounded-full bg-caramel-light" />
              <span className="h-1 w-6 rounded-full bg-caramel/70" />
              <span className="h-1 w-3 rounded-full bg-cream/30" />
              <span className="h-1 w-1.5 rounded-full bg-cream/20" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="shell">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2.25rem] border border-espresso/10 bg-gradient-to-br from-linen via-sand to-dune p-7 shadow-card sm:rounded-[2.75rem] sm:p-12 lg:p-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -top-28 h-80 w-80 rounded-full border border-espresso/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-8 -top-16 h-56 w-56 rounded-full border border-espresso/10"
              />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div className="max-w-2xl">
                  <span className="eyebrow text-espresso/70">{cta.eyebrow}</span>
                  <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.3] text-espresso">
                    {cta.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-8 text-ink/65">
                    {cta.description}
                  </p>
                  <a
                    href={JOIN_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary group mt-8"
                  >
                    {cta.button}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
                <div className="hidden justify-center lg:flex">
                  <button
                    type="button"
                    onClick={() => navigate('/team')}
                    aria-label="Meet the Team"
                    className="group relative flex h-36 w-36 items-center justify-center rounded-full border border-espresso/20 text-espresso transition hover:bg-espresso hover:text-cream"
                  >
                    <span className="absolute inset-3 rounded-full border border-espresso/15 transition group-hover:border-cream/20" />
                    <SpectrumMark className="h-14 w-14 transition duration-500 group-hover:scale-95" />
                    <span className="absolute -bottom-1 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-espresso text-cream transition group-hover:bg-caramel">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function HeroVisual({
  presidentName,
  presidentLatinName,
  presidentRole,
}: {
  presidentName?: string
  presidentLatinName?: string
  presidentRole?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])

  const handlePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.18, ease: EASE }}
      className="relative mx-auto w-full max-w-[470px] lg:max-w-[500px]"
    >
      <div
        ref={ref}
        onPointerMove={handlePointer}
        onPointerLeave={resetPointer}
        className="relative"
        style={{ perspective: 1400 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="grain grain-light relative aspect-[4/4.65] overflow-hidden rounded-[2.5rem] border border-cream/10 bg-espresso shadow-warm"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(213,161,106,0.24),transparent_58%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #F7EFE3 1px, transparent 1px), linear-gradient(to bottom, #F7EFE3 1px, transparent 1px)',
              backgroundSize: '52px 52px',
            }}
          />
          <SpectrumArcs className="absolute -bottom-8 left-1/2 w-[125%] -translate-x-1/2 text-cream/20" />

          <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
            <div
              className="flex items-center justify-between gap-3 font-latin text-[8px] uppercase tracking-[0.24em] text-cream/35 sm:text-[9px]"
              dir="ltr"
            >
              <span>Al-Balqa Applied University</span>
              <span>SPC — 01</span>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-44 w-44 rounded-full border border-cream/[0.08] sm:h-52 sm:w-52" />
                <motion.div
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-56 w-56 rounded-full border border-dashed border-cream/10 sm:h-64 sm:w-64"
                />
                <div className="absolute h-32 w-32 rounded-full bg-caramel/20 blur-2xl" />
                <div className="absolute top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-caramel-light shadow-[0_0_20px_rgba(213,161,106,0.8)]" />
                <motion.div
                  animate={reduced ? undefined : { rotate: -360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 rounded-full bg-cream/40" />
                  <span className="absolute -right-1 top-1/2 h-1 w-1 rounded-full bg-cream/25" />
                </motion.div>
                <SpectrumMark className="relative h-28 w-28 rounded-[1.7rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:h-32 sm:w-32" />
              </div>
              <p
                className="mt-5 font-latin text-[9px] uppercase tracking-[0.38em] text-caramel-light/75"
                dir="ltr"
              >
                From Binary to Beyond
              </p>
            </div>

            <div>
              <div className="flex items-end justify-between gap-4 border-t border-cream/10 pt-5">
                <div>
                  <p className="font-latin text-[8px] uppercase tracking-[0.28em] text-cream/35" dir="ltr">
                    From Binary
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-medium text-cream sm:text-[28px]">
                    To Beyond<span className="text-caramel-light">.</span>
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/60">
                  <ArrowUpLeft className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-[9px] text-cream/35">
                <span className="font-latin uppercase tracking-[0.14em]">
                  A multidisciplinary student community
                </span>
                <span className="font-latin tracking-[0.16em]" dir="ltr">
                  0101 / BAU
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-4 top-16 hidden items-center gap-2 rounded-2xl border border-espresso/10 bg-ivory/95 px-3.5 py-2.5 shadow-card backdrop-blur sm:flex"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-espresso text-[9px] font-semibold text-cream">
            SPC
          </span>
          <span className="font-latin text-[10px] font-medium uppercase tracking-[0.12em] text-ink/60">
            Student Team
          </span>
        </motion.div>

        <motion.div
          animate={reduced ? undefined : { y: [0, 12, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-espresso/10 bg-ivory/95 px-4 py-3 shadow-card backdrop-blur sm:block"
        >
          <span className="block font-latin text-[9px] uppercase tracking-[0.2em] text-ink/35" dir="ltr">
            Binary → Beyond
          </span>
          <span className="mt-1 block font-latin text-sm tracking-[0.24em] text-espresso" dir="ltr">
            1010 0110
          </span>
        </motion.div>

        {presidentName && (
          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 -right-3 hidden items-center gap-3 rounded-2xl border border-espresso/10 bg-ivory/95 px-4 py-3 shadow-card backdrop-blur md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-caramel to-bark font-latin text-[10px] font-semibold text-cream">
              {getInitials(presidentLatinName ?? presidentName ?? 'SPC')}
            </span>
            <span>
              <span className="block text-[11px] font-semibold text-ink">{presidentName}</span>
              <span className="mt-0.5 block text-[9px] text-ink/45">{presidentRole}</span>
            </span>
          </motion.div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-caramel/20 blur-3xl"
        />
      </div>
    </motion.div>
  )
}

function Marquee() {
  const items = [
    'Spectrum — From Binary to Beyond',
    'Al-Balqa Applied University',
    'Build · Learn · Grow',
    'SPC · From Binary to Beyond',
    'A multidisciplinary student community',
  ]

  return (
    <section
      aria-label="Spectrum in a nutshell"
      className="marquee relative overflow-hidden border-y border-espresso/10 bg-linen/55 py-4"
    >
      <div dir="ltr" className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item, index) => (
              <div key={`${copy}-${index}`} className="flex shrink-0 items-center">
                <span className="px-7 font-display text-[13px] text-ink/55 sm:px-9">{item}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-caramel/50" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
