import NativeButtonGroup from "components/form/NativeButtonGroup";
import Title from "components/ui/Title";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ExportButton from "components/ui/buttons/ExportButton";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import OrganisationTypes from "models/OrganisationTypes.js";
import { useTranslation } from "react-i18next";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import ExternalLink from "../ui/ExternalLink";
import LinkButton from "../ui/buttons/Link";
import ClientLink from "./Link";
import OrganisationsUrls from "./OrganisationsUrls";

const ClientsList = () => {
    const [t] = useTranslation();

    const [clients, updateTasks] = useFetch("/clients");

    const destroy = useDelete("/clients/", updateTasks);

    return (
        <>
            <div className="heading">
                <Breadcrumb />

                <NativeButtonGroup>
                    <LinkButton href={OrganisationsUrls.Create}>{t("Add organisation")}</LinkButton>
                    <ExportButton entity="clients" disabled={clients === null || clients?.length === 0} />
                </NativeButtonGroup>
            </div>
            <Title title={t("Organisations")} />

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>{t("Type")}</th>
                        <th>{t("Name")}</th>
                        <th>Address</th>
                        <th>URL</th>
                        <th>Number of contacts</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {null === clients && <LoadingTableRow numColumns={5} />}
                    {null !== clients && 0 === clients.length && <NoResultsTableRow numColumns={5} />}
                    {null !== clients &&
                        0 < clients.length &&
                        clients.map((client) => (
                            <tr key={client.id}>
                                <td>{OrganisationTypes[client.kind]}</td>
                                <td>
                                    <ClientLink clientId={client.id}>{client.name}</ClientLink>
                                </td>
                                <td>{client.address || "-"}</td>
                                <td>
                                    {client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : "-"}
                                </td>
                                <td>{client.num_contacts}</td>
                                <td>
                                    <LinkButton href={OrganisationsUrls.Edit.replace(":organisationId", client.id)}>
                                        {t("Edit")}
                                    </LinkButton>
                                    <DeleteIconButton onClick={() => destroy(client.id)} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default ClientsList;
