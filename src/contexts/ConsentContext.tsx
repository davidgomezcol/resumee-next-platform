'use client'

import {
  denyByDefault,
  loadAnalytics,
  readConsent,
  revokeAnalytics,
  writeConsent,
  type ConsentRecord,
} from '@/lib/consent'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface ConsentContextType {
  /** null until a choice has been made. */
  consent: ConsentRecord | null
  /** The banner is up: no choice yet, or the visitor reopened it from the footer. */
  isOpen: boolean
  prefsOpen: boolean
  /** The pending toggle state inside the preferences panel, not yet saved. */
  draftAnalytics: boolean
  /** True when a choice already exists, so the banner can simply be dismissed. */
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
  const [reopened, setReopened] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [draftAnalytics, setDraftAnalytics] = useState(false)
  // The stored choice is only readable after mount, so the banner would otherwise flash for
  // visitors who already answered. Nothing renders until we know.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    denyByDefault()
    const stored = readConsent()
    setConsent(stored)
    setDraftAnalytics(!!stored?.analytics)
    if (stored?.analytics) loadAnalytics()
    setReady(true)
  }, [])

  /**
   * A choice made in one tab has to take effect in the others. Without this, accepting in tab A and
   * then rejecting in tab B leaves A's tag loaded with consent granted: the stored record says
   * rejected while collection quietly continues.
   */
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== 'dg-consent-v1') return

      const stored = readConsent()
      setConsent(stored)
      setDraftAnalytics(!!stored?.analytics)
      setPrefsOpen(false)
      setReopened(false)
      if (stored?.analytics) loadAnalytics()
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

  const value: ConsentContextType = {
    consent,
    isOpen: ready && (reopened || consent === null),
    prefsOpen,
    draftAnalytics,
    // Only offer a plain dismiss once a choice exists — otherwise closing it would be a way to
    // skip the question, which is the thing consent is for.
    isDismissable: consent !== null,
    accept: () => commit(true),
    reject: () => commit(false),
    openPrefs: () => {
      setDraftAnalytics(!!consent?.analytics)
      setPrefsOpen(true)
    },
    savePrefs: () => commit(draftAnalytics),
    toggleDraft: () => setDraftAnalytics((current) => !current),
    reopen: () => {
      setDraftAnalytics(!!consent?.analytics)
      setReopened(true)
      setPrefsOpen(true)
    },
    dismiss: () => {
      setReopened(false)
      setPrefsOpen(false)
      setDraftAnalytics(!!consent?.analytics)
    },
  }

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
