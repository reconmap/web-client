import { useTheme } from "hooks/useTheme";
import { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Auth from "services/auth";
import KeyCloakService from "services/keycloak";
import { initialiseUserPreferences } from "services/userPreferences";
import secureApiFetch from "../services/api";

const AuthContext = createContext();

function useAuth() {
    const { i18n } = useTranslation();

    const [isAuth, setIsAuth] = useState(KeyCloakService.IsAuthenticated);
    const [user, setUser] = useState(Auth.getLoggedInUser());

    const { setTheme } = useTheme();

    const login = useCallback(() => {
        return secureApiFetch(`/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((resp) => resp.json())
            .then((data) => {
                data.preferences = initialiseUserPreferences(data);

                setUser({ id: data.id, ...Auth.getLoggedInUser() });

                setTheme(data.preferences["web-client.theme"]);
                i18n.changeLanguage(data.preferences["web-client.language"]);

                setIsAuth(KeyCloakService.getInstance().authenticated);
            })
            .catch((err) => {
                throw err;
            });
    }, [i18n]);

    const logout = () => {
        setIsAuth(false);

        secureApiFetch(`/users/logout`, {
            method: "POST",
        }).finally(() => {
            KeyCloakService.logout();
        });
    };

    useEffect(() => {
        login();
    }, [login]);

    return { user, isAuth, login, logout };
}

const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthContext, AuthProvider, useAuth };
