import React from 'react'
import ProjectCard from './../badges/ProjectCard'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import CreateButton from './../ui/buttons/Create'

const ProjectsList = () => {
    useSetTitle('Projects');
    const [projects, updateProjects, error] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);

    return <div>
            <div className='heading'>
                <h1>Projects</h1>
                <CreateButton>Create Project</CreateButton>
            </div>
            { !projects ? <Loading /> : projects.length === 0 ? <NoResults /> :
            <section className='flex flex-wrap gap-4'>
                { projects.map((project) =>
                    <ProjectCard project={project} destroy={destroy} key={project.id}/>
                ) }
            </section>}
        </div>
}


export default ProjectsList
