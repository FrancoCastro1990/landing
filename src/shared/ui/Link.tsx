import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface BaseLinkProps {
  children: ReactNode;
  variant?: 'default' | 'underline';
  className?: string;
}

interface ExternalLinkProps extends BaseLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string;
  external?: true;
}

interface InternalLinkProps extends BaseLinkProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  onClick: () => void;
  external?: false;
}

type LinkProps = ExternalLinkProps | InternalLinkProps;

const Link: React.FC<LinkProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses =
    'transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-lowest';

  const variantClasses = {
    default: 'text-on-surface-variant hover:text-primary',
    underline: 'text-on-surface hover:text-primary border-b border-primary/20 hover:border-primary pb-1',
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ('href' in props) {
    const { href, external, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={combinedClassName}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { onClick, external, ...buttonProps } = props;
  return (
    <button className={combinedClassName} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  );
};

export default Link;
