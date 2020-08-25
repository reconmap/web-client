import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserBadge from '../badges/UserBadge';
import secureApiFetch from '../../services/api';
import DeleteButton from '../ui/buttons/Delete';
import Breadcrumb from '../ui/Breadcrumb';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import useDelete from '../../hooks/useDelete';

const TemplateDetails = ({history, match}) => {
    useSetTitle('Projects templates');
    const [template, updateTemplate] = useFetch(`/projects/${match.params.id}`)
    const [tasks] = useFetch(`/projects/${match.params.id}/tasks`)

    const cloneProject = async (templateId) => {
        await secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST'})
        history.push('/projects')
    }

    const destroy = useDelete('/tasks/', updateTemplate);

    if (!template) {
        return <Loading />
    }
    return (
        <>
            <Breadcrumb path={history.location.pathname} />
            <section className='heading' >
                <h1>{template.name}</h1>
                <div className='flex items-center justify-between gap-4'>
                    <button onClick={() => cloneProject(template.id)} title="Create project using this template">Create project</button>
                    <DeleteButton onClick={() => destroy(template.id)} />
                </div>
            </section>

            <section className='grid lg:grid-cols-3 gap-4 my-4'>
                <div className='base'>
                    <h2>Description</h2>
                    <p>{template.description}</p>
                </div>
            </section>
            <section className='grid lg:grid-cols-3 gap-4 my-4'>
                <article className='base'>
                    <h2>Tasks</h2>
                    <div className='flex flex-col gap-2 mb-2'>
                        {tasks && tasks.map((task, index) =>
                            <div className='flex flex-row items-center justify-start'>
                                <Link to={"/tasks/" + task.id}>{task.name}</Link>
                            </div>
                        )
                        }
                    </div>
                </article>
            </section>
        </>
)
}

export default TemplateDetails