export type Language = 'en' | 'es'

export interface Translations {
  nav: {
    home: string
    about: string
    experience: string
    services: string
    contact: string
    menu: string
    tapToClose: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
    greeting: string
    linkedinProfile: string
    roles: {
      fullStackDeveloper: string
      entrepreneur: string
      pythonDeveloper: string
      aiEnthusiast: string
    }
  }
  about: {
    title: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
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
    subject: string
    message: string
    send: string
    namePlaceholder: string
    emailPlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
    submitting: string
    information: string
    successMessage: string
    securityQuestion: string
    securityAnswerPlaceholder: string
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
      about: '_about',
      experience: '_experience',
      services: '_services',
      contact: '_contact-me',
      menu: '_menu',
      tapToClose: 'Tap anywhere to close',
    },
    hero: {
      title: 'Full-Stack Developer',
      subtitle: 'Building the future, one line of code at a time',
      description:
        'Passionate about creating modern web applications with cutting-edge technologies. Specializing in React, Next.js, Python, and cloud solutions.',
      cta: 'Get In Touch',
      greeting: "Hi - I'm David Gómez",
      linkedinProfile: 'LinkedIn Profile',
      roles: {
        fullStackDeveloper: 'FULL-STACK DEVELOPER',
        entrepreneur: 'ENTREPRENEUR',
        pythonDeveloper: 'PYTHON DEVELOPER',
        aiEnthusiast: 'AI ENTHUSIAST',
      },
    },
    about: {
      title: '// About Me',
      paragraph1: "I'm a Computer Engineer, originally from Venezuela and currently based in Colombia since 2019. I graduated in 2008 from Fermin Toro University in Barquisimeto, Venezuela, where my thesis earned two special distinctions—Mention for Publication and Honorific Mention—and was even featured in a local newspaper.",
      paragraph2: "Since 2017, I've been working remotely with U.S.-based companies, gaining extensive experience in multicultural and distributed teams. This has shaped my ability to communicate effectively across cultures, collaborate seamlessly in remote environments, and thrive in diverse professional settings.",
      paragraph3: "Throughout my career, I've built a reputation for being organized, approachable, and resilient. I enjoy tackling complex challenges, driving projects to completion, and supporting my team every step of the way. My current passion is exploring the world of artificial intelligence, while continuing to grow as a leader and mentor.",
    },
    experience: {
      title: '// Work Experience',
      present: 'Present',
      technologies: 'Technologies:',
      achievements: 'Key Achievements:',
    },
    services: {
      title: '// Services',
      subtitle:
        'I offer a wide range of services to ensure you have the best written code and stay ahead in the competition.',
    },
    skills: {
      title: '// Skills',
    },
    contact: {
      title: '// Contact Me',
      subtitle: "Let's work together",
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      namePlaceholder: 'Your name here',
      emailPlaceholder: 'Your email address here',
      subjectPlaceholder: 'Your subject here',
      messagePlaceholder: 'Your message here',
      submitting: 'Submitting...',
      information: 'Contact Information',
      successMessage: "Thanks for your submission! I'll get back to you soon.",
      securityQuestion: 'Security Question: What is',
      securityAnswerPlaceholder: 'Enter your answer',
    },
    footer: {
      description:
        'Full-stack developer specializing in modern web technologies, cloud solutions, and AI-powered applications. Building intelligent systems and applications that deliver exceptional user experiences through innovative agentic development approaches.',
      contactMe: 'Contact Me',
      location: 'Location',
      languages: 'Languages',
      copyright: '© 2025 — Copyright All Rights reserved',
    },
  },
  es: {
    nav: {
      home: '_inicio',
      about: '_sobre-mi',
      experience: '_experiencia',
      services: '_servicios',
      contact: '_contacto',
      menu: '_menú',
      tapToClose: 'Toca en cualquier lugar para cerrar',
    },
    hero: {
      title: 'Desarrollador Full-Stack',
      subtitle: 'Construyendo el futuro, una línea de código a la vez',
      description:
        'Apasionado por crear aplicaciones web modernas con tecnologías de vanguardia. Especializado en React, Next.js, Python y soluciones en la nube.',
      cta: 'Contáctame',
      greeting: 'Hola - Soy David Gómez',
      linkedinProfile: 'Perfil de LinkedIn',
      roles: {
        fullStackDeveloper: 'DESARROLLADOR FULL-STACK',
        entrepreneur: 'EMPRESARIO',
        pythonDeveloper: 'DESARROLLADOR PYTHON',
        aiEnthusiast: 'ENTUSIASTA DE IA',
      },
    },
    about: {
      title: '// Sobre Mí',
      paragraph1: "Soy Ingeniero en Computación, originario de Venezuela y actualmente radicado en Colombia desde 2019. Me gradué en 2008 de la Universidad Fermín Toro en Barquisimeto, Venezuela, donde mi tesis obtuvo dos distinciones especiales—Mención de Publicación y Mención Honorífica—y fue incluso destacada en un periódico local.",
      paragraph2: "Desde 2017, he estado trabajando remotamente con empresas estadounidenses, adquiriendo amplia experiencia en equipos multiculturales y distribuidos. Esto ha moldeado mi capacidad para comunicarme efectivamente a través de culturas, colaborar sin problemas en entornos remotos y prosperar en diversos entornos profesionales.",
      paragraph3: "A lo largo de mi carrera, he construido una reputación por ser organizado, accesible y resiliente. Disfruto abordar desafíos complejos, llevar proyectos a su finalización y apoyar a mi equipo en cada paso del camino. Mi pasión actual es explorar el mundo de la inteligencia artificial, mientras continúo creciendo como líder y mentor.",
    },
    experience: {
      title: '// Experiencia Laboral',
      present: 'Presente',
      technologies: 'Tecnologías:',
      achievements: 'Logros Clave:',
    },
    services: {
      title: '// Servicios',
      subtitle:
        'Ofrezco una amplia gama de servicios para asegurar que tengas el mejor código escrito y te mantengas adelante en la competencia.',
    },
    skills: {
      title: '// Habilidades',
    },
    contact: {
      title: '// Contáctame',
      subtitle: 'Trabajemos juntos',
      name: 'Nombre',
      email: 'Correo',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      namePlaceholder: 'Tu nombre aquí',
      emailPlaceholder: 'Tu correo electrónico aquí',
      subjectPlaceholder: 'Tu asunto aquí',
      messagePlaceholder: 'Tu mensaje aquí',
      submitting: 'Enviando...',
      information: 'Información de Contacto',
      successMessage: '¡Gracias por tu mensaje! Te responderé pronto.',
      securityQuestion: 'Pregunta de Seguridad: ¿Cuánto es',
      securityAnswerPlaceholder: 'Ingresa tu respuesta',
    },
    footer: {
      description:
        'Desarrollador full-stack especializado en tecnologías web modernas, soluciones en la nube y aplicaciones impulsadas por IA. Construyendo sistemas inteligentes y aplicaciones que ofrecen experiencias de usuario excepcionales a través de enfoques innovadores de desarrollo agéntico.',
      contactMe: 'Contáctame',
      location: 'Ubicación',
      languages: 'Idiomas',
      copyright: '© 2025 — Copyright Todos los derechos reservados',
    },
  },
}
