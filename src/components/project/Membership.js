import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from '../ui/buttons/Delete';
import secureApiFetch from '../../services/api';

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
                    <button onClick={handleOnClick}>Add selected user as member</button>
                </form>
                <table class="w-full">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members.map((member, index) =>
                                <tr>
                                    <td>{member.name}</td>
                                    <td><DeleteButton onClick={() => handleDelete(member)} /></td>
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
