import React from 'react'
import LINKS from './Links'
import { Link, useHistory } from 'react-router-dom'

export default function Sidebar() {
  const { location } = useHistory();
  const currentScreen = location.pathname
  const history = useHistory()

  const handleGoHome = () => { history.push('/') }


  return (
    <aside className='fixed top-0 bottom-0 w-16 md:w-56 lg:w-64 px-3 flex flex-col space-y-1 lg:py-5 md:py-3 py-3 bg-red-600 text-red-200'>
    <h3 className=" mb-5 lg:mr-5 text-2xl font-bold items-center flex text-white transition duration-150 cursor-pointer " onClick={handleGoHome}>
            <img src="/logo.svg" height='32px' width='32px' className='mr-2 mt-1' alt="Reconmap logo" />
             <span className='hidden md:inline'>Recon <span className=' text-black'>map</span></span>

          </h3>

      {LINKS.map((link, index) => <Link
        key={index}
        to={link.to}
        className={`px-2 py-2  rounded flex items-center w-full text-sm  tracking-wide hover:bg-red-500 hover:shadow transition duration-150  ${currentScreen.includes(link.to) && ' bg-red-700 opacity-100 text-white' } `} >
        {link.icon}
        <span className='hidden ml-3 md:inline flex-1'>{link.title}</span>
      </Link>)}
    </aside>
  )
}
