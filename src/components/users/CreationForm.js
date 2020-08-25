import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import { IconLeft, IconRight } from '../icons';
import Breadcrumb from '../ui/Breadcrumb';

const UserCreationForm = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({ name: null, password: null, email: null, role: null, sendEmailToUser: false })
    const [loading, setLoading] = useState(false)
    const handleCreate = async () => {
        setLoading(true)
        await secureApiFetch(`/users`, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(() => {
            history.push('/users/')
        })
            .finally(() => {
                setLoading(false);
            })
    }
    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setUserData({
            ...userData, [name]: value
        });
    };
    const handleGoBack = () => { history.push('/users/') }
    const allFieldsFilled = userData.name && userData.password && userData.email && userData.role
    return (
        <div>
            <Breadcrumb goBack={handleGoBack} path={history.location.pathname} />
            <h1 className='mr-auto ml-2'>Create User</h1>
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor='name'>Name</label>
                <input autoFocus type="text" name="name" onChange={handleFormChange} />
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" onChange={handleFormChange} />
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" onChange={handleFormChange} />
                <label htmlFor='role'>Role</label>
                <select name="role" onChange={handleFormChange}>
                    <option></option>
                    <option>Creator</option>
                    <option>Writer</option>
                    <option>Reader</option>
                </select>
                <label>
                    Send email to user
                    <input type="checkbox" name="sendEmailToUser" onChange={handleFormChange} />
                </label>

                <button onClick={handleCreate} disabled={loading || !allFieldsFilled}>{loading ? 'Wait please' : 'Create'}</button>
                <button onClick={handleGoBack} disabled={loading} type='cancel'>Cancel</button>
            </form>
        </div>
    )
}

export default UserCreationForm
