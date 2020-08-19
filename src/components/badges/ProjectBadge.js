import React from 'react'
import { Link } from 'react-router-dom'

const ProjectBadge = ({ project }) => {
    return <Link to={`/dashboard/project/${project.id}`}>
        <article className='base base-project'>
            <p className='base-desc'>{project.description}</p>
            <h4 className='base-title mb-2 items-center flex justify-between text-white'>{project.name} {project.is_template === 1 && <i data-feather='clipboard' className=' text-xs opacity-50' />}</h4>
            <footer>{project.insert_ts}</footer>
        </article>
    </Link>
}

export default ProjectBadge