'use client'

import { container, navSections } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackNavigation } from '@/lib/analytics'
import LanguageToggle from '../UI/LanguageToggle'

const Header = () => {
  const { t } = useLanguage()

  return (
    <header className="border-ink/12 bg-bone/86 sticky top-0 z-40 border-b backdrop-blur-[10px]">
      <div className={`${container} flex h-[58px] items-center gap-[clamp(14px,2.2vw,30px)]`}>
        <a href="#top" className="text-ink shrink-0 font-mono text-[12px] tracking-[0.06em]">
          dgomez<span className="text-brick">.dev</span>
        </a>
        {/*
          The four labels plus the toggle don't fit a phone once Spanish lengthens them, so the
          links scroll sideways below `sm`. The toggle sits outside that scroller to stay reachable.
        */}
        <nav
          aria-label="Sections"
          className="ml-auto flex min-w-0 items-center gap-3.5 overflow-x-auto font-mono text-[10.5px] tracking-[0.14em] uppercase [scrollbar-width:none] sm:gap-[clamp(14px,2.2vw,30px)] [&::-webkit-scrollbar]:hidden">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => trackNavigation(section.id)}
              className="text-ink/62 hover:text-brick flex shrink-0 gap-[7px] whitespace-nowrap transition-colors">
              <span className="text-ink/60 hidden sm:inline">{section.n}</span>
              <span>{t.nav[section.key]}</span>
            </a>
          ))}
        </nav>
        <LanguageToggle />
      </div>
    </header>
  )
}

export default Header
