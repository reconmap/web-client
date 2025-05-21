import Badge from "components/badges/Badge";
import UserRoleBadge from "components/badges/UserRoleBadge";
import EmptyField from "components/ui/EmptyField";
import Ipv4Link from "components/ui/Ipv4Link";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import UserAgentLabel from "components/ui/UserAgentLabel";
import UserLink from "components/users/Link";

const AuditLogsTable = ({ auditLog, hideUserColumns = false }) => {
    const hasUserLocations = auditLog.some((entry) => entry.hasOwnProperty("user_location"));
    const numColumns = 4 + (hideUserColumns ? 0 : 2) + (hasUserLocations ? 1 : 0);

    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    {/** Who */}
                    {!hideUserColumns && (
                        <>
                            <th>User</th>
                            <th>Role</th>
                        </>
                    )}
                    <th>IP address</th>
                    {hasUserLocations && <th>Location</th>}
                    <th>User agent</th>
                    {/** What */}
                    <th>Action</th>
                    <th>Object</th>
                    <th>Context</th>
                    {/** When */}
                    <th>Date/Time</th>
                </tr>
            </thead>
            <tbody>
                {auditLog !== null && auditLog.length === 0 && <NoResultsTableRow numColumns={numColumns} />}
                {auditLog !== null &&
                    auditLog.map((entry) => {
                        return (
                            <tr key={entry.id}>
                                {!hideUserColumns && (
                                    <>
                                        <td>
                                            {entry.user_name ? (
                                                <UserLink userId={entry.user_id}>{entry.user_name}</UserLink>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td>
                                            <UserRoleBadge role={entry.user_role} />
                                        </td>
                                    </>
                                )}
                                <td>
                                    <Ipv4Link value={entry.client_ip} />
                                </td>
                                {hasUserLocations && (
                                    <td>{entry.user_location ? entry.user_location : <EmptyField />}</td>
                                )}
                                <td>{entry.user_agent ? <UserAgentLabel userAgent={entry.user_agent} /> : "-"}</td>
                                <td>
                                    <Badge>{entry.action}</Badge>
                                </td>
                                <td>{entry.object}</td>
                                <td>{entry.context ?? "-"}</td>
                                <td>{entry.insert_ts}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default AuditLogsTable;
