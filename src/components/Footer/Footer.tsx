'use client'

import { container, site } from '@/appData/site'
import { useConsent } from '@/contexts/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEmailClick, trackSocialClick } from '@/lib/analytics'
import { privacyContent } from '@/lib/privacyContent'
import Link from 'next/link'
import { FC } from 'react'
import LanguageToggle from '../UI/LanguageToggle'

const link = 'text-bone/70 transition-colors hover:text-coral'

interface FooterProps {
  /** `document` is the reduced footer used by standalone pages like the privacy notice. */
  variant?: 'site' | 'document'
}

const Footer: FC<FooterProps> = ({ variant = 'site' }) => {
  const { t, language } = useLanguage()
  const { reopen } = useConsent()

  return (
    <footer className="border-bone/14 bg-void text-bone/74 border-t">
      <div
        className={`${container} flex flex-wrap items-center gap-x-10 gap-y-5 py-[clamp(26px,3vw,40px)] font-mono text-[10.5px] tracking-[0.1em]`}>
        <span className="text-bone/85">
          dgomez<span className="text-coral">.dev</span>
        </span>
        {/* Baked in at build time, recomputed at hydration — they differ across a New Year. */}
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-[22px]">
          {variant === 'document' ? (
            <Link href="/" className={link}>
              {privacyContent[language].back}
            </Link>
          ) : (
            <Link href="/privacy" className={link}>
              {privacyContent[language].title}
            </Link>
          )}
          <a
            href={`mailto:${site.email}`}
            onClick={() => trackEmailClick(site.email, 'footer')}
            className={link}>
            {site.email}
          </a>
          {variant === 'site' && (
            <>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener"
                onClick={() => trackSocialClick('linkedin')}
                className={link}>
                LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener"
                onClick={() => trackSocialClick('github')}
                className={link}>
                GitHub
              </a>
            </>
          )}
          {/* Kept on both: the notice itself tells readers to use this control. */}
          <button
            type="button"
            onClick={reopen}
            className="text-bone/74 hover:text-coral cursor-pointer font-mono text-[10.5px] tracking-[0.1em] transition-colors">
            {t.footer.cookieSettings}
          </button>
          <LanguageToggle variant="bare" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
