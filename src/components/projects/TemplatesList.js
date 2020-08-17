import React, { Component } from 'react'
import configuration from '../../Configuration';

class TemplatesList extends Component {
    state = {
        templates: []
    }

    componentDidMount() {
        document.title = 'Project templates | ReconMap';

        fetch(`${configuration.api.baseUrl}/projects?isTemplate=1`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((data) => this.setState({ templates: data }));
    }

    render() {
        return (
            <>
                <h2>Project templates</h2>

                <div>
                    <a href="create-project.html">Create template</a>
                </div>

                {
                    this.state.templates.map((template, index) => 
                        <div key={index}>
                        <h3>{template.name}</h3><p>3 tasks</p>
                        <span>java</span> <span>local</span><br />
                        <a href="project.html">Create project using template</a> | <a href="clone.html">Clone</a>
                        </div>    
                    )
                }
            </>
        )
    }
}

export default TemplatesList
