import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestVault = () => {
    return secureApiFetch(`/vault`, { method: "GET" });
};

const useVaultQuery = (limit: number = -1) => {
    return useQuery({
        queryKey: ["vault"],
        queryFn: () => requestVault().then((res) => res.json()),
    });
};

export { useVaultQuery };
