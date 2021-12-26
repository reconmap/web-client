import User from 'models/User';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Title from '../ui/Title';
import { actionCompletedToast } from '../ui/toast';
import UserForm from "./Form";

const CreateUserPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(User);

    const handleCreate = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/users`, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(() => {
            navigate('/users/')
            actionCompletedToast(`The user "${userData.full_name}" has been created.`);
        })
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
            </div>

            <Title title="New user details" icon={<IconPlus />} />

            <UserForm user={userData} userSetter={setUserData} onFormSubmit={handleCreate} />
        </div>
    )
}

export default CreateUserPage;

