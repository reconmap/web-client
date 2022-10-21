import { faBriefcase, faCog, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Configuration from "Configuration";
import {
    IconBookOpen,
    IconBriefcase,
    IconCheck,
    IconClipboardList,
    IconCode,
    IconCube,
    IconDocument,
    IconDocumentDuplicate,
    IconDownload,
    IconExtensions,
    IconEye,
    IconFlag,
    IconFolder,
    IconPlus, IconQuestionCircle,

    IconSupport,

    IconTerminal,
    IconUpload,
    IconUserGroup
} from "../../ui/Icons";

const Links = [
    {
        title: 'Projects', icon: <IconFolder size={5} />, to: '/projects', sublinks: [
            {
                title: 'Create',
                icon: <FontAwesomeIcon icon={faPlus} />,
                to: '/projects/create',
                permissions: 'projects.create'
            },
            {
                title: 'Templates',
                icon: <IconDocumentDuplicate size={5} />,
                to: '/projects/templates',
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
            },
            {
                title: 'Templates',
                icon: <IconDocumentDuplicate size={5} />,
                to: '/vulnerabilities/templates',
                permissions: 'vulnerabilities.templates'
            },
            {
                title: 'Categories',
                icon: <IconDocumentDuplicate size={5} />,
                to: '/vulnerabilities/categories',
                permissions: 'vulnerabilities.categories'
            }
        ],
        permissions: 'vulnerabilities.*'
    },
    {
        title: 'Reports', icon: <IconFlag size={5} />, to: '/reports', sublinks: [
            {
                title: 'Templates',
                icon: <IconDocumentDuplicate size={5} />,
                to: '/reports/templates',
                permissions: 'reports.templates'
            }
        ],
        permissions: 'reports.*'
    },
    {
        title: 'Documents', icon: <IconDocument size={5} />, to: '/documents', sublinks: [
            {
                title: 'Add',
                icon: <IconPlus size={5} />,
                to: '/documents/add',
            }
        ],
        permissions: 'documents.*'
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
        title: 'Settings',
        icon: <FontAwesomeIcon icon={faWrench} />,
        to: '/settings',
        sublinks: [
            {
                title: 'Organisation',
                icon: <FontAwesomeIcon icon={faBriefcase} />,
                to: '/settings/organisation'
            },
        ],
        permissions: 'settings.*'
    },
    {
        title: 'System',
        icon: <FontAwesomeIcon icon={faCog} />,
        to: '/system',
        permissions: 'system.*',
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
                title: 'Usage',
                icon: <IconCube size={5} />,
                to: '/system/usage',
            },
            {
                title: 'Integrations',
                icon: <IconExtensions size={5} />,
                to: '/system/integrations',
            },
            {
                title: 'Health',
                icon: <IconCheck size={5} />,
                to: '/system/health',
            },
        ]
    },
    {
        title: 'Help and support',
        icon: <IconQuestionCircle size={5} />,
        to: '/help',
        sublinks: [
            {
                title: 'User manual',
                icon: <IconBookOpen size={5} />,
                to: 'https://docs.reconmap.com/user-manual/',
                external: true,
            },
            {
                title: 'API docs',
                icon: <IconCode size={5} />,
                to: `${Configuration.getDefaultApiUrl()}/docs/`,
                external: true,
                permissions: 'help.api',
            },
            {
                title: 'Support',
                icon: <IconSupport size={5} />,
                to: '/support',
                permissions: 'help.support',
            },
            {
                title: 'Licenses',
                icon: <IconSupport size={5} />,
                to: '/licenses',
                permissions: 'help.licenses',
            }
        ]
    }
]

export default Links;
