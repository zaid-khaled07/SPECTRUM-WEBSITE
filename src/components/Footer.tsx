import { ArrowRight, ArrowUpRight, Instagram, LockKeyhole } from 'lucide-react'
import { SpectrumLogo } from './SpectrumLogo'
import { SpectrumArcs } from './SpectrumArcs'
import { useContent } from '../context/ContentContext'
import type { Route } from '../hooks/useHashRoute'
import { INSTAGRAM_URL, JOIN_FORM_URL } from '../lib/links'

interface FooterProps {
  navigate: (route: Route) => void
  onGoals: () => void
}

export function Footer({ navigate, onGoals }: FooterProps) {
  const { content } = useContent()
  const year = new Date().getFullYear()

  return (
    <footer className="grain grain-light relative overflow-hidden bg-espresso text-cream">
      <SpectrumArcs className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[640px] text-cream/[0.06]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-caramel/40 to-transparent" />

      <div className="shell relative z-10 pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label="Spectrum SPC — Home"
              className="rounded-2xl transition-opacity hover:opacity-85"
            >
              <SpectrumLogo light />
            </button>
            <p className="mt-6 max-w-sm text-sm leading-7 text-cream/55">
              A student team at {content.site.university}, bringing students
              from every major together to exchange experience, train side by
              side, and grow step by step.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Spectrum on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition hover:border-cream/35 hover:bg-cream/5 hover:text-cream"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.7} />
              </a>
              <a
                href={JOIN_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2.5 text-[11px] font-semibold text-cream/70 transition hover:border-cream/35 hover:bg-cream/5 hover:text-cream"
              >
                Join / Apply Now
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <p
              className="mt-5 text-left font-latin text-[10px] uppercase tracking-[0.3em] text-caramel-light/75"
              dir="ltr"
            >
              {content.site.taglineEn}
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-cream/40">Explore</h2>
            <ul className="mt-5 space-y-3.5">
              {[
                { label: 'Home', action: () => navigate('/') },
                { label: 'Our Goals', action: onGoals },
                { label: 'Team Members', action: () => navigate('/team') },
                { label: 'Question Banks', action: () => navigate('/questions') },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={link.action}
                    className="group inline-flex items-center gap-2 text-sm text-cream/65 transition hover:text-cream"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-cream/40">University</h2>
            <p className="mt-5 font-latin text-sm leading-7 text-cream/65" dir="ltr">
              {content.site.universityEn}
            </p>
            <p className="mt-2 text-xs text-cream/35">Jordan · A multidisciplinary student community</p>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-[11px] text-cream/50 transition hover:border-cream/30 hover:bg-cream/5 hover:text-cream/80"
            >
              <LockKeyhole className="h-3.5 w-3.5" strokeWidth={1.7} />
              Admin Dashboard
            </button>
          </div>
        </div>

        <div className="mt-14 flex gap-1.5">
          <span className="h-1 w-16 rounded-full bg-caramel-light/80" />
          <span className="h-1 w-8 rounded-full bg-caramel/60" />
          <span className="h-1 w-5 rounded-full bg-cream/30" />
          <span className="h-1 w-3 rounded-full bg-cream/15" />
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[11px] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-1.5">
            <span className="font-latin" dir="ltr">
              © {year} Spectrum SPC
            </span>
            <span className="text-cream/20">—</span>
            <span>All rights reserved.</span>
          </p>
          <p className="inline-flex items-center gap-2">
            Designed with passion at {content.site.universityEn}
            <ArrowUpRight className="h-3.5 w-3.5 text-caramel-light/70" />
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        dir="ltr"
        className="pointer-events-none absolute inset-x-0 -bottom-[4vw] z-0 select-none whitespace-nowrap text-center font-latin text-[19vw] font-semibold uppercase leading-none tracking-[0.06em] text-cream/[0.04]"
      >
        Spectrum
      </p>
    </footer>
  )
}
