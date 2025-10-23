import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestClients = () => {
    return secureApiFetch("/clients", { method: "GET" });
};

const requestClient = (clientId: number) => {
    return secureApiFetch(`/clients/${clientId}`, { method: "GET" });
};

const useClients = () => {
    return useQuery({
        queryKey: ["agents"],
        queryFn: () => requestClients().then((res) => res.json()),
    });
};

const useClient = (clientId: number) => {
    return useQuery({
        queryKey: ["agents"],
        queryFn: () => requestClient(clientId).then((res) => res.json()),
    });
};

export { useClient, useClients };
