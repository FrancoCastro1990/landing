import React from 'react';
import { ThemeToggleVisibilityProvider } from '@shared/hooks';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeToggleVisibilityProvider>
      {children}
    </ThemeToggleVisibilityProvider>
  );
};

export default AppProviders;