import {Link} from 'react-router-dom'
import {IconCollection} from '../icons'

export default function ProjectBadge({project}) {

    return (<Link to={`/projects/${project.id}`} className='flex items-center text-indigo-500 hover:text-indigo-400'>
            <IconCollection styling='opacity-50 mr-2'/>
            <span className=' flex-1  font-medium '>{project.name}</span>
        </Link>
    )
}
