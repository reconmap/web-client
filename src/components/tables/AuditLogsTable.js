import Ipv4Link from '../ui/Ipv4Link'
import UserRoleBadge from '../badges/UserRoleBadge'
import UserLink from "../users/Link";

export default function AuditLogsTable({auditLog, hideUserColumns = false}) {
    return (
        <table className='w-full'>
            <thead>
            <tr>
                <th>Date/Time</th>
                <th>IP address</th>
                {!hideUserColumns &&
                <>
                    <th>User</th>
                    <th>Role</th>
                </>
                }
                <th>Action</th>
                <th>Object</th>
            </tr>
            </thead>
            <tbody>
            {auditLog.map((entry, index) => {
                return (
                    <tr key={index}>
                        <td>{entry.insert_ts}</td>
                        <td><Ipv4Link value={entry.client_ip}/></td>
                        {!hideUserColumns &&
                        <>
                            <td><UserLink userId={entry.user_id}>{entry.name}</UserLink></td>
                            <td><UserRoleBadge role={entry.role}/></td>
                        </>
                        }
                        <td>{entry.action}</td>
                        <td>{entry.object}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
