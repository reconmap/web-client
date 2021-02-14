import React, { useState } from 'react';
import secureApiFetch from '../../services/api';
import PrimaryButton from '../ui/buttons/Primary';
import { IconUpload } from '../ui/Icons';

const ImportForm = () => {

    const [importResponse, setImportResponse] = useState([]);
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
                setImportResponse(resp);
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
                <p>
                    Notes:
                    <ul>
                        <li>Everything on the file will be attempted to be imported.</li>
                        <li>If there is an error the import process will continue resulting on a partial import.</li>
                        <li>If there are missing attributes, Reconmap will attempt to use defaults instead.</li>
                    </ul>
                </p>
                <label>
                    Select file
                    <input type="file" id="importFile" onChange={onImportFileChange} required accept=".json,.js,application/json,text/json" />
                </label>
                <PrimaryButton disabled={importButtonDisabled}
                    onClick={handleUploadClick}><IconUpload /> Import</PrimaryButton>
            </form>

            {importResponse.length > 0 &&
                <div>
                    <h4>Import finished!</h4>

                    <p>The number of imports per category are:</p>
                    <ul>
                        {importResponse.map(entityResult => {
                            return <li>{entityResult.count} {entityResult.name} ({entityResult.errors.length} errors)</li>
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}

export default ImportForm;
