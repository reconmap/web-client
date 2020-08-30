import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from '../ui/buttons/Delete';
import useDelete from '../../hooks/useDelete';
import { IconDownloadDocument, IconCode, IconDocument } from '../icons';

const ReportsList = ({ history }) => {
    useSetTitle('Saved Reports');
    const [reports, fetchReports] = useFetch('/reports')
    const handleDownload = (reportId) => {
        secureApiFetch(`/reports/${reportId}/download`, { method: 'GET' })
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

    const deleteReport = useDelete('/reports/', fetchReports);

    return <div>
            <div className='heading'>

                <Breadcrumb path={history.location.pathname} />
            </div>
            <h1>Saved reports</h1>
        {!reports ? <Loading /> : reports.length === 0 ? <NoResults /> :
            <table className='w-full my-4'>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th></th>
                        <th>Date/Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => {
                        return (
                            <tr key={index}>
                                <th><Link to={`/project/${report.project_id}`}>{report.project_name}</Link></th>
                                <td>
                                <div style={{ width: '43px', height:'56px', borderTopRightRadius:'10px', borderWidth:'3px'}} className='  p-1 rounded text-xs border-gray-700 flex items-center justify-end font-medium flex-col'>
                                    {report.format ==='pdf' ? <IconDocument size={4}/> : <IconCode size={4} />}
                                    {report.format}
                                </div>
                                </td>
                                <td>{report.insert_ts}</td>
                                <td  className="  gap-5 flex items-center justify-end  ">
                                    <button onClick={() => handleDownload(report.id)}><IconDownloadDocument styling='mr-2' /> Download</button>
                                    <DeleteButton onClick={() => deleteReport(report.id)} />
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