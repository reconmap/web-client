import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestProject = (projectId: number) => {
    return secureApiFetch(`/projects/${projectId}`, { method: "GET" });
};

const useProjectQuery = (projectId: number) => {
    return useQuery({
        queryKey: ["projects", projectId],
        queryFn: () => requestProject(projectId).then((res) => res.json()),
    });
};

const requestActiveProjects = () => {
    return secureApiFetch(`/projects?status=active&page=0&limit=5`, { method: "GET" });
};

const useQueryActiveProjects = () => {
    return useQuery({
        queryKey: ["projects", { status: "active" }],
        queryFn: () => requestActiveProjects().then((res) => res.json()),
    });
};

export { useProjectQuery, useQueryActiveProjects };
