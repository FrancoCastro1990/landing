import type { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  onLogoClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  clickable = false,
  onLogoClick,
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg", 
    lg: "text-xl"
  };
  
  const baseClasses = `font-mono font-bold text-lightTheme-green dark:text-darkTheme-green ${sizeClasses[size]}`;
  
  const content = <div className={`${baseClasses} ${className}`} {...props}>{'<FCastro.dev />'}</div>;
  
  if (clickable && onLogoClick) {
    return (
      <button
        onClick={onLogoClick}
        className="transition-colors duration-300 hover:text-lightTheme-blue dark:hover:text-darkTheme-blue focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg rounded"
        aria-label="Go to top"
      >
        {content}
      </button>
    );
  }
  
  return content;
};

export default Logo;