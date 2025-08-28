import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '@shared/hooks';

const KeyboardShortcutsHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleToggleModal = () => {
      setIsOpen(prev => !prev);
    };

    window.addEventListener('toggleShortcutsHelp', handleToggleModal);

    return () => {
      window.removeEventListener('toggleShortcutsHelp', handleToggleModal);
    };
  }, []);

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 280, friction: 60 },
  });

  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    backdropFilter: isOpen ? 'blur(10px)' : 'blur(0px)',
    config: { tension: 280, friction: 60 },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shortcuts = [
    { 
      combo: 'Ctrl + Alt + H', 
      description: 'Navegar a la sección Hero', 
      icon: '🏠',
      action: () => scrollToSection('hero')
    },
    { 
      combo: 'Ctrl + Alt + A', 
      description: 'Navegar a la sección Acerca de', 
      icon: '👨‍💻',
      action: () => scrollToSection('about')
    },
    { 
      combo: 'Ctrl + Alt + E', 
      description: 'Navegar a la sección Experiencia', 
      icon: '💼',
      action: () => scrollToSection('experience')
    },
    { 
      combo: 'Ctrl + Alt + P', 
      description: 'Navegar a la sección Proyectos', 
      icon: '🚀',
      action: () => scrollToSection('projects')
    },
    { 
      combo: 'Ctrl + Alt + C', 
      description: 'Navegar a la sección Contacto', 
      icon: '📞',
      action: () => scrollToSection('contact')
    },
    { 
      combo: 'Ctrl + Alt + I', 
      description: 'Cambiar tema (claro/oscuro)', 
      icon: theme === 'dark' ? '🌙' : '☀️',
      action: () => toggleTheme()
    },
    { 
      combo: 'Ctrl + Alt + T', 
      description: 'Alternar visibilidad del botón de tema', 
      icon: '👁️',
      action: () => window.dispatchEvent(new CustomEvent('toggleThemeButtonVisibility'))
    },
    { 
      combo: 'Ctrl + Alt + `', 
      description: 'Cambiar modo de vista de experiencia', 
      icon: '🔄',
      action: () => window.dispatchEvent(new CustomEvent('toggleExperienceViewMode'))
    },
    { 
      combo: 'Ctrl + Alt + M', 
      description: 'Alternar este modal de ayuda', 
      icon: '❓',
      action: () => window.dispatchEvent(new CustomEvent('toggleShortcutsHelp'))
    },
  ];

  if (!isOpen) return null;

  return (
    <animated.div
      style={backdropSpring}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={() => window.dispatchEvent(new CustomEvent('toggleShortcutsHelp'))}
    >
      <animated.div
        style={modalSpring}
        className="bg-lightTheme-bg dark:bg-darkTheme-bg border-2 border-lightTheme-green dark:border-darkTheme-green rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-lightTheme-green/20 dark:border-darkTheme-green/20 bg-lightTheme-text/5 dark:bg-darkTheme-text/5">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-lightTheme-text dark:text-darkTheme-text font-mono text-sm">
              keyboard-shortcuts-help.sh
            </span>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleShortcutsHelp'))}
            className="text-lightTheme-text/60 dark:text-darkTheme-text/60 hover:text-lightTheme-green dark:hover:text-darkTheme-green transition-colors duration-300 font-mono text-lg"
            aria-label="Cerrar modal de ayuda"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="mb-4">
              <span className="text-lightTheme-green dark:text-darkTheme-green font-mono">$</span>
              <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">cat keyboard_shortcuts.md</span>
            </div>
            
            <h2 className="text-2xl font-bold text-lightTheme-text dark:text-darkTheme-text mb-2 font-mono">
              <span className="text-lightTheme-green dark:text-darkTheme-green"># </span>
              Atajos de Teclado
            </h2>
            
            <p className="text-lightTheme-text/80 dark:text-darkTheme-text/80 font-mono text-sm mb-6">
              <span className="text-lightTheme-yellow dark:text-darkTheme-yellow">// </span>
              Atajos de teclado disponibles para navegación rápida
            </p>
          </div>

          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <button
                key={shortcut.combo}
                onClick={shortcut.action}
                className="w-full flex items-center justify-between p-3 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 rounded border border-lightTheme-text/10 dark:border-darkTheme-text/10 hover:border-lightTheme-green/30 dark:hover:border-darkTheme-green/30 hover:bg-lightTheme-green/5 dark:hover:bg-darkTheme-green/5 transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={`Execute: ${shortcut.description}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg transition-transform duration-200">
                    {shortcut.icon}
                  </span>
                  <span className="text-lightTheme-text dark:text-darkTheme-text group-hover:text-lightTheme-green dark:group-hover:text-darkTheme-green font-mono text-sm text-left transition-colors duration-200">
                    {shortcut.description}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {shortcut.combo.split(' + ').map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="px-2 py-1 bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green border border-lightTheme-green/30 dark:border-darkTheme-green/30 rounded text-xs font-mono group-hover:bg-lightTheme-green/20 dark:group-hover:bg-darkTheme-green/20 transition-colors duration-200">
                        {key}
                      </kbd>
                      {keyIndex < shortcut.combo.split(' + ').length - 1 && (
                        <span className="text-lightTheme-text/40 dark:text-darkTheme-text/40 text-xs">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-lightTheme-text/10 dark:border-darkTheme-text/10">
            <p className="text-lightTheme-text/60 dark:text-darkTheme-text/60 font-mono text-xs text-center">
              <span className="text-lightTheme-yellow dark:text-darkTheme-yellow"># </span>
              Presiona <kbd className="px-1 py-0.5 bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green border border-lightTheme-green/30 dark:border-darkTheme-green/30 rounded text-xs">Ctrl+Alt+M</kbd> o haz clic afuera para alternar
            </p>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default KeyboardShortcutsHelp;