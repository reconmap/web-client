import Configuration from "Configuration";
import { createContext, useContext, useEffect, useState } from "react";

const createWebsocketConnection = () => {
    const notificationServiceProtocol = Configuration.isSecureTransportEnabled() ? 'wss' : 'ws';
    const notificationServiceHostPort = Configuration.getNotificationsServiceHostPort();
    console.debug("reconmap-ws: connecting");
    return new WebSocket(`${notificationServiceProtocol}://${notificationServiceHostPort}/notifications`);
}

const ws = createWebsocketConnection();
export const WebsocketContext = createContext(ws);

const WebsocketProvider = ({ children }) => {
    const [wsState, setWsState] = useState(ws);

    useEffect(() => {
        const onConnectionOpen = () => console.debug("reconmap-ws: connected");
        ws.addEventListener('open', onConnectionOpen);

        const onConnectionError = ev => console.debug("reconmap-ws: errored", ev);
        ws.addEventListener('error', onConnectionError);

        const onConnectionClose = () => {
            console.debug("reconmap-ws: disconnected");
            setTimeout(() => {
                setWsState(createWebsocketConnection());
            }, 5000);
        }
        ws.addEventListener('close', onConnectionClose);

        return () => {
            ws.removeEventListener('open', onConnectionOpen);
            ws.removeEventListener('error', onConnectionError);
            ws.removeEventListener('close', onConnectionClose);
        }
    }, []);

    return <WebsocketContext.Provider value={wsState}>{children}</WebsocketContext.Provider>
}

export default WebsocketProvider;

export const useWebsocketMessage = (onMessageHandler) => {
    const connection = useContext(WebsocketContext);

    useEffect(() => {
        connection.addEventListener('message', onMessageHandler);

        return () => {
            connection.removeEventListener('message', onMessageHandler);
        }
    }, [connection, onMessageHandler]);
}
