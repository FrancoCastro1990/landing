import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

interface BaseLinkProps {
  children: ReactNode;
  variant?: 'default' | 'ghost' | 'underline';
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
  const baseClasses = "transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg rounded";
  
  const variantClasses = {
    default: "text-lightTheme-green dark:text-darkTheme-green hover:text-lightTheme-blue dark:hover:text-darkTheme-blue",
    ghost: "text-lightTheme-magenta dark:text-darkTheme-magenta hover:text-lightTheme-green dark:hover:text-darkTheme-green",
    underline: "text-lightTheme-green dark:text-darkTheme-green hover:text-lightTheme-blue dark:hover:text-darkTheme-blue underline-offset-4 hover:underline"
  };
  
  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  if ('href' in props) {
    const { href, external, ...anchorProps } = props;
    return (
      <a 
        href={href}
        className={combinedClassName}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }
  
  const { onClick, external, ...buttonProps } = props;
  return (
    <button 
      className={combinedClassName}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Link;