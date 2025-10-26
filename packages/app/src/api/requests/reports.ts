import secureApiFetch from "services/api.js";

const requestReports = (params: any) => {
    return secureApiFetch("/reports?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestReportsTemplates = (params: any = {}) => {
    return secureApiFetch("/reports/templates?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestReportDelete = (reportId: number) => {
    return secureApiFetch(`/reports/${reportId}`, {
        method: "DELETE",
    });
};

export { requestReportDelete, requestReports, requestReportsTemplates };
