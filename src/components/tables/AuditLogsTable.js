import React from 'react'
import { Link } from 'react-router-dom'
import Ipv4Link from '../ui/Ipv4Link'
import UserRoleBadge from '../badges/UserRoleBadge'

export default function AuditLogsTable({auditLog}) {
    return (
        <table className='w-full'>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Date/Time</th>
                        <th>IP</th>
                        <th>User</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {auditLog.map((entry, index) => {
                        return (
                            <tr key={index}>
                                <th>{entry.action}</th>
                                <td>{entry.insert_ts}</td>
                                <td><Ipv4Link value={entry.client_ip} /></td>
                                <td><Link to={`/user/${entry.user_id}`}>{entry.name}</Link></td>
                                <td > <UserRoleBadge role={entry.role} /> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    )
}
