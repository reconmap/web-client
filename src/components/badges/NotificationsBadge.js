import React, { useState } from "react";
import Configuration from "../../Configuration";
import { Button } from "@chakra-ui/button";
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@chakra-ui/popover";
import { BellIcon } from "@chakra-ui/icons";
import { Tag } from "@chakra-ui/tag";

export default function NotificationsBadge() {
    const [notifications, setNotifications] = useState([]);

    try {
        const webSocketServer = new WebSocket(Configuration.wsEndpoint);

        webSocketServer.onopen = function (ev) {
            console.info("[open] Connection established");
            webSocketServer.send("jwt.token");
        };

        webSocketServer.onmessage = function (ev) {
            const data = JSON.parse(ev.data);
            setNotifications([...notifications, data]);
        };
        webSocketServer.onerror = function (err) {
            console.error(`[error] ${err.message}`);
        };

        webSocketServer.onclose = function (ev) {
            if (ev.wasClean) {
                console.error(
                    `[close] Connection closed cleanly, code=${ev.code} reason=${ev.reason}`
                );
            } else {
                // e.g. server process killed or network down
                // ev.code is usually 1006 in this case
                console.error("[close] Connection died");
            }
        };
        // if(ws.readyState == WebSocket.CLOSED) this.connect();

        //webSocketServer.close();
    } catch (err) {
        console.error(err);
    }

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Button pr={notifications.length > 0? 1 : 2} variant="ghost" aria-label="Notifications" >
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
                        <ul>
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center my-1"
                                >
                                    {notification.title}
                                    <span className="text-red-500  rounded-full font-bold text-sm">
                                        {notification.detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span>No notifications</span>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
