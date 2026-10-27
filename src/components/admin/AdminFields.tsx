import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { SiteContent } from '../../types'

export type SetDraft = Dispatch<SetStateAction<SiteContent>>
export type ToastTone = 'success' | 'error' | 'warning'

interface AdminFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  textarea?: boolean
  rows?: number
  hint?: string
  dir?: 'rtl' | 'ltr'
  className?: string
}

export function AdminField({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  rows = 3,
  hint,
  dir,
  className = '',
}: AdminFieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          dir={dir}
          className={`field min-h-[96px] leading-7 ${dir === 'ltr' ? 'text-left' : ''}`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={`field ${dir === 'ltr' ? 'text-left' : ''}`}
        />
      )}
      {hint && <span className="mt-1.5 block text-[10px] leading-5 text-ink/40">{hint}</span>}
    </label>
  )
}

interface AdminSectionProps {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

export function AdminSection({ title, description, action, children }: AdminSectionProps) {
  return (
    <section className="rounded-[1.75rem] border border-espresso/10 bg-ivory p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-espresso/10 pb-4">
        <div>
          <h2 className="font-display text-[17px] font-semibold text-espresso">{title}</h2>
          {description && (
            <p className="mt-1 text-[11px] leading-6 text-ink/45">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function AdminAddButton({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-espresso/15 bg-cream/60 px-3 py-2 text-[11px] font-semibold text-espresso transition hover:border-caramel/40 hover:bg-linen"
    >
      {label}
    </button>
  )
}
