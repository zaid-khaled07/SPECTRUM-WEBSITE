import { useCallback, useEffect, useState } from 'react'

export type Route = '/' | '/team' | '/admin'

const SESSION_KEY = 'spectrum:admin-session:v1'
const ADMIN_USERNAME = 'zaid'
// SHA-256 of the initial admin password. This is a local-only demo gate.
const ADMIN_PASSWORD_HASH =
  '0fc4851006a6a44449ac3fd0772a049d19bad4b1ff9846d7b95c521aee8d2232'

async function sha256(value: string) {
  if (!window.crypto?.subtle) {
    throw new Error('This browser does not support secure verification. Try opening the site via localhost.')
  }
  const data = new TextEncoder().encode(value)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(
    () => window.sessionStorage.getItem(SESSION_KEY) === 'granted',
  )
  const [isSigningIn, setIsSigningIn] = useState(false)

  const signIn = useCallback(async (username: string, password: string) => {
    setIsSigningIn(true)
    try {
      const [hash] = await Promise.all([
        sha256(password),
        new Promise((resolve) => window.setTimeout(resolve, 550)),
      ])
      const ok =
        username.trim().toLowerCase() === ADMIN_USERNAME && hash === ADMIN_PASSWORD_HASH
      if (ok) {
        window.sessionStorage.setItem(SESSION_KEY, 'granted')
        setIsAuthed(true)
      }
      return ok
    } catch (error) {
      throw error instanceof Error ? error : new Error('Sign-in failed.')
    } finally {
      setIsSigningIn(false)
    }
  }, [])

  const signOut = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY)
    setIsAuthed(false)
  }, [])

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === SESSION_KEY) {
        setIsAuthed(event.newValue === 'granted')
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  return { isAuthed, isSigningIn, signIn, signOut }
}
