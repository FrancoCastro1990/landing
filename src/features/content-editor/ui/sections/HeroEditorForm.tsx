import type { EditorFormProps } from '../EditableSection';
import type { HeadlinePart } from '@app';
import HeadlinePartsField from '../fields/HeadlinePartsField';
import TextField from '../fields/TextField';
import TextAreaField from '../fields/TextAreaField';

interface HeroData {
  headline: HeadlinePart[];
  label: string;
  bio: string;
}

const HeroEditorForm: React.FC<EditorFormProps<HeroData>> = ({ data, onChange }) => (
  <div className="flex flex-col gap-4">
    <HeadlinePartsField
      label="Titulo"
      value={data.headline}
      onChange={(headline) => onChange({ ...data, headline })}
    />
    <TextField label="Label" value={data.label} onChange={(label) => onChange({ ...data, label })} />
    <TextAreaField label="Bio" value={data.bio} onChange={(bio) => onChange({ ...data, bio })} rows={3} />
  </div>
);

export default HeroEditorForm;
