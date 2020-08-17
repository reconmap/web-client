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
                <h1>Projects</h1>
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
