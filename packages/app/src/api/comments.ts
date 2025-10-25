import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestComments = async (params: any) => {
    return (await secureApiFetch("/notes?" + new URLSearchParams(params).toString(), { method: "GET" })).json();
};

const requestCommentDelete = (taskId: number) => {
    return secureApiFetch(`/notes/${taskId}`, {
        method: "DELETE",
    });
};

const requestPostComment = async (comment: any) => {
    return (await secureApiFetch(`/notes`, {
        method: "POST",
        body: JSON.stringify(comment),
    })).json();
};

const useNotesQuery = (params: any) => {
    return useQuery({
        queryKey: ["comments"],
        queryFn: () => requestComments(params),
    });
};

const useDeleteCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId: number) => requestCommentDelete(commentId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });
};

const useCreateCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (comment: any) => requestPostComment(comment).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });
};


export { useDeleteCommentMutation, useCreateCommentMutation, useNotesQuery };
