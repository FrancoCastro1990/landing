import { Fragment } from 'react';
import { animated } from '@react-spring/web';
import Reveal from '@shared/ui/Reveal';
import SectionTitle from '@shared/ui/SectionTitle';
import Badge from '@shared/ui/Badge';
import { useCountUp } from '@shared/hooks/useCountUp';
import type { HeadlinePart, StatItem } from '@app';

interface AboutProps {
  sectionTitle: HeadlinePart[];
  bio: string[];
  stats: StatItem[];
  skills: string[];
}

const StatDisplay: React.FC<{ stat: StatItem }> = ({ stat }) => {
  const { ref, count } = useCountUp(stat.value, 2000);

  return (
    <div ref={ref} className={stat.colSpan === 2 ? 'col-span-2' : ''}>
      <animated.span
        className={`block font-headline italic text-6xl ${stat.accentValue ? 'text-primary' : 'text-on-surface'}`}
      >
        {count.to((n) => `${Math.floor(n)}${stat.suffix}`)}
      </animated.span>
      <span className="font-label uppercase tracking-widest text-[10px] text-on-surface-variant mt-2 block">
        {stat.label}
      </span>
    </div>
  );
};

const About: React.FC<AboutProps> = ({ sectionTitle, bio, stats, skills }) => {
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
              {sectionTitle.map((part, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {part.accent ? <span className="text-primary">{part.text}</span> : part.text}
                </Fragment>
              ))}
            </SectionTitle>

            <div className="space-y-6 max-w-lg">
              {bio.map((paragraph, i) => (
                <p key={i} className="font-body text-lg text-on-surface-variant leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300} className="lg:col-span-5">
            <div className="space-y-12">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8" aria-live="polite" aria-atomic="true">
                {stats.map((stat) => (
                  <StatDisplay key={stat.label} stat={stat} />
                ))}
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
