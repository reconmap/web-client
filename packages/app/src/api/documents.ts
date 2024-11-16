import { buildApiRequest } from "services/api.js";

const API_PREFIX: string = "/documents";

const getDocument = (documentId: number): Request => {
    return buildApiRequest(`${API_PREFIX}/${documentId}`, {
        method: "GET",
    });
};

const getDocuments = (): Request => {
    return buildApiRequest(API_PREFIX, {
        method: "GET",
    });
};

const deleteDocument = (documentId: number): Request => {
    return buildApiRequest(`${API_PREFIX}/${documentId}`, {
        method: "DELETE",
    });
};

export { deleteDocument, getDocument, getDocuments };
