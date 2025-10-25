import { useQuery } from "@tanstack/react-query";
import { requestAgents } from "./requests/agents.js";

const useAgentsQuery = () => {
    return useQuery({
        queryKey: ["agents"],
        queryFn: requestAgents,
    });
};

export { useAgentsQuery };
