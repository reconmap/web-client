import React from 'react'
import {IconBookOpen, IconStar} from '../icons';

export default function UserRoleBadge({role}) {
    const ROLES = {
        'creator': {color: 'red', icon: <IconStar/>},
        'writer': {color: 'indigo', icon: <IconStar/>},
        'reader': {color: 'teal', icon: <IconBookOpen/>},
    }
    return (ROLES.hasOwnProperty(role) ?
            <span className={`bg-${ROLES[role].color}-900 px-2 py-1 rounded text-${ROLES[role].color}-200 font-medium`}>
                            {role}
                        </span>
            :
            <span className={`px-2 py-1 rounded font-medium`}>
                            {role}
                        </span>
    )
}
