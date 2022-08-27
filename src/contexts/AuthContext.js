import { useColorMode } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Auth from "services/auth";
import KeyCloakService from "services/keycloak";
import { initialiseUserPreferences } from "services/userPreferences";
import setThemeColors from "utilities/setThemeColors";
import secureApiFetch from '../services/api';

const AuthContext = createContext();

function useAuth() {
    const { setColorMode } = useColorMode();
    const { i18n } = useTranslation();

    const [isAuth, setIsAuth] = useState(KeyCloakService.IsAuthenticated);
    const [user, setUser] = useState(Auth.getLoggedInUser());

    const login = useCallback(() => {
        return secureApiFetch(`/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(resp => resp.json())
            .then(data => {
                data.preferences = initialiseUserPreferences(data);

                localStorage.setItem('isAuth', true);
                localStorage.setItem('user', JSON.stringify(data));

                setUser(Auth.getLoggedInUser())

                setThemeColors(data.preferences['web-client.theme']);
                setColorMode(data.preferences['web-client.theme']);
                i18n.changeLanguage(data.preferences['web-client.language'])

                setIsAuth(KeyCloakService.getInstance().authenticated)
            })
            .catch(err => {
                throw err;
            });
    }, [setColorMode, i18n])

    const logout = () => {
        setIsAuth(false);

        secureApiFetch(`/users/logout`, {
            method: 'POST',
        })
            .finally(() => {
                Auth.removeSession();
                setThemeColors('dark');
                setColorMode('dark');

                KeyCloakService.Logout();
            });
    }

    useEffect(() => {
        login();
    }, [login])

    return { user, isAuth, login, logout };
}

const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer;

export { useAuth, AuthContext, AuthProvider, AuthConsumer };

