'use client'

import action from '@/actions/contact-form'
import { useLanguage } from '@/contexts/LanguageContext'
import { trackFormSubmission } from '@/lib/analytics'
import { useActionState, useEffect, useState } from 'react'
import Button from '../UI/Button'
import Input, { fieldControl, fieldLabel } from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const { t, language } = useLanguage()
  const [status, formAction, isPending] = useActionState(action, null)
  const [timestamp, setTimestamp] = useState(0)
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: 0 })

  useEffect(() => {
    // Both are set after mount so the markup stays deterministic on the server.
    setTimestamp(Date.now())

    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setMathQuestion({ num1, num2, answer: num1 + num2 })
  }, [])

  useEffect(() => {
    if (status?.success) {
      trackFormSubmission('contact_form')
    }
  }, [status?.success])

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
      className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[clamp(16px,2vw,22px)]">
      {/*
        React resets the form once the action settles, restoring each field to its defaultValue.
        Feeding the rejected submission back in is what keeps a failed attempt from wiping the
        visitor's message. The captcha answer is deliberately left out — a wrong one should clear.
      */}
      <Input
        label={t.contact.name}
        id="name"
        name="name"
        required
        defaultValue={status?.values?.name ?? ''}
      />
      <Input
        label={t.contact.email}
        id="email"
        type="email"
        name="email"
        required
        defaultValue={status?.values?.email ?? ''}
      />
      <Input
        label={t.contact.subject}
        id="subject"
        name="subject"
        className="col-span-full"
        defaultValue={status?.values?.subject ?? ''}
      />
      <Textarea
        label={t.contact.message}
        id="message"
        name="message"
        rows={4}
        required
        className="col-span-full"
        defaultValue={status?.values?.message ?? ''}
      />

      {/* Honeypot — offscreen for people, irresistible to bots. */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      <input type="hidden" name="timestamp" value={timestamp} />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="expectedAnswer" value={mathQuestion.answer} />

      <label htmlFor="mathAnswer" className="flex flex-col gap-[7px]">
        <span className={fieldLabel}>
          {t.contact.securityQuestion} {mathQuestion.num1} + {mathQuestion.num2}?
        </span>
        <input type="number" id="mathAnswer" name="mathAnswer" required className={fieldControl} />
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
