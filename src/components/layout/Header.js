import { Link, useHistory } from 'react-router-dom'

import { AuthConsumer } from '../../contexts/AuthContext'

import React, { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { IconLogin } from '../icons'
export default function Header() {
  const history = useHistory()

  const LINKS = [
    { title: "Release notes", to: { pathname: "https://github.com/reconmap/application/releases" } },
    { title: "Support", to: { pathname: "https://github.com/reconmap/application/issues" } },
  ];

  const handleGoHome = () => { history.push('/') }
  const handleMyProfile = () => { history.push('/dashboard/user/me') }

  return <AuthConsumer>
    {
      ({ isAuth, logout }) => (
        <nav className="flex items-center justify-between w-full   px-2 pb-5 flex-col md:flex-row ">
          <h3 className="text-3xl font-bold items-center flex hover:text-gray-400 cursor-pointer md:w-1/3" onClick={handleGoHome}>
          <img src={'logo.svg'} height='28px' width='28px' className='mr-2 mt-1'/>
        Recon
        <span className='opacity-75'>map</span>
          </h3>

          {isAuth && <input className=' md:w-1/4 my-4 md:my-0 md:mx-5' placeholder="Search..." />}

          <nav className="font-semibold gap-5 flex items-center justify-end py-4 md:py-0 md:w-1/3">

            {isAuth ? <>
              <button type='menu' onClick={(e) => { e.preventDefault(); history.push('/dashboard/user/preferences') }} className=' ' ><i data-feather='sliders' className='mr-2' /> Preferences </button>
              <button onClick={handleMyProfile} type='menu' >My Profile</button>
              <button onClick={logout} ><i data-feather={'log-out'} className='mr-2' /> Log out</button>
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
