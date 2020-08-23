import React from 'react'
import DeleteButton from "../../components/ui/buttons/Delete";
import CreateButton from "../../components/ui/buttons/Create";
import useSetTitle from '../../hooks/useSetTitle';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';

const UsersList = () => {
    useSetTitle('Users');
    const history = useHistory()
    const [users, updateUsers] = useFetch('/users')
    const destroy = useDelete('/users/', updateUsers);
    const handleCreate = () => { history.push("/users/create"); }
    return (<>
        <div className='heading'>
            <h1>Users</h1>
            <CreateButton onClick={handleCreate}>Create User</CreateButton>
        </div>
        {!users ? <Loading /> : users.length === 0 ? <NoResults /> :
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td className='text-right'><DeleteButton onClick={() => destroy(user.id)} /></td>
                    </tr>)}
                </tbody>
            </table>
        }
    </>
    )
}

export default UsersList