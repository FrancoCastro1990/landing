import { Fragment } from 'react';
import Reveal from '@shared/ui/Reveal';
import type { HeadlinePart, SocialLink } from '@app';

interface ContactProps {
  headline: HeadlinePart[];
  email: string;
  socialLinks: SocialLink[];
}

const Contact: React.FC<ContactProps> = ({ headline, email, socialLinks }) => {
  return (
    <section id="contact" className="py-40 px-8 lg:px-24 bg-surface-lowest">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="font-label uppercase tracking-[0.4rem] text-xs text-primary mb-8">
            Contacto
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-headline italic text-6xl md:text-8xl text-on-surface mb-16 leading-tight">
            {headline.map((part, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                {part.accent ? (
                  <span className="text-on-surface-variant underline decoration-primary/30 underline-offset-8">
                    {part.text}
                  </span>
                ) : (
                  part.text
                )}
              </Fragment>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col items-center gap-12">
            <a
              className="group relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-surface-lowest"
              href={`mailto:${email}`}
            >
              <span className="font-headline italic text-xl sm:text-3xl md:text-5xl text-on-surface transition-colors group-hover:text-primary break-all">
                {email}
              </span>
              <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
            </a>

            <div className="flex gap-12 items-center pt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-lowest"
                  aria-label={link.label}
                >
                  <span className="font-label uppercase tracking-widest text-[10px]">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
