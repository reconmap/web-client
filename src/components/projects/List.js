import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import configuration from '../../Configuration';

class ProjectsList extends Component {
    state = {
        projects: []
    }

    componentDidMount() {
        fetch(`${configuration.api.baseUrl}/projects`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((projects) => this.setState({ projects: projects }));
    }

    render() {
        return (
            <div>
                <h1>Projects</h1>
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {
                        this.state.projects.map((project, index) =>
                            <ProjectLink project={project}  key={project.id}/>
                        )
                    }
                </section>
            </div>
        )
    }
}

const ProjectLink = ({project}) => {
    return     <Link to={`/dashboard/project/${project.id}`}>
                    <article className='base hover:border-red-600 border-2 border-transparent flex flex-col'>
                        <h4 className='mb-2 items-center flex justify-between text-white'>{project.name} {project.is_template === 1 && <i data-feather='clipboard' className=' text-xs opacity-50'/>}</h4>
                        <p className='text-gray-500 text-sm'>{project.description}</p>
                    </article>
                </Link>
}
export default ProjectsList