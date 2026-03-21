import { useState, useCallback } from 'react';
import type { SocialLink } from '@app';
import { getMergedPortfolioData, ImportModal } from '@features/content-editor';

interface FooterProps {
  name: string;
  links: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ name, links }) => {
  const currentYear = new Date().getFullYear();
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [importOpen, setImportOpen] = useState(false);

  const handleExport = useCallback(async () => {
    try {
      const data = getMergedPortfolioData();
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState('idle'), 2000);
  }, []);

  const buttonLabel =
    copyState === 'copied' ? 'COPIADO!' : copyState === 'error' ? 'ERROR' : 'EXPORTAR';

  return (
    <footer className="w-full border-t border-on-surface/5 bg-surface/80">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 pt-16 pb-24 md:pb-16 gap-8">
        <div className="font-label uppercase tracking-[0.1rem] text-[10px] text-on-surface/40">
          &copy;{currentYear} {name.toUpperCase()}. TODOS LOS DERECHOS RESERVADOS.
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setImportOpen(true)}
            className="font-label uppercase tracking-[0.1rem] text-[10px] text-on-surface/40 hover:text-on-surface transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Importar datos del portafolio"
          >
            IMPORTAR
          </button>
          <button
            onClick={handleExport}
            className={`font-label uppercase tracking-[0.1rem] text-[10px] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              copyState === 'copied'
                ? 'text-primary'
                : copyState === 'error'
                  ? 'text-red-400'
                  : 'text-on-surface/40 hover:text-on-surface'
            }`}
            aria-label="Exportar datos del portafolio al portapapeles"
          >
            {buttonLabel}
          </button>

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
      <ImportModal isOpen={importOpen} onClose={() => setImportOpen(false)} />
    </footer>
  );
};

export default Footer;
