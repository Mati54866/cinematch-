'use client'

import { useState, useCallback, useEffect } from 'react'

/**
 * Persist a typed value in `localStorage` and keep it in sync with React state.
 *
 * - On mount the stored value is read and returned.
 * - If the key doesn't exist yet, `initialValue` is written and returned.
 * - JSON serialisation errors are silently swallowed so SSR and private
 *   browsing modes don't throw.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark')
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Lazy initialiser: only read localStorage once on first render.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item != null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  /** Write a new value both to state and to localStorage. */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // localStorage may be full or restricted — fail silently.
        }
        return next
      })
    },
    [key]
  )

  /** Remove the key from localStorage and reset state to `initialValue`. */
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // fail silently
    }
    setStoredValue(initialValue)
  }, [key, initialValue])

  // Keep multiple tabs / windows in sync via the 'storage' event.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return
      try {
        const newValue = event.newValue != null
          ? (JSON.parse(event.newValue) as T)
          : initialValue
        setStoredValue(newValue)
      } catch {
        // malformed JSON in another tab — ignore
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
