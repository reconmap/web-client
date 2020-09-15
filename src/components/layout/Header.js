import { useHistory } from 'react-router-dom'

import { AuthConsumer } from '../../contexts/AuthContext'

import React from 'react'
import { IconLogout, IconUser} from '../icons';
import BtnLink from './../ui/buttons/BtnLink'
export default function Header() {
  const history = useHistory()

  const LINKS = [
    { title: "Release notes", to: { pathname: "https://github.com/reconmap/application/releases" } },
    { title: "Support", to: { pathname: "https://github.com/reconmap/application/issues" } },
  ];

  const handleMyProfile = () => { history.push(`/users/${localStorage.getItem('user.id')}`) }
  const handleOpenPrefs = () => { history.push('/users/preferences') }
  const handleUserManual = () => {
    window.open("https://reconmap.org/user-manual/", '_blank');
  }

  const handleSearchKeyDown = (e) => {
    if(e.key === 'Enter') {
      history.push('/search/' + encodeURIComponent(e.target.value));
    }
  }

  return <AuthConsumer>
    {
      ({ isAuth, logout }) => (
        <nav className="flex items-center justify-between w-full  pt-4 px-5 pb-5 flex-col lg:flex-row ">
          

          {isAuth && <input className=' mx-auto lg:mx-0 lg:mr-auto my-4 lg:my-0' placeholder="Search..." onKeyDown={handleSearchKeyDown} />}

          <div className="flex items-center mx-auto  py-4 lg:py-0 ">

            <BtnLink color='gray' onClick={handleUserManual}> User manual </BtnLink>
            {isAuth ? <>
              <BtnLink color='gray' onClick={handleOpenPrefs}> Preferences </BtnLink>
              <BtnLink color='gray' onClick={handleMyProfile} > <IconUser styling='mr-2' /> </BtnLink>
              <BtnLink color='gray' onClick={logout} size='sm'> <IconLogout /> </BtnLink>
            </>
              : LINKS.map((link, index) => (<BtnLink key={index} to={link.to.pathname} > {link.title} </BtnLink>))}
          </div>
        </nav>
      )
    }
  </AuthConsumer>
}
