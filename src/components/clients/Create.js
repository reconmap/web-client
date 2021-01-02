import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import {Link} from "react-router-dom";
import {IconPlus} from "../ui/Icons";
import ClientForm from "./Form";

const ClientCreate = ({history}) => {
    const [newClient, setNewClient] = useState({
        name: null,
        url: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null
    })

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/clients`, {method: 'POST', body: JSON.stringify(newClient)})
        history.push(`/clients`)
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/clients">Clients</Link>
                </Breadcrumb>
            </div>

            <Title title="New client details" icon={<IconPlus/>}/>

            <ClientForm onFormSubmit={onFormSubmit} client={newClient} clientSetter={setNewClient}/>
        </div>
    )
}

export default ClientCreate;
