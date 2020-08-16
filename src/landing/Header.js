import { Link, useHistory } from 'react-router-dom'

import React, { useContext } from 'react'
import AuthContext from './../contexts/AuthContext'

export default function Header() {
  const history = useHistory()
  const authContext = useContext(AuthContext)

  const LINKS = [
    { title: "Release notes", to: { pathname: "https://github.com/reconmap/application/releases" } },
    { title: "Support", to: { pathname: "https://github.com/reconmap/application/issues" } },
  ];

  const handleGoHome = () => { history.push('/') }
  const handleLogOut = () => {
    localStorage.removeItem('reconmap-logged');
    authContext.setLogged(false)
    setTimeout(() => { window.location.href = '/' }, 150);
  }

  return <nav className="flex items-center justify-between w-full   px-2 pb-5 flex-col md:flex-row ">
    <h3 className="text-3xl font-bold items-center flex hover:text-gray-400 cursor-pointer md:w-1/3" onClick={handleGoHome}>
      <i className='fa fa-mountain mr-2 text-base text-red-600' />
      Recon
      <span className='opacity-75'>Map</span>
    </h3>

    {authContext.logged && <input className=' md:w-1/4 my-4 md:my-0 md:mx-5' placeholder="Search..." />}

    <nav className="font-semibold gap-5 flex items-center justify-end py-4 md:py-0 md:w-1/3">

      {authContext.logged ? <button onClick={(e) => { e.preventDefault(); history.push('/dashboard/user/preferences') }} className='text-xs bg-gray-900 text-gray-300' ><i className='fa fa-sliders-h mr-2' /> Preferences </button>
        : LINKS.map((link, index) => (<Link key={index} className={`text-gray-500 py-1 text-sm hover:text-white hover:border-white`} to={link.to} target="_blank"> {link.title} </Link>))}

      {authContext.logged ? <button onClick={handleLogOut} ><i className='fa fa-sign-out-alt mr-2' /> Log out</button>
        : <Link to='login' ><button>Log in <i className='fa fa-sign-in-alt ml-2' /></button></Link>}
    </nav>
  </nav>
}
