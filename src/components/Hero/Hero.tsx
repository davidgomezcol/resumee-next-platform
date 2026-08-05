'use client'

import { container, site } from '@/appData/site'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import CornerTicks from '../UI/CornerTicks'

const ctaBase =
  'font-mono text-[11px] tracking-[0.14em] uppercase px-[22px] py-[13px] transition-colors'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section id="top" className="border-ink/12 bg-void text-bone border-b" aria-label={site.name}>
      <div
        className={`${container} wide:grid-cols-[minmax(0,1.12fr)_minmax(290px,0.88fr)] grid grid-cols-1 items-stretch gap-[clamp(36px,5vw,72px)] pt-[clamp(52px,7vw,104px)] pb-[clamp(44px,5vw,72px)]`}>
        <div>
          {/*
            One heading, two visually distinct lines. Splitting these into a <p> and an <h1> left
            the page's strongest element carrying a brand term only, with none of the terms the
            title and description compete on appearing in any heading. Rendering is unchanged.
          */}
          <h1>
            <span className="text-coral mb-[clamp(20px,3vw,34px)] flex flex-wrap items-center gap-2 font-mono text-[11.5px] font-normal tracking-[0.16em] uppercase">
              <span className="text-bone/70">~</span>
              {/* The cursor sits inside the text so it wraps with the last word, never alone. */}
              <span>
                {t.hero.eyebrow}
                <span
                  aria-hidden
                  className="animate-blink bg-coral ml-2 inline-block h-[13px] w-[7px] align-[-2px]"
                />
              </span>
            </span>
            <span className="font-display block text-[clamp(46px,6.6vw,102px)] leading-[0.9] font-bold tracking-[-0.042em]">
              {site.name}
            </span>
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

          {/* Specs sit under the copy now, laid out as columns rather than a stacked list. */}
          <dl className="mt-[clamp(32px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(min(146px,100%),1fr))] gap-x-[clamp(18px,2.4vw,32px)] font-mono">
            {t.hero.specs.map((spec) => (
              <div key={spec.k} className="border-bone/22 border-t pt-[13px]">
                <dt className="text-bone/72 mb-1.5 text-[11px] tracking-[0.16em] uppercase">
                  {spec.k}
                </dt>
                <dd className="text-bone/90 text-[12.5px] leading-[1.45]">{spec.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/*
          A full-height column rather than a boxed 4:5 crop. The image fills an absolutely
          positioned frame, scaled and offset so the face stays put as the column changes height.
          width/height are the file's true intrinsic size so the srcset never asks for more pixels
          than exist.
        */}
        <div className="border-bone/16 relative min-h-[clamp(400px,46vw,660px)] self-stretch border">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={site.photo}
              alt={site.name}
              width={1023}
              height={1537}
              sizes="(min-width: 760px) 45vw, 100vw"
              priority
              className="absolute inset-0 block h-full w-full origin-[50%_26%] scale-120 object-cover object-[50%_20%] brightness-[0.93] contrast-[1.07] saturate-[1.02]"
            />
          </div>
          <CornerTicks />
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
