import { useCallback, useEffect, useState } from 'react'

export type Route = '/' | '/team' | '/questions' | '/admin'

const parseHash = (): Route => {
  const path = window.location.hash.replace(/^#/, '').split('?')[0]
  if (path === '/team' || path === '/questions' || path === '/admin') return path
  return '/'
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(parseHash)

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/')
    }

    const handleHashChange = () => {
      setRoute(parseHash())
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((next: Route) => {
    if (parseHash() === next) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = next
  }, [])

  return { route, navigate }
}
