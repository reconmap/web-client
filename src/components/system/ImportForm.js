import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import ExternalLink from 'components/ui/ExternalLink';
import React, { useState } from 'react';
import secureApiFetch from '../../services/api';
import PrimaryButton from '../ui/buttons/Primary';
import { IconUpload } from '../ui/Icons';

const ImportForm = () => {

    const [importResponse, setImportResponse] = useState(null);
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

    return <div>
        <h3>Import system data</h3>
        <form>
            <div>
                Notes:
                <UnorderedList>
                    <ListItem>Everything on the file will be attempted to be imported.</ListItem>
                    <ListItem>If there is an error the import process will continue resulting on a partial import.</ListItem>
                    <ListItem>If there are missing attributes, Reconmap will attempt to use defaults instead.</ListItem>
                    <ListItem>Example of the files to import can be found on the following url: <ExternalLink href="https://github.com/reconmap/reconmap/tree/master/imports">https://github.com/reconmap/reconmap/tree/master/imports</ExternalLink> </ListItem>
                </UnorderedList>
            </div>
            <FormControl id="importFile" isRequired>
                <FormLabel>Import file</FormLabel>
                <Input type="file" onChange={onImportFileChange} accept=".json,.js,application/json,text/json" isRequired />
            </FormControl>

            <PrimaryButton disabled={importButtonDisabled}
                onClick={handleUploadClick} leftIcon={<IconUpload />}>Import</PrimaryButton>
        </form>

        {importResponse &&
            <div>
                <h4>Import completed</h4>

                {importResponse.errors.length > 0 && <ul>
                    {importResponse.errors.map(error => <li style={{ color: 'orange' }}>
                        {error}
                    </li>)}
                </ul>}

                {importResponse.results.length > 0 && <>
                    <p>The number of imports per category are:</p>
                    <ul>
                        {importResponse.results.map(entityResult => {
                            return <li>{entityResult.count} {entityResult.name} ({entityResult.errors.length} errors)</li>
                        })}
                    </ul>
                </>}
            </div>
        }
    </div>
}

export default ImportForm;
