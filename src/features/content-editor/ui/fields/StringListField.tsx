import { useCallback } from 'react';

interface StringListFieldProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const StringListField: React.FC<StringListFieldProps> = ({ label, value, onChange, placeholder }) => {
  const handleItemChange = useCallback(
    (index: number, text: string) => {
      const next = [...value];
      next[index] = text;
      onChange(next);
    },
    [value, onChange]
  );

  const handleAdd = useCallback(() => {
    onChange([...value, '']);
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
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-1.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="px-2 text-on-surface-variant hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Eliminar elemento ${i + 1}`}
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
        + Agregar
      </button>
    </div>
  );
};

export default StringListField;
