import {
    IconBriefcase,
    IconClipboardList,
    IconDatabase,
    IconDocumentDuplicate,
    IconDownload,
    IconExtensions,
    IconList,
    IconEye,
    IconFlag,
    IconFolder,
    IconPlus,
    IconReport,
    IconUpload,
    IconUserGroup
} from "../../ui/Icons";

const Links = [
    {title: 'Vulnerabilities', icon: <IconFlag size={5}/>, to: '/vulnerabilities'},
    {
        title: 'Tasks',
        icon: <IconClipboardList size={5}/>, 
        to: '/tasks',
        sublinks: [
            {
                title: 'List',
                icon: <IconList size={5}/>, 
                to: '/tasks',
            },
            {
                title: 'Create',
                icon: <IconPlus size={5}/>, 
                to: '/tasks/create',
            }
        ]
        },
    {title: 'Projects', icon: <IconFolder size={5}/>, to: '/projects'},
    {title: 'Templates', icon: <IconDocumentDuplicate size={5}/>, to: '/templates'},
    {title: 'Saved Reports', icon: <IconReport size={5}/>, to: '/reports'},
    {title: 'Clients', icon: <IconBriefcase size={5}/>, to: '/clients'},
    {title: 'Audit log', icon: <IconEye size={5}/>, to: '/auditlog'},
    {title: 'Users and Permissions', icon: <IconUserGroup size={5}/>, to: '/users'},
    {
        title: 'System Data', 
        icon: <IconDatabase size={5}/>, 
        to: '/system-data',
        sublinks: [
            {
                title: 'Import',
                icon: <IconUpload size={5}/>, 
                to: '/system-data/import',
            },
            {
                title: 'Export',
                icon: <IconDownload size={5}/>, 
                to: '/system-data/export',
            },
        ]
    },
    {title: 'Integrations', icon: <IconExtensions size={5}/>, to: '/integrations'},
]

export default Links
