import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NativeButtonGroup from "components/form/NativeButtonGroup";
import PageTitle from "components/logic/PageTitle";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";

const NotificationsList = () => {
    const [notifications, fetchNotifications] = useFetch("/notifications");

    const markNotificationAsRead = (notification) => {
        secureApiFetch(`/notifications/${notification.id}`, {
            method: "PUT",
            body: JSON.stringify({ status: "read" }),
        }).then(() => {
            fetchNotifications();
        });
    };

    const deleteNotification = useDelete("/notifications/", fetchNotifications);

    return (
        <>
            <PageTitle value="Notifications" />
            <div className="heading">
                <Breadcrumb />
            </div>
            <title title="Notifications" icon={<faBell />} />

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th w={50}>&nbsp;</th>
                        <th w={200}>Date/time</th>
                        <th>Content</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {null === notifications && <LoadingTableRow numColumns={3} />}
                    {null !== notifications && notifications.length === 0 && <NoResultsTableRow numColumns={3} />}
                    {null !== notifications &&
                        notifications.length > 0 &&
                        notifications.map((notification) => (
                            <tr key={notification.id}>
                                <th>
                                    {notification.status === "read" ? <FontAwesomeIcon icon={faCheck} /> : <>&nbsp;</>}
                                </th>
                                <td>
                                    <RelativeDateFormatter date={notification.insert_ts} />
                                </td>
                                <td>
                                    <strong>{notification.title}</strong>
                                    <div>{notification.content}</div>
                                </td>
                                <td textAlign="right">
                                    <NativeButtonGroup>
                                        {notification.status === "unread" && (
                                            <Button
                                                onClick={() => markNotificationAsRead(notification)}
                                                leftIcon={<FontAwesomeIcon icon={faCheck} />}
                                            >
                                                Mark as read
                                            </Button>
                                        )}
                                        <DeleteIconButton onClick={() => deleteNotification(notification.id)} />
                                    </NativeButtonGroup>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default NotificationsList;
