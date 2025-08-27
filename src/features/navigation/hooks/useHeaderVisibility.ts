import { useState, useEffect } from 'react';

/**
 * Hook that tracks header visibility based on scroll position
 * @param threshold - Scroll threshold in pixels to show the header (default: 50)
 * @returns Boolean indicating if header should be visible
 */
export const useHeaderVisibility = (threshold: number = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};