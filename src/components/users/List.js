import { ButtonGroup, Menu, MenuList, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import BooleanText from "components/ui/BooleanText";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import EllipsisMenuButton from "components/ui/buttons/EllipsisMenuButton";
import ExportMenuItem from "components/ui/menuitems/ExportMenuItem";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import { AuthContext } from "contexts/AuthContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateButton from "../../components/ui/buttons/Create";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import UserAvatar from "../badges/UserAvatar";
import UserRoleBadge from "../badges/UserRoleBadge";
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import { IconUserGroup } from "../ui/Icons";
import Title from "../ui/Title";
import { actionCompletedToast } from "../ui/toast";
import UserLink from "./Link";

const UsersList = () => {
    const navigate = useNavigate();
    const { user: loggedInUser } = useContext(AuthContext);
    const [users, updateUsers] = useFetch("/users");
    const deleteUser = useDelete("/users/", updateUsers);
    const handleCreate = () => {
        navigate("/users/create");
    };

    const [selectedUsers, setSelectedUsers] = useState([]);

    const onTaskCheckboxChange = (ev) => {
        const target = ev.target;
        const targetUserId = parseInt(target.value);
        if (target.checked) {
            setSelectedUsers([...selectedUsers, targetUserId]);
        } else {
            setSelectedUsers(
                selectedUsers.filter(value => value !== targetUserId)
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
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        deleteUser(id)
        updateUsers();
    };

    return <>
        <PageTitle value="Users" />
        <div className="heading">
            <Breadcrumb />
            <ButtonGroup isAttached>
                <CreateButton onClick={handleCreate}>
                    Create user
                </CreateButton>
                <RestrictedComponent roles={['administrator']}>
                    <DeleteButton onClick={handleBulkDelete} disabled={selectedUsers.length === 0}>
                        Delete selected
                    </DeleteButton>
                </RestrictedComponent>
                <Menu>
                    <EllipsisMenuButton />
                    <MenuList>
                        <ExportMenuItem entity="users" />
                    </MenuList>
                </Menu>
            </ButtonGroup>
        </div>
        <Title title="Users and roles" icon={<IconUserGroup />} />
        <Table>
            <Thead>
                <Tr>
                    <Th style={{ width: "32px" }}>&nbsp;</Th>
                    <Th style={{ width: "64px" }}>&nbsp;</Th>
                    <Th>Full name</Th>
                    <Th>Username</Th>
                    <Th>Role</Th>
                    <Th>Active?</Th>
                    <Th>2FA enabled?</Th>
                    <Th>&nbsp;</Th>
                </Tr>
            </Thead>
            <Tbody>
                {null === users && <LoadingTableRow numColumns={8} />}
                {null !== users && 0 === users.length && <NoResultsTableRow numColumns={8} />}
                {null !== users && 0 !== users.length && users.map((user, index) => (
                    <Tr key={index}>
                        <Td>
                            <input
                                type="checkbox"
                                value={user.id}
                                onChange={onTaskCheckboxChange}
                                checked={selectedUsers.includes(user.id)}
                            />
                        </Td>
                        <Td>
                            <UserAvatar email={user.email} />
                        </Td>
                        <Td>
                            <Link to={`/users/${user.id}`}>
                                {user.full_name}
                            </Link>
                        </Td>
                        <Td>
                            <UserLink userId={user.id}>
                                {user.username}
                            </UserLink>
                        </Td>
                        <Td>
                            <UserRoleBadge role={user.role} />
                        </Td>
                        <Td><BooleanText value={user.active} /></Td>
                        <Td><BooleanText value={user.mfa_enabled} /></Td>
                        <Td textAlign="right">
                            <LinkButton href={`/users/${user.id}/edit`}>
                                Edit
                            </LinkButton>
                            <DeleteIconButton
                                onClick={() => handleDelete(user.id)}
                                disabled={
                                    parseInt(user.id) ===
                                        loggedInUser.id
                                        ? "disabled"
                                        : ""
                                }
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </>
};

export default UsersList;
