import React, {Component} from 'react'
import secureApiFetch from '../../services/api';
import {IconUpload} from '../ui/Icons';
import BtnPrimary from '../ui/buttons/BtnPrimary';

class ImportForm extends Component {

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

    handleGoBack() {
        this.props.history.goBack()
    }

    render() {
        const projectsImported = this.state.projectsImported;
        return (
            <div>
                <h3>Import system data</h3>
                <form>
                    <label>
                        Select file
                        <input type="file" id="importFile" required/>
                    </label>
                    <BtnPrimary onClick={this.handleUploadClick}><IconUpload/> Import</BtnPrimary>
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
