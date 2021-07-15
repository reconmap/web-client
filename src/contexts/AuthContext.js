import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import Auth from "services/auth";
import secureApiFetch from '../services/api';

const AuthContext = createContext()

const AuthProvider = (props) => {

    const history = useHistory();

    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    const [user, setUser] = useState(Auth.getLoggedInUser());

    let redirectTo
    try {
        redirectTo = props.location.state.from.pathname
    } catch {
        redirectTo = "/"
    }

    const login = (credentials, onOk, onKo) => {
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
                    history.push('/auth/mfa-setup');
                    return;
                } else if (data.mfa === 'ready') {
                    history.push('/auth/mfa-verification');
                    return;
                }

                // eg mfa == disabled

                setIsAuth(true);
                history.push(redirectTo);

                onOk();
            })
            .catch(err => {
                onKo(err.message);
            });
    };

    const logout = () => {
        setIsAuth(false);

        secureApiFetch(`/users/logout`, {
            method: 'POST',
        })
            .finally(() => {
                Auth.removeSession();
            });
    };

    return <AuthContext.Provider value={{ isAuth, login, logout, user, setIsAuth }}>
        {props.children}
    </AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer };
