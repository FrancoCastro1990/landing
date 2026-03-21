interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, onChange, rows = 3, placeholder }) => (
  <label className="block">
    <span className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant block mb-1.5">
      {label}
    </span>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
    />
  </label>
);

export default TextAreaField;
