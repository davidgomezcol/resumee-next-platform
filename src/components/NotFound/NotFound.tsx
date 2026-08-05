'use client'

import { container, navSections, site } from '@/appData/site'
import LanguageToggle from '@/components/UI/LanguageToggle'
import { useConsent } from '@/contexts/ConsentContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { privacyContent } from '@/lib/privacyContent'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/** Mid-ellipsis, so the head and tail of a path both stay readable. */
const shorten = (value: string, max: number) => {
  if (value.length <= max) return value
  const head = Math.floor((max - 1) / 2)
  return `${value.slice(0, head)}…${value.slice(value.length - (max - 1 - head))}`
}

const NotFound = () => {
  const { t, language } = useLanguage()
  const { reopen } = useConsent()
  // Undefined until mounted: this page is prerendered, so at build time there is no requested
  // path. Rendering a default would print a confidently wrong "/" on every 404.
  const [path, setPath] = useState<string>()

  useEffect(() => {
    // pathname only. A 404 can arrive with arbitrary query params, and those must never be
    // printed on screen or interpolated into the mailto.
    setPath(location.pathname)
  }, [])

  const meta = [
    { k: t.notFound.statusKey, v: t.notFound.statusValue },
    { k: t.notFound.requestedKey, v: path ? shorten(path, 40) : '—' },
    { k: t.notFound.siteKey, v: 'dgomez.dev' },
  ]

  // Without a path there is nothing useful to report, so the button falls back to a plain mailto.
  const reportHref = path
    ? `mailto:${site.email}?subject=${encodeURIComponent(t.notFound.reportSubject + path)}`
    : `mailto:${site.email}`

  return (
    // The dark surface has to be full-bleed; only the content is constrained to the column.
    <div className="bg-void text-bone min-h-screen">
      <div className={`${container} grid min-h-screen grid-rows-[auto_1fr_auto]`}>
        <header className="border-bone/14 flex h-[58px] items-center gap-5 border-b">
          <Link href="/" className="text-bone font-mono text-[12px] tracking-[0.06em]">
            dgomez<span className="text-coral">.dev</span>
          </Link>
          <div className="ml-auto">
            <LanguageToggle variant="onDark" />
          </div>
        </header>

        <main className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-[clamp(32px,5vw,72px)] py-[clamp(44px,6vw,96px)]">
          <div>
            <p className="text-coral flex items-baseline overflow-hidden font-mono text-[11.5px] tracking-[0.14em] whitespace-nowrap">
              <span className="text-bone/70">~</span>
              <span className="ml-1.5">
                GET <span className="normal-case">{path ? shorten(path, 30) : ''}</span> → 404
              </span>
              <span
                aria-hidden
                className="animate-blink bg-coral ml-2 inline-block h-[13px] w-[7px] align-[-2px]"
              />
            </p>

            <h1 className="font-display mt-[clamp(18px,2.6vw,32px)] text-[clamp(96px,17vw,260px)] leading-[0.82] font-bold tracking-[-0.05em]">
              404
            </h1>

            <div
              aria-hidden
              className="bg-bone/16 mt-[clamp(26px,3.4vw,40px)] mb-[clamp(20px,2.6vw,28px)] h-px"
            />

            <h2 className="font-display text-[clamp(24px,2.6vw,38px)] leading-[1.1] font-semibold tracking-[-0.03em]">
              {t.notFound.heading}
            </h2>
            <p className="text-bone/80 mt-4 max-w-[52ch] text-[clamp(15.5px,1.2vw,17px)] leading-[1.68]">
              {t.notFound.body}
            </p>

            <div className="mt-[clamp(26px,3.4vw,38px)] flex flex-wrap gap-3">
              <Link
                href="/"
                className="bg-bone text-void hover:bg-coral px-[22px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
                {t.notFound.home}
              </Link>
              <a
                href={reportHref}
                className="border-bone/28 text-bone hover:border-coral hover:text-coral border px-[22px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
                {t.notFound.report}
              </a>
            </div>
          </div>

          <nav aria-label={t.notFound.index}>
            <p className="text-bone/72 pb-3.5 font-mono text-[11px] tracking-[0.18em] uppercase">
              {t.notFound.index}
            </p>
            {navSections.map((section, index) => (
              <Link
                key={section.id}
                href={`/#${section.id}`}
                className={`border-bone/16 text-bone hover:text-coral flex items-baseline gap-3 border-t py-4 transition-colors ${
                  index === navSections.length - 1 ? 'border-b' : ''
                }`}>
                <span className="text-coral font-mono text-[11px]">{section.n}</span>
                <span className="font-display text-[clamp(18px,1.6vw,22px)] font-semibold tracking-[-0.02em]">
                  {t.nav[section.key]}
                </span>
                <span aria-hidden className="text-bone/60 ml-auto font-mono text-[12px]">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
        </main>

        <footer className="pb-[clamp(24px,3vw,40px)]">
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-x-[clamp(18px,2.4vw,32px)] font-mono">
            {meta.map((row) => (
              <div key={row.k} className="border-bone/22 border-t pt-[13px]">
                <dt className="text-bone/72 mb-1.5 text-[11px] tracking-[0.16em] uppercase">
                  {row.k}
                </dt>
                <dd className="text-bone/92 text-[12.5px] leading-[1.45] [overflow-wrap:anywhere]">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
          {/* Otherwise a 404 is the one page with no route to the notice or the cookie control. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-[22px] gap-y-3 font-mono text-[10.5px] tracking-[0.1em]">
            <Link href="/privacy" className="text-bone/70 hover:text-coral transition-colors">
              {privacyContent[language].title}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-bone/70 hover:text-coral transition-colors">
              {site.email}
            </a>
            <button
              type="button"
              onClick={reopen}
              className="text-bone/70 hover:text-coral cursor-pointer font-mono text-[10.5px] tracking-[0.1em] transition-colors">
              {t.footer.cookieSettings}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default NotFound
