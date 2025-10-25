import secureApiFetch from "services/api.js";

const requestAgents = async () => {
    return (await secureApiFetch("/agents", { method: "GET" })).json();
};

export { requestAgents };
