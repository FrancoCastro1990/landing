import { useEffect, useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';

export const useCountUp = (end: number, duration = 2000) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentElement);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  const { number } = useSpring({
    number: isVisible ? end : 0,
    from: { number: 0 },
    config: { duration },
  });

  return { ref, count: number };
};
