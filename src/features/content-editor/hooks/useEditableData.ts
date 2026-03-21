import { useState, useEffect, useCallback } from 'react';
import { readSection, EVENT_NAME, type SectionKey } from '../lib/storage';

function deepMerge<T>(defaults: T, overrides: Partial<T>): T {
  if (
    defaults === null ||
    defaults === undefined ||
    typeof defaults !== 'object' ||
    Array.isArray(defaults)
  ) {
    return (overrides as T) ?? defaults;
  }

  const result = { ...defaults };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const overrideVal = overrides[key];
    if (overrideVal !== undefined) {
      result[key] = overrideVal as T[keyof T];
    }
  }
  return result;
}

export function useEditableData<T>(sectionKey: SectionKey, defaultData: T): T {
  const [data, setData] = useState<T>(defaultData);

  const syncFromStorage = useCallback(() => {
    const stored = readSection(sectionKey);
    if (stored) {
      setData(deepMerge(defaultData, stored as Partial<T>));
    } else {
      setData(defaultData);
    }
  }, [sectionKey, defaultData]);

  useEffect(() => {
    syncFromStorage();
  }, [syncFromStorage]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.section === sectionKey || detail?.section === 'all') {
        syncFromStorage();
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [sectionKey, syncFromStorage]);

  return data;
}
