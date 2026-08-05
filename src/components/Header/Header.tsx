'use client'

import { container, navSections } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackNavigation } from '@/lib/analytics'
import { privacyContent } from '@/lib/privacyContent'
import Link from 'next/link'
import { FC } from 'react'
import LanguageToggle from '../UI/LanguageToggle'

interface HeaderProps {
  /** `document` swaps the section nav for a way back, used by standalone pages. */
  variant?: 'site' | 'document'
}

const Header: FC<HeaderProps> = ({ variant = 'site' }) => {
  const { t, language } = useLanguage()

  return (
    <header className="border-ink/12 bg-bone/86 sticky top-0 z-40 border-b backdrop-blur-[10px]">
      <div className={`${container} flex h-[58px] items-center gap-6`}>
        <Link href="/" className="text-ink font-mono text-[12px] tracking-[0.06em]">
          dgomez<span className="text-brick">.dev</span>
        </Link>

        {variant === 'document' ? (
          <nav
            aria-label={privacyContent[language].back}
            className="ml-auto flex items-center gap-[clamp(14px,2.2vw,26px)] font-mono text-[11px] tracking-[0.14em] uppercase">
            <Link href="/" className="text-ink/64 hover:text-brick transition-colors">
              ← {privacyContent[language].back}
            </Link>
            <LanguageToggle />
          </nav>
        ) : (
          <nav
            aria-label="Sections"
            className="ml-auto flex items-center gap-[clamp(14px,2.2vw,30px)] font-mono text-[10.5px] tracking-[0.14em] uppercase">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => trackNavigation(section.id)}
                /* Keeps the accessible name intact once the word is visually dropped. */
                aria-label={t.nav[section.key]}
                className="text-ink/62 hover:text-brick flex gap-[7px] transition-colors">
                <span className="text-ink/60">{section.n}</span>
                {/* Below `nav` the four labels no longer fit, so the numbers carry the nav alone. */}
                <span className="nav:inline hidden">{t.nav[section.key]}</span>
              </a>
            ))}
            <LanguageToggle />
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
