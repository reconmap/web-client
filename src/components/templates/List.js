import React from 'react'
import secureApiFetch from '../../services/api';
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';

const TemplatesList = ({ history }) => {
    useSetTitle('Projects templates');
    const [templates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST', })
            .then((response) => response.json())
            .then(() => { history.push('/projects'); });
    }

    const viewProject = (templateId) => {
        history.push(`/templates/${templateId}`);
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb path={history.location.pathname} />
                <button onClick={() => history.push('/templates/import')}>Import Template</button>
            </div>
            <h1>Project templates</h1>
            {!templates ? <Loading /> : templates.length === 0 ? <NoResults /> :
                <section className='flex flex-wrap gap-4'>
                    {templates.map((template, index) =>
                        <article className='card' onClick={() => viewProject(template.id)} key={index}>
                            <header>
                                <button onClick={() => cloneProject(template.id)} key={index} title="Create project using this template">Create project</button>
                            </header>
                            <h1>{template.name}</h1>
                            <footer>
                                <span className='text-red-600'>{template.num_tasks} tasks</span>
                            </footer>
                        </article>
                    )}
                </section>
            }
        </>
    )
}

export default TemplatesList
