import { MetaRow } from '@/lib/translations'
import { FC } from 'react'

interface MetaTableProps {
  rows: MetaRow[]
  tone?: 'light' | 'dark'
  className?: string
}

/** Mono key/value rules — hero specs, about facts, contact details. */
const MetaTable: FC<MetaTableProps> = ({ rows, tone = 'light', className }) => {
  const dark = tone === 'dark'
  const rule = dark ? 'border-bone/16' : 'border-ink/12'
  const key = dark ? 'text-bone/72' : 'text-ink/64'
  const value = dark ? 'text-bone/90' : 'text-ink'

  return (
    <dl className={`flex flex-col font-mono ${className ?? ''}`}>
      {rows.map((row) => (
        <div key={row.k} className={`flex justify-between gap-4 border-t py-2.5 ${rule}`}>
          <dt className={`pt-0.5 text-[11px] tracking-[0.14em] uppercase ${key}`}>{row.k}</dt>
          <dd className={`text-right text-[11px] ${value}`}>{row.v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default MetaTable
