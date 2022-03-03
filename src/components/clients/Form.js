import { Input } from "@chakra-ui/react";
import AttachmentsImageDropzone from 'components/attachments/ImageDropzone';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import PrimaryButton from "../ui/buttons/Primary";

const ClientForm = ({ isEditForm = false, onFormSubmit, client, clientSetter: setClient }) => {
    const parentType = 'client';
    const parentId = client.id;
    const [logo, setLogo] = useState(null);
    const [smallLogo, setSmallLogo] = useState(null);

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setClient({ ...client, [name]: value });
    };

    useEffect(() => {
        if (client.small_logo_attachment_id) {
            downloadAndDisplayLogo(client.small_logo_attachment_id, 'small_logo');
        }

        if (client.logo_attachment_id) {
            downloadAndDisplayLogo(client.logo_attachment_id, 'logo');
        }
    }, [client]);

    const downloadAndDisplayLogo = (logoId, type) => {
        secureApiFetch(`/attachments/${logoId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const url = URL.createObjectURL(blob);
                if (type === 'small_logo') {
                    setSmallLogo(url);
                } else {
                    setLogo(url);
                }
            })
    }

    const onUploadFinished = (type, id) => {
        if (id) {
            setClient({ ...client, [type]: id });
        }
    };

    return <form onSubmit={onFormSubmit} className="crud">
        <fieldset>
            <legend>Basic information</legend>
            <label>Name
                <Input type="text" name="name" onChange={onFormChange} value={client.name || ""} required autoFocus /></label>
            <label>Address
                <Input type="text" name="address" onChange={onFormChange} value={client.address || ""} /></label>
            <label>URL
                <Input type="text" name="url" onChange={onFormChange} value={client.url || ""} />
            </label>
        </fieldset>

        <fieldset>
            <legend>Branding</legend>

            <label>Main logo
                <div>
                    {logo && <img src={logo} alt="The main logo of client" />}
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']} message="(access restricted)">
                        <AttachmentsImageDropzone parentType={parentType} parentId={parentId} onUploadFinished={onUploadFinished} uploadFinishedParameter="logo_attachment_id" attachmentId={client.logo_attachment_id} maxFileCount={1} />
                    </RestrictedComponent>
                </div>
            </label>

            <label>Small Logo
                <div>
                    {smallLogo && <img src={smallLogo} alt="The smaller version of the logo" />}
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']} message="(access restricted)">
                        <AttachmentsImageDropzone parentType={parentType} parentId={parentId} onUploadFinished={onUploadFinished} uploadFinishedParameter="small_logo_attachment_id" attachmentId={client.small_logo_attachment_id} maxFileCount={1} />
                    </RestrictedComponent>
                </div>
            </label>

            <PrimaryButton type="submit">{isEditForm ? "Save" : "Add"}</PrimaryButton>
        </fieldset>
    </form>
}

export default ClientForm;
