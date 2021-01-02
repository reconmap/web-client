import React, {useEffect, useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import {Link, useParams} from "react-router-dom";
import {IconPlus} from "../ui/Icons";
import ClientForm from "./Form";
import useFetch from "../../hooks/useFetch";
import {actionCompletedToast} from "../ui/toast";
import Loading from "../ui/Loading";

const EditClientPage = ({history}) => {
    const {clientId} = useParams();

    const [serverClient] = useFetch(`/clients/${clientId}`);
    const [clientClient, setClientClient] = useState(null);


    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/clients/${clientId}`, {
            method: 'PUT',
            body: JSON.stringify(clientClient)
        })

        actionCompletedToast(`Client "${clientClient.name}" updated.`);

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

            <Title title="Client details" icon={<IconPlus/>}/>

            {!clientClient ? <Loading/> :
                <ClientForm isEditForm={true} onFormSubmit={onFormSubmit} client={clientClient}
                            clientSetter={setClientClient}/>
            }
        </div>
    )
}

export default EditClientPage;
