import Configuration from "Configuration";
import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak(Configuration.getKeycloakConfig());

const Login = (onLoginSuccess: Function, onLoginFailure: Function) => {

    keycloakInstance
        .init({
            onLoad: 'login-required'
        })
        .then((authenticated) => {
            if (authenticated)
                onLoginSuccess();
            else
                onLoginFailure();
        })
        .catch(err => {
            console.dir(err);
            console.log(`keycloak init exception: ${err}`);
            onLoginFailure(err.error);
        });
};

const Username = () => keycloakInstance.tokenParsed?.preferred_username;

const KeyCloakService = {
    CallLogin: Login,
    GetUsername: Username,
    Logout: keycloakInstance.logout,
    IsAuthenticated: keycloakInstance.authenticated,
    getInstance: () => keycloakInstance,
    getProfileUrl: () => keycloakInstance.createAccountUrl({ redirectUri: window.location.href }),
    redirectToAccountManagement: () => keycloakInstance.accountManagement()
};

export default KeyCloakService;
