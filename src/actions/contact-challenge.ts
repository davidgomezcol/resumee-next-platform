'use server'

import { createChallenge, type Challenge } from '@/lib/challenge'

/**
 * The page is statically prerendered, so a challenge baked in at build time would be shared by
 * every visitor and already stale on arrival. The client asks for one on first interaction with
 * the form instead, which also keeps it off the critical path for everyone who never uses it.
 */
const getChallenge = async (): Promise<Challenge> => createChallenge()

export default getChallenge
