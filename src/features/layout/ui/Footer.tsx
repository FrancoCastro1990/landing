const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'GitHub', url: 'https://github.com/FrancoCastro1990' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/franco-castro-villanueva-035905174/' },
    { name: 'Email', url: 'mailto:franco.castro.villanueva.90@gmail.com' },
  ];

  return (
    <footer className="w-full border-t border-on-surface/5 bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 pt-16 pb-24 md:pb-16 gap-8">
        <div className="font-label uppercase tracking-[0.1rem] text-[10px] text-on-surface/40">
          &copy;{currentYear} FRANCO CASTRO. TODOS LOS DERECHOS RESERVADOS.
        </div>

        <div className="flex gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="font-label uppercase tracking-[0.1rem] text-[10px] text-on-surface/40 hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={link.name}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
