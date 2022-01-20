import { Button } from "@chakra-ui/button";
import { BellIcon } from "@chakra-ui/icons";
import {
    Popover,
    PopoverArrow,
    PopoverBody, PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/popover";
import { Alert, AlertDescription, AlertTitle, Box, CloseButton, Stack } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/tag";
import useFetch from "hooks/useFetch";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import secureApiFetch from "services/api";
import Configuration from "../../Configuration";

const NotificationsBadge = () => {
    const [notifications, fetchNotifications] = useFetch('/notifications?status=unread');

    const wsServerRef = useRef(null);

    let connectInterval = useRef(null);

    const markAsRead = notification => {
        secureApiFetch(`/notifications/${notification.id}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'read' })
        }).then(() => {
            fetchNotifications();
        })
    }

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
                fetchNotifications();
            };
            wsServerRef.current.onerror = err => {
                console.error(`websocket error`);
                console.dir(err);

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
    }, [connectInterval, fetchNotifications]);

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
        <Popover placement="bottom-end" closeOnBlur={true}>
            <PopoverTrigger>
                <Button pr={null !== notifications && notifications.length > 0 ? 1 : 2} variant="ghost" aria-label="Notifications" >
                    <BellIcon fontSize="xl" color="gray.500" />
                    {null !== notifications && notifications.length > 0 && (
                        <Tag colorScheme='red'  >{notifications.length}</Tag>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader px="3" pb="3" color="gray.500">
                    <Link to="/notifications">Notifications</Link>
                </PopoverHeader>
                <PopoverBody>
                    {null !== notifications && notifications.length > 0 ? (
                        <Stack>
                            {notifications.map(notification =>
                                <Alert key={notification.id} status='info' variant="top-accent">
                                    <Box flex='1'>
                                        <AlertTitle>{notification.time} <strong><Link to="/vulnerabilities">{notification.title}</Link></strong></AlertTitle>
                                        <AlertDescription display='block'>{notification.content}</AlertDescription>
                                    </Box>
                                    <CloseButton position='absolute' right='8px' top='8px' onClick={() => markAsRead(notification)} />
                                </Alert>
                            )}
                        </Stack>
                    ) : <span>Nothing to see here.</span>}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default NotificationsBadge;
