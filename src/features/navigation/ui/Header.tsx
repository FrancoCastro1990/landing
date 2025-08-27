import { useSpring, animated } from '@react-spring/web';
import { useHeaderVisibility } from '../hooks/useHeaderVisibility';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { useNavigation } from '../hooks/useNavigation';
import Logo from '@shared/ui/Logo';
import Link from '@shared/ui/Link';

const Header: React.FC = () => {
  const isScrolled = useHeaderVisibility(50);
  const { isOpen: isMobileMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const { scrollToSection, scrollToTop } = useNavigation();

  const headerSpring = useSpring({
    backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
    opacity: isScrolled ? 1 : 0,
    transform: isScrolled ? 'translateY(0px)' : 'translateY(-100%)',
    config: { tension: 300, friction: 30 },
  });

  const mobileMenuSpring = useSpring({
    opacity: isMobileMenuOpen ? 1 : 0,
    transform: isMobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)',
    config: { tension: 300, friction: 30 },
  });

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  const handleScrollToTop = () => {
    scrollToTop();
    closeMenu();
  };

  const navigationItems = [
    { label: 'Home', action: handleScrollToTop },
    { label: 'About', action: () => handleScrollToSection('about') },
    { label: 'Experience', action: () => handleScrollToSection('experience') },
    { label: 'Projects', action: () => handleScrollToSection('projects') },
    { label: 'Contact', action: () => handleScrollToSection('contact') },
  ];

  return (
    <animated.header 
      style={headerSpring}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-lightTheme-bg/95 dark:bg-darkTheme-bg/95 border-lightTheme-green/20 dark:border-darkTheme-green/20' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Logo clickable onLogoClick={handleScrollToTop} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                onClick={item.action}
                variant="ghost"
                className="font-mono text-sm px-3 py-2 relative group"
                aria-label={`Navigate to ${item.label}`}
              >
                <span className="opacity-0 group-hover:opacity-100 text-lightTheme-green dark:text-darkTheme-green transition-opacity duration-200 absolute left-1">
                  $
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-lightTheme-green dark:text-darkTheme-green hover:text-lightTheme-blue dark:hover:text-darkTheme-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg rounded p-2 font-mono"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <span className="text-sm">✕</span>
            ) : (
              <span className="text-sm">☰</span>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <animated.div 
        style={mobileMenuSpring}
        className="md:hidden fixed z-50 top-0 right-0 bottom-0 w-64 shadow-2xl"
      >
        {/* Fondo sólido negro con blur */}
        <div className="absolute inset-0 bg-lightTheme-bg dark:bg-darkTheme-bg backdrop-blur-xl"></div>
        
        {/* Contenido del menú */}
        <div className="relative z-10 flex flex-col h-full bg-lightTheme-bg dark:bg-darkTheme-bg">
          {/* Header del menú móvil con estilo terminal */}
          <div className="flex items-center justify-between p-4 bg-lightTheme-bg dark:bg-darkTheme-bg">
            <Logo />
            <button
              onClick={closeMenu}
              className="text-lightTheme-green dark:text-darkTheme-green hover:text-lightTheme-blue dark:hover:text-darkTheme-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg p-1 font-mono"
              aria-label="Close mobile menu"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 flex flex-col">
            <div className="flex-1 py-4 bg-lightTheme-bg dark:bg-darkTheme-bg">
              <nav className="space-y-1 px-4">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left px-4 py-3 text-lightTheme-text dark:text-darkTheme-text hover:text-lightTheme-green dark:hover:text-darkTheme-green hover:bg-lightTheme-green/10 dark:hover:bg-darkTheme-green/10 transition-all duration-300 font-mono focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg rounded border-l border-transparent hover:border-lightTheme-green dark:hover:border-darkTheme-green text-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-lightTheme-green dark:text-darkTheme-green mr-2">$</span>
                    {item.label.toLowerCase()}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </animated.div>

      {/* Mobile Menu Background Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-lightTheme-bg/90 dark:bg-darkTheme-bg/90 backdrop-blur-lg z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </animated.header>
  );
};

export default Header;