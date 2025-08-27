interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'h3' | 'h4' | 'h5';
  terminal?: boolean;
}

const SubTitle: React.FC<SubTitleProps> = ({ 
  children, 
  className = "", 
  variant = 'h3',
  terminal = false 
}) => {
  const baseClasses = "font-semibold text-lightTheme-green dark:text-darkTheme-green";
  const terminalClasses = terminal ? "font-mono" : "";
  
  const sizeClasses = {
    h3: "text-xl",
    h4: "text-lg", 
    h5: "text-base"
  };

  const Component = variant;
  
  return (
    <Component className={`${baseClasses} ${sizeClasses[variant]} ${terminalClasses} ${className}`}>
      {children}
    </Component>
  );
};

export default SubTitle;