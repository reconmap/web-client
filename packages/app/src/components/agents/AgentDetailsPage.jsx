import { useQueryClient } from "@tanstack/react-query";
import { useAgentQuery } from "api/agents.js";
import NativeButtonGroup from "components/form/NativeButtonGroup.jsx";
import PrimaryButton from "components/ui/buttons/Primary.jsx";
import CommandTerminal from "components/ui/CommandTerminal.jsx";
import { WebsocketContext } from "contexts/WebsocketContext.jsx";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../ui/Loading.jsx";

const AgentDetailsPage = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: agent, isLoading } = useAgentQuery(agentId);

    const [terminalVisibility, setTerminalVisibility] = useState(false);
    const wsContextData = useContext(WebsocketContext);

    const connect = () => {
        setTerminalVisibility(true);
    };
    const disconnect = () => {
        setTerminalVisibility(false);
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            {agent.os}

            <h3 className="title is-3">Agent terminal</h3>

            <NativeButtonGroup>
                <PrimaryButton onClick={connect} disabled={terminalVisibility === true}>
                    Connect
                </PrimaryButton>
                <PrimaryButton
                    className="button is-danger"
                    onClick={disconnect}
                    disabled={terminalVisibility === false}
                >
                    Disconnect
                </PrimaryButton>
            </NativeButtonGroup>

            {terminalVisibility && (
                <>
                    {wsContextData?.connection?.readyState === WebSocket.OPEN ? (
                        <CommandTerminal agentIp={agent.ip} agentPort={agent.listen_addr} commands={[]} />
                    ) : (
                        <article className="message is-danger">
                            <div className="message-body">
                                <strong>Unable to establish connection to the Reconmap agent.</strong> Please review the
                                web socket connection settings.
                            </div>
                        </article>
                    )}
                </>
            )}
        </div>
    );
};

export default AgentDetailsPage;
