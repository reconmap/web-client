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
    return (
        await secureApiFetch(`/notes`, {
            method: "POST",
            body: JSON.stringify(comment),
        })
    ).json();
};

export { requestCommentDelete, requestComments, requestPostComment };
