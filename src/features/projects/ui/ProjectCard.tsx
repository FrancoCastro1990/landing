import Badge from '@shared/ui/Badge';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  reverse?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  reverse = false,
}) => {
  return (
    <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className={`lg:col-span-4 ${reverse ? 'lg:order-1' : 'lg:order-2'} pt-4`}>
        <p className="font-label uppercase tracking-widest text-[10px] text-primary mb-2">
          Proyecto
        </p>
        <h3 className="font-headline italic text-4xl md:text-5xl text-on-surface mb-6">
          {title}
        </h3>
        <p className="font-body text-on-surface-variant leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-8">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-4"
              aria-label={`Ver codigo de ${title}`}
            >
              <span className="font-label uppercase tracking-widest text-xs border-b border-primary/20 group-hover/link:border-primary pb-1 transition-colors text-on-surface-variant group-hover/link:text-on-surface">
                GitHub
              </span>
              <svg
                className="w-5 h-5 text-primary group-hover/link:translate-x-2 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-4"
              aria-label={`Ver demo de ${title}`}
            >
              <span className="font-label uppercase tracking-widest text-xs border-b border-primary/20 group-hover/link:border-primary pb-1 transition-colors text-primary">
                Live
              </span>
              <svg
                className="w-5 h-5 text-primary group-hover/link:translate-x-2 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className={`lg:col-span-8 ${reverse ? 'lg:order-2' : 'lg:order-1'} overflow-hidden bg-surface-low`}>
        <div className="w-full aspect-video flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-700">
          <span className="font-headline italic text-8xl text-outline-variant/20 select-none">
            {title.charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
