import React, { createContext, Component } from "react";
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
    }

    login(credentials, onOk, onKo) {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);
        secureApiFetch(`/users/login`, {
          method: 'POST',
          body: formData
        })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('Invalid credentials');
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem('isAuth', true);
            this.setState({ isAuth: true });
            onOk();
          })
          .catch(onKo);
    
    }

    logout() {
      secureApiFetch(`/users/logout`, {
        method: 'POST',
      })
      .finally(() => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('accessToken');
        this.setState({ isAuth: false })
      });
    }

    render() {
        return (
            <AuthContext.Provider value={{
                isAuth: this.state.isAuth,
                login: this.login,
                logout: this.logout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
