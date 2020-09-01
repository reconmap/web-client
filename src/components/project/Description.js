import React from 'react'

const ProjectDescription = ({ project }) => {
    return <div className='flex items-start justify-between'>
        <p>{project.description}</p>
        <p className='text-right'>Created on <date>{project.insert_ts}</date></p>
    </div>
}


export default ProjectDescription