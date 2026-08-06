import { MetaRow } from '@/lib/translations'
import { FC } from 'react'

interface MetaTableProps {
  rows: MetaRow[]
  tone?: 'light' | 'dark'
  className?: string
  /** Called when a row with an `href` is followed — the tables themselves track nothing. */
  onLinkClick?: (row: MetaRow) => void
}

/** Mono key/value rules — hero specs, about facts, contact details. */
const MetaTable: FC<MetaTableProps> = ({ rows, tone = 'light', className, onLinkClick }) => {
  const dark = tone === 'dark'
  const rule = dark ? 'border-bone/16' : 'border-ink/12'
  const key = dark ? 'text-bone/72' : 'text-ink/64'
  const value = dark ? 'text-bone/90' : 'text-ink'
  const accent = dark ? 'hover:text-coral' : 'hover:text-brick'

  return (
    <dl className={`flex flex-col font-mono ${className ?? ''}`}>
      {rows.map((row) => (
        <div key={row.k} className={`flex justify-between gap-4 border-t py-2.5 ${rule}`}>
          <dt className={`pt-0.5 text-[11px] tracking-[0.14em] uppercase ${key}`}>{row.k}</dt>
          <dd className={`text-right text-[11px] ${value}`}>
            {row.href ? (
              /*
                Underlined rather than coloured: these sit among rows that are plain facts, and
                colour alone would not tell them apart for anyone who cannot see it (WCAG 1.4.1).
                min-h clears the 24px tap-target floor — the text alone is 14px.
              */
              <a
                href={row.href}
                onClick={() => onLinkClick?.(row)}
                className={`inline-flex min-h-[24px] items-center underline decoration-current/40 underline-offset-[3px] transition-colors ${accent}`}>
                {row.v}
              </a>
            ) : (
              row.v
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default MetaTable
