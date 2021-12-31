import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import ProjectBadge from "components/projects/ProjectBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import SecondaryButton from "components/ui/buttons/Secondary";
import { IconDocument } from "components/ui/Icons";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import useDelete from "hooks/useDelete";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from "services/api";

const ReportsTable = ({ reports, updateReports, includeProjectColumn = false }) => {

    const navigate = useNavigate();

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
        navigate(`/projects/${projectId}/report/send`);
    }

    return <Table>
        <Thead>
            <Tr>
                <Th>Name (Description)</Th>
                {includeProjectColumn && <Th>Project</Th>}
                <Th>Datetime</Th>
                <Th>Downloads</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {reports.length === 0 && <NoResultsTableRow numColumns={4} />}
            {reports.map((report, index) =>
                <Tr key={index}>
                    <Td>{report.version_name} ({report.version_description})</Td>
                    {includeProjectColumn && <Td><ProjectBadge project={{ id: report.project_id, name: report.project_name }} /></Td>}
                    <Td><RelativeDateFormatter date={report.insert_ts} /></Td>
                    <Td>
                        <SecondaryButton onClick={() => handleDownload(report.docx_attachment_id)}>
                            <IconDocument /> DOCX
                        </SecondaryButton>
                    </Td>
                    <Td className="flex justify-end">
                        <SecondaryButton onClick={() => handleSendByEmail(report.project_id)}>Send by email</SecondaryButton>

                        <DeleteIconButton onClick={() => deleteReport(report.id)} />
                    </Td>
                </Tr>
            )}
        </Tbody>
    </Table>
}

ReportsTable.propTypes = {
    reports: PropTypes.array.isRequired,
    includeProjectColumn: PropTypes.bool
};

export default ReportsTable;
