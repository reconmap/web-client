import { useAgentsQuery } from "api/agents.js";
import NativeTable from "components/ui/tables/NativeTable.jsx";
import { Link } from "react-router-dom";

const AgentsListPage = () => {
    const { data: agents, isLoading } = useAgentsQuery();
    if (isLoading) return <div>Loading...</div>;

    const columns = [
        {
            header: "Enabled",
            cell: (agent) => (agent.active ? <>True</> : <>False</>),
        },
        {
            header: "Name",
            cell: (agent) => (
                <>
                    <Link to={`/agents/${agent.id}`}>{agent.client_id}</Link>
                </>
            ),
        },
        {
            header: "Hostname",
            property: "hostname",
        },
        {
            header: "OS",
            property: "os",
        },
        {
            header: "Arch",
            property: "arch",
        },
        {
            header: "CPU",
            property: "cpu",
        },
        {
            header: "Mem",
            property: "memory",
        },
        {
            header: "IP",
            property: "ip",
        },
        {
            header: "Listen address",
            property: "listen_addr",
        },
        {
            header: "Last boot at",
            property: "last_boot_at",
        },
        {
            header: "Last ping at",
            property: "last_ping_at",
        },
    ];

    return <NativeTable columns={columns} rows={agents} rowId={(agent) => agent.id}></NativeTable>;
};

export default AgentsListPage;
