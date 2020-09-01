import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from '../ui/buttons/Delete';
import secureApiFetch from '../../services/api';
import UserAvatar from '../badges/UserAvatar';
import { Link } from 'react-router-dom';
import { IconPlus } from '../icons';

const TasksList = ({ match, history }) => {
    const projectId = match.params.id;
    useSetTitle('Project membership');
    const [users] = useFetch(`/users`)
    const [members, updateMembers] = useFetch(`/projects/${projectId}/users`)

    const handleOnClick = (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const userData = {userId: userId};
        secureApiFetch(`/projects/${projectId}/users`, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(() => {
            updateMembers()
        })
    }

    const handleDelete = (member) => {
        secureApiFetch(`/projects/${projectId}/users/${member.membership_id}`, {
            method: 'DELETE'
        }).then(() => {
            updateMembers()
        })
    }

    return <>
        <div className='heading'>
            <Breadcrumb path={history.location.pathname} />
        </div>
        <h1>Members</h1>

        {!members ?
            <Loading /> :
            members.length === 0 ?
                <NoResults /> :
                <>
                <form>
                    <select id="userId">
                        {users && users.map((user, index) =>
                            <option value={user.id}>{user.name}</option>
                        )}
                    </select>
                    <button onClick={handleOnClick}><IconPlus /> Add selected user as member</button>
                </form>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        { users &&
                            members.map((member, index) =>
                                <tr>
                                    <td className='w-16'><UserAvatar size={10} email={users.find((user)=> user.id === member.id).email}/></td>
                                    <td><Link to={`/user/${member.id}`}>{member.name}</Link></td>
                                    <td className='text-right'><DeleteButton onClick={() => handleDelete(member)} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </>
        }

    </>
}

export default TasksList
