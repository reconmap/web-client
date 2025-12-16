import Configuration from "Configuration.js";
import secureApiFetch from "services/api.js";

const requestReports = (params: any) => {
    return secureApiFetch(
        "/reports?" + new URLSearchParams(params).toString(),
        { method: "GET" },
        Configuration.getIntegrationsApiUrl(),
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
        Configuration.getIntegrationsApiUrl(),
    );
};

const requestReportDelete = (reportId: number) => {
    return secureApiFetch(`/reports/${reportId}`, {
        method: "DELETE",
    });
};

export { requestReportDelete, requestReportPost, requestReports, requestReportsTemplates };
