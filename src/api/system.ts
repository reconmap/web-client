import { buildApiRequest } from "services/api.js";

const API_PREFIX: string = "/system";

const getExportables = (): Request => {
    return buildApiRequest(`${API_PREFIX}/exportables`, {
        method: "GET",
    });
};

export { getExportables };
