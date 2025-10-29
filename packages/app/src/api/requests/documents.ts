import secureApiFetch from "services/api.js";

const requestDocuments = (limit: number = -1) => {
    return secureApiFetch(`/documents?limit=${limit}`, { method: "GET" });
};

const requestDocument = (documentId: number) => {
    return secureApiFetch(`/documents/${documentId}`, { method: "GET" });
};

const requestPostDocument = (document: any) => {
    return secureApiFetch(`/documents`, { method: "POST", body: JSON.stringify(document) });
};

const requestDeleteDocument = (documentId: number) => {
    return secureApiFetch(`/documents/${documentId}`, { method: "DELETE" });
};

export { requestDeleteDocument, requestDocument, requestDocuments, requestPostDocument };
