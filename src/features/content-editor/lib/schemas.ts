import { z } from 'zod';

export const headlinePartSchema = z.object({
  text: z.string(),
  accent: z.boolean().optional(),
});

export const socialLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const statItemSchema = z.object({
  value: z.number(),
  suffix: z.string(),
  label: z.string(),
  accentValue: z.boolean().optional(),
  colSpan: z.number().optional(),
});

export const experienceItemSchema = z.object({
  year: z.string(),
  position: z.string(),
  company: z.string(),
  period: z.string(),
  highlights: z.array(z.string()),
  skills: z.array(z.string()),
});

export const projectItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
});

export const heroSchema = z.object({
  headline: z.array(headlinePartSchema),
  label: z.string(),
  bio: z.string(),
});

export const aboutSchema = z.object({
  sectionTitle: z.array(headlinePartSchema),
  bio: z.array(z.string()),
  stats: z.array(statItemSchema),
  skills: z.array(z.string()),
});

export const experienceSchema = z.object({
  items: z.array(experienceItemSchema),
});

export const projectsSchema = z.object({
  items: z.array(projectItemSchema),
});

export const contactSchema = z.object({
  headline: z.array(headlinePartSchema),
  email: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
});

export const importDataSchema = z.object({
  hero: heroSchema.optional(),
  about: aboutSchema.optional(),
  experience: experienceSchema.optional(),
  projects: projectsSchema.optional(),
  contact: contactSchema.optional(),
}).passthrough();
