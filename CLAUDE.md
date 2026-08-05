# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting with Prettier

Always run `npm run lint` and `npm run build` before committing to catch errors early.

## Tech Stack

- **Framework**: Next.js 15.1.12 (App Router) with React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.0 via PostCSS
- **Deployment**: Netlify (Node 18, `.next` publish dir)
- **Email**: Nodemailer with Zoho SMTP
- **Fonts**: Archivo (display), Libre Franklin (body), JetBrains Mono (labels/meta) — Google Fonts
- **Browser baseline**: Chrome/Edge 111, Firefox 128, Safari/iOS 16.4 (`browserslist` in
  `package.json`). This is Tailwind v4's own floor — the stylesheet uses `@property` and
  `color-mix()`, so older browsers cannot render the site regardless of what the JS targets.

## Project Structure

```
/content/                   # JSON-based CMS
  /work-experience/         # Work entries (8 files, bilingual, priority-sorted)
/src/
  /actions/contact-form.ts  # Server action for contact form
  /app/                     # Next.js App Router (single page at /)
    layout.tsx              # Root layout: fonts, metadata, structured data, Header + Footer
    page.tsx                # Composes Hero → About → Experience → Capabilities → Contact
    globals.css             # Design tokens (@theme) + base styles
    sitemap.ts              # Dynamic sitemap generation
    robots.ts               # robots.txt config
    opengraph-image.tsx     # OG image generation
  /appData/site.ts          # Language-neutral constants (email, socials, nav anchors, container)
  /components/              # React components
    /About/                 # About section
    /Capabilities/          # Capability groups A–D
    /Contact/               # Contact section + form (CAPTCHA, honeypot, timestamp)
    /Experience/            # Role accordion (Experience.tsx owns state, RoleRow renders)
    /Footer/                # Footer
    /Header/                # Sticky numbered nav
    /Hero/                  # Hero section
    /UI/                    # SectionLabel, MetaTable, CornerTicks, LanguageToggle, form controls
  /contexts/LanguageContext.tsx  # i18n React Context (EN/ES)
  /lib/
    translations.ts         # All EN/ES UI copy and static content
    email.ts                # Email sending utility
    analytics.ts            # Analytics helpers
    types.d.ts              # Shared TypeScript types
  /services/index.ts        # Data loading (fs-based, server-side only)
  /utils/rateLimit.ts       # In-memory rate limiting
```

## Architecture Patterns

### Content Management

- Work experience lives in `/content/work-experience/*.json`; everything else is in `translations.ts`
- Loaded server-side via `/src/services/index.ts` using `fs.readFile`
- Sorted by `priority` descending — **higher number = shown first** (BriteCore is 8)
- Each role file is self-contained and bilingual: shared keys (`id`, `priority`, `companyUrl`) plus
  an `en` and an `es` block with `period`, `place`, `title`, `company`, `summary`, `tech[]`,
  `achievements[]`. Add a file with a new `priority` and it auto-loads.

### Internationalization (i18n)

- React Context at `/src/contexts/LanguageContext.tsx`
- Two languages: English (`en`) and Spanish (`es`)
- UI copy in `translations.ts`; role copy inside each content JSON, selected with `role[language]`
- Language preference persisted in `localStorage`
- Use `useLanguage()` hook to access translations in components

### Design system

- One fixed palette, no theme switcher. Tokens are defined in `globals.css` under `@theme`:
  `bone` (page background), `ink` (text on bone), `void` (dark sections), `brick` (accent on light),
  `coral` (accent on dark)
- Translucency uses Tailwind opacity modifiers (`text-ink/62`, `border-bone/16`) — no rgba literals
- Fonts map to `font-display`, `font-body`, `font-mono`. The mono face opts out of `next/font`'s
  automatic fallback: that fallback is Arial with overridden metrics, which is fine for the two
  proportional families but wrong for a monospace one — it wrapped mono text differently and moved
  the page on swap. It falls back to a real monospace stack instead. Don't re-enable
  `adjustFontFallback` there without re-measuring CLS at 412px
- Two custom breakpoints carry the design's own responsive thresholds: `nav` (620px — below it the
  header shows section numbers without the words) and `wide` (760px — below it the hero side block
  and the experience rows collapse to one column). The source design switches on these in JS because
  its format only emits inline styles; here they are plain media queries via `--breakpoint-*`
- Repeating design elements are components: `SectionLabel` (the `01 / About` eyebrow), `MetaTable`
  (mono key/value rules), `CornerTicks` (accent corner marks)

### Data Flow

- **Server**: `page.tsx` loads work experience and passes it to `Experience`
- **Client**: Language state via React Context + localStorage
- **Forms**: Contact form uses Next.js Server Actions (`/src/actions/contact-form.ts`)

### Component Conventions

- Section components are `'use client'` when they need interactivity
- UI components in `/src/components/UI/` are small, reusable building blocks
- All components use Tailwind CSS for styling (no CSS modules)

## Code Style

### Formatting (Prettier)

- Single quotes, no semicolons
- 2-space indentation, 100 char print width
- `bracketSameLine: true`
- Tailwind CSS class sorting via `prettier-plugin-tailwindcss`

### Linting (ESLint)

- Extends `next/core-web-vitals` and `next/typescript`
- `react/no-unescaped-entities` is off
- `react/no-children-prop` is off

### TypeScript

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Shared types in `/src/lib/types.d.ts`

## Environment Variables

Required for contact form functionality:

- `EMAIL_USER` - Zoho SMTP email address
- `EMAIL_PASS` - Zoho SMTP password
- `NEXT_PUBLIC_SITE_URL` - Canonical site URL (defaults to `https://dgomez.dev`)

- `CONTACT_SECRET` - HMAC key for signing contact-form challenge tokens. Required in any
  multi-instance deployment: without it each instance signs with its own random key, so a token
  issued by one will not verify on another. It must NOT be derived from `EMAIL_PASS` — both halves
  of the signed message are public, so that would expose the mail credential to offline cracking.

## Deployment

Deployed on Netlify with configuration in `netlify.toml`:

- Security headers: X-Frame-Options DENY, XSS protection, nosniff
- Static asset caching: 1 year immutable for `/_next/static/*` and `/images/*`
- Redirects: HTTP/www to canonical `https://dgomez.dev`
- Image optimization via Next.js (WebP + AVIF formats)

## Known Limitations

- Rate limiting (`/src/utils/rateLimit.ts`) uses in-memory `Map` — resets on serverless cold starts
- Contact challenge tokens (`/src/lib/challenge.ts`) are stateless, so they cannot be single-use.
  Forgery and long-lived replay are closed by the signature and the 30-minute window; a token
  captured and reused inside that window still verifies. A script that reads the page and computes
  the sum also still passes — the challenge stops forgery, not solving.
- Single-page app with anchor-based navigation (no route-level pages beyond `/`)
- Sitemap only includes the root URL
- `src/app/` holds both `opengraph-image.tsx` (generator) and `opengraph-image.png` (static), and the
  metadata block points at the `.png` — pick one if the OG image ever needs to change
