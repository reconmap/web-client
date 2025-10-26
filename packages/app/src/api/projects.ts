import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    requestProject,
    requestProjectCategories,
    requestProjectDelete,
    requestProjects,
    requestProjectUsers,
    requestProjectVault,
} from "./requests/projects.js";

const useProjectQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => requestProject(projectId).then((res) => res.json()),
    });
};

const useProjectsQuery = (params: Record<string, any>) => {
    return useQuery({
        queryKey: ["projects", params],
        queryFn: () => requestProjects(params),
    });
};

const useProjectUsersQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["project", "users", projectId],
        queryFn: () => requestProjectUsers(projectId).then((res) => res.json()),
    });
};
const useProjectVaultQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["project", "vault", projectId],
        queryFn: () => requestProjectVault(projectId).then((res) => res.json()),
    });
};

const useProjectCategoriesQuery = () => {
    return useQuery({
        queryKey: ["project", "categories"],
        queryFn: () => requestProjectCategories().then((res) => res.json()),
    });
};

const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectId: number) => requestProjectDelete(projectId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
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
};
