import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center px-3 py-1.5 text-xs font-label uppercase tracking-widest transition-colors duration-300';

  const variantClasses = {
    default: 'bg-surface-high text-on-surface border-l-2 border-primary',
    accent: 'bg-primary/10 text-primary border-l-2 border-primary',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
