import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestReports = (params: any) => {
    return secureApiFetch("/reports?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestReportsTemplates = (params: any = {}) => {
    return secureApiFetch("/reports/templates?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestReportDelete = (reportId: number) => {
    return secureApiFetch(`/reports/${reportId}`, {
        method: "DELETE",
    });
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

const useDeleteReportMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (reportId: number) => requestReportDelete(reportId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};

export { useDeleteReportMutation, useReportsQuery, useReportsTemplatesQuery };
