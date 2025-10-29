import secureApiFetch from "services/api.js";

const API_BASE_URL = "/agents";

const requestAgents = async () => {
    return (await secureApiFetch(API_BASE_URL, { method: "GET" })).json();
};

export { requestAgents };
