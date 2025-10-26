import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestReportDelete, requestReports, requestReportsTemplates } from "./requests/reports.js";

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
