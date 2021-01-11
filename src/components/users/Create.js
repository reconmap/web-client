import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import {actionCompletedToast} from '../ui/toast'
import {IconPlus} from "../ui/Icons";
import UserForm from "./Form";
import UserRoles from "../../models/UserRoles";

const UserCreationPage = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({
        name: null,
        password: null,
        email: null,
        role: UserRoles[0].id,
        sendEmailToUser: false
    })

    const handleCreate = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/users`, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(() => {
            history.push('/users/')
            actionCompletedToast(`The user "${userData.name}" has been created."`);
        })
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
            </div>

            <Title title="New user details" icon={<IconPlus/>}/>

            <UserForm user={userData} userSetter={setUserData} onFormSubmit={handleCreate}/>
        </div>
    )
}

export default UserCreationPage;

