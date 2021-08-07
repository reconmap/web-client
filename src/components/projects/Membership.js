import { Alert, AlertIcon, Select } from "@chakra-ui/react";
import UserRoleBadge from "components/badges/UserRoleBadge";
import PageTitle from "components/logic/PageTitle";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import secureApiFetch from '../../services/api';
import UserAvatar from '../badges/UserAvatar';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import { IconPlus } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResultsTableRow from '../ui/NoResultsTableRow';
import Title from '../ui/Title';
import UserLink from "../users/Link";

const ProjectMembership = ({ match }) => {

    const projectId = match.params.id;
    const [users] = useFetch(`/users`)
    const [members, updateMembers] = useFetch(`/projects/${projectId}/users`)
    const [savedProject] = useFetch(`/projects/${projectId}`);
    const [availableUsers, setAvailableUsers] = useState([]);

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

    const handleDelete = (member) => {
        secureApiFetch(`/projects/${projectId}/users/${member.membership_id}`, {
            method: 'DELETE'
        }).then(() => {
            updateMembers()
        })
    }

    useEffect(() => {
        if(members && users && users.length > 0) {
            const memberIds = members.reduce((list, user) => [...list, user.id], []);
            setAvailableUsers(users.filter(user => !memberIds.includes(user.id)));
        }
    }, [members, users]);

    return <div>
        <PageTitle value="Project membership" />
        <div className="heading">
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
                {savedProject && <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>}
            </Breadcrumb>
        </div>

        <Title title='Members' />

        {availableUsers.length > 0 ?
        <form>
            <label>
                Select user
                <Select id="userId">
                    {availableUsers && availableUsers.map((user, index) =>
                        <option key={index} value={user.id}>{user.full_name}</option>
                    )}
                </Select>
            </label>
            <PrimaryButton onClick={handleOnClick}><IconPlus /> Add as member</PrimaryButton>
        </form> : 
          <Alert status="info">
          <AlertIcon />
          All users have been added to the project.
          </Alert>
        }

        {!members ?
            <Loading /> :
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '80px' }}>&nbsp;</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length === 0 && <NoResultsTableRow numColumns={4} />}
                    {members && members.map((member, index) =>
                        <tr key={index}>
                            <td><UserAvatar email={member.email} /></td>
                            <td><UserLink userId={member.id}>{member.full_name}</UserLink></td>
                            <td><UserRoleBadge role={member.role} /></td>
                            <td className='text-right'>
                                <DeleteIconButton onClick={() => handleDelete(member)} />
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        }
    </div>
}

export default ProjectMembership;
