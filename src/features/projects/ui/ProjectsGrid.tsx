import ProjectCard from './ProjectCard';
import Reveal from '@shared/ui/Reveal';
import type { ProjectItem } from '@app';

interface ProjectsGridProps {
  items: ProjectItem[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items }) => {
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
          {items.map((project, index) => (
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
