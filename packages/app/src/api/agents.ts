import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestAgents = () => {
    return secureApiFetch("/agents", { method: "GET" });
};

const useAgents = () => {
    return useQuery({
        queryKey: ["agents"],
        queryFn: () => requestAgents().then((res) => res.json()),
    });
};

export { useAgents };
