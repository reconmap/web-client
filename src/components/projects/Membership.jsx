import { Alert, AlertIcon } from "@chakra-ui/react";
import UserRoleBadge from "components/badges/UserRoleBadge";
import NativeSelect from "components/form/NativeSelect";
import PageTitle from "components/logic/PageTitle";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import secureApiFetch from '../../services/api';
import UserAvatar from '../badges/UserAvatar';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from '../ui/Icons';
import PrimaryButton from '../ui/buttons/Primary';
import NoResultsTableRow from '../ui/tables/NoResultsTableRow';
import UserLink from "../users/Link";

const ProjectMembership = () => {
    const { projectId } = useParams();
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
        if (members && users && users.length > 0) {
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

        <title title='Members' />

        {availableUsers.length > 0 ?
            <form>
                <label>
                    Select user
                    <NativeSelect id="userId">
                        {availableUsers && availableUsers.map((user, index) =>
                            <option key={index} value={user.id}>{user.full_name}</option>
                        )}
                    </NativeSelect>
                </label>
                <PrimaryButton onClick={handleOnClick} leftIcon={<IconPlus />}>Add as member</PrimaryButton>
            </form> :
            <Alert status="info">
                <AlertIcon />
                All users have been added to the project.
            </Alert>
        }

        <table className="rm-listing">
            <thead>
                <tr>
                    <th style={{ width: '80px' }}>&nbsp;</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {null === members &&
                    <LoadingTableRow numColumns={4} />}
                {null !== members && 0 === members.length &&
                    <NoResultsTableRow numColumns={4} />}
                {members && members.map((member, index) =>
                    <tr key={index}>
                        <td><UserAvatar email={member.email} /></td>
                        <td><UserLink userId={member.id}>{member.full_name}</UserLink></td>
                        <td><UserRoleBadge role={member.role} /></td>
                        <td textAlign="right">
                            <DeleteIconButton onClick={() => handleDelete(member)} />
                        </td>
                    </tr>
                )
                }
            </tbody>
        </table>
    </div>
}

export default ProjectMembership;
