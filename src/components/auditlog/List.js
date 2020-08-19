import React, { Component } from 'react'
import configuration from '../../Configuration';

class AuditLogList extends Component {
    state = {
        auditLog: []
    }

    handleExport() {
        fetch(`${configuration.api.baseUrl}/auditlog/export`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                var contentDispositionHeader = response.headers.get('Content-Disposition');
                var filename = contentDispositionHeader.split('filename=')[1].split(';')[0];
                return Promise.all([response.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const filename = values[1];
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
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
            <>
                <div className='heading'>
                    <h1>Audit Log</h1>
                    <button onClick={this.handleExport}>Export to CSV</button>
                </div>
                    <table className='w-full'>
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
            </>
        )
    }
}

export default AuditLogList
