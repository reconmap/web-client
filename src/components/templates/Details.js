import React from 'react'
import { Link } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import useDelete from '../../hooks/useDelete';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import { IconPlusCircle, IconX } from '../icons';
import BtnSecondary from '../ui/buttons/BtnSecondary';
import Title from '../ui/Title';

const TemplateDetails = ({ history, match }) => {
    useSetTitle('Projects templates');
    const [template, updateTemplate] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)

    const cloneProject = async (templateId) => {
        await secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST' })
        history.push('/projects')
    }

    const destroy = useDelete('/tasks/', updateTemplate);

    const handleGoBack = () => { history.goBack() }
    return (
        <>
            <Breadcrumb path={history.location.pathname} goBack={handleGoBack} />
            {(!template) ?
                <Loading /> :
                <>
                   <Title title={template.name} type='Project template'/>
                    <div className='my-3 flex space-x-2 '>
                        {/* <button onClick={() => cloneProject(template.id)}>Create project from template</button> */}
                        <BtnSecondary onClick={() => destroy(template.id)} ><IconX styling='mr-2'/>  Delete</BtnSecondary>
                        <BtnPrimary onClick={() => cloneProject(template.id)}><IconPlusCircle styling='mr-2'/> Create project from template</BtnPrimary>
                    </div>

                    <section className='grid lg:grid-cols-3 gap-4 my-4'>
                        <div className='card'>
                            <h2>Description</h2>
                            <p>{template.description}</p>
                        </div>
                    </section>
                    <section className='grid lg:grid-cols-3 gap-4 my-4'>
                        <article className='card'>
                            <h2>Tasks</h2>
                            <div className='flex flex-col gap-2 mb-2'>
                                <ol>
                                    {tasks && tasks.map((task, index) =>
                                        <li>
                                            <Link to={"/tasks/" + task.id}>{task.name}</Link>
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </article>
                    </section>
                </>}
        </>
    )
}

export default TemplateDetails