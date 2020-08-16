import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Projects extends Component {
    state = {
        projects: []
    }

    componentDidMount() {
        fetch('http://localhost:8080/projects')
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
                    <ProjectLink project={{ name: 'Just a test', description: 'Culpa aute duis nisi exercitation culpa incididunt amet tempor aliquip qui cillum.', is_template:'0'}}/>
                    <ProjectLink project={{ name: 'Populating this view', description: 'Culpa aute duis nisi exercitation culpa incididunt amet tempor aliquip qui cillum.', is_template:'1'}}/>
                    <ProjectLink project={{ name: 'Example name for a project', description: 'Culpa aute duis nisi exercitation culpa incididunt amet tempor aliquip qui cillum.', is_template:'0'}}/>
                    <ProjectLink project={{ name: 'Just a test', description: 'Culpa aute duis nisi exercitation culpa incididunt amet tempor aliquip qui cillum.', is_template:'0'}}/>
                </section>
            </div>
        )
    }
}

const ProjectLink = ({project}) => {
    return     <Link to={`/dashboard/project/${project.id}`}>
                    <article className='base hover:border-red-600 border-2 border-transparent flex flex-col'>
                        <h4 className='mb-2 items-center flex justify-between text-white'>{project.name} {project.is_template==1 && <i className='fa fa-file-code text-xs opacity-50'/>}</h4>
                        <p className='text-gray-500 text-sm'>{project.description}</p>
                    </article>
                </Link>
}
export default Projects