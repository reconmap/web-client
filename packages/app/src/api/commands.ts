import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestCommand = (commandId: number) => {
    return secureApiFetch(`/commands/${commandId}`, { method: "GET" });
};

const requestCommands = (limit: number = -1) => {
    return secureApiFetch(`/commands?limit=${limit}`, { method: "GET" });
};

const useCommandsQuery = (limit: number = -1) => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommands(limit).then((res) => res.json()),
    });
};

const useCommandQuery = (commandId: number) => {
    return useQuery({
        queryKey: ["commands"],
        queryFn: () => requestCommand(commandId).then((res) => res.json()),
    });
};

export { useCommandQuery, useCommandsQuery };
