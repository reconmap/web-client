import React  from 'react'
import LINKS from './Links'
import {Link } from 'react-router-dom'
import {IconDashboard} from '../../icons';

export default function Sidebar() {

    return (
        <aside>
            <Link to={'/'} className={`px-2 md:px-4 py-2 rounded flex items-center w-full opacity-75 tracking-wide hover:shadow-outline  transition duration-150 `}>
                <IconDashboard size={5}/> <span className='hidden ml-3 md:inline flex-1'>Dashboard</span>
            </Link>

            {LINKS.map((link, index) => <Link
                key={index}
                to={link.to}
                className={ `px-2 md:px-4 py-2  rounded flex items-center w-full opacity-75 tracking-wide hover:shadow-outline  transition duration-150 `}>
                {link.icon}
                <span className='hidden ml-3 md:inline flex-1'>{link.title}</span>
            </Link>)}
        </aside>
    )
}
