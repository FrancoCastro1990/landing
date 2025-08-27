import { useSpring, animated } from '@react-spring/web';
import Reveal from '@shared/ui/Reveal';
import SectionTitle from '@shared/ui/SectionTitle';
import SubTitle from '@shared/ui/SubTitle';
import Card from '@shared/ui/Card';
import Badge from '@shared/ui/Badge';

const About: React.FC = () => {
  const skills = [
    { category: 'Core', items: ['SOLID Principles', 'Clean Architecture', 'Design Patterns', 'Mentorship', 'Code Review'] },
    { category: 'Frontend', items: ['React.js', 'TypeScript', 'Angular', 'HTML5', 'CSS', 'Responsive Design'] },
    { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'REST APIs', 'Automated Testing'] },
    { category: 'Tools', items: ['Git', 'Linux', 'Version Control', 'Agile Methodologies', 'Unit Testing'] },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16">
            <SectionTitle>About Me</SectionTitle>
            <div className="w-20 h-1 bg-lightTheme-green dark:bg-darkTheme-green mx-auto"></div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left" delay={200}>
            <div className="space-y-6">
              <Card variant="terminal" showHeader={true}>
                <div className="mb-4">
                  <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
                  <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">whoami</span>
                </div>
                <p className="text-lightTheme-text dark:text-darkTheme-text leading-relaxed mb-4 font-mono text-sm">
                  I'm a passionate Full Stack Developer with 6+ years of experience, currently working at Isapre Esencial. 
                  My expertise spans the complete development cycle, with a strong focus on React, TypeScript, and implementing 
                  Clean Architecture principles in real-world applications.
                </p>
                <p className="text-lightTheme-text dark:text-darkTheme-text leading-relaxed font-mono text-sm">
                  I specialize in mentoring teams and sharing knowledge through internal talks on testing, custom hooks, 
                  SOLID principles, and React best practices. My experience includes performance optimization (reducing 
                  load times from 9s to 2s), legacy code refactoring, and building scalable enterprise solutions.
                </p>
              </Card>

              <Card variant="terminal" showHeader={true}>
                <div className="mb-3">
                  <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
                  <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">cat philosophy.txt</span>
                </div>
                <p className="text-lightTheme-text dark:text-darkTheme-text leading-relaxed font-mono text-sm">
                  "Clean code and solid architecture are not just technical requirements—they're the foundation 
                  for maintainable software that scales with business needs and enables team growth."
                </p>
              </Card>
            </div>
          </Reveal>

          <Reveal direction="right" delay={400}>
            <div className="space-y-6">
              <div>
                <Card variant="terminal" showHeader={true}>
                  <div className="mb-4">
                    <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
                    <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">ls skills/</span>
                  </div>
                  <div className="space-y-4">
                    {skills.map((skillGroup, index) => (
                      <div key={skillGroup.category}>
                        <h4 className="text-lightTheme-green dark:text-darkTheme-green font-mono text-sm mb-2">
                          {skillGroup.category.toLowerCase()}:
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {skillGroup.items.map((skill, skillIndex) => (
                            <Badge
                              key={skill}
                              size="sm"
                              className="rounded-full"
                              style={{
                                animationDelay: `${(index * skillGroup.items.length + skillIndex) * 100}ms`
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card variant="terminal" className="text-center">
                  <div className="text-2xl font-bold text-lightTheme-green dark:text-darkTheme-green font-mono">6+</div>
                  <div className="text-sm text-lightTheme-yellow dark:text-darkTheme-yellow font-mono">Years Experience</div>
                </Card>
                <Card variant="terminal" className="text-center">
                  <div className="text-2xl font-bold text-lightTheme-green dark:text-darkTheme-green font-mono">5</div>
                  <div className="text-sm text-lightTheme-yellow dark:text-darkTheme-yellow font-mono">Companies</div>
                </Card>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;