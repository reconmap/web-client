import secureApiFetch from "services/api.js";

const requestExportables = () => {
    return secureApiFetch("/system/exportables", { method: "GET" });
};

const requestSystemHealth = () => {
    return secureApiFetch("/system/health", { method: "GET" });
};

const requestSystemUsage = () => {
    return secureApiFetch("/system/usage", { method: "GET" });
};

const requestCustomFields = () => {
    return secureApiFetch("/system/custom-fields", { method: "GET" });
};

const requestCustomFieldPost = (data: any) => {
    return secureApiFetch(`/system/custom-fields`, { method: "POST", body: JSON.stringify(data) });
};

const requestCustomFieldDeletion = (customFieldId: number) => {
    return secureApiFetch(`/system/custom-fields/${customFieldId}`, { method: "DELETE" });
};

const requestSystemIntegrations = () => {
    return secureApiFetch(`/system/integrations`, { method: "GET" });
};

const requestRecentSearches = () => {
    return secureApiFetch(`/recent-searches`, { method: "GET" });
};

export {
    requestCustomFieldDeletion,
    requestCustomFieldPost,
    requestCustomFields,
    requestExportables,
    requestRecentSearches,
    requestSystemHealth,
    requestSystemIntegrations,
    requestSystemUsage,
};
