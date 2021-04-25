import DeleteButton from "components/ui/buttons/Delete";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import ModalDialog from "components/ui/ModalDIalog";
import NoResultsTableRow from "components/ui/NoResultsTableRow";
import { resolveMime } from 'friendly-mimes';
import useDelete from "hooks/useDelete";
import { useState } from "react";
import ReactTimeAgo from 'react-time-ago';
import secureApiFetch from "services/api";

const AttachmentsTable = ({ attachments, reloadAttachments }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState(null);

    const onModalClose = () => {
        setModalVisible(false);
    }

    const deleteAttachmentById = useDelete('/attachments/', reloadAttachments);

    const onViewClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const contentType = resp.headers.get('Content-Type');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([contentType, filename, resp.blob()]);
            })
            .then(async (values) => {
                const [contentType, , blob] = values;

                if (contentType.indexOf('image/') !== -1) {
                    setContent(<img src={await URL.createObjectURL(blob)} alt="" />);
                    // @todo -> URL.revokeObjectURL
                } else {
                    setContent(<textarea style={{ width: '100%', height: '90%' }}>{await blob.text()}</textarea>);
                }
                setModalVisible(true);
            })
    }

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

    const onDeleteAttachmentClick = (ev, attachmentId) => {
        deleteAttachmentById(attachmentId)
            .then(() => reloadAttachments());
    }

    if (!attachments) {
        return <Loading />
    }

    return <>
        <ModalDialog visible={modalVisible} title="Preview output" onModalClose={onModalClose} style={{ overflow: 'auto', width: '80%', height: '80%', maxHeight: '80%' }}>
            {content}
        </ModalDialog>

        <table>
            <thead>
                <th>Upload date</th>
                <th>Uploaded by</th>
                <th>Filename</th>
                <th>File size</th>
                <th>Mimetype</th>
                <th>&nbsp;</th>
            </thead>
            <tbody>
                {attachments.length === 0 && <NoResultsTableRow numColumns={6} />}
                {attachments.map((attachment, index) =>
                    <tr key={index}>
                        <td><ReactTimeAgo date={attachment.insert_ts} /></td>
                        <td>{attachment.submitter_name}</td>
                        <td>{attachment.client_file_name}</td>
                        <td><FileSizeSpan fileSize={attachment.file_size} /></td>
                        <td><span title={resolveMime(attachment.file_mimetype)['name']}>{attachment.file_mimetype}</span></td>
                        <td style={{ display: "flex" }}>
                            <SecondaryButton onClick={ev => onViewClick(ev, attachment.id)}>View</SecondaryButton>
                            <SecondaryButton onClick={ev => onDownloadClick(ev, attachment.id)}>Download</SecondaryButton>
                            <DeleteButton onClick={ev => onDeleteAttachmentClick(ev, attachment.id)} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}

export default AttachmentsTable;
