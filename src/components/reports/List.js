import { Link } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from "../ui/buttons/Delete";
import SecondaryButton from "../ui/buttons/Secondary";
import { IconCode, IconDocument, IconReport } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResults from "../ui/NoResults";
import Title from '../ui/Title';

const ReportsList = ({ history }) => {
    useSetTitle('Saved Reports');
    const [reports, fetchReports] = useFetch('/reports')

    const handleSendByEmail = (reportId) => {
        history.push(`/report/${reportId}/send`);
    }

    const handleDownload = (reportId, contentType) => {
        secureApiFetch(`/reports/${reportId}`, { method: 'GET', headers: { 'Content-Type': contentType } })
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

    const deleteReport = useDelete('/reports/', fetchReports);

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
            </Breadcrumb>
        </div>
        <Title title='Saved Reports' icon={<IconReport />} />
        {!reports ? <Loading /> :
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
                            <td colSpan="4"><NoResults /></td>
                        </tr> :
                        reports.map((report, index) => {
                            return (
                                <tr key={index}>
                                    <td><Link to={`/projects/${report.project_id}`}>{report.project_name}</Link></td>
                                    <td>{report.version_name} - {report.version_description}</td>
                                    <td className='flex'>
                                        <SecondaryButton onClick={() => handleDownload(report.id, 'text/html')}>
                                            <IconCode /> HTML
                                        </SecondaryButton>

                                        <SecondaryButton onClick={() => handleDownload(report.id, 'application/pdf')}>
                                            <IconDocument /> PDF
                                        </SecondaryButton>
                                    </td>
                                    <td>{report.insert_ts}</td>
                                    <td className='flex justify-end'>
                                        <SecondaryButton onClick={() => handleSendByEmail(report.id)}>Send by
                                        email</SecondaryButton>
                                        <DeleteButton onClick={() => deleteReport(report.id)} />
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
