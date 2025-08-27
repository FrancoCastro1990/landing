import { useSpring, animated } from '@react-spring/web';
import { useScrollProgress } from '@shared/hooks/useScrollProgress';

const ScrollIndicator: React.FC = () => {
  const { scrollProgress, showIndicator } = useScrollProgress();

  const indicatorSpring = useSpring({
    opacity: showIndicator ? 0.7 : 0,
    transform: showIndicator ? 'translateX(0px)' : 'translateX(20px)',
    config: { tension: 280, friction: 60 },
  });

  const progressSpring = useSpring({
    height: `${scrollProgress * 100}%`,
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.div
      style={indicatorSpring}
      className="fixed right-4 bottom-20 md:top-1/2 md:bottom-auto md:transform md:-translate-y-1/2 z-50 pointer-events-none"
    >
      <div className="w-1 h-32 bg-lightTheme-green/20 dark:bg-darkTheme-green/20 rounded-full overflow-hidden">
        <animated.div
          style={progressSpring}
          className="w-full bg-lightTheme-green dark:bg-darkTheme-green rounded-full"
        />
      </div>
      
      {/* Scroll hint for first-time visitors */}
      {scrollProgress < 0.1 && (
        <div className="absolute -left-16 md:-left-20 top-1/2 transform -translate-y-1/2 text-xs font-mono text-lightTheme-green/60 dark:text-darkTheme-green/60 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span>scroll</span>
            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 bg-lightTheme-green/60 dark:bg-darkTheme-green/60 animate-pulse" />
              <div className="w-1 h-1 bg-lightTheme-green/40 dark:bg-darkTheme-green/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-lightTheme-green/20 dark:bg-darkTheme-green/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default ScrollIndicator;