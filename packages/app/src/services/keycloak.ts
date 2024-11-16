import Configuration from "Configuration.js";
import Keycloak from "keycloak-js";

const keycloak: Keycloak = new Keycloak(Configuration.getKeycloakConfig());

const redirectionUrl: string =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ("https" === window.location.protocol ? "" : ":" + window.location.port) +
    Configuration.getContextPath();

const login = (onLoginSuccess: Function, onLoginFailure: Function) => {
    keycloak
        .init({
            onLoad: "login-required",
            messageReceiveTimeout: 2500,
        })
        .then((authenticated: boolean) => {
            if (authenticated) onLoginSuccess();
            else onLoginFailure();
        })
        .catch((err: any) => {
            console.error(err);
            onLoginFailure(err.error);
        });
};

const KeyCloakService = {
    login: login,
    getUsername: () => keycloak.tokenParsed?.preferred_username,
    logout: keycloak.logout,
    IsAuthenticated: keycloak.authenticated,
    getInstance: () => keycloak,
    getProfileUrl: () => keycloak.createAccountUrl({ redirectUri: redirectionUrl }),
    redirectToAccountManagement: () => keycloak.accountManagement(),
};

export default KeyCloakService;
