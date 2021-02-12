import React, { useState } from "react";
import secureApiFetch from "../../services/api";
import PrimaryButton from "../ui/buttons/Primary";
import { IconDownload } from "../ui/Icons";

const ExportForm = () => {
    const entities = [
        { key: 'clients', name: 'Clients' },
        { key: 'commands', name: 'Commands' },
        { key: 'projects', name: 'Projects' },
        { key: 'tasks', name: 'Tasks' },
        { key: 'users', name: 'Users' },
        { key: 'vulnerabilities', name: 'Vulnerabilities' },
    ];

    const [exportButtonDisabled, setExportButtonDisabled] = useState(true);

    const [entitiesToExport, setEntitiesToExport] = useState([]);

    const onEntitiesSelectionChange = (ev) => {
        const selectedEntities = Array.from(ev.target.selectedOptions, option => option.value);
        setExportButtonDisabled(selectedEntities.length === 0);
        setEntitiesToExport(selectedEntities);
    };

    const onExportButtonClick = (ev) => {
        ev.preventDefault();

        const url = `/system/data?` + new URLSearchParams({
            entities: entitiesToExport
        }).toString();
        secureApiFetch(url, { method: 'GET' })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const filename = values[1];
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
    };

    return <div>
        <h3>Export system data</h3>

        <div style={{ marginTop: '5px', marginBottom: '5px' }}>
            Notes:
            <ul>
                <li>Select one or more entities to export.</li>
                <li>The data will be returned in JSON format.</li>
                <li>This operation can take up to one minute to complete depending on the size of your database.</li>
            </ul>
        </div>

        <select multiple style={{ width: '80%', height: 150, marginTop: '5px', marginBottom: '5px' }} onChange={onEntitiesSelectionChange}>
            {entities.map((entity, index) => <option key={index} value={entity.key}>{entity.name}</option>)}
        </select>
        <br />
        <PrimaryButton disabled={exportButtonDisabled}
            onClick={onExportButtonClick}><IconDownload /> Export</PrimaryButton>
    </div>
};

export default ExportForm;
