import { Box, Container, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

const AuthLayout = () => {
    return <VStack minH="100vh">
        <Header />
        <Container as="section" pt="20" flex="1" d="flex" alignItems="center"><Outlet /></Container>
        <Box as='footer' p="3" textAlign='center'>
            Version <strong> {process.env.REACT_APP_VERSION}</strong> (
            {process.env.REACT_APP_GIT_COMMIT_HASH})
        </Box>
    </VStack>
};

export default AuthLayout;
