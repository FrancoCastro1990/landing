import { useShortcuts, useTheme } from '@shared/hooks';
import { useNavigation } from '@features/navigation/hooks/useNavigation';

const KeyboardShortcuts: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { scrollToSection, scrollToTop } = useNavigation();

  const toggleThemeButtonVisibility = () => {
    window.dispatchEvent(new CustomEvent('toggleThemeButtonVisibility'));
  };

  const openShortcutsHelp = () => {
    window.dispatchEvent(new CustomEvent('openShortcutsHelp'));
  };

  const closeShortcutsHelp = () => {
    window.dispatchEvent(new CustomEvent('closeShortcutsHelp'));
  };

  const shortcuts = {
    'Ctrl+Alt+h': () => scrollToSection('hero'),
    'Ctrl+Alt+a': () => scrollToSection('about'),
    'Ctrl+Alt+e': () => scrollToSection('experience'),
    'Ctrl+Alt+p': () => scrollToSection('projects'),
    'Ctrl+Alt+c': () => scrollToSection('contact'),
    'Ctrl+Alt+i': () => toggleTheme(),
    'Ctrl+Alt+t': () => toggleThemeButtonVisibility(),
    'Ctrl+Alt+m': () => openShortcutsHelp(),
    'Ctrl+Alt+q': () => closeShortcutsHelp(),
  };

  useShortcuts(shortcuts);

  return null;
};

export default KeyboardShortcuts;