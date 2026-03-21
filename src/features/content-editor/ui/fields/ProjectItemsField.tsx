import { useState, useCallback } from 'react';
import type { ProjectItem } from '@app';
import TextField from './TextField';
import TextAreaField from './TextAreaField';
import StringListField from './StringListField';

interface ProjectItemsFieldProps {
  label: string;
  value: ProjectItem[];
  onChange: (value: ProjectItem[]) => void;
}

const ProjectItemsField: React.FC<ProjectItemsFieldProps> = ({ label, value, onChange }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleChange = useCallback(
    (index: number, field: keyof ProjectItem, fieldValue: string | string[]) => {
      const next = [...value];
      next[index] = { ...next[index], [field]: fieldValue };
      onChange(next);
    },
    [value, onChange]
  );

  const handleAdd = useCallback(() => {
    onChange([...value, { title: '', description: '', technologies: [] }]);
    setExpandedIndex(value.length);
  }, [value, onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
      setExpandedIndex(null);
    },
    [value, onChange]
  );

  return (
    <div>
      <span className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant block mb-2">
        {label}
      </span>
      <div className="flex flex-col gap-2">
        {value.map((item, i) => (
          <div key={i} className="border border-outline-variant/20">
            <button
              type="button"
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-surface-low/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
            >
              <span className="font-body text-sm text-on-surface">
                {item.title || `Proyecto ${i + 1}`}
              </span>
              <svg
                className={`w-4 h-4 text-on-surface-variant transition-transform duration-300 ${expandedIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedIndex === i && (
              <div className="px-3 pb-3 flex flex-col gap-3 border-t border-outline-variant/10">
                <div className="pt-3">
                  <TextField label="Titulo" value={item.title} onChange={(v) => handleChange(i, 'title', v)} />
                </div>
                <TextAreaField
                  label="Descripcion"
                  value={item.description}
                  onChange={(v) => handleChange(i, 'description', v)}
                  rows={2}
                />
                <StringListField
                  label="Tecnologias"
                  value={item.technologies}
                  onChange={(v) => handleChange(i, 'technologies', v)}
                  placeholder="Tecnologia..."
                />
                <TextField
                  label="GitHub URL"
                  value={item.githubUrl ?? ''}
                  onChange={(v) => handleChange(i, 'githubUrl', v)}
                  placeholder="https://github.com/..."
                />
                <TextField
                  label="Live URL"
                  value={item.liveUrl ?? ''}
                  onChange={(v) => handleChange(i, 'liveUrl', v)}
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="self-end font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        + Agregar proyecto
      </button>
    </div>
  );
};

export default ProjectItemsField;
