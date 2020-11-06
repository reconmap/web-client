import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import secureApiFetch from '../../services/api';
import UserAvatar from '../badges/UserAvatar';
import {IconPlus} from '../ui/Icons';
import Title from '../ui/Title';
import DeleteButton from "../ui/buttons/Delete";
import UserLink from "../users/Link";

const TasksList = ({match, history}) => {
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

    return <div>
        <div className='heading'>
            <Breadcrumb history={history}/>
        </div>
        <form>
            <Title title='Members'/>
            <label>
                Select User
                <select id="userId">
                    {users && users.map((user, index) =>
                        <option value={user.id}>{user.name}</option>
                    )}
                </select>
            </label>
            <BtnPrimary onClick={handleOnClick}><IconPlus/> Add as member</BtnPrimary>
        </form>

        {!members ?
            <Loading/> :
            members.length === 0 ?
                <NoResults/> :
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members &&
                        members.map((member, index) =>
                            <tr>
                                <td><UserAvatar size='--iconSizeLarge' email={member.email}/></td>
                                <td><UserLink userId={member.id}>{member.name}</UserLink></td>
                                <td className='text-right'>
                                    <DeleteButton onClick={() => handleDelete(member)}/>
                                </td>
                            </tr>
                        )
                        }
                        </tbody>
                    </table>
                </>
        }

    </div>
}

export default TasksList
