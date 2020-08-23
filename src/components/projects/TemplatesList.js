import React from 'react'
import { useHistory } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import CreateButton from '../ui/buttons/Create';
// import useDelete from '../../hooks/useDelete';

const TemplatesList = () => {
    const history = useHistory()
    useSetTitle('Projects templates');
    const [templates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST', })
            .then((response) => response.json())
            .then(() => { history.push('/projects'); });
    }

    return (
        <>
            <div className='heading'>
                <h1>Project Templates</h1>
                <CreateButton>Create Template</CreateButton>
            </div>
            {!templates ? <Loading /> : templates.length === 0 ? <NoResults /> :
                <section className='flex flex-wrap gap-4'>
                    {templates.map((template, index) =>
                        <article className='base base-project' onClick={() => cloneProject(template.id)} key={index}>
                            <header>
                                <button href="project.html">Start from this</button>
                            </header>
                            <h1>{template.name}</h1>
                            <footer>
                                <span className='text-red-600'>3 tasks</span>
                                <span className='ml-2'>java</span>
                                <span className='ml-2'>local</span>
                            </footer>
                        </article>
                    )}
                </section>
            }
        </>
    )
}

export default TemplatesList
