import secureApiFetch from "services/api.js";

const requestTasks = (params: any) => {
    return secureApiFetch(`/tasks?` + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestTask = (taskId: number) => {
    return secureApiFetch(`/tasks/${taskId}`, { method: "GET" });
};

const requestTaskDelete = (taskId: number) => {
    return secureApiFetch(`/tasks/${taskId}`, {
        method: "DELETE",
    });
};

export { requestTask, requestTaskDelete, requestTasks };
