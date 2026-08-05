'use client'

import { container, navSections } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackNavigation } from '@/lib/analytics'
import { privacyContent } from '@/lib/privacyContent'
import { localisedHref } from '@/lib/siteMetadata'
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
      <div className={`${container} nav:gap-6 flex h-[58px] items-center gap-3`}>
        <Link
          href={localisedHref(language, '/')}
          className="text-ink inline-flex min-h-[36px] items-center font-mono text-[12px] tracking-[0.06em]">
          dgomez<span className="text-brick">.dev</span>
        </Link>

        {variant === 'document' ? (
          <nav
            aria-label={privacyContent[language].back}
            className="ml-auto flex items-center gap-[clamp(14px,2.2vw,26px)] font-mono text-[11px] tracking-[0.14em] uppercase">
            <Link
              href={localisedHref(language, '/')}
              className="text-ink/64 hover:text-brick inline-flex min-h-[36px] items-center transition-colors">
              ← {privacyContent[language].back}
            </Link>
            <LanguageToggle />
          </nav>
        ) : (
          <nav
            aria-label="Sections"
            /*
              Scrolls sideways rather than pushing the page wide: with 24px-minimum tap targets the
              four numbers plus the toggle exceed a 320px viewport once the logo is accounted for.
            */
            className="nav:gap-[clamp(14px,2.2vw,30px)] ml-auto flex min-w-0 items-center gap-2.5 overflow-x-auto font-mono text-[10.5px] tracking-[0.14em] uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => trackNavigation(section.id)}
                /*
                  Includes the number so that below `nav`, where only "01" is visible, the visible
                  text is still contained in the accessible name — WCAG 2.5.3 Label in Name.
                */
                aria-label={`${section.n} ${t.nav[section.key]}`}
                className="text-ink/62 hover:text-brick inline-flex min-h-[36px] min-w-[28px] shrink-0 items-center justify-center gap-[7px] py-2 transition-colors">
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
