import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface RevealProps {
  children: any;
  threshold?: number;
  once?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  threshold = 0.15,
  once = true,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasBeenSeen || !once)) {
          setIsVisible(true);
          if (once) {
            setHasBeenSeen(true);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once, hasBeenSeen]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(30px)';
      case 'down':
        return 'translateY(-30px)';
      case 'left':
        return 'translateX(30px)';
      case 'right':
        return 'translateX(-30px)';
      default:
        return 'translateY(30px)';
    }
  };

  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(${getTransform().replace('translate', '').replace('(', '').replace(')', '')}, 0)`,
    config: {
      tension: 280,
      friction: 60,
    },
    delay: isVisible ? delay : 0,
  });

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div
        ref={elementRef}
        className={className}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.1s ease-out',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <animated.div
      ref={elementRef}
      style={springProps}
      className={className}
    >
      {children}
    </animated.div>
  );
};

export default Reveal;