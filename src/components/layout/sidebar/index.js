import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button,  VStack, Text, Drawer, DrawerOverlay, DrawerContent,  DrawerBody,  } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineViewList } from 'react-icons/hi';
import { Link as ReactLink,useHistory,  } from 'react-router-dom';
import Auth from 'services/auth';
import PermissionsService from 'services/permissions';
import {  IconDashboard } from '../../ui/Icons';
import Links from './Links';

export default function Sidebar({isOpen, onClose}) {

    const user = Auth.getLoggedInUser();
    const {location} = useHistory()

    const filterByRole = (link) => {
        if (!link.hasOwnProperty('permissions')) {
            return true;
        }
        return user && PermissionsService.isAllowed(link.permissions, user.permissions);
    }

    const SidebarButton = ({link}) => {
        return <Button color='gray.400' _active={{ backgroundColor: 'black', color: 'white' }} justifyContent='flex-start' as={ReactLink} variant='ghost' size='sm' isFullWidth to={link.to} data-label={link.title} isActive={location.pathname === link.to} leftIcon={link.icon || <HiOutlineViewList />}>
            <span>{link.title}</span>
        </Button>
    }

    const SidebarLinks = () => {
        return <><Button isActive={ location.pathname ==='/'} as={ReactLink} variant='ghost'  isFullWidth  to={'/'} justifyContent='flex-start' data-label='Dashboard' leftIcon={<IconDashboard />} _active={{ backgroundColor: 'black', color: 'white' }}>
                <Text size='xs'  >Dashboard</Text>
            </Button>
            <Accordion mt='2' >
                {Links.filter(filterByRole).map((link, index) => {
                    const subLinks = link.sublinks.filter(filterByRole);
                    return <AccordionItem  border='0' key={index} >
                            <h2 >
                                <AccordionButton _expanded={{ color: 'red.400'}} color='gray.500' d='flex' alignItems='center' textAlign='left' >
                                    {link.icon}
                                    <Text size='xs' ml='2' color='currentColor'> {link.title} </Text>
                                    <AccordionIcon ml='auto' />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                            <VStack spacing='1'>
                                <SidebarButton link={link}/>
                                    {subLinks.map(sublink =>
                                        sublink.hasOwnProperty('external') ?
                                            <Button as={'a'} href={sublink.to} target="_blank" variant='ghost' isFullWidth size='sm' rel="noreferrer noopener" color='gray.400' justifyContent='flex-start'  data-label={sublink.title} leftIcon={sublink.icon}> <span>{sublink.title}</span> </Button>
                                            : <SidebarButton link={sublink}/>
                                    )}
                                </VStack>
                            </AccordionPanel>
                    </AccordionItem>
                })}
            </Accordion></>
    }

    return (
        <React.Fragment>
            <Drawer placement={'left'} isOpen={isOpen} size='xs' onClose={onClose} >
                <DrawerOverlay />
                <DrawerContent bg='gray.900' pt='10'>
                <DrawerBody>
                    <SidebarLinks />                
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box as='aside' pl='2' pt='2' display={{ base: 'none', lg:'block'}}>
                <SidebarLinks />                
            </Box>
        </React.Fragment>
    )
}
