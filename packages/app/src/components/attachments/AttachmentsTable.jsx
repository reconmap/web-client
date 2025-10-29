import { useAttachmentDeleteMutation } from "api/attachments.js";
import { requestAttachment } from "api/requests/attachments.js";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import ModalDialog from "components/ui/ModalDIalog";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import UserLink from "components/users/Link";
import { resolveMime } from "friendly-mimes";
import { useState } from "react";

const AttachmentsTable = ({ attachments }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState(null);

    const onModalClose = () => {
        setModalVisible(false);
    };

    const deleteAttachmentMutation = useAttachmentDeleteMutation();

    const onViewClick = (ev, attachmentId) => {
        requestAttachment(attachmentId).then(async ({ contentType, blob }) => {
            if (contentType.indexOf("image/") !== -1) {
                setContent(<img src={await URL.createObjectURL(blob)} alt="" />);
                // @todo -> URL.revokeObjectURL
            } else {
                setContent(<textarea style={{ width: "100%", height: "90%" }} value={await blob.text()} readOnly />);
            }
            setModalVisible(true);
        });
    };

    const onDownloadClick = (ev, attachmentId) => {
        requestAttachment(attachmentId).then(({ blob, filename }) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
        });
    };

    const onDeleteAttachmentClick = (ev, attachmentId) => {
        deleteAttachmentMutation.mutate(attachmentId);
    };

    const safeResolveMime = (mimeType) => {
        try {
            return resolveMime(mimeType)["name"];
        } catch (err) {
            console.error(err);
            return mimeType;
        }
    };

    if (!attachments) {
        return <Loading />;
    }

    return (
        <>
            <ModalDialog
                visible={modalVisible}
                title="Preview output"
                onModalClose={onModalClose}
                style={{ overflow: "auto", width: "80%", height: "80%", maxHeight: "80%" }}
            >
                {content}
            </ModalDialog>

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Mimetype</th>
                        <th>File size</th>
                        <th>Upload date</th>
                        <th>Uploaded by</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {attachments.length === 0 && <NoResultsTableRow numColumns={6} />}
                    {attachments.map((attachment, index) => (
                        <tr key={index}>
                            <td>{attachment.client_file_name}</td>
                            <td>
                                <span title={safeResolveMime(attachment.file_mimetype)}>
                                    {attachment.file_mimetype}
                                </span>
                            </td>
                            <td>
                                <FileSizeSpan fileSize={attachment.file_size} />
                            </td>
                            <td>
                                <RelativeDateFormatter date={attachment.insert_ts} />
                            </td>
                            <td>
                                <UserLink userId={attachment.submitter_uid}>{attachment.submitter_name}</UserLink>
                            </td>
                            <td style={{ display: "flex" }}>
                                <SecondaryButton onClick={(ev) => onViewClick(ev, attachment.id)}>View</SecondaryButton>
                                <SecondaryButton onClick={(ev) => onDownloadClick(ev, attachment.id)}>
                                    Download
                                </SecondaryButton>
                                <DeleteIconButton onClick={(ev) => onDeleteAttachmentClick(ev, attachment.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AttachmentsTable;
