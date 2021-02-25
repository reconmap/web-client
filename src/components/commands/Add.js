import { actionCompletedToast } from 'components/ui/toast';
import Command from 'models/Command';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Title from '../ui/Title';
import CommandForm from './Form';

const AddCommandPage = ({ history }) => {
    const [newCommand, setNewCommand] = useState(Command);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        secureApiFetch(`/commands`, { method: 'POST', body: JSON.stringify(newCommand) })
            .then(() => {
                history.push(`/commands`);
                actionCompletedToast(`The command "${newCommand.short_name}" has been added.`);
            })
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/commands">Commands</Link>
                </Breadcrumb>
            </div>

            <Title title="New command details" icon={<IconPlus />} />

            <CommandForm onFormSubmit={onFormSubmit} command={newCommand} commandSetter={setNewCommand} />
        </div>
    )
}

export default AddCommandPage;
