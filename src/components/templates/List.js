import React from 'react'
import secureApiFetch from '../../services/api';
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import ProjectBadge from '../badges/ProjectBadge';
import DeleteButton from '../ui/buttons/Delete';
import useDelete from '../../hooks/useDelete';

const TemplatesList = ({ history }) => {
    useSetTitle('Projects templates');
    const [templates, updateTemplates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST', })
            .then((response) => response.json())
            .then(() => { history.push('/projects'); });
    }

    const viewProject = (templateId) => {
        history.push(`/templates/${templateId}`);
    }

    const destroy = useDelete('/projects/', updateTemplates);

    return (
        <>
            <div className='heading'>
                <Breadcrumb path={history.location.pathname} />
                <button onClick={() => history.push('/templates/import')}>Import Template</button>
            </div>
            <h1>Project templates</h1>
            {!templates ? <Loading /> : templates.length === 0 ? <NoResults /> :
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Creation datetime</th>
                            <th>Number of tasks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) =>
                            <tr key={template.id} onClick={() => viewProject(template.id)}>
                                <td><ProjectBadge project={template} /></td>
                                <td><small className='text-gray-500'>{template.name}</small></td>
                                <td>{template.insert_ts}</td>
                                <td>{template.num_tasks}</td>
                                <td className='flex-col flex'>
                                    <button onClick={() => cloneProject(template.id)} key={template.id} title="Create project using this template">Create project</button>
                                    <DeleteButton onClick={() => destroy(template.id)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>}
        </>
    )
}

export default TemplatesList
