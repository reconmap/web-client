import React, { useEffect, useState } from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import { Link, useParams } from "react-router-dom";
import { IconPlus } from "../ui/Icons";
import useFetch from "../../hooks/useFetch";
import { actionCompletedToast } from "../ui/toast";
import Loading from "../ui/Loading";
import CommandForm from './Form';

const EditCommandPage = ({ history }) => {
    const { commandId } = useParams();

    const [serverCommand] = useFetch(`/commands/${commandId}`);
    const [clientCommand, setClientCommand] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/commands/${commandId}`, {
            method: 'PUT',
            body: JSON.stringify(clientCommand)
        })

        actionCompletedToast(`Command "${clientCommand.short_name}" updated.`);

        history.push(`/commands/${commandId}`)
    }

    useEffect(() => {
        if (serverCommand)
            setClientCommand(serverCommand);
    }, [serverCommand]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/commands">Commands</Link>
                </Breadcrumb>
            </div>

            <Title title="Command details" icon={<IconPlus />} />

            {!clientCommand ? <Loading /> :
                <CommandForm isEditForm={true} onFormSubmit={onFormSubmit} command={clientCommand}
                    commandSetter={setClientCommand} />
            }
        </div>
    )
}

export default EditCommandPage;
