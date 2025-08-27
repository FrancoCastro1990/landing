import { useState, useEffect } from 'react';

/**
 * Hook that manages scroll hint visibility based on scroll position and typing completion
 * @param typingComplete - Whether the typing animation is complete
 * @param scrollThreshold - Scroll threshold to hide the hint (default: 50)
 * @param showDelay - Delay before showing the hint after typing is complete (default: 2000ms)
 * @returns Object with scroll hint visibility and scroll state
 */
export const useScrollHint = (
  typingComplete: boolean,
  scrollThreshold: number = 50,
  showDelay: number = 2000
) => {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
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
  }, [scrollThreshold]);

  useEffect(() => {
    if (!hasScrolled && typingComplete) {
      const timer = setTimeout(() => {
        setShowScrollHint(true);
      }, showDelay);

      return () => clearTimeout(timer);
    }
  }, [hasScrolled, typingComplete, showDelay]);

  return {
    showScrollHint,
    hasScrolled,
  };
};