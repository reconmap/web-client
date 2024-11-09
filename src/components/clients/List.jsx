import NativeButtonGroup from "components/form/NativeButtonGroup";
import PageTitle from "components/logic/PageTitle";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ExportButton from "components/ui/buttons/ExportButton";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import ExternalLink from "../ui/ExternalLink";
import CreateButton from "../ui/buttons/Create";
import LinkButton from "../ui/buttons/Link";
import ClientLink from "./Link";

const ClientsList = () => {
    const navigate = useNavigate();
    const [clients, updateTasks] = useFetch("/clients");

    const destroy = useDelete("/clients/", updateTasks);

    const handleCreateClient = () => {
        navigate(`/clients/create`);
    };

    useDocumentTitle("Clients");

    return (
        <>
            <div className="heading">
                <Breadcrumb />

                <NativeButtonGroup>
                    <CreateButton onClick={handleCreateClient}>Add client</CreateButton>
                    <ExportButton entity="clients" disabled={clients === null || clients?.length === 0} />
                </NativeButtonGroup>
            </div>
            <PageTitle title="Clients" />

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
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
                                <td>
                                    <ClientLink clientId={client.id}>{client.name}</ClientLink>
                                </td>
                                <td>{client.address || "-"}</td>
                                <td>
                                    {client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : "-"}
                                </td>
                                <td>{client.num_contacts}</td>
                                <td>
                                    <LinkButton href={`/clients/${client.id}/edit`}>Edit</LinkButton>
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
