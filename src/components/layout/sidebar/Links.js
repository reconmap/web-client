import React from 'react'

import {
    IconBriefcase,
    IconClipboardList,
    IconDocumentDuplicate,
    IconDownload,
    IconExtensions,
    IconFlag,
    IconFolder,
    IconReport,
    IconUserGroup
} from "../../icons";

export default [
    {title: 'Vulnerabilities', icon: <IconFlag size={5}/>, to: '/vulnerabilities'},
    {title: 'Tasks', icon: <IconClipboardList size={5}/>, to: '/tasks'},
    {title: 'Projects', icon: <IconFolder size={5}/>, to: '/projects'},
    {title: 'Templates', icon: <IconDocumentDuplicate size={5}/>, to: '/templates'},
    {title: 'Saved reports', icon: <IconBriefcase size={5}/>, to: '/reports'},
    {title: 'Audit log', icon: <IconReport size={5}/>, to: '/auditlog'},
    {title: 'User and permissions', icon: <IconUserGroup size={5}/>, to: '/users'},
    {title: 'Import/Export', icon: <IconDownload size={5}/>, to: '/import-export'},
    {title: 'Integrations', icon: <IconExtensions size={5}/>, to: '/integrations'},
]