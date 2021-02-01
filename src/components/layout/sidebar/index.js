import React, {useLayoutEffect, useState, useCallback} from 'react'
import Links from './Links'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {IconBookOpen, IconDashboard, IconChevronDown, IconSupport} from '../../ui/Icons';
import SecondaryButton from '../../ui/buttons/Secondary';
import IconCollapse from './../../../images/icons/collapse'
import './Sidebar.scss';

export default function Sidebar(props) {
    const { setSidebarCollapsed, sidebarCollapsed } = props
    const {push} = useHistory();

    const watchClientWidth = useCallback( e =>{
        if( e.target.innerWidth < 800 ) setSidebarCollapsed(true)
    },[setSidebarCollapsed])

    useLayoutEffect(()=>{
        if( window.innerWidth < 800 ) setSidebarCollapsed(true)
        window.addEventListener('resize', watchClientWidth);
        return () => { window.removeEventListener('resize',watchClientWidth) }
    },[watchClientWidth, setSidebarCollapsed])

    const defaultSectionStatuses = Object.assign({}, ...Links.map(link => ({[link.title]: false})));
    const [sectionStatuses, updateSectionStatuses] = useState(defaultSectionStatuses);

    const handleUserManual = () => {
        window.open("https://reconmap.org/user-manual/", '_blank');
    }

    const onSupportButtonClick = () => { push('/support'); }

    const onParentClick = (ev, link) => {
        ev.preventDefault();
        updateSectionStatuses({...sectionStatuses, [link.title]: !sectionStatuses[link.title]})
    }

    return (
        <aside className="sidebar " style={{ paddingTop: sidebarCollapsed ? 'calc(var(--space) * 4)' : 'var(--space)'}}>
            <button onClick={()=>setSidebarCollapsed(!sidebarCollapsed)} 
            style={{ cursor:'pointer' , padding: '5px', position:'absolute',  top: 'var(--space)', display: 'inline', zIndex: '10', right:sidebarCollapsed ? 'var(--space)': 0,  margin:'auto'}}>
                <span style={{height: '20px', width:'20px', margin:0, padding:0, transformOrigin:'center center', transform: sidebarCollapsed ? `rotate(180deg)` : `rotate(0deg)`, display:'block'}}>
                    <IconCollapse />
                </span>
            </button>

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
                <SecondaryButton onClick={handleUserManual}><IconBookOpen/><span>User manual</span></SecondaryButton>
                <SecondaryButton onClick={onSupportButtonClick}><IconSupport /> <span>Support</span></SecondaryButton>
            </div>
        </aside>
    )
}
