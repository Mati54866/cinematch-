import * as React from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  /** SVG or other icon element rendered above the heading. */
  icon?: React.ReactNode
  /** Short, prominent heading (e.g. "No movies yet"). */
  heading: string
  /** Longer descriptive text below the heading. */
  description?: string
  /** Optional call-to-action rendered below the description. */
  action?: React.ReactNode
  /** Additional class names applied to the root element. */
  className?: string
}

/**
 * A centred, accessible empty-state placeholder.
 *
 * Drop it in any list or page section to give users context when there is
 * nothing to show yet — watchlist empty, no search results, first-time setup,
 * etc.
 *
 * @example
 * <EmptyState
 *   icon={<Film className="size-10 text-muted-foreground" />}
 *   heading="Your watchlist is empty"
 *   description="Start adding movies from the Discover page."
 *   action={<Button asChild><Link href="/discover">Discover</Link></Button>}
 * />
 */
export function EmptyState({
  icon,
  heading,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={heading}
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 text-center',
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center rounded-full bg-muted p-4">
          {icon}
        </div>
      )}

      <div className="max-w-sm space-y-1.5">
        <h3 className="text-base font-semibold leading-tight tracking-tight">
          {heading}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
