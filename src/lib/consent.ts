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

export interface ConsentRecord {
  v: 1
  analytics: boolean
  ts: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    __dgConsentDefaults?: boolean
    __dgGaLoaded?: boolean
  }
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

// Matches the shape gtag.js expects, so the queue it finds is the queue we built.
const gtag = (...args: unknown[]) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

/** Must run before any tag loads, which is why it is not conditional on a choice being made. */
export const denyByDefault = () => {
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

export const loadAnalytics = () => {
  gtag('consent', 'update', { analytics_storage: 'granted' })

  // Still production-only: consenting in local development shouldn't reach the live property.
  if (!site.gaMeasurementId || process.env.NODE_ENV !== 'production') return
  if (window.__dgGaLoaded) return
  window.__dgGaLoaded = true

  const tag = document.createElement('script')
  tag.async = true
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`
  document.head.appendChild(tag)

  gtag('js', new Date())
  gtag('config', site.gaMeasurementId, { anonymize_ip: true })
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
