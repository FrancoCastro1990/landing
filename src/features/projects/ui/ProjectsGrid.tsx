import ProjectCard from './ProjectCard';
import Reveal from '@shared/ui/Reveal';

const ProjectsGrid: React.FC = () => {
  const projects = [
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
  ];

  return (
    <section id="projects" className="py-32 px-8 lg:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-24 flex justify-between items-baseline">
            <p className="font-label uppercase tracking-[0.3rem] text-sm text-on-surface-variant">
              Proyectos Destacados
            </p>
            <span className="font-headline italic text-2xl text-primary">
              03
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-40">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 150}>
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                reverse={index % 2 !== 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
