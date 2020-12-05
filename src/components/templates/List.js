import secureApiFetch from '../../services/api';
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import Breadcrumb from '../ui/Breadcrumb';
import ProjectBadge from '../badges/ProjectBadge';
import useDelete from '../../hooks/useDelete';
import BadgeOutline from '../badges/BadgeOutline';
import {IconDocumentDuplicate, IconPlus} from '../ui/Icons';
import CreateButton from '../ui/buttons/Create';
import Title from '../ui/Title';
import BtnPrimary from "../ui/buttons/BtnPrimary";
import DeleteButton from "../ui/buttons/Delete";
import NoResults from "../ui/NoResults";

const TemplatesList = ({history}) => {
    useSetTitle('Projects templates');
    const [templates, updateTemplates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, {method: 'POST',})
            .then((response) => response.json())
            .then(() => {
                history.push('/projects');
            });
    }

    const viewProject = (templateId) => {
        history.push(`/templates/${templateId}`);
    }

    const destroy = useDelete('/projects/', updateTemplates);

    return (
        <>
            <div className='heading'>
                <Breadcrumb/>
                <CreateButton onClick={() => history.push('/system-data')}>Import template(s)</CreateButton>
            </div>
            <Title title='Templates' icon={<IconDocumentDuplicate/>}/>
            {!templates ? <Loading/> :
                <table>
                    <thead>
                    <tr>
                        <th style={{width: '190px'}}>Name</th>
                        <th>Description</th>
                        <th>Number of tasks</th>
                        <th>Creation date/time</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {templates.length === 0 ?
                        <td colSpan="5"><NoResults/></td>
                        :
                        templates.map((template) =>
                            <tr key={template.id} onClick={() => viewProject(template.id)}>
                                <td><ProjectBadge project={template}/></td>
                                <td width='30%'><small>{template.description}</small></td>
                                <td><BadgeOutline>{template.num_tasks}</BadgeOutline></td>
                                <td><small>{template.insert_ts}</small></td>
                                <td className="space-x-2 flex  justify-end">
                                    <BtnPrimary onClick={() => cloneProject(template.id)} key={template.id}
                                                title="Create project using this template"><IconPlus/>Create
                                        project</BtnPrimary>
                                    <DeleteButton onClick={() => destroy(template.id)}/>
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
