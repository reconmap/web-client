import React from 'react'
import LINKS from './Links'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {IconBookOpen, IconDashboard} from '../../ui/Icons';
import SecondaryButton from '../../ui/buttons/Secondary';

export default function Sidebar() {
    const history = useHistory();
    const handleUserManual = () => {
        window.open("https://reconmap.org/user-manual/", '_blank');
    }
    const onSupportButtonClick = () => {
        history.push('/support');
    }
    return (
        <aside>
            <Link to={'/'} data-label='DashBoard'>
                <IconDashboard size={5}/>
                <span>Dashboard</span>
            </Link>
            {LINKS.map((link, index) => {
                return <React.Fragment key={index}>
                    <NavLink to={link.to} data-label={link.title} activeClassName='active' exact>
                        {link.icon}
                        <span>{link.title}</span>
                    </NavLink>
                    {link.sublinks && link.sublinks.map( sublink => 
                        <NavLink to={sublink.to} data-label={sublink.title} activeClassName='active' className='sublink' exact>
                            {sublink.icon}
                            <span>{sublink.title}</span>
                        </NavLink>
                    )}
                </React.Fragment>
                
            })}
            <div id='bottom'>
                <SecondaryButton onClick={handleUserManual}><IconBookOpen/>User manual</SecondaryButton>
                <SecondaryButton onClick={onSupportButtonClick}>Support</SecondaryButton>
            </div>
        </aside>
    )
}
