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

export { requestVulnerabilities, requestVulnerabilityPatch };
