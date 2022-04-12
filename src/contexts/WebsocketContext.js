import Configuration from "Configuration";
import { createContext, useContext, useEffect, useRef } from "react";

export const WebsocketContext = createContext({ connection: null });

const WebsocketProvider = ({ children }) => {
    const internal = useRef(null);

    const notificationServiceProtocol = Configuration.isSecureTransportEnabled() ? 'wss' : 'ws';
    const notificationServiceHostPort = Configuration.getNotificationsServiceHostPort();
    internal.current = new WebSocket(`${notificationServiceProtocol}://${notificationServiceHostPort}/notifications`)

    useEffect(() => {
        const connection = internal.current;

        const connect = () => {
            if (connection.readyState === WebSocket.CLOSED) {
                console.debug('reconmap-ws: reconnecting');
                const notificationServiceProtocol = Configuration.isSecureTransportEnabled() ? 'wss' : 'ws';
                const notificationServiceHostPort = Configuration.getNotificationsServiceHostPort();
                internal.current = new WebSocket(`${notificationServiceProtocol}://${notificationServiceHostPort}/notifications`)
            }
        }

        const onConnectionOpen = ev => {
            console.debug('reconmap-ws: connected');
        }
        const onConnectionClose = ev => {
            console.debug('reconmap-ws: disconnected');
            connect();
        }
        const onConnectionError = ev => {
            console.debug('reconmap-ws: errored');
            console.dir(ev);
        }

        connection.addEventListener('open', onConnectionOpen);
        connection.addEventListener('error', onConnectionError);
        connection.addEventListener('close', onConnectionClose);

        connect();

        return () => {
            if (connection.readyState !== WebSocket.CLOSED) {
                connection.removeEventListener('open', onConnectionOpen);
                connection.removeEventListener('error', onConnectionError);
                connection.removeEventListener('close', onConnectionClose);
                connection.close()
            }
        }
    }, []);

    return <WebsocketContext.Provider value={{ connection: internal.current }}>{children}</WebsocketContext.Provider>
}

export default WebsocketProvider;

export const useWebsocketMessage = (onMessageHandler) => {
    const { connection } = useContext(WebsocketContext);

    useEffect(() => {
        connection.addEventListener('message', onMessageHandler);

        return () => {
            connection.removeEventListener('message', onMessageHandler);
        }
    }, [connection, onMessageHandler]);
}
