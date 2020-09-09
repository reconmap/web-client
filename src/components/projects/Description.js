import React from 'react'

const ProjectDescription = ({ project }) => {
    return <div className='flex items-start justify-between'>
        <p>{project.description}</p>
        <p className='text-right'>Created on <time datetime={project.insert_ts}>{project.insert_ts}</time></p>
    </div>
}


export default ProjectDescription