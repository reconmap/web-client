import DeleteButton from "components/ui/buttons/Delete";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import ReactTimeAgo from 'react-time-ago';
import secureApiFetch from "services/api";

const AttachmentsTable = ({ attachments, onDeleteAttachmentClick }) => {

    const onDownloadClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
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

    return <table>
        <thead>
            <th>Upload date</th>
            <th>Uploaded by</th>
            <th>Filename</th>
            <th>File size</th>
            <th>Mimetype</th>
            <th>&nbsp;</th>
        </thead>
        <tbody>
            {attachments.length === 0 && <NoResultsTableRow numColumns={5} />}
            {attachments.map((attachment, index) =>
                <tr key={index}>
                    <td><ReactTimeAgo date={attachment.insert_ts} /></td>
                    <td>{attachment.submitter_name}</td>
                    <td>{attachment.client_file_name}</td>
                    <td><FileSizeSpan fileSize={attachment.file_size} /></td>
                    <td>{attachment.file_mimetype}</td>
                    <td style={{ display: "flex" }}>
                        <SecondaryButton onClick={ev => onDownloadClick(ev, attachment.id)}>Download</SecondaryButton>
                        <DeleteButton onClick={ev => onDeleteAttachmentClick(ev, attachment.id)} />
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

export default AttachmentsTable;
