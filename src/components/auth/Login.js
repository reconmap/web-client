import {  Button,  FormControl, Heading, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AuthConsumer } from "../../contexts/AuthContext";
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
                    <form onSubmit={ev => handleSubmit(ev, login)} style={{ width:'100%'}}>
                        <FormControl as="fieldset">
                            <Heading as="legend" size="lg" > Login</Heading>
                            <label htmlFor="inputUsername" className="sr-only">Username</label>
                            <Input
                                autoFocus
                                isInvalid={error}
                                isRequired
                                type="text"
                                placeholder="Username"
                                onChange={handleUsername}
                                id="inputUsername"
                            />
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <Input
                                isRequired
                                isInvalid={error}
                                type="password"
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
                        <Text color='red.300' fontSize='sm' h='12'>{error}</Text>
                    </form>
                </LoginContainer>
            )
        }
    </AuthConsumer>
};

export default Login;
