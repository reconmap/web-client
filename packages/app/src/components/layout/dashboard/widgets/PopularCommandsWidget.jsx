import { useCommandsQuery } from "api/commands.js";
import CommandBadge from "components/commands/Badge";
import DashboardWidget from "./Widget";

const PopularCommandsWidget = () => {
    const { data: commands } = useCommandsQuery(5);

    return (
        <DashboardWidget title="Popular commands">
            {commands && commands.length > 0 ? (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Short name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commands.map((command) => (
                            <tr key={command.id}>
                                <td>
                                    <CommandBadge command={command}>{command.name}</CommandBadge>
                                </td>
                                <td>{command.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No commands to show.</p>
            )}
        </DashboardWidget>
    );
};

export default PopularCommandsWidget;
