import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import CommandForm from './Form';

const EditCommandPage = () => {
    const history = useHistory();
    const { commandId } = useParams();

    const [serverCommand] = useFetch(`/commands/${commandId}`);
    const [clientCommand, setClientCommand] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/commands/${commandId}`, {
            method: 'PUT',
            body: JSON.stringify(clientCommand)
        })

        actionCompletedToast(`The command "${clientCommand.name}" has been updated.`);

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
