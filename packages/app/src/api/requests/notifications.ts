import secureApiFetch from "services/api.js";

const requestNotifications = async () => {
    return (await secureApiFetch("/notifications", { method: "GET" })).json();
};

const requestNotificationDelete = (notificationId: number) => {
    return secureApiFetch(`/notifications/${notificationId}`, {
        method: "DELETE",
    });
};

export { requestNotificationDelete, requestNotifications };
