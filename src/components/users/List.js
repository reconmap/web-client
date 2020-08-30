import React from 'react'
import DeleteButton from "../../components/ui/buttons/Delete";
import CreateButton from "../../components/ui/buttons/Create";
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';

const UsersList = ({history}) => {
    useSetTitle('Users');
    const [users, updateUsers] = useFetch('/users')
    const destroy = useDelete('/users/', updateUsers);
    const handleCreate = () => { history.push("/users/create"); }

    
    return (<>
        <div className='heading'>
            <Breadcrumb path={history.location.pathname}/>
            <CreateButton onClick={handleCreate}>Create User</CreateButton>
        </div>
            <h1>Users</h1>
        {!users ? <Loading /> : users.length === 0 ? <NoResults /> :
            <table className='w-full'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => <tr key={index}>
                        <th className='w-16'>
                        <UserAvatar email={user.email} size={10} />
                        </th>
                        <th>{user.name}</th>
                        <td > <UserRoleBadge role={user.role} /> </td>
                        <td className='text-right'><DeleteButton onClick={() => destroy(user.id)} /></td>
                    </tr>)}
                </tbody>
            </table>
        }
    </>
    )
}

export default UsersList