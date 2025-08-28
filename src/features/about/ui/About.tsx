import { useSpring, animated } from '@react-spring/web';
import Reveal from '@shared/ui/Reveal';
import SectionTitleWithShortcut from '@shared/ui/SectionTitleWithShortcut';
import SubTitle from '@shared/ui/SubTitle';
import Card from '@shared/ui/Card';
import Badge from '@shared/ui/Badge';

const About: React.FC = () => {
  const skills = [
    { category: 'Core', items: ['Principios SOLID', 'Arquitectura Limpia', 'Patrones de Diseño', 'Mentorías', 'Revisión de Código'] },
    { category: 'Frontend', items: ['React.js', 'TypeScript', 'Angular', 'HTML5', 'CSS', 'Diseño Responsivo'] },
    { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'APIs REST', 'Pruebas Automatizadas'] },
    { category: 'Herramientas', items: ['Git', 'Linux', 'Control de Versiones', 'Metodologías Ágiles', 'Pruebas Unitarias'] },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16">
            <SectionTitleWithShortcut shortcut="A">Acerca de Mí</SectionTitleWithShortcut>
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
                  Soy un desarrollador FullStack apasionado con 6+ años de experiencia, trabajando actualmente en Isapre Esencial. 
                  Mi experiencia abarca el ciclo completo de desarrollo, con un fuerte enfoque en React, TypeScript e implementación 
                  de principios de Arquitectura Limpia en aplicaciones del mundo real.
                </p>
                <p className="text-lightTheme-text dark:text-darkTheme-text leading-relaxed font-mono text-sm">
                  Me especializo en mentorar equipos y compartir conocimiento a través de charlas internas sobre testing, hooks personalizados, 
                  principios SOLID y mejores prácticas de React. Mi experiencia incluye optimización de rendimiento (reduciendo 
                  tiempos de carga de 9s a 2s), refactorización de código legacy y construcción de soluciones empresariales escalables.
                </p>
              </Card>

              <Card variant="terminal" showHeader={true}>
                <div className="mb-3">
                  <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
                  <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">cat philosophy.txt</span>
                </div>
                <p className="text-lightTheme-text dark:text-darkTheme-text leading-relaxed font-mono text-sm">
                  "El código limpio y la arquitectura sólida no son solo requisitos técnicos—son la base 
                  para software mantenible que escala con las necesidades del negocio y permite el crecimiento del equipo."
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
                  <div className="text-sm text-lightTheme-yellow dark:text-darkTheme-yellow font-mono">Años de Experiencia</div>
                </Card>
                <Card variant="terminal" className="text-center">
                  <div className="text-2xl font-bold text-lightTheme-green dark:text-darkTheme-green font-mono">5</div>
                  <div className="text-sm text-lightTheme-yellow dark:text-darkTheme-yellow font-mono">Empresas</div>
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