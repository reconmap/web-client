import React from "react";
import ProtectedRoute from "../logic/ProtectedRoute";
import UserCreationForm from "./CreationForm";
import UsersList from "./List";
import UserPreferences from "./Preferences";
import UserProfile from "./Profile";

const UsersRoutes = [
    <ProtectedRoute path={`/users/create`} component={UserCreationForm}/>,
    <ProtectedRoute exact path={`/users`} component={UsersList}/>,
    <ProtectedRoute path={`/users/preferences`} component={UserPreferences}/>,
    <ProtectedRoute path={`/users/:id([0-9]+)`} component={UserProfile}/>,
]

export default UsersRoutes