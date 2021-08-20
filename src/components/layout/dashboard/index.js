import {  Box,useDisclosure } from "@chakra-ui/react";
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
            <Box pt={'20'} as='main' >
                <Sidebar isOpen={isOpen} onClose={onClose} />
                <Box id='content' pr={{ base:'5', lg:'3'}} pl={{base: 5, md: '64'}}>
                    {children || <DashboardPanels />}
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
