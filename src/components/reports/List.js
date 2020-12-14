import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import {Link} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import useDelete from '../../hooks/useDelete';
import {IconCode, IconDocument, IconReport} from '../ui/Icons';
import DeleteButton from "../ui/buttons/Delete";
import Title from '../ui/Title';
import BtnSecondary from "../ui/buttons/Secondary";
import NoResults from "../ui/NoResults";

const ReportsList = ({history}) => {
    useSetTitle('Saved Reports');
    const [reports, fetchReports] = useFetch('/reports')

    const handleSendByEmail = (reportId) => {
        history.push(`/report/${reportId}/send`);
    }

    const handleDownload = (reportId, contentType) => {
        secureApiFetch(`/reports/${reportId}`, {method: 'GET', headers: {'Content-Type': contentType}})
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

    const deleteReport = useDelete('/reports/', fetchReports);

    return <div>
        <div className='heading'>
            <Breadcrumb/>
        </div>
        <Title title='Saved Reports' icon={<IconReport/>}/>
        {!reports ? <Loading/> :
            <table className='w-full my-4'>
                <thead>
                <tr>
                    <th>Project</th>
                    <th>Version</th>
                    <th>Downloads</th>
                    <th>Creation date/time</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {reports.length === 0 ?
                    <tr>
                        <td colSpan="4"><NoResults/></td>
                    </tr> :
                    reports.map((report, index) => {
                        return (
                            <tr key={index}>
                                <td><Link to={`/projects/${report.project_id}`}>{report.project_name}</Link></td>
                                <td>{report.version_name} - {report.version_description}</td>
                                <td>
                                    <Link onClick={() => handleDownload(report.id, 'text/html')}>
                                        <div style={{
                                            width: '43px',
                                            height: '56px',
                                            borderTopRightRadius: '10px',
                                            borderWidth: '3px'
                                        }}
                                             className='  p-1 rounded text-xs  flex items-center justify-end font-medium flex-col'>
                                            <IconCode/> HTML
                                        </div>
                                    </Link>

                                    <Link onClick={() => handleDownload(report.id, 'application/pdf')}>
                                        <div style={{
                                            width: '43px',
                                            height: '56px',
                                            borderTopRightRadius: '10px',
                                            borderWidth: '3px'
                                        }}
                                             className='  p-1 rounded text-xs  flex items-center justify-end font-medium flex-col'>
                                            <IconDocument/> PDF
                                        </div>
                                    </Link>
                                </td>
                                <td>{report.insert_ts}</td>
                                <td className="space-x-2 flex  justify-end">
                                    <BtnSecondary onClick={() => handleSendByEmail(report.id)}>Send by
                                        email</BtnSecondary>
                                    <DeleteButton onClick={() => deleteReport(report.id)}/>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        }
    </div>
}

export default ReportsList
