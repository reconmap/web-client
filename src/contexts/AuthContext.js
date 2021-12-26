import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "services/auth";
import secureApiFetch from '../services/api';

const AuthContext = createContext();

function useAuth() {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    const [user, setUser] = useState(Auth.getLoggedInUser());

    return {
        user,
        isAuth,
        login(credentials, onOk, onKo) {
            const formData = new FormData();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);
            secureApiFetch(`/users/login`, {
                method: 'POST',
                body: formData
            })
                .then(resp => {
                    if (resp.status === 403) {
                        throw new Error('Invalid username or password');
                    }
                    if (resp.status !== 200) {
                        throw new Error('Invalid response from the server');
                    }
                    return resp.json();
                })
                .then(data => {
                    localStorage.setItem('isAuth', true);
                    localStorage.setItem('user', JSON.stringify(data));

                    setUser(data);

                    if (data.mfa === 'setup') {
                        navigate('/auth/mfa-setup');
                        return;
                    } else if (data.mfa === 'ready') {
                        navigate('/auth/mfa-verification');
                        return;
                    }

                    // eg mfa == disabled

                    setIsAuth(true);

                    onOk();
                })
                .catch(err => {
                    onKo(err.message);
                });
        },
        logout() {
            setIsAuth(false);

            secureApiFetch(`/users/logout`, {
                method: 'POST',
            })
                .finally(() => {
                    Auth.removeSession();
                });
        }
    };
}

const AuthProvider = ({ children }) => {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer;

export { useAuth, AuthContext, AuthProvider, AuthConsumer };

