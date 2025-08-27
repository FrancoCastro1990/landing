import { useState, useEffect } from 'react';

/**
 * Hook that tracks scroll progress as a percentage (0-1)
 * @param threshold - Threshold below which to hide the indicator (default: 0.95)
 * @returns Object with scroll progress and visibility state
 */
export const useScrollProgress = (threshold: number = 0.95) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalHeight;
      setScrollProgress(currentProgress);
      
      // Hide indicator when user has scrolled significantly
      setShowIndicator(currentProgress < threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return {
    scrollProgress,
    showIndicator,
  };
};