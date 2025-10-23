import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const useDocuments = () => {
    return useQuery({
        queryKey: ["documents"],
        queryFn: () => requestDocuments().then((res) => res.json()),
    });
};

const useDocumentQuery = (documentId: number) => {
    return useQuery({
        queryKey: ["documents", documentId],
        queryFn: () => requestDocument(documentId).then((res) => res.json()),
    });
};

const useMutationPostDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (document: any) => requestPostDocument(document).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};

const useQueryDeleteDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (documentId: number) => requestDeleteDocument(documentId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};

export { useDocumentQuery, useDocuments, useMutationPostDocument, useQueryDeleteDocument };
