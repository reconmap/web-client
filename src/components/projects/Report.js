import DeleteButton from 'components/ui/buttons/Delete';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import useDelete from 'hooks/useDelete';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import PrimaryButton from "../ui/buttons/Primary";
import SecondaryButton from "../ui/buttons/Secondary";
import { IconCode, IconDocument, IconReport } from '../ui/Icons';
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import Breadcrumb from './../ui/Breadcrumb';
import './Report.scss';

const ProjectReport = () => {
    const history = useHistory();

    const { params: { id: projectId } } = useRouteMatch();
    const [project, setProject] = useState(null);
    const [preview, setPreview] = useState("");
    const [reports, updateReports] = useFetch(`/reports?projectId=${projectId}`);
    const [formValues, setFormValues] = useState({ name: "", description: "" });
    const [saveVersionButtonDisabled, setSaveVersionButtonDisabled] = useState(true);

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

    useEffect(() => {
        secureApiFetch(`/projects/${projectId}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(json => {
                setProject(json);
                document.title = `Report ${json.name} | Reconmap`;
            });
    }, [projectId, setProject]);

    useEffect(() => {
        secureApiFetch(`/reports/preview?projectId=${projectId}`, {
            method: 'GET',
        })
            .then(resp => resp.text())
            .then(text => {
                setPreview(text);
            });
    }, [projectId, reports]);

    const onSaveVersionSubmit = ev => {
        ev.preventDefault();

        const params = {
            projectId: projectId,
            name: formValues.name,
            description: formValues.description
        };
        secureApiFetch(`/reports`, {
            method: 'POST',
            body: JSON.stringify(params)
        })
            .then(resp => {
                updateReports();
            })
            .catch(err => console.error(err));
    };

    const onFormValueChange = ev => {
        ev.preventDefault();

        setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    };

    const deleteReport = useDelete('/reports/', updateReports);

    useEffect(() => {
        setSaveVersionButtonDisabled(formValues.name.length === 0);
    }, [formValues.name]);

    if (!project || !reports) {
        return <Loading />
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${projectId}`}>{project.name}</Link>
                </Breadcrumb>
            </div>
            <Title type="Project reporting" title="Project report"
                icon={<IconReport />} />

            <Tabs>
                <Tab name="Preview">
                    <div style={{ width: '50%', margin: '20px auto' }} id="report" dangerouslySetInnerHTML={{ __html: preview }}></div>
                </Tab>

                <Tab name="Revisions">
                    <form onSubmit={onSaveVersionSubmit} className="crud" style={{ marginTop: '20px' }}>
                        <fieldset>
                            <legend>New report version</legend>

                            <label>Name</label>
                            <input type="text" name="name" value={formValues.name} onChange={onFormValueChange}
                                placeholder="eg 1.0, 202103" required />
                            <label>Description</label>
                            <input type="text" name="description" value={formValues.description}
                                onChange={onFormValueChange}
                                placeholder="eg Initial version, Draft"
                                required />
                        </fieldset>
                        <PrimaryButton type="submit" disabled={saveVersionButtonDisabled}>Save version</PrimaryButton>
                    </form>

                    <table>
                        <caption>Report versions</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Datetime</th>
                                <th>Downloads</th>
                                <th>&nbsp;</th>
                            </tr>
                            {reports.map((report, index) =>
                                <tr key={index}>
                                    <td>{report.version_name}</td>
                                    <td>{report.version_description}</td>
                                    <td><ReactTimeAgo date={report.insert_ts} /></td>
                                    <td>
                                        <SecondaryButton onClick={() => handleDownload(report.id, 'text/html')}>
                                            <IconCode /> HTML
                                        </SecondaryButton>
                                        &nbsp;
                                        <SecondaryButton onClick={() => handleDownload(report.id, 'application/pdf')}>
                                            <IconDocument /> PDF
                                        </SecondaryButton>
                                    </td>
                                    <td className="flex justify-end">
                                        <SecondaryButton onClick={() => handleSendByEmail(report.id)}>Send by email</SecondaryButton>

                                        <DeleteButton onClick={() => deleteReport(report.id)} />
                                    </td>
                                </tr>
                            )}
                        </thead>
                    </table>
                </Tab>
            </Tabs>

        </>
    )
}

export default ProjectReport;
