/**
 * URL and image-path helpers for TMDB assets.
 *
 * All helpers are pure functions so they can be used safely in both server and
 * client components.  They centralise the TMDB image CDN logic so a base URL
 * or size change only needs to be made in one place.
 */

import { TMDB_IMAGE_BASE } from '@/lib/utils/constants'

// ---------------------------------------------------------------------------
// Image size presets
// ---------------------------------------------------------------------------

/** Standard poster sizes offered by the TMDB image CDN. */
export type PosterSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original'

/** Standard backdrop sizes offered by the TMDB image CDN. */
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'

/** Standard profile-photo sizes offered by the TMDB image CDN. */
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original'

/** Standard logo sizes offered by the TMDB image CDN. */
export type LogoSize = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original'

// ---------------------------------------------------------------------------
// Builder helpers
// ---------------------------------------------------------------------------

/**
 * Build an absolute TMDB poster URL.
 * Returns `null` when `path` is null or empty so callers can supply a
 * fallback image without an extra null-check.
 *
 * @example
 * tmdbPosterUrl('/abc123.jpg', 'w342') // → 'https://image.tmdb.org/t/p/w342/abc123.jpg'
 * tmdbPosterUrl(null)                  // → null
 */
export function tmdbPosterUrl(
  path: string | null | undefined,
  size: PosterSize = 'w342'
): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

/**
 * Build an absolute TMDB backdrop URL.
 *
 * @example
 * tmdbBackdropUrl('/def456.jpg', 'w1280')
 */
export function tmdbBackdropUrl(
  path: string | null | undefined,
  size: BackdropSize = 'w1280'
): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

/**
 * Build an absolute TMDB person profile-photo URL.
 *
 * @example
 * tmdbProfileUrl('/ghi789.jpg', 'w185')
 */
export function tmdbProfileUrl(
  path: string | null | undefined,
  size: ProfileSize = 'w185'
): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

/**
 * Build an absolute TMDB streaming-provider logo URL.
 *
 * @example
 * tmdbLogoUrl('/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg', 'w92')
 */
export function tmdbLogoUrl(
  path: string | null | undefined,
  size: LogoSize = 'w92'
): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

/**
 * Return the best-quality poster URL that still fits within `maxWidth` pixels.
 *
 * Useful for responsive `<img srcSet>` generation: pick a size bucket that
 * is at least as wide as the requested layout width.
 */
export function responsivePosterUrl(
  path: string | null | undefined,
  maxWidth: number
): string | null {
  if (!path) return null
  let size: PosterSize = 'w92'
  if (maxWidth > 500) size = 'w780'
  else if (maxWidth > 342) size = 'w500'
  else if (maxWidth > 185) size = 'w342'
  else if (maxWidth > 154) size = 'w185'
  else if (maxWidth > 92) size = 'w154'
  return tmdbPosterUrl(path, size)
}
