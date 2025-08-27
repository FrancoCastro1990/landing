import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'solid';
  size?: 'sm' | 'md';
  className?: string;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '',
  style
}) => {
  const baseClasses = "inline-flex items-center rounded transition-colors duration-300";
  
  const variantClasses = {
    default: "bg-lightTheme-green/10 dark:bg-darkTheme-green/10 text-lightTheme-green dark:text-darkTheme-green border border-lightTheme-green/30 dark:border-darkTheme-green/30 hover:bg-lightTheme-green/20 dark:hover:bg-darkTheme-green/20",
    outline: "border border-lightTheme-green dark:border-darkTheme-green text-lightTheme-green dark:text-darkTheme-green hover:bg-lightTheme-green/10 dark:hover:bg-darkTheme-green/10",
    solid: "bg-lightTheme-green text-lightTheme-bg dark:bg-darkTheme-green dark:text-darkTheme-bg hover:bg-lightTheme-blue dark:hover:bg-darkTheme-blue"
  };
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Badge;