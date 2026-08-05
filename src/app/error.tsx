'use client'

import { container } from '@/appData/site'
import { useEffect } from 'react'

/**
 * Without this, any client-side throw replaces the whole page with Next's default error screen.
 * Keeps the visitor on something that looks like the site and offers a way back.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-void text-bone min-h-[70vh]">
      <div className={`${container} flex min-h-[70vh] flex-col justify-center py-20`}>
        <p className="text-coral font-mono text-[11px] tracking-[0.16em] uppercase">Error</p>
        <h1 className="font-display mt-5 max-w-[18ch] text-[clamp(30px,4vw,56px)] leading-[1.04] font-semibold tracking-[-0.036em]">
          Something went wrong on this page.
        </h1>
        <p className="text-bone/72 mt-5 max-w-[52ch] text-[clamp(15.5px,1.15vw,17px)] leading-[1.66]">
          It has been logged. You can try again, or email me directly and I&apos;ll pick it up from
          there.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="bg-bone text-void hover:bg-coral cursor-pointer px-[22px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
            Try again
          </button>
          <a
            href="mailto:hi@dgomez.dev"
            className="border-bone/28 text-bone hover:border-coral hover:text-coral border px-[22px] py-[13px] font-mono text-[11px] tracking-[0.14em] uppercase transition-colors">
            hi@dgomez.dev
          </a>
        </div>
      </div>
    </section>
  )
}
