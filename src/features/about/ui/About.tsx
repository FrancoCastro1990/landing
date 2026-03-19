import { animated } from '@react-spring/web';
import Reveal from '@shared/ui/Reveal';
import SectionTitle from '@shared/ui/SectionTitle';
import Badge from '@shared/ui/Badge';
import { useCountUp } from '@shared/hooks/useCountUp';

const About: React.FC = () => {
  const { ref: yearsRef, count: yearsCount } = useCountUp(6, 2000);
  const { ref: companiesRef, count: companiesCount } = useCountUp(5, 2000);
  const { ref: perfRef, count: perfCount } = useCountUp(78, 2000);

  const skills = [
    'SOLID',
    'Clean Architecture',
    'Design Patterns',
    'React.js',
    'Next.js',
    'TypeScript',
    'Angular',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'REST APIs',
    'Unit Testing',
    'E2E Playwright',
    'Git',
    'Linux',
    'GitHub Copilot',
    'Claude Code',
  ];

  return (
    <section id="about" className="py-32 px-8 lg:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-24 flex justify-between items-baseline">
            <p className="font-label uppercase tracking-[0.3rem] text-sm text-on-surface-variant">
              Acerca de
            </p>
            <span className="font-headline italic text-2xl text-primary">01</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <Reveal delay={100} className="lg:col-span-7">
            <SectionTitle className="mb-12">
              Construyo con
              <br />
              <span className="text-primary">precision</span>
              <br />
              y arquitectura.
            </SectionTitle>

            <div className="space-y-6 max-w-lg">
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                Desarrollador Full Stack con mas de 6 anos de experiencia,
                actualmente en Isapre Esencial. Mi enfoque abarca React,
                TypeScript y Node.js, implementando principios de Arquitectura
                Limpia en aplicaciones del mundo real.
              </p>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                Especializado en mentorar equipos a traves de charlas internas
                sobre testing, principios SOLID y mejores practicas. Experiencia
                en optimizacion de rendimiento, refactorizacion de legacy y
                automatizacion con herramientas de IA.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300} className="lg:col-span-5">
            <div className="space-y-12">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                <div ref={yearsRef}>
                  <animated.span className="block font-headline italic text-6xl text-primary">
                    {yearsCount.to((n) => `${Math.floor(n)}+`)}
                  </animated.span>
                  <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant mt-2 block">
                    Anos exp.
                  </span>
                </div>
                <div ref={companiesRef}>
                  <animated.span className="block font-headline italic text-6xl text-on-surface">
                    {companiesCount.to((n) => Math.floor(n).toString())}
                  </animated.span>
                  <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant mt-2 block">
                    Empresas
                  </span>
                </div>
                <div ref={perfRef} className="col-span-2">
                  <animated.span className="block font-headline italic text-6xl text-primary">
                    {perfCount.to((n) => `${Math.floor(n)}%`)}
                  </animated.span>
                  <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant mt-2 block">
                    Mejora rendimiento (9s a 2s)
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="font-label uppercase tracking-[0.3rem] text-[10px] text-primary mb-6">
                  Stack Tecnologico
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
