import { useQuery } from "@tanstack/react-query";
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

const useOrganisationsQuery = (params: any) => {
    return useQuery({
        queryKey: ["organisations"],
        queryFn: () => requestOrganisations(params).then((res) => res.json()),
    });
};

const useOrganisationQuery = (clientId: number) => {
    return useQuery({
        queryKey: ["organisations"],
        queryFn: () => requestOrganisation(clientId).then((res) => res.json()),
    });
};

const useOrganisationContactsQuery = (clientId: number) => {
    return useQuery({
        queryKey: ["organisations"],
        queryFn: () => requestOrganisationContacts(clientId).then((res) => res.json()),
    });
};

export { useOrganisationContactsQuery, useOrganisationQuery, useOrganisationsQuery };
