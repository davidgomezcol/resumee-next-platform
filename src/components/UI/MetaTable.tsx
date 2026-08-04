import { MetaRow } from '@/lib/translations'
import { FC } from 'react'

interface MetaTableProps {
  rows: MetaRow[]
  tone?: 'light' | 'dark'
  /** `split` puts the value on the right; `stacked` puts it under the key. */
  layout?: 'split' | 'stacked'
  className?: string
}

/** Mono key/value rules — hero specs, about facts, contact details. */
const MetaTable: FC<MetaTableProps> = ({ rows, tone = 'light', layout = 'split', className }) => {
  const dark = tone === 'dark'
  const rule = dark ? 'border-bone/16' : 'border-ink/12'
  const key = dark ? 'text-bone/72' : 'text-ink/64'
  const value = dark ? 'text-bone/90' : 'text-ink'

  return (
    <dl className={`flex flex-col font-mono ${className ?? ''}`}>
      {rows.map((row) => (
        <div
          key={row.k}
          className={
            layout === 'split'
              ? `flex justify-between gap-4 border-t py-2.5 ${rule}`
              : `border-t py-3 ${rule}`
          }>
          <dt
            className={`text-[11px] tracking-[0.14em] uppercase ${key} ${layout === 'split' ? 'pt-0.5' : 'mb-[5px]'}`}>
            {row.k}
          </dt>
          <dd
            className={
              layout === 'split'
                ? `text-right text-[11px] ${value}`
                : `text-[12.5px] leading-[1.45] ${value}`
            }>
            {row.v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default MetaTable
