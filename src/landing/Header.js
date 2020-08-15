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

  return <nav className="flex items-center justify-between w-full  p-2 flex-col md:flex-row ">
    <h3 className="text-3xl font-bold items-center flex hover:text-gray-400 cursor-pointer" onClick={handleGoHome}><i className='fa fa-mountain mr-2 text-base text-red-600' />Recon<span className='text-gray-200'>Map</span></h3>
    <nav className="font-semibold gap-5 flex items-center py-4 md:py-0">
      {LINKS.map((link, index) => (<Link key={index} className={`text-gray-500 font-bold   py-1 text-base hover:text-white hover:border-white`} to={link.to} target="_blank"> {link.title} </Link>))}
      {authContext.logged ? <button onClick={handleLogOut} >Log out</button>
        : <Link to='login' ><button>Log in</button></Link>}
    </nav>
  </nav>
}
