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

/**
 * The underline is the only thing that makes these controls visible, so it has to clear WCAG
 * 1.4.11's 3:1 for UI component boundaries: bone at 28% over void measured 2.33:1, at 40% it is
 * 3.55:1. Focus adds a real ring rather than relying on the 1px rule changing colour.
 */
export const fieldControl =
  'border-0 border-b bg-transparent py-2 text-[15px] text-bone outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral'

export const fieldRule = (error?: string) =>
  error ? 'border-coral' : 'border-bone/40 focus:border-coral'

export const FieldError: FC<{ id: string; children: string }> = ({ id, children }) => (
  <span id={id} className="text-coral text-[12.5px] leading-[1.4]">
    {children}
  </span>
)

/** Marks a control the server will reject when empty, so requiredness isn't a post-submit surprise. */
export const RequiredMark = () => (
  <span aria-hidden className="text-coral ml-1">
    *
  </span>
)

const Input: FC<InputProps> = ({ type = 'text', id, label, error, className, ...props }) => (
  <label htmlFor={id} className={`flex flex-col gap-[7px] ${className ?? ''}`}>
    <span className={fieldLabel}>
      {label}
      {props.required && <RequiredMark />}
    </span>
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
