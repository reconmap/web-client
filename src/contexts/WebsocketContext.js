import Configuration from "Configuration";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const createWebsocketConnection = (isAuth, user) => {
    const notificationServiceProtocol = Configuration.isSecureTransportEnabled() ? 'wss' : 'ws';
    const notificationServiceHostPort = Configuration.getNotificationsServiceHostPort();
    console.debug("reconmap-ws: connecting");

    const urlParams = new URLSearchParams();
    urlParams.set('token', user.access_token);
    const ws = new WebSocket(`${notificationServiceProtocol}://${notificationServiceHostPort}/notifications?` + urlParams.toString());

    const onConnectionOpen = () => console.debug("reconmap-ws: connected");
    ws.addEventListener('open', onConnectionOpen);

    const onConnectionError = ev => console.debug("reconmap-ws: errored", ev);
    ws.addEventListener('error', onConnectionError);

    const onConnectionClose = () => {
        console.debug("reconmap-ws: disconnected");
        if (isAuth) {
            setTimeout(() => {
                //setWsContextState(prevState => { return { ...prevState, connection: createWebsocketConnection() } });
            }, 5000);
        }
    }
    ws.addEventListener('close', onConnectionClose);

    return { ws, onConnectionOpen, onConnectionError, onConnectionClose };
}

const wsContextData = {
    connection: null
};

export const WebsocketContext = createContext(wsContextData);

const WebsocketProvider = ({ children }) => {
    const [wsContextState, setWsContextState] = useState(wsContextData);
    const { user, isAuth } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuth) {
            //if (wsContextState.connection) wsContextState.connection.close();
            setWsContextState(prevState => { return { ...prevState, connection: null } })
            return;
        }

        /*
            if (wsContextState.connection && wsContextState.connection.readyState in [WebSocket.CONNECTING, WebSocket.OPEN]) {
                return;
            }
        */

        const { ws, onConnectionOpen, onConnectionError, onConnectionClose } = createWebsocketConnection(isAuth, user);
        setWsContextState(prevSate => { return { ...prevSate, connection: ws } })

        return () => {
            console.debug("reconmap-ws: removing listeners");
            ws.removeEventListener('open', onConnectionOpen);
            ws.removeEventListener('error', onConnectionError);
            ws.removeEventListener('close', onConnectionClose);
        }
    }, [isAuth, user]);

    return <WebsocketContext.Provider value={wsContextState}>{children}</WebsocketContext.Provider>
}

export default WebsocketProvider;

export const useWebsocketMessage = onMessageHandler => {
    const wsContextData = useContext(WebsocketContext);

    useEffect(() => {
        if (wsContextData.connection) {
            wsContextData.connection.addEventListener('message', onMessageHandler);
        }

        return () => {
            if (wsContextData.connection) {
                wsContextData.connection.removeEventListener('message', onMessageHandler);
            }
        }
    }, [wsContextData.connection, onMessageHandler]);
}
