'use client'

import { useState, useEffect } from 'react'

/**
 * Evaluate a CSS media query string and reactively track its match state.
 *
 * Returns `true` while the viewport satisfies the query, `false` otherwise.
 * Defaults to `false` on the server (SSR) so there's no hydration mismatch.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Safe server-side default: assume query does not match.
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQueryList = window.matchMedia(query)

    // Sync immediately in case the query changed between render and effect.
    setMatches(mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)

    // `addEventListener` is preferred over the deprecated `addListener`.
    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return matches
}

// ---------------------------------------------------------------------------
// Convenience breakpoint hooks built on top of useMediaQuery
// ---------------------------------------------------------------------------

/** `true` when the viewport is narrower than 768 px (Tailwind's `md`). */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** `true` when the viewport is at least 1024 px wide (Tailwind's `lg`). */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

/** `true` when the OS / browser has requested reduced motion. */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
