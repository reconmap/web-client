import secureApiFetch from "services/api.js";

const API_BASE_URL = "/notifications";

const requestNotifications = async () => {
    return (await secureApiFetch("/notifications", { method: "GET" })).json();
};

const requestNotificationDelete = (notificationId: number) => {
    return secureApiFetch(`/notifications/${notificationId}`, {
        method: "DELETE",
    });
};

const requestNotificationsPatch = (data: any): Promise<Response> => {
    return secureApiFetch(`${API_BASE_URL}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

export { requestNotificationDelete, requestNotifications, requestNotificationsPatch };
