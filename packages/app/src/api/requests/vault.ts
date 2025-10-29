import secureApiFetch from "services/api.js";

const API_BASE_URL = "/vault";

const requestSecretDelete = (secretId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${secretId}`, {
        method: "DELETE",
    });
};

export { requestSecretDelete };
