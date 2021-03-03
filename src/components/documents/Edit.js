import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import DocumentForm from './Form';

const EditDocumentPage = ({ history }) => {
    const { documentId } = useParams();

    const [serverCommand] = useFetch(`/documents/${documentId}`);
    const [clientCommand, setClientCommand] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/documents/${documentId}`, {
            method: 'PUT',
            body: JSON.stringify(clientCommand)
        })

        actionCompletedToast(`Document "${clientCommand.short_name}" updated.`);

        history.push(`/documents/${documentId}`)
    }

    useEffect(() => {
        if (serverCommand)
            setClientCommand(serverCommand);
    }, [serverCommand]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/documents">Documents</Link>
                </Breadcrumb>
            </div>

            <Title title="Document details" icon={<IconPlus />} />

            {!clientCommand ? <Loading /> :
                <DocumentForm isEditForm={true} onFormSubmit={onFormSubmit} document={clientCommand}
                    documentSetter={setClientCommand} />
            }
        </div>
    )
}

export default EditDocumentPage;
