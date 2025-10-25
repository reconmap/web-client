import { useDeleteReportMutation } from "api/reports.js";
import ProjectBadge from "components/projects/ProjectBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import SecondaryButton from "components/ui/buttons/Secondary";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import { useNavigate } from "react-router-dom";
import secureApiFetch from "services/api";

const ReportsTable = ({ reports, updateReports, includeProjectColumn = false }) => {
    const navigate = useNavigate();

    const deleteReportMutation = useDeleteReportMutation();

    const handleDownload = (reportId) => {
        secureApiFetch(`/attachments/${reportId}`, { method: "GET", headers: {} })
            .then((resp) => {
                const contentDispositionHeader = resp.headers.get("Content-Disposition");
                const filenameRe = new RegExp(/filename="(.*)";/);
                const filename = filenameRe.exec(contentDispositionHeader)[1];
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const filename = values[1];
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                a.click();
            });
    };

    const handleSendByEmail = (projectId) => {
        navigate(`/projects/${projectId}/report/send`);
    };

    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th>Name (Description)</th>
                    {includeProjectColumn && <th>Project</th>}
                    <th>Datetime</th>
                    <th>Downloads</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {reports.length === 0 && <NoResultsTableRow numColumns={4} />}
                {reports.map((report, index) => (
                    <tr key={index}>
                        <td>
                            {report.version_name} ({report.version_description})
                        </td>
                        {includeProjectColumn && (
                            <td>
                                <ProjectBadge project={{ id: report.project_id, name: report.project_name }} />
                            </td>
                        )}
                        <td>
                            <RelativeDateFormatter date={report.insert_ts} />
                        </td>
                        <td>
                            <SecondaryButton onClick={() => handleDownload(report.attachment_id)}>
                                {report.client_file_name?.split(".").pop().toUpperCase()}
                            </SecondaryButton>
                        </td>
                        <td>
                            <SecondaryButton onClick={() => handleSendByEmail(report.project_id)}>
                                Send by email
                            </SecondaryButton>

                            <DeleteIconButton onClick={() => deleteReportMutation.mutate(report.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReportsTable;
