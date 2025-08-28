import React from 'react';

interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
  target?: '_blank' | '_self';
  rel?: string;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  href,
  children,
  icon,
  ariaLabel,
  target = '_blank',
  rel = 'noopener noreferrer',
  className = '',
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? rel : undefined}
      className={`inline-flex items-center gap-2 border border-lightTheme-green text-lightTheme-green dark:border-darkTheme-green dark:text-darkTheme-green bg-transparent font-semibold px-6 py-3 rounded focus:outline-none focus:ring-2 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-2 focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg font-mono transition-all duration-300 hover:bg-lightTheme-green hover:text-lightTheme-bg dark:hover:bg-darkTheme-green dark:hover:text-darkTheme-bg ${className}`}
      aria-label={ariaLabel}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{children}</span>
    </a>
  );
};

export default ActionButton;