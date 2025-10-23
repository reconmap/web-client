import { useQuery } from "@tanstack/react-query";
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

const useExportablesQuery = () => {
    return useQuery({
        queryKey: ["system-exportables"],
        queryFn: () => requestExportables().then((res) => res.json()),
    });
};

const useSystemHealthQuery = () => {
    return useQuery({
        queryKey: ["system-health"],
        queryFn: () => requestSystemHealth().then((res) => res.json()),
    });
};

const useSystemUsageQuery = () => {
    return useQuery({
        queryKey: ["system-usage"],
        queryFn: () => requestSystemUsage().then((res) => res.json()),
    });
};

export { useExportablesQuery, useSystemHealthQuery, useSystemUsageQuery };
