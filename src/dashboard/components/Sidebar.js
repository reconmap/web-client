import React from 'react'
import LINKS from './../../routes/dashboard'
import { Link, useHistory } from 'react-router-dom'

export default function Sidebar() {
  const { location } = useHistory();
  const currentScreen = location.pathname
  return (
    <aside className=' md:w-48  flex flex-col  p-3 mt-12'>
      {LINKS.map((link, index) => <Link
        key={index}
        to={link.to}
        className={`px-4 py-3 w-full text-gray-400 md:text-sm lg:text-base font-medium hover:text-white hover:bg-gray-800 transition duration-150 rounded hover:text-white ${currentScreen.includes(link.to) && 'text-white bg-gray-800'}`} >
        <i className={`fa fa-${link.icon} text-xs opacity-75 md:mr-3 fa-fw `} />
        <span className='hidden md:inline'>{link.title}</span>
      </Link>)}
    </aside>
  )
}
