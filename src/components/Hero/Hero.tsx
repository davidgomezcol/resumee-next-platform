'use client'

import { container, site } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import CornerTicks from '../UI/CornerTicks'
import MetaTable from '../UI/MetaTable'

const ctaBase =
  'font-mono text-[11px] tracking-[0.14em] uppercase px-[22px] py-[13px] transition-colors'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section id="top" className="border-ink/12 bg-void text-bone border-b" aria-label={site.name}>
      <div
        className={`${container} grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-end gap-[clamp(36px,5vw,72px)] pt-[clamp(52px,7vw,104px)] pb-[clamp(44px,5vw,72px)]`}>
        <div>
          <p className="text-coral mb-[clamp(20px,3vw,34px)] flex flex-wrap items-center gap-2 font-mono text-[11.5px] tracking-[0.16em] uppercase">
            <span className="text-bone/70">~</span>
            {/* The cursor sits inside the text so it wraps with the last word, never alone. */}
            <span>
              {t.hero.eyebrow}
              <span
                aria-hidden
                className="animate-blink bg-coral ml-2 inline-block h-[13px] w-[7px] align-[-2px]"
              />
            </span>
          </p>

          <h1 className="font-display text-[clamp(46px,6.6vw,102px)] leading-[0.9] font-bold tracking-[-0.042em]">
            {site.name}
          </h1>

          <div
            aria-hidden
            className="bg-bone/16 mt-[clamp(24px,3.4vw,40px)] mb-[clamp(20px,2.6vw,30px)] h-px"
          />

          <p className="text-bone/82 max-w-[47ch] text-[clamp(17px,1.35vw,20px)] leading-[1.55]">
            {t.hero.intro}
          </p>
          <p className="text-coral mt-5 max-w-[44ch] text-[clamp(16px,1.3vw,19px)] leading-[1.5] font-medium tracking-[-0.005em]">
            {t.hero.tagline}
          </p>

          <div className="mt-[clamp(28px,3.6vw,42px)] flex flex-wrap gap-3">
            <a href="#contact" className={`${ctaBase} bg-bone text-void hover:bg-coral`}>
              {t.hero.cta}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener"
              className={`${ctaBase} border-bone/28 text-bone hover:border-coral hover:text-coral border`}>
              LinkedIn ↗
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener"
              className={`${ctaBase} border-bone/28 text-bone hover:border-coral hover:text-coral border`}>
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="wide:grid-cols-[minmax(150px,0.9fr)_minmax(180px,1.1fr)] grid grid-cols-1 items-end gap-[clamp(20px,2.6vw,34px)]">
          <MetaTable rows={t.hero.specs} tone="dark" layout="stacked" />

          {/* Capped below `wide` so the stacked photo doesn't dominate a phone screen. */}
          <div className="wide:max-w-full relative max-w-[270px]">
            <Image
              src={site.photo}
              alt={site.name}
              width={640}
              height={800}
              priority
              className="border-bone/16 block aspect-[4/5] w-full border object-cover object-top contrast-[1.04] saturate-[1.04]"
            />
            <CornerTicks />
          </div>
        </div>

        {/* Full-width rather than inside the specs column, which keeps that column readable. */}
        <p className="border-coral bg-coral/10 col-span-full flex max-w-[74ch] items-baseline gap-2.5 border-l-2 px-3.5 py-[11px] font-mono">
          <span
            aria-hidden
            className="animate-pulse-dot bg-coral h-1.5 w-1.5 flex-none -translate-y-[3px] rounded-full"
          />
          <span className="text-bone/92 text-[11.5px] leading-[1.55] tracking-[0.02em]">
            <span className="text-coral tracking-[0.14em] uppercase">{t.hero.statusLabel}</span>{' '}
            {t.hero.statusText}
          </span>
        </p>
      </div>
    </section>
  )
}

export default Hero
