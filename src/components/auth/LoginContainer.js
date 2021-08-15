import { Box, Container } from "@chakra-ui/react";
import Header from "../layout/Header";

const LoginContainer = ({ children }) => {
    return (
        <Box minH="100vh" d="flex" flexDirection="column">
            <Header />
            <Container as="section" flex="1" d="flex" alignItems="center">
                {children}
            </Container>
            <Box as='footer' p="3" textAlign='center'>
                Version <strong> {process.env.REACT_APP_VERSION}</strong> (
                {process.env.REACT_APP_GIT_COMMIT_HASH})
            </Box>
        </Box>
    );
};

export default LoginContainer;
