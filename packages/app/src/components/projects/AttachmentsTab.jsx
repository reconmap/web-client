import AttachmentsTable from "components/attachments/AttachmentsTable";
import AttachmentsDropzone from "components/attachments/Dropzone";
import RestrictedComponent from "components/logic/RestrictedComponent";
import useFetch from "hooks/useFetch";

const ProjectAttachmentsTab = ({ project }) => {
    const parentType = "project";
    const parentId = project.id;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`);

    return (
        <section>
            <RestrictedComponent roles={["administrator", "superuser", "user"]} message="(access restricted)">
                <AttachmentsDropzone parentType={parentType} parentId={parentId} onUploadFinished={reloadAttachments} />

                <h4>Attachment list</h4>
                <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
            </RestrictedComponent>
        </section>
    );
};

export default ProjectAttachmentsTab;
