import { useState, useEffect } from 'react';

/**
 * Hook for managing theme toggle button visibility
 * @returns Object with visibility state and toggle function
 */
export const useThemeToggleVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Get initial visibility from localStorage
    const savedVisibility = localStorage.getItem('themeToggleVisible');
    if (savedVisibility !== null) {
      setIsVisible(JSON.parse(savedVisibility));
    }
  }, []);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem('themeToggleVisible', JSON.stringify(newVisibility));
  };

  return {
    isVisible,
    toggleVisibility,
  };
};