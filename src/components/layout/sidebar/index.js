import React from 'react'
import LINKS from './Links'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {IconBookOpen, IconDashboard, IconPreferences} from '../../ui/Icons';
// import BtnLink from './../../ui/buttons/BtnLink'
import BtnSecondary from '../../ui/buttons/BtnSecondary';

export default function Sidebar() {
    const history = useHistory()

    const handleOpenPrefs = () => {
        history.push('/users/preferences')
    }

    const handleUserManual = () => {
        window.open("https://reconmap.org/user-manual/", '_blank');
    }
    return (
        <aside>
            <Link to={'/'} data-label='DashBoard'>
                <IconDashboard size={5}/>
                <span>Dashboard</span>
            </Link>
            {LINKS.map((link, index) => {
                return <NavLink key={index} to={link.to} data-label={link.title} activeClassName='active'>
                    {link.icon}
                    <span>{link.title}</span>
                </NavLink>
            })}
            <div id='bottom'>
                <BtnSecondary onClick={handleUserManual}>
                    <IconBookOpen/>
                    User manual
                </BtnSecondary>
                <BtnSecondary onClick={handleOpenPrefs}>
                    <IconPreferences/>
                    Preferences
                </BtnSecondary>
            </div>
        </aside>
    )
}
