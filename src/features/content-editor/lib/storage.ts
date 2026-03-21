import type { HeadlinePart, StatItem, ExperienceItem, ProjectItem, SocialLink } from '@app';

const STORAGE_KEY = 'portfolio-content';
const EVENT_NAME = 'content-editor-update';

export type SectionKey = 'hero' | 'about' | 'experience' | 'projects' | 'contact';

export interface ContentOverrides {
  hero?: {
    headline: HeadlinePart[];
    label: string;
    bio: string;
  };
  about?: {
    sectionTitle: HeadlinePart[];
    bio: string[];
    stats: StatItem[];
    skills: string[];
  };
  experience?: {
    items: ExperienceItem[];
  };
  projects?: {
    items: ProjectItem[];
  };
  contact?: {
    headline: HeadlinePart[];
    email: string;
    socialLinks: SocialLink[];
  };
}

export function readSection<K extends SectionKey>(key: K): ContentOverrides[K] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: ContentOverrides = JSON.parse(raw);
    return data[key] ?? null;
  } catch {
    return null;
  }
}

export function writeSection<K extends SectionKey>(key: K, sectionData: ContentOverrides[K]): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data: ContentOverrides = raw ? JSON.parse(raw) : {};
    data[key] = sectionData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { section: key } }));
  } catch {
    // localStorage unavailable or full — fail silently
  }
}

export function resetSection(key: SectionKey): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data: ContentOverrides = JSON.parse(raw);
    delete data[key];
    if (Object.keys(data).length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { section: key } }));
  } catch {
    // fail silently
  }
}

export function resetAll(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { section: 'all' } }));
  } catch {
    // fail silently
  }
}

export { EVENT_NAME };
