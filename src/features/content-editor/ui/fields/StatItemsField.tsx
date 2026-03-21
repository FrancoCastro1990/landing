import { useCallback } from 'react';
import type { StatItem } from '@app';

interface StatItemsFieldProps {
  label: string;
  value: StatItem[];
  onChange: (value: StatItem[]) => void;
}

const StatItemsField: React.FC<StatItemsFieldProps> = ({ label, value, onChange }) => {
  const handleChange = useCallback(
    (index: number, field: keyof StatItem, fieldValue: string | number | boolean) => {
      const next = [...value];
      next[index] = { ...next[index], [field]: fieldValue };
      onChange(next);
    },
    [value, onChange]
  );

  const handleAdd = useCallback(() => {
    onChange([...value, { value: 0, suffix: '', label: '' }]);
  }, [value, onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  return (
    <div>
      <span className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant block mb-2">
        {label}
      </span>
      <div className="flex flex-col gap-3">
        {value.map((stat, i) => (
          <div key={i} className="border border-outline-variant/20 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
                Stat {i + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Eliminar stat ${i + 1}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant block mb-1">
                  Valor
                </span>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => handleChange(i, 'value', Number(e.target.value))}
                  className="w-full bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant block mb-1">
                  Sufijo
                </span>
                <input
                  type="text"
                  value={stat.suffix}
                  onChange={(e) => handleChange(i, 'suffix', e.target.value)}
                  placeholder="+"
                  className="w-full bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
              <label className="block col-span-2">
                <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant block mb-1">
                  Etiqueta
                </span>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleChange(i, 'label', e.target.value)}
                  placeholder="Descripcion..."
                  className="w-full bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        + Agregar stat
      </button>
    </div>
  );
};

export default StatItemsField;
