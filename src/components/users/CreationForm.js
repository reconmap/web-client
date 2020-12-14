import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';
import {actionCompletedToast} from '../ui/toast'

const UserCreationForm = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({
        name: null,
        password: null,
        email: null,
        role: null,
        sendEmailToUser: false
    })
    const [loading, setLoading] = useState(false)
    const handleCreate = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/users`, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(() => {
            history.push('/users/')
            actionCompletedToast(`The user "${userData.name}" has been created."`);
        })
            .finally(() => {
                setLoading(false);
            })
    }
    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setUserData({
            ...userData, [name]: value
        });
    };

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
            </div>
            <form onSubmit={handleCreate}>
                <Title title='Create User'/>
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} autoFocus required/>
                </label>
                <label>Password
                    <input type="password" name="password" onChange={handleFormChange} required/>
                </label>
                <label>Email
                    <input type="email" name="email" onChange={handleFormChange} required/>
                </label>
                <label>Role
                    <select name="role" onChange={handleFormChange} required>
                        <option disabled selected>(select an option)</option>
                        <option value="reader">Reader</option>
                        <option value="writer">Writer</option>
                        <option value="creator">Creator</option>
                    </select>
                </label>
                <label>
                    Send email to user
                    <input type="checkbox" name="sendEmailToUser" onChange={handleFormChange}/>
                </label>

                <PrimaryButton type="submit"
                               disabled={loading}>Create</PrimaryButton>
            </form>
        </div>
    )
}

export default UserCreationForm
