'use client'

import action from '@/actions/contact-form'
import { useActionState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const { t } = useLanguage()
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p className="text-accent self-center text-center text-2xl font-medium">{status.message}</p>
    )
  }

  return (
    <form action={formAction}>
      <Input label={t.contact.name} id="name" name="name" placeholder={t.contact.namePlaceholder} required />
      <Input
        label={t.contact.email}
        id="email"
        type="email"
        name="email"
        placeholder={t.contact.emailPlaceholder}
        required
      />
      <Input label="Subject" id="subject" name="subject" placeholder={t.contact.subjectPlaceholder} />
      <Textarea
        label={t.contact.message}
        id="message"
        name="message"
        placeholder={t.contact.messagePlaceholder}
        rows={7}
        required
      />
      {!status?.success && <p className="my-2 font-light text-red-600">{status?.message}</p>}
      <Button text={isPending ? t.contact.submitting : t.contact.send} disabled={isPending} />
    </form>
  )
}

export default ContactForm
