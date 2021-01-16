import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Title from '../ui/Title';
import {actionCompletedToast} from '../ui/toast'
import {IconPlus} from "../ui/Icons";
import UserForm from "./Form";
import useFetch from "../../hooks/useFetch";
import Loading from "../ui/Loading";

const EditUserPage = () => {
    const history = useHistory()
    const {userId} = useParams();
    const [serverUser] = useFetch(`/users/${userId}`);
    const [clientUser, setClientUser] = useState(null);


    const handleCreate = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(clientUser)
        }).then(() => {
            history.push(`/users/${userId}`)
            actionCompletedToast(`The user "${clientUser.full_name}" has been updated.`);
        })
    }

    useEffect(() => {
        setClientUser(serverUser);
    }, [serverUser]);

    if (!serverUser || !clientUser) return <Loading/>

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
            </div>

            <Title title="User details" icon={<IconPlus/>}/>

            <UserForm isEdit={true} user={clientUser} userSetter={setClientUser} onFormSubmit={handleCreate}/>
        </div>
    )
}

export default EditUserPage;

