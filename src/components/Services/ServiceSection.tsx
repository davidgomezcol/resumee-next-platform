'use client'

import { serviceData } from '../../appData'
import { useLanguage } from '@/contexts/LanguageContext'
import { serviceTranslations } from '@/lib/serviceTranslations'
import SectionHeading from '../SectionHeading/SectionHeading'
import ServiceCard from './ServiceCard'

const ServiceSection = () => {
  const { t, language } = useLanguage()
  const translatedServices = serviceTranslations[language]

  return (
    <section id="services" className="my-14">
      <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[3.75rem] md:grid-cols-3">
        {serviceData.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={translatedServices[index].title}
            shortDescription={translatedServices[index].shortDescription}
          />
        ))}
      </div>
    </section>
  )
}

export default ServiceSection
