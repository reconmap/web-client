
import { HiAdjustments, HiBookOpen, HiBriefcase, HiChartPie, HiCode, HiDocument, HiDocumentDuplicate, HiDownload, HiEye, HiFlag, HiFolder,  HiPlus, HiPuzzle, HiSupport, HiTerminal, HiUpload, HiUsers, HiViewList } from 'react-icons/hi'
const Links = [
    {
        title: 'Projects', icon: <HiFolder />, to: '/projects', sublinks: [
            {
                title: 'Create',
                icon: <HiPlus />,
                to: '/projects/create',
                permissions: 'projects.create'
            },
            {
                title: 'Templates',
                icon: <HiDocumentDuplicate />,
                to: '/projects/templates',
                permissions: 'projects.templates'
            }
        ]
    },
    {
        title: 'Tasks',
        icon: <HiViewList />,
        to: '/tasks',
        sublinks: [
            {
                title: 'Create',
                icon: <HiPlus />,
                to: '/tasks/create',
            }
        ],
        permissions: 'tasks.create'
    },
    {
        title: 'Commands', icon: <HiTerminal />, to: '/commands', sublinks: [
            {
                title: 'Add',
                icon: <HiPlus />,
                to: '/commands/add',
            }
        ],
        permissions: 'commands.*'
    },
    {
        title: 'Vulnerabilities', icon: <HiFlag />, to: '/vulnerabilities', sublinks: [
            {
                title: 'Add',
                icon: <HiPlus />,
                to: '/vulnerabilities/create',
            },
            {
                title: 'Templates',
                icon: <HiDocumentDuplicate />,
                to: '/vulnerabilities/templates',
                permissions: 'vulnerabilities.templates'
            }
        ],
        permissions: 'vulnerabilities.*'
    },
    {
        title: 'Documents', icon: <HiDocument />, to: '/documents', sublinks: [
            {
                title: 'Add',
                icon: <HiPlus />,
                to: '/documents/add',
            }
        ],
        permissions: 'vulnerabilities.*'
    },
    {
        title: 'Clients', icon: <HiBriefcase />, to: '/clients', sublinks: [
            {
                title: 'Create',
                icon: <HiPlus />,
                to: '/clients/create',
            }
        ],
        permissions: 'clients.*'
    },
    {
        title: 'Users', icon: <HiUsers />, to: '/users', sublinks: [
            {
                title: 'Create',
                icon: <HiPlus />,
                to: '/users/create',
            }
        ],
        permissions: 'users.*'
    },
    {
        title: 'System',
        icon: <HiAdjustments />,
        to: '/system',
        sublinks: [
            {
                title: 'Audit log',
                icon: <HiEye />,
                to: '/auditlog'
            },
            {
                title: 'Import data',
                icon: <HiUpload />,
                to: '/system/import-data',
            },
            {
                title: 'Export data',
                icon: <HiDownload />,
                to: '/system/export-data',
            },
            {
                title: 'Usage',
                icon: <HiChartPie />,
                to: '/system/usage',
            },
            {
                title: 'Application logs',
                icon: <HiEye />,
                to: '/system/logs'
            },
            {
                title: 'Integrations',
                icon: <HiPuzzle />,
                to: '/integrations',
            },
        ],
        permissions: 'system.*'
    },
    {
        title: 'Help and support',
        icon: <HiSupport />,
        to: '/help',
        sublinks: [
            {
                title: 'User manual',
                icon: <HiBookOpen />,
                to: 'https://reconmap.org/user-manual/',
                external: true
            },
            {
                title: 'API docs',
                icon: <HiCode />,
                to: `${window.env.REACT_APP_API_ENDPOINT}/docs`,
                external: true
            },
            {
                title: 'Support',
                icon: <HiSupport />,
                to: '/support',
            },

        ]
    }
]

export default Links;
