/**
 * Locale-aware formatting utilities for currency, percentages, and file sizes.
 * These are intentionally separate from helpers.ts so they can be tree-shaken
 * independently on pages that don't need the number-crunching utilities.
 */

/**
 * Format a dollar amount (as returned by TMDB's budget/revenue fields).
 * Returns 'N/A' for null, zero, or non-finite values because TMDB uses 0
 * to signal "data not available".
 *
 * @example formatCurrency(150_000_000) → '$150,000,000'
 */
export function formatCurrency(
  amount: number | null | undefined,
  locale: string = 'en-US'
): string {
  if (amount == null || !Number.isFinite(amount) || amount === 0) return 'N/A'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a 0–1 confidence score as a percentage string.
 *
 * @example formatConfidence(0.876) → '88%'
 * @example formatConfidence(1)     → '100%'
 */
export function formatConfidence(
  value: number | null | undefined,
  locale: string = 'en-US'
): string {
  if (value == null || !Number.isFinite(value)) return 'N/A'
  const clamped = Math.min(1, Math.max(0, value))
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(clamped)
}

/**
 * Format a file size in bytes into a human-readable string.
 *
 * @example formatBytes(1024)        → '1.0 KB'
 * @example formatBytes(1_048_576)   → '1.0 MB'
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return 'N/A'
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const exp = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, exp)

  return `${value.toFixed(1)} ${units[exp]}`
}

/**
 * Format a duration in minutes as a "Xh Ym" string with explicit zero-handling.
 * Alias that delegates to helpers.formatRuntime but lives here for import symmetry.
 *
 * Re-exported from this module so callers that only import from `format` don't
 * also need to import from `helpers`.
 */
export { formatRuntime } from '@/lib/utils/helpers'
