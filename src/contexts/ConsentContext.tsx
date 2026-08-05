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
  accept: () => void
  reject: () => void
  openPrefs: () => void
  savePrefs: () => void
  toggleDraft: () => void
  reopen: () => void
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
  }

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
