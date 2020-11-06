import React, {useCallback, useEffect, useState} from 'react'
import Pagination from '../layout/Pagination';
import secureApiFetch from '../../services/api';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useSetTitle from '../../hooks/useSetTitle';
import {IconEye, IconSave} from '../ui/Icons';
import Breadcrumb from '../ui/Breadcrumb';
import BtnSecondary from '../ui/buttons/BtnSecondary';
import Title from '../ui/Title';
import AuditLogsTable from "./AuditLogsTable";

const AuditLogList = ({history}) => {
    const searchParams = new URLSearchParams(history.location.search);
    let pageNumber = searchParams.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    useSetTitle(`Audit log - Page ${pageNumber}`)

    const [auditLog, setAuditLog] = useState([])
    const [numberPages, setNumberPages] = useState(0)

    const handlePrev = () => {
        history.push(`/auditlog?page=${pageNumber - 1}`);
    }
    const handleNext = () => {
        history.push(`/auditlog?page=${pageNumber + 1}`);
    }

    const reloadData = useCallback(() => {
        secureApiFetch(`/auditlog?page=${apiPageNumber}`, {method: 'GET'})
            .then((response) => {
                if (response.headers.has('X-Page-Count')) {
                    setNumberPages(response.headers.get('X-Page-Count'))
                }
                return response.json()
            })
            .then((data) => {
                setAuditLog(data);
            })
    }, [apiPageNumber]);

    useEffect(() => {
        reloadData()
    }, [reloadData])

    const handleExport = () => {
        secureApiFetch(`/auditlog/export`, {method: 'GET'})
            .then(response => {
                const contentDispositionHeader = response.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
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

    return (
        <>
            <div className='heading'>
                <Breadcrumb history={history}/>
                <Pagination page={apiPageNumber} total={numberPages} handlePrev={handlePrev} handleNext={handleNext}/>
                <BtnSecondary onClick={handleExport}><IconSave/> Export to CSV</BtnSecondary>
            </div>
            <Title title='Audit Log' icon={<IconEye/>}/>
            {!auditLog ? <Loading/> : auditLog.length === 0 ? <NoResults/> :
                <AuditLogsTable auditLog={auditLog}/>}
        </>
    )
}

export default AuditLogList
