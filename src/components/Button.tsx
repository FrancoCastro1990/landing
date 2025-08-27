import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-semibold rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-lightTheme-green text-lightTheme-bg dark:bg-darkTheme-green dark:text-darkTheme-bg hover:bg-lightTheme-blue dark:hover:bg-darkTheme-blue focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg",
    secondary: "border border-lightTheme-green text-lightTheme-green dark:border-darkTheme-green dark:text-darkTheme-green bg-transparent hover:bg-lightTheme-green hover:text-lightTheme-bg dark:hover:bg-darkTheme-green dark:hover:text-darkTheme-bg focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg",
    ghost: "text-lightTheme-green dark:text-darkTheme-green hover:bg-lightTheme-green/10 dark:hover:bg-darkTheme-green/10 focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg",
    link: "text-lightTheme-green dark:text-darkTheme-green hover:text-lightTheme-blue dark:hover:text-darkTheme-blue underline-offset-4 hover:underline focus:ring-lightTheme-green dark:focus:ring-darkTheme-green focus:ring-offset-lightTheme-bg dark:focus:ring-offset-darkTheme-bg"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;