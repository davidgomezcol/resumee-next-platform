'use client'

import {
  denyByDefault,
  loadAnalytics,
  readConsent,
  readRegion,
  revokeAnalytics,
  writeConsent,
  type ConsentRecord,
  type Region,
} from '@/lib/consent'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface ConsentContextType {
  /** null until the visitor has actively chosen. */
  consent: ConsentRecord | null
  /** Whether analytics is on right now, which outside the EEA/UK is true by default. */
  analyticsEnabled: boolean
  /** The banner is up: consent is required and unanswered, or the visitor reopened it. */
  isOpen: boolean
  prefsOpen: boolean
  draftAnalytics: boolean
  isDismissable: boolean
  accept: () => void
  reject: () => void
  openPrefs: () => void
  savePrefs: () => void
  toggleDraft: () => void
  reopen: () => void
  dismiss: () => void
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export const useConsent = () => {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return context
}

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentRecord | null>(null)
  const [region, setRegion] = useState<Region>('eea')
  const [reopened, setReopened] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [draftAnalytics, setDraftAnalytics] = useState(false)
  // Both the stored choice and the region cookie are only readable after mount, so the banner
  // would otherwise flash. Nothing renders until we know.
  const [ready, setReady] = useState(false)

  /**
   * Outside the EEA/UK, analytics runs unless the visitor turns it off; inside, it stays off until
   * they turn it on. An explicit stored choice always wins over both.
   */
  const resolveEnabled = (stored: ConsentRecord | null, area: Region) =>
    stored ? stored.analytics : area === 'row'

  useEffect(() => {
    denyByDefault()
    const area = readRegion()
    const stored = readConsent()
    setRegion(area)
    setConsent(stored)

    const enabled = resolveEnabled(stored, area)
    setDraftAnalytics(enabled)
    if (enabled) loadAnalytics()
    setReady(true)
  }, [])

  /** A choice in one tab has to take effect in the others. */
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== 'dg-consent-v1') return

      const stored = readConsent()
      setConsent(stored)
      setPrefsOpen(false)
      setReopened(false)

      const enabled = resolveEnabled(stored, readRegion())
      setDraftAnalytics(enabled)
      if (enabled) loadAnalytics()
      else revokeAnalytics()
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const commit = useCallback((analytics: boolean) => {
    setConsent(writeConsent(analytics))
    setDraftAnalytics(analytics)
    setPrefsOpen(false)
    setReopened(false)
    if (analytics) loadAnalytics()
    else revokeAnalytics()
  }, [])

  const analyticsEnabled = resolveEnabled(consent, region)

  const value: ConsentContextType = {
    consent,
    analyticsEnabled,
    // Only asked where opt-in is required. Everywhere else the control lives in the footer.
    isOpen: ready && (reopened || (consent === null && region === 'eea')),
    prefsOpen,
    draftAnalytics,
    // Dismissing must not become a way to skip the question where it has to be asked.
    isDismissable: consent !== null || region === 'row',
    accept: () => commit(true),
    reject: () => commit(false),
    openPrefs: () => {
      setDraftAnalytics(analyticsEnabled)
      setPrefsOpen(true)
    },
    savePrefs: () => commit(draftAnalytics),
    toggleDraft: () => setDraftAnalytics((current) => !current),
    reopen: () => {
      setDraftAnalytics(analyticsEnabled)
      setReopened(true)
      setPrefsOpen(true)
    },
    dismiss: () => {
      setReopened(false)
      setPrefsOpen(false)
      setDraftAnalytics(analyticsEnabled)
    },
  }

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
