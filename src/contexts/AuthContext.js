import { useColorMode } from "@chakra-ui/react";
import { StatusCodes } from "http-status-codes";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "services/auth";
import { initialiseUserPreferences } from "services/userPreferences";
import setThemeColors from "utilities/setThemeColors";
import secureApiFetch from '../services/api';

const AuthContext = createContext();

function useAuth() {
    const navigate = useNavigate();
    const { setColorMode } = useColorMode();

    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    const [user, setUser] = useState(Auth.getLoggedInUser());

    const login = (credentials) => {
        return secureApiFetch(`/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        })
            .then(resp => {
                if (resp.status === StatusCodes.FORBIDDEN) {
                    throw new Error('Invalid username or password');
                }
                if (resp.status !== StatusCodes.OK) {
                    throw new Error('Invalid response from the server');
                }
                return resp.json();
            })
            .then(data => {
                data.preferences = initialiseUserPreferences(data);

                localStorage.setItem('isAuth', true);
                localStorage.setItem('user', JSON.stringify(data));

                setUser(data);

                setThemeColors(data.preferences['web-client.theme']);
                setColorMode(data.preferences['web-client.theme']);

                if (data.mfa === 'setup') {
                    navigate('/auth/mfa-setup');
                    return;
                } else if (data.mfa === 'ready') {
                    navigate('/auth/mfa-verification');
                    return;
                }

                // eg mfa == disabled
                setIsAuth(true);
            })
            .catch(err => {
                throw err;
            });
    }

    const logout = () => {
        setIsAuth(false);

        secureApiFetch(`/users/logout`, {
            method: 'POST',
        })
            .finally(() => {
                Auth.removeSession();
                setThemeColors('dark');
                setColorMode('dark');
            });
    }

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

