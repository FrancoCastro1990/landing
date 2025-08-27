interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => {
  return (
    <h2 className={`text-3xl md:text-4xl font-mono text-lightTheme-green dark:text-darkTheme-green mb-6 ${className}`}>
      <span className="text-lightTheme-text/60 dark:text-darkTheme-text/60 text-base mr-2">{'# '}</span>
      {children}
    </h2>
  );
};

export default SectionTitle;