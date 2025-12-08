import secureApiFetch from "services/api.js";
import { requestEntityDelete, requestEntityPost, requestEntityPut } from "utilities/requests.js";

const API_BASE_URL = "/vulnerabilities";

const requestVulnerabilities = async (params: Record<string, any>) => {
    const queryParams = new URLSearchParams(params).toString();
    const resp = await secureApiFetch(`${API_BASE_URL}?` + queryParams, { method: "GET" });
    const vulnerabilities: { data: any; pageCount?: string | null; totalCount?: string | null } = {
        data: await resp.json(),
    };
    if (resp.headers.has("X-Page-Count")) {
        vulnerabilities.pageCount = resp.headers.get("X-Page-Count");
    }
    if (resp.headers.has("X-Total-Count")) {
        vulnerabilities.totalCount = resp.headers.get("X-Total-Count");
    }
    return vulnerabilities;
};

const requestVulnerabilityPatch = (vulnerabilityId: number, data: any): Promise<Response> => {
    return secureApiFetch(`${API_BASE_URL}/${vulnerabilityId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

const requestVulnerabilitiesStats = (params: any) => {
    const url = "/vulnerabilities/stats?" + new URLSearchParams(params).toString();
    return secureApiFetch(url, { method: "GET" });
};

const requestVulnerability = (vulnerabilityId: number) => {
    return secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, { method: "GET" });
};

const requestVulnerabilityPost = (vulnerability: any) => requestEntityPost(API_BASE_URL, vulnerability);

const requestVulnerabilityCategories = (params: any) => {
    const url = "/vulnerabilities/categories?" + new URLSearchParams(params).toString();
    return secureApiFetch(url, { method: "GET" });
};

export const requestVulnerabilityCategoryPut = (categoryId: number, data: any) =>
    requestEntityPut(`/vulnerabilities/categories/${categoryId}`, data);

const requestVulnerabilityCategoryDelete = (categoryId: number) =>
    requestEntityDelete(`/vulnerabilities/categories/${categoryId}`);

const requestVulnerabilityDelete = (vulnerabilityId: number) => {
    return secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, {
        method: "DELETE",
    });
};

export {
    requestVulnerabilities,
    requestVulnerabilitiesStats,
    requestVulnerability,
    requestVulnerabilityCategories,
    requestVulnerabilityCategoryDelete,
    requestVulnerabilityDelete,
    requestVulnerabilityPatch,
    requestVulnerabilityPost,
};
