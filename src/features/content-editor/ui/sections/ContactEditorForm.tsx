import type { EditorFormProps } from '../EditableSection';
import type { HeadlinePart, SocialLink } from '@app';
import HeadlinePartsField from '../fields/HeadlinePartsField';
import TextField from '../fields/TextField';
import SocialLinksField from '../fields/SocialLinksField';

interface ContactData {
  headline: HeadlinePart[];
  email: string;
  socialLinks: SocialLink[];
}

const ContactEditorForm: React.FC<EditorFormProps<ContactData>> = ({ data, onChange }) => (
  <div className="flex flex-col gap-4">
    <HeadlinePartsField
      label="Titulo"
      value={data.headline}
      onChange={(headline) => onChange({ ...data, headline })}
    />
    <TextField label="Email" value={data.email} onChange={(email) => onChange({ ...data, email })} />
    <SocialLinksField
      label="Redes sociales"
      value={data.socialLinks}
      onChange={(socialLinks) => onChange({ ...data, socialLinks })}
    />
  </div>
);

export default ContactEditorForm;
