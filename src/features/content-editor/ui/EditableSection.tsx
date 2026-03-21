import { useState, useCallback, type ReactNode, type ComponentType } from 'react';
import { writeSection, resetSection, type SectionKey } from '../lib/storage';
import EditorModal from './EditorModal';

export interface EditorFormProps<T> {
  data: T;
  onChange: (data: T) => void;
}

interface EditableSectionProps<T> {
  sectionKey: SectionKey;
  sectionLabel: string;
  defaultData: T;
  currentData: T;
  formComponent: ComponentType<EditorFormProps<T>>;
  children: ReactNode;
}

function EditableSection<T>({
  sectionKey,
  sectionLabel,
  defaultData,
  currentData,
  formComponent: FormComponent,
  children,
}: EditableSectionProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<T>(currentData);

  const handleOpen = useCallback(() => {
    setDraft(currentData);
    setIsOpen(true);
  }, [currentData]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    writeSection(sectionKey, draft as Parameters<typeof writeSection>[1]);
    setIsOpen(false);
  }, [sectionKey, draft]);

  const handleReset = useCallback(() => {
    resetSection(sectionKey);
    setDraft(defaultData);
    setIsOpen(false);
  }, [sectionKey, defaultData]);

  return (
    <div className="relative group">
      {children}

      {/* Edit button — visible on hover (desktop) or subtle on mobile */}
      <button
        onClick={handleOpen}
        className="absolute top-4 right-4 z-40 px-3 py-1.5 bg-surface-container/90 backdrop-blur-sm border border-outline-variant/30 hover:border-primary text-on-surface-variant hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-30 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={`Editar seccion ${sectionLabel}`}
      >
        <span className="font-label uppercase tracking-[0.2rem] text-[10px] flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
            />
          </svg>
          Editar
        </span>
      </button>

      <EditorModal
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        onReset={handleReset}
        title={sectionLabel}
      >
        <FormComponent data={draft} onChange={setDraft} />
      </EditorModal>
    </div>
  );
}

export default EditableSection;
