import { useSpring, animated } from '@react-spring/web';
import Reveal from '@shared/ui/Reveal';
import SectionTitleWithShortcut from '@shared/ui/SectionTitleWithShortcut';
import ActionButton from '@shared/ui/ActionButton';
import ExperienceBasic from './ExperienceBasic';
import ExperienceAdvanced from './ExperienceAdvanced';
import { useExperienceViewMode } from '../hooks';

interface Experience {
  id: number;
  timestamp: string;
  position: string;
  company: string;
  period: string;
  location: string;
  commitMessage: string;
  highlights: string[];
  skills: string[];
}

const Experience: React.FC = () => {
  const { viewMode, isBasic } = useExperienceViewMode();

  const experiences: Experience[] = [
    {
      id: 1,
      timestamp: "2024-01-15 09:00:00",
      position: "Desarrollador Full Stack",
      company: "Isapre Esencial",
      period: "Ene 2024 – Presente (1 año 8 meses)",
      location: "Chile (Remoto)",
      commitMessage: "feat: implementar arquitectura limpia y programa de mentorías",
      highlights: [
        "Frontend: Refactorizé código legacy, creé constructor de formularios dinámicos, implementé arquitectura limpia",
        "Backend: Implementé Arquitectura Limpia y principios SOLID, creé plantillas de estandarización",
        "Mentorías: Realicé charlas internas sobre testing, hooks personalizados, principios SOLID y mejores prácticas de React",
        "Herramientas Personalizadas: Desarrollé decorador para seguimiento simple de flujos"
      ],
      skills: ["Principios SOLID", "Arquitectura Limpia", "React", "TypeScript", "Pruebas Automatizadas", "Revisión de Código"]
    },
    {
      id: 2,
      timestamp: "2023-02-10 08:30:00",
      position: "Desarrollador Full Stack",
      company: "Babel",
      period: "Feb 2023 – Ene 2024 (1 año)",
      location: "Chile (Remoto)",
      commitMessage: "feat: implementar soluciones de consultoría empresarial",
      highlights: [
        "Trabajé como consultor para Isapre Esencial",
        "Implementé soluciones de nivel empresarial con patrones de arquitectura modernos"
      ],
      skills: ["TypeScript", "React.js", "Principios SOLID", "Revisión de Código", "Pruebas Automatizadas", "Patrones de Diseño"]
    },
    {
      id: 3,
      timestamp: "2022-09-15 10:15:00",
      position: "Desarrollador Front-End",
      company: "Mediastream",
      period: "Sep 2022 – Dic 2022 (4 meses)",
      location: "Chile",
      commitMessage: "perf: reducir tiempo de carga de landing de 9s a 2s",
      highlights: [
        "Creé sistema de carga perezosa para componentes basado en visibilidad del viewport",
        "Reduje el tiempo de carga de la landing de 9 segundos a 2 segundos (78% de mejora)",
        "Implementé estrategias de optimización de rendimiento"
      ],
      skills: ["Principios SOLID", "React.js", "Optimización de Rendimiento", "Control de Versiones", "Pruebas Automatizadas"]
    },
    {
      id: 4,
      timestamp: "2020-11-20 14:45:00",
      position: "Desarrollador Fullstack",
      company: "Peanut Hub",
      period: "Nov 2020 – Sep 2022 (1 año 11 meses)",
      location: "Remoto",
      commitMessage: "feat: construir flujos configurables y componentes personalizados",
      highlights: [
        "Cliente: Crediautos.cl - Único desarrollador front-end",
        "Construí flujos configurables para simulación y contratación",
        "Desarrollé componentes personalizados para integración con WordPress",
        "Páginas desarrolladas en React + TypeScript"
      ],
      skills: ["Principios SOLID", "React.js", "TypeScript", "WordPress", "Control de Versiones", "Pruebas Automatizadas"]
    },
    {
      id: 5,
      timestamp: "2019-06-01 11:30:00",
      position: "Desarrollador Front-End",
      company: "WoorKit",
      period: "Jun 2019 – Dic 2019 (7 meses)",
      location: "Remoto",
      commitMessage: "feat: desarrollar plataforma de búsqueda de empleos con Angular + NestJS",
      highlights: [
        "Desarrollé plataforma de búsqueda de empleos con pruebas psicológicas",
        "Implementé sistema de perfiles de usuario y empresa",
        "Construí solución full-stack con frontend Angular y backend NestJS"
      ],
      skills: ["Angular", "NestJS", "TypeScript", "Desarrollo Web", "Desarrollo Full-Stack"]
    }
  ];

  // Animation for mode switching
  const modeSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 60 },
    key: viewMode, // Re-trigger animation when mode changes
  });

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16">
            <SectionTitleWithShortcut shortcut="E">Experiencia Profesional</SectionTitleWithShortcut>
            <div className="w-20 h-1 bg-lightTheme-green dark:bg-darkTheme-green mx-auto mb-4"></div>
            <div className="space-y-2">
              <p className="text-lightTheme-yellow dark:text-darkTheme-yellow max-w-2xl mx-auto">
                6+ años de experiencia en desarrollo profesional en diversas industrias
              </p>
              
              {/* Mode indicator */}
              <div className="flex items-center justify-center space-x-2 text-lightTheme-text/40 dark:text-darkTheme-text/40 font-mono text-xs">
                <span>Modo de vista:</span>
                <span className="text-lightTheme-green dark:text-darkTheme-green">
                  {isBasic ? 'Básico' : 'Avanzado'}
                </span>
                <span>•</span>
                <span>Presiona</span>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('toggleExperienceViewMode'))}
                  className="px-1 py-0.5 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 text-lightTheme-green/60 dark:text-darkTheme-green/60 border border-lightTheme-text/10 dark:border-darkTheme-text/10 rounded text-xs hover:bg-lightTheme-green/10 dark:hover:bg-darkTheme-green/10 hover:text-lightTheme-green dark:hover:text-darkTheme-green transition-colors duration-200 cursor-pointer"
                  aria-label="Cambiar modo de vista de experiencia"
                >
                  Ctrl+Alt+`
                </button>
                <span>para alternar</span>
              </div>
            </div>
          </div>
        </Reveal>

        <animated.div style={modeSpring}>
          {isBasic ? (
            <ExperienceBasic experiences={experiences} />
          ) : (
            <ExperienceAdvanced experiences={experiences} />
          )}
        </animated.div>

        <Reveal delay={1000}>
          <div className="text-center mt-12">
            <ActionButton
              href="https://www.linkedin.com/in/franco-castro-villanueva-035905174/"
              ariaLabel="Ver perfil de LinkedIn"
              icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              }
            >
              $ open linkedin_profile
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;