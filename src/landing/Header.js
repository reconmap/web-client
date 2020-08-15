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

  return <nav className="flex items-center justify-between w-full   p-2 flex-col lg:flex-row ">
    <h3 className="text-3xl font-bold items-center flex hover:text-gray-400 cursor-pointer lg:w-1/3" onClick={handleGoHome}>
      <i className='fa fa-mountain mr-2 text-base text-red-600' />
      Recon
      <span className='opacity-75'>Map</span>
    </h3>

    {authContext.logged && <input className='w-full lg:w-1/4 my-4 lg:my-0 lg:mx-5' placeholder="Search..." />}

    <nav className="font-semibold gap-5 flex items-center justify-end py-4 lg:py-0 lg:w-1/3">

      {LINKS.map((link, index) => (<Link key={index} className={`text-gray-500 py-1 text-sm hover:text-white hover:border-white`} to={link.to} target="_blank"> {link.title} </Link>))}

      {authContext.logged ? <button onClick={handleLogOut} >Log out</button>
        : <Link to='login' ><button>Log in</button></Link>}
    </nav>
  </nav>
}
