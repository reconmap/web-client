import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import {IconUpload} from '../ui/Icons';
import PrimaryButton from '../ui/buttons/Primary';

const ImportForm = () => {

    const [projectsImported, setProjectsImported] = useState([]);
    const [importButtonDisabled, setImportButtonDisabled] = useState(true);

    const handleUploadClick = ev => {
        ev.preventDefault();

        const resultFileInput = document.getElementById('importFile');
        const formData = new FormData();
        formData.append('importFile', resultFileInput.files[0]);
        secureApiFetch('/system/data', {
            method: 'POST',
            body: formData
        })
            .then(resp => resp.json())
            .then(resp => {
                setProjectsImported(resp.projectsImported);
            })
            .catch(err => console.error(err));
    }

    const onImportFileChange = ev => {
        ev.preventDefault();
        const selectedFiles = ev.target.files;

        setImportButtonDisabled(selectedFiles.length === 0);
    }

    return (
        <div>
            <h3>Import system data</h3>
            <form>
                <label>
                    Select file
                    <input type="file" id="importFile" onChange={onImportFileChange} required/>
                </label>
                <PrimaryButton disabled={importButtonDisabled}
                               onClick={handleUploadClick}><IconUpload/> Import</PrimaryButton>
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

export default ImportForm;
