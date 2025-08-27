import { useCallback } from 'react';

/**
 * Hook for navigation actions like scrolling to sections
 * @returns Object with navigation functions
 */
export const useNavigation = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    scrollToSection,
    scrollToTop,
  };
};