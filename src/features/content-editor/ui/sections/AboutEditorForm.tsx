import type { EditorFormProps } from '../EditableSection';
import type { HeadlinePart, StatItem } from '@app';
import HeadlinePartsField from '../fields/HeadlinePartsField';
import TextAreaField from '../fields/TextAreaField';
import StatItemsField from '../fields/StatItemsField';
import StringListField from '../fields/StringListField';

interface AboutData {
  sectionTitle: HeadlinePart[];
  bio: string[];
  stats: StatItem[];
  skills: string[];
}

const AboutEditorForm: React.FC<EditorFormProps<AboutData>> = ({ data, onChange }) => (
  <div className="flex flex-col gap-4">
    <HeadlinePartsField
      label="Titulo de seccion"
      value={data.sectionTitle}
      onChange={(sectionTitle) => onChange({ ...data, sectionTitle })}
    />
    <TextAreaField
      label="Bio"
      value={data.bio.join('\n\n')}
      onChange={(text) => onChange({ ...data, bio: text.split('\n\n').filter(Boolean) })}
      rows={5}
    />
    <StatItemsField label="Estadisticas" value={data.stats} onChange={(stats) => onChange({ ...data, stats })} />
    <StringListField
      label="Habilidades"
      value={data.skills}
      onChange={(skills) => onChange({ ...data, skills })}
      placeholder="Skill..."
    />
  </div>
);

export default AboutEditorForm;
