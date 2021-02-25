import CommandsTable from 'components/commands/Table';
import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';

const CommandsSearchResults = ({ keywords }) => {

    const [commands, setCommands] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/commands?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setCommands(json);
                })
        }

        reloadData()
    }, [keywords])

    return <>
        <h3>{commands.length} matching commands</h3>
        <CommandsTable commands={commands} />
    </>
}

export default CommandsSearchResults;
