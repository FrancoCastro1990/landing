interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <span className="font-label uppercase tracking-[0.2rem] text-[10px] text-on-surface-variant block mb-1.5">
      {label}
    </span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-surface-low border border-outline-variant/30 focus:border-primary text-on-surface font-body text-sm px-3 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </label>
);

export default TextField;
