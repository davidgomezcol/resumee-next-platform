import { Language } from './translations'

export interface WorkExperienceTranslation {
  position: string
  description: string
  achievements: string[]
}

export const workExperienceTranslations: Record<Language, WorkExperienceTranslation[]> = {
  en: [
    {
      position: 'Senior Full-Stack Developer | AI-Augmented Development | Cloud-Native Insurance Platform',
      description: 'Leveraging Agentic AI for High-Performance Software Delivery. Currently working on a cloud-native platform for P&C insurers, integrating Agentic AI into the development workflow. I plan tasks with AI agents and have customized rules in Cursor IDE to align AI outputs with project standards. Leading two major initiatives: migrating the system to Python 3 and introducing a significant new feature to expand platform capabilities.',
      achievements: [
        'Developing scalable APIs and backend features using Python, while also building intuitive UIs with Vue.js',
        'Ensuring seamless integration of frontend and backend components, and maintaining high code quality through comprehensive unit and integration testing',
        'Improving and managing Docker environments for efficient local development',
        'Contributing to CI/CD processes and automating tasks for increased productivity',
        'Active in agile ceremonies, participating in planning, conducting code reviews, and providing mentorship',
        'Collaborating with cross-functional teams on feature development and integration',
        'Troubleshooting and debugging complex issues',
        'Ensuring development consistency through scripting and automation',
        'Enhancing developer efficiency through AI-assisted tooling and process automation',
        'Expanding AI engineering capabilities via IBM Generative AI Engineering and AI Engineering Specialization programs on Coursera',
      ],
    },
    {
      position: 'Web Developer',
      description: 'Key contributor to the startup\'s rapid product development process. As a software engineer, led the team in implementing designs using the latest web development technologies. Managed Public Cloud Services (GCP) to ensure reliable and scalable infrastructure.',
      achievements: [
        'Developed custom WordPress template solutions tailored to client needs',
        'Created and maintained the company website: www.arquimediastudios.com, enhancing the company\'s online presence and functionality',
        'Fostered a collaborative team environment, driving innovation and efficiency in product development',
        'Managed Public Cloud Services (GCP) to ensure reliable and scalable infrastructure',
        'Led the team in implementing designs using the latest web development technologies',
      ],
    },
    {
      position: 'General Manager Administration',
      description: 'Startup Owner. Designed and implemented a scalable and high-performance tech network to quickly get the business operational. Led a team, gaining valuable experience in business administration, management, and strategic planning.',
      achievements: [
        'Designed and implemented a scalable and high-performance tech network to quickly get the business operational',
        'Led a team, gaining valuable experience in business administration, management, and strategic planning',
        'Fostered a collaborative and innovative work environment to drive business growth and success',
        'Successfully managed startup operations and business development',
      ],
    },
    {
      position: 'System Analyst',
      description: 'Collaborated on the non-bank correspondents project for Casa Propia E.A.P., focusing on the presentation layers and middleware applications using Crosswalk language. Implemented a document management tool using web technologies.',
      achievements: [
        'Collaborated on the non-bank correspondents project for Casa Propia E.A.P., focusing on the presentation layers and middleware applications using Crosswalk language',
        'Implemented a document management tool using web technologies',
        'Developed a tool for managing working hours for Sipeca',
        'Contributed to system analysis and development processes',
      ],
    },
    {
      position: 'System Analyst',
      description: 'Developed a Visual Basic-based system for ordering menus in a restaurant, enhancing efficiency and customer experience. Participated in a system testing team, focusing on exception routines, error routines, parameter handling, validations, valid values, limit values, ranges, and possible messages.',
      achievements: [
        'Developed a Visual Basic-based system for ordering menus in a restaurant, enhancing efficiency and customer experience',
        'Participated in a system testing team, focusing on exception routines, error routines, parameter handling, validations, valid values, limit values, ranges, and possible messages',
        'Created proposals and implemented data networks and their electronic peripherals, ensuring robust and reliable communication infrastructure',
        'Contributed to system analysis and development processes',
      ],
    },
    {
      position: 'System Analyst',
      description: 'Designed and developed a Visual Basic-based system to control the weight of chemicals in custom formulas, integrating both software and hardware components. The application, which is currently in use, ensures precise measurements and enhances the efficiency and accuracy of chemical formulations.',
      achievements: [
        'Designed and developed a Visual Basic-based system to control the weight of chemicals in custom formulas, integrating both software and hardware components',
        'The application, which is currently in use, ensures precise measurements and enhances the efficiency and accuracy of chemical formulations',
        'Managed the entire project lifecycle from conception to implementation, including hardware design and system integration',
        'Successfully integrated software and hardware components for process control',
      ],
    },
    {
      position: 'Internship',
      description: 'During my Computer Engineering degree, I completed internships at CANTV in the Lara Transmissions department. Gained extensive knowledge of telecommunications and data transmission systems.',
      achievements: [
        'Gained extensive knowledge of telecommunications and data transmission systems',
        'Designed a device to detect communication failures between transmission radios, utilizing logic gates and multiple connectors',
        'Developed practical skills in diagnosing and troubleshooting transmission issues, contributing to improved communication reliability',
        'Completed Computer Engineering internship requirements successfully',
      ],
    },
    {
      position: 'System Analyst',
      description: 'Designed and developed a Visual Basic-based system for controlling and printing labels for tire storage, integrating both software and hardware components. The system improves inventory management and ensures accurate labeling and tracking of tire storage.',
      achievements: [
        'Designed and developed a Visual Basic-based system for controlling and printing labels for tire storage, integrating both software and hardware components',
        'The system improves inventory management and ensures accurate labeling and tracking of tire storage',
        'Managed the project from concept to deployment, including the design and integration of necessary hardware elements to support the labeling system',
        'Successfully implemented inventory management solution for industrial application',
      ],
    },
  ],
  es: [
    {
      position: 'Desarrollador Full-Stack Senior | Desarrollo Aumentado con IA | Plataforma de Seguros Nativa en la Nube',
      description: 'Aprovechando la IA Agéntica para la Entrega de Software de Alto Rendimiento. Actualmente trabajando en una plataforma nativa en la nube para aseguradoras P&C, integrando IA Agéntica en el flujo de trabajo de desarrollo. Planifico tareas con agentes de IA y he personalizado reglas en Cursor IDE para alinear las salidas de IA con los estándares del proyecto. Liderando dos iniciativas principales: migrar el sistema a Python 3 e introducir una nueva característica significativa para expandir las capacidades de la plataforma.',
      achievements: [
        'Desarrollando APIs escalables y características backend usando Python, mientras también construyo UIs intuitivas con Vue.js',
        'Asegurando integración perfecta de componentes frontend y backend, y manteniendo alta calidad de código a través de pruebas unitarias e integración comprehensivas',
        'Mejorando y gestionando entornos Docker para desarrollo local eficiente',
        'Contribuyendo a procesos CI/CD y automatizando tareas para mayor productividad',
        'Activo en ceremonias ágiles, participando en planificación, conduciendo revisiones de código y proporcionando mentoría',
        'Colaborando con equipos multifuncionales en desarrollo e integración de características',
        'Solucionando y depurando problemas complejos',
        'Asegurando consistencia de desarrollo a través de scripting y automatización',
        'Mejorando la eficiencia del desarrollador a través de herramientas asistidas por IA y automatización de procesos',
        'Expandiendo capacidades de ingeniería de IA a través de los programas IBM Generative AI Engineering y AI Engineering Specialization en Coursera',
      ],
    },
    {
      position: 'Desarrollador Web',
      description: 'Contribuyente clave al proceso de desarrollo rápido de productos de la startup. Como ingeniero de software, lideré el equipo en la implementación de diseños usando las últimas tecnologías de desarrollo web. Gestioné Servicios de Nube Pública (GCP) para asegurar infraestructura confiable y escalable.',
      achievements: [
        'Desarrollé soluciones de plantillas WordPress personalizadas adaptadas a las necesidades del cliente',
        'Creé y mantuve el sitio web de la empresa: www.arquimediastudios.com, mejorando la presencia y funcionalidad online de la empresa',
        'Fomenté un ambiente de equipo colaborativo, impulsando innovación y eficiencia en el desarrollo de productos',
        'Gestioné Servicios de Nube Pública (GCP) para asegurar infraestructura confiable y escalable',
        'Lideré el equipo en la implementación de diseños usando las últimas tecnologías de desarrollo web',
      ],
    },
    {
      position: 'Gerente General de Administración',
      description: 'Propietario de Startup. Diseñé e implementé una red tecnológica escalable y de alto rendimiento para poner rápidamente el negocio en operación. Lideré un equipo, ganando valiosa experiencia en administración de negocios, gestión y planificación estratégica.',
      achievements: [
        'Diseñé e implementé una red tecnológica escalable y de alto rendimiento para poner rápidamente el negocio en operación',
        'Lideré un equipo, ganando valiosa experiencia en administración de negocios, gestión y planificación estratégica',
        'Fomenté un ambiente de trabajo colaborativo e innovador para impulsar el crecimiento y éxito del negocio',
        'Gestioné exitosamente operaciones de startup y desarrollo de negocios',
      ],
    },
    {
      position: 'Analista de Sistemas',
      description: 'Colaboré en el proyecto de corresponsales no bancarios para Casa Propia E.A.P., enfocándome en las capas de presentación y aplicaciones middleware usando lenguaje Crosswalk. Implementé una herramienta de gestión de documentos usando tecnologías web.',
      achievements: [
        'Colaboré en el proyecto de corresponsales no bancarios para Casa Propia E.A.P., enfocándome en las capas de presentación y aplicaciones middleware usando lenguaje Crosswalk',
        'Implementé una herramienta de gestión de documentos usando tecnologías web',
        'Desarrollé una herramienta para gestionar horas de trabajo para Sipeca',
        'Contribuí a procesos de análisis y desarrollo de sistemas',
      ],
    },
    {
      position: 'Analista de Sistemas',
      description: 'Desarrollé un sistema basado en Visual Basic para ordenar menús en un restaurante, mejorando la eficiencia y experiencia del cliente. Participé en un equipo de pruebas de sistemas, enfocándome en rutinas de excepción, rutinas de error, manejo de parámetros, validaciones, valores válidos, valores límite, rangos y posibles mensajes.',
      achievements: [
        'Desarrollé un sistema basado en Visual Basic para ordenar menús en un restaurante, mejorando la eficiencia y experiencia del cliente',
        'Participé en un equipo de pruebas de sistemas, enfocándome en rutinas de excepción, rutinas de error, manejo de parámetros, validaciones, valores válidos, valores límite, rangos y posibles mensajes',
        'Creé propuestas e implementé redes de datos y sus periféricos electrónicos, asegurando infraestructura de comunicación robusta y confiable',
        'Contribuí a procesos de análisis y desarrollo de sistemas',
      ],
    },
    {
      position: 'Analista de Sistemas',
      description: 'Diseñé y desarrollé un sistema basado en Visual Basic para controlar el peso de químicos en fórmulas personalizadas, integrando componentes de software y hardware. La aplicación, que actualmente está en uso, asegura mediciones precisas y mejora la eficiencia y precisión de formulaciones químicas.',
      achievements: [
        'Diseñé y desarrollé un sistema basado en Visual Basic para controlar el peso de químicos en fórmulas personalizadas, integrando componentes de software y hardware',
        'La aplicación, que actualmente está en uso, asegura mediciones precisas y mejora la eficiencia y precisión de formulaciones químicas',
        'Gestioné todo el ciclo de vida del proyecto desde la concepción hasta la implementación, incluyendo diseño de hardware e integración de sistemas',
        'Integré exitosamente componentes de software y hardware para control de procesos',
      ],
    },
    {
      position: 'Pasantía',
      description: 'Durante mi grado de Ingeniería en Computación, completé pasantías en CANTV en el departamento de Transmisiones Lara. Obtuve conocimiento extensivo de sistemas de telecomunicaciones y transmisión de datos.',
      achievements: [
        'Obtuve conocimiento extensivo de sistemas de telecomunicaciones y transmisión de datos',
        'Diseñé un dispositivo para detectar fallas de comunicación entre radios de transmisión, utilizando compuertas lógicas y múltiples conectores',
        'Desarrollé habilidades prácticas en diagnóstico y solución de problemas de transmisión, contribuyendo a mejorar la confiabilidad de la comunicación',
        'Completé exitosamente los requisitos de pasantía de Ingeniería en Computación',
      ],
    },
    {
      position: 'Analista de Sistemas',
      description: 'Diseñé y desarrollé un sistema basado en Visual Basic para controlar e imprimir etiquetas para almacenamiento de neumáticos, integrando componentes de software y hardware. El sistema mejora la gestión de inventario y asegura etiquetado y seguimiento preciso del almacenamiento de neumáticos.',
      achievements: [
        'Diseñé y desarrollé un sistema basado en Visual Basic para controlar e imprimir etiquetas para almacenamiento de neumáticos, integrando componentes de software y hardware',
        'El sistema mejora la gestión de inventario y asegura etiquetado y seguimiento preciso del almacenamiento de neumáticos',
        'Gestioné el proyecto desde el concepto hasta el despliegue, incluyendo el diseño e integración de elementos de hardware necesarios para soportar el sistema de etiquetado',
        'Implementé exitosamente solución de gestión de inventario para aplicación industrial',
      ],
    },
  ],
}
