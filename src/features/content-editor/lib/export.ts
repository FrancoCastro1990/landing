import { portfolioData } from '@app';
import type { PortfolioData } from '@app';
import { readSection } from './storage';

export function getMergedPortfolioData(): PortfolioData {
  const result: PortfolioData = structuredClone(portfolioData);

  const heroOverrides = readSection('hero');
  if (heroOverrides) {
    result.hero = { ...result.hero, ...heroOverrides };
  }

  const aboutOverrides = readSection('about');
  if (aboutOverrides) {
    result.about = { ...result.about, ...aboutOverrides };
  }

  const experienceOverrides = readSection('experience');
  if (experienceOverrides) {
    result.experience = { ...result.experience, ...experienceOverrides };
  }

  const projectsOverrides = readSection('projects');
  if (projectsOverrides) {
    result.projects = { ...result.projects, ...projectsOverrides };
  }

  const contactOverrides = readSection('contact');
  if (contactOverrides) {
    const { email, socialLinks, ...contactFields } = contactOverrides;
    result.contact = { ...result.contact, ...contactFields };
    if (email) result.personal = { ...result.personal, email };
    if (socialLinks) result.personal = { ...result.personal, socialLinks };
  }

  return result;
}
