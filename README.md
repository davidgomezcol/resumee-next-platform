# dgomez.dev

Personal site for David Gómez — senior full-stack engineer working on backend services and AI
agents. Single page, bilingual (EN/ES), deployed on Netlify.

## Development

```bash
npm install
npm run dev          # dev server with Turbopack
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run format:check # Prettier (check)
```

Run `npm run lint` and `npm run build` before committing.

## Stack

- **Next.js 15** (App Router). Note that `package.json` pins React 18 while the App Router runs
  Next's vendored React 19 — that is why `useActionState` is available.
- **TypeScript**, strict
- **Tailwind CSS 4** via PostCSS, design tokens in `src/app/globals.css`
- **Nodemailer** over Zoho SMTP for the contact form
- Archivo / Libre Franklin / JetBrains Mono via `next/font`

## Layout

```
content/work-experience/   8 bilingual role files (en + es blocks, priority-sorted)
src/
  actions/                 server actions: contact form, challenge issuance
  app/                     layout, page, error boundary, globals.css, robots, sitemap, icons
  appData/site.ts          language-neutral constants (email, socials, nav anchors)
  components/              Header, Hero, About, Experience, Capabilities, Contact, Footer, UI
  contexts/                LanguageContext (EN/ES, persisted to localStorage)
  lib/                     translations, challenge, contactValidation, email, analytics, types
  services/                content loading (fs, server-only, validated at read)
  utils/rateLimit.ts       in-memory rate limiting
```

`CLAUDE.md` carries the fuller architectural notes, conventions and known limitations.

## Content

Work experience lives in `content/work-experience/*.json`. Each file is self-contained and
bilingual — shared keys plus an `en` and an `es` block with `period`, `place`, `title`, `company`,
`summary`, `tech[]` and `achievements[]`. `priority` sorts descending, so higher appears first.

Files are validated when read; a malformed entry is skipped with a console error rather than
breaking the page. All other copy lives in `src/lib/translations.ts`.

## Environment

```
EMAIL_USER            Zoho SMTP address              (required to send)
EMAIL_PASS            Zoho SMTP password             (required to send)
CONTACT_SECRET        HMAC key for challenge tokens  (required in multi-instance deploys)
NEXT_PUBLIC_SITE_URL  canonical URL, defaults to https://dgomez.dev
```

`CONTACT_SECRET` must be independent of `EMAIL_PASS` — see the note in `CLAUDE.md`.

## Contact form

Submissions pass a honeypot, an HMAC-signed arithmetic challenge (which also carries a tamper-proof
minimum fill time), shared client/server field validation, and an in-memory per-IP rate limit before
any mail is sent. Message bodies are HTML-escaped.

## Deployment

Netlify, configured in `netlify.toml`: build `npm run build`, publish `.next`, security headers
including HSTS, 1-year immutable caching for static assets, and 301s from HTTP and `www` to the
canonical `https://dgomez.dev`.

## Contact

- [LinkedIn](https://www.linkedin.com/in/davidgomezm7/)
- [GitHub](https://github.com/davidgomezcol)

Private and proprietary. All rights reserved.
