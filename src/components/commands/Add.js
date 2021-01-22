import React, { useState } from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import { Link } from "react-router-dom";
import { IconPlus } from "../ui/Icons";
import CommandForm from './Form';

const AddCommandPage = ({ history }) => {
    const [newCommand, setNewCommand] = useState({
        short_name: null,
        description: null,
        docker_image: null,
        container_args: null,
        configuration: null
    });

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/commands`, { method: 'POST', body: JSON.stringify(newCommand) })
        history.push(`/commands`)
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
