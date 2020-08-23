import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import secureApiFetch from '../../services/api';

const UserCreationForm = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({})
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
    const handleChangeName = e => setUserData({ ...userData, name: e.target.value })
    const handleChangePassword = e => setUserData({ ...userData, password: e.target.value })
    const handleChangeEmail = e => setUserData({ ...userData, email: e.target.value })
    const handleChangeRole = e => setUserData({ ...userData, role: e.target.value })
    const handleGoBack = () => { history.push('/users/') }
    const allFieldsFilled = userData.name && userData.password && userData.email && userData.role
    return (
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor='name'>Name</label>
            <input autoFocus type="text" name="name" onChange={handleChangeName} />
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" onChange={handleChangePassword} />
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" onChange={handleChangeEmail} />
            <label htmlFor='role'>Role</label>
            <select name="role" onChange={handleChangeRole}>
                <option></option>
                <option>Creator</option>
                <option>Writer</option>
                <option>Reader</option>
            </select>
            <button onClick={handleCreate} disabled={loading || !allFieldsFilled}>{loading ? 'Wait please' : 'Create'}</button>
            <button onClick={handleGoBack} disabled={loading} type='cancel'>Cancel</button>
        </form>
    )
}

export default UserCreationForm
