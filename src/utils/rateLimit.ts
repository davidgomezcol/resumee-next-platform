// Simple in-memory rate limiting (for production, consider using Redis or similar)
const submissions = new Map<string, number[]>()

/**
 * Longest window any caller has asked for. The sweeper below must not evict timestamps that are
 * still inside it — doing so silently shortens every limit to the sweep interval.
 */
let maxWindowMs = 0

export const checkRateLimit = (
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60000,
): boolean => {
  const now = Date.now()
  maxWindowMs = Math.max(maxWindowMs, windowMs)

  const windowStart = now - windowMs

  // Drop attempts that have aged out of this caller's window
  const recentSubmissions = (submissions.get(identifier) ?? []).filter(
    (timestamp) => timestamp > windowStart,
  )

  if (recentSubmissions.length >= maxAttempts) {
    // Store the pruned list even when rejecting, so it can't grow without bound
    submissions.set(identifier, recentSubmissions)
    return false
  }

  recentSubmissions.push(now)
  submissions.set(identifier, recentSubmissions)

  return true
}

// Reclaim memory for identifiers nobody has hit recently. Entries are also pruned on read, so this
// is only about footprint — it must never be the thing that decides whether a limit still applies.
const sweep = setInterval(() => {
  const cutoff = Date.now() - maxWindowMs

  for (const [identifier, timestamps] of submissions.entries()) {
    const recentTimestamps = timestamps.filter((timestamp) => timestamp > cutoff)

    if (recentTimestamps.length === 0) {
      submissions.delete(identifier)
    } else {
      submissions.set(identifier, recentTimestamps)
    }
  }
}, 60000)

// Don't hold a serverless instance open just for the sweeper
sweep.unref?.()
