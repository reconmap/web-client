import {  Box, Grid, useDisclosure } from "@chakra-ui/react";
import PageTitle from "components/logic/PageTitle";
import Header from "../Header";
import Sidebar from "../sidebar";
import DashboardPanels from "./DashboardPanels";

const Dashboard = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <PageTitle value="Dashboard" />
            <Header onOpen={onOpen}/>
            <Grid pt={{ base:'12', lg:'20'}} as='main' gridTemplateColumns={{ base:'1fr', lg:'200px 1fr'}} gap='2'>
                <Sidebar isOpen={isOpen} onClose={onClose} />
                <Box id='content' p={{ base:'5', lg:'3'}}>
                    {children || <DashboardPanels />}
                </Box>
            </Grid>
        </>
    );
}

export default Dashboard;
