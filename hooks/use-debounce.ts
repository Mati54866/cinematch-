'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Debounces a rapidly-changing value by the specified delay.
 *
 * The returned value only updates after `delay` milliseconds have elapsed
 * since the last change — ideal for search inputs that drive API calls.
 *
 * @example
 * const debouncedQuery = useDebounce(searchInput, 400)
 * // debouncedQuery lags 400 ms behind searchInput
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  // Track whether the component is still mounted to avoid state updates after
  // unmount (e.g. navigating away while a timer is pending).
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setDebouncedValue(value)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
