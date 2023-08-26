import Tags from "components/ui/Tags";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands, onDeleteCallback = null }) => {
    return <table className="rm-listing">
        <thead>
            <tr>
                <th style={{ width: '190px' }}>Name</th>
                <th className='only-desktop'>Description</th>
                <th>Execution environment</th>
                <th>Output parser</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            {null === commands && <LoadingTableRow numColumns={5} />}
            {null !== commands && 0 === commands.length && <NoResultsTableRow numColumns={5} />}
            {null !== commands && 0 !== commands.length && commands.map(command =>
                <tr key={command.id}>
                    <td><CommandBadge command={command} /></td>
                    <td className="only-desktop">
                        {command.description}<br />
                        <Tags values={command.tags} />
                    </td>
                    <td>{command.executable_type === 'custom' ? 'Host' : 'Container'}</td>
                    <td>{command.output_parser ?? '-'}</td>
                    <td textAlign="right">
                        <LinkButton href={`/commands/${command.id}/edit`}>Edit</LinkButton>
                        {onDeleteCallback && <DeleteIconButton onClick={() => onDeleteCallback(command.id)} />}
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

export default CommandsTable;
