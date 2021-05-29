import { ChevronDownIcon } from "@chakra-ui/icons";
import { Badge, Divider, HStack, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import UserAvatar from "components/badges/UserAvatar";
import RestrictedComponent from "components/logic/RestrictedComponent";
import { AuthConsumer } from "contexts/AuthContext";
import React from "react";
import { Link } from 'react-router-dom'

export default function HeaderUserMenu({ email }) {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Menu closeOnBlur closeOnSelect>
            <MenuButton rightIcon={<ChevronDownIcon />}>
                <UserAvatar email={user.email} name={user.name} />
            </MenuButton>
            <AuthConsumer>
                {({ logout }) => (
                    <MenuList>
                        <HStack
                            px="3"
                            pb="3"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text color="gray.500">{user.full_name}</Text>
                            <Badge colorScheme="red">{user.role}</Badge>
                        </HStack>
                        <Link to={`/users/${user.id}`}>
                            <MenuItem>Your profile</MenuItem>
                        </Link>
                        <Link to="/users/preferences">
                            <MenuItem>Preferences</MenuItem>
                        </Link>
                        <Link to="/users/password-change">
                            <MenuItem>Change password</MenuItem>
                        </Link>
                        <RestrictedComponent
                            roles={["administrator", "superuser", "user"]}
                        >
                            <Text p="3" color="gray.500">
                                Organisation
                            </Text>
                            <Link to="/organisation">
                                <MenuItem>Settings</MenuItem>
                            </Link>
                        </RestrictedComponent>
                        <Divider />
                        <Link to="/" onClick={logout}>
                            <MenuItem>Logout</MenuItem>
                        </Link>
                    </MenuList>
                )}
            </AuthConsumer>
        </Menu>
    );
}