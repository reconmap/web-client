import ProtectedRoute from "../logic/ProtectedRoute";
import UsersList from "./List";
import UserPreferences from "./Preferences";
import UserProfile from "./Profile";
import UserPasswordChange from "./PasswordChange";
import UserCreationPage from "./Create";

const UsersRoutes = [
    <ProtectedRoute path={`/users`} component={UsersList} exact/>,
    <ProtectedRoute path={`/users/preferences`} component={UserPreferences}/>,
    <ProtectedRoute path={`/users/password-change`} component={UserPasswordChange}/>,
    <ProtectedRoute path={`/users/create`} component={UserCreationPage}/>,
    <ProtectedRoute path={`/users/:id([0-9]+)`} component={UserProfile}/>,
]

export default UsersRoutes
