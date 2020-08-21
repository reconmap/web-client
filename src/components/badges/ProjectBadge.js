import React from 'react'
import { Link } from 'react-router-dom'

const ProjectBadge = ({ project }) => {
    return <Link to={`/project/${project.id}`}>
        <article className='base base-project'>
            <p>{project.description}</p>
            <h1 className='items-center flex justify-between'>
                {project.name} 
                {project.is_template === 1 && <i data-feather='clipboard' className=' text-xs opacity-50' />}
            </h1>
            <footer>{project.insert_ts}</footer>
        </article>
    </Link>
}

export default ProjectBadge