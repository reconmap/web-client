import { useProjectQuery, useProjectUsersQuery } from "api/projects.js";
import { requestProjectUserDelete } from "api/requests/projects.js";
import { useUsersQuery } from "api/users.js";
import UserRoleBadge from "components/badges/UserRoleBadge";
import NativeSelect from "components/form/NativeSelect";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import Title from "components/ui/Title";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import UserAvatar from "../badges/UserAvatar";
import Breadcrumb from "../ui/Breadcrumb";
import PrimaryButton from "../ui/buttons/Primary";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";
import UserLink from "../users/Link";

const ProjectMembership = () => {
    const { projectId } = useParams();
    const { data: users } = useUsersQuery();
    const { data: members } = useProjectUsersQuery(projectId);
    const { data: savedProject } = useProjectQuery(projectId);
    const [availableUsers, setAvailableUsers] = useState([]);

    const handleOnClick = (ev) => {
        ev.preventDefault();

        const userId = document.getElementById("userId").value;
        const userData = { userId: userId };
        secureApiFetch(`/projects/${projectId}/users`, {
            method: "POST",
            body: JSON.stringify(userData),
        }).then(() => {
            updateMembers();
        });
    };

    const handleDelete = (member) => {
        requestProjectUserDelete(projectId, member.membership_id).then(() => {
            updateMembers();
        });
    };

    useEffect(() => {
        if (members && users && users.length > 0) {
            const memberIds = members.reduce((list, user) => [...list, user.id], []);
            setAvailableUsers(users.filter((user) => !memberIds.includes(user.id)));
        }
    }, [members, users]);

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    {savedProject && <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>}
                    <Link to={`/projects/${projectId}/membership`}>Membership</Link>
                </Breadcrumb>
            </div>

            <Title title="Project membership" />

            {availableUsers.length > 0 ? (
                <form>
                    <label>
                        <h4 className="title is-4">Select user</h4>
                        <NativeSelect id="userId">
                            {availableUsers &&
                                availableUsers.map((user, index) => (
                                    <option key={index} value={user.id}>
                                        {user.full_name}
                                    </option>
                                ))}
                        </NativeSelect>
                    </label>
                    <PrimaryButton onClick={handleOnClick}>Add as member</PrimaryButton>
                </form>
            ) : (
                <div status="info">All users have been added to the project.</div>
            )}

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th style={{ width: "80px" }}>&nbsp;</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {null === members && <LoadingTableRow numColumns={4} />}
                    {null !== members && 0 === members.length && <NoResultsTableRow numColumns={4} />}
                    {members &&
                        members.map((member, index) => (
                            <tr key={index}>
                                <td>
                                    <UserAvatar email={member.email} />
                                </td>
                                <td>
                                    <UserLink userId={member.id}>{member.full_name}</UserLink>
                                </td>
                                <td>
                                    <UserRoleBadge role={member.role} />
                                </td>
                                <td>
                                    <DeleteIconButton onClick={() => handleDelete(member)} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectMembership;
