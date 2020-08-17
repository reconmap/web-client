import React, { Component } from 'react'
import configuration from '../../Configuration';

class AuditLogList extends Component {
    state = {
        auditLog: []
    }

    componentDidMount() {
        fetch(`${configuration.api.baseUrl}/auditlog`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((auditLog) => this.setState({ auditLog: auditLog }));
    }

    render() {
        return (
            <div>
                <h1>Audit Log</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>IP</th>
                            <th>Action</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.auditLog.map((entry, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{entry.insert_ts}</td>
                                        <td>{entry.client_ip}</td>
                                        <td>{entry.action}</td>
                                        <td>{entry.name}</td>
                                        <td>{entry.email}</td>
                                        <td>{entry.role}</td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AuditLogList
