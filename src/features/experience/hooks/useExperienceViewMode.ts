import { useState, useEffect } from 'react';

export type ExperienceViewMode = 'basic' | 'advanced';

/**
 * Hook for managing experience view mode (basic/advanced)
 * @returns Object with current mode and toggle function
 */
export const useExperienceViewMode = () => {
  const [viewMode, setViewMode] = useState<ExperienceViewMode>('basic');

  useEffect(() => {
    // Get initial mode from localStorage
    const savedMode = localStorage.getItem('experienceViewMode') as ExperienceViewMode;
    if (savedMode && (savedMode === 'basic' || savedMode === 'advanced')) {
      setViewMode(savedMode);
    }

    // Listen for mode toggle events
    const handleToggleMode = () => {
      setViewMode(prev => {
        const newMode: ExperienceViewMode = prev === 'basic' ? 'advanced' : 'basic';
        localStorage.setItem('experienceViewMode', newMode);
        return newMode;
      });
    };

    window.addEventListener('toggleExperienceViewMode', handleToggleMode);

    return () => {
      window.removeEventListener('toggleExperienceViewMode', handleToggleMode);
    };
  }, []);

  const toggleMode = () => {
    window.dispatchEvent(new CustomEvent('toggleExperienceViewMode'));
  };

  return {
    viewMode,
    toggleMode,
    isBasic: viewMode === 'basic',
    isAdvanced: viewMode === 'advanced',
  };
};