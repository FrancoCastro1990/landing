import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Franco Castro',
    brandName: 'FRANCO_CASTRO',
    email: 'franco.castro.villanueva.90@gmail.com',
    title: 'Desarrollador Full Stack',
    siteUrl: 'https://fcastro.dev',
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/FrancoCastro1990' },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/franco-castro-villanueva-035905174/',
      },
    ],
  },

  hero: {
    headline: [
      { text: 'Full Stack' },
      { text: 'Developer', accent: true },
      { text: '& Mentor.' },
    ],
    label: 'Portafolio Personal // 2026',
    bio: 'Construyo software que escala con precision y arquitectura limpia. 6+ anos creando experiencias web excepcionales con React, TypeScript y principios SOLID.',
  },

  about: {
    sectionTitle: [
      { text: 'Construyo con' },
      { text: 'precision', accent: true },
      { text: 'y arquitectura.' },
    ],
    bio: [
      'Desarrollador Full Stack con mas de 6 anos de experiencia, actualmente en Isapre Esencial. Mi enfoque abarca React, TypeScript y Node.js, implementando principios de Arquitectura Limpia en aplicaciones del mundo real.',
      'Especializado en mentorar equipos a traves de charlas internas sobre testing, principios SOLID y mejores practicas. Experiencia en optimizacion de rendimiento, refactorizacion de legacy y automatizacion con herramientas de IA.',
    ],
    stats: [
      { value: 6, suffix: '+', label: 'Anos exp.', accentValue: true },
      { value: 5, suffix: '', label: 'Empresas' },
      {
        value: 78,
        suffix: '%',
        label: 'Mejora rendimiento (9s a 2s)',
        accentValue: true,
        colSpan: 2,
      },
    ],
    skills: [
      'SOLID',
      'Clean Architecture',
      'Design Patterns',
      'React.js',
      'Next.js',
      'TypeScript',
      'Angular',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'REST APIs',
      'Unit Testing',
      'E2E Playwright',
      'Git',
      'Linux',
      'GitHub Copilot',
      'Claude Code',
    ],
  },

  experience: {
    items: [
      {
        year: '2024',
        position: 'Desarrollador Full Stack',
        company: 'Isapre Esencial',
        period: 'Ene 2024 — Presente',
        highlights: [
          'Refactorice codigo legacy e implemente arquitectura limpia',
          'Cree constructor de formularios dinamicos',
          'Realize charlas internas sobre testing, hooks y SOLID',
          'Desarrolle decorador para seguimiento de flujos',
        ],
        skills: ['SOLID', 'Clean Architecture', 'React', 'TypeScript', 'Testing'],
      },
      {
        year: '2023',
        position: 'Desarrollador Full Stack',
        company: 'Babel',
        period: 'Feb 2023 — Ene 2024',
        highlights: [
          'Consultor para Isapre Esencial',
          'Implemente soluciones enterprise con patrones modernos',
        ],
        skills: ['TypeScript', 'React.js', 'SOLID', 'Design Patterns'],
      },
      {
        year: '2022',
        position: 'Desarrollador Front-End',
        company: 'Mediastream',
        period: 'Sep 2022 — Dic 2022',
        highlights: [
          'Reduje tiempo de carga de 9s a 2s (78% mejora)',
          'Cree sistema de lazy loading basado en viewport',
        ],
        skills: ['React.js', 'Performance', 'Lazy Loading'],
      },
      {
        year: '2020',
        position: 'Desarrollador Fullstack',
        company: 'Peanut Hub',
        period: 'Nov 2020 — Sep 2022',
        highlights: [
          'Unico dev front-end para Crediautos.cl',
          'Construi flujos configurables para simulacion y contratacion',
        ],
        skills: ['React.js', 'TypeScript', 'WordPress'],
      },
      {
        year: '2019',
        position: 'Desarrollador Front-End',
        company: 'WoorKit',
        period: 'Jun 2019 — Dic 2019',
        highlights: [
          'Desarrolle plataforma de busqueda de empleos',
          'Solucion full-stack con Angular y NestJS',
        ],
        skills: ['Angular', 'NestJS', 'TypeScript'],
      },
    ],
  },

  projects: {
    items: [
      {
        title: 'alarm.sh',
        description:
          'Herramienta integral de gestion de alarmas para linea de comandos Linux. Alarmas instantaneas, recurrentes y temporizadores con notificaciones de escritorio y alertas de sonido.',
        technologies: ['Bash', 'Linux', 'Shell', 'Cron'],
        githubUrl: 'https://github.com/FrancoCastro1990/alarm.sh',
      },
      {
        title: 'CLI-front.sh',
        description:
          'CLI para construir componentes React automaticamente. Genera archivos TSX, hooks, contextos y sus pruebas correspondientes.',
        technologies: ['Node.js', 'CLI', 'React', 'TypeScript'],
        githubUrl: 'https://github.com/FrancoCastro1990/CLI-front',
      },
      {
        title: 'Portafolio',
        description:
          'Sitio web personal con Astro y React. Micro-animaciones, diseno responsivo y optimizaciones de rendimiento con Arquitectura Limpia.',
        technologies: ['Astro', 'React', 'TypeScript', 'Tailwind'],
        githubUrl: 'https://github.com/FrancoCastro1990/landing.git',
        liveUrl: 'https://fcastro.dev',
      },
    ],
  },

  contact: {
    headline: [
      { text: 'Construyamos algo' },
      { text: 'permanente.', accent: true },
    ],
  },

  navigation: {
    items: [
      { label: 'ACERCA', sectionId: 'about' },
      { label: 'EXPERIENCIA', sectionId: 'experience' },
      { label: 'PROYECTOS', sectionId: 'projects' },
      { label: 'CONTACTO', sectionId: 'contact' },
    ],
  },

  seo: {
    title: 'Franco Castro — Desarrollador Full Stack',
    description:
      'Franco Castro — Desarrollador Full Stack con 6+ anos de experiencia en React, TypeScript y Arquitectura Limpia.',
    ogTitle: 'Franco Castro — Desarrollador Full Stack',
    ogDescription:
      'Desarrollador Full Stack con 6+ anos de experiencia. Especializado en React, TypeScript, Arquitectura Limpia y mentorias de equipo.',
    ogImage: 'https://fcastro.dev/og-image.png',
  },
};
