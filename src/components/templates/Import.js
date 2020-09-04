import React, { Component } from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from './../ui/Breadcrumb'

class ImportTemplate extends Component {

    constructor(props) {
        super(props)
        this.handleUploadClick = this.handleUploadClick.bind(this)
    }

    componentDidMount() {
        document.title = 'Import Template | Reconmap';
    }

    handleUploadClick(e) {
        e.preventDefault();
        const taskId = this.props.match.params.id;

        var resultFileInput = document.getElementById('importFile');
        var formData = new FormData();
        formData.append('importFile', resultFileInput.files[0]);
        secureApiFetch('/projects', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                this.props.history.push('/tasks/' + taskId);
            })
            .catch((error) => console.log(error));
    }

    handleGoBack() { this.props.history.goBack() }
    render() {
        return (

            <div>
                <Breadcrumb path={this.props.history.location.pathname} goBack={() => this.handleGoBack()} />
                <h1 className='heading'>Import XML</h1>
                <div className='flex items-start gap-4'>
                    <article className='card flex-1'>
                        <h3>XML</h3>
                        <form>
                            <input type="file" id="importFile" />
                            <button onClick={this.handleUploadClick}>Upload XML</button>
                        </form>
                    </article>
                </div>
            </div>


        )
    }
}

export default ImportTemplate
