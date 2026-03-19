import Reveal from '@shared/ui/Reveal';
import Badge from '@shared/ui/Badge';

interface ExperienceItem {
  year: string;
  position: string;
  company: string;
  period: string;
  highlights: string[];
  skills: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      year: '2024',
      position: 'Desarrollador Full Stack',
      company: 'Isapre Esencial',
      period: 'Ene 2024 — Presente',
      highlights: [
        'Refactorice codigo legacy e implemente arquitectura limpia',
        'Cree constructor de formularios dinamicos',
        'Realize charlas internas sobre testing, hooks y SOLID',
        'Desarrolle decorador para seguimiento de flujos',
      ],
      skills: ['SOLID', 'Clean Architecture', 'React', 'TypeScript', 'Testing'],
    },
    {
      year: '2023',
      position: 'Desarrollador Full Stack',
      company: 'Babel',
      period: 'Feb 2023 — Ene 2024',
      highlights: [
        'Consultor para Isapre Esencial',
        'Implemente soluciones enterprise con patrones modernos',
      ],
      skills: ['TypeScript', 'React.js', 'SOLID', 'Design Patterns'],
    },
    {
      year: '2022',
      position: 'Desarrollador Front-End',
      company: 'Mediastream',
      period: 'Sep 2022 — Dic 2022',
      highlights: [
        'Reduje tiempo de carga de 9s a 2s (78% mejora)',
        'Cree sistema de lazy loading basado en viewport',
      ],
      skills: ['React.js', 'Performance', 'Lazy Loading'],
    },
    {
      year: '2020',
      position: 'Desarrollador Fullstack',
      company: 'Peanut Hub',
      period: 'Nov 2020 — Sep 2022',
      highlights: [
        'Unico dev front-end para Crediautos.cl',
        'Construi flujos configurables para simulacion y contratacion',
      ],
      skills: ['React.js', 'TypeScript', 'WordPress'],
    },
    {
      year: '2019',
      position: 'Desarrollador Front-End',
      company: 'WoorKit',
      period: 'Jun 2019 — Dic 2019',
      highlights: [
        'Desarrolle plataforma de busqueda de empleos',
        'Solucion full-stack con Angular y NestJS',
      ],
      skills: ['Angular', 'NestJS', 'TypeScript'],
    },
  ];

  return (
    <section id="experience" className="py-32 px-8 lg:px-24 bg-surface-lowest">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-24 flex justify-between items-baseline">
            <p className="font-label uppercase tracking-[0.3rem] text-sm text-on-surface-variant">
              Experiencia
            </p>
            <span className="font-headline italic text-2xl text-primary">02</span>
          </div>
        </Reveal>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <Reveal key={exp.year + exp.company} delay={index * 100}>
              <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-t border-on-surface/5 hover:bg-surface-low transition-colors duration-500 -mx-8 px-8">
                {/* Year */}
                <div className="lg:col-span-2">
                  <span className="font-headline italic text-5xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                    {exp.year}
                  </span>
                </div>

                {/* Role */}
                <div className="lg:col-span-4">
                  <p className="font-label uppercase tracking-widest text-[10px] text-primary mb-2">
                    {exp.period}
                  </p>
                  <h3 className="font-headline italic text-3xl md:text-4xl text-on-surface mb-1">
                    {exp.position}
                  </h3>
                  <p className="font-body text-on-surface-variant text-lg">{exp.company}</p>
                </div>

                {/* Details */}
                <div className="lg:col-span-6">
                  <ul className="space-y-2 mb-6">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="font-body text-base text-on-surface-variant leading-relaxed">
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="accent">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
