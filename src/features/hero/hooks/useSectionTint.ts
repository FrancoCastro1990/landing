import { useState, useEffect } from 'react';

interface SectionConfig {
  id: string;
  bgClass: string;
}

const sections: SectionConfig[] = [
  { id: 'hero', bgClass: 'bg-lightTheme-bg dark:bg-darkTheme-bg' },
  { id: 'about', bgClass: 'bg-lightTheme-magenta/10 dark:bg-darkTheme-magenta/10' },
  { id: 'experience', bgClass: 'bg-lightTheme-green/10 dark:bg-darkTheme-green/10' },
  { id: 'projects', bgClass: 'bg-lightTheme-blue/10 dark:bg-darkTheme-blue/10' },
  { id: 'contact', bgClass: 'bg-lightTheme-yellow/10 dark:bg-darkTheme-yellow/10' },
];

/**
 * Hook that dynamically changes background tint based on current section
 * @returns Object with current section and background class
 */
export const useSectionTint = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is roughly in the center
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const section = sections.find(s => s.id === sectionId);
          if (section && sectionId !== currentSection) {
            setCurrentSection(sectionId);
          }
        }
      });
    }, observerOptions);

    // Find and observe all sections
    const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    
    // If hero doesn't have an id, find the first section and give it the hero id
    if (!document.getElementById('hero')) {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        heroSection.id = 'hero';
        sectionElements.push(heroSection);
      }
    }

    sectionElements.forEach(el => el && observer.observe(el));

    return () => {
      sectionElements.forEach(el => el && observer.unobserve(el));
    };
  }, [currentSection, mounted]);

  const currentBgClass = sections.find(s => s.id === currentSection)?.bgClass || sections[0].bgClass;

  return {
    mounted,
    currentSection,
    currentBgClass,
  };
};