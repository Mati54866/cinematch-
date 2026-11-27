import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  /**
   * Diameter of the spinner in pixels.
   * @default 24
   */
  size?: number
  /**
   * Stroke width of the spinning arc.
   * @default 2
   */
  strokeWidth?: number
  /**
   * Accessible label announced to screen readers.
   * @default 'Loading…'
   */
  label?: string
}

/**
 * A lightweight animated SVG loading spinner.
 *
 * Uses a `stroke-dasharray` / `stroke-dashoffset` CSS animation so it
 * inherits the current text colour without any extra CSS variables.
 *
 * @example
 * <Spinner />
 * <Spinner size={32} className="text-primary" label="Fetching recommendations…" />
 */
export function Spinner({
  size = 24,
  strokeWidth = 2,
  label = 'Loading…',
  className,
  ...props
}: SpinnerProps) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      aria-label={label}
      role="status"
      className={cn('animate-spin text-current', className)}
      {...props}
    >
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeOpacity={0.2}
      />
      {/* Spinning arc — roughly 25 % of the circumference */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
      />
    </svg>
  )
}
