# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting with Prettier

## Architecture Overview

This is a modern personal portfolio website built with Next.js 15 App Router, TypeScript, and Tailwind CSS. The architecture follows these key patterns:

### Content Management System
- **JSON-based content**: Portfolio data is stored in JSON files under `/content/`
  - `/content/work-experience/` - Individual work experience entries
  - `/content/projects/` - Project showcase data
  - `/content/testimonials/` - Client testimonials
- **Data services**: Content is loaded via services in `/src/services/index.ts` using filesystem operations
- **Priority-based sorting**: Content is automatically sorted by priority fields

### Multi-language Support
- **Context-based i18n**: Uses React Context (`/src/contexts/LanguageContext.tsx`) for language state
- **Centralized translations**: All text is managed in `/src/lib/translations.ts` with English and Spanish support
- **Additional translation files**: Specialized translations for services and work experience in separate files
- **localStorage persistence**: Language preference is saved locally

### Component Structure
- **Section-based components**: Major page sections (Hero, About, WorkExperience, Services, Contact, Skills)
- **Atomic UI components**: Reusable components in `/src/components/UI/`
- **Theme system**: Multiple color themes defined in `/src/appData/index.ts` with theme switching capability
- **Responsive design**: All components built with Tailwind CSS for full responsiveness

### Data Flow
- **Server-side data loading**: Work experiences and other content loaded server-side in page components
- **Client-side state**: Language and theme preferences managed on client-side
- **Static generation**: Optimized for performance with Next.js static generation

### Key Configuration
- **Path aliases**: `@/*` maps to `./src/*` for clean imports
- **Image optimization**: Configured for multiple remote domains (Unsplash, ImageKit, Cloudinary, Pravatar)
- **SEO optimizations**: Built-in sitemap generation, robots.txt, and OpenGraph images

### Content Updates
When adding new content:
1. Add JSON files to appropriate `/content/` directories
2. Follow existing priority and structure patterns
3. Add translations to translation files if needed
4. Content will be automatically loaded and sorted by the services layer

### Deployment
Optimized for Netlify deployment with:
- Edge functions support
- Image optimization through Next.js
- Static generation for performance
- Form handling integration