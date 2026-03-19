import { useSpring, animated } from '@react-spring/web';
import { useHeaderVisibility } from '../hooks/useHeaderVisibility';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { useNavigation } from '../hooks/useNavigation';

const Header: React.FC = () => {
  const isScrolled = useHeaderVisibility(50);
  const { isOpen: isMobileMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const { scrollToSection, scrollToTop } = useNavigation();

  const headerSpring = useSpring({
    backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
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
    { label: 'ACERCA', action: () => handleScrollToSection('about') },
    { label: 'EXPERIENCIA', action: () => handleScrollToSection('experience') },
    { label: 'PROYECTOS', action: () => handleScrollToSection('projects') },
    { label: 'CONTACTO', action: () => handleScrollToSection('contact') },
  ];

  return (
    <animated.header
      style={headerSpring}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-surface-low/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-8 py-6 max-w-full">
          {/* Logo */}
          <button
            onClick={handleScrollToTop}
            className="font-label font-black uppercase tracking-[0.2rem] text-primary text-xl focus:outline-none"
            aria-label="Ir al inicio"
          >
            FRANCO_CASTRO
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-12 items-center">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-on-surface/60 hover:text-on-surface transition-colors duration-300 font-label uppercase tracking-[0.1rem] text-[12px]"
                aria-label={`Navegar a ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary transition-transform active:scale-90 focus:outline-none"
            aria-label="Alternar menu movil"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <animated.div
        style={mobileMenuSpring}
        className="md:hidden fixed z-50 top-0 right-0 bottom-0 w-72 shadow-2xl"
      >
        <div className="absolute inset-0 bg-surface-lowest backdrop-blur-xl" />

        <div className="relative z-10 flex flex-col h-full bg-surface-lowest">
          <div className="flex items-center justify-between p-6 border-b border-on-surface/5">
            <span className="font-label font-black uppercase tracking-[0.2rem] text-primary text-lg">
              FRANCO_CASTRO
            </span>
            <button
              onClick={closeMenu}
              className="text-primary transition-colors duration-300 focus:outline-none p-1"
              aria-label="Cerrar menu movil"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 py-8">
            <nav className="space-y-2 px-6">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full text-left px-4 py-4 text-on-surface/60 hover:text-primary transition-all duration-300 font-label uppercase tracking-[0.1rem] text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </animated.div>

      {/* Mobile Menu Background Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-surface-lowest/60 backdrop-blur-sm z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </animated.header>
  );
};

export default Header;
