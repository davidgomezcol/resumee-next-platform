import About from '@/components/About/About'
import Capabilities from '@/components/Capabilities/Capabilities'
import Contact from '@/components/Contact/Contact'
import Experience from '@/components/Experience/Experience'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import { getAllWorkExperiences } from '@/services'
import { siteUrl } from '@/lib/siteMetadata'

/**
 * Lives here rather than in the root layout because it describes this page specifically; from the
 * layout it was emitted on /privacy and the 404 too, where the trail is simply wrong.
 *
 * The FAQPage block that used to sit beside it has been deleted outright. Google requires FAQ
 * answers to be visible on the page and none of the six were anywhere in the DOM, so it described
 * content that did not exist — no possible rich result, and the exact shape the structured-data
 * spam policy targets.
 */
const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}#about` },
    { '@type': 'ListItem', position: 3, name: 'Experience', item: `${siteUrl}#experience` },
    { '@type': 'ListItem', position: 4, name: 'Capabilities', item: `${siteUrl}#capabilities` },
    { '@type': 'ListItem', position: 5, name: 'Contact', item: `${siteUrl}#contact` },
  ],
}

/** Shared by `/` and `/es`; the language comes from the route via LanguageProvider. */
const HomePage = async () => {
  const roles = await getAllWorkExperiences()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
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

export default HomePage
