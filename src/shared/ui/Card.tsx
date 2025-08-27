interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'highlight' | 'terminal';
  showHeader?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  variant = 'default',
  showHeader = false 
}) => {
  const baseClasses = "rounded-lg transition-all duration-300";
  
  const variantClasses = {
    default: "p-6 bg-lightTheme-bg/80 dark:bg-darkTheme-bg/80 border border-lightTheme-green/20 dark:border-darkTheme-green/20",
    bordered: "p-6 bg-lightTheme-bg/90 dark:bg-darkTheme-bg/90 border border-lightTheme-green/30 dark:border-darkTheme-green/30",
    highlight: "p-6 bg-lightTheme-green/5 dark:bg-darkTheme-green/5 border border-lightTheme-green/40 dark:border-darkTheme-green/40",
    terminal: "bg-lightTheme-bg dark:bg-darkTheme-bg border border-lightTheme-text/20 dark:border-darkTheme-text/20 shadow-lg"
  };

  if (variant === 'terminal') {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {/* Terminal Header */}
        {showHeader && (
          <div className="flex items-center gap-2 px-4 py-3 bg-lightTheme-text/5 dark:bg-darkTheme-text/5 border-b border-lightTheme-text/10 dark:border-darkTheme-text/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-lightTheme-red dark:bg-darkTheme-red"></div>
              <div className="w-3 h-3 rounded-full bg-lightTheme-yellow dark:bg-darkTheme-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-lightTheme-green dark:bg-darkTheme-green"></div>
            </div>
            <div className="ml-2 text-xs font-mono text-lightTheme-text/60 dark:text-darkTheme-text/60">
              fcastro.dev@terminal:~
            </div>
          </div>
        )}
        
        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;