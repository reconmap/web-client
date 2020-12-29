import React, {useState} from 'react'
import Links from './Links'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {IconBookOpen, IconDashboard, IconChevronDown} from '../../ui/Icons';
import SecondaryButton from '../../ui/buttons/Secondary';
import './Sidebar.scss';

export default function Sidebar(props) {
    const { setSidebarCollapsed, sidebarCollapsed } = props
    const history = useHistory();

    const defaultSectionStatuses = Object.assign({}, ...Links.map(link => ({[link.title]: false})));
    const [sectionStatuses, updateSectionStatuses] = useState(defaultSectionStatuses);

    const handleUserManual = () => {
        window.open("https://reconmap.org/user-manual/", '_blank');
    }

    const onSupportButtonClick = () => {
        history.push('/support');
    }

    const onParentClick = (ev, link) => {
        ev.preventDefault();

        updateSectionStatuses({...sectionStatuses, [link.title]: !sectionStatuses[link.title]})
    }

    return (
        <aside className="sidebar ">
            <span id='collapse--button' onClick={()=>setSidebarCollapsed(!sidebarCollapsed)}></span>
            <Link to={'/'} data-label='DashBoard'>
                <IconDashboard size={5}/>
                <span>Dashboard</span>
            </Link>
            {Links.map((link, index) => {
                return <React.Fragment key={index}>
                    <div onClick={ev => onParentClick(ev, link)}>
                        <NavLink to={link.to} data-label={link.title} activeClassName='active' exact>
                            {link.icon}
                            <span>{link.title}</span>
                            { link.sublinks &&  <IconChevronDown styling={{ transform: sectionStatuses[link.title] && 'rotate(180deg)'}} />}
                        </NavLink>
                    </div>
                    { sectionStatuses[link.title] &&
                        <React.Fragment>
                            {link.sublinks && link.sublinks.map(sublink =>
                                <NavLink to={sublink.to} data-label={sublink.title} activeClassName='active'
                                        className='sublink'
                                        exact>
                                    {sublink.icon}
                                    <span>{sublink.title}</span>
                                </NavLink>
                            )}
                        </React.Fragment> }
                </React.Fragment>

            })}
            <div id='bottom'>
                <SecondaryButton onClick={handleUserManual}><IconBookOpen/>User manual</SecondaryButton>
                <SecondaryButton onClick={onSupportButtonClick}>Support</SecondaryButton>
            </div>
        </aside>
    )
}
