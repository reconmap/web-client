import secureApiFetch from "services/api.js";
import { requestEntities, requestEntityDelete, requestEntityPut } from "utilities/requests.js";

const API_BASE_URL = "/notifications";

const requestNotifications = async (params: any) => requestEntities(API_BASE_URL, params);

export const requestNotificationPut = (notificationId: number, data: any) =>
    requestEntityPut(`${API_BASE_URL}/${notificationId}`, data);

const requestNotificationDelete = (notificationId: number) => requestEntityDelete(`${API_BASE_URL}/${notificationId}`);

const requestNotificationsPatch = (data: any): Promise<Response> => {
    return secureApiFetch(`${API_BASE_URL}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

export { requestNotificationDelete, requestNotifications, requestNotificationsPatch };
