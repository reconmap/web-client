import secureApiFetch from "services/api.js";

const requestOrganisations = (params: any) => {
    const url = "/clients?" + new URLSearchParams(params).toString();
    return secureApiFetch(url, { method: "GET" });
};

const requestOrganisation = (organisationId: number) => {
    return secureApiFetch(`/clients/${organisationId}`, { method: "GET" });
};

const requestOrganisationContacts = (organisationId: number) => {
    return secureApiFetch(`/clients/${organisationId}/contacts`, { method: "GET" });
};

const requestOrganisationPost = (organisation: FormData) => {
    return secureApiFetch(`/clients`, {
        method: "POST",
        body: organisation,
    });
};

const requestOrganisationDelete = (organisationId: number) => {
    return secureApiFetch(`/clients/${organisationId}`, {
        method: "DELETE",
    });
};

export {
    requestOrganisation,
    requestOrganisationContacts,
    requestOrganisationDelete,
    requestOrganisationPost,
    requestOrganisations,
};
