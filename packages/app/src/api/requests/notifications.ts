import secureApiFetch from "services/api.js";
import { requestEntityPut } from "utilities/requests.js";

const API_BASE_URL = "/notifications";

const requestNotifications = async () => {
    return (await secureApiFetch(API_BASE_URL, { method: "GET" })).json();
};

export const requestNotificationPut = (notificationId: number, data: any) =>
    requestEntityPut(`${API_BASE_URL}/${notificationId}`, data);

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
