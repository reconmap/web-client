import ExternalLink from "components/ui/ExternalLink";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import Title from "components/ui/Title";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";

const SystemIntegrationsPage = () => {
    const [integrations] = useFetch("/system/integrations");

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
            </div>
            <Title title="Integrations" />

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>External URL</th>
                        <th>Configured?</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {null === integrations && <LoadingTableRow numColumns={5} />}
                    {null !== integrations && 0 === integrations.length && <NoResultsTableRow numColumns={5} />}
                    {null !== integrations &&
                        0 !== integrations.length &&
                        integrations.map((integration, index) => (
                            <tr key={index}>
                                <td>{integration.name}</td>
                                <td>{integration.description}</td>
                                <td>
                                    <ExternalLink href={integration.externalUrl}>
                                        {integration.externalUrl}
                                    </ExternalLink>
                                </td>
                                <td>{integration.configured ? "Yes" : "No"}</td>
                                <td>-</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SystemIntegrationsPage;
