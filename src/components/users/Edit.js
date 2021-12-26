import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from '../ui/toast';
import UserForm from "./Form";

const EditUserPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [serverUser] = useFetch(`/users/${userId}`);
    const [clientUser, setClientUser] = useState(null);

    const handleCreate = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(clientUser)
        }).then(() => {
            navigate(`/users/${userId}`)
            actionCompletedToast(`The user "${clientUser.full_name}" has been updated.`);
        })
    }

    useEffect(() => {
        setClientUser(serverUser);
    }, [serverUser]);

    if (!serverUser || !clientUser) return <Loading />

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
            </div>

            <Title title="User details" icon={<IconPlus />} />

            <UserForm isEdit={true} user={clientUser} userSetter={setClientUser} onFormSubmit={handleCreate} />
        </div>
    )
}

export default EditUserPage;

