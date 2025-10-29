import secureApiFetch from "services/api.js";

const API_BASE_URL = "/contacts";

const requestContactDelete = (contactId: number) => {
    return secureApiFetch(`${API_BASE_URL}/${contactId}`, {
        method: "DELETE",
    });
};

const requestContactPost = async (contact: any) => {
    return (
        await secureApiFetch(`${API_BASE_URL}`, {
            method: "POST",
            body: JSON.stringify(contact),
        })
    ).json();
};

export { requestContactDelete, requestContactPost };
