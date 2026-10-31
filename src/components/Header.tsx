import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Instagram,
  LockKeyhole,
  Menu,
  X,
} from 'lucide-react'
import { SpectrumArcs } from './SpectrumArcs'
import { useContent } from '../context/ContentContext'
import type { Route } from '../hooks/useHashRoute'
import { EASE } from '../lib/motion'
import { INSTAGRAM_URL, JOIN_FORM_URL } from '../lib/links'

interface HeaderProps {
  route: Route
  navigate: (route: Route) => void
  onGoals: () => void
}

export function HeaderBrand({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <img
        src="./logo.jpg"
        alt="Spectrum SPC logo"
        className={`h-12 w-12 rounded-2xl object-cover shadow-card sm:h-[52px] sm:w-[52px] ${
          light ? 'ring-1 ring-cream/25' : 'ring-1 ring-espresso/15'
        }`}
      />
      <span className="flex flex-col items-start leading-none">
        <span
          className={`font-display text-[19px] font-semibold tracking-tight sm:text-[21px] ${
            light ? 'text-cream' : 'text-espresso'
          }`}
        >
          Spectrum SPC
        </span>
        <span
          className={`mt-1.5 font-latin text-[8px] uppercase tracking-[0.3em] sm:text-[9px] ${
            light ? 'text-caramel-light/80' : 'text-ink/45'
          }`}
        >
          From Binary to Beyond
        </span>
      </span>
    </span>
  )
}

export function Header({ route, navigate, onGoals }: HeaderProps) {
  const { content } = useContent()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    setMenuOpen(false)
  }, [route])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const deskLinks = [
    { label: 'Home', active: route === '/', action: () => navigate('/') },
    { label: 'Our Goals', active: false, action: onGoals },
    { label: 'Team Members', active: route === '/team', action: () => navigate('/team') },
    {
      label: 'Question Banks',
      active: route === '/questions',
      action: () => navigate('/questions'),
    },
  ]

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-cream/10 bg-espresso text-cream/70">
        <div className="shell flex h-9 items-center justify-between gap-4 text-[10px]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel-light opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caramel-light" />
            </span>
            <span className="font-latin tracking-[0.2em] text-cream/80" dir="ltr">
              SPECTRUM SPC
            </span>
            <span className="hidden text-cream/20 sm:inline">/</span>
            <span className="hidden font-latin uppercase tracking-[0.18em] text-cream/65 sm:inline" dir="ltr">
              From Binary to Beyond
            </span>
          </div>
          <span className="hidden font-latin tracking-[0.08em] text-cream/55 sm:inline" dir="ltr">
            {content.site.university}
          </span>
          <span className="font-latin tracking-[0.2em] text-cream/45 sm:hidden" dir="ltr">
            BAU · SPC
          </span>
        </div>
      </div>

      <div className="border-b border-espresso/10 bg-cream/85 backdrop-blur-xl">
        <div className="shell flex h-[78px] items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Spectrum SPC — Home"
            className="rounded-2xl transition-opacity duration-300 hover:opacity-80"
          >
            <HeaderBrand />
          </button>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <div className="flex items-center gap-1 rounded-full border border-espresso/10 bg-white/45 p-1.5 shadow-inset">
              {deskLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.action}
                  aria-current={link.active ? 'page' : undefined}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    link.active ? 'text-ivory' : 'text-ink/65 hover:text-ink'
                  }`}
                >
                  {link.active && (
                    <motion.span
                      layoutId="header-active-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-espresso"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={JOIN_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary group hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex"
            >
              Join / Apply
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Spectrum on Instagram"
              title="Spectrum on Instagram"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-ink/50 transition duration-300 hover:border-espresso/30 hover:bg-white/50 hover:text-espresso lg:inline-flex"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.7} />
            </a>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              aria-label="Admin access"
              title="Admin access"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-ink/45 transition duration-300 hover:border-espresso/30 hover:bg-white/50 hover:text-espresso lg:inline-flex"
            >
              <LockKeyhole className="h-4 w-4" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 bg-white/40 text-espresso transition hover:bg-white/70 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.div
              className="absolute inset-0 bg-espresso"
              initial={{ clipPath: 'circle(0% at 92% 6%)' }}
              animate={{ clipPath: 'circle(145% at 92% 6%)' }}
              exit={{ clipPath: 'circle(0% at 92% 6%)' }}
              transition={{ duration: reduced ? 0.01 : 0.58, ease: EASE }}
            />
            <div className="grain grain-light relative flex h-full flex-col overflow-y-auto text-cream">
              <div className="shell flex h-[88px] shrink-0 items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  aria-label="Spectrum SPC — Home"
                >
                  <HeaderBrand light />
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:bg-cream/10"
                >
                  <X className="h-5 w-5" strokeWidth={1.7} />
                </button>
              </div>

              <div className="shell flex flex-1 flex-col justify-center py-8">
                <nav aria-label="Mobile navigation">
                  {[
                    { label: 'Home', action: () => navigate('/') },
                    { label: 'Our Goals', action: onGoals },
                    { label: 'Team Members', action: () => navigate('/team') },
                    { label: 'Question Banks', action: () => navigate('/questions') },
                  ].map((link, index) => (
                    <motion.button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        link.action()
                      }}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + index * 0.08, duration: 0.5, ease: EASE }}
                      className="group flex w-full items-center justify-between gap-4 border-b border-cream/10 py-5 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-latin text-[11px] tracking-[0.2em] text-cream/35">
                          {`0${index + 1}`}
                        </span>
                        <span className="font-display text-3xl font-medium text-cream transition group-hover:text-caramel-light">
                          {link.label}
                        </span>
                      </span>
                      <ArrowRight className="h-5 w-5 translate-x-0 text-cream/30 transition group-hover:translate-x-1 group-hover:text-caramel-light" />
                    </motion.button>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-10 flex flex-col gap-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={JOIN_FORM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-light group"
                    >
                      Join / Apply Now
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Spectrum on Instagram"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition hover:border-cream/40 hover:bg-cream/10 hover:text-cream"
                    >
                      <Instagram className="h-5 w-5" strokeWidth={1.6} />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="inline-flex items-center gap-2 self-start rounded-full border border-cream/15 px-4 py-2 text-xs text-cream/55 transition hover:border-cream/30 hover:text-cream"
                  >
                    <LockKeyhole className="h-3.5 w-3.5" strokeWidth={1.7} />
                    Admin access
                  </button>

                  <div className="flex items-center justify-between gap-4 border-t border-cream/10 pt-5">
                    <p className="font-latin text-xs leading-6 text-cream/45" dir="ltr">
                      {content.site.university}
                    </p>
                    <p className="font-latin text-[9px] uppercase tracking-[0.22em] text-cream/30" dir="ltr">
                      Binary → Beyond
                    </p>
                  </div>
                </motion.div>
              </div>

              <SpectrumArcs className="pointer-events-none absolute -bottom-10 left-0 h-44 w-72 text-cream/10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
