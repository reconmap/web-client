import UserRoles from "./UserRoles";

const User = {
    name: null,
    password: null,
    email: null,
    role: UserRoles[0].id,
    sendEmailToUser: false
};

export default User;
