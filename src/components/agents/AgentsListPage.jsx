import { useAgentsQuery } from "api/agents.js";
import NativeTable from "components/ui/tables/NativeTable.jsx";
import { Link } from "react-router-dom";

const AgentsListPage = () => {
    const { data: agents, isLoading } = useAgentsQuery();
    if (isLoading) return <div>Loading&hellip;</div>;

    const columns = [
        {
            header: "Enabled",
            cell: (agent) => (agent.active ? <>True</> : <>False</>),
        },
        {
            header: "Name",
            cell: (agent) => (
                <>
                    <Link to={`/agents/${agent.id}`}>{agent.clientId}</Link>
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
            property: "listenAddr",
        },
        {
            header: "Last boot at",
            property: "lastBootAt",
        },
        {
            header: "Last ping at",
            property: "lastPingAt",
        },
    ];

    return <NativeTable columns={columns} rows={agents} rowId={(agent) => agent.id}></NativeTable>;
};

export default AgentsListPage;
