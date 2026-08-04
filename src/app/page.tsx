import About from '@/components/About/About'
import Capabilities from '@/components/Capabilities/Capabilities'
import Contact from '@/components/Contact/Contact'
import Experience from '@/components/Experience/Experience'
import Hero from '@/components/Hero/Hero'
import { getAllWorkExperiences } from '@/services'

export default async function Home() {
  const roles = await getAllWorkExperiences()

  return (
    <>
      <Hero />
      <About />
      <Experience roles={roles} />
      <Capabilities />
      <Contact />
    </>
  )
}
