export function formatRuntime(minutes: number | null): string {
  if (minutes == null || !Number.isFinite(minutes) || minutes <= 0) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function getYear(dateString: string | null | undefined): number | null {
  if (!dateString) return null
  const year = parseInt(dateString.substring(0, 4), 10)
  return isNaN(year) ? null : year
}

export function getDecade(year: number): string {
  if (year < 1960) return 'Classic'
  const decade = Math.floor(year / 10) * 10
  return `${decade}s`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateInviteCode(): string {
  // 32-character alphabet divides 256 evenly, so there's no modulo bias.
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => chars[b % chars.length]).join('')
}

export function clampRating(value: number, min: number = 0, max: number = 5): number {
  return Math.min(max, Math.max(min, value))
}

export function normalizeScore(value: number, min: number, max: number): number {
  if (max === min) return 0.5
  return (value - min) / (max - min)
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) return []

  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter((item) => {
    const val = item[key]
    if (seen.has(val)) return false
    seen.add(val)
    return true
  })
}

/**
 * Format a TMDB vote_average (0–10) as a one-decimal string.
 * Returns 'N/A' for null, undefined, or out-of-range values.
 */
export function formatVoteAverage(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value) || value < 0 || value > 10) return 'N/A'
  return value.toFixed(1)
}

/**
 * Return `singular` when count is exactly 1, otherwise `plural`.
 * Falls back to appending 's' when no plural is provided.
 *
 * @example pluralize(1, 'movie') → 'movie'
 * @example pluralize(2, 'movie') → 'movies'
 * @example pluralize(2, 'match', 'matches') → 'matches'
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`)
}

/**
 * Format a large integer into a compact human-readable string.
 *
 * @example formatCompactNumber(1234) → '1.2K'
 * @example formatCompactNumber(1_500_000) → '1.5M'
 */
export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) return 'N/A'
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  }
  return String(value)
}
