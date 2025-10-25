import secureApiFetch from "services/api.js";

const requestCommand = (commandId: number) => {
    return secureApiFetch(`/commands/${commandId}`, { method: "GET" });
};

const requestCommands = async (params: any) => {
    const resp = await secureApiFetch(`/commands?` + new URLSearchParams(params).toString(), { method: "GET" });
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
    return secureApiFetch(`/commands/${commandId}/usages`, { method: "GET" });
};

const requestCommandSchedules = (commandId: number) => {
    return secureApiFetch(`/commands/${commandId}/schedules`, { method: "GET" });
};

const requestCommandsOutputParsers = () => {
    return secureApiFetch(`/commands/output-parsers`, { method: "GET" });
};

const requestCommandDelete = (commandId: number) => {
    return secureApiFetch(`/commands/${commandId}`, { method: "DELETE" });
};

export {
    requestCommand,
    requestCommandDelete,
    requestCommands,
    requestCommandSchedules,
    requestCommandsOutputParsers,
    requestCommandUsages,
};
