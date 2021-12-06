import { actionCompletedToast, errorToast } from 'components/ui/toast';
import Client from 'models/Client';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Title from '../ui/Title';
import ClientForm from "./Form";

const ClientCreate = () => {
    const history = useHistory();
    const [newClient, setNewClient] = useState(Client);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        secureApiFetch(`/clients`, { method: 'POST', body: JSON.stringify(newClient) })
            .then(resp => {
                if (resp.status === 201) {
                    history.push(`/clients`);
                    actionCompletedToast(`The client "${newClient.name}" has been added.`);
                } else {
                    errorToast("The client could not be saved. Review the form data or check the application logs.")
                }
            })
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/clients">Clients</Link>
                </Breadcrumb>
            </div>

            <Title title="New client details" icon={<IconPlus />} />

            <ClientForm onFormSubmit={onFormSubmit} client={newClient} clientSetter={setNewClient} />
        </div>
    )
}

export default ClientCreate;
