import type { SocialLink } from '@app';

interface FooterProps {
  name: string;
  links: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ name, links }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-on-surface/5 bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 pt-16 pb-24 md:pb-16 gap-8">
        <div className="font-label uppercase tracking-[0.1rem] text-[10px] text-on-surface/40">
          &copy;{currentYear} {name.toUpperCase()}. TODOS LOS DERECHOS RESERVADOS.
        </div>

        <div className="flex gap-8">
          {links.map((link) => {
            const isExternal = !link.url.startsWith('mailto:');
            return (
              <a
                key={link.label}
                href={link.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="font-label uppercase tracking-[0.1rem] text-[10px] text-on-surface/40 hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={link.label}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
