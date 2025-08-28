import { useSpring, animated } from '@react-spring/web';
import Reveal from '@shared/ui/Reveal';
import SectionTitleWithShortcut from '@shared/ui/SectionTitleWithShortcut';
import SubTitle from '@shared/ui/SubTitle';
import Card from '@shared/ui/Card';

const Contact: React.FC = () => {
  const emailAddress = 'franco.castro.villanueva.90@gmail.com';

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/FrancoCastro1990',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/franco-castro-villanueva-035905174/',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:franco.castro.villanueva.90@gmail.com',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16">
            <SectionTitleWithShortcut shortcut="C">Conectemos</SectionTitleWithShortcut>
            <p className="text-lightTheme-yellow dark:text-darkTheme-yellow max-w-2xl mx-auto mb-6">
              ¿Tienes ganas de charlar sobre desarrollo, intercambiar ideas o simplemente conectar? 
              Me encantaría conversar contigo sobre tecnología y proyectos.
            </p>
            <div className="w-20 h-1 bg-lightTheme-green dark:bg-darkTheme-green mx-auto"></div>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          <Reveal direction="up" delay={200}>
            <Card variant="terminal" showHeader={true}>
              <div className="mb-6 text-left">
                <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
                <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">cat /etc/passwd | grep franco</span>
              </div>
              
              <div className="mb-8 text-left">
                <p className="text-lightTheme-text dark:text-darkTheme-text leading-relaxed mb-6 font-mono text-sm">
                  Me apasiona conversar sobre desarrollo de software, arquitectura, buenas prácticas y las últimas 
                  tendencias tecnológicas. Si quieres intercambiar ideas, discutir soluciones técnicas o 
                  simplemente charlar sobre código, ¡será un placer conectar contigo!
                </p>
                
                <div className="bg-lightTheme-text/5 dark:bg-darkTheme-text/5 p-4 rounded border border-lightTheme-text/10 dark:border-darkTheme-text/10 mb-6">
                  <p className="text-lightTheme-green dark:text-darkTheme-green font-mono text-sm mb-2">
                    <span className="text-lightTheme-blue dark:text-darkTheme-blue"># </span>Contacto Directo:
                  </p>
                  <button
                    onClick={handleEmailClick}
                    className="text-lightTheme-text dark:text-darkTheme-text hover:text-lightTheme-green dark:hover:text-darkTheme-green transition-colors duration-300 font-mono text-sm underline decoration-lightTheme-green dark:decoration-darkTheme-green/50 hover:decoration-lightTheme-green"
                  >
                    {emailAddress}
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="mb-4 text-left">
                  <span className="text-lightTheme-green dark:text-darkTheme-green">$</span>
                  <span className="text-lightTheme-text dark:text-darkTheme-text ml-2 font-mono">ls -la /home/franco/social_links/</span>
                </div>
                <div className="flex justify-center gap-8">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.name !== 'Email' ? '_blank' : undefined}
                      rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="flex flex-col items-center gap-2 text-lightTheme-text dark:text-darkTheme-text hover:text-lightTheme-green dark:hover:text-darkTheme-green transition-colors duration-300 group"
                      aria-label={`Contactar vía ${link.name}`}
                    >
                      <div className="text-lightTheme-green dark:text-darkTheme-green group-hover:scale-110 transition-transform duration-300 p-3 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 rounded border border-lightTheme-text/10 dark:border-darkTheme-text/10">
                        {link.icon}
                      </div>
                      <span className="text-sm font-mono">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;