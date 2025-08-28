import React from 'react';

interface SectionTitleWithShortcutProps {
  children: string;
  shortcut: string;
  className?: string;
}

const SectionTitleWithShortcut: React.FC<SectionTitleWithShortcutProps> = ({ 
  children, 
  shortcut,
  className = ""
}) => {
  const renderTitleWithShortcut = (title: string, shortcutLetter: string) => {
    const index = title.toLowerCase().indexOf(shortcutLetter.toLowerCase());
    if (index === -1) return title;
    
    return (
      <>
        {title.slice(0, index)}
        <span className="relative">
          {title.slice(index, index + 1)}
          <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-lightTheme-green dark:bg-darkTheme-green"></span>
        </span>
        {title.slice(index + 1)}
      </>
    );
  };

  return (
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-lightTheme-text dark:text-darkTheme-text mb-4 font-mono ${className}`}>
      {renderTitleWithShortcut(children, shortcut)}
    </h2>
  );
};

export default SectionTitleWithShortcut;