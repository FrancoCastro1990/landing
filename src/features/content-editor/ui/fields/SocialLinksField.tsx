import { useCallback } from 'react';
import type { SocialLink } from '@app';

interface SocialLinksFieldProps {
  label: string;
  value: SocialLink[];
  onChange: (value: SocialLink[]) => void;
}

const SocialLinksField: React.FC<SocialLinksFieldProps> = ({ label, value, onChange }) => {
  const handleChange = useCallback(
    (index: number, field: keyof SocialLink, fieldValue: string) => {
      const next = [...value];
      next[index] = { ...next[index], [field]: fieldValue };
      onChange(next);
    },
    [value, onChange]
  );

  const handleAdd = useCallback(() => {
    onChange([...value, { label: '', url: '' }]);
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
        {value.map((link, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={link.label}
              onChange={(e) => handleChange(i, 'label', e.target.value)}
              placeholder="Label"
              className="w-1/3 bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => handleChange(i, 'url', e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="px-2 text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Eliminar enlace ${i + 1}`}
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
        + Agregar enlace
      </button>
    </div>
  );
};

export default SocialLinksField;
