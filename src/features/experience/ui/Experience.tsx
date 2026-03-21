import Reveal from '@shared/ui/Reveal';
import Badge from '@shared/ui/Badge';
import type { ExperienceItem } from '@app';
import { useEditableData, EditableSection } from '@features/content-editor';
import ExperienceEditorForm from '@features/content-editor/ui/sections/ExperienceEditorForm';

interface ExperienceProps {
  items: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = (props) => {
  const { items } = useEditableData('experience', props);

  return (
    <EditableSection sectionKey="experience" sectionLabel="Experiencia" defaultData={props} currentData={{ items }} formComponent={ExperienceEditorForm}>
    <section id="experience" className="py-32 px-8 lg:px-24">
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
          {items.map((exp, index) => (
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
    </EditableSection>
  );
};

export default Experience;
