import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestAsset, requestAssetDelete } from "./requests/assets.js";

const useAssetQuery = (assetId: number) => {
    return useQuery({
        queryKey: ["assets"],
        queryFn: () => requestAsset(assetId),
    });
};

const useDeleteAssetMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (assetId: number) => requestAssetDelete(assetId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["assets"] });
        },
    });
};

export { useAssetQuery, useDeleteAssetMutation };
