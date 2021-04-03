import React, { useEffect, useState } from "react";
import { AuthConsumer } from "../../contexts/AuthContext";
import PrimaryButton from "../ui/buttons/Primary";
import './Login.scss';
import LoginContainer from "./LoginContainer";


const Login = () => {

    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ username: null, password: null })
    const [error, setError] = useState(null)

    useEffect(() => {
        // each time an error occurs
        error && setTimeout(() => {
            setError(null)
        }, 4000)
    }, [error])

    const handleUsername = ev => {
        setCredentials({ ...credentials, username: ev.target.value })
    }
    const handlePassword = ev => {
        setCredentials({ ...credentials, password: ev.target.value })
    }

    const onOk = () => {
        setLoading(false);
    }
    const onKo = (err) => {
        setLoading(false);
        setError(err)
    }

    const handleSubmit = (ev, login) => {
        setLoading(true);
        ev.preventDefault();
        login(credentials, onOk, onKo);
    }

    return <AuthConsumer>
        {
            ({ isAuth, login }) => (
                <LoginContainer>
                    <section className="loginform">
                        <form onSubmit={ev => handleSubmit(ev, login)}>
                            <fieldset>
                                <legend>Login</legend>
                                <label htmlFor="inputUsername" className="sr-only">Username</label>
                                <input type="text" id="inputUsername" onChange={handleUsername}
                                    placeholder="Username"
                                    required autoFocus />
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <input type="password" id="inputPassword" onChange={handlePassword}
                                    placeholder="Password" required />
                                <PrimaryButton
                                    type="submit">{!loading ? "Sign in" : "Processing..."}</PrimaryButton>
                            </fieldset>
                            {error &&
                                <p className="loginform__error">{error} </p>}
                        </form>
                    </section>
                </LoginContainer>
            )
        }
    </AuthConsumer>
};

export default Login;
