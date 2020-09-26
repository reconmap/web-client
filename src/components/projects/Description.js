import React from 'react'

const ProjectDescription = ({project}) => {
    return <p className='mt-4  text-xl leading-7 text-gray-500 lg:mx-auto'>{project.description}.</p>
}

export default ProjectDescription