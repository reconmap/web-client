import { useAgentsQuery } from "api/agents.js";
import { requestAgentDelete, requestAgentPost } from "api/requests/agents.js";
import NativeTable from "components/ui/tables/NativeTable.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const AgentsListPage = () => {
    const { data: agents, isLoading, refetch } = useAgentsQuery();

    const [agentCredentials, setAgentCredentials] = useState(null);

    if (isLoading) return <div>Loading&hellip;</div>;

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        requestAgentPost(data).then((response) => {
            if (response.ok) {
                event.target.reset();
                setAgentCredentials(response.data);
                alert("Agent added successfully");
                refetch();
            } else {
                alert("Failed to add agent");
            }
        });
    }

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
        {
            header: "",
            cell: (agent) => (
                <>
                    <button className="button is-danger is-small" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this agent?")) {
                            requestAgentDelete(agent.id).then((response) => {
                                if (response.ok) {
                                    alert("Agent deleted successfully");
                                    refetch();
                                } else {
                                    alert("Failed to delete agent");
                                }
                            });
                        }
                    }}>Delete</button>
                </>
            ),
        }
    ];

    return <>
        <NativeTable columns={columns} rows={agents} rowId={(agent) => agent.id}></NativeTable>;

        {agentCredentials && (
            <div>
                The agent credentials are:
                <pre>{JSON.stringify(agentCredentials, null, 2)}</pre>
                Please copy them, they are only displayed once.
            </div>
        )}

        <form method="POST" action="/api/agents" onSubmit={onSubmit}>
            <input type="text" name="clientId" placeholder="Client ID" required />
            <input type="text" name="hostname" placeholder="Hostname" required />
            <input type="text" name="listenAddr" placeholder="Listen Address" required />
            <input type="submit" value="Add new agent" />
        </form>
    </>
};

export default AgentsListPage;
