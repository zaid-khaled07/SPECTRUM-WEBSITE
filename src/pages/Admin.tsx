import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  LogOut,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Type,
  Users,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { SpectrumLogo, SpectrumMark } from '../components/SpectrumLogo'
import { SpectrumArcs } from '../components/SpectrumArcs'
import { HomeEditor } from '../components/admin/HomeEditor'
import { GoalsEditor } from '../components/admin/GoalsEditor'
import { MembersEditor } from '../components/admin/MembersEditor'
import { SettingsEditor } from '../components/admin/SettingsEditor'
import type { ToastTone } from '../components/admin/AdminFields'
import { formatDate } from '../lib/arabic'
import { EASE } from '../lib/motion'
import type { SiteContent } from '../types'
import type { Route } from '../hooks/useHashRoute'

type AdminAuth = ReturnType<typeof useAdminAuth>

type TabId = 'home' | 'goals' | 'members' | 'settings'

interface ToastState {
  id: number
  message: string
  tone: ToastTone
}

const TABS = [
  { id: 'home' as const, label: 'Home & Text', Icon: Type },
  { id: 'goals' as const, label: 'Goals', Icon: Target },
  { id: 'members' as const, label: 'Members', Icon: Users },
  { id: 'settings' as const, label: 'Settings', Icon: Settings2 },
]

const cloneContent = (content: SiteContent): SiteContent =>
  JSON.parse(JSON.stringify(content)) as SiteContent

const normalized = (content: SiteContent) =>
  JSON.stringify({ ...content, updatedAt: '' })

export function Admin({ navigate }: { navigate: (route: Route) => void }) {
  const auth = useAdminAuth()

  return (
    <div className="min-h-screen bg-cream">
      <AdminTopBar navigate={navigate} />
      {auth.isAuthed ? (
        <Dashboard auth={auth} />
      ) : (
        <Login auth={auth} navigate={navigate} />
      )}
    </div>
  )
}

function AdminTopBar({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-xl">
      <div className="shell flex h-[68px] items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Spectrum SPC — Back to site"
          className="rounded-2xl transition-opacity hover:opacity-80"
        >
          <SpectrumLogo compact />
        </button>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-espresso/10 bg-white/50 px-3 py-1.5 text-[10px] font-medium text-ink/50 sm:inline-flex">
            <LockKeyhole className="h-3 w-3" strokeWidth={1.8} />
            Admin Area
          </span>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-white/40 px-4 py-2 text-[11px] font-medium text-ink/60 transition hover:border-espresso/30 hover:bg-white/70 hover:text-espresso"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Site
          </button>
        </div>
      </div>
    </header>
  )
}

