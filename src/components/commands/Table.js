import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import NoResults from "components/ui/NoResults";
import Tags from "components/ui/Tags";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands, onDeleteCallback = null }) => {
    return <table>
        <thead>
            <tr>
                <th style={{ width: '190px' }}>Name</th>
                <th className='only-desktop'>Description</th>
                <th>Output parser</th>
                <th>Docker image</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            {commands.length === 0 ?
                <tr>
                    <td colSpan={5}><NoResults /></td>
                </tr> :
                commands.map(command =>
                    <tr key={command.id}>
                        <td ><CommandBadge command={command} /></td>
                        <td className='only-desktop truncate'>
                            {command.description}<br />
                            <Tags values={command.tags} />
                        </td>
                        <td>{command.output_parser ?? '-'}</td>
                        <td>{command.docker_image}</td>
                        <td className='flex justify-end'>
                            <LinkButton href={`/commands/${command.id}/edit`}>Edit</LinkButton>
                            {onDeleteCallback && <DeleteIconButton onClick={() => onDeleteCallback(command.id)} />}
                        </td>
                    </tr>
                )}
        </tbody>
    </table>
}

export default CommandsTable;
