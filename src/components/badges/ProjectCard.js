import React from 'react'
import { Link } from 'react-router-dom'
import { IconDelete, IconX } from '../icons'

const ProjectCard = ({ project, destroy }) => {
    return <div><Link to={`/project/${project.id}`}>
        <article className='base base-project'>
            <p>{project.description}</p>
            <h1 className='items-center flex justify-between'>
                {project.name}
                {project.is_template === 1 && <i data-feather='clipboard' className=' text-xs opacity-50' />}
            </h1>
            <footer>
                {project.insert_ts}
            </footer>
        </article>
    </Link>
        <button className='mt-2 text-red-500 w-full text-xs flex justify-between' type='delete' onClick={() => destroy(project.id)}>
        Delete project <IconX />  
        </button>
    </div>
}

export default ProjectCard