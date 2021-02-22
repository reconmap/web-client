import CommandBadge from "components/commands/Badge";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";

const PopularCommandsWidget = () => {
    const [commands] = useFetch('/commands?limit=5');

    if (!commands) return <Loading />

    return <article class="card">
        <h4>Popular commands</h4>

        <table>
            <thead>
                <th>Short name</th>
                <th>Description</th>
            </thead>
            <tbody>
                {commands.map(command => <tr>
                    <td><CommandBadge command={command}>{command.short_name}</CommandBadge></td>
                    <td>{command.description}</td>
                </tr>)}
            </tbody>
        </table>
    </article>
}

export default PopularCommandsWidget;
