'use server'

import nodemailer from 'nodemailer'
import { checkRateLimit } from '@/utils/rateLimit'
import { headers } from 'next/headers'

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0] || realIp || 'unknown'

    // Rate limiting check
    if (!checkRateLimit(clientIp, 3, 300000)) { // 3 attempts per 5 minutes
      return {
        success: false,
        message: 'Too many submission attempts. Please wait a few minutes before trying again.',
      }
    }

    // Honeypot field check (bots will fill this out, humans won't see it)
    const honeypot = formData.get('website')
    if (honeypot && honeypot.toString().trim() !== '') {
      console.log('Bot detected via honeypot field')
      return {
        success: false,
        message: 'Invalid submission detected.',
      }
    }

    // Timestamp validation (prevent instant submissions)
    const timestamp = formData.get('timestamp')
    if (!timestamp) {
      return {
        success: false,
        message: 'Invalid form submission.',
      }
    }

    const submissionTime = parseInt(timestamp.toString())
    const currentTime = Date.now()
    const timeDiff = currentTime - submissionTime

    // Require at least 3 seconds to fill out the form
    if (timeDiff < 3000) {
      console.log('Bot detected via timestamp validation')
      return {
        success: false,
        message: 'Please take your time to fill out the form properly.',
      }
    }

    // Math captcha validation
    const mathAnswer = formData.get('mathAnswer')
    const expectedAnswer = formData.get('expectedAnswer')
    
    if (!mathAnswer || !expectedAnswer || mathAnswer.toString() !== expectedAnswer.toString()) {
      return {
        success: false,
        message: 'Please answer the math question correctly.',
      }
    }

    const name = formData.get('name')
    if (!name)
      return {
        success: false,
        message: 'Please provide your name.',
      }

    const email = formData.get('email')
    if (!email)
      return {
        success: false,
        message: 'Please provide your email address.',
      }

    const subject = formData.get('subject')
    if (!subject)
      return {
        success: false,
        message: 'Please provide a subject.',
      }

    const message = formData.get('message')
    if (!message)
      return {
        success: false,
        message: 'Please provide a message.',
      }

    // Create transporter using Zoho Mail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Zoho email address
        pass: process.env.EMAIL_PASS, // Your Zoho email password or app-specific password
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return { success: true, message: 'Thanks for your submission! I\'ll get back to you soon.' }
  } catch (error) {
    console.error('Contact form submission error: ' + error)
    return {
      success: false,
      message: 'Oops! There was a problem submitting your form. Please try again later.',
    }
  }
}

export default action
