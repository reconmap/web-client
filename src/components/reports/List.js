import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const ReportsList = () => {
    useSetTitle('Save eports');
    const [reports] = useFetch('/reports')

    return <div>
        <div className='heading'>
            <h1>Saved reports</h1>
        </div>
        {!reports ? <Loading /> : reports.length === 0 ? <NoResults /> :
            <table className='w-full my-4'>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Format</th>
                        <th>Date/Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => {
                        return (
                            <tr key={index}>
                                <td><Link to={`/project/${report.project_id}`}>{report.project_name}</Link></td>
                                <td>{report.format}</td>
                                <td>{report.insert_ts}</td>
                                <td>
                                    <Link to={`/reports/${report.id}/download`}>Download</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        }
    </div>
}

export default ReportsList