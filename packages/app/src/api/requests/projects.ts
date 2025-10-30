import secureApiFetch from "services/api.js";
import { requestEntity, requestEntityPut } from "utilities/requests.js";

const API_BASE_URL = "/projects";

const requestProject = (projectId: number) => requestEntity(`${API_BASE_URL}/${projectId}`);

const requestProjects = async (params: Record<string, any>) => {
    const queryParams = new URLSearchParams(params).toString();
    const resp = await secureApiFetch(`/projects?` + queryParams, { method: "GET" });
    const projects: { data: any; pageCount?: string | null; totalCount?: string | null } = {
        data: await resp.json(),
    };
    if (resp.headers.has("X-Page-Count")) {
        projects.pageCount = resp.headers.get("X-Page-Count");
    }
    if (resp.headers.has("X-Total-Count")) {
        projects.totalCount = resp.headers.get("X-Total-Count");
    }
    return projects;
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

const requestProjectPost = (project: Record<string, any>) => {
    return secureApiFetch(`/projects`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const requestProjectPut = (projectId: number, data: any) =>
    requestEntityPut(`${API_BASE_URL}/${projectId}`, data);

const requestProjectUserDelete = (projectId: number, userId: number) => {
    return secureApiFetch(`/projects/${projectId}/users/${userId}`, {
        method: "DELETE",
    });
};

export {
    requestActiveProjects,
    requestProject,
    requestProjectCategories,
    requestProjectDelete,
    requestProjectPost,
    requestProjects,
    requestProjectUserDelete,
    requestProjectUsers,
    requestProjectVault,
};
