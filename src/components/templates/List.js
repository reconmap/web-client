import React from 'react'
import secureApiFetch from '../../services/api';
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import ProjectBadge from '../badges/ProjectBadge';
import useDelete from '../../hooks/useDelete';
import BadgeOutline from '../badges/BadgeOutline';
import {IconPlus} from '../icons';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import CreateButton from '../ui/buttons/Create';
import DeleteButton from "../ui/buttons/Delete";

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
                <Breadcrumb path={history.location.pathname}/>
                <CreateButton onClick={() => history.push('/import-export')}>Import template(s)</CreateButton>
            </div>
            {!templates ? <Loading/> : templates.length === 0 ? <NoResults/> :
                <table className='w-full'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Number of tasks</th>
                        <th>Creation date/time</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {templates.map((template) =>
                        <tr key={template.id} onClick={() => viewProject(template.id)}>
                            <td><ProjectBadge project={template}/></td>
                            <td width='30%'><small>{template.description}</small></td>
                            <td><BadgeOutline>{template.num_tasks}</BadgeOutline></td>
                            <td><small>{template.insert_ts}</small></td>
                            <td className=''>
                                <div className=' flex space-x-2'>
                                    <BtnPrimary size='xs' onClick={() => cloneProject(template.id)} key={template.id}
                                                title="Create project using this template"><IconPlus styling='mr-2'
                                                                                                     size={4}/> Create
                                        project</BtnPrimary>
                                    <DeleteButton onClick={() => destroy(template.id)}/>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>}
        </>
    )
}

export default TemplatesList
