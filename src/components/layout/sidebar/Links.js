import {
    IconBriefcase,
    IconClipboardList,
    IconDocument,
    IconDocumentDuplicate,
    IconDownload,
    IconExtensions,
    IconEye,
    IconFlag,
    IconFolder,
    IconPlus,
    IconPreferences,

    IconTerminal,
    IconUpload,
    IconUserGroup
} from "../../ui/Icons";

const Links = [
    {
        title: 'Projects', icon: <IconFolder size={5} />, to: '/projects', sublinks: [
            {
                title: 'Create',
                icon: <IconPlus size={5} />,
                to: '/projects/create',
                permissions: 'projects.create'
            },
            {
                title: 'Templates',
                icon: <IconDocumentDuplicate size={5} />,
                to: '/templates',
                permissions: 'projects.templates'
            }
        ]
    },
    {
        title: 'Tasks',
        icon: <IconClipboardList size={5} />,
        to: '/tasks',
        sublinks: [
            {
                title: 'Create',
                icon: <IconPlus size={5} />,
                to: '/tasks/create',
            }
        ],
        permissions: 'tasks.create'
    },
    {
        title: 'Commands', icon: <IconTerminal size={5} />, to: '/commands', sublinks: [
            {
                title: 'Add',
                icon: <IconPlus size={5} />,
                to: '/commands/add',
            }
        ],
        permissions: 'commands.*'
    },
    {
        title: 'Vulnerabilities', icon: <IconFlag size={5} />, to: '/vulnerabilities', sublinks: [
            {
                title: 'Add',
                icon: <IconPlus size={5} />,
                to: '/vulnerabilities/create',
            }
        ],
        permissions: 'vulnerabilities.*'
    },
    {
        title: 'Documents', icon: <IconDocument size={5} />, to: '/documents', sublinks: [
            {
                title: 'Add',
                icon: <IconPlus size={5} />,
                to: '/documents/add',
            }
        ],
        permissions: 'vulnerabilities.*'
    },
    {
        title: 'Clients', icon: <IconBriefcase size={5} />, to: '/clients', sublinks: [
            {
                title: 'Create',
                icon: <IconPlus size={5} />,
                to: '/clients/create',
            }
        ],
        permissions: 'clients.*'
    },
    {
        title: 'Users', icon: <IconUserGroup size={5} />, to: '/users', sublinks: [
            {
                title: 'Create',
                icon: <IconPlus size={5} />,
                to: '/users/create',
            }
        ],
        permissions: 'users.*'
    },
    {
        title: 'System',
        icon: <IconPreferences size={5} />,
        to: '/system',
        sublinks: [
            {
                title: 'Audit log',
                icon: <IconEye size={5} />,
                to: '/auditlog'
            },
            {
                title: 'Import data',
                icon: <IconUpload size={5} />,
                to: '/system/import-data',
            },
            {
                title: 'Export data',
                icon: <IconDownload size={5} />,
                to: '/system/export-data',
            },
            {
                title: 'Integrations',
                icon: <IconExtensions size={5} />,
                to: '/integrations',
            },
        ],
        permissions: 'system.*'
    }
]

export default Links
