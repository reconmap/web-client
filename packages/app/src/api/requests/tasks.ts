import secureApiFetch from "services/api.js";

const API_BASE_URL = "/tasks";

const requestTasks = (params: any) => {
    return secureApiFetch(`${API_BASE_URL}?` + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestTask = (taskId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${taskId}`, { method: "GET" });
};

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

const requestTaskPost = (task: any) => {
    return secureApiFetch(`${API_BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(task),
    });
};

export { requestTask, requestTaskDelete, requestTaskPost, requestTasks, requestTasksDelete };
