import React, { useState } from 'react'
import configuration from '../../Configuration';
import { useHistory } from 'react-router-dom';

const UserCreationForm = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const handleCreate = async () => {
        setLoading(true)
        await fetch(`${configuration.api.baseUrl}/users`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
        })
        setLoading(false)
        history.push('/dashboard/users/')
    }
    const handleChangeName = e=> setUserData({...userData,name:e.target.value})
    const handleChangePassword = e=> setUserData({...userData,password:e.target.value})
    const handleChangeEmail = e=> setUserData({...userData,email:e.target.value})
    const handleChangeRole = e=> setUserData({...userData,role:e.target.value})
    return (
        <form onSubmit={e=>e.preventDefault()}>
            <label htmlFor='new-user-name'>Name</label>
            <input type="text" name="new-user-name" onChange={handleChangeName}/>
            <label htmlFor='new-user-password'>Password</label>
            <input type="password" name="new-user-password" onChange={handleChangePassword}/>
            <label htmlFor='new-user-email'>Email</label>
            <input type="text" name="new-user-email" onChange={handleChangeEmail}/>
            <label htmlFor='new-user-role'>Role</label>
            <select name="new-user-role" onChange={handleChangeRole}>
                <option>Creator</option>
                <option>Writer</option>
                <option>Reader</option>
            </select>
            <button onClick={handleCreate} disabled={loading}>{loading ? 'Wait please' : 'Create'}</button>
        </form>
    )
}

export default UserCreationForm
