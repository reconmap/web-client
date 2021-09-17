import DeleteButton from "components/ui/buttons/Delete";
import SecondaryButton from "components/ui/buttons/Secondary";
import { IconDocument } from "components/ui/Icons";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import useDelete from "hooks/useDelete";
import React from "react";
import { useHistory } from "react-router";
import secureApiFetch from "services/api";

const ReportsTable = ({ reports, updateReports }) => {

    const history = useHistory();

    const deleteReport = useDelete('/reports/', updateReports);

    const handleDownload = (reportId) => {
        secureApiFetch(`/attachments/${reportId}`, { method: 'GET', headers: {} })
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

    const handleSendByEmail = (projectId) => {
        history.push(`/projects/${projectId}/report/send`);
    }

    return <table>
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
                    <td><RelativeDateFormatter date={report.insert_ts} /></td>
                    <td>
                        <SecondaryButton onClick={() => handleDownload(report.docx_attachment_id)}>
                            <IconDocument /> DOCX
                        </SecondaryButton>
                    </td>
                    <td className="flex justify-end">
                        <SecondaryButton onClick={() => handleSendByEmail(report.project_id)}>Send by email</SecondaryButton>

                        <DeleteButton onClick={() => deleteReport(report.id)} />
                    </td>
                </tr>
            )}
        </thead>
    </table>
}

export default ReportsTable;
