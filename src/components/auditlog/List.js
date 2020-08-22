import React, { Component } from 'react'
import configuration from '../../Configuration';
import Pagination from '../layout/Pagination';
import Ipv4Link from '../ui/Ipv4Link';
import secureApiFetch from '../../services/api';
import { Link } from 'react-router-dom';

class AuditLogList extends Component {
    constructor(props) {
        super(props)
        this.handleNext = this.handleNext.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
    }
    state = {
        auditLog: [],
        pagination: {
            page: 1,
            total: 43
        }
    }

    handleExport() {
        secureApiFetch(`/auditlog/export`, {
            method: 'GET'
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
        secureApiFetch(`/auditlog?page=${this.state.pagination.page}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((auditLog) => this.setState({ auditLog: auditLog }));
    }
    handlePrev() {
        this.setState(prevState => {
            return this.state.pagination.page = prevState.pagination.page - 1
        })
    }
    handleNext() {
        this.setState(prevState => {
            return this.state.pagination.page = prevState.pagination.page + 1
        })
    }
    render() {
        return (
            <>
                <div className='heading'>
                    <h1>Audit Log</h1>
                    <Pagination
                        page={this.state.pagination.page}
                        total={this.state.pagination.total}
                        handlePrev={this.handlePrev}
                        handleNext={this.handleNext}
                    />
                    <button onClick={this.handleExport}>Export to CSV</button>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>IP</th>
                            <th>Action</th>
                            <th>User</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.auditLog.map((entry, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{entry.insert_ts}</td>
                                        <td><Ipv4Link value={entry.client_ip} /></td>
                                        <td>{entry.action}</td>
                                        <td><Link to={`/user/${entry.user_id}`}>{entry.name}</Link></td>
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
