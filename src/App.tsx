import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Team } from './pages/Team'
import { Admin } from './pages/Admin'
import { useHashRoute } from './hooks/useHashRoute'
import { EASE } from './lib/motion'

export default function App() {
  const { route, navigate } = useHashRoute()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Spectrum SPC | From Binary to Beyond',
      '/team': 'Team Members | Spectrum SPC',
      '/admin': 'Admin Dashboard | Spectrum SPC',
    }
    document.title = titles[route]
  }, [route])

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === 'a'
      ) {
        event.preventDefault()
        navigate('/admin')
      }
    }
    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [navigate])

  const onGoals = () => {
    if (route === '/') {
      document.getElementById('goals')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.sessionStorage.setItem('spectrum:scroll-target', 'goals')
    navigate('/')
  }

  const skipToContent = () => {
    const main = document.getElementById('main-content')
    main?.focus()
    main?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <button
        type="button"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {route === '/admin' ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex min-h-screen flex-col"
          >
            <Admin navigate={navigate} />
          </motion.div>
        ) : (
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex min-h-screen flex-col"
          >
            <Header route={route} navigate={navigate} onGoals={onGoals} />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {route === '/team' ? (
                <Team navigate={navigate} onGoals={onGoals} />
              ) : (
                <Home navigate={navigate} onGoals={onGoals} />
              )}
            </main>
            <Footer navigate={navigate} onGoals={onGoals} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
