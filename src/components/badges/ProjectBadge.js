import React from 'react'
import { Link } from 'react-router-dom'
import { IconCollection } from '../icons'

export default function ProjectBadge({project}) {
   
    return (
        <Link 
            className='font-medium border-2 border-gray-800 rounded pr-2 h-8 inline-flex items-center' 
            to={`/project/${project.id}`}>
        <div className='h-8 flex-1 w-8 bg-gray-800 mr-2 flex items-center justify-center' > 
            <IconCollection size='5' />
        </div>
        {project.name}
        </Link>
    )
}
