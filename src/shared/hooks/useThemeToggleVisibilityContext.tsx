import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeToggleVisibilityContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const ThemeToggleVisibilityContext = createContext<ThemeToggleVisibilityContextType | undefined>(undefined);

interface ThemeToggleVisibilityProviderProps {
  children: React.ReactNode;
}

export const ThemeToggleVisibilityProvider: React.FC<ThemeToggleVisibilityProviderProps> = ({ children }) => {
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

  return (
    <ThemeToggleVisibilityContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </ThemeToggleVisibilityContext.Provider>
  );
};

export const useThemeToggleVisibilityContext = () => {
  const context = useContext(ThemeToggleVisibilityContext);
  if (context === undefined) {
    throw new Error('useThemeToggleVisibilityContext must be used within a ThemeToggleVisibilityProvider');
  }
  return context;
};