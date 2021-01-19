import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import secureApiFetch from '../../services/api';
import UserAvatar from '../badges/UserAvatar';
import { IconPlus } from '../ui/Icons';
import Title from '../ui/Title';
import DeleteButton from "../ui/buttons/Delete";
import UserLink from "../users/Link";
import { Link } from "react-router-dom";
import NoResultsTableRow from '../ui/NoResultsTableRow';

const TasksList = ({ match }) => {

    const projectId = match.params.id;
    useSetTitle('Project membership');
    const [users] = useFetch(`/users`)
    const [members, updateMembers] = useFetch(`/projects/${projectId}/users`)
    const [savedProject] = useFetch(`/projects/${projectId}`);

    const handleOnClick = ev => {
        ev.preventDefault();

        const userId = document.getElementById('userId').value;
        const userData = { userId: userId };
        secureApiFetch(`/projects/${projectId}/users`, {
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(() => {
            updateMembers()
        })
    }

    if (!savedProject) {
        return <Loading />
    }

    const handleDelete = (member) => {
        secureApiFetch(`/projects/${projectId}/users/${member.membership_id}`, {
            method: 'DELETE'
        }).then(() => {
            updateMembers()
        })
    }

    return <div>
        <div className="heading">
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
                <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>
            </Breadcrumb>
        </div>
        <form>
            <Title title='Members' />
            <label>
                Select User
                <select id="userId">
                    {users && users.map((user, index) =>
                        <option key={index} value={user.id}>{user.full_name}</option>
                    )}
                </select>
            </label>
            <PrimaryButton onClick={handleOnClick}><IconPlus /> Add as member</PrimaryButton>
        </form>

        {!members ?
            <Loading /> :
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '80px' }}>&nbsp;</th>
                        <th>Name</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length === 0 && <NoResultsTableRow colSpan={3} />}
                    {members && members.map((member, index) =>
                        <tr key={index}>
                            <td><UserAvatar size='--iconSizeLarge' email={member.email} /></td>
                            <td><UserLink userId={member.id}>{member.full_name}</UserLink></td>
                            <td className='text-right'>
                                <DeleteButton onClick={() => handleDelete(member)} />
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        }
    </div>
}

export default TasksList;
