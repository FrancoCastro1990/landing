import { useSpring, animated } from '@react-spring/web';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/FrancoCastro1990',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/francocastro',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:franco.castro.villanueva.90@gmail.com',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoSpring = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'rotate(360deg)' });
        await next({ transform: 'rotate(0deg)' });
      }
    },
    config: { duration: 20000 },
    reset: true,
  });

  return (
    <footer className="bg-lightTheme-bg dark:bg-darkTheme-bg border-t border-lightTheme-text/20 dark:border-darkTheme-text/20 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-lightTheme-green dark:text-darkTheme-green focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg rounded"
              aria-label="Back to top"
            >
              <animated.div style={logoSpring}>
                <div className="w-8 h-8 border border-lightTheme-green dark:border-darkTheme-green rounded-full flex items-center justify-center">
                  <span className="font-mono text-sm font-bold">FC</span>
                </div>
              </animated.div>
              <div>
                <div className="font-mono text-lg font-bold text-lightTheme-text dark:text-darkTheme-text">Franco Castro</div>
                <div className="text-xs text-lightTheme-green dark:text-darkTheme-green font-mono">FullStack Developer</div>
              </div>
            </button>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <div className="flex justify-center space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-lightTheme-text dark:text-darkTheme-text focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg rounded"
                  aria-label={`Visit ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack & Copyright */}
          <div className="text-center md:text-right">
            <div className="mb-2">
              <div className="text-xs text-lightTheme-green dark:text-darkTheme-green mb-1 font-mono">Built with:</div>
              <div className="flex justify-center md:justify-end gap-2 text-xs">
                <span className="bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green px-2 py-1 rounded border border-lightTheme-green/30 dark:border-darkTheme-green/30 font-mono">
                  Astro
                </span>
                <span className="bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green px-2 py-1 rounded border border-lightTheme-green/30 dark:border-darkTheme-green/30 font-mono">
                  React
                </span>
                <span className="bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green px-2 py-1 rounded border border-lightTheme-green/30 dark:border-darkTheme-green/30 font-mono">
                  TypeScript
                </span>
              </div>
            </div>
            <div className="text-xs text-lightTheme-text dark:text-darkTheme-text font-mono">
              © {currentYear} Franco Castro
            </div>
          </div>
        </div>

        {/* Terminal-style footer */}
        <div className="mt-8 pt-8 border-t border-lightTheme-text/10 dark:border-darkTheme-text/10">
          <div className="text-center">
            <div className="font-mono text-xs text-lightTheme-text dark:text-darkTheme-text">
              <span className="text-lightTheme-green dark:text-darkTheme-green">{'> '}</span>
              Thanks for visiting! Feel free to reach out if you'd like to collaborate.
              <span className="animate-pulse ml-1 text-lightTheme-green dark:text-darkTheme-green">|</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;