import secureApiFetch from "services/api.js";

const API_BASE_URL = "/vulnerabilities";

const requestVulnerabilities = async (params: Record<string, any>) => {
    const queryParams = new URLSearchParams(params).toString();
    const resp = await secureApiFetch(`${API_BASE_URL}?` + queryParams, { method: "GET" });
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

const requestVulnerabilityPost = (vulnerability: any) => {
    return secureApiFetch(`/vulnerabilities`, { method: "POST", body: JSON.stringify(vulnerability) });
};

const requestVulnerabilityCategories = (params: any) => {
    const url = "/vulnerabilities/categories?" + new URLSearchParams(params).toString();
    return secureApiFetch(url, { method: "GET" });
};

const requestVulnerabilityCategoryDelete = (vulnerabilityCategoryId: number) => {
    return secureApiFetch(`/vulnerabilities/categories/${vulnerabilityCategoryId}`, { method: "DELETE" });
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
