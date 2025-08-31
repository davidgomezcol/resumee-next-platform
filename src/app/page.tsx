import { skillList } from '@/appData'
import ContactSection from '@/components/Contact/ContactSection'
import Hero from '@/components/Hero/Hero'
import AboutSection from '@/components/About/AboutSection'
import WorkExperienceSection from '@/components/WorkExperience/WorkExperienceSection'
import ServiceSection from '@/components/Services/ServiceSection'
import Skills from '@/components/Skills/Skills'
import { getAllWorkExperiences } from '@/services'

export default async function Home() {
  const workExperiences = await getAllWorkExperiences()

  return (
    <main>
      <Hero />
      <Skills skills={skillList} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <AboutSection />
        <WorkExperienceSection workExperiences={workExperiences} />
        <ServiceSection />
        {/* <TestimonialSection testimonials={testimonials} /> */}
        <ContactSection />
      </div>
    </main>
  )
}
