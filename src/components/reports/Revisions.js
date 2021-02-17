import DeleteButton from "components/ui/buttons/Delete";
import PrimaryButton from "components/ui/buttons/Primary";
import SecondaryButton from "components/ui/buttons/Secondary";
import { IconCode, IconDocument } from "components/ui/Icons";
import Loading from "components/ui/Loading";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import useDelete from "hooks/useDelete";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import secureApiFetch from "services/api";

const ReportRevisions = ({ projectId }) => {
    const history = useHistory();
    const [reports, updateReports] = useFetch(`/reports?projectId=${projectId}`);

    const [saveVersionButtonDisabled, setSaveVersionButtonDisabled] = useState(true);
    const defaultFormValues = { name: "", description: "" };
    const [formValues, setFormValues] = useState(defaultFormValues);

    const deleteReport = useDelete('/reports/', updateReports);

    useEffect(() => {
        setSaveVersionButtonDisabled(formValues.name.length === 0);
    }, [formValues.name]);

    const handleSendByEmail = (reportId) => {
        history.push(`/report/${reportId}/send`);
    }

    const handleDownload = (reportId, contentType) => {
        secureApiFetch(`/attachments/${reportId}`, { method: 'GET', headers: { 'Content-Type': contentType } })
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
                setFormValues(defaultFormValues);
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
                {reports.length === 0 && <NoResultsTableRow numColumns={4} />}
                {reports.map((report, index) =>
                    <tr key={index}>
                        <td>{report.version_name} ({report.version_description})</td>
                        <td><ReactTimeAgo date={report.insert_ts} /></td>
                        <td>
                            <SecondaryButton onClick={() => handleDownload(report.html_attachment_id)}>
                                <IconCode /> HTML
                                        </SecondaryButton>
                                        &nbsp;
                                        <SecondaryButton onClick={() => handleDownload(report.pdf_attachment_id)}>
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

export default ReportRevisions;
