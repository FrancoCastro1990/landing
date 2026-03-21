import type { EditorFormProps } from '../EditableSection';
import type { ProjectItem } from '@app';
import ProjectItemsField from '../fields/ProjectItemsField';

interface ProjectsData {
  items: ProjectItem[];
}

const ProjectsEditorForm: React.FC<EditorFormProps<ProjectsData>> = ({ data, onChange }) => (
  <ProjectItemsField label="Proyectos" value={data.items} onChange={(items) => onChange({ ...data, items })} />
);

export default ProjectsEditorForm;
