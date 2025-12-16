import secureApiFetch from "services/api.js";
import { requestEntity } from "utilities/requests.js";

const API_BASE_URL = "/agents";

const requestAgents = async () => {
    return (await secureApiFetch(API_BASE_URL, { method: "GET" })).json();
};

const requestAgent = (agentId: number) => requestEntity(`${API_BASE_URL}/${agentId}`).then((resp) => resp.json());

export { requestAgent, requestAgents };
