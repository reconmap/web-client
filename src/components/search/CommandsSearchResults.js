import CommandsTable from 'components/commands/Table';
import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';

const CommandsSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {

    const [commands, setCommands] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/commands?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(commands => {
                    setCommands(commands);
                    setEmptyResults(emptyResults => (commands.length === 0 ? emptyResults.concat('commands') : emptyResults.filter(entity => entity !== 'commands')));
                })
        }

        reloadData()
    }, [keywords, setEmptyResults])

    if (commands.length === 0) return <></>

    return <>
        <h3>{commands.length} matching commands</h3>
        <CommandsTable commands={commands} />
    </>
}

export default CommandsSearchResults;
