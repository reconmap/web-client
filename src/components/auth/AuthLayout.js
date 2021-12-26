import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

const AuthLayout = () => {
    return <Box minH="100vh" d="flex" flexDirection="column">
        <Header />
        <Container as="section" flex="1" d="flex" alignItems="center">
            <Outlet />
        </Container>
        <Box as='footer' p="3" textAlign='center'>
            Version <strong> {process.env.REACT_APP_VERSION}</strong> (
            {process.env.REACT_APP_GIT_COMMIT_HASH})
        </Box>
    </Box>
};

export default AuthLayout;
