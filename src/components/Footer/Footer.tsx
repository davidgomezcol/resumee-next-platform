'use client'

import { container, site } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackEmailClick, trackSocialClick } from '@/lib/analytics'
import LanguageToggle from '../UI/LanguageToggle'

const link = 'text-bone/70 transition-colors hover:text-coral'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="border-bone/14 bg-void text-bone/74 border-t">
      <div
        className={`${container} flex flex-wrap items-center gap-x-10 gap-y-5 py-[clamp(26px,3vw,40px)] font-mono text-[10.5px] tracking-[0.1em]`}>
        <span className="text-bone/85">
          dgomez<span className="text-coral">.dev</span>
        </span>
        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-[22px]">
          <a
            href={`mailto:${site.email}`}
            onClick={() => trackEmailClick(site.email, 'footer')}
            className={link}>
            {site.email}
          </a>
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
          <LanguageToggle variant="bare" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
