import { Route } from "react-router-dom";
import CreateUserPage from "./Create";
import EditUserPage from "./Edit";
import UsersList from "./List";
import UserPasswordChange from "./PasswordChange";
import UserPreferences from "./Preferences";
import UserProfile from "./Profile";

const UsersRoutes = [
    <Route path={`/users`} element={<UsersList />} />,
    <Route path={`/users/preferences`} element={<UserPreferences />} />,
    <Route path={`/users/password-change`} element={<UserPasswordChange />} />,
    <Route path={`/users/create`} element={<CreateUserPage />} />,
    <Route path={`/users/:userId`} element={<UserProfile />} />,
    <Route path={`/users/:userId/edit`} element={<EditUserPage />} />,
]

export default UsersRoutes
