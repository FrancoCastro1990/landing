import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface RevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  threshold = 0.15,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentElement);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(60px)';
      case 'down':
        return 'translateY(-60px)';
      case 'left':
        return 'translateX(60px)';
      case 'right':
        return 'translateX(-60px)';
      case 'scale':
        return 'scale(0.95)';
      default:
        return 'translateY(60px)';
    }
  };

  const getFinalTransform = () => {
    if (direction === 'scale') return 'scale(1)';
    return 'translate3d(0, 0, 0)';
  };

  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getFinalTransform() : getInitialTransform(),
    config: { tension: 120, friction: 14 },
    delay: isVisible ? delay : 0,
  });

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
    <animated.div ref={elementRef} style={springProps} className={className}>
      {children}
    </animated.div>
  );
};

export default Reveal;
