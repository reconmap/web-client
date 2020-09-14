import React from 'react'
import LINKS from './Links'
import { Link, useHistory } from 'react-router-dom'

export default function Sidebar() {
  const { location } = useHistory();
  const currentScreen = location.pathname
  return (
    <aside className=' md:w-48 lg:w-56  flex flex-col gap-2 lg:py-5 md:py-3 py-3 '>
      {LINKS.map((link, index) => <Link
        key={index}
        to={link.to}
        className={`px-2 py-3 flex items-center w-full  md:text-sm lg:text-base tracking-wide  transition duration-150 opacity-75  border-r-4 border-transparent hover:border-gray-700 ${currentScreen.includes(link.to) && ' border-red-600 opacity-100 text-red-500' } `} >
        {link.icon}
        <span className='hidden ml-3 md:inline flex-1'>{link.title}</span>
      </Link>)}
    </aside>
  )
}
