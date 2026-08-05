import { site } from '@/appData/site'

/**
 * Cookie consent for Google Analytics, using Consent Mode v2.
 *
 * Nothing analytics-related runs until the visitor chooses: defaults are set to denied before any
 * tag exists, and gtag.js is only injected on acceptance. Rejecting after accepting also clears the
 * cookies GA already wrote, so "reject" actually means rejected rather than "stop collecting from
 * now on".
 */

const CONSENT_KEY = 'dg-consent-v1'

/** `eea` means opt-in is required before analytics; `row` means it runs unless turned off. */
export type Region = 'eea' | 'row'

export interface ConsentRecord {
  v: 1
  analytics: boolean
  ts: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    /** Optional: it only exists once ensureGtag has run on the client. */
    gtag?: (...args: unknown[]) => void
    __dgConsentDefaults?: boolean
    __dgGaLoaded?: boolean
  }
}

/**
 * Set by middleware from the request's country. Absent means we could not tell, and the safe
 * reading of "could not tell" is that consent is required.
 */
export const readRegion = (): Region => {
  const match = document.cookie.match(/(?:^|;\s*)dg-region=(eea|row)/)
  return match?.[1] === 'row' ? 'row' : 'eea'
}

export const readConsent = (): ConsentRecord | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    return typeof parsed?.analytics === 'boolean' ? parsed : null
  } catch {
    return null
  }
}

export const writeConsent = (analytics: boolean): ConsentRecord => {
  const record: ConsentRecord = { v: 1, analytics, ts: new Date().toISOString() }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
  } catch {
    // Private browsing or storage disabled — the choice just won't persist.
  }
  return record
}

/**
 * This MUST push a real `arguments` object, not a rest array.
 *
 * gtag.js branches on the container type before it looks at the command: Arrays are treated as
 * legacy `_gaq`-style pushes and silently discarded, and only `[object Arguments]` reaches the
 * command handler. Pushing `[...args]` therefore drops `consent`, `js` and `config` alike — GA
 * never initialises, and, worse, a later `consent update: denied` never lands either, so cookies
 * deleted on reject would simply be recreated.
 */
// The rest parameter exists only to type the call sites; `arguments` is what gets pushed, and it
// still holds the real arguments in a function that declares rest params.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

/**
 * gtag.js does not define `window.gtag` itself — the standard snippet does. Without this the
 * helpers in @/lib/analytics are permanently no-ops, since they guard on `window.gtag`.
 */
const ensureGtag = () => {
  if (!window.gtag) window.gtag = gtag as (...args: unknown[]) => void
}

/** Must run before any tag loads, which is why it is not conditional on a choice being made. */
export const denyByDefault = () => {
  ensureGtag()
  if (window.__dgConsentDefaults) return
  window.__dgConsentDefaults = true
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  })
}

/**
 * Runs `task` once the page has finished loading and the main thread has a gap.
 *
 * `async` only means "don't block parsing" — an async script still competes for bandwidth and for
 * the main thread while the page is still painting. The timeout is a floor, not a target: a
 * visitor who never goes idle still gets the tag, just last.
 */
const whenIdle = (task: () => void) => {
  const idle = () => {
    if (typeof window.requestIdleCallback === 'function')
      window.requestIdleCallback(task, { timeout: 3000 })
    else window.setTimeout(task, 1000)
  }

  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
}

export const loadAnalytics = () => {
  gtag('consent', 'update', { analytics_storage: 'granted' })

  // Still production-only: consenting in local development shouldn't reach the live property.
  if (!site.gaMeasurementId || process.env.NODE_ENV !== 'production') return
  if (window.__dgGaLoaded) return
  window.__dgGaLoaded = true

  /*
    Queued now, sent later. dataLayer is an ordinary array until gtag.js arrives and drains it, so
    the pageview keeps the timestamp from this line rather than the one the script happens to load
    at — deferring the fetch costs no accuracy, and nothing is lost if the visitor leaves first
    beyond a session that was already too short to mean anything.
  */
  gtag('js', new Date())
  gtag('config', site.gaMeasurementId)

  /*
    160 KB of third-party JavaScript, fetched and parsed while the page is still painting. Since
    the banner became geo-gated this runs for most visitors instead of almost none, which put it
    in competition with the content for the first time. It waits its turn now.
  */
  whenIdle(() => {
    const tag = document.createElement('script')
    tag.async = true
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`
    document.head.appendChild(tag)
  })
}

/** Deny, then remove anything GA already wrote — across the host and domain variants it uses. */
export const revokeAnalytics = () => {
  gtag('consent', 'update', { analytics_storage: 'denied' })

  const host = location.hostname
  for (const raw of document.cookie.split(';')) {
    const name = raw.split('=')[0].trim()
    if (!/^_(ga|gid|gat)/.test(name)) continue
    for (const path of ['/', location.pathname]) {
      for (const domain of [host, `.${host}`, '']) {
        document.cookie =
          `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}` +
          (domain ? `; domain=${domain}` : '')
      }
    }
  }
}
