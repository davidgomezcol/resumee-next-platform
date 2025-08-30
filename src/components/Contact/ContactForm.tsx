'use client'

import action from '@/actions/contact-form'
import { useActionState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const { t } = useLanguage()
  const [status, formAction, isPending] = useActionState(action, null)
  const [timestamp, setTimestamp] = useState<number>(0)
  const [mathQuestion, setMathQuestion] = useState<{ num1: number; num2: number; answer: number }>({ num1: 0, num2: 0, answer: 0 })

  useEffect(() => {
    // Set timestamp when component mounts
    setTimestamp(Date.now())
    
    // Generate random math question
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setMathQuestion({ num1, num2, answer: num1 + num2 })
  }, [])

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
      
      {/* Honeypot field - hidden from users but bots will fill it */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {/* Timestamp field */}
      <input type="hidden" name="timestamp" value={timestamp} />

      {/* Math captcha */}
      <div className="mb-4">
        <label htmlFor="mathAnswer" className="block text-sm font-medium text-gray-700 mb-2">
          Security Question: What is {mathQuestion.num1} + {mathQuestion.num2}?
        </label>
        <input
          type="number"
          id="mathAnswer"
          name="mathAnswer"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your answer"
        />
        <input type="hidden" name="expectedAnswer" value={mathQuestion.answer} />
      </div>

      {!status?.success && <p className="my-2 font-light text-red-600">{status?.message}</p>}
      <Button text={isPending ? t.contact.submitting : t.contact.send} disabled={isPending} />
    </form>
  )
}

export default ContactForm
