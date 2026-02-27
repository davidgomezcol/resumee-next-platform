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

- **Framework**: Next.js 15.1.7 (App Router) with React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.0 via PostCSS
- **Deployment**: Netlify (Node 18, `.next` publish dir)
- **Email**: Nodemailer with Zoho SMTP
- **Font**: Fira Code (Google Fonts)

## Project Structure

```
/content/                   # JSON-based CMS
  /work-experience/         # Work entries (8 files, priority-sorted)
  /projects/                # Project showcase (4 files)
  /testimonials/            # Client testimonials (5 files)
/src/
  /actions/contact-form.ts  # Server action for contact form
  /app/                     # Next.js App Router (single page at /)
    layout.tsx              # Root layout with metadata, structured data, fonts
    page.tsx                # Main page composing all sections
    globals.css             # Global styles + Tailwind theme
    sitemap.ts              # Dynamic sitemap generation
    robots.ts               # robots.txt config
    opengraph-image.tsx     # OG image generation
  /appData/                 # Static app config (themes, personal info, nav links)
  /components/              # React components
    /About/                 # About section
    /Breadcrumbs/           # SEO breadcrumbs
    /Contact/               # Contact form with CAPTCHA + honeypot
    /Footer/                # Footer
    /Hero/                  # Hero section with role switcher
    /LanguageSwitcher/      # EN/ES toggle
    /Marquee/               # Scrolling text animation
    /Navbar/                # Navigation bar
    /SectionHeading/        # Reusable section header
    /Services/              # Services section
    /Skills/                # Skills grid
    /TableOfContents/       # Side navigation
    /Testimonials/          # Testimonials carousel
    /Theme/                 # Theme switcher (Light, Dark, Aqua, Retro)
    /UI/                    # Atomic UI components (Button, Modal, etc.)
    /WorkExperience/        # Work experience timeline
  /contexts/LanguageContext.tsx  # i18n React Context (EN/ES)
  /hooks/                   # Custom hooks
    useHeadingsData.ts      # Extract heading data for TOC
    useIsLargeScreen.ts     # Responsive breakpoint detection
    useOutsideClick.ts      # Click outside handler
    useRoleSwitcher.ts      # Rotating role titles in hero
    useRotatingAnimation.ts # Generic rotation animation
  /lib/                     # Utilities and types
    translations.ts         # Main EN/ES translations
    workExperienceTranslations.ts
    serviceTranslations.ts
    email.ts                # Email sending utility
    analytics.ts            # Analytics helpers
    types.d.ts              # Shared TypeScript types
  /services/index.ts        # Data loading (fs-based, server-side only)
  /utils/
    images.ts               # Image path constants
    index.ts                # General utility functions
    rateLimit.ts            # In-memory rate limiting
```

## Architecture Patterns

### Content Management
- All content lives in `/content/` as JSON files
- Loaded server-side via `/src/services/index.ts` using `fs.readFile`
- Sorted by `priority` field (lower = higher priority)
- To add content: create a JSON file following existing schemas, it auto-loads

### Internationalization (i18n)
- React Context at `/src/contexts/LanguageContext.tsx`
- Two languages: English (`en`) and Spanish (`es`)
- Translations split across three files: `translations.ts`, `workExperienceTranslations.ts`, `serviceTranslations.ts`
- Language preference persisted in `localStorage`
- Use `useLanguage()` hook to access translations in components

### Theming
- Four themes defined in `/src/appData/index.ts`: Light, Dark, Aqua, Retro
- Theme applied via CSS custom properties in `globals.css`
- Theme switcher component at `/src/components/Theme/`

### Data Flow
- **Server**: Content JSON loaded in `page.tsx` and passed as props
- **Client**: Language and theme state managed via React Context + localStorage
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

## Deployment

Deployed on Netlify with configuration in `netlify.toml`:
- Security headers: X-Frame-Options DENY, XSS protection, nosniff
- Static asset caching: 1 year immutable for `/_next/static/*` and `/images/*`
- Redirects: HTTP/www to canonical `https://dgomez.dev`
- Image optimization via Next.js (WebP + AVIF formats)

## Known Limitations

- Rate limiting (`/src/utils/rateLimit.ts`) uses in-memory `Map` — resets on serverless cold starts
- Single-page app with anchor-based navigation (no route-level pages beyond `/`)
- Sitemap only includes the root URL
