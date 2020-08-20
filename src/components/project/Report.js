import React, { Component } from 'react'
import secureApiFetch from '../../services/api';
import configuration from '../../Configuration';
import './Report.css';

class ProjectReport extends Component {

    state = {
        project: null
    }

    handleExport() {
        fetch(`${configuration.api.baseUrl}/projects/1/report?format=pdf`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                var contentDispositionHeader = response.headers.get('Content-Disposition');
                var filename = contentDispositionHeader.split('filename=')[1].split(';')[0];
                return Promise.all([response.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const filename = values[1];
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
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
                <div className='heading'>
                    <h2>{this.state.project.name}</h2>
                    <button onClick={this.handleExport}><i data-feather='plus' className='mr-2' /> Export to PDF</button>
                </div>
                <div className='text-sm mx-auto max-w-xl rounded overflow-hidden shadow my-4' id="report"></div>
            </>
        )
    }
}

export default ProjectReport
