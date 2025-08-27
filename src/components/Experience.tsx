import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import Card from './Card';
import Badge from './Badge';

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

  const experiences: Experience[] = [
    {
      id: 1,
      timestamp: "2024-01-15 09:00:00",
      position: "Full Stack Developer",
      company: "Isapre Esencial",
      period: "Jan 2024 – Present (1 yr 8 mos)",
      location: "Chile (Remote)",
      commitMessage: "feat: implement clean architecture and mentorship program",
      highlights: [
        "Frontend: Refactored legacy code, created dynamic form builder, implemented clean architecture",
        "Backend: Implemented Clean Architecture and SOLID principles, created standardization templates",
        "Mentorship: Delivered internal talks on testing, custom hooks, SOLID principles, and React best practices",
        "Custom Tools: Developed decorator for simple flow tracking"
      ],
      skills: ["SOLID Principles", "Clean Architecture", "React", "TypeScript", "Automated Testing", "Code Review"]
    },
    {
      id: 2,
      timestamp: "2023-02-10 08:30:00",
      position: "Full Stack Developer",
      company: "Babel",
      period: "Feb 2023 – Jan 2024 (1 yr)",
      location: "Chile (Remote)",
      commitMessage: "feat: implement enterprise consulting solutions",
      highlights: [
        "Worked as consultant for Isapre Esencial",
        "Implemented enterprise-level solutions with modern architecture patterns"
      ],
      skills: ["TypeScript", "React.js", "SOLID Principles", "Code Review", "Automated Testing", "Design Patterns"]
    },
    {
      id: 3,
      timestamp: "2022-09-15 10:15:00",
      position: "Front-End Developer",
      company: "Mediastream",
      period: "Sep 2022 – Dec 2022 (4 mos)",
      location: "Chile",
      commitMessage: "perf: reduce landing page load time from 9s to 2s",
      highlights: [
        "Created lazy loading system for components based on viewport visibility",
        "Reduced landing page load time from 9 seconds to 2 seconds (78% improvement)",
        "Implemented performance optimization strategies"
      ],
      skills: ["SOLID Principles", "React.js", "Performance Optimization", "Version Control", "Automated Testing"]
    },
    {
      id: 4,
      timestamp: "2020-11-20 14:45:00",
      position: "Fullstack Developer",
      company: "Peanut Hub",
      period: "Nov 2020 – Sep 2022 (1 yr 11 mos)",
      location: "Remote",
      commitMessage: "feat: build configurable flows and custom components",
      highlights: [
        "Client: Crediautos.cl - Sole front-end developer",
        "Built configurable flows for simulation and contracting",
        "Developed custom components for WordPress integration",
        "Pages developed in React + TypeScript"
      ],
      skills: ["SOLID Principles", "React.js", "TypeScript", "WordPress", "Version Control", "Automated Testing"]
    },
    {
      id: 5,
      timestamp: "2019-06-01 11:30:00",
      position: "Front-End Developer",
      company: "WoorKit",
      period: "Jun 2019 – Dec 2019 (7 mos)",
      location: "Remote",
      commitMessage: "feat: develop job-search platform with Angular + NestJS",
      highlights: [
        "Developed job-search platform with psychological tests",
        "Implemented user and company profiles system",
        "Built full-stack solution with Angular frontend and NestJS backend"
      ],
      skills: ["Angular", "NestJS", "TypeScript", "Web Development", "Full-Stack Development"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16">
            <SectionTitle>Professional Experience</SectionTitle>
            <div className="w-20 h-1 bg-lightTheme-green dark:bg-darkTheme-green mx-auto mb-4"></div>
            <p className="text-lightTheme-yellow dark:text-darkTheme-yellow max-w-2xl mx-auto">
              6+ years of professional development experience across various industries
            </p>
          </div>
        </Reveal>

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

        <Reveal delay={1000}>
          <div className="text-center mt-12">
            <a
              href="https://www.linkedin.com/in/franco-castro-villanueva-035905174/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-lightTheme-green text-lightTheme-green dark:border-darkTheme-green dark:text-darkTheme-green bg-transparent font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:bg-lightTheme-green hover:text-lightTheme-bg dark:hover:bg-darkTheme-green dark:hover:text-darkTheme-bg hover:scale-105 font-mono"
            >
              <span>$ open linkedin_profile</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;