import React, { Component } from 'react'
import configuration from '../../Configuration';
import ProjectBadge from './../badges/ProjectBadge'

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
                <div className='heading'>
                    <h1>Projects</h1>
                    <button ><i data-feather='plus' className='mr-2'/> Create Project</button>
                </div>
                <section className='flex flex-wrap gap-4'>
                    {
                        this.state.projects.map((project, index) =>
                            <ProjectBadge project={project}  key={project.id}/>
                        )
                    }
                </section>
            </div>
        )
    }
}


export default ProjectsList
