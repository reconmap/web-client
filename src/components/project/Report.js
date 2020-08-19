import React, { Component } from 'react'
import secureApiFetch from '../../services/api';
import configuration from '../../Configuration';
import './Report.css';

class ProjectReport extends Component {

    state = {
        project: null
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        secureApiFetch(`/projects/${id}`, {
            method: 'GET',
        })
            .then((responses) => responses.json())
            .then((data) => {
                const newState = { project: data };
                this.setState(newState)
                document.title = `Report ${newState.project.name} | Reconmap`;
            });
            secureApiFetch(`/projects/${id}/report`, {
                method: 'GET',
            })
                .then((responses) => responses.text())
                .then((data) => {
                    document.getElementById('report').innerHTML = data;
                });
            }
    render() {
        if (!this.state.project) {
            return 'Loading...'
        }
        return (
            <>
                <h2>{this.state.project.name}</h2>

                <div id="report" style={{width: '80%', backgroundColor: 'white', height: '500px', padding: '20px'}}></div>
            </>
        )
    }
}

export default ProjectReport
