import secureApiFetch from "services/api.js";
import { requestEntityPut } from "utilities/requests.js";

const API_BASE_URL = "/commands";

const requestCommand = (commandId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${commandId}`, { method: "GET" });
};

const requestCommands = async (params: any) => {
    const resp = await secureApiFetch(`${API_BASE_URL}?` + new URLSearchParams(params).toString(), { method: "GET" });
    const commands: { data: any; pageCount?: string | null; totalCount?: string | null } = {
        data: await resp.json(),
    };
    if (resp.headers.has("X-Page-Count")) {
        commands.pageCount = resp.headers.get("X-Page-Count");
    }
    if (resp.headers.has("X-Total-Count")) {
        commands.totalCount = resp.headers.get("X-Total-Count");
    }
    return commands;
};

const requestCommandUsages = (commandId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${commandId}/usages`, { method: "GET" });
};

const requestCommandSchedules = (commandId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${commandId}/schedules`, { method: "GET" });
};

const requestCommandsOutputParsers = () => {
    return secureApiFetch(`${API_BASE_URL}/output-parsers`, { method: "GET" });
};

const requestCommandDelete = (commandId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${commandId}`, { method: "DELETE" });
};

export const requestCommandPut = (commandId: number, data: any) =>
    requestEntityPut(`${API_BASE_URL}/${commandId}`, data);

const requestCommandPost = (command: object) => {
    return secureApiFetch(`${API_BASE_URL}`, { method: "POST", body: JSON.stringify(command) });
};

const requestCommandScheduleDelete = (commandId: number, scheduleId: number) => {
    return secureApiFetch(`${API_BASE_URL}/schedules/${scheduleId}`, { method: "DELETE" });
};

const requestCommandUsageDelete = (commandId: number, usageId: number) => {
    return secureApiFetch(`${API_BASE_URL}/usage/${usageId}`, { method: "DELETE" });
};

export {
    requestCommand,
    requestCommandDelete,
    requestCommandPost,
    requestCommands,
    requestCommandScheduleDelete,
    requestCommandSchedules,
    requestCommandsOutputParsers,
    requestCommandUsageDelete,
    requestCommandUsages,
};
