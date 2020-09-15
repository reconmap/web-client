import React from 'react'
import { Link } from 'react-router-dom'
import { IconCollection } from '../icons'

export default function ProjectBadge({project}) {
   
    return (
        <Link 
            className='font-bold  rounded-lg overflow-hidden border-2 border-gray-800 rounded pr-2  flex items-stretch justify-start'  
            to={`/projects/${project.id}`}>
        <div className=' py-2 w-8 bg-smoke-50 mr-2 flex items-center justify-center' > 
            <IconCollection size='5' />
        </div>
        <span className='flex-1 flex items-center'>

        {project.name}
        </span>
        </Link>
    )
}
