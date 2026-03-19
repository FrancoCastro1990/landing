import React from 'react';

interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
  target?: '_blank' | '_self';
  rel?: string;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  href,
  children,
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
      className={`group inline-flex items-center gap-4 font-label uppercase tracking-widest text-xs transition-colors duration-300 ${className}`}
      aria-label={ariaLabel}
    >
      <span className="border-b border-primary/20 group-hover:border-primary pb-1 transition-colors">
        {children}
      </span>
      <svg
        className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
};

export default ActionButton;
