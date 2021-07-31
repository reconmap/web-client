import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import NoResults from "components/ui/NoResults";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands, onDeleteCallback = null }) => {
    return <table>
        <thead>
            <tr>
                <th style={{ width: '190px' }}>Short name</th>
                <th className='only-desktop'>Description</th>
                <th>Docker image</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {commands.length === 0 ?
                <tr>
                    <td colSpan="4"><NoResults /></td>
                </tr> :
                commands.map(command =>
                    <tr key={command.id}>
                        <td ><CommandBadge command={command} /></td>
                        <td className='only-desktop truncate'>{command.description}</td>
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
