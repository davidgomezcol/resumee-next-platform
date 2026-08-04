export type Language = 'en' | 'es'

/** A mono key/value row — used by the hero specs, about facts, and contact details tables. */
export interface MetaRow {
  k: string
  v: string
}

export interface CapabilityGroup {
  /** Single-letter marker shown in the accent color: A, B, C, D. */
  n: string
  label: string
  items: { name: string; note: string }[]
}

export interface Translations {
  nav: {
    about: string
    experience: string
    capabilities: string
    contact: string
  }
  hero: {
    eyebrow: string
    intro: string
    tagline: string
    cta: string
    statusLabel: string
    statusText: string
    specs: MetaRow[]
  }
  about: {
    label: string
    heading: string
    paragraphs: string[]
    facts: MetaRow[]
  }
  experience: {
    label: string
    heading: string
    expandAll: string
    collapseAll: string
    achievements: string
    companySite: string
  }
  capabilities: {
    label: string
    heading: string
    intro: string
    groups: CapabilityGroup[]
  }
  contact: {
    label: string
    heading: string
    intro: string
    rows: MetaRow[]
    name: string
    email: string
    subject: string
    message: string
    send: string
    submitting: string
    securityQuestion: string
    successLabel: string
    successMessage: string
  }
  footer: {
    rights: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      capabilities: 'Capabilities',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Senior Full-Stack Engineer / AI Systems',
      intro:
        'I build backend services and AI agents for a cloud-native P&C insurance platform, and run agentic tooling across the development workflow — architecture, code, review, testing.',
      tagline: 'From Venezuela to Colombia, from code to AI—always learning, always building.',
      cta: 'Get in touch',
      statusLabel: 'In progress —',
      statusText:
        'Building and improving the skills of AI agents for the BriteCore platform — MCP servers, deepagents',
      specs: [
        { k: 'Based in', v: 'Bogotá, Colombia' },
        { k: 'Remote since', v: '2017 · U.S. companies' },
        { k: 'Current', v: 'TEAM International / BriteCore' },
        { k: 'Focus', v: 'Agentic AI · Python · Cloud' },
      ],
    },
    about: {
      label: 'About',
      heading: 'Fifteen years of building, seven of them remote.',
      paragraphs: [
        "I'm a Computer Engineer, originally from Venezuela and currently based in Colombia since 2019. I graduated in 2008 from Fermin Toro University in Barquisimeto, Venezuela, where my thesis earned two special distinctions—Mention for Publication and Honorific Mention—and was even featured in a local newspaper.",
        "Since 2017, I've been working remotely with U.S.-based companies, gaining extensive experience in multicultural and distributed teams. This has shaped my ability to communicate effectively across cultures, collaborate seamlessly in remote environments, and thrive in diverse professional settings.",
        "Throughout my career, I've built a reputation for being organized, approachable, and resilient. I enjoy tackling complex challenges, driving projects to completion, and supporting my team every step of the way. My current passion is exploring the world of artificial intelligence, while continuing to grow as a leader and mentor.",
      ],
      facts: [
        { k: 'Education', v: 'Computer Engineer, 2008' },
        { k: 'University', v: 'Fermín Toro, Venezuela' },
        { k: 'Thesis', v: 'Two special distinctions' },
        { k: 'Languages', v: 'Spanish · English' },
      ],
    },
    experience: {
      label: 'Experience',
      heading: 'Experience',
      expandAll: 'Expand all',
      collapseAll: 'Collapse all',
      achievements: 'Key achievements',
      companySite: 'Company site',
    },
    capabilities: {
      label: 'Capabilities',
      heading: 'What I build, and what I build it with.',
      intro:
        'Backend systems and AI agents first, with the frontend and platform work to ship them end to end.',
      groups: [
        {
          n: 'A',
          label: 'AI & Agents',
          items: [
            {
              name: 'Agentic AI workflows',
              note: 'Claude Code, Cursor, Copilot across coding, review, docs, tests, story creation.',
            },
            {
              name: 'MCP servers',
              note: 'Production servers letting AI agents drive domain APIs.',
            },
            {
              name: 'AI product features',
              note: 'Claims analytics agent with feature flags and streaming support.',
            },
            { name: 'Chat interfaces', note: 'Vue.js front ends for AI-powered features.' },
          ],
        },
        {
          n: 'B',
          label: 'Backend',
          items: [
            { name: 'Python', note: 'Scalable server-side applications.' },
            { name: 'FastAPI', note: 'Layered services for multi-tenant platforms.' },
            { name: 'Flask', note: 'APIs and internal services.' },
            { name: 'Django', note: 'Full-featured application backends.' },
          ],
        },
        {
          n: 'C',
          label: 'Frontend',
          items: [
            {
              name: 'JavaScript / TypeScript',
              note: 'Dynamic, interactive web applications.',
            },
            { name: 'Vue.js', note: 'Modern, responsive interfaces.' },
            { name: 'React.js', note: 'Component-driven user interfaces.' },
            { name: 'Next.js', note: 'Server-rendered React applications.' },
          ],
        },
        {
          n: 'D',
          label: 'Platform',
          items: [
            { name: 'AWS', note: 'High-availability, scalable deployments.' },
            {
              name: 'Docker & Kubernetes',
              note: 'Containerized apps and local dev environments.',
            },
            { name: 'GitHub Actions', note: 'CI/CD pipelines.' },
            { name: 'k6', note: 'Load testing, including concurrent-issuance stress tests.' },
          ],
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: "Let's work together",
      intro:
        'Open to conversations about AI-augmented engineering, platform work, and senior full-stack roles.',
      rows: [
        { k: 'Email', v: 'hi@dgomez.dev' },
        { k: 'Location', v: 'Bogotá, Colombia' },
        { k: 'Time zone', v: 'GMT-5 · U.S. hours' },
      ],
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      submitting: 'Sending…',
      securityQuestion: 'Security: what is',
      successLabel: 'Message sent',
      successMessage: "Thanks — I'll reply from hi@dgomez.dev.",
    },
    footer: {
      rights: 'David Gómez',
    },
  },
  es: {
    nav: {
      about: 'Perfil',
      experience: 'Experiencia',
      capabilities: 'Servicios',
      contact: 'Contacto',
    },
    hero: {
      eyebrow: 'Senior Full-Stack Engineer / AI Systems',
      intro:
        'Construyo servicios backend y agentes de IA para una plataforma cloud-native de seguros P&C, y aplico herramientas agénticas en todo el flujo de desarrollo: arquitectura, código, revisión y pruebas.',
      tagline:
        'De Venezuela a Colombia, del código a la IA—siempre aprendiendo, siempre construyendo.',
      cta: 'Contáctame',
      statusLabel: 'En curso —',
      statusText:
        'Construyendo y mejorando las skills de agentes de IA para la plataforma BriteCore — servidores MCP, deepagents',
      specs: [
        { k: 'Radicado en', v: 'Bogotá, Colombia' },
        { k: 'Remoto desde', v: '2017 · empresas de EE. UU.' },
        { k: 'Actual', v: 'TEAM International / BriteCore' },
        { k: 'Enfoque', v: 'IA agéntica · Python · Cloud' },
      ],
    },
    about: {
      label: 'Perfil',
      heading: 'Quince años construyendo, siete de ellos en remoto.',
      paragraphs: [
        'Soy Ingeniero en Informática, originario de Venezuela y radicado en Colombia desde 2019. Me gradué en 2008 en la Universidad Fermín Toro de Barquisimeto, Venezuela, donde mi tesis obtuvo dos distinciones especiales—Mención Publicación y Mención Honorífica—y fue reseñada en un diario local.',
        'Desde 2017 trabajo de forma remota con empresas de Estados Unidos, acumulando amplia experiencia en equipos multiculturales y distribuidos. Esto ha moldeado mi capacidad de comunicarme entre culturas, colaborar con fluidez en entornos remotos y desempeñarme bien en contextos profesionales diversos.',
        'A lo largo de mi carrera me he ganado una reputación de persona organizada, accesible y resiliente. Disfruto los retos complejos, llevar los proyectos hasta el final y apoyar a mi equipo en cada paso. Mi pasión actual es explorar el mundo de la inteligencia artificial, mientras sigo creciendo como líder y mentor.',
      ],
      facts: [
        { k: 'Formación', v: 'Ingeniero en Informática, 2008' },
        { k: 'Universidad', v: 'Fermín Toro, Venezuela' },
        { k: 'Tesis', v: 'Dos distinciones especiales' },
        { k: 'Idiomas', v: 'Español · Inglés' },
      ],
    },
    experience: {
      label: 'Experiencia',
      heading: 'Experiencia',
      expandAll: 'Expandir todo',
      collapseAll: 'Contraer todo',
      achievements: 'Logros principales',
      companySite: 'Sitio de la empresa',
    },
    capabilities: {
      label: 'Servicios',
      heading: 'Lo que construyo, y con qué lo construyo.',
      intro:
        'Sistemas backend y agentes de IA en primer lugar, con el trabajo de frontend y plataforma necesario para llevarlos a producción.',
      groups: [
        {
          n: 'A',
          label: 'IA y Agentes',
          items: [
            {
              name: 'Flujos de IA agéntica',
              note: 'Claude Code, Cursor y Copilot en código, revisión, documentación, pruebas e historias.',
            },
            {
              name: 'Servidores MCP',
              note: 'Servidores en producción que permiten a agentes operar APIs de dominio.',
            },
            {
              name: 'Funcionalidades con IA',
              note: 'Agente de analítica de siniestros con feature flags y streaming.',
            },
            {
              name: 'Interfaces de chat',
              note: 'Front ends en Vue.js para funcionalidades con IA.',
            },
          ],
        },
        {
          n: 'B',
          label: 'Backend',
          items: [
            { name: 'Python', note: 'Aplicaciones de servidor escalables.' },
            { name: 'FastAPI', note: 'Servicios en capas para plataformas multi-tenant.' },
            { name: 'Flask', note: 'APIs y servicios internos.' },
            { name: 'Django', note: 'Backends de aplicación completos.' },
          ],
        },
        {
          n: 'C',
          label: 'Frontend',
          items: [
            {
              name: 'JavaScript / TypeScript',
              note: 'Aplicaciones web dinámicas e interactivas.',
            },
            { name: 'Vue.js', note: 'Interfaces modernas y responsivas.' },
            { name: 'React.js', note: 'Interfaces basadas en componentes.' },
            { name: 'Next.js', note: 'Aplicaciones React renderizadas en servidor.' },
          ],
        },
        {
          n: 'D',
          label: 'Plataforma',
          items: [
            { name: 'AWS', note: 'Despliegues escalables de alta disponibilidad.' },
            {
              name: 'Docker y Kubernetes',
              note: 'Aplicaciones en contenedores y entornos locales.',
            },
            { name: 'GitHub Actions', note: 'Pipelines de CI/CD.' },
            { name: 'k6', note: 'Pruebas de carga, incluida emisión concurrente.' },
          ],
        },
      ],
    },
    contact: {
      label: 'Contacto',
      heading: 'Trabajemos juntos',
      intro:
        'Abierto a conversaciones sobre ingeniería aumentada con IA, trabajo de plataforma y roles senior full-stack.',
      rows: [
        { k: 'Correo', v: 'hi@dgomez.dev' },
        { k: 'Ubicación', v: 'Bogotá, Colombia' },
        { k: 'Zona horaria', v: 'GMT-5 · horario EE. UU.' },
      ],
      name: 'Nombre',
      email: 'Correo',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      submitting: 'Enviando…',
      securityQuestion: 'Seguridad: ¿cuánto es',
      successLabel: 'Mensaje enviado',
      successMessage: 'Gracias — te responderé desde hi@dgomez.dev.',
    },
    footer: {
      rights: 'David Gómez',
    },
  },
}
