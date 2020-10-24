import React  from 'react'
import LINKS from './Links'
import { Link, NavLink } from 'react-router-dom'
import {IconDashboard} from '../../icons';

export default function Sidebar() {

    return (
        <aside>
            <Link to={'/'} data-label='DashBoard' > 
                <IconDashboard size={5}/> 
                <span>Dashboard</span> 
            </Link>
            {LINKS.map((link, index) => {
                return <NavLink key={index} to={link.to} data-label={link.title} activeClassName='active' >
                            {link.icon} 
                            <span>{link.title}</span>
                       </NavLink>
            })}
        </aside>
    )
}
