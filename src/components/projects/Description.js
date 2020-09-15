import React from 'react'

const ProjectDescription = ({ project }) => {
    return <p className='mt-4  text-xl leading-7 text-gray-500 lg:mx-auto'>{project.description}. 
                <small className='text-right'>Created on <time dateTime={project.insert_ts}>{project.insert_ts}</time></small>
            </p>
                
}


export default ProjectDescription