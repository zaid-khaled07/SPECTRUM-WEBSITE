import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Eye, FileText } from 'lucide-react'
import { SpectrumArcs } from '../components/SpectrumArcs'
import { Reveal } from '../components/Reveal'
import { EASE } from '../lib/motion'
import type { Route } from '../hooks/useHashRoute'

interface QuestionBanksProps {
  navigate: (route: Route) => void
}

const PDF_BANKS = [
  { id: 'bank-calculus', title: 'Calculus 1', file: 'calculus1.pdf' },
  { id: 'bank-physics', title: 'Physics 1', file: 'physics1.pdf' },
  { id: 'bank-cpp', title: 'C++', file: 'cpp.pdf' },
  { id: 'bank-python', title: 'Python', file: 'python.pdf' },
]

export function QuestionBanks({ navigate }: QuestionBanksProps) {
  const reduced = useReducedMotion()

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
            <span className="text-caramel-dark">Question Banks</span>
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
            <SpectrumArcs className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-[460px] text-cream/10 sm:h-80 sm:w-[560px]" />

            <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="max-w-2xl"
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-[10px] font-medium tracking-[0.16em] text-cream/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-caramel-light" />
                  Question Banks
                  <span className="text-cream/25">/</span>
                  <span className="font-latin" dir="ltr">
                    SPC LIBRARY
                  </span>
                </span>
                <h1 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold uppercase leading-[1.2] text-cream">
                  Question Banks <span className="text-caramel-light">(SPC)</span>
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-8 text-cream/60">
                  A curated library of question banks from the Spectrum team. Each
                  document sits in its own card — open it in the browser or download
                  it directly.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-[11px] text-cream/60">
                    <FileText className="h-3.5 w-3.5 text-caramel-light" strokeWidth={1.7} />
                    4 PDF documents
                  </span>
                  <span
                    className="font-latin text-[9px] uppercase tracking-[0.24em] text-cream/30"
                    dir="ltr"
                  >
                    PDF · A4 · Ready to read
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                className="relative hidden h-52 w-52 shrink-0 items-center justify-center lg:flex xl:h-60 xl:w-60"
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-full border border-cream/[0.08]" />
                <div className="absolute inset-5 rounded-full border border-dashed border-cream/[0.12]" />
                <div className="absolute inset-12 rounded-full bg-caramel/15 blur-2xl" />
                <FileText className="relative h-20 w-20 text-cream/70" strokeWidth={1.1} />
                <span className="absolute -left-2 top-10 h-1.5 w-1.5 rounded-full bg-caramel-light shadow-[0_0_18px_rgba(213,161,106,0.9)]" />
                <span className="absolute bottom-6 right-2 h-1 w-1 rounded-full bg-cream/35" />
                <span
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-latin text-[8px] uppercase tracking-[0.32em] text-cream/30"
                  dir="ltr"
                >
                  Study · Practice · Master
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-16 pt-4 sm:pb-20 sm:pt-6" aria-labelledby="banks-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-1/3 h-96 w-96 rounded-full bg-dune/25 blur-[120px]" />
        </div>

        <div className="shell relative">
          <h2 id="banks-heading" className="sr-only">
            Question bank PDFs
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {PDF_BANKS.map((bank, index) => (
              <Reveal key={bank.id} delay={(index % 2) * 0.08}>
                <motion.article
                  whileHover={reduced ? undefined : { y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-espresso/10 bg-ivory p-6 shadow-card transition-colors duration-500 hover:border-caramel/35 sm:p-7"
                >
                  <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-caramel/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-espresso/10 bg-linen text-espresso transition-colors duration-500 group-hover:border-caramel/30 group-hover:text-caramel-dark">
                      <FileText className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-latin text-[11px] tracking-[0.18em] text-ink/35">
                      {`0${index + 1}`}
                    </span>
                  </div>

                  <div className="relative mt-6 flex-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-espresso/10 bg-linen/60 px-2.5 py-1 font-latin text-[9px] font-semibold uppercase tracking-[0.14em] text-caramel-dark">
                      <span className="h-1 w-1 rounded-full bg-caramel" />
                      PDF Document
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold text-espresso sm:text-[22px]">
                      {bank.title}
                    </h3>
                    <p
                      className="mt-1 text-left font-latin text-[11px] tracking-[0.08em] text-ink/40"
                      dir="ltr"
                    >
                      {bank.file}
                    </p>
                    <p className="mt-3 text-[13px] leading-7 text-ink/60">
                      Open this question bank in a new tab to review it, or save a
                      copy for offline practice.
                    </p>
                  </div>

                  <div className="relative mt-6 flex flex-wrap gap-2.5 border-t border-espresso/10 pt-5">
                    <a
                      href={`./${bank.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary !px-5 !py-2.5 !text-[12px]"
                      aria-label={`View ${bank.title} (${bank.file})`}
                    >
                      <Eye className="h-4 w-4" strokeWidth={1.7} />
                      View PDF
                    </a>
                    <a
                      href={`./${bank.file}`}
                      download={bank.file}
                      className="btn-secondary !px-5 !py-2.5 !text-[12px]"
                      aria-label={`Download ${bank.title} (${bank.file})`}
                    >
                      <Download className="h-4 w-4 text-caramel-dark" strokeWidth={1.7} />
                      Download
                    </a>
                  </div>

                  <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-caramel to-caramel/0 transition-transform duration-500 group-hover:scale-x-100" />
                </motion.article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[1.75rem] border border-espresso/10 bg-ivory/70 px-6 py-6 text-center shadow-card backdrop-blur sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linen text-caramel-dark">
                  <FileText className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-base text-espresso">More resources are on the way</p>
                  <p className="mt-1 text-xs leading-6 text-ink/50">
                    New banks will be added here as the team prepares them.
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => navigate('/')} className="btn-secondary group shrink-0">
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
