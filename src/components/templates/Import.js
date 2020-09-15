import React, { Component } from 'react'
import secureApiFetch from '../../services/api';
import { IconUpload } from '../icons';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';
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

                <Title type='Import Template' title='Upload XML'/>
                <form className='flex flex-col space-y-2'>
                    <input type="file" id="importFile" />
                    <BtnPrimary onClick={this.handleUploadClick}><IconUpload styling='mr-2'/> Upload XML</BtnPrimary>
                </form>
            </div>


        )
    }
}

export default ImportTemplate
