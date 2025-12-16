import PrimaryButton from "components/ui/buttons/Primary";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { requestEntityPost } from "utilities/requests.js";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderStyle: "dashed",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const activeStyle = {
    borderColor: "var(--yellow)",
};

const acceptStyle = {
    borderColor: "var(--green)",
};

const rejectStyle = {
    borderColor: "var(--red)",
};

const AttachmentsImageDropzone = ({
    parentType,
    parentId,
    onUploadFinished = null,
    uploadFinishedParameter = null,
    attachmentId = null,
    maxFileCount = Infinity,
}) => {
    const onFileDrop = (newFiles) => {
        setAcceptedFiles(newFiles);
    };

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop: onFileDrop,
        accept: "image/jpeg,image/png",
    });

    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const onUploadButtonClick = (ev) => {
        const formData = new FormData();
        formData.append("parentType", parentType);
        formData.append("parentId", parentId);
        acceptedFiles.forEach((file) => {
            formData.append("attachment[]", file);
        });

        let uri = "/attachments";
        if (attachmentId) {
            formData.append("attachmentId", attachmentId);
            uri = `/attachments/${attachmentId}`;
        }

        requestEntityPost(uri, formData)
            .then((response) => response.json())
            .then((json) => {
                setAcceptedFiles([]);
                if (onUploadFinished) {
                    if (!attachmentId && maxFileCount === 1) {
                        const id = json[0].id;
                        onUploadFinished(uploadFinishedParameter, id);
                    } else {
                        onUploadFinished(uploadFinishedParameter);
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
            ...{ maxSize: maxFileCount },
        }),
        [isDragActive, isDragAccept, isDragReject, maxFileCount],
    );

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop some image(s) here, or click to select images</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
            <aside>
                <h4>Upload list:</h4>
                {acceptedFiles.length === 0 && <div>(empty)</div>}
                {acceptedFiles.length > 0 && <ul>{files}</ul>}
            </aside>
            <hr />
            <PrimaryButton onClick={onUploadButtonClick} disabled={acceptedFiles.length === 0}>
                Upload
            </PrimaryButton>
        </div>
    );
};

export default AttachmentsImageDropzone;
