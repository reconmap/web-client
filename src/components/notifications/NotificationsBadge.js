import { Button } from "@chakra-ui/button";
import { BellIcon } from "@chakra-ui/icons";
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/popover";
import { PopoverFooter, Stack } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/tag";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Configuration from "../../Configuration";

const NotificationsBadge = () => {
    const [notifications, setNotifications] = useState([]);

    const onClearAllClick = ev => {
        ev.preventDefault();

        setNotifications([]);
    }

    const wsServerRef = useRef(null);

    let connectInterval = useRef(null);

    const connect = useCallback(() => {
        console.debug('connecting to websocket server')

        try {
            const notificationServiceProtocol = Configuration.isSecureTransportEnabled() ? 'wss' : 'ws';
            const notificationServiceHostPort = Configuration.getNotificationsServiceHostPort();
            wsServerRef.current = new WebSocket(`${notificationServiceProtocol}://${notificationServiceHostPort}/notifications`);

            wsServerRef.current.onopen = ev => {
                console.debug("connected to websocket server!");
                wsServerRef.current.send("jwt.token");

                clearTimeout(connectInterval.current);
            };

            wsServerRef.current.onmessage = ev => {
                const data = JSON.parse(ev.data);
                setNotifications([...notifications, data]);
            };
            wsServerRef.current.onerror = err => {
                console.error(`websocket error: ${err.message}`);

                wsServerRef.current.close();
            };

            wsServerRef.current.onclose = ev => {
                if (ev.wasClean) {
                    console.debug(`websocket connection closed cleanly (code=${ev.code} reason=${ev.reason})`);
                } else {
                    // e.g. server process killed or network down
                    // ev.code is usually 1006 in this case
                    console.error(`websocket connection died (code=${ev.code} reason=${ev.reason})`);
                }
            };
        } catch (err) {
            console.error(err);
        }
    }, [connectInterval, notifications]);

    const disconnect = () => {
        console.debug('disconnecting websocket client');
        if (wsServerRef.current && wsServerRef.current.readyState !== WebSocket.CLOSED) {
            wsServerRef.current.close()
        }
    }

    useEffect(() => {

        const checkConnection = (() => {
            console.debug('checking if websocket connection is up')
            if (wsServerRef.current.readyState === WebSocket.CLOSED) {
                connect();
            }
        }, [connect]);

        connect();

        connectInterval.current = setInterval(checkConnection, 10000);

        return () => disconnect();
    }, [notifications, connect]);

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Button pr={notifications.length > 0 ? 1 : 2} variant="ghost" aria-label="Notifications" >
                    <BellIcon fontSize="xl" color="gray.500" />
                    {notifications.length > 0 && (
                        <Tag colorScheme='red'  >{notifications.length}</Tag>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader px="3" pb="3" color="gray.500">
                    Notifications
                </PopoverHeader>
                <PopoverBody>
                    {notifications.length > 0 ? (
                        <Stack>
                            {notifications.map((notification, index) => (
                                <div key={index}>
                                    {notification.time} <strong><Link to="/vulnerabilities">{notification.title}</Link></strong><br />
                                    <small>{notification.detail}</small>
                                </div>
                            ))}
                        </Stack>
                    ) : <span>Nothing to see here.</span>}
                </PopoverBody>
                {notifications.length > 0 && <PopoverFooter><Button variant="outline" onClick={onClearAllClick}>Clear all</Button></PopoverFooter>}
                <PopoverFooter><Link to="/notifications">View all notifications</Link></PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}

export default NotificationsBadge;
