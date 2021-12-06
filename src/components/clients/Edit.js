import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import ClientForm from "./Form";

const EditClientPage = () => {
    const history = useHistory();
    const { clientId } = useParams();

    const [serverClient] = useFetch(`/clients/${clientId}`);
    const [clientClient, setClientClient] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/clients/${clientId}`, {
            method: 'PUT',
            body: JSON.stringify(clientClient)
        })

        actionCompletedToast(`The client "${clientClient.name}" has been updated.`);

        history.push(`/clients/${clientId}`)
    }

    useEffect(() => {
        if (serverClient)
            setClientClient(serverClient);
    }, [serverClient]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/clients">Clients</Link>
                </Breadcrumb>
            </div>

            <Title title="Client details" icon={<IconPlus />} />

            {!clientClient ? <Loading /> :
                <ClientForm isEditForm={true} onFormSubmit={onFormSubmit} client={clientClient}
                    clientSetter={setClientClient} />
            }
        </div>
    )
}

export default EditClientPage;
