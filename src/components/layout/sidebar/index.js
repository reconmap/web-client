import { Box, Button, Collapse, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { HiChevronRight, } from 'react-icons/hi';
import Links from './Links';
import Auth from 'services/auth';
import PermissionsService from 'services/permissions';
import { Link, useHistory } from 'react-router-dom';
import * as path from 'path';
import Configuration from '../../../Configuration';
import { IconDashboard } from 'components/ui/Icons';

const Sidebar = (sidebar) => {
    const user = Auth.getLoggedInUser();
    const disclosures = {
        'Projects': useDisclosure(),
        'Tasks': useDisclosure(),
        'Commands': useDisclosure(),
        'Vulnerabilities': useDisclosure(),
        'Documents': useDisclosure(),
        'Clients': useDisclosure(),
        'Users': useDisclosure(),
        'System': useDisclosure(),
        'Help and support': useDisclosure(),
    }
    const {location} = useHistory()

    const filterByRole = (link) => {
        if (!link.hasOwnProperty('permissions')) {
            return true;
        }
        return user && PermissionsService.isAllowed(link.permissions, user.permissions);
    }
    const NavItem = (props) => {
        const { icon, children, to, ...rest } = props;
        return (
            <Link to={to}  >
                <Flex bg={ location.pathname ===to ? 'black':''} align="center" px="4" pl="4" py="3" cursor="pointer" color={useColorModeValue("inherit", "gray.400")} _hover={{ bg: useColorModeValue("gray.100", "gray.900"), color: useColorModeValue("gray.900", "gray.200"), }} fontWeight="semibold" transition=".15s ease" {...rest} >
                    <Flex mr='2' _groupHover={{ color: useColorModeValue("gray.600", "gray.300"), }}>{icon}</Flex>
                    {children}
                </Flex>
            </Link>
        );
    };
    const navItemBg = useColorModeValue("white", "gray.800")
    const navItemBorderColor = useColorModeValue("inherit", "gray.700")

    const SidebarContent = (props) => (
        <Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" pb="10" overflowX="hidden" overflowY="auto" bg={navItemBg} borderColor={navItemBorderColor} borderRightWidth="1px" w="60" {...props} >
            <Link _hover={{ textDecor: 'none' }} to='/' style={{ cursor: 'pointer' }} d='flex' alignItems='center' >
                <Flex p='5' flexDirection='row'>
                    <img alt='logo' src={path.join(Configuration.appBasename, 'logo.svg')} />
                    <Text as='h3' fontWeight='bold' ml='2' color='white' >
                        Recon<span style={{ color: 'var(--primary-color)' }}>map</span>
                    </Text>
                </Flex>
            </Link>
            <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation" >
                <NavItem icon={<IconDashboard />} to={'/'}> Dashboard </NavItem>
                {Links.filter(filterByRole).map((link, index) => {
                    const subLinks = link.sublinks.filter(filterByRole);
                    return <>
                        <NavItem icon={link.icon} onClick={disclosures[link.title].onToggle} to={link.to}>
                            {link.title}
                            {subLinks && <Icon as={HiChevronRight} ml="auto" transform={disclosures[link.title].isOpen && "rotate(90deg)"} />}
                        </NavItem>
                        {subLinks &&
                            <Collapse in={disclosures[link.title].isOpen} animateOpacity>
                                {subLinks.map(sublink =>
                                    sublink.hasOwnProperty('external') ?
                                    <Button rounded='0'  pl="12" py="2" as={'a'} href={sublink.to} target="_blank" variant='ghost' isFullWidth size='sm' rel="noreferrer noopener" color='gray.400' justifyContent='flex-start' bg={navItemBg} borderColor={navItemBorderColor} borderRightWidth="1px" w="60" data-label={sublink.title} leftIcon={sublink.icon}> <span>{sublink.title}</span> </Button>
                                        : <NavItem pl="12" py="2" icon={sublink.icon} to={sublink.to}> {sublink.title} </NavItem>
                                )}
                            </Collapse>
                        }
                    </>
                })}
            </Flex>
        </Box>
    );
    return (
        <>
            <SidebarContent display={{ base: "none", md: "unset" }} />
            <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Sidebar