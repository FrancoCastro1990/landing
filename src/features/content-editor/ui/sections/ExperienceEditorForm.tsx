import type { EditorFormProps } from '../EditableSection';
import type { ExperienceItem } from '@app';
import ExperienceItemsField from '../fields/ExperienceItemsField';

interface ExperienceData {
  items: ExperienceItem[];
}

const ExperienceEditorForm: React.FC<EditorFormProps<ExperienceData>> = ({ data, onChange }) => (
  <ExperienceItemsField
    label="Experiencia"
    value={data.items}
    onChange={(items) => onChange({ ...data, items })}
  />
);

export default ExperienceEditorForm;
