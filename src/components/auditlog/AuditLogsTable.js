import Badge from 'components/badges/Badge';
import UserRoleBadge from 'components/badges/UserRoleBadge';
import Ipv4Link from 'components/ui/Ipv4Link';
import NoResultsTableRow from 'components/ui/NoResultsTableRow';
import UserAgentLabel from 'components/ui/UserAgentLabel';
import UserLink from 'components/users/Link';

const AuditLogsTable = ({ auditLog, hideUserColumns = false }) => {
    const numColumns = hideUserColumns ? 4 : 6;
    return (
        <table>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>IP address</th>
                    <th>User agent</th>
                    <th>Date/Time</th>
                    {!hideUserColumns &&
                        <>
                            <th>User</th>
                            <th>Role</th>
                        </>
                    }
                    <th>Object</th>
                </tr>
            </thead>
            <tbody>
                {auditLog.length === 0 && <NoResultsTableRow numColumns={numColumns} />}
                {auditLog.map((entry, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <Badge>{entry.action}</Badge>
                            </td>
                            <td><Ipv4Link value={entry.client_ip} /></td>
                            <td>{entry.user_agent ? <UserAgentLabel userAgent={entry.user_agent} /> : '-'}</td>
                            <td>{entry.insert_ts}</td>
                            {!hideUserColumns &&
                                <>
                                    <td>{entry.user_name ?
                                        <UserLink userId={entry.user_id}>{entry.user_name}</UserLink> : '-'}</td>
                                    <td><UserRoleBadge role={entry.user_role} /></td>
                                </>
                            }
                            <td>{entry.object}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default AuditLogsTable;
