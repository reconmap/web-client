import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestCommand = (commandId: number) => {
    return secureApiFetch(`/commands/${commandId}`, { method: "GET" });
};

const requestCommands = (limit: number = -1) => {
    return secureApiFetch(`/commands?limit=${limit}`, { method: "GET" });
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

const requestCustomFieldPost = (data: any) => {
    return secureApiFetch(`/system/custom-fields`, { method: "POST", body: JSON.stringify(data) });
};

const requestCommandDelete = (commandId: number) => {
    return secureApiFetch(`/commands/${commandId}`, { method: "DELETE" });
};

const useCommandsQuery = (limit: number = -1) => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommands(limit).then((res) => res.json()),
    });
};

const useCommandsOutputParsersQuery = () => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommandsOutputParsers().then((res) => res.json()),
    });
};

const useCommandQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommand(commandId).then((res) => res.json()),
    });
};

const useCommandUsagesQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommandUsages(commandId).then((res) => res.json()),
    });
};
const useCommandSchedulesQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommandUsages(commandId).then((res) => res.json()),
    });
};

const useCommandDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commandId: number) => requestCommandDelete(commandId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["commands"] });
        },
    });
};

export {
    useCommandDeleteMutation,
    useCommandQuery,
    useCommandSchedulesQuery,
    useCommandsOutputParsersQuery,
    useCommandsQuery,
    useCommandUsagesQuery,
};
