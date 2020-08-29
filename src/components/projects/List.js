import React from 'react'
import ProjectCard from './../badges/ProjectCard'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import CreateButton from './../ui/buttons/Create'
import Breadcrumb from '../ui/Breadcrumb';

const ProjectsList = ({ history }) => {
    useSetTitle('Projects');
    const [projects, updateProjects] = useFetch('/projects')
    const destroy = useDelete('/projects/', updateProjects);
    const handleCreateProject = () => {
        history.push('/projects/create')
    }
    return <div>
                <Breadcrumb path={history.location.pathname} />
                <div className='heading'>
                    <h1>Projects</h1>
                    <CreateButton onClick={handleCreateProject}>Create Project</CreateButton>
                </div>
                {!projects ? <Loading /> : projects.length === 0 ? <NoResults /> :
                    <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-end'>
                        {projects.map((project) =>
                            <ProjectCard project={project} destroy={destroy} key={project.id} />
                        )}
                    </section>}
            </div>
}


export default ProjectsList
