import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const KeyboardShortcutsHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const shortcuts = [
    { combo: 'Ctrl + Alt + H', description: 'Navigate to Hero section', icon: '🏠' },
    { combo: 'Ctrl + Alt + A', description: 'Navigate to About section', icon: '👨‍💻' },
    { combo: 'Ctrl + Alt + E', description: 'Navigate to Experience section', icon: '💼' },
    { combo: 'Ctrl + Alt + P', description: 'Navigate to Projects section', icon: '🚀' },
    { combo: 'Ctrl + Alt + C', description: 'Navigate to Contact section', icon: '📞' },
    { combo: 'Ctrl + Alt + I', description: 'Toggle theme (light/dark)', icon: '🌙' },
    { combo: 'Ctrl + Alt + T', description: 'Toggle theme button visibility', icon: '👁️' },
    { combo: 'Ctrl + Alt + M', description: 'Toggle this help modal', icon: '❓' },
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
            aria-label="Close help modal"
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
              Keyboard Shortcuts
            </h2>
            
            <p className="text-lightTheme-text/80 dark:text-darkTheme-text/80 font-mono text-sm mb-6">
              <span className="text-lightTheme-yellow dark:text-darkTheme-yellow">// </span>
              Available keyboard shortcuts for faster navigation
            </p>
          </div>

          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={shortcut.combo}
                className="flex items-center justify-between p-3 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 rounded border border-lightTheme-text/10 dark:border-darkTheme-text/10 hover:border-lightTheme-green/30 dark:hover:border-darkTheme-green/30 transition-colors duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{shortcut.icon}</span>
                  <span className="text-lightTheme-text dark:text-darkTheme-text font-mono text-sm">
                    {shortcut.description}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {shortcut.combo.split(' + ').map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="px-2 py-1 bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green border border-lightTheme-green/30 dark:border-darkTheme-green/30 rounded text-xs font-mono">
                        {key}
                      </kbd>
                      {keyIndex < shortcut.combo.split(' + ').length - 1 && (
                        <span className="text-lightTheme-text/40 dark:text-darkTheme-text/40 text-xs">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-lightTheme-text/10 dark:border-darkTheme-text/10">
            <p className="text-lightTheme-text/60 dark:text-darkTheme-text/60 font-mono text-xs text-center">
              <span className="text-lightTheme-yellow dark:text-darkTheme-yellow"># </span>
              Press <kbd className="px-1 py-0.5 bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green border border-lightTheme-green/30 dark:border-darkTheme-green/30 rounded text-xs">Ctrl+Alt+M</kbd> or click outside to toggle
            </p>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default KeyboardShortcutsHelp;