import React, { Component } from 'react'
import { secureApiFetch } from '../../services/api';

class UploadTaskResult extends Component {

    componentDidMount() {
        document.title = 'Upload Task | Reconmap';
    }

    handleUploadClick() {
        var resultFileInput = document.getElementById('resultFile');
        var formData = new FormData;
        formData.append('resultFile', resultFileInput.files[0]);
        secureApiFetch('/tasks/results', {
            method: 'POST',
            body: formData
        })
        .then((response) => {
                console.dir(response);
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

                <form action="project.html">
                    <input type="file" id="resultFile" />
                    <button onClick={this.handleUploadClick}>Upload results</button>
                </form>
            </>
        )
    }
}

export default UploadTaskResult