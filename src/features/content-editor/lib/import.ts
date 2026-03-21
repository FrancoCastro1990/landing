import type { SectionKey } from './storage';
import { writeSection } from './storage';
import { importDataSchema } from './schemas';

export interface ImportResult {
  imported: SectionKey[];
  ignored: string[];
  errors: { path: string; message: string }[] | null;
}

const EDITABLE_SECTIONS: SectionKey[] = ['hero', 'about', 'experience', 'projects', 'contact'];

export function importPortfolioData(raw: unknown): ImportResult {
  // 1. Parse if string
  let data: unknown;
  if (typeof raw === 'string') {
    try {
      data = JSON.parse(raw);
    } catch {
      return { imported: [], ignored: [], errors: [{ path: '', message: 'JSON invalido' }] };
    }
  } else {
    data = raw;
  }

  // 2. Must be a non-null object
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return {
      imported: [],
      ignored: [],
      errors: [{ path: '', message: 'Se esperaba un objeto JSON' }],
    };
  }

  const obj = data as Record<string, unknown>;

  // 3. Empty object check
  if (Object.keys(obj).length === 0) {
    return {
      imported: [],
      ignored: [],
      errors: [{ path: '', message: 'No se encontraron secciones para importar' }],
    };
  }

  // 4. Detect format and normalize
  const ignored: string[] = [];
  const isPortfolioData = 'personal' in obj;

  if (isPortfolioData) {
    // Map personal.email and personal.socialLinks into contact
    const personal = obj.personal as Record<string, unknown> | undefined;
    const contact = (obj.contact as Record<string, unknown>) ?? {};

    if (personal) {
      const compositeContact: Record<string, unknown> = { ...contact };
      if (personal.email !== undefined) compositeContact.email = personal.email;
      if (personal.socialLinks !== undefined) compositeContact.socialLinks = personal.socialLinks;
      obj.contact = compositeContact;

      ignored.push('personal (email y redes sociales migrados a contacto)');
    }
  }

  // Collect ignored keys (works for both PortfolioData and ContentOverrides formats)
  for (const key of Object.keys(obj)) {
    if (!EDITABLE_SECTIONS.includes(key as SectionKey) && key !== 'personal') {
      ignored.push(key);
    }
  }

  // 5. Validate with Zod
  const result = importDataSchema.safeParse(obj);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      path: issue.path.join('.') || '',
      message: issue.message,
    }));
    return { imported: [], ignored, errors };
  }

  // 6. Write each present section
  const imported: SectionKey[] = [];
  const validated = result.data;

  for (const key of EDITABLE_SECTIONS) {
    const sectionData = validated[key];
    if (sectionData !== undefined) {
      writeSection(key, sectionData as Parameters<typeof writeSection>[1]);
      imported.push(key);
    }
  }

  // 7. Check if nothing was imported
  if (imported.length === 0) {
    return {
      imported: [],
      ignored,
      errors: [{ path: '', message: 'No se encontraron secciones editables para importar' }],
    };
  }

  return { imported, ignored, errors: null };
}
