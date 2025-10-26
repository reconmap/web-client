import secureApiFetch from "services/api.js";

const requestAuditLog = async (params: any) => {
    const resp = await secureApiFetch(`/auditlog?` + new URLSearchParams(params).toString(), { method: "GET" });
    const auditLog: { data: any; pageCount?: string | null; totalCount?: string | null } = {
        data: await resp.json(),
    };
    if (resp.headers.has("X-Page-Count")) {
        auditLog.pageCount = resp.headers.get("X-Page-Count");
    }
    if (resp.headers.has("X-Total-Count")) {
        auditLog.totalCount = resp.headers.get("X-Total-Count");
    }
    return auditLog;
};

const requestAuditLogStats = () => {
    return secureApiFetch("/auditlog/stats", { method: "GET" });
};

export { requestAuditLog, requestAuditLogStats };