function Login({ auth, navigate }: { auth: AdminAuth; navigate: (route: Route) => void }) {
  const { content } = useContent()
  const [username, setUsername] = useState('zaid')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      const ok = await auth.signIn(username, password)
      if (!ok) {
        setError('Incorrect username or password. Please try again.')
        setPassword('')
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Sign-in failed. Please try again.',
      )
    }
  }

  return (
    <main className="relative overflow-hidden py-10 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-caramel/10 blur-[110px]" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-dune/30 blur-[100px]" />
      </div>

      <div className="shell relative">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.25rem] border border-espresso/10 bg-ivory shadow-warm lg:grid-cols-[1.03fr_0.97fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="lg:hidden">
              <SpectrumLogo compact />
            </div>
            <div className="mt-8 lg:mt-0">
              <span className="eyebrow">Admin Dashboard</span>
              <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-tight text-espresso">
                Welcome back.
              </h1>
              <p className="mt-3 max-w-sm text-[13px] leading-7 text-ink/55">
                Sign in with the admin credentials to edit the site texts, goals, and team members.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="field-label">Username</span>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="zaid"
                  autoComplete="username"
                  required
                  className="field"
                  dir="ltr"
                />
              </label>

              <div className="block">
                <label htmlFor="admin-password" className="field-label">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="field pr-12"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink/35 transition hover:bg-linen hover:text-espresso"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={1.7} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={1.7} />
                    )}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-red-900/15 bg-red-50 px-3 py-2.5 text-[11px] leading-5 text-red-900/80"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={auth.isSigningIn}
                className="btn-primary w-full disabled:translate-y-0"
              >
                {auth.isSigningIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  <>
                    <LockKeyhole className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-espresso/10 bg-cream/50 p-3.5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-caramel-dark" strokeWidth={1.7} />
              <p className="text-[10px] leading-5 text-ink/45">
                Local admin gateway for internal use only. Content is stored in this
                browser, and credentials are never sent to any external server.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 text-[11px] text-ink/40 transition hover:text-espresso lg:hidden"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Site
            </button>
          </div>

          <aside className="grain grain-light relative hidden flex-col justify-between overflow-hidden bg-espresso p-10 text-cream lg:flex">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #F7EFE3 1px, transparent 1px), linear-gradient(to bottom, #F7EFE3 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(213,161,106,0.2),transparent_55%)]" />
            <SpectrumArcs className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-[440px] text-cream/10" />

            <div className="relative">
              <SpectrumLogo light compact />
            </div>

            <div className="relative py-10">
              <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-cream/[0.08]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-cream/[0.12]" />
                <div className="absolute inset-12 rounded-full bg-caramel/20 blur-2xl" />
                <SpectrumMark className="relative h-20 w-20" />
              </div>
              <p
                className="mt-8 text-center font-latin text-[8px] uppercase tracking-[0.32em] text-caramel-light/70"
                dir="ltr"
              >
                Admin access · SPC
              </p>
              <h2 className="mt-3 text-center font-display text-[28px] font-semibold leading-snug">
                Admin Space.
              </h2>
              <p className="mx-auto mt-3 max-w-xs text-center text-[12px] leading-7 text-cream/50">
                Keep Spectrum always up to date — texts, goals, and members in one place.
              </p>
            </div>

            <div className="relative space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-cream/10 bg-cream/[0.05] px-4 py-3 text-[11px]">
                <span className="text-cream/40">Team Members</span>
                <span className="font-display text-cream">{content.members.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-cream/10 bg-cream/[0.05] px-4 py-3 text-[11px]">
                <span className="text-cream/40">Goals</span>
                <span className="font-display text-cream">{content.goals.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-cream/10 bg-cream/[0.05] px-4 py-3 text-[11px]">
                <span className="text-cream/40">University</span>
                <span className="font-latin text-[10px] text-cream/70" dir="ltr">
                  {content.site.universityEn}
                </span>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-6 text-center font-latin text-[10px] text-ink/30" dir="ltr">
          Spectrum SPC · Local Admin · v1.0
        </p>
      </div>
    </main>
  )
}

function Dashboard({ auth }: { auth: AdminAuth }) {
  const { content, saveContent, resetContent } = useContent()
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(content))
  const [tab, setTab] = useState<TabId>('home')
  const [toast, setToast] = useState<ToastState | null>(null)

  const dirty = useMemo(() => normalized(draft) !== normalized(content), [draft, content])

  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    setToast({ id: Date.now(), message, tone })
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 4000)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!dirty) return
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const handleSave = () => {
    try {
      const saved = saveContent(draft)
      setDraft(saved)
      showToast('Changes saved successfully.')
    } catch {
      showToast('Could not save changes. Check browser storage availability.', 'error')
    }
  }

  const handleDiscard = () => {
    setDraft(cloneContent(content))
    showToast('Unsaved changes discarded.', 'warning')
  }

  const handleReset = () => {
    const fresh = resetContent()
    setDraft(cloneContent(fresh))
    showToast('Default content restored.')
  }

  const handleSignOut = () => {
    if (dirty) {
      showToast('You have unsaved changes. Save or discard them before signing out.', 'warning')
      return
    }
    auth.signOut()
  }

  return (
    <main className="relative overflow-hidden py-8 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-caramel/10 blur-[100px]" />
        <div className="absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-dune/20 blur-[110px]" />
      </div>

      <div className="shell relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">Admin Area</span>
            <h1 className="mt-3 font-display text-[clamp(1.85rem,3.6vw,2.7rem)] font-semibold leading-tight text-espresso">
              Hey Zaid, keep Spectrum up to date.
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink/45">
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${dirty ? 'bg-caramel' : 'bg-emerald-600'}`} />
                {dirty ? 'Unsaved changes' : 'All changes saved'}
              </span>
              <span className="text-ink/20">·</span>
              <span>Last saved: {formatDate(content.updatedAt)}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="#/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-white/50 px-4 py-2.5 text-[11px] font-semibold text-ink/65 transition hover:border-espresso/30 hover:bg-white/80 hover:text-espresso"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Site
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-white/50 px-4 py-2.5 text-[11px] font-semibold text-ink/65 transition hover:border-red-900/25 hover:bg-red-50 hover:text-red-900/80"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <nav
              aria-label="Admin dashboard sections"
              className="flex gap-1 overflow-x-auto rounded-2xl border border-espresso/10 bg-ivory p-1.5 shadow-card [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map(({ id, label, Icon }) => {
                const active = tab === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex shrink-0 items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[11px] font-medium transition-colors sm:px-3.5 lg:w-full lg:text-[12px] ${
                      active ? 'text-cream' : 'text-ink/55 hover:text-espresso'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="admin-active-tab"
                        className="absolute inset-0 rounded-xl bg-espresso"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className="relative z-10 hidden h-4 w-4 sm:block" strokeWidth={1.7} />
                    {id === 'home' ? (
                      <>
                        <span className="relative z-10 whitespace-nowrap lg:hidden">Home</span>
                        <span className="relative z-10 hidden whitespace-nowrap lg:inline">{label}</span>
                      </>
                    ) : (
                      <span className="relative z-10 whitespace-nowrap">{label}</span>
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="mt-4 hidden overflow-hidden rounded-2xl bg-espresso p-5 text-cream shadow-warm lg:block">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-cream/40">
                  SITE SUMMARY
                </p>
                <Sparkles className="h-3.5 w-3.5 text-caramel-light/70" />
              </div>
              <dl className="mt-4 space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between border-b border-cream/10 pb-2.5">
                  <dt className="text-cream/45">Members</dt>
                  <dd className="font-display text-base">{draft.members.length}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-cream/10 pb-2.5">
                  <dt className="text-cream/45">Goals</dt>
                  <dd className="font-display text-base">{draft.goals.length}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-cream/45">Status</dt>
                  <dd className="inline-flex items-center gap-1.5 text-[10px] text-cream/70">
                    <span className={`h-1.5 w-1.5 rounded-full ${dirty ? 'bg-caramel-light' : 'bg-emerald-400'}`} />
                    {dirty ? 'Unsaved' : 'Saved'}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-cream/10 pt-3 text-[9px] leading-5 text-cream/35">
                Changes are stored locally in this browser only.
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            {tab === 'home' && <HomeEditor draft={draft} setDraft={setDraft} />}
            {tab === 'goals' && <GoalsEditor draft={draft} setDraft={setDraft} />}
            {tab === 'members' && <MembersEditor draft={draft} setDraft={setDraft} />}
            {tab === 'settings' && (
              <SettingsEditor
                draft={draft}
                setDraft={setDraft}
                onNotify={showToast}
                onReset={handleReset}
                lastUpdated={content.updatedAt}
              />
            )}

            <AnimatePresence>
              {dirty && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="sticky bottom-4 z-30 mt-5 flex flex-col gap-3 rounded-2xl border border-espresso/15 bg-ivory/95 p-3.5 shadow-warm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="flex items-center gap-2.5 px-1 text-[11px] font-medium text-ink/60">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-caramel" />
                    </span>
                    Unsaved changes — visitors don’t see them yet.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="rounded-full px-3.5 py-2 text-[11px] font-medium text-ink/45 transition hover:bg-linen hover:text-espresso"
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-[11px] font-semibold text-cream transition hover:bg-bark"
                    >
                      <Save className="h-3.5 w-3.5" />
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AdminToast toast={toast} onDismiss={() => setToast(null)} />
    </main>
  )
}

function AdminToast({
  toast,
  onDismiss,
}: {
  toast: ToastState | null
  onDismiss: () => void
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border border-espresso/15 bg-espresso px-4 py-3 text-cream shadow-warm"
          >
            {toast.tone === 'success' && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            )}
            {toast.tone === 'error' && (
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            )}
            {toast.tone === 'warning' && (
              <AlertCircle className="h-4 w-4 shrink-0 text-caramel-light" />
            )}
            <p className="text-[11px] leading-5">{toast.message}</p>
            <button
              type="button"
              onClick={onDismiss}
              className="ms-2 shrink-0 rounded-full px-1.5 text-[16px] leading-none text-cream/40 transition hover:text-cream"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
