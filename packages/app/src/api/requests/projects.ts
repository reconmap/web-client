import secureApiFetch from "services/api.js";
import {
    requestEntities,
    requestEntity,
    requestEntityDelete,
    requestEntityPost,
    requestEntityPut,
} from "utilities/requests.js";

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
    return secureApiFetch(`/projects/${projectId}/members`, { method: "GET" });
};

export const requestProjectMemberPost = (projectId: number, userId: number) =>
    requestEntityPost(`/projects/${projectId}/members`, { userId });

const requestProjectUserDelete = (projectId: number, userId: number) =>
    requestEntityDelete(`/projects/${projectId}/members/${userId}`);

const requestProjectVault = (projectId: number) => {
    return secureApiFetch(`/projects/${projectId}/secrets`, { method: "GET" });
};

const requestActiveProjects = () => {
    return secureApiFetch(`/projects?status=active&page=0&limit=5`, { method: "GET" });
};

const requestProjectCategories = () => requestEntities(`${API_BASE_URL}/categories`);

const requestProjectDelete = (projectId: number) => requestEntityDelete(`${API_BASE_URL}/${projectId}`);

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

export {
    requestActiveProjects,
    requestProject,
    requestProjectCategories,
    requestProjectDelete,
    requestProjectPost,
    requestProjects,
    requestProjectUserDelete,
    requestProjectUsers,
    requestProjectVault
};

