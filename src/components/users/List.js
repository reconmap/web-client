import React, {useState} from 'react'
import CreateButton from "../../components/ui/buttons/Create";
import useSetTitle from '../../hooks/useSetTitle';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import {Link} from 'react-router-dom';
import DeleteButton from "../ui/buttons/Delete";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import secureApiFetch from "../../services/api";

const UsersList = ({history}) => {
    useSetTitle('Users');

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const [users, updateUsers] = useFetch('/users')
    const destroy = useDelete('/users/', updateUsers);
    const handleCreate = () => {
        history.push("/users/create");
    }

    const [selectedUsers, setSelectedUsers] = useState([]);

    const onTaskCheckboxChange = (event) => {
        const target = event.target
        if (target.checked) {
            setSelectedUsers([...selectedUsers, target.value]);
        } else {
            setSelectedUsers(selectedUsers.filter(value => value !== target.value));
        }
    }

    const handleBulkDelete = () => {
        secureApiFetch(`/users`, {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'DELETE'
            },
            body: JSON.stringify(selectedUsers)
        })
            .then(updateUsers)
            .then(() => {
                setSelectedUsers([])
            })
            .catch(e => console.log(e))
    }

    return (<>
            <div className='heading'>
                <Breadcrumb history={history}/>
                <ButtonGroup>
                    <DeleteButton onClick={handleBulkDelete} disabled={selectedUsers.length === 0}>Delete
                        selected</DeleteButton>
                    <CreateButton onClick={handleCreate}>Create User</CreateButton>
                </ButtonGroup>
            </div>
            {!users ? <Loading/> : users.length === 0 ? <NoResults/> :
                <table >
                    <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => <tr key={index}>
                        <td>
                            <input type="checkbox" value={user.id} onChange={onTaskCheckboxChange}
                                   checked={selectedUsers.indexOf(user.id) !== -1}/>
                        </td>
                        <td>
                            <UserAvatar email={user.email} size='--iconSize'/>
                        </td>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td><UserRoleBadge role={user.role}/></td>
                        <td className='text-right'>
                            <DeleteButton
                                onClick={() => destroy(user.id)}
                                disabled={parseInt(user.id) === loggedInUser.id ? "disabled" : ""}/>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            }
        </>
    )
}

export default UsersList
