import { Button, FormControl, Heading, Input, Text } from "@chakra-ui/react";
import PageTitle from "components/logic/PageTitle";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthConsumer } from "../../contexts/AuthContext";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ username: null, password: null });
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleUsername = ev => {
        setCredentials({ ...credentials, username: ev.target.value })
    }
    const handlePassword = ev => {
        setCredentials({ ...credentials, password: ev.target.value })
    }

    const handleSubmit = (ev, login) => {
        setLoading(true);
        ev.preventDefault();

        login(credentials)
            .then(() => {
                setLoading(false);

                let redirectTo
                try {
                    redirectTo = location.state.from.pathname
                } catch {
                    redirectTo = "/"
                }

                navigate(redirectTo);
            })
            .catch(err => {
                setLoading(false);

                setError(err.message);
            });
    }

    return <AuthConsumer>
        {
            ({ login }) => <form onSubmit={ev => handleSubmit(ev, login)} style={{ width: '100%' }}>
                <PageTitle value="Login" />
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
                {error && <Text color='red.300' fontSize='sm' h='12'>{error}</Text>}
            </form>
        }
    </AuthConsumer>
};

export default Login;
