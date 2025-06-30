import UserPermissions from "components/users/Permissions.js";
import KeyCloakService from "./keycloak.js";

const Auth = {
    getLoggedInUser: () => {
        const kcInstance = KeyCloakService.getInstance();
        if (kcInstance.authenticated) {
            const role = kcInstance?.resourceAccess?.["web-client"]?.roles?.[0];

            const user = {
                full_name: kcInstance?.tokenParsed?.name,
                access_token: kcInstance.token,
                email: kcInstance?.tokenParsed?.email,
                role: role,
                permissions: role ? UserPermissions?.[role as keyof typeof UserPermissions] : undefined,
            };

            return user;
        }
        return null;
    },
};

export default Auth;
