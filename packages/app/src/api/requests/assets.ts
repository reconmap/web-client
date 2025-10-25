import secureApiFetch from "services/api.js";

const requestAsset = (assetId: number) => {
    return secureApiFetch(`/targets/${assetId}`, { method: "GET" }).then((res) => res.json());
};

const requestAssetDelete = (assetId: number) => {
    return secureApiFetch(`/targets/${assetId}`, {
        method: "DELETE",
    });
};

export { requestAsset, requestAssetDelete };
