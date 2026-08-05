import About from '@/components/About/About'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Capabilities from '@/components/Capabilities/Capabilities'
import Contact from '@/components/Contact/Contact'
import Experience from '@/components/Experience/Experience'
import Hero from '@/components/Hero/Hero'
import { getAllWorkExperiences } from '@/services'

export default async function Home() {
  const roles = await getAllWorkExperiences()

  return (
    <>
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
