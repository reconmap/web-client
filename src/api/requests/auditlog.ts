import secureApiFetch from "services/api.js";
import { requestEntities } from "utilities/requests.js";

const API_BASE_URL = "/auditlog";

const requestAuditLog = async (params: any) => {
    return (await requestEntities(`${API_BASE_URL}?` + new URLSearchParams(params).toString())).json();
};

const requestAuditLogStats = () => {
    return secureApiFetch(`${API_BASE_URL}/stats`, { method: "GET" });
};

export { requestAuditLog, requestAuditLogStats };
