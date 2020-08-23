import React, { Component, useState } from 'react'
import Pagination from '../layout/Pagination';
import Ipv4Link from '../ui/Ipv4Link';
import secureApiFetch from '../../services/api';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useSetTitle from '../../hooks/useSetTitle';
import { IconSave } from '../icons';

const AuditLogList = () => {
    useSetTitle('Reports');

    const [ pagination, setPagination ] = useState({ page: 1, total: 10 })

    const handlePrev = () => { setPagination({...pagination, page: pagination.page-1} ) }
    const handleNext = () => { setPagination({...pagination, page: pagination.page+1} ) }

    const [auditLog, update, error] = useFetch(`/auditlog?page=${pagination.page}`)

    const handleExport = () => {
        secureApiFetch(`/auditlog/export`, { method: 'GET' })
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

        return ( <>
                <div className='heading'>
                    <h1>Audit Log</h1>
                    <Pagination page={pagination.page} total={pagination.total} handlePrev={handlePrev} handleNext={handleNext} />
                    <button onClick={handleExport}><IconSave styling='mr-2'/> Export to CSV</button>
                </div>
            { !auditLog ? <Loading /> : auditLog.length === 0 ? <NoResults /> :
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
                        { auditLog.map((entry, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{entry.insert_ts}</td>
                                        <td><Ipv4Link value={entry.client_ip} /></td>
                                        <td>{entry.action}</td>
                                        <td><Link to={`/user/${entry.user_id}`}>{entry.name}</Link></td>
                                        <td>{entry.role}</td>
                                    </tr>
                                )
                            } ) }
                    </tbody>
                </table>}
            </>
        )
}

export default AuditLogList
