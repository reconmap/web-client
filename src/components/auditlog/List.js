import React, { useState, useEffect } from 'react'
import Pagination from '../layout/Pagination';
import secureApiFetch from '../../services/api';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useSetTitle from '../../hooks/useSetTitle';
import { IconSave } from '../icons';
import Breadcrumb from '../ui/Breadcrumb';
import AuditLogsTable from '../tables/AuditLogsTable';

const AuditLogList = ({ history }) => {
    useSetTitle('Reports');

    const [auditLog, setAuditLog] = useState([])
    const [pagination, setPagination] = useState({ page: 0, total: 0 })

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }
    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
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
        pagination && reloadData()
    }, [pagination.page])

    const handleExport = () => {
        secureApiFetch(`/auditlog/export`, { method: 'GET' })
            .then(response => {
                var contentDispositionHeader = response.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                var filename = filenameRe.exec(contentDispositionHeader)[1]
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

        <div className='heading'>
            <Breadcrumb path={history.location.pathname} />
            <Pagination page={pagination.page} total={pagination.total} handlePrev={handlePrev} handleNext={handleNext} />
            <button onClick={handleExport}><IconSave styling='mr-2' /> Export to CSV</button>
        </div>
        <h1>Audit Log</h1>
        {!auditLog ? <Loading /> : auditLog.length === 0 ? <NoResults /> :
            <AuditLogsTable auditLog={auditLog}/>}
    </>
    )
}

export default AuditLogList
