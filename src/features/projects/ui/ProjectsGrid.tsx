import { useTrail, animated } from '@react-spring/web';
import ProjectCard from './ProjectCard';
import Reveal from '@shared/ui/Reveal';
import SectionTitleWithShortcut from '@shared/ui/SectionTitleWithShortcut';
import ActionButton from '@shared/ui/ActionButton';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const ProjectsGrid: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'alarm.sh',
      description: 'Una herramienta integral de gestión de alarmas para la línea de comandos (Linux) que permite crear alarmas instantáneas, programar alarmas recurrentes y configurar temporizadores relativos. Todas las alarmas muestran notificaciones de escritorio y reproducen alertas de sonido.',
      technologies: ['Bash', 'Linux', 'Scripts de Shell', 'Tareas Cron', 'Notificaciones de Escritorio'],
      githubUrl: 'https://github.com/FrancoCastro1990/alarm.sh',
    },
    {
      id: 2,
      title: 'CLI-front.sh',
      description: 'Una herramienta CLI para construir diferentes tipos de componentes para proyectos React. Podemos crear componentes, hooks personalizados, contextos, etc. Crea automáticamente el archivo TSX junto con sus pruebas.',
      technologies: ['Node.js', 'CLI', 'React', 'TypeScript','Generación de Plantillas'],
      githubUrl: 'https://github.com/FrancoCastro1990/CLI-front',
    },
    {
      id: 3,
      title: 'Sitio Web Portafolio',
      description: 'Mi sitio web personal construido con Astro y React, con animaciones Canvas personalizadas, diseño responsivo y optimizaciones de rendimiento. Implementa principios de Arquitectura Limpia y mejores prácticas de desarrollo.',
      technologies: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'React Spring'],
      githubUrl: 'https://github.com/FrancoCastro1990/landing.git',
      liveUrl: 'https://fcastro.dev',
    }
  ];

  const trail = useTrail(projects.length, {
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 60 },
    delay: 200,
  });

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16">
            <SectionTitleWithShortcut shortcut="P">Proyectos Destacados</SectionTitleWithShortcut>
            <p className="text-lightTheme-yellow dark:text-darkTheme-yellow max-w-2xl mx-auto mb-6">
              Algunos de mis proyectos destacados que demuestran mi experiencia en desarrollo de herramientas CLI, 
              automatización de sistemas y aplicaciones web modernas.
            </p>
            <div className="w-20 h-1 bg-lightTheme-green dark:bg-darkTheme-green mx-auto"></div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trail.map((style, index) => (
            <Reveal key={projects[index].id} delay={index * 100}>
              <animated.div style={style} className="h-full">
                <ProjectCard
                  title={projects[index].title}
                  description={projects[index].description}
                  technologies={projects[index].technologies}
                  githubUrl={projects[index].githubUrl}
                  liveUrl={projects[index].liveUrl}
                  imageUrl={projects[index].imageUrl}
                  delay={index * 100}
                />
              </animated.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600}>
          <div className="text-center mt-12">
            <p className="text-lightTheme-yellow dark:text-darkTheme-yellow mb-6">
              ¿Quieres ver más? Revisa mi GitHub para proyectos adicionales y contribuciones de código abierto.
            </p>
            <ActionButton
              href="https://github.com/FrancoCastro1990"
              ariaLabel="Ver más proyectos en GitHub"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              }
            >
              Ver Más en GitHub
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectsGrid;