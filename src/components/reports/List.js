import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import CreateButton from '../ui/buttons/Create';

const ReportsList = () => {
    useSetTitle('Reports');
    const [reports] = useFetch('/reports')

    return <div>
        <div className='heading'>
            <h1>Reports</h1>
            <CreateButton>Create Report</CreateButton>
        </div>
        {!reports ? <Loading /> : reports.length === 0 ? <NoResults /> :
            <div className='flex flex-wrap gap-4 my-4'>
                {reports.map((report) =>
                    <article className='base base-reactive w-48 h-64 justify-end'>
                        <p>{report.name}</p>
                        <h2>{report.description}</h2>
                    </article>
                )}
            </div>}
    </div>
}

export default ReportsList