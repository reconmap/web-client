import VulnerabilityBadge from "components/badges/VulnerabilityBadge";
import Loading from "components/ui/Loading";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import useFetch from "hooks/useFetch";
import DashboardWidget from "./Widget";

const RecentVulnerabilitiesWidget = () => {
    const [vulnerabilities] = useFetch(`/vulnerabilities?limit=5&orderColumn=insert_ts&orderDirection=desc`);

    if (!vulnerabilities) return <Loading />;

    return (
        <DashboardWidget title="Recent vulnerabilities">
            {vulnerabilities.length === 0 ? (
                <p>No vulnerabilities to show.</p>
            ) : (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Summary</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vulnerabilities.map((vulnerability) => (
                            <tr key={vulnerability.id}>
                                <td>
                                    <VulnerabilityBadge key={vulnerability.id} vulnerability={vulnerability} />
                                </td>
                                <td>
                                    <RelativeDateFormatter date={vulnerability.insert_ts} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </DashboardWidget>
    );
};

export default RecentVulnerabilitiesWidget;
