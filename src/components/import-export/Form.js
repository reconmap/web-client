import React, {Component} from 'react'
import secureApiFetch from '../../services/api';
import {IconUpload} from '../icons';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';
import Breadcrumb from '../ui/Breadcrumb'

class ImportExportForm extends Component {

    constructor(props) {
        super(props)
        this.handleUploadClick = this.handleUploadClick.bind(this)

        this.state = {
            projectsImported: []
        }
    }

    componentDidMount() {
        document.title = 'Import/Export | Reconmap';
    }

    handleUploadClick(e) {
        e.preventDefault();

        const resultFileInput = document.getElementById('importFile');
        const formData = new FormData();
        formData.append('importFile', resultFileInput.files[0]);
        secureApiFetch('/projects', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({projectsImported: response.projectsImported});
            })
            .catch((error) => console.log(error));
    }

    handleGoBack() {
        this.props.history.goBack()
    }

    render() {
        const projectsImported = this.state.projectsImported;
        return (
            <div>
                <Breadcrumb path={this.props.history.location.pathname} goBack={() => this.handleGoBack()}/>

                <form >
                    <Title type="System Utils" title="Import/Export"/>
                    <label>
                        Select file
                        <input type="file" id="importFile"/>
                    </label>
                    <BtnPrimary onClick={this.handleUploadClick}><IconUpload styling='mr-2'/> Import</BtnPrimary>
                </form>

                {projectsImported.length > 0 &&
                <>
                    <h2>{projectsImported.length} projects imported</h2>
                    <ul id="projectsImported">
                        {projectsImported.map((project, index) => <li>{project.name}</li>)}
                    </ul>
                </>
                }

            </div>
        )
    }
}

export default ImportExportForm
