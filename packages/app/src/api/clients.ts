import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    requestOrganisation,
    requestOrganisationContacts,
    requestOrganisationDelete,
    requestOrganisations,
} from "./requests/organisations.js";

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

const useDeleteOrganisationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (organisationId: number) => requestOrganisationDelete(organisationId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["organisations"] });
        },
    });
};

export { useDeleteOrganisationMutation, useOrganisationContactsQuery, useOrganisationQuery, useOrganisationsQuery };
