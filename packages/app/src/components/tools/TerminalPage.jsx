import NativeButtonGroup from "components/form/NativeButtonGroup.jsx";
import PrimaryButton from "components/ui/buttons/Primary.jsx";
import CommandTerminal from "components/ui/CommandTerminal.jsx";
import { WebsocketContext } from "contexts/WebsocketContext.jsx";
import { useContext, useState } from "react";

const TerminalPage = () => {
    const [terminalVisibility, setTerminalVisibility] = useState(false);
    const wsContextData = useContext(WebsocketContext);

    const connect = () => {
        setTerminalVisibility(true);
    };
    const disconnect = () => {
        setTerminalVisibility(false);
    };

    return (
        <div>
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
                        <CommandTerminal commands={[]} />
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

export default TerminalPage;
