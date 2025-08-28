import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const initialTheme = savedTheme || systemPreference;
    
    setTheme(initialTheme);
    // Apply 'dark' class for dark theme, empty for light theme (Tailwind's dark mode)
    document.documentElement.className = initialTheme === 'dark' ? 'dark' : '';

    // Load visibility from localStorage
    const savedVisibility = localStorage.getItem('themeToggleVisible');
    if (savedVisibility !== null) {
      setIsVisible(JSON.parse(savedVisibility));
    }

    // Listen for visibility toggle events
    const handleToggleVisibility = () => {
      setIsVisible(prev => {
        const newVisibility = !prev;
        localStorage.setItem('themeToggleVisible', JSON.stringify(newVisibility));
        return newVisibility;
      });
    };

    window.addEventListener('toggleThemeButtonVisibility', handleToggleVisibility);

    return () => {
      window.removeEventListener('toggleThemeButtonVisibility', handleToggleVisibility);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // Apply 'dark' class for dark theme, empty for light theme (Tailwind's dark mode)
    document.documentElement.className = newTheme === 'dark' ? 'dark' : '';
  };

  const toggleSpring = useSpring({
    transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
    config: { tension: 280, friction: 60 },
  });

  const buttonSpring = useSpring({
    scale: 1,
    config: { tension: 300, friction: 30 },
  });

  const visibilitySpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
    pointerEvents: isVisible ? 'all' : 'none',
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.button
      onClick={toggleTheme}
      style={{ ...buttonSpring, ...visibilitySpring }}
      className="fixed top-20 right-4 z-50 p-3 bg-lightTheme-magenta/20 dark:bg-darkTheme-blue/80 border border-lightTheme-green/20 dark:border-darkTheme-green/20 rounded-lg hover:bg-lightTheme-magenta/30 dark:hover:bg-darkTheme-blue/90 hover:border-lightTheme-green/40 dark:hover:border-darkTheme-green/40 transition-colors duration-300"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      onMouseEnter={(e) => {
        if (!isVisible) return;
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        if (!isVisible) return;
        const target = e.target as HTMLElement;
        target.style.transform = 'scale(1)';
      }}
    >
      <animated.div style={toggleSpring}>
        {theme === 'dark' ? (
          // Sun icon for light mode
          <svg
            className="w-5 h-5 text-lightTheme-green dark:text-darkTheme-green"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            className="w-5 h-5 text-lightTheme-green dark:text-darkTheme-green"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </animated.div>
      
      {/* Terminal-style label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-mono text-lightTheme-green dark:text-darkTheme-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {theme === 'dark' ? 'light_mode()' : 'dark_mode()'}
      </div>
    </animated.button>
  );
};

export default ThemeToggle;