import About from '@/components/About/About'
import Capabilities from '@/components/Capabilities/Capabilities'
import Contact from '@/components/Contact/Contact'
import Experience from '@/components/Experience/Experience'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import { getAllWorkExperiences } from '@/services'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://dgomez.dev'

/**
 * These two live here rather than in the root layout because both describe this page specifically.
 * From the layout they were also emitted on /privacy and on the 404 — where the Home → About →
 * Experience trail is simply wrong, and where Google's requirement that FAQ Q&A be visible on the
 * page is not met.
 */
const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: url },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${url}#about` },
    { '@type': 'ListItem', position: 3, name: 'Experience', item: `${url}#experience` },
    { '@type': 'ListItem', position: 4, name: 'Capabilities', item: `${url}#capabilities` },
    { '@type': 'ListItem', position: 5, name: 'Contact', item: `${url}#contact` },
  ],
}

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does David Gómez build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'David Gómez builds backend services and AI agents for a cloud-native P&C insurance platform — Python, FastAPI, and Flask services, production MCP servers, and Vue.js chat interfaces — along with the frontend and platform work to ship them end to end.',
      },
    },
    {
      '@type': 'Question',
      name: "What is David Gómez's background and experience?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'David Gómez is a Computer Engineer with 15+ years of experience, graduated in 2008 from Universidad Fermín Toro in Venezuela with two special distinctions. He has been working remotely with US companies since 2017 and is based in Bogotá, Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is David Gómez available for remote work with US companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. He works from Bogotá on GMT-5, overlapping U.S. business hours, and has worked remotely with US-based companies since 2017.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does David Gómez specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Python, FastAPI, Flask, and Django on the backend; agentic AI workflows and MCP servers; Vue.js, React.js, Next.js, JavaScript and TypeScript on the frontend; AWS, Docker, Kubernetes, GitHub Actions, and k6 on the platform side.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes David Gómez unique as an engineer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'He pairs 15+ years of engineering with day-to-day agentic AI practice across the whole development workflow — architecture, code, review, testing — and brings strong communication across multicultural, distributed teams plus a track record of mentoring.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I get in touch with David Gómez?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the contact form on dgomez.dev, email hi@dgomez.dev, or connect on LinkedIn. He is open to conversations about AI-augmented engineering, platform work, and senior full-stack roles.',
      },
    },
  ],
}

export default async function Home() {
  const roles = await getAllWorkExperiences()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience roles={roles} />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
