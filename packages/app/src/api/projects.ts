import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestProject = (projectId: number) => {
    return secureApiFetch(`/projects/${projectId}`, { method: "GET" });
};

const requestProjects = (params: Record<string, any>) => {
    const queryParams = new URLSearchParams(params).toString();
    return secureApiFetch(`/projects?${queryParams}`, { method: "GET" });
};

const requestProjectUsers = (projectId: number) => {
    return secureApiFetch(`/projects/${projectId}/users`, { method: "GET" });
};

const requestProjectVault = (projectId: number) => {
    return secureApiFetch(`/projects/${projectId}/vault`, { method: "GET" });
};

const requestActiveProjects = () => {
    return secureApiFetch(`/projects?status=active&page=0&limit=5`, { method: "GET" });
};

const requestProjectCategories = () => {
    return secureApiFetch(`/project/categories`, { method: "GET" });
};

const requestProjectDelete = (projectId: number) => {
    return secureApiFetch(`/projects/${projectId}`, {
        method: "DELETE",
    });
};

const useProjectQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["projects", projectId],
        queryFn: () => requestProject(projectId).then((res) => res.json()),
    });
};

const useProjectsQuery = (params: Record<string, any>) => {
    return useQuery({
        queryKey: ["projects", params],
        queryFn: () => requestProjects(params).then((res) => res.json()),
    });
};

const useQueryActiveProjects = () => {
    return useQuery({
        queryKey: ["projects", { status: "active" }],
        queryFn: () => requestActiveProjects().then((res) => res.json()),
    });
};

const useProjectUsersQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => requestProjectUsers(projectId).then((res) => res.json()),
    });
};
const useProjectVaultQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => requestProjectVault(projectId).then((res) => res.json()),
    });
};

const useProjectCategoriesQuery = () => {
    return useQuery({
        queryKey: ["projects", { status: "active" }],
        queryFn: () => requestProjectCategories().then((res) => res.json()),
    });
};

const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectId: number) => requestProjectDelete(projectId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["vulnerabilities"] });
        },
    });
};

export {
    useDeleteProjectMutation,
    useProjectCategoriesQuery,
    useProjectQuery,
    useProjectsQuery,
    useProjectUsersQuery,
    useProjectVaultQuery,
    useQueryActiveProjects,
};
