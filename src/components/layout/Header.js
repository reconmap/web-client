import { Box, IconButton } from '@chakra-ui/react';
// import * as path from 'path';
import {  HiMenu } from 'react-icons/hi';
// import { Link as ReactLink } from 'react-router-dom';
import { ServerIssuesUrl, UserManualUrl } from 'ServerUrls';
// import Configuration from '../../Configuration';
import { AuthConsumer } from '../../contexts/AuthContext';
import NotificationsBadge from '../badges/NotificationsBadge';
import SearchBox from "../search/Box";
import LinkButton from '../ui/buttons/Link';
import HeaderUserMenu from '../ui/HeaderUserMenu';

const LINKS = [
    { title: "User Manual", to: { pathname: UserManualUrl } },
    { title: "Support", to: { pathname: ServerIssuesUrl } },
];

const Header = ({onOpen}) => {
    const handleClick = () => {
        onOpen()
      }
    return <AuthConsumer>
        {
            ({ isAuth, user }) => (
                <Box bg='gray.800' zIndex='10' pos='fixed' w='full' boxShadow='lg' py='3' px='5'
                    d='flex' alignItems='center' justifyContent='space-between'>
                    <Box d='flex' alignItems='center' justifyContent='flex-end'>
                        <IconButton onClick={handleClick} mr='3' icon={<HiMenu />} variant='outline' display={{ base: 'flex', lg: 'none' }} />
                        
                    </Box>
                    <Box d='flex' alignItems='center' justifyContent='flex-end'>

                    {isAuth ? <>
                        <SearchBox />
                        <NotificationsBadge />
                        {user && <HeaderUserMenu email={user.email} />}
                    </>
                        : LINKS.map((link, index) => (
                            <LinkButton external key={index} href={link.to.pathname}>
                                {link.title}
                            </LinkButton>))}
                    </Box>
                </Box>
            )
        }
    </AuthConsumer>
}

export default Header;
