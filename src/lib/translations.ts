export type Language = 'en' | 'es'

export interface Translations {
  nav: {
    home: string
    experience: string
    services: string
    contact: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
  }
  experience: {
    title: string
    present: string
    technologies: string
    achievements: string
  }
  services: {
    title: string
    subtitle: string
  }
  skills: {
    title: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    namePlaceholder: string
    emailPlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
    submitting: string
  }
  footer: {
    description: string
    contactMe: string
    location: string
    languages: string
    copyright: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: '_home',
      experience: '_experience',
      services: '_services',
      contact: '_contact-me',
    },
    hero: {
      title: 'Full-Stack Developer',
      subtitle: 'Building the future, one line of code at a time',
      description: 'Passionate about creating modern web applications with cutting-edge technologies. Specializing in React, Next.js, Python, and cloud solutions.',
      cta: 'Get In Touch',
    },
    experience: {
      title: '// Work Experience',
      present: 'Present',
      technologies: 'Technologies:',
      achievements: 'Key Achievements:',
    },
    services: {
      title: '// Services',
      subtitle: 'I offer a wide range of services to ensure you have the best written code and stay ahead in the competition.',
    },
    skills: {
      title: '// Skills',
    },
    contact: {
      title: '// Contact Me',
      subtitle: 'Let\'s work together',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      namePlaceholder: 'Your name here',
      emailPlaceholder: 'Your email address here',
      subjectPlaceholder: 'Your subject here',
      messagePlaceholder: 'Your message here',
      submitting: 'Submitting...',
    },
    footer: {
      description: 'Full-stack developer specializing in modern web technologies, cloud solutions, and AI-powered applications. Building intelligent systems and applications that deliver exceptional user experiences through innovative agentic development approaches.',
      contactMe: 'Contact Me',
      location: 'Location',
      languages: 'Languages',
      copyright: '© 2025 — Copyright All Rights reserved',
    },
  },
  es: {
    nav: {
      home: '_inicio',
      experience: '_experiencia',
      services: '_servicios',
      contact: '_contacto',
    },
    hero: {
      title: 'Desarrollador Full-Stack',
      subtitle: 'Construyendo el futuro, una línea de código a la vez',
      description: 'Apasionado por crear aplicaciones web modernas con tecnologías de vanguardia. Especializado en React, Next.js, Python y soluciones en la nube.',
      cta: 'Contáctame',
    },
    experience: {
      title: '// Experiencia Laboral',
      present: 'Presente',
      technologies: 'Tecnologías:',
      achievements: 'Logros Clave:',
    },
    services: {
      title: '// Servicios',
      subtitle: 'Ofrezco una amplia gama de servicios para asegurar que tengas el mejor código escrito y te mantengas adelante en la competencia.',
    },
    skills: {
      title: '// Habilidades',
    },
    contact: {
      title: '// Contáctame',
      subtitle: 'Trabajemos juntos',
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      namePlaceholder: 'Tu nombre aquí',
      emailPlaceholder: 'Tu correo electrónico aquí',
      subjectPlaceholder: 'Tu asunto aquí',
      messagePlaceholder: 'Tu mensaje aquí',
      submitting: 'Enviando...',
    },
    footer: {
      description: 'Desarrollador full-stack especializado en tecnologías web modernas, soluciones en la nube y aplicaciones impulsadas por IA. Construyendo sistemas inteligentes y aplicaciones que ofrecen experiencias de usuario excepcionales a través de enfoques innovadores de desarrollo agéntico.',
      contactMe: 'Contáctame',
      location: 'Ubicación',
      languages: 'Idiomas',
      copyright: '© 2025 — Copyright Todos los derechos reservados',
    },
  },
}
