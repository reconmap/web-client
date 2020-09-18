import React from 'react'
import {Link} from 'react-router-dom'
import {IconCollection} from '../icons'

export default function ProjectBadge({project}) {

    return (<Link to={`/projects/${project.id}`} className='flex items-center w-56'>
            <IconCollection styling='text-indigo-800 mr-2'/>
            <span className=' flex-1 text-indigo-500 font-medium '>{project.name}</span>
        </Link>
    )
}
