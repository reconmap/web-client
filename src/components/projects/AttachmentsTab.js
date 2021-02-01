import AttachmentsTable from 'components/attachments/AttachmentsTable';
import AttachmentsDropzone from 'components/attachments/Dropzone';
import React, { useState } from 'react';
import secureApiFetch from 'services/api';
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import { IconDocument } from '../ui/Icons';
import Loading from "../ui/Loading";

const ProjectAttachmentsTab = ({ project }) => {
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=project&parentId=${project.id}`)
    const deleteAttachmentById = useDelete('/attachments/', reloadAttachments)
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const onUploadButtonClick = ev => {
        const formData = new FormData();
        formData.append('parentType', 'project');
        formData.append('parentId', project.id);
        acceptedFiles.forEach(file => {
            formData.append('attachment[]', file);
        })

        secureApiFetch('/attachments', {
            method: 'POST',
            body: formData
        })
            .then(resp => {
                setAcceptedFiles([]);
                reloadAttachments();
            })
            .catch(err => console.error(err));
    }

    const onDeleteAttachmentClick = (ev, attachmentId) => {
        deleteAttachmentById(attachmentId)
            .then(resp => reloadAttachments());
    }

    if (!attachments) {
        return <Loading />
    }

    return (
        <section>

            <AttachmentsDropzone onUploadButtonClick={onUploadButtonClick} acceptedFilesSetter={setAcceptedFiles} />

            <h4>
                <IconDocument />Attachment list
            </h4>

            <AttachmentsTable attachments={attachments} onDeleteAttachmentClick={onDeleteAttachmentClick} />
        </section>
    )
}

export default ProjectAttachmentsTab;
