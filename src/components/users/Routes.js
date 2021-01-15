import ProtectedRoute from "../logic/ProtectedRoute";
import UsersList from "./List";
import UserPreferences from "./Preferences";
import UserProfile from "./Profile";
import UserPasswordChange from "./PasswordChange";
import CreateUserPage from "./Create";
import EditUserPage from "./Edit";

const UsersRoutes = [
    <ProtectedRoute path={`/users`} component={UsersList} exact/>,
    <ProtectedRoute path={`/users/preferences`} component={UserPreferences}/>,
    <ProtectedRoute path={`/users/password-change`} component={UserPasswordChange}/>,
    <ProtectedRoute path={`/users/create`} component={CreateUserPage}/>,
    <ProtectedRoute exact path={`/users/:userId([0-9]+)`} component={UserProfile}/>,
    <ProtectedRoute exact path={`/users/:userId([0-9]+)/edit`} component={EditUserPage}/>,
]

export default UsersRoutes
