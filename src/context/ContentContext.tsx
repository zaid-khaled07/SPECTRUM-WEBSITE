import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { createDefaultContent } from '../data/defaults'
import {
  CONTENT_STORAGE_KEY,
  loadContent,
  persistContent,
} from '../lib/content'
import type { SiteContent } from '../types'

interface ContentContextValue {
  content: SiteContent
  saveContent: (next: SiteContent) => SiteContent
  resetContent: () => SiteContent
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadContent())

  const saveContent = useCallback((next: SiteContent) => {
    const stamped: SiteContent = {
      ...next,
      version: 1,
      updatedAt: new Date().toISOString(),
    }
    persistContent(stamped)
    setContent(stamped)
    return stamped
  }, [])

  const resetContent = useCallback(() => {
    const fresh: SiteContent = {
      ...createDefaultContent(),
      updatedAt: new Date().toISOString(),
    }
    persistContent(fresh)
    setContent(fresh)
    return fresh
  }, [])

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === CONTENT_STORAGE_KEY && event.newValue) {
        setContent(loadContent())
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const value = useMemo(
    () => ({ content, saveContent, resetContent }),
    [content, saveContent, resetContent],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used inside ContentProvider')
  }
  return context
}
