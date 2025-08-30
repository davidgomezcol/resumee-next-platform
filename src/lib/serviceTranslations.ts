import { Language } from './translations'

export interface ServiceTranslation {
  title: string
  shortDescription: string
}

export const serviceTranslations: Record<Language, ServiceTranslation[]> = {
  en: [
    {
      title: 'JavaScript Development',
      shortDescription: 'Creating dynamic and interactive web applications using JavaScript.',
    },
    {
      title: 'React.js Development',
      shortDescription: 'Building modern and responsive user interfaces with React.js.',
    },
    {
      title: 'Next.js Development',
      shortDescription: 'Creating server-rendered React applications with Next.js.',
    },
    {
      title: 'Python Development',
      shortDescription: 'Developing scalable server-side applications using Python.',
    },
    {
      title: 'Django Development',
      shortDescription: 'Developing scalable server-side applications using Django.',
    },
    {
      title: 'Flask Development',
      shortDescription: 'Developing scalable server-side applications using Flask.',
    },
    {
      title: 'Docker',
      shortDescription: 'Containerizing applications for easy deployment and scalability.',
    },
    {
      title: 'AWS',
      shortDescription: 'Deploying applications on AWS for high availability and scalability.',
    },
    {
      title: 'Vue.js Development',
      shortDescription: 'Building modern and responsive user interfaces with Vue.js.',
    },
    {
      title: 'Kubernetes',
      shortDescription: 'Orchestrating containerized applications with Kubernetes.',
    },
  ],
  es: [
    {
      title: 'Desarrollo JavaScript',
      shortDescription: 'Creando aplicaciones web dinámicas e interactivas usando JavaScript.',
    },
    {
      title: 'Desarrollo React.js',
      shortDescription: 'Construyendo interfaces de usuario modernas y responsivas con React.js.',
    },
    {
      title: 'Desarrollo Next.js',
      shortDescription: 'Creando aplicaciones React renderizadas en el servidor con Next.js.',
    },
    {
      title: 'Desarrollo Python',
      shortDescription: 'Desarrollando aplicaciones del lado del servidor escalables usando Python.',
    },
    {
      title: 'Desarrollo Django',
      shortDescription: 'Desarrollando aplicaciones del lado del servidor escalables usando Django.',
    },
    {
      title: 'Desarrollo Flask',
      shortDescription: 'Desarrollando aplicaciones del lado del servidor escalables usando Flask.',
    },
    {
      title: 'Docker',
      shortDescription: 'Containerizando aplicaciones para un despliegue y escalabilidad fáciles.',
    },
    {
      title: 'AWS',
      shortDescription: 'Desplegando aplicaciones en AWS para alta disponibilidad y escalabilidad.',
    },
    {
      title: 'Desarrollo Vue.js',
      shortDescription: 'Construyendo interfaces de usuario modernas y responsivas con Vue.js.',
    },
    {
      title: 'Kubernetes',
      shortDescription: 'Orquestando aplicaciones contenedorizadas con Kubernetes.',
    },
  ],
}
