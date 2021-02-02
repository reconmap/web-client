import React, { useState } from "react";
import CreateButton from "../../components/ui/buttons/Create";
import useSetTitle from "../../hooks/useSetTitle";
import useFetch from "../../hooks/useFetch";
import useDelete from "../../hooks/useDelete";
import Loading from "../ui/Loading";
import NoResults from "../ui/NoResults";
import Breadcrumb from "../ui/Breadcrumb";
import UserRoleBadge from "../badges/UserRoleBadge";
import UserAvatar from "../badges/UserAvatar";
import DeleteButton from "../ui/buttons/Delete";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import secureApiFetch from "../../services/api";
import Title from "../ui/Title";
import { IconUserGroup } from "../ui/Icons";
import UserLink from "./Link";
import { actionCompletedToast } from "../ui/toast";
import LinkButton from "../ui/buttons/Link";
import { Link } from "react-router-dom";

const UsersList = ({ history }) => {
    useSetTitle("Users");

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const [users, updateUsers] = useFetch("/users");
    const deleteUser = useDelete("/users/", updateUsers);
    const handleCreate = () => {
        history.push("/users/create");
    };

    const [selectedUsers, setSelectedUsers] = useState([]);

    const onTaskCheckboxChange = (ev) => {
        const target = ev.target;
        const targetUserId = parseInt(target.value);
        if (target.checked) {
            setSelectedUsers([...selectedUsers, targetUserId]);
        } else {
            setSelectedUsers(
                selectedUsers.filter((value) => value !== targetUserId)
            );
        }
    };

    const handleBulkDelete = () => {
        secureApiFetch(`/users`, {
            method: "PATCH",
            headers: {
                "Bulk-Operation": "DELETE",
            },
            body: JSON.stringify(selectedUsers),
        })
            .then(updateUsers)
            .then(() => {
                setSelectedUsers([]);
                actionCompletedToast("All selected users were deleted.");
            })
            .catch((err) => console.error(err));
    };
    const handleDelete = (id) => {
        deleteUser(id);
        updateUsers();
    };

    return (
        <>
            <div className="heading">
                <Breadcrumb />
                <ButtonGroup>
                    <CreateButton onClick={handleCreate}>
                        Create User
                    </CreateButton>
                    <DeleteButton
                        onClick={handleBulkDelete}
                        disabled={selectedUsers.length === 0}
                    >
                        Delete selected
                    </DeleteButton>
                </ButtonGroup>
            </div>
            <Title title="Users and Permissions" icon={<IconUserGroup />} />
            {!users ? (
                <Loading />
            ) : users.length === 0 ? (
                <NoResults />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "32px" }}>&nbsp;</th>
                            <th style={{ width: "64px" }}>&nbsp;</th>
                            <th>Full name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={user.id}
                                        onChange={onTaskCheckboxChange}
                                        checked={
                                            selectedUsers.indexOf(user.id) !==
                                            -1
                                        }
                                    />
                                </td>
                                <td>
                                    <UserAvatar
                                        email={user.email}
                                        size="--iconSize"
                                    />
                                </td>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.full_name}
                                    </Link>
                                </td>
                                <td>
                                    <UserLink userId={user.id}>
                                        {user.username}
                                    </UserLink>
                                </td>
                                <td>
                                    <UserRoleBadge role={user.role} />
                                </td>
                                <td className='flex justify-end'>
                                    <LinkButton href={`/users/${user.id}/edit`}>
                                        Edit
                                    </LinkButton>
                                    <DeleteButton
                                        onClick={() => handleDelete(user.id)}
                                        disabled={
                                            parseInt(user.id) ===
                                            loggedInUser.id
                                                ? "disabled"
                                                : ""
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UsersList;
