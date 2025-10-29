import secureApiFetch from "services/api.js";

const API_BASE_URL = "/notes";

const requestComments = async (params: any) => {
    return (
        await secureApiFetch(`${API_BASE_URL}?` + new URLSearchParams(params).toString(), { method: "GET" })
    ).json();
};

const requestCommentDelete = (commentId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${commentId}`, {
        method: "DELETE",
    });
};

const requestCommentPost = async (comment: any) => {
    return (
        await secureApiFetch(`${API_BASE_URL}`, {
            method: "POST",
            body: JSON.stringify(comment),
        })
    ).json();
};

export { requestCommentDelete, requestCommentPost, requestComments };
