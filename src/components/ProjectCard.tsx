import SubTitle from './SubTitle';
import Badge from './Badge';
import Button from './Button';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageUrl,
  delay = 0,
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-lightTheme-bg dark:bg-darkTheme-bg border border-lightTheme-text/20 dark:border-darkTheme-text/20 shadow-lg h-full flex flex-col"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 border-b border-lightTheme-text/10 dark:border-darkTheme-text/10 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-lightTheme-red dark:bg-darkTheme-red"></div>
          <div className="w-3 h-3 rounded-full bg-lightTheme-yellow dark:bg-darkTheme-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-lightTheme-green dark:bg-darkTheme-green"></div>
        </div>
        <div className="ml-2 text-xs font-mono text-lightTheme-text/60 dark:text-darkTheme-text/60">
          project-{title.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col font-mono">
        {/* Project Image/Icon */}
        <div className="mb-4 h-32 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 rounded border border-lightTheme-text/10 dark:border-darkTheme-text/10 flex items-center justify-center flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="text-lightTheme-green dark:text-darkTheme-green text-4xl">
              {'</>'}
            </div>
          )}
        </div>

        {/* Project Title */}
        <div className="mb-3 flex-shrink-0">
          <span className="text-lightTheme-green dark:text-darkTheme-green">$ </span>
          <span className="text-lightTheme-text dark:text-darkTheme-text font-bold">{title}</span>
        </div>

        {/* Project Description */}
        <div className="text-lightTheme-text dark:text-darkTheme-text text-sm leading-relaxed mb-4 flex-grow">
          <span className="text-lightTheme-blue dark:text-darkTheme-blue"># </span>
          {description}
        </div>

        {/* Technologies */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={tech} size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Links */}
        <div className="flex gap-3 mt-auto flex-shrink-0">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green text-sm px-3 py-2 rounded border border-lightTheme-green/30 dark:border-darkTheme-green/30"
              aria-label={`View ${title} source code`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-lightTheme-green text-lightTheme-bg dark:bg-darkTheme-green dark:text-darkTheme-bg text-sm px-3 py-2 rounded font-semibold"
              aria-label={`View ${title} live demo`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
              </svg>
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;