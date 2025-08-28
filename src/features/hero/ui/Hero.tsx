import { useSpring, animated } from '@react-spring/web';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { useScrollHint } from '../hooks/useScrollHint';

const Hero: React.FC = () => {
  const fullText = "";
  const helloText = "Hello, I'm ";
  const afterLogoText = " // FullStack Developer | React & TypeScript Specialist";

  const showLogo = true;
  const showCursor = false;
  const typingComplete = true;

  const { showScrollHint } = useScrollHint(typingComplete);

  const titleSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 60 },
  });

  const scrollHintSpring = useSpring({
    opacity: showScrollHint ? 1 : 0,
    transform: showScrollHint ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 280, friction: 60 },
  });

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto">
        <animated.div style={titleSpring}>
          <div className="mb-8">
            {/* Terminal-style header */}
            <div className="mb-6 text-lightTheme-text/60 dark:text-darkTheme-text/60 font-mono text-sm">
              <span className="text-lightTheme-green dark:text-darkTheme-green">user@fcastro.dev:</span>
              <span className="text-lightTheme-blue dark:text-darkTheme-blue">~$</span>
              <span className="ml-1">whoami</span>
            </div>
            
            <h1 className="text-xl md:text-2xl lg:text-3xl font-mono text-lightTheme-text dark:text-darkTheme-text mb-6 leading-relaxed">
              <span className="text-lightTheme-green dark:text-darkTheme-green">{'> '}</span>
              <span className="relative">
                <span className="relative">
                  H
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lightTheme-green dark:bg-darkTheme-green"></span>
                </span>
                ello, I'm
              </span>
              {showLogo && (
                <span className="bg-lightTheme-green dark:bg-darkTheme-green text-lightTheme-bg dark:text-darkTheme-bg px-1 mx-1 font-bold">
                  &lt;FCastro.dev /&gt;
                </span>
              )}
              {afterLogoText}
              <span 
                className={`ml-1 text-lightTheme-green dark:text-darkTheme-green ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
              >
                |
              </span>
            </h1>
            
            {/* Terminal output style */}
            <div className="border-l-2 border-lightTheme-green/30 dark:border-darkTheme-green/30 pl-4 ml-2">
              <p className="text-base md:text-lg lg:text-xl font-mono text-lightTheme-text/80 dark:text-darkTheme-text/80 max-w-2xl leading-relaxed">
                <span className="text-lightTheme-yellow dark:text-darkTheme-yellow"># Output:</span>
                <br />
                Full Stack Developer with 6+ years of experience specializing in React, TypeScript, and Clean Architecture. 
                Currently at Isapre Esencial, passionate about mentorship and creating exceptional web experiences.
              </p>
            </div>
          </div>
        </animated.div>

        {/* Scroll hint arrow */}
        <animated.div 
          style={scrollHintSpring}
          className="mt-12 flex flex-col items-center"
        >
          <div className="text-lightTheme-green/60 dark:text-darkTheme-green/60 font-mono text-xs mb-2">
            <span className="text-lightTheme-text/40 dark:text-darkTheme-text/40"># </span>
            scroll to explore
          </div>
          <div className="text-lightTheme-green dark:text-darkTheme-green text-2xl animate-bounce font-mono">
            ↓
          </div>
        </animated.div>

      </div>
    </section>
  );
};

export default Hero;