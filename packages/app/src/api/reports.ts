import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestReports = (params: any) => {
    return secureApiFetch("/reports?" + new URLSearchParams(params).toString(), { method: "GET" });
};
const requestReportsTemplates = (params: any = {}) => {
    return secureApiFetch("/reports/templates?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const useReportsQuery = (params: any) => {
    return useQuery({
        queryKey: ["reports"],
        queryFn: () => requestReports(params).then((res) => res.json()),
    });
};

const useReportsTemplatesQuery = (params: any) => {
    return useQuery({
        queryKey: ["reports"],
        queryFn: () => requestReportsTemplates(params).then((res) => res.json()),
    });
};

export { useReportsQuery, useReportsTemplatesQuery };
