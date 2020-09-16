import { useHistory } from 'react-router-dom'

import { AuthConsumer } from '../../contexts/AuthContext'

import React from 'react'
import { IconDark,  IconLight} from '../icons';
import BtnLink from './../ui/buttons/BtnLink'
import ThemeContext from '../../contexts/ThemeContext';
import { useContext } from 'react';
import BtnSecondary from '../ui/buttons/BtnSecondary';
import UserAvatar from '../badges/UserAvatar';
import NotificationsBadge from '../badges/NotificationsBadge';

const LINKS = [
  { title: "Release notes", to: { pathname: "https://github.com/reconmap/application/releases" } },
  { title: "Support", to: { pathname: "https://github.com/reconmap/application/issues" } },
  { title: "User Manual", to: { pathname: "https://reconmap.org/user-manual/" } },
];

export default function Header() {
  const history = useHistory()
  const { theme, setTheme } = useContext(ThemeContext)

  const handleSwitchTheme = () => { setTheme(theme === 'light' ? 'dark' : 'light') }
  const handleMyProfile = () => { history.push(`/users/${localStorage.getItem('user.id')}`) }
  const handleOpenPrefs = () => { history.push('/users/preferences') }
  const handleUserManual = () => { window.open("https://reconmap.org/user-manual/", '_blank'); }
  const handleSearchKeyDown = e => { if (e.key === 'Enter') { history.push('/search/' + encodeURIComponent(e.target.value)); } }

  return <AuthConsumer>
    {
      ({ isAuth, logout, user }) => (
        <nav className={`flex items-center ${ isAuth ? 'justify-end' : 'justify-center' } w-full space-x-2 pt-4 px-5 pb-5 flex-col lg:flex-row `}>
          {isAuth ? <>
            <input className=' mx-auto lg:mx-0 lg:mr-auto my-4 lg:my-0' placeholder="Search..." onKeyDown={handleSearchKeyDown} />
            <BtnLink color={theme==='light'?'indigo':'yellow'} size='sm' onClick={handleSwitchTheme}>{theme==='light'?<IconDark size={4} styling='mr-2'/>: <IconLight size={4} styling='mr-2'/> } {theme==='light'?'Dark':'Light'}</BtnLink>
            <BtnLink size='sm' color='gray' onClick={handleUserManual}> User manual </BtnLink>
            <BtnLink size='sm' color='gray' onClick={handleOpenPrefs}> Preferences </BtnLink>
            <NotificationsBadge />
            {user && <UserAvatar onClick={handleMyProfile} size={8} email={user.email} />}
            <span className='w-2'> </span>
            <BtnSecondary size='sm' color='gray' onClick={logout} >  Logout</BtnSecondary>
          </>
            : LINKS.map((link, index) => (<BtnLink size='sm' key={index} to={link.to.pathname} > {link.title} </BtnLink>))}
        </nav>
      )
    }
  </AuthConsumer>
}
