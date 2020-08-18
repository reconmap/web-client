import React, { Component } from 'react'
import { secureApiFetch } from '../../services/api';

class UploadTaskResult extends Component {

    constructor(props) {
        super(props)
        this.handleUploadClick = this.handleUploadClick.bind(this)
    }

    componentDidMount() {
        document.title = 'Upload Task | Reconmap';
    }

    handleUploadClick(e) {
        e.preventDefault();
        const taskId = this.props.match.params.id;

        var resultFileInput = document.getElementById('resultFile');
        var formData = new FormData;
        formData.append('resultFile', resultFileInput.files[0]);
        formData.append('taskId', taskId);
        secureApiFetch('/tasks/results', {
            method: 'POST',
            body: formData
        })
        .then((response) => {
                this.props.history.push('/dashboard/tasks/' + taskId);
        })
        .catch((error) => console.log(error));
    }

    render() {
        return (
            <>
                <h2>Task: Run port scanner </h2>

            Command:
                <code>
                    <pre>
                        nmap -v -O www.fom
                        nmap -v -O www.foa
                        nmap -v -O www.fas
                </pre>
                </code>

                <form>
                    <input type="file" id="resultFile" />
                    <button onClick={this.handleUploadClick}>Upload results</button>
                </form>
            </>
        )
    }
}

export default UploadTaskResult