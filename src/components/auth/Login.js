import { Button, FormControl, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AuthConsumer } from "../../contexts/AuthContext";
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
                            <FormControl as="fieldset">
                                <Heading as="legend" size="lg" mb="3" > Login</Heading>
                                <Input
                                    autoFocus
                                    isRequired
                                    type={"text"}
                                    placeholder="Username"
                                    onChange={handleUsername}
                                    id="inputUsername"
                                />
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <Input
                                    isRequired
                                    type={"password"}
                                    placeholder="Enter password"
                                    onChange={handlePassword}
                                    id="inputPassword"
                                />
                                <Button
                                    isLoading={loading}
                                    loadingText="Processing..."
                                    type="submit"
                                    isFullWidth
                                    colorScheme="red"
                                    isDisabled={
                                        !credentials.password ||
                                        !credentials.username
                                    }
                                >
                                    Sign in
                                </Button>
                            </FormControl>
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
