import React from 'react';
import Reveal from '@shared/ui/Reveal';
import Card from '@shared/ui/Card';
import Badge from '@shared/ui/Badge';

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

interface ExperienceBasicProps {
  experiences: Experience[];
}

const ExperienceBasic: React.FC<ExperienceBasicProps> = ({ experiences }) => {
  return (
    <Reveal delay={200}>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            {/* Connection line (except for last item) */}
            {index < experiences.length - 1 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-8 bg-lightTheme-green/40 dark:bg-darkTheme-green/40"></div>
            )}
            
            <Card variant="terminal">
              <div className="p-4">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-lg font-bold text-lightTheme-green dark:text-darkTheme-green font-mono">
                          {exp.position}
                        </h3>
                        <div className="text-lightTheme-yellow dark:text-darkTheme-yellow text-sm font-mono">
                          {exp.period}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <span className="text-lightTheme-blue dark:text-darkTheme-blue font-semibold font-mono">
                          @ {exp.company}
                        </span>
                        <span className="text-lightTheme-text/60 dark:text-darkTheme-text/60 text-sm">
                          • {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <h4 className="text-lightTheme-text dark:text-darkTheme-text font-mono text-sm mb-3 flex items-center">
                        <span className="text-lightTheme-green dark:text-darkTheme-green mr-2">├─</span>
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-lightTheme-text/90 dark:text-darkTheme-text/90 text-sm flex items-start">
                            <span className="text-lightTheme-green dark:text-darkTheme-green mr-3 mt-1 text-xs">
                              {idx === exp.highlights.length - 1 ? '└─' : '├─'}
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lightTheme-text dark:text-darkTheme-text font-mono text-sm mb-3 flex items-center">
                        <span className="text-lightTheme-green dark:text-darkTheme-green mr-2">└─</span>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
            </div>
          ))}
        </div>
    </Reveal>
  );
};

export default ExperienceBasic;