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
import { useWebsocketMessage } from "contexts/WebsocketContext";
import useFetch from "hooks/useFetch";
import { Link } from "react-router-dom";
import secureApiFetch from "services/api";

const NotificationsBadge = () => {
    const [notifications, fetchNotifications] = useFetch('/notifications?status=unread');

    const onMessageHandler = () => {
        fetchNotifications();
    }

    useWebsocketMessage(onMessageHandler);

    const markAsRead = notification => {
        secureApiFetch(`/notifications/${notification.id}`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'read' })
        }).then(() => {
            fetchNotifications();
        })
    }

    return <Popover placement="bottom-end" closeOnBlur={true}>
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
}

export default NotificationsBadge;
