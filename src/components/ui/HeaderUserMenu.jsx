import { Badge, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import UserAvatar from "components/badges/UserAvatar";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import KeyCloakService from "services/keycloak";
import ExternalLink from "./ExternalLink";

const HeaderUserMenu = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Menu closeOnBlur closeOnSelect>
            <MenuButton>
                <UserAvatar email={user.email} />
            </MenuButton>
            <MenuList>
                <HStack px="3" pb="3" justifyContent="space-between" alignItems="center">
                    <Text color="gray.500">{KeyCloakService.GetUsername()}</Text>
                    <Badge colorScheme="red">{user.role}</Badge>
                </HStack>
                <MenuItem>
                    <ExternalLink href={KeyCloakService.getProfileUrl()}>Identity settings</ExternalLink>
                </MenuItem>
                <Link to={`/users/${user.id}`}>
                    <MenuItem>Your profile</MenuItem>
                </Link>
                <Link to="/users/preferences">
                    <MenuItem>Your preferences</MenuItem>
                </Link>
                <Divider />
                <Link to="/" onClick={logout}>
                    <MenuItem>Logout</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    );
};

export default HeaderUserMenu;
