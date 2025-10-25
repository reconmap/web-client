import secureApiFetch from "services/api.js";

const requestAttachments = (params: any) => {
    return secureApiFetch("/attachments?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestAttachmentDelete = (attachmentId: number) => {
    return secureApiFetch(`/attachments/${attachmentId}`, { method: "DELETE" });
};

export { requestAttachmentDelete, requestAttachments };
