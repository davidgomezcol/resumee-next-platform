'use client'

import { container } from '@/appData/site'
import { useConsent } from '@/contexts/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { localisedHref } from '@/lib/siteMetadata'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const textButton =
  'cursor-pointer border-none bg-transparent px-1.5 py-[13px] font-mono text-[11px] tracking-[0.14em] text-coral uppercase underline underline-offset-4 transition-colors hover:text-bone'

const choiceButton =
  'border-bone text-bone hover:bg-bone hover:text-void min-w-[140px] flex-1 cursor-pointer border px-4 py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors nav:min-w-[186px] nav:flex-none nav:px-6'

const CookieConsent = () => {
  const { t, language } = useLanguage()
  const {
    consent,
    isOpen,
    prefsOpen,
    draftAnalytics,
    isDismissable,
    accept,
    reject,
    openPrefs,
    savePrefs,
    toggleDraft,
    dismiss,
  } = useConsent()
  const panelRef = useRef<HTMLElement>(null)
  const wasOpen = useRef(false)

  // When the footer reopens this, move focus into it — otherwise the button that opened it keeps
  // focus and a keyboard user has to tab the whole page to reach the controls.
  useEffect(() => {
    if (isOpen && !wasOpen.current && consent !== null) panelRef.current?.focus()
    wasOpen.current = isOpen
  }, [isOpen, consent])

  /**
   * The band is fixed, so without this it sits on top of the footer — and it is tall enough to
   * cover the whole thing, putting the privacy link, the email, the socials, the cookie control
   * and the language toggle out of reach until the visitor answers. Measured rather than guessed,
   * because the height changes with the preferences panel and with text wrapping.
   */
  useEffect(() => {
    const panel = panelRef.current
    if (!isOpen || !panel) {
      document.body.style.paddingBottom = ''
      return
    }

    const apply = () => {
      document.body.style.paddingBottom = `${panel.offsetHeight}px`
    }
    apply()

    const observer = new ResizeObserver(apply)
    observer.observe(panel)
    return () => {
      observer.disconnect()
      document.body.style.paddingBottom = ''
    }
  }, [isOpen, prefsOpen])

  // Escape closes it, but only when there is already a stored choice to fall back on.
  useEffect(() => {
    if (!isOpen || !isDismissable) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, isDismissable, dismiss])

  if (!isOpen) return null

  return (
    <section
      ref={panelRef}
      tabIndex={-1}
      aria-label={t.consent.eyebrow}
      className="border-coral bg-void fixed right-0 bottom-0 left-0 z-[60] border-t-2 shadow-[0_-18px_44px_rgba(0,0,0,0.5)] outline-none">
      <div className={`${container} pt-[clamp(14px,2.4vw,26px)] pb-[clamp(14px,2.6vw,28px)]`}>
        <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[11px] tracking-[0.16em] uppercase">
          <h2 className="text-bone flex items-baseline gap-[9px] text-[11px] tracking-[0.16em]">
            <span aria-hidden className="text-coral">
              ■
            </span>
            {t.consent.eyebrow}
          </h2>
          <div className="flex items-baseline gap-4">
            <span className="text-bone/72">
              {consent?.analytics ? t.consent.stateOn : t.consent.stateOff}
            </span>
            {isDismissable && (
              <button
                type="button"
                onClick={dismiss}
                aria-label={t.consent.close}
                className="text-bone/60 hover:text-coral focus-visible:outline-coral cursor-pointer font-mono text-[13px] leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-end gap-[clamp(18px,3vw,44px)]">
          <div>
            <p className="text-bone/84 nav:text-[14px] nav:leading-[1.6] max-w-[72ch] text-[13px] leading-[1.55]">
              {t.consent.body}
            </p>
            {/* next/link so opening the notice doesn't full-reload and drop the open panel. */}
            <Link
              href={localisedHref(language, '/privacy')}
              className="text-coral hover:text-bone mt-2.5 inline-block font-mono text-[11px] tracking-[0.1em] transition-colors">
              {t.consent.privacy} ↗
            </Link>
          </div>

          <div className="flex flex-wrap justify-end gap-2.5">
            {prefsOpen ? (
              <button type="button" onClick={savePrefs} className={textButton}>
                {t.consent.save}
              </button>
            ) : (
              <button type="button" onClick={openPrefs} className={textButton}>
                {t.consent.manage}
              </button>
            )}
            <button type="button" onClick={reject} className={choiceButton}>
              {t.consent.reject}
            </button>
            <button type="button" onClick={accept} className={choiceButton}>
              {t.consent.accept}
            </button>
          </div>
        </div>

        {prefsOpen && (
          <div className="border-bone/16 mt-[clamp(18px,2.4vw,26px)] border-t">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-[clamp(24px,4vw,56px)]">
              <div className="border-bone/10 flex items-start gap-4 border-b py-[18px]">
                <div className="flex-1">
                  <h3 className="text-bone font-mono text-[11px] tracking-[0.14em] uppercase">
                    {t.consent.necLabel}
                  </h3>
                  <p className="text-bone/72 mt-[7px] max-w-[46ch] text-[13px] leading-[1.55]">
                    {t.consent.necNote}
                  </p>
                </div>
                <span className="border-bone/24 text-bone/72 flex-none border px-[9px] py-[5px] font-mono text-[11px] tracking-[0.14em] uppercase">
                  {t.consent.necReq}
                </span>
              </div>

              <div className="border-bone/10 flex items-start gap-4 border-b py-[18px]">
                <div className="flex-1">
                  <h3 className="text-bone font-mono text-[11px] tracking-[0.14em] uppercase">
                    {t.consent.anLabel}
                  </h3>
                  <p className="text-bone/72 mt-[7px] max-w-[46ch] text-[13px] leading-[1.55]">
                    {t.consent.anNote}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draftAnalytics}
                  aria-label={t.consent.anToggle}
                  onClick={toggleDraft}
                  className={`focus-visible:outline-coral relative h-[26px] w-12 flex-none cursor-pointer border p-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    draftAnalytics ? 'border-coral bg-coral/22' : 'border-bone/30 bg-bone/8'
                  }`}>
                  <span
                    aria-hidden
                    className={`absolute top-[3px] h-[18px] w-[18px] transition-all ${
                      draftAnalytics ? 'bg-coral left-[25px]' : 'bg-bone/55 left-[3px]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CookieConsent
