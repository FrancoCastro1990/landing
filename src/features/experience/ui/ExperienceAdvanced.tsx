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

interface ExperienceAdvancedProps {
  experiences: Experience[];
}

const ExperienceAdvanced: React.FC<ExperienceAdvancedProps> = ({ experiences }) => {
  return (
    <Reveal delay={200}>
      <Card variant="terminal" showHeader={true}>
        {/* Terminal Content */}
        <div className="space-y-1">
          {/* Git Log Header */}
          <div className="mb-4">
            <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
            <span className="text-lightTheme-text dark:text-darkTheme-text ml-2">git log --oneline --graph</span>
          </div>

          {/* Experience Git Log */}
          {experiences.map((exp, index) => (
            <div key={exp.id} className="space-y-3">
              {/* Git Commit Entry */}
              <div className="border-l-2 border-lightTheme-green/30 dark:border-darkTheme-green/30 pl-4 space-y-3">
                {/* Commit Hash and Author */}
                <div className="text-lightTheme-yellow dark:text-darkTheme-yellow font-mono text-sm">
                  <span>commit </span>
                  <span className="text-lightTheme-green dark:text-darkTheme-green">
                    {exp.id.toString().padStart(7, '0')}abc
                  </span>
                  <span className="text-lightTheme-text/60 dark:text-darkTheme-text/60"> (HEAD -&gt; career)</span>
                </div>
                
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-lightTheme-blue dark:text-darkTheme-blue">Author: </span>
                    <span className="text-lightTheme-text dark:text-darkTheme-text">Franco Castro &lt;franco@{exp.company.toLowerCase().replace(/\s+/g, '')}&gt;</span>
                  </div>
                  <div>
                    <span className="text-lightTheme-blue dark:text-darkTheme-blue">Date: </span>
                    <span className="text-lightTheme-text dark:text-darkTheme-text">{exp.timestamp}</span>
                  </div>
                </div>

                {/* Commit Message */}
                <div className="border-t border-lightTheme-text/10 dark:border-darkTheme-text/10 pt-3">
                  <div className="text-lightTheme-text dark:text-darkTheme-text font-mono text-sm mb-3">
                    {exp.commitMessage}
                  </div>
                  
                  {/* Job Details */}
                  <div className="bg-lightTheme-text/5 dark:bg-darkTheme-text/5 p-3 rounded border border-lightTheme-text/10 dark:border-darkTheme-text/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lightTheme-green dark:text-darkTheme-green font-bold">
                        {exp.position}
                      </span>
                      <span className="text-lightTheme-text/60 dark:text-darkTheme-text/60">@</span>
                      <span className="text-lightTheme-blue dark:text-darkTheme-blue font-semibold">
                        {exp.company}
                      </span>
                    </div>
                    
                    <div className="text-lightTheme-yellow dark:text-darkTheme-yellow text-sm">
                      {exp.period} • {exp.location}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-3">
                    <div className="text-lightTheme-green dark:text-darkTheme-green text-sm font-mono mb-2">
                      Changes made:
                    </div>
                    <ul className="space-y-1 text-sm">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-lightTheme-text dark:text-darkTheme-text flex items-start">
                          <span className="text-lightTheme-green dark:text-darkTheme-green mr-2 mt-1">+</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="mt-3">
                    <div className="text-lightTheme-green dark:text-darkTheme-green text-sm font-mono mb-2">
                      Technologies used:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <Badge key={idx} size="sm" variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Reveal>
  );
};

export default ExperienceAdvanced;