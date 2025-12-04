import secureApiFetch from "services/api.js";

const requestReports = (params: any) => {
    return secureApiFetch(
        "/reports?" + new URLSearchParams(params).toString(),
        { method: "GET" },
        "http://localhost:5510",
    );
};

const requestReportsTemplates = (params: any = {}) => {
    return secureApiFetch("/reports/templates?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestReportPost = (params: any) => {
    return secureApiFetch(
        `/reports`,
        {
            method: "POST",
            body: JSON.stringify(params),
        },
        "http://localhost:5510",
    );
};

const requestReportDelete = (reportId: number) => {
    return secureApiFetch(`/reports/${reportId}`, {
        method: "DELETE",
    });
};

export { requestReportDelete, requestReportPost, requestReports, requestReportsTemplates };
