import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import DocumentForm from './Form';

const EditDocumentPage = () => {
    const navigate = useNavigate();
    const { documentId } = useParams();

    const [serverDocument] = useFetch(`/documents/${documentId}`);
    const [clientDocument, setClientCommand] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/documents/${documentId}`, {
            method: 'PUT',
            body: JSON.stringify(clientDocument)
        })

        actionCompletedToast(`The document "${clientDocument.title}" has been updated.`);

        navigate(`/documents/${documentId}`)
    }

    useEffect(() => {
        if (serverDocument)
            setClientCommand(serverDocument);
    }, [serverDocument]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/documents">Documents</Link>
                </Breadcrumb>
            </div>

            <Title title="Document details" icon={<IconPlus />} />

            {!clientDocument ? <Loading /> :
                <DocumentForm isEditForm={true} onFormSubmit={onFormSubmit} document={clientDocument}
                    documentSetter={setClientCommand} />
            }
        </div>
    )
}

export default EditDocumentPage;
