import { createAdminClient } from '@/lib/supabase/admin'
import { FREE_TIER_DAILY_LIMIT } from '@/lib/utils/constants'

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  limit: number
  reset_at: string
}

function utcDayKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function nextUtcMidnight(from: Date): Date {
  return new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + 1)
  )
}

export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  const supabase = createAdminClient()

  // Get user profile to check plan
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('plan, daily_rec_count, daily_rec_reset')
    .eq('id', userId)
    .single()

  if (profileError && profileError.code !== 'PGRST116') {
    throw profileError
  }

  if (!profile) {
    return { allowed: false, remaining: 0, limit: 0, reset_at: new Date().toISOString() }
  }

  const isPro = profile.plan === 'pro'
  if (isPro) {
    return {
      allowed: true,
      remaining: Infinity,
      limit: Infinity,
      reset_at: '',
    }
  }

  // Check if we need to reset the daily count
  const now = new Date()
  const resetDate = profile.daily_rec_reset ? new Date(profile.daily_rec_reset) : null
  // Compare full UTC calendar days. Comparing getDate() alone treats the 5th of
  // one month as the same day as the 5th of the next, and depends on server TZ.
  const needsReset = !resetDate || utcDayKey(resetDate) !== utcDayKey(now)

  if (needsReset) {
    const tomorrow = nextUtcMidnight(now)

    const { error: resetError } = await supabase
      .from('profiles')
      .update({
        daily_rec_count: 0,
        daily_rec_reset: now.toISOString(),
      })
      .eq('id', userId)

    if (resetError) throw resetError

    return {
      allowed: true,
      remaining: FREE_TIER_DAILY_LIMIT,
      limit: FREE_TIER_DAILY_LIMIT,
      reset_at: tomorrow.toISOString(),
    }
  }

  const currentCount = profile.daily_rec_count || 0
  const remaining = Math.max(0, FREE_TIER_DAILY_LIMIT - currentCount)
  const tomorrow = nextUtcMidnight(now)

  return {
    allowed: currentCount < FREE_TIER_DAILY_LIMIT,
    remaining,
    limit: FREE_TIER_DAILY_LIMIT,
    reset_at: tomorrow.toISOString(),
  }
}

export async function incrementRateLimit(userId: string): Promise<void> {
  const supabase = createAdminClient()
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('daily_rec_count')
      .eq('id', userId)
      .single()

    if (profileError) throw profileError
    if (!profile) throw new Error('Profile not found while updating recommendation limit')

    const currentCount = profile.daily_rec_count ?? 0

    // Update only if the count is unchanged, so concurrent requests cannot overwrite one another.
    const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update({ daily_rec_count: currentCount + 1 })
      .eq('id', userId)
      .eq('daily_rec_count', currentCount)
      .select('id')

    if (updateError) throw updateError
    if (updated?.length) return
  }

  throw new Error('Could not update recommendation limit after concurrent changes')
}
