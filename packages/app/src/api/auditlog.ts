import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestAuditLog = async (params: any) => {
    const resp = await secureApiFetch(`/auditlog?` + new URLSearchParams(params).toString(), { method: "GET" });
    const commands: { data: any; pageCount?: string | null; totalCount?: string | null } = {
        data: await resp.json(),
    };
    if (resp.headers.has("X-Page-Count")) {
        commands.pageCount = resp.headers.get("X-Page-Count");
    }
    if (resp.headers.has("X-Total-Count")) {
        commands.totalCount = resp.headers.get("X-Total-Count");
    }
    return commands;
};

const requestAuditLogStats = () => {
    return secureApiFetch("/auditlog/stats", { method: "GET" });
};

const useAuditLogQuery = (params: any) => {
    return useQuery({
        queryKey: ["audit-log", params],
        queryFn: () => requestAuditLog(params),
    });
};

const useAuditLogStatsQuery = () => {
    return useQuery({
        queryKey: ["audit-log"],
        queryFn: () => requestAuditLogStats().then((res) => res.json()),
    });
};

export { useAuditLogQuery, useAuditLogStatsQuery };
