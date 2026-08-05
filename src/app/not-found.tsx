'use client'

import { container, navSections, site } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/UI/LanguageToggle'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/** Mid-ellipsis, so the head and tail of a path both stay readable. */
const shorten = (value: string, max: number) => {
  if (value.length <= max) return value
  const head = Math.floor((max - 1) / 2)
  return `${value.slice(0, head)}…${value.slice(value.length - (max - 1 - head))}`
}

const NotFound = () => {
  const { t } = useLanguage()
  // Read after mount: a static page cannot know the requested path at build time.
  const [path, setPath] = useState('/')

  useEffect(() => {
    // pathname only. A 404 can arrive with arbitrary query params, and those must never be
    // printed on screen or interpolated into the mailto.
    setPath(location.pathname)
  }, [])

  const meta = [
    { k: t.notFound.statusKey, v: t.notFound.statusValue },
    { k: t.notFound.requestedKey, v: shorten(path, 40) },
    { k: t.notFound.siteKey, v: 'dgomez.dev' },
  ]

  const reportHref = `mailto:${site.email}?subject=${encodeURIComponent(
    t.notFound.reportSubject + path,
  )}`

  return (
    <div className={`${container} bg-void text-bone grid min-h-screen grid-rows-[auto_1fr_auto]`}>
      <div className="border-bone/14 flex h-[58px] items-center gap-5 border-b">
        <Link href="/" className="text-bone font-mono text-[12px] tracking-[0.06em]">
          dgomez<span className="text-coral">.dev</span>
        </Link>
        <div className="ml-auto">
          <LanguageToggle variant="onDark" />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-center gap-[clamp(32px,5vw,72px)] py-[clamp(44px,6vw,96px)]">
        <div>
          <p className="text-coral flex items-baseline overflow-hidden font-mono text-[11.5px] tracking-[0.14em] whitespace-nowrap">
            <span className="text-bone/70">~</span>
            <span className="ml-1.5">
              GET <span className="normal-case">{shorten(path, 30)}</span> → 404
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
      </div>

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-x-[clamp(18px,2.4vw,32px)] pb-[clamp(24px,3vw,40px)] font-mono">
        {meta.map((row) => (
          <div key={row.k} className="border-bone/22 border-t pt-[13px]">
            <dt className="text-bone/72 mb-1.5 text-[11px] tracking-[0.16em] uppercase">{row.k}</dt>
            <dd className="text-bone/92 text-[12.5px] leading-[1.45] [overflow-wrap:anywhere]">
              {row.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default NotFound
