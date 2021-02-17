import PrimaryButton from 'components/ui/buttons/Primary';
import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 'var(--borderWidth)',
    borderRadius: 'var(--borderRadius)',
    borderColor: 'var(--color-gray)',
    borderStyle: 'dashed',
    backgroundColor: 'var(--black)',
    color: 'var(--text-color)',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: 'var(--yellow)'
};

const acceptStyle = {
    borderColor: 'var(--green)'
};

const rejectStyle = {
    borderColor: 'var(--red)'
};

const AttachmentsDropzone = ({ onUploadButtonClick, acceptedFilesSetter }) => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop: acceptedFilesSetter });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files to upload:</h4>
                {acceptedFiles.length === 0 && <div>(empty)</div>}
                {acceptedFiles.length > 0 && <ul>{files}</ul>}
            </aside>
            <hr />
            <PrimaryButton onClick={onUploadButtonClick} disabled={acceptedFiles.length === 0}>Upload attachment(s)</PrimaryButton>
        </div>
    );
}

export default AttachmentsDropzone;
