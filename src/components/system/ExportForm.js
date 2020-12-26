import {IconDownload} from "../ui/Icons";
import PrimaryButton from "../ui/buttons/Primary";
import React, {useState} from "react";
import secureApiFetch from "../../services/api";

const ExportForm = () => {
    const entities = [
        {key: 'vulnerabilities', name: 'Vulnerabilities'},
        {key: 'tasks', name: 'Tasks'},
        {key: 'projects', name: 'Projects'},
        {key: 'clients', name: 'Clients'},
        {key: 'users', name: 'Users'},
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
        secureApiFetch(url, {method: 'GET'})
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

        <fieldset>
            <label>Select entities to export</label><br/>
            <select multiple style={{width: 200, height: 150}} onChange={onEntitiesSelectionChange}>
                {entities.map((entity, index) => <option key={index} value={entity.key}>{entity.name}</option>)}
            </select>
            <br/>
            <PrimaryButton disabled={exportButtonDisabled}
                           onClick={onExportButtonClick}><IconDownload/> Export</PrimaryButton>
        </fieldset>
    </div>
};

export default ExportForm;
