import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestVault = () => {
    return secureApiFetch(`/vault`, { method: "GET" }).then((res) => res.json());
};

const useVaultQuery = () => {
    return useQuery({
        queryKey: ["vault"],
        queryFn: requestVault,
    });
};

export { useVaultQuery };
