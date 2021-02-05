import DeleteButton from 'components/ui/buttons/Delete';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import { actionCompletedToast } from 'components/ui/toast';
import Configuration from 'Configuration';
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
    const { params: { id: projectId } } = useRouteMatch();
    const [project, setProject] = useState(null);

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

    if (!project) {
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
                    <ReportPreview projectId={projectId} />
                </Tab>

                <Tab name="Revisions">
                    <ReportRevisions projectId={projectId} />
                </Tab>

                <Tab name="Configuration">
                    <ReportConfigurationForm projectId={projectId} />
                </Tab>
            </Tabs>

        </>
    )
}

export default ProjectReport;

const ReportPreview = ({ projectId }) => {
    return <iframe title="Report preview" style={{ width: '50%', margin: '20px auto' }} id="report" src={Configuration.apiEndpoint + `/reports/preview?projectId=${projectId}&accessToken=${localStorage.getItem('accessToken')}`}></iframe>
}

const ReportRevisions = ({ projectId }) => {
    const history = useHistory();
    const [reports, updateReports] = useFetch(`/reports?projectId=${projectId}`);

    const [saveVersionButtonDisabled, setSaveVersionButtonDisabled] = useState(true);
    const [formValues, setFormValues] = useState({ name: "", description: "" });

    const deleteReport = useDelete('/reports/', updateReports);


    useEffect(() => {
        setSaveVersionButtonDisabled(formValues.name.length === 0);
    }, [formValues.name]);

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

    const onFormValueChange = ev => {
        ev.preventDefault();

        setFormValues({ ...formValues, [ev.target.name]: ev.target.value });
    };

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

    if (!reports) return <Loading />

    return <>
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
                    <th>Name (Description)</th>
                    <th>Datetime</th>
                    <th>Downloads</th>
                    <th>&nbsp;</th>
                </tr>
                {reports.map((report, index) =>
                    <tr key={index}>
                        <td>{report.version_name} ({report.version_description})</td>
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
    </>
}

const ReportConfigurationForm = ({ projectId }) => {
    const [clientConfiguration, updateClientConfiguration] = useState({ optional_sections: {} });

    const onConfigurationFormSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/reports/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(clientConfiguration)
        })

        actionCompletedToast(`Configuration updated.`);
    }

    const onFormChange = (ev) => {
        ev.preventDefault();

        const value = (ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value);

        updateClientConfiguration({ ...clientConfiguration, [ev.target.name]: value });
    }

    return <>
        <form onSubmit={onConfigurationFormSubmit} className="crud">
            <fieldset>
                <legend>Optional sections</legend>

                <label><input name="toc" type="checkbox" onChange={onFormChange} value={clientConfiguration.optional_sections.toc} /> Include table of contents</label>
                <label><input name="revisions" type="checkbox" onChange={onFormChange} value={clientConfiguration.optional_sections.revisions} /> Include revisions table</label>
                <label><input name="bios" type="checkbox" onChange={onFormChange} value={clientConfiguration.optional_sections.bios} /> Include team bios</label>
                <label><input name="overview" type="checkbox" onChange={onFormChange} value={clientConfiguration.optional_sections.overview} /> Include findings overview</label>
                <label><input name="header" type="checkbox" onChange={onFormChange} value={clientConfiguration.optional_sections.header} /> Include page header</label>
                <label><input name="footer" type="checkbox" onChange={onFormChange} value={clientConfiguration.optional_sections.footer} /> Include page footer</label>
            </fieldset>

            <fieldset>
                <legend>Custom content</legend>
                <h4>Cover (HTML)</h4>
                <textarea name="custom_cover" onChange={onFormChange} value={clientConfiguration.custom_cover} style={{ width: '100%' }} />

                <h4>Header (HTML)</h4>
                <textarea name="custom_header" onChange={onFormChange} value={clientConfiguration.custom_header} style={{ width: '100%' }} />

                <h4>Footer (HTML)</h4>
                <textarea name="custom_footer" onChange={onFormChange} value={clientConfiguration.custom_footer} style={{ width: '100%' }} />

            </fieldset>

            <PrimaryButton type="submit">Save configuration</PrimaryButton>
        </form>
    </>
}
