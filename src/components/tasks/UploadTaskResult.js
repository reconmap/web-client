import React, { Component } from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb'
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

    handleGoBack(){ this.props.history.goBack() }
    render() {
        return (

            <div>
                <Breadcrumb path={this.props.history.location.pathname} goBack={()=>this.handleGoBack()}/>
                <h1 className='heading'>Task: Run port scanner </h1>
                <div className='flex items-start gap-4'>
                    <article className='card flex-1'>
                        <h3>Command</h3>
                        <code >
                            <pre className='whitespace-pre-wrap'>
                                nmap -v -O www.fom
                                nmap -v -O www.foa
                                nmap -v -O www.fas
                            </pre>
                        </code>
                    </article>
                    <article className='card flex-1'>
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