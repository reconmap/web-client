import React from 'react'
import { Link } from 'react-router-dom'
import { IconX } from '../icons'
import dayjs from 'dayjs'
import BtnSecondary from '../ui/buttons/BtnSecondary'
const ProjectCard = ({ project, destroy }) => {
    return <div className=''><Link to={`/projects/${project.id}`}>
                    <article className={`card reactive`}>
                        <p>{project.description}</p>
                        <h1 className='items-center flex justify-between'>
                            {project.name}
                            {project.is_template === 1 && <i data-feather='clipboard' className=' text-xs opacity-50' />}
                        </h1>
                        <footer>
                            {dayjs(project.insert_ts).toString()}
                        </footer>
                    </article>
                </Link>
                    <BtnSecondary size='sm' onClick={() => destroy(project.id)}>
                    Delete project <IconX size={4}/>  
                    </BtnSecondary>
                </div>
}

export default ProjectCard