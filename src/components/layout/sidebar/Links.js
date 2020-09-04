import React from 'react'

import { IconDashboard, IconFolder, IconDocumentDuplicate, IconBriefcase, IconUserGroup, IconReport, IconExtensions, IconClipboardList, IconFlag } from "../../icons";

export default [
    { title: 'Dashboard', icon: <IconDashboard />, to: '/' },
    { title: 'Vulnerabilities', icon: <IconFlag />, to: '/vulnerabilities' },
    { title: 'Tasks', icon: <IconClipboardList />, to: '/tasks' },
    { title: 'Projects', icon: <IconFolder/>, to: '/projects' },
    { title: 'Templates', icon: <IconDocumentDuplicate />, to: '/templates' },
    { title: 'Saved reports', icon: <IconBriefcase />, to: '/reports' },
    { title: 'Audit log', icon: <IconReport />, to: '/auditlog' },
    { title: 'User and permissions', icon: <IconUserGroup />, to: '/users' },
    { title: 'Integrations', icon: <IconExtensions />, to: '/integrations' },
  ]