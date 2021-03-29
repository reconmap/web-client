import React, { Component, createContext } from "react";
import Auth from "services/auth";
import secureApiFetch from '../services/api';

const AuthContext = createContext()

class AuthProvider extends Component {

    state = {
        isAuth: false
    }

    constructor() {
        super();
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)

        this.state.isAuth = localStorage.getItem('isAuth');
        this.state.user = JSON.parse(localStorage.getItem('user'));
    }

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
                this.setState({ isAuth: true, user: data });
                onOk();
            })
            .catch(err => {
                onKo(err.message);
            });

    }

    logout() {
        this.setState({ isAuth: false })
        secureApiFetch(`/users/logout`, {
            method: 'POST',
        })
            .finally(() => {
                Auth.removeSession();
            });
    }

    render() {
        return (
            <AuthContext.Provider value={{
                isAuth: this.state.isAuth,
                login: this.login,
                logout: this.logout,
                user: this.state.user
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer };

