import secureApiFetch from "services/api.js";
import { requestEntity, requestEntityPost } from "utilities/requests.js";

const API_BASE_URL = "/tasks";

const requestTasks = (params: any) => {
    return secureApiFetch(`${API_BASE_URL}?` + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestTask = (taskId: number) => requestEntity(`${API_BASE_URL}/${taskId}`);

const requestTaskDelete = (taskId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${taskId}`, {
        method: "DELETE",
    });
};

const requestTasksDelete = (taskIds: number[]) => {
    return secureApiFetch(`${API_BASE_URL}`, {
        method: "PATCH",
        headers: {
            "Bulk-Operation": "DELETE",
        },
        body: JSON.stringify(taskIds),
    });
};

const requestTaskPatch = (taskId: number, data: any) => {
    return secureApiFetch(`/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

const requestTasksPatch = (data: any) => {
    return secureApiFetch("/tasks", {
        method: "PATCH",
        headers: {
            "Bulk-Operation": "UPDATE",
        },
        body: JSON.stringify(data),
    });
};

const requestTaskPost = (task: any) => requestEntityPost(API_BASE_URL, task);

export {
    requestTask,
    requestTaskDelete,
    requestTaskPatch,
    requestTaskPost,
    requestTasks,
    requestTasksDelete,
    requestTasksPatch,
};
