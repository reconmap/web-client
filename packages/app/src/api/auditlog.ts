import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestAuditLog = (limit: number = -1) => {
    return secureApiFetch(`/auditlog?limit=${limit}`, { method: "GET" });
};

const requestAuditLogStats = () => {
    return secureApiFetch("/auditlog/stats", { method: "GET" });
};

const useAuditLogQuery = (limit: number = -1) => {
    return useQuery({
        queryKey: ["audit-log"],
        queryFn: () => requestAuditLog(limit).then((res) => res.json()),
    });
};

const useAuditLogStatsQuery = (limit: number = -1) => {
    return useQuery({
        queryKey: ["audit-log"],
        queryFn: () => requestAuditLogStats().then((res) => res.json()),
    });
};

export { useAuditLogQuery, useAuditLogStatsQuery };
