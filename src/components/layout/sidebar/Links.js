import React from 'react'

import { IconExclamation, IconClipboardCheck, IconDashboard, IconFolder, IconDocumentDuplicate, IconChartBar, IconUserGroup, IconReport, IconExtensions } from "../../icons";

export default [
    { title: 'Dashboard', icon: <IconDashboard />, to: '/dashboard' },
    { title: 'Vulnerabilities', icon: <IconExclamation />, to: '/vulnerabilities' },
    { title: 'Tasks', icon: <IconClipboardCheck />, to: '/tasks' },
    { title: 'Projects', icon: <IconFolder/>, to: '/projects' },
    { title: 'Templates', icon: <IconDocumentDuplicate />, to: '/templates' },
    { title: 'Reports', icon: <IconChartBar />, to: '/reports' },
    { title: 'Audit log', icon: <IconReport />, to: '/auditlog' },
    { title: 'User and permissions', icon: <IconUserGroup />, to: '/users' },
    { title: 'Integrations', icon: <IconExtensions />, to: '/integrations' },
  ]