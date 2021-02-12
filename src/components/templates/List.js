import { Link } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import secureApiFetch from '../../services/api';
import BadgeOutline from '../badges/BadgeOutline';
import ProjectBadge from '../badges/ProjectBadge';
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from '../ui/buttons/Create';
import DeleteButton from "../ui/buttons/Delete";
import PrimaryButton from "../ui/buttons/Primary";
import { IconDocumentDuplicate, IconPlus } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResults from "../ui/NoResults";
import Title from '../ui/Title';

const TemplatesList = ({ history }) => {
    useSetTitle('Projects templates');
    const [templates, updateTemplates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/projects/${data.projectId}/edit`);
            });
    }

    const viewProject = (templateId) => {
        history.push(`/templates/${templateId}`);
    }

    const destroy = useDelete('/projects/', updateTemplates);

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>

                <CreateButton onClick={() => history.push('/system/import-data')}>Import template(s)</CreateButton>
            </div>
            <Title title='Templates' icon={<IconDocumentDuplicate />} />
            {!templates ? <Loading /> :
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '190px' }}>Name</th>
                            <th>Description</th>
                            <th style={{ width: '16ch' }}>Number of tasks</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.length === 0 ?
                            <td colSpan="5"><NoResults /></td>
                            :
                            templates.map((template) =>
                                <tr key={template.id} onClick={() => viewProject(template.id)}>
                                    <td><ProjectBadge project={template} /></td>
                                    <td className='truncate'>{template.description}</td>
                                    <td><BadgeOutline>{template.num_tasks}</BadgeOutline></td>
                                    <td className='flex justify-end'>
                                        <PrimaryButton onClick={() => cloneProject(template.id)} key={template.id}
                                            title="Create project using this template"><IconPlus />Create
                                        project</PrimaryButton>
                                        <DeleteButton onClick={() => destroy(template.id)} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default TemplatesList
