import React from 'react'
import CreateButton from "../../components/ui/buttons/Create";
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import { Link } from 'react-router-dom';
import BtnSecondary from '../ui/buttons/BtnSecondary';
import { IconX } from '../icons';

const UsersList = ({ history }) => {
    useSetTitle('Users');
    const [users, updateUsers] = useFetch('/users')
    const destroy = useDelete('/users/', updateUsers);
    const handleCreate = () => { history.push("/users/create"); }


    return (<>
        <div className='heading'>
            <Breadcrumb path={history.location.pathname} />
            <CreateButton onClick={handleCreate}>Create User</CreateButton>
        </div>
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
                        <td className='w-16'>
                            <UserAvatar email={user.email} size={10} />
                        </td>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td > <UserRoleBadge role={user.role} /> </td>
                        <td className='text-right'><BtnSecondary size='xs' onClick={() => destroy(user.id)} ><IconX size={4}/> Delete</BtnSecondary></td>
                    </tr>)}
                </tbody>
            </table>
        }
    </>
    )
}

export default UsersList
