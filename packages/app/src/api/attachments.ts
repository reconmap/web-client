import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestAttachments = (params: any) => {
    return secureApiFetch("/attachments?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const requestAttachmentDelete = (attachmentId: number) => {
    return secureApiFetch(`/attachments/${attachmentId}`, { method: "DELETE" });
};

const useAttachmentsQuery = (params: any) => {
    return useQuery({
        queryKey: ["attachments"],
        queryFn: () => requestAttachments(params).then((res) => res.json()),
    });
};

const useAttachmentDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (attachmentId: number) => requestAttachmentDelete(attachmentId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["attachments"] });
        },
    });
};

export { useAttachmentDeleteMutation, useAttachmentsQuery };
