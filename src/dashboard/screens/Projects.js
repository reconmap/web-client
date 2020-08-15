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
            <ul>
                {
                    this.state.projects.map((project, index) =>
                        <li><Link key="{{index}}" to={`/dashboard/project/${project.id}`}>{project.name}</Link></li>
                    )
                }
            </ul>
        )
    }
}

export default Projects