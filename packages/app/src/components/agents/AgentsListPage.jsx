import { useAgents } from "api/agents.js";

const AgentsListPage = () => {
    const { data: agents, isLoading } = useAgents();
    if (isLoading) return <div>Loading...</div>;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Enabled</th>
                    <th>Name</th>
                    <th>Hostname</th>
                    <th>OS</th>
                    <th>Arch</th>
                    <th>CPU</th>
                    <th>Mem</th>
                    <th>Last boot at</th>
                    <th>Last ping at</th>
                </tr>
            </thead>
            <tbody>
                {agents.map((agent, index) => (
                    <tr key={index}>
                        <td>{agent.active ? <>True</> : <>False</>}</td>
                        <td>{agent.client_id}</td>
                        <td>{agent.hostname}</td>
                        <td>{agent.os}</td>
                        <td>{agent.arch}</td>
                        <td>{agent.cpu}</td>
                        <td>{agent.memory}</td>
                        <td>{agent.last_boot_at}</td>
                        <td>{agent.last_ping_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AgentsListPage;
