import { ListItem, UnorderedList } from "@chakra-ui/react";
import NativeSelect from "components/form/NativeSelect";
import useFetch from "hooks/useFetch";
import { useState } from "react";
import secureApiFetch from "../../services/api";
import { IconDownload } from "../ui/Icons";
import PrimaryButton from "../ui/buttons/Primary";

const ExportForm = () => {
    const [entities] = useFetch('/system/exportables');

    const [exportButtonDisabled, setExportButtonDisabled] = useState(true);

    const [entitiesToExport, setEntitiesToExport] = useState([]);

    const onEntitiesSelectionChange = ev => {
        const selectedEntities = Array.from(ev.target.selectedOptions, option => option.value);
        setExportButtonDisabled(selectedEntities.length === 0);
        setEntitiesToExport(selectedEntities);
    };

    const onExportButtonClick = ev => {
        ev.preventDefault();

        const url = `/system/data?` + new URLSearchParams({ entities: entitiesToExport }).toString();
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
            <UnorderedList>
                <ListItem>Select one or more entities to export.</ListItem>
                <ListItem>The data will be returned in JSON format.</ListItem>
                <ListItem>This operation can take up to one minute to complete depending on the size of your database.</ListItem>
            </UnorderedList>
        </div>

        <NativeSelect multiple style={{ width: '80%', height: 250 }} onChange={onEntitiesSelectionChange}>
            {entities && entities.map(entity => <option key={entity.key} value={entity.key}>{entity.description}</option>)}
        </NativeSelect>
        <br />
        <PrimaryButton disabled={exportButtonDisabled}
            onClick={onExportButtonClick} leftIcon={<IconDownload />}>Export</PrimaryButton>
    </div>
};

export default ExportForm;
