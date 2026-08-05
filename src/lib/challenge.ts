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

type ChallengeFailure = 'malformed' | 'tooFast' | 'expired' | 'wrong'

export interface Challenge {
  num1: number
  num2: number
  token: string
}

/**
 * Per-process fallback. It cannot verify a token issued by a sibling instance, so a multi-instance
 * deployment without CONTACT_SECRET will reject some legitimate answers.
 *
 * This deliberately does NOT fall back to EMAIL_PASS. Both halves of the signed message are public
 * — `issuedAt` travels in the token and `answer` is printed on the page — so every challenge is a
 * known-plaintext MAC. Signing those with the SMTP password would hand out an offline cracking
 * oracle for the mail credential to anyone who can request a challenge.
 */
const processSecret = randomBytes(32).toString('hex')
let warnedAboutSecret = false

const secret = (): string => {
  if (process.env.CONTACT_SECRET) return process.env.CONTACT_SECRET

  if (!warnedAboutSecret) {
    warnedAboutSecret = true
    console.warn(
      'CONTACT_SECRET is not set — signing contact challenges with a per-process key. ' +
        'Tokens will not verify across instances; set CONTACT_SECRET in the environment.',
    )
  }
  return processSecret
}

const sign = (issuedAt: number, answer: string) =>
  createHmac('sha256', secret()).update(`${issuedAt}:${answer}`).digest()

const encode = (value: string) => Buffer.from(value).toString('base64url')

/**
 * `preAged` stamps the token far enough in the past that it already satisfies the minimum-age
 * gate. Only the action that just rejected a submission asks for this — the gate exists to catch a
 * bot submitting the instant the page renders, and re-arming it on every reissue turns an ordinary
 * retry into a loop of bot accusations. Because `issuedAt` is signed, a caller cannot fabricate an
 * exempt token; it has to fail a real submission first.
 */
export const createChallenge = ({ preAged = false } = {}): Challenge => {
  const num1 = randomInt(1, 11)
  const num2 = randomInt(1, 11)
  const issuedAt = Date.now() - (preAged ? MIN_AGE_MS : 0)
  const signature = sign(issuedAt, String(num1 + num2)).toString('base64url')

  return { num1, num2, token: `${encode(String(issuedAt))}.${signature}` }
}

export const verifyChallenge = (
  token: string,
  answer: string,
): { ok: true } | { ok: false; reason: ChallengeFailure } => {
  const segments = token.split('.')
  if (segments.length !== 2) return { ok: false, reason: 'malformed' }

  const [issuedAtSegment, signatureSegment] = segments
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
