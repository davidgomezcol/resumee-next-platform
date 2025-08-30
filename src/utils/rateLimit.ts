// Simple in-memory rate limiting (for production, consider using Redis or similar)
const submissions = new Map<string, number[]>()

export const checkRateLimit = (
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60000,
): boolean => {
  const now = Date.now()
  const windowStart = now - windowMs

  // Get existing submissions for this identifier
  const userSubmissions = submissions.get(identifier) || []

  // Filter out old submissions outside the window
  const recentSubmissions = userSubmissions.filter((timestamp) => timestamp > windowStart)

  // Check if user has exceeded the limit
  if (recentSubmissions.length >= maxAttempts) {
    return false
  }

  // Add current submission
  recentSubmissions.push(now)
  submissions.set(identifier, recentSubmissions)

  return true
}

// Clean up old entries periodically (optional)
setInterval(() => {
  const now = Date.now()
  for (const [identifier, timestamps] of submissions.entries()) {
    const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < 60000)
    if (recentTimestamps.length === 0) {
      submissions.delete(identifier)
    } else {
      submissions.set(identifier, recentTimestamps)
    }
  }
}, 60000) // Clean up every minute
