import React, {Component} from 'react'
import secureApiFetch from '../../services/api';
import {IconUpload} from '../ui/Icons';
import PrimaryButton from '../ui/buttons/Primary';

class ImportForm extends Component {

    constructor(props) {
        super(props);
        this.handleUploadClick = this.handleUploadClick.bind(this);
        this.onImportFileChange = this.onImportFileChange.bind(this)

        this.state = {
            projectsImported: [],
            importButtonDisabled: true
        }
    }

    handleUploadClick(ev) {
        ev.preventDefault();

        const resultFileInput = document.getElementById('importFile');
        const formData = new FormData();
        formData.append('importFile', resultFileInput.files[0]);
        secureApiFetch('/system/data', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({projectsImported: response.projectsImported});
            })
            .catch((err) => console.error(err));
    }

    onImportFileChange(ev) {
        ev.preventDefault();
        const selectedFiles = ev.target.files;
        this.setState({importButtonDisabled: selectedFiles.length === 0});
    }

    render() {
        const projectsImported = this.state.projectsImported;
        const importButtonDisabled = this.state.importButtonDisabled;

        return (
            <div>
                <h3>Import system data</h3>
                <form>
                    <label>
                        Select file
                        <input type="file" id="importFile" onChange={this.onImportFileChange} required/>
                    </label>
                    <PrimaryButton disabled={importButtonDisabled}
                                   onClick={this.handleUploadClick}><IconUpload/> Import</PrimaryButton>
                </form>

                {projectsImported.length > 0 &&
                <>
                    <h2>{projectsImported.length} projects imported</h2>
                    <ul id="projectsImported">
                        {projectsImported.map((project, index) => <li key={index}>{project.name}</li>)}
                    </ul>
                </>
                }

            </div>
        )
    }
}

export default ImportForm
