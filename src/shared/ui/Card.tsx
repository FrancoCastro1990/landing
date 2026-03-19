interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const baseClasses = 'transition-all duration-300';

  const variantClasses = {
    default: 'bg-surface-container p-8',
    elevated: 'bg-surface-high p-8',
    outlined: 'bg-transparent p-8 border border-outline-variant/15',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
