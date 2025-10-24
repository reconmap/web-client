import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestAsset = (assetId: number) => {
    return secureApiFetch(`/targets/${assetId}`, { method: "GET" });
};

const useAssetQuery = (assetId: number) => {
    return useQuery({
        queryKey: ["assets"],
        queryFn: () => requestAsset(assetId).then((res) => res.json()),
    });
};

export { useAssetQuery };
