import { useSpring, animated } from '@react-spring/web';

const Hero: React.FC = () => {
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
    <section id="hero" className="min-h-screen flex flex-col justify-center px-8 pt-24 pb-12 lg:px-24">
      <animated.div style={nameSpring}>
        <h1 className="font-headline italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter text-on-surface mb-8">
          Full Stack
          <br />
          <span className="text-primary italic">Developer</span>
          <br />
          & Mentor.
        </h1>
      </animated.div>

      <animated.div style={subtitleSpring} className="max-w-md">
        <p className="font-label uppercase tracking-[0.15rem] text-xs text-on-surface-variant mb-4">
          Portafolio Personal // 2026
        </p>
        <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
          Construyo software que escala con precision y arquitectura limpia.
          6+ anos creando experiencias web excepcionales con React, TypeScript y principios SOLID.
        </p>
      </animated.div>
    </section>
  );
};

export default Hero;
