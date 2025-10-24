import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const useSystemCustomFieldsQuery = () => {
    return useQuery({
        queryKey: ["system-custom-fields"],
        queryFn: () => requestCustomFields().then((res) => res.json()),
    });
};

const useSystemIntegrationsQuery = () => {
    return useQuery({
        queryKey: ["system-integrations"],
        queryFn: () => requestSystemIntegrations().then((res) => res.json()),
    });
};

const useRecentSearchesQuery = () => {
    return useQuery({
        queryKey: ["system-recent-searches"],
        queryFn: () => requestRecentSearches().then((res) => res.json()),
    });
};

const useSystemCustomFieldPostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (customFieldId: number) => requestCustomFieldPost(customFieldId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["system-custom-fields"] });
        },
    });
};

const useSystemCustomFieldDeletionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (customFieldId: number) => requestCustomFieldDeletion(customFieldId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["system-custom-fields"] });
        },
    });
};

export {
    useExportablesQuery,
    useRecentSearchesQuery,
    useSystemCustomFieldDeletionMutation,
    useSystemCustomFieldPostMutation,
    useSystemCustomFieldsQuery,
    useSystemHealthQuery,
    useSystemIntegrationsQuery,
    useSystemUsageQuery,
};
