import React from 'react'
import { IconDocument } from '../ui/Icons'
import Timestamps from '../ui/Timestamps'

function ProjectDetailsTab({project}) {
    return (
        <section>
            <h4>
                <IconDocument/> Project Details
            </h4>
            <Timestamps insertTs={project.insert_ts} updateTs={project.update_ts}/>
            <div>{project.description}</div>
        </section>
    )
}

export default ProjectDetailsTab
