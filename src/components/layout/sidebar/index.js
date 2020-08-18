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
        className={`px-4 py-3 flex items-center w-full  md:text-sm lg:text-base tracking-wide hover:text-white hover:bg-gray-800 transition duration-150 rounded hover:text-white border-l-4 border-transparent hover:border-gray-700 ${currentScreen.includes(link.to) ? 'text-white bg-gray-800 border-red-600' : 'text-gray-500'} `} >
        <i data-feather={link.icon} ></i>
        <span className='hidden ml-3 md:inline flex-1'>{link.title}</span>
      </Link>)}
    </aside>
  )
}
