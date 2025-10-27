import { useAttachmentsQuery } from "api/attachments.js";
import { requestAttachment, requestAttachmentDelete } from "api/requests/attachments.js";
import AttachmentsDropzone from "components/attachments/Dropzone";
import NativeButtonGroup from "components/form/NativeButtonGroup";
import RestrictedComponent from "components/logic/RestrictedComponent";
import FileSizeSpan from "components/ui/FileSizeSpan";
import ModalDialog from "components/ui/ModalDIalog";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import SecondaryButton from "components/ui/buttons/Secondary";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import UserLink from "components/users/Link";
import { useState } from "react";
import { actionCompletedToast } from "../ui/toast";

const CommandOutputs = ({ command }) => {
    const { data: commandOutputs } = useAttachmentsQuery({ parentType: "command", parentId: command.id });
    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState(null);

    const onDeleteOutputClick = (ev, attachmentId) => {
        ev.preventDefault();

        requestAttachmentDelete(attachmentId)
            .then(() => {
                actionCompletedToast("The output has been deleted.");
            })
            .catch((err) => console.error(err));
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

    const onViewClick = (ev, attachmentId) => {
        requestAttachment(attachmentId).then(async ({ blob }) => {
            setContent(await blob.text());
            setModalVisible(true);
        });
    };

    const onModalClose = () => {
        setModalVisible(false);
    };

    return (
        <>
            <ModalDialog
                visible={modalVisible}
                title="Preview output"
                onModalClose={onModalClose}
                style={{ width: "80%", height: "80%", maxHeight: "80%" }}
            >
                <textarea style={{ width: "100%", height: "90%" }} defaultValue={content} readOnly></textarea>
            </ModalDialog>

            <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                <AttachmentsDropzone parentType={"command"} parentId={command.id} />
            </RestrictedComponent>

            <h4>Command output list</h4>

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
                    {null === commandOutputs && <LoadingTableRow numColumns={6} />}
                    {null !== commandOutputs && commandOutputs.length === 0 && <NoResultsTableRow numColumns={6} />}
                    {null !== commandOutputs &&
                        commandOutputs.length !== 0 &&
                        commandOutputs.map((commandOutput, index) => (
                            <tr key={index}>
                                <td>{commandOutput.client_file_name}</td>
                                <td>{commandOutput.file_mimetype}</td>
                                <td>
                                    <FileSizeSpan fileSize={commandOutput.file_size} />
                                </td>
                                <td>
                                    <RelativeDateFormatter date={commandOutput.insert_ts} />
                                </td>
                                <td>
                                    <UserLink userId={commandOutput.submitter_uid}>
                                        {commandOutput.submitter_name}
                                    </UserLink>
                                </td>
                                <td>
                                    <NativeButtonGroup>
                                        <SecondaryButton onClick={(ev) => onViewClick(ev, commandOutput.id)}>
                                            View
                                        </SecondaryButton>
                                        <SecondaryButton onClick={(ev) => onDownloadClick(ev, commandOutput.id)}>
                                            Download
                                        </SecondaryButton>
                                        <DeleteIconButton onClick={(ev) => onDeleteOutputClick(ev, commandOutput.id)} />
                                    </NativeButtonGroup>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default CommandOutputs;
