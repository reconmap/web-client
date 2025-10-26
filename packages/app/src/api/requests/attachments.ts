import secureApiFetch from "services/api.js";

const API_BASE_URL: string = "/attachments";

const requestAttachments = (params: any) => {
    return secureApiFetch("${API_BASE_URL}?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestAttachmentDelete = (attachmentId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${attachmentId}`, { method: "DELETE" });
};

export { requestAttachmentDelete, requestAttachments };
