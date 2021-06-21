import PageTitle from 'components/logic/PageTitle';
import useQuery from 'hooks/useQuery';
import React, { useCallback, useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import Pagination from '../layout/Pagination';
import Breadcrumb from '../ui/Breadcrumb';
import SecondaryButton from '../ui/buttons/Secondary';
import { IconEye, IconSave } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Title from '../ui/Title';
import AuditLogsTable from "./AuditLogsTable";

const AuditLogList = ({ history }) => {
    const query = useQuery();
    let pageNumber = query.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [auditLog, setAuditLog] = useState([]);
    const [numberPages, setNumberPages] = useState(1);

    const handlePrev = () => {
        history.push(`/auditlog?page=${pageNumber - 1}`);
    }
    const handleNext = () => {
        history.push(`/auditlog?page=${pageNumber + 1}`);
    }

    const reloadData = useCallback(() => {
        secureApiFetch(`/auditlog?page=${apiPageNumber}`, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                return resp.json()
            })
            .then((data) => {
                setAuditLog(data);
            })
    }, [apiPageNumber]);

    useEffect(() => {
        reloadData()
    }, [reloadData])

    const handleExport = () => {
        secureApiFetch(`/system/data?entities=auditlog`, { method: 'GET' })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
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

    return (
        <>
            <PageTitle value={`Audit log - Page ${pageNumber}`} />
            <div className='heading'>
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
                <Pagination page={apiPageNumber} total={numberPages} handlePrev={handlePrev} handleNext={handleNext} />
                <SecondaryButton onClick={handleExport}><IconSave /> Export</SecondaryButton>
            </div>
            <Title type="System" title='Audit Log' icon={<IconEye />} />
            {!auditLog ? <Loading /> : auditLog.length === 0 ? <NoResults /> :
                <AuditLogsTable auditLog={auditLog} />}
        </>
    )
}

export default AuditLogList;
