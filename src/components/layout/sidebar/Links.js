import {
    IconBriefcase,
    IconClipboardList,
    IconDocumentDuplicate,
    IconDownload,
    IconExtensions,
    IconEye,
    IconFlag,
    IconFolder,
    IconReport,
    IconUserGroup
} from "../../ui/Icons";

const Links = [
    {title: 'Vulnerabilities', icon: <IconFlag size={5}/>, to: '/vulnerabilities'},
    {title: 'Tasks', icon: <IconClipboardList size={5}/>, to: '/tasks'},
    {title: 'Projects', icon: <IconFolder size={5}/>, to: '/projects'},
    {title: 'Templates', icon: <IconDocumentDuplicate size={5}/>, to: '/templates'},
    {title: 'Saved Reports', icon: <IconReport size={5}/>, to: '/reports'},
    {title: 'Clients', icon: <IconBriefcase size={5}/>, to: '/clients'},
    {title: 'Audit log', icon: <IconEye size={5}/>, to: '/auditlog'},
    {title: 'Users and Permissions', icon: <IconUserGroup size={5}/>, to: '/users'},
    {title: 'Import/Export', icon: <IconDownload size={5}/>, to: '/import-export'},
    {title: 'Integrations', icon: <IconExtensions size={5}/>, to: '/integrations'},
]

export default Links
