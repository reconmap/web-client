import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import configuration from '../../Configuration';

class ProjectsList extends Component {
    state = {
        projects: []
    }

    componentDidMount() {
        document.title = 'Project List | Reconmap';
        
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
                <section className='flex flex-wrap gap-4'>
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
                    <article className='base base-project'>
                        <p className='base-desc'>{project.description}</p>
                        <h4 className='base-title mb-2 items-center flex justify-between text-white'>{project.name} {project.is_template === 1 && <i data-feather='clipboard' className=' text-xs opacity-50'/>}</h4>
                    </article>
                </Link>
}
export default ProjectsList
