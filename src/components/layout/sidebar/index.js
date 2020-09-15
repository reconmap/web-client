import React, { useContext } from 'react'
import LINKS from './Links'
import { Link, useHistory } from 'react-router-dom'
import ThemeContext from '../../../contexts/ThemeContext';
import { IconDashboard } from '../../icons';

export default function Sidebar() {
  const { location } = useHistory();
  const currentScreen = location.pathname
  const history = useHistory()
  const { theme } = useContext(ThemeContext)
  const handleGoHome = () => { history.push('/') }


  return (
    <aside className={` fixed top-0 bottom-0 w-16 md:w-56 lg:w-64 px-3 flex flex-col space-y-1 lg:py-5 md:py-3 py-3 ${theme === 'light' ? 'bg-gray-200 text-gray-700' : 'bg-gray-800 text-gray-500'}  `}>
      <h3 className=" mb-5 text-2xl font-bold items-center flex text-white transition duration-150 cursor-pointer mx-auto " onClick={handleGoHome}>
        <img src="/logo.svg" height='32px' width='32px' className='mr-2 mt-1' alt="Reconmap logo" />
        <span className={`hidden md:inline ${theme === 'light' ? 'text-black' : 'text-white'}`}>Recon<span className='text-red-500'>map</span></span>
      </h3>

      <Link to={'/'} className={ `px-2 py-2 rounded flex items-center w-full text-sm opacity-75 tracking-wide hover:shadow-outline  transition duration-150  
                ${currentScreen === '/'  && theme === 'light' && 'opacity-100 text-black bg-white '}  
                  ${currentScreen === '/'  && theme === 'dark' && 'opacity-100 text-white bg-gray-900'} 
      `}>
        <IconDashboard size={5} /> <span className='hidden ml-3 md:inline flex-1'>DashBoard</span>
      </Link>

      {LINKS.map((link, index) => <Link
        key={index}
        to={link.to}
        className={
          `px-2 py-2  rounded flex items-center w-full text-sm opacity-75 tracking-wide hover:shadow-outline  transition duration-150  
                  ${currentScreen.includes(link.to) && theme === 'light' && 'opacity-100 text-black bg-white '}  
                  ${currentScreen.includes(link.to) && theme === 'dark' && 'opacity-100 text-white bg-gray-900'} 
                  `} >
        {link.icon}
        <span className='hidden ml-3 md:inline flex-1'>{link.title}</span>
      </Link>)}
    </aside>
  )
}
