import { useCallback } from 'react';
import type { HeadlinePart } from '@app';

interface HeadlinePartsFieldProps {
  label: string;
  value: HeadlinePart[];
  onChange: (value: HeadlinePart[]) => void;
}

const HeadlinePartsField: React.FC<HeadlinePartsFieldProps> = ({ label, value, onChange }) => {
  const handleTextChange = useCallback(
    (index: number, text: string) => {
      const next = [...value];
      next[index] = { ...next[index], text };
      onChange(next);
    },
    [value, onChange]
  );

  const handleAccentToggle = useCallback(
    (index: number) => {
      const next = [...value];
      next[index] = { ...next[index], accent: !next[index].accent };
      onChange(next);
    },
    [value, onChange]
  );

  const handleAdd = useCallback(() => {
    onChange([...value, { text: '' }]);
  }, [value, onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  return (
    <div>
      <span className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant block mb-1.5">
        {label}
      </span>
      <div className="flex flex-col gap-2">
        {value.map((part, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              value={part.text}
              onChange={(e) => handleTextChange(i, e.target.value)}
              placeholder="Texto..."
              className="flex-1 bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => handleAccentToggle(i)}
              className={`px-2 py-1.5 border text-[10px] font-label uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                part.accent
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
              aria-label={`${part.accent ? 'Quitar' : 'Agregar'} acento a "${part.text}"`}
            >
              Acento
            </button>
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="px-2 text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Eliminar parte ${i + 1}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        + Agregar linea
      </button>
    </div>
  );
};

export default HeadlinePartsField;
