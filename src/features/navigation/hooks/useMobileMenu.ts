import { useState, useCallback } from 'react';

/**
 * Hook for managing mobile menu state
 * @returns Object with menu state and control functions
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  };
};