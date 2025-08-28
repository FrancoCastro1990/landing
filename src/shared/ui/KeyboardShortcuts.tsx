import { useShortcuts, useTheme } from '@shared/hooks';
import { useNavigation } from '@features/navigation/hooks/useNavigation';

const KeyboardShortcuts: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { scrollToSection, scrollToTop } = useNavigation();

  const toggleThemeButtonVisibility = () => {
    window.dispatchEvent(new CustomEvent('toggleThemeButtonVisibility'));
  };

  const toggleShortcutsHelp = () => {
    window.dispatchEvent(new CustomEvent('toggleShortcutsHelp'));
  };

  const toggleExperienceViewMode = () => {
    window.dispatchEvent(new CustomEvent('toggleExperienceViewMode'));
  };

  const shortcuts = {
    'Ctrl+Alt+h': () => scrollToSection('hero'),
    'Ctrl+Alt+a': () => scrollToSection('about'),
    'Ctrl+Alt+e': () => scrollToSection('experience'),
    'Ctrl+Alt+p': () => scrollToSection('projects'),
    'Ctrl+Alt+c': () => scrollToSection('contact'),
    'Ctrl+Alt+i': () => toggleTheme(),
    'Ctrl+Alt+t': () => toggleThemeButtonVisibility(),
    'Ctrl+Alt+m': () => toggleShortcutsHelp(),
    'Ctrl+Alt+`': () => toggleExperienceViewMode(),
  };

  useShortcuts(shortcuts);

  return null;
};

export default KeyboardShortcuts;