import { Tag } from "@reconmap/native-components";
import { useNotificationsQuery } from "api/notifications.js";
import NativeButton from "components/form/NativeButton";
import CssIcon from "components/ui/CssIcon";
import { useWebsocketMessage } from "contexts/WebsocketContext";
import useToggle from "hooks/useToggle";
import { Link } from "react-router-dom";
import secureApiFetch from "services/api";

const NotificationsBadge = () => {
    const { data: notifications, isLoading } = useNotificationsQuery({ status: "unread" });
    const { value, toggle } = useToggle(false);

    const onMessageHandler = () => {
        fetchNotifications();
    };

    useWebsocketMessage(onMessageHandler);

    const markAsRead = (notification) => {
        secureApiFetch(`/notifications/${notification.id}`, {
            method: "PUT",
            body: JSON.stringify({ status: "read" }),
        }).then(() => {
            fetchNotifications();
        });
    };

    if (isLoading) {
        return null;
    }

    return (
        <div className={`dropdown ${value ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
                <NativeButton
                    pr={null !== notifications && notifications.length > 0 ? 1 : 2}
                    variant="ghost"
                    aria-label="Notifications"
                    onClick={toggle}
                >
                    {null !== notifications && notifications.length > 0 && <Tag>{notifications.length}</Tag>}
                    <CssIcon name="bell" />
                </NativeButton>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <Link to="/notifications">Notifications</Link>
                    </div>
                    <div className="dropdown-item">
                        {null !== notifications && notifications.length > 0 ? (
                            <div>
                                {notifications.map((notification) => (
                                    <div key={notification.id} status="info" variant="top-accent">
                                        <div flex="1">
                                            <div>
                                                {notification.time}{" "}
                                                <strong>
                                                    <Link to="/vulnerabilities">{notification.title}</Link>
                                                </strong>
                                            </div>
                                            <div display="block">{notification.content}</div>
                                        </div>
                                        <NativeButton
                                            position="absolute"
                                            right="8px"
                                            top="8px"
                                            onClick={() => markAsRead(notification)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span>Nothing to see here.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsBadge;
