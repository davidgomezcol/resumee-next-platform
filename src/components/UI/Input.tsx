import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  id: string
  /** Rendered under the field; also turns the rule and the message coral. */
  error?: string
  /** Applied to the wrapping label, so callers can control grid placement. */
  className?: string
}

export const fieldLabel = 'font-mono text-[11px] tracking-[0.16em] uppercase text-bone/72'

export const fieldControl =
  'border-0 border-b bg-transparent py-2 text-[15px] text-bone outline-none transition-colors'

export const fieldRule = (error?: string) =>
  error ? 'border-coral' : 'border-bone/28 focus:border-coral'

export const FieldError: FC<{ id: string; children: string }> = ({ id, children }) => (
  <span id={id} className="text-coral text-[12.5px] leading-[1.4]">
    {children}
  </span>
)

const Input: FC<InputProps> = ({ type = 'text', id, label, error, className, ...props }) => (
  <label htmlFor={id} className={`flex flex-col gap-[7px] ${className ?? ''}`}>
    <span className={fieldLabel}>{label}</span>
    <input
      id={id}
      type={type}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
      className={`${fieldControl} ${fieldRule(error)}`}
    />
    {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
  </label>
)

export default Input
