import React, { Component } from 'react'
import secureApiFetch from '../../services/api';

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
        var formData = new FormData();
        formData.append('resultFile', resultFileInput.files[0]);
        formData.append('taskId', taskId);
        secureApiFetch('/tasks/results', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                this.props.history.push('/tasks/' + taskId);
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (

            <div>
                <h3 className='heading'>Task: Run port scanner </h3>
                <div className='flex items-start gap-4'>
                    <article className='base flex-1'>
                        <h3>Command</h3>
                        <code >
                            <pre className='whitespace-pre-wrap'>
                                nmap -v -O www.fom
                                nmap -v -O www.foa
                                nmap -v -O www.fas
                            </pre>
                        </code>
                    </article>
                    <article className='base flex-1'>
                        <h3>Results</h3>
                        <form>
                            <input type="file" id="resultFile" />
                            <button onClick={this.handleUploadClick}>Upload results</button>
                        </form>                
                    </article>
                </div>
            </div>


        )
    }
}

export default UploadTaskResult