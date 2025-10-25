import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestVulnerabilities = (params: any) => {
    const url = "/vulnerabilities?" + new URLSearchParams(params).toString();

    return secureApiFetch(url, { method: "GET" });
};

const requestVulnerabilityCategories = (params: any) => {
    const url = "/vulnerabilities/categories?" + new URLSearchParams(params).toString();
    return secureApiFetch(url, { method: "GET" });
};

const requestVulnerabilitiesStats = (params: any) => {
    const url = "/vulnerabilities/stats?" + new URLSearchParams(params).toString();
    return secureApiFetch(url, { method: "GET" });
};

const requestVulnerability = (vulnerabilityId: number) => {
    return secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, { method: "GET" });
};

const requestVulnerabilityPost = (vulnerability: any) => {
    return secureApiFetch(`/vulnerabilities`, { method: "POST", body: JSON.stringify(vulnerability) });
};

const requestVulnerabilityCategoryDelete = (vulnerabilityCategoryId: number) => {
    return secureApiFetch(`/vulnerabilitiies/categories/${vulnerabilityCategoryId}`, { method: "DELETE" });
};

const requestVulnerabilityDelete = (vulnerabilityIds: number[]) => {
    return secureApiFetch(`/vulnerabilities`, {
        method: "PATCH",
        headers: {
            "Bulk-Operation": "DELETE",
        },
        body: JSON.stringify(vulnerabilityIds),
    });
};

const useVulnerabilitiesQuery = (params: any) => {
    return useQuery({
        queryKey: ["vulnerabilities"],
        queryFn: () => requestVulnerabilities(params).then((res) => res.json()),
    });
};

const useVulnerabilityCategoriesQuery = () => {
    return useQuery({
        queryKey: ["vulnerabilities"],
        queryFn: (params: any) => requestVulnerabilityCategories(params).then((res) => res.json()),
    });
};

const useVulnerabilitiesStatsQuery = (params: any) => {
    return useQuery({
        queryKey: ["vulnerabilities"],
        queryFn: () => requestVulnerabilitiesStats(params).then((res) => res.json()),
    });
};

const useVulnerabilityQuery = (vulnerabilityId: number) => {
    return useQuery({
        queryKey: ["vulnerabilities", vulnerabilityId],
        queryFn: () => requestVulnerability(vulnerabilityId).then((res) => res.json()),
    });
};

const useMutationPostDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (document: any) => requestVulnerabilityPost(document).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};

const useDeleteVulnerabilityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (vulnerabilityIds: number[]) =>
            requestVulnerabilityDelete(vulnerabilityIds).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] });
        },
    });
};

const useDeleteVulnerabilityCategoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (vulnerabilityCategoryId: number) =>
            requestVulnerabilityCategoryDelete(vulnerabilityCategoryId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] });
        },
    });
};

export {
    useDeleteVulnerabilityCategoryMutation,
    useDeleteVulnerabilityMutation,
    useMutationPostDocument,
    useVulnerabilitiesQuery,
    useVulnerabilitiesStatsQuery,
    useVulnerabilityCategoriesQuery,
    useVulnerabilityQuery,
};
