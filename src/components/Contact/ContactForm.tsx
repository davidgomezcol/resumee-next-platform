'use client'

import getChallenge from '@/actions/contact-challenge'
import action from '@/actions/contact-form'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackFormSubmission } from '@/lib/analytics'
import type { Challenge } from '@/lib/challenge'
import {
  CONTACT_FIELDS,
  validateContact,
  type ContactField,
  type ContactValues,
  type FieldErrors,
} from '@/lib/contactValidation'
import { useActionState, useCallback, useEffect, useRef, useState } from 'react'
import Button from '../UI/Button'
import Input, { fieldControl, fieldLabel, fieldRule } from '../UI/Input'
import Textarea from '../UI/Textarea'

const readValues = (form: HTMLFormElement): ContactValues => {
  const data = new FormData(form)
  const get = (key: ContactField) => (data.get(key) ?? '').toString().trim()
  return {
    name: get('name'),
    email: get('email'),
    subject: get('subject'),
    message: get('message'),
  }
}

const ContactForm = () => {
  const { t, language } = useLanguage()
  const [status, formAction, isPending] = useActionState(action, null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const requesting = useRef(false)

  /**
   * Asked for on first interaction rather than on mount, so visitors who never touch the form
   * never pay for it. The token is signed server-side; the page itself is static.
   */
  const requestChallenge = useCallback(async (force = false) => {
    if (requesting.current) return
    requesting.current = true
    try {
      setChallenge((current) => (force ? null : current))
      const next = await getChallenge()
      setChallenge(next)
    } catch (error) {
      console.error('Could not load the security question: ' + error)
    } finally {
      requesting.current = false
    }
  }, [])

  const ensureChallenge = useCallback(() => {
    if (!challenge) void requestChallenge()
  }, [challenge, requestChallenge])

  useEffect(() => {
    if (status?.success) {
      trackFormSubmission('contact_form')
    }
  }, [status?.success])

  // The server runs the same rules; adopt whatever it reports, and clear on any other outcome.
  useEffect(() => {
    setFieldErrors(status?.fieldErrors ?? {})
  }, [status])

  // A rejected challenge is spent — issue a new question rather than let the old one be retried.
  useEffect(() => {
    if (status?.refreshChallenge) void requestChallenge(true)
  }, [status, requestChallenge])

  /**
   * The form carries `noValidate`, so the browser's own validation bubbles never appear and the
   * errors render in the page instead. Blocking the action here also means a typo never reaches
   * the server.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const errors = validateContact(readValues(form), t.contact)
    setFieldErrors(errors)

    const firstInvalid = CONTACT_FIELDS.find((field) => errors[field])
    if (firstInvalid) {
      event.preventDefault()
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus()
      return
    }

    // Nothing to verify against yet, or nothing answered — don't spend a round trip on it.
    const answer = form.querySelector<HTMLInputElement>('#mathAnswer')
    if (!challenge || !answer?.value.trim()) {
      event.preventDefault()
      ensureChallenge()
      answer?.focus()
    }
  }

  /** Retract a complaint as soon as the visitor starts addressing it. */
  const clearError = (field: ContactField) =>
    setFieldErrors((previous) => {
      if (!previous[field]) return previous
      const next = { ...previous }
      delete next[field]
      return next
    })

  if (status?.success) {
    return (
      <div className="flex min-h-[300px] flex-col justify-center gap-3">
        <p className="text-coral font-mono text-[11px] tracking-[0.16em] uppercase">
          {t.contact.successLabel}
        </p>
        <p className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.2] font-semibold">
          {status.message}
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      onFocus={ensureChallenge}
      noValidate
      className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[clamp(16px,2vw,22px)]">
      <Input
        label={t.contact.name}
        id="name"
        name="name"
        defaultValue={status?.values?.name ?? ''}
        error={fieldErrors.name}
        onInput={() => clearError('name')}
      />
      <Input
        label={t.contact.email}
        id="email"
        type="email"
        name="email"
        defaultValue={status?.values?.email ?? ''}
        error={fieldErrors.email}
        onInput={() => clearError('email')}
      />
      <Input
        label={t.contact.subject}
        id="subject"
        name="subject"
        className="col-span-full"
        defaultValue={status?.values?.subject ?? ''}
        error={fieldErrors.subject}
        onInput={() => clearError('subject')}
      />
      <Textarea
        label={t.contact.message}
        id="message"
        name="message"
        rows={4}
        className="col-span-full"
        defaultValue={status?.values?.message ?? ''}
        error={fieldErrors.message}
        onInput={() => clearError('message')}
      />

      {/* Honeypot — offscreen for people, irresistible to bots. */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="challengeToken" value={challenge?.token ?? ''} />

      <label htmlFor="mathAnswer" className="flex flex-col gap-[7px]">
        <span className={fieldLabel}>
          {t.contact.securityQuestion} {challenge ? `${challenge.num1} + ${challenge.num2}?` : '…'}
        </span>
        <input
          type="number"
          id="mathAnswer"
          name="mathAnswer"
          disabled={!challenge}
          className={`${fieldControl} ${fieldRule()} disabled:opacity-50`}
        />
      </label>

      <div className="flex items-end">
        <Button
          text={isPending ? t.contact.submitting : t.contact.send}
          disabled={isPending}
          trackingName="contact_form_submit"
          trackingLocation="contact_section"
        />
      </div>

      {status?.message && (
        <p role="alert" className="text-coral col-span-full text-[13px] leading-[1.5]">
          {status.message}
        </p>
      )}
    </form>
  )
}

export default ContactForm
