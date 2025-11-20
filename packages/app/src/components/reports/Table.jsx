import { useDeleteReportMutation } from "api/reports.js";
import { requestAttachment } from "api/requests/attachments.js";
import ProjectBadge from "components/projects/ProjectBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import SecondaryButton from "components/ui/buttons/Secondary";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import { useNavigate } from "react-router-dom";

const ReportsTable = ({ reports, updateReports, includeProjectColumn = false }) => {
    const navigate = useNavigate();

    const deleteReportMutation = useDeleteReportMutation();

    const handleDownload = (reportId) => {
        requestAttachment(reportId).then(({ blob, filename }) => {
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
                            {report.versionName} ({report.versionDescription})
                        </td>
                        {includeProjectColumn && (
                            <td>
                                <ProjectBadge project={{ id: report.projectId, name: report.project?.name }} />
                            </td>
                        )}
                        <td>
                            <RelativeDateFormatter date={report.createdAt} />
                        </td>
                        <td>
                            <SecondaryButton onClick={() => handleDownload(report.attachmentId)}>
                                {report.attachment?.clientFileName?.split(".").pop().toUpperCase()}
                            </SecondaryButton>
                        </td>
                        <td>
                            <SecondaryButton onClick={() => handleSendByEmail(report.projectId)}>
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
