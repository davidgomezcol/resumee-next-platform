import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'

/**
 * A signed arithmetic challenge for the contact form.
 *
 * The previous scheme shipped the expected answer and the render time as hidden inputs, so the
 * server was comparing one client-supplied value against another — anything that read the DOM
 * passed. Here the server issues a token it alone can produce, and the answer is never carried in
 * it: the signature is taken over `issuedAt:answer`, so recomputing it with the submitted answer
 * proves the answer is right *and* the token is genuine in one step.
 *
 * What this does not do is stop a script that parses the page and computes the sum. It closes
 * forgery and replay, not solving.
 */

const MIN_AGE_MS = 3_000
/** Long enough to write a real message, short enough to bound replay of a captured token. */
const MAX_AGE_MS = 30 * 60_000

export type ChallengeFailure = 'malformed' | 'tooFast' | 'expired' | 'wrong'

export interface Challenge {
  num1: number
  num2: number
  token: string
}

/** Last resort only: per-process, so it cannot verify a token issued by a sibling instance. */
const processSecret = randomBytes(32).toString('hex')
let warnedAboutSecret = false

const secret = (): string => {
  if (process.env.CONTACT_SECRET) return process.env.CONTACT_SECRET

  // The form cannot send mail without EMAIL_PASS, so wherever it works at all there is already
  // deploy-stable key material. Prefixed to keep it separated from its actual purpose.
  if (process.env.EMAIL_PASS) return `contact-challenge:${process.env.EMAIL_PASS}`

  if (!warnedAboutSecret) {
    warnedAboutSecret = true
    console.warn(
      'Neither CONTACT_SECRET nor EMAIL_PASS is set — signing contact challenges with a ' +
        'per-process key. Tokens will not verify across instances.',
    )
  }
  return processSecret
}

const sign = (issuedAt: number, answer: string) =>
  createHmac('sha256', secret()).update(`${issuedAt}:${answer}`).digest()

const encode = (value: string) => Buffer.from(value).toString('base64url')

export const createChallenge = (): Challenge => {
  const num1 = randomInt(1, 11)
  const num2 = randomInt(1, 11)
  const issuedAt = Date.now()
  const signature = sign(issuedAt, String(num1 + num2)).toString('base64url')

  return { num1, num2, token: `${encode(String(issuedAt))}.${signature}` }
}

export const verifyChallenge = (
  token: string,
  answer: string,
): { ok: true } | { ok: false; reason: ChallengeFailure } => {
  const [issuedAtSegment, signatureSegment] = token.split('.')
  if (!issuedAtSegment || !signatureSegment) return { ok: false, reason: 'malformed' }

  const issuedAt = Number(Buffer.from(issuedAtSegment, 'base64url').toString())
  if (!Number.isFinite(issuedAt)) return { ok: false, reason: 'malformed' }

  // Checked before the signature because the signature needs the submitted answer to recompute.
  // A tampered timestamp can clear these and then fails verification below.
  const age = Date.now() - issuedAt
  if (age < MIN_AGE_MS) return { ok: false, reason: 'tooFast' }
  if (age > MAX_AGE_MS) return { ok: false, reason: 'expired' }

  const provided = Buffer.from(signatureSegment, 'base64url')
  const expected = sign(issuedAt, String(Number.parseInt(answer, 10)))

  // A forged token and a wrong answer are indistinguishable here, and both are reported as a
  // wrong answer — which is the right thing to tell either sender.
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return { ok: false, reason: 'wrong' }
  }

  return { ok: true }
}
