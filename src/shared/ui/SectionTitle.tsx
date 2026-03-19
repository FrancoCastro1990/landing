interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
}) => {
  return (
    <h2
      className={`font-headline italic text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter text-on-surface ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
