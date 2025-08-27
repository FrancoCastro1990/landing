import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [displayedAfterText, setDisplayedAfterText] = useState('');
  const [afterTextIndex, setAfterTextIndex] = useState(0);
  const [firstPartComplete, setFirstPartComplete] = useState(false);

  const fullText = "Hello, I'm ";
  const afterLogoText = " // FullStack Developer | React & TypeScript Specialist";
  const typingSpeed = 100;
  const cursorBlinkSpeed = 500;

  // Check for reduced motion
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
        setShowScrollHint(false);
      } else if (window.scrollY <= 10) {
        // Reset when user returns to top
        setHasScrolled(false);
        setShowScrollHint(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasScrolled && typingComplete) {
      const timer = setTimeout(() => {
        setShowScrollHint(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasScrolled, typingComplete]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(fullText);
      setFirstPartComplete(true);
      setShowLogo(true);
      setDisplayedAfterText(afterLogoText);
      setTypingComplete(true);
      return;
    }

    // First part typing
    if (currentIndex < fullText.length && !firstPartComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } 
    // Show logo after first part
    else if (!firstPartComplete && currentIndex >= fullText.length) {
      setFirstPartComplete(true);
      setTimeout(() => setShowLogo(true), 300);
    }
    // Second part typing
    else if (firstPartComplete && showLogo && afterTextIndex < afterLogoText.length) {
      const timeout = setTimeout(() => {
        setDisplayedAfterText(prev => prev + afterLogoText[afterTextIndex]);
        setAfterTextIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
    // Complete
    else if (afterTextIndex >= afterLogoText.length && !typingComplete) {
      setTypingComplete(true);
    }
  }, [currentIndex, afterTextIndex, fullText, afterLogoText, typingComplete, prefersReducedMotion, firstPartComplete, showLogo]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [prefersReducedMotion]);

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
    <section className="min-h-screen flex items-center justify-center px-4">
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
              {displayedText}
              {showLogo && (
                <span className="bg-lightTheme-green dark:bg-darkTheme-green text-lightTheme-bg dark:text-darkTheme-bg px-1 mx-1 font-bold">
                  &lt;FCastro.dev /&gt;
                </span>
              )}
              {displayedAfterText}
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