import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import Auth from 'services/auth';
import PermissionsService from 'services/permissions';
import { IconChevronDown, IconDashboard } from '../../ui/Icons';
import IconCollapse from './../../../images/icons/collapse';
import Links from './Links';
import './Sidebar.scss';

export default function Sidebar(props) {
    const { setSidebarCollapsed, sidebarCollapsed } = props

    const [t] = useTranslation();

    const user = Auth.getLoggedInUser();

    const filterByRole = (link) => {
        if (!link.hasOwnProperty('permissions')) {
            return true;
        }
        return user && PermissionsService.isAllowed(link.permissions, user.permissions);
    }

    const watchClientWidth = useCallback(e => {
        if (e.target.innerWidth < 800) setSidebarCollapsed(true)
    }, [setSidebarCollapsed])

    useLayoutEffect(() => {
        if (window.innerWidth < 800) setSidebarCollapsed(true)
        window.addEventListener('resize', watchClientWidth);
        return () => { window.removeEventListener('resize', watchClientWidth) }
    }, [watchClientWidth, setSidebarCollapsed])

    const defaultSectionStatuses = Object.assign({}, ...Links.map(link => ({ [link.title]: false })));
    const [sectionStatuses, updateSectionStatuses] = useState(defaultSectionStatuses);

    const onParentClick = (ev, link) => {
        ev.preventDefault();
        updateSectionStatuses({ ...sectionStatuses, [link.title]: !sectionStatuses[link.title] })
    }

    return (
        <aside className="sidebar " style={{ paddingTop: sidebarCollapsed ? 'calc(var(--space) * 4)' : 'var(--space)' }}>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                style={{ padding: '5px', position: 'absolute', top: 'var(--space)', display: 'inline', zIndex: '10', right: sidebarCollapsed ? 'var(--space)' : 0, margin: 'auto' }}>
                <span style={{ height: '20px', width: '20px', margin: 0, padding: 0, transformOrigin: 'center center', transform: sidebarCollapsed ? `rotate(180deg)` : `rotate(0deg)`, display: 'block' }}>
                    <IconCollapse />
                </span>
            </button>

            <Link to={'/'} data-label='Dashboard'>
                <IconDashboard size={5} />
                <span>Dashboard</span>
            </Link>
            {Links.filter(filterByRole).map((link, index) => {
                const subLinks = link.sublinks.filter(filterByRole);
                return <React.Fragment key={index}>
                    <div onClick={ev => onParentClick(ev, link)}>
                        <NavLink to={link.to} data-label={link.title} className={data => data.isActive ? "active" : ""}>
                            {link.icon}
                            <span>{t(link.title)}</span>
                            {subLinks.length > 0 && <IconChevronDown styling={{ transform: sectionStatuses[link.title] && 'rotate(180deg)' }} />}
                        </NavLink>
                    </div>
                    {sectionStatuses[link.title] &&
                        <React.Fragment>
                            {subLinks.map((sublink, index) =>
                                sublink.hasOwnProperty('external') ?
                                    <a key={`sublink_${index}`} href={sublink.to} target="_blank" rel="noreferrer noopener" data-label={sublink.title} className='sublink'>
                                        {sublink.icon}
                                        <span>{sublink.title}</span>
                                    </a>
                                    :
                                    <NavLink key={`sublink_${index}`} to={sublink.to} data-label={sublink.title} className={data => data.isActive ? "sublink active" : "sublink"}>
                                        {sublink.icon}
                                        <span>{sublink.title}</span>
                                    </NavLink>
                            )}
                        </React.Fragment>}
                </React.Fragment>

            })}
        </aside>
    )
}
