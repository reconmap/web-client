import UserRoles from "./UserRoles";

const User = {
    full_name: null,
    short_bio: null,
    email: null,
    username: null,
    role: UserRoles[0].id,
    unencryptedPassword: null,
    sendEmailToUser: false,
    active: true,
    mfa_enabled: false,
};

export default User;
