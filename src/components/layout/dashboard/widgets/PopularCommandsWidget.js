import { Th } from "@chakra-ui/react";
import CommandBadge from "components/commands/Badge";
import useFetch from "hooks/useFetch";

const PopularCommandsWidget = () => {
    const [commands] = useFetch('/commands?limit=5');

    return <article className="card">
        <h4>Popular commands</h4>

        {commands && commands.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <Th>Short name</Th>
                        <Th>Description</Th>
                    </tr>
                </thead>
                <tbody>
                    {commands.map(command => <tr key={command.id}>
                        <td><CommandBadge command={command}>{command.name}</CommandBadge></td>
                        <td>{command.description}</td>
                    </tr>)}
                </tbody>
            </table> :
            <p>No commands to show.</p>
        }
    </article>
}

export default PopularCommandsWidget;
