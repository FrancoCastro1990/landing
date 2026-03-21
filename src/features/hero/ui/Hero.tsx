import { Fragment } from 'react';
import { useSpring, animated } from '@react-spring/web';
import type { HeadlinePart } from '@app';
import { useEditableData, EditableSection } from '@features/content-editor';
import HeroEditorForm from '@features/content-editor/ui/sections/HeroEditorForm';

interface HeroProps {
  headline: HeadlinePart[];
  label: string;
  bio: string;
}

const Hero: React.FC<HeroProps> = (props) => {
  const { headline, label, bio } = useEditableData('hero', props);

  const nameSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(40px)' },
    config: { tension: 80, friction: 20 },
    delay: 200,
  });

  const subtitleSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(30px)' },
    config: { tension: 80, friction: 20 },
    delay: 600,
  });

  return (
    <EditableSection sectionKey="hero" sectionLabel="Hero" defaultData={props} currentData={{ headline, label, bio }} formComponent={HeroEditorForm}>
      <section id="hero" className="min-h-screen flex flex-col justify-center px-8 pt-24 pb-12 lg:px-24">
        <animated.div style={nameSpring}>
          <h1 className="font-headline italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-on-surface mb-8">
            {headline.map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {part.accent ? <span className="text-primary">{part.text}</span> : part.text}
              </Fragment>
            ))}
          </h1>
        </animated.div>

        <animated.div style={subtitleSpring} className="max-w-md">
          <p className="font-label uppercase tracking-[0.15rem] text-xs text-on-surface-variant mb-4">
            {label}
          </p>
          <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {bio}
          </p>
        </animated.div>
      </section>
    </EditableSection>
  );
};

export default Hero;
