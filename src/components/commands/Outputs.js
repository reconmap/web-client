import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import PrimaryButton from "components/ui/buttons/Primary";
import SecondaryButton from "components/ui/buttons/Secondary";
import FileSizeSpan from "components/ui/FileSizeSpan";
import { IconUpload } from "components/ui/Icons";
import Loading from "components/ui/Loading";
import ModalDialog from "components/ui/ModalDIalog";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import UserLink from "components/users/Link";
import useFetch from "hooks/useFetch";
import { useState } from "react";
import secureApiFetch from "services/api";
import { actionCompletedToast } from "../ui/toast";

const CommandOutputs = ({ task }) => {
    const [commandOutputs, updateCommandOutputs] = useFetch(`/attachments?parentType=command&parentId=${task.id}`)
    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState(null);

    const onDeleteOutputClick = (ev, attachmentId) => {
        ev.preventDefault();

        secureApiFetch(`/attachments/${attachmentId}`, { method: 'DELETE' })
            .then(() => {
                actionCompletedToast("The output has been deleted.");
                updateCommandOutputs();
            })
            .catch(err => console.error(err))
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

    const onViewClick = (ev, attachmentId) => {
        secureApiFetch(`/attachments/${attachmentId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then(async (values) => {
                const blob = values[0];
                setContent(await blob.text());
                setModalVisible(true);
            })
    }

    const onModalClose = () => {
        setModalVisible(false);
    }

    if (!commandOutputs) return <Loading />

    return <>
        {task.command_id &&
            <>
                <ModalDialog visible={modalVisible} title="Preview output" onModalClose={onModalClose} style={{ width: '80%', height: '80%', maxHeight: '80%' }}>
                    <textarea style={{ width: '100%', height: '90%' }} readOnly>
                        {content}
                    </textarea>
                </ModalDialog>

                <h4>
                    Results
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                        <PrimaryButton to={`/tasks/${task.id}/upload`}>
                            <IconUpload /> Upload results
                        </PrimaryButton>
                    </RestrictedComponent>
                </h4>
                {!commandOutputs ? <Loading /> :

                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Filename</Th>
                                <Th>Mimetype</Th>
                                <Th>File size</Th>
                                <Th>Upload date</Th>
                                <Th>Uploaded by</Th>
                                <Th>&nbsp;</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {commandOutputs.length === 0 && <NoResultsTableRow numColumns={6} />}
                            {commandOutputs.map((commandOutput, index) =>
                                <Tr key={index}>
                                    <Td>{commandOutput.client_file_name}</Td>
                                    <Td>{commandOutput.file_mimetype}</Td>
                                    <Td><FileSizeSpan fileSize={commandOutput.file_size} /></Td>
                                    <Td><RelativeDateFormatter date={commandOutput.insert_ts} /></Td>
                                    <Td><UserLink userId={commandOutput.submitter_uid}>{commandOutput.submitter_name}</UserLink></Td>
                                    <Td className="flex justify-end">
                                        <SecondaryButton onClick={ev => onViewClick(ev, commandOutput.id)}>View</SecondaryButton>
                                        <SecondaryButton onClick={ev => onDownloadClick(ev, commandOutput.id)}>Download</SecondaryButton>
                                        <DeleteIconButton onClick={ev => onDeleteOutputClick(ev, commandOutput.id)} />
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                }
            </>
        }
    </>
}

export default CommandOutputs;
