import { Link, useHistory } from 'react-router-dom'

import { AuthConsumer } from '../../contexts/AuthContext'

import React from 'react'
import { IconPreferences, IconLogout, IconUser } from '../icons';
export default function Header() {
  const history = useHistory()

  const LINKS = [
    { title: "Release notes", to: { pathname: "https://github.com/reconmap/application/releases" } },
    { title: "Support", to: { pathname: "https://github.com/reconmap/application/issues" } },
  ];

  const handleGoHome = () => { history.push('/') }
  const handleMyProfile = () => { history.push(`/user/${localStorage.getItem('user.id')}`) }

  return <AuthConsumer>
    {
      ({ isAuth, logout }) => (
        <nav className="flex items-center justify-between w-full   px-2 pb-5 flex-col lg:flex-row ">
          <h3 className="  lg:mr-5 text-3xl font-bold items-center flex hover:text-gray-400 cursor-pointer " onClick={handleGoHome}>
            <img src="/logo.svg" height='28px' width='28px' className='mr-2 mt-1' alt="Reconmap logo" /> Recon <span className=' text-red-500'>map</span>
          </h3>

          {isAuth && <input className=' mx-auto lg:mx-0 lg:mr-auto my-4 lg:my-0' placeholder="Search..." />}

          <nav className="  font-semibold gap-5 flex items-center justify-end py-4 lg:py-0 ">

            {isAuth ? <>
              <button type='menu' onClick={(e) => { e.preventDefault(); history.push('/user/preferences') }}><IconPreferences styling='mr-2'/> Preferences </button>
              <button onClick={handleMyProfile} type='menu' >
              <IconUser styling='mr-2'/>
              My Profile</button>
              <button onClick={logout} > <IconLogout /> </button>
            </>
              :
              <>
                {LINKS.map((link, index) => (<Link key={index} className={`text-gray-500 py-1 text-sm hover:text-white hover:border-white`} to={link.to} target="_blank"> {link.title} </Link>))}
                <Link to='login' ><button>Log in <i data-feather={'log-in'} className='ml-2' /></button></Link>
              </>
            }
          </nav>
        </nav>
      )
    }
  </AuthConsumer>
}
