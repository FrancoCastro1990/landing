export interface SocialLink {
  label: string;
  url: string;
}

export interface HeadlinePart {
  text: string;
  accent?: boolean;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  accentValue?: boolean;
  colSpan?: number;
}

export interface ExperienceItem {
  year: string;
  position: string;
  company: string;
  period: string;
  highlights: string[];
  skills: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    brandName: string;
    email: string;
    title: string;
    siteUrl: string;
    socialLinks: SocialLink[];
  };
  hero: {
    headline: HeadlinePart[];
    label: string;
    bio: string;
  };
  about: {
    sectionTitle: HeadlinePart[];
    bio: string[];
    stats: StatItem[];
    skills: string[];
  };
  experience: {
    items: ExperienceItem[];
  };
  projects: {
    items: ProjectItem[];
  };
  contact: {
    headline: HeadlinePart[];
  };
  navigation: {
    items: NavItem[];
  };
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
}
