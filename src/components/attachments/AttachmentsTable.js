import DeleteButton from "components/ui/buttons/Delete";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import ReactTimeAgo from 'react-time-ago';

const AttachmentsTable = ({ attachments, onDeleteAttachmentClick }) => {

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
                        <SecondaryButton disabled>Download</SecondaryButton>
                        <DeleteButton onClick={ev => onDeleteAttachmentClick(ev, attachment.id)} />
                    </td>
                </tr>
            )}
        </tbody>
    </table>
}

export default AttachmentsTable;
