import nodemailer from 'nodemailer'

/**
 * Everything below comes from a public form, so it is untrusted. Escaping it keeps a submitter
 * from planting working markup — most usefully a phishing link — in an inbox that sees the mail
 * as self-sent.
 */
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/** Escape first, then turn real newlines into breaks, so typed `<br>` stays literal text. */
const escapeParagraph = (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br />')

// This module should only be imported by server actions
export const sendEmail = async (data: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  const { name, email, subject, message } = data

  // Get environment variables at runtime
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  if (!emailUser || !emailPass) {
    throw new Error('Email configuration not available')
  }

  // Create transporter using Zoho Mail SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  })

  // nodemailer already strips CR/LF from header values; collapsing them here too costs nothing.
  const headerSubject = (subject || '(no subject)').replace(/[\r\n]+/g, ' ')

  const mailOptions = {
    from: emailUser,
    to: emailUser,
    // The address is format-checked in the action, so it is safe to reply to.
    replyTo: email,
    subject: `Portfolio Contact: ${headerSubject}`,
    text: [
      'New contact form submission',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || '(no subject)'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || '(no subject)')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeParagraph(message)}</p>
      <hr>
      <p><em>This message was sent from your portfolio contact form.</em></p>
    `,
  }

  // Send email
  return await transporter.sendMail(mailOptions)
}
