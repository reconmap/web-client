import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    requestCommand,
    requestCommandDelete,
    requestCommands,
    requestCommandSchedules,
    requestCommandsOutputParsers,
    requestCommandUsages,
} from "./requests/commands.js";

const useCommandsQuery = (params: any) => {
    return useQuery({
        queryKey: ["commands", params],
        queryFn: () => requestCommands(params),
    });
};

const useCommandsOutputParsersQuery = () => {
    return useQuery({
        queryKey: ["commands", "outputParsers"],
        queryFn: () => requestCommandsOutputParsers().then((res) => res.json()),
    });
};

const useCommandQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["command", commandId],
        queryFn: () => requestCommand(commandId).then((res) => res.json()),
    });
};

const useCommandUsagesQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["command", "usage", commandId],
        queryFn: () => requestCommandUsages(commandId).then((res) => res.json()),
    });
};
const useCommandSchedulesQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["command", "schedule", commandId],
        queryFn: () => requestCommandSchedules(commandId).then((res) => res.json()),
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
