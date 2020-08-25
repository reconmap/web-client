import React, { useState, useEffect } from 'react'
import Pagination from '../layout/Pagination';
import Ipv4Link from '../ui/Ipv4Link';
import secureApiFetch from '../../services/api';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useSetTitle from '../../hooks/useSetTitle';
import { IconSave } from '../icons';
import Breadcrumb from '../ui/Breadcrumb';

const AuditLogList = ({ history }) => {
    useSetTitle('Reports');

    const [auditLog, setAuditLog] = useState([])
    const [pagination, setPagination] = useState({ page: 0, total: 1 })

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
        reloadData()
    }
    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
        reloadData()
    }

    const reloadData = () => {
        secureApiFetch(`/auditlog?page=${pagination.page}`, { method: 'GET' })
            .then((response) => {
                if (response.headers.has('X-Page-Count')) {
                   setPagination({...pagination, total: response.headers.get('X-Page-Count')})
                }    
                return response.json()
            })
            .then((data) => {
                setAuditLog(data);
            })
    }

    useEffect(() => {
        reloadData()
    }, [])

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

    return (<>
        <Breadcrumb path={history.location.pathname} />

        <div className='heading'>
            <h1>Audit Log</h1>
            <Pagination page={pagination.page} total={pagination.total} handlePrev={handlePrev} handleNext={handleNext} />
            <button onClick={handleExport}><IconSave styling='mr-2' /> Export to CSV</button>
        </div>
        {!auditLog ? <Loading /> : auditLog.length === 0 ? <NoResults /> :
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
                    {auditLog.map((entry, index) => {
                        return (
                            <tr key={index}>
                                <td>{entry.insert_ts}</td>
                                <td><Ipv4Link value={entry.client_ip} /></td>
                                <td>{entry.action}</td>
                                <td><Link to={`/user/${entry.user_id}`}>{entry.name}</Link></td>
                                <td>{entry.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>}
    </>
    )
}

export default AuditLogList
