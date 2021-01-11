import React from 'react'
import {IconDocument} from '../ui/Icons'

function ProjectDetailsTab({project}) {
    return (
        <section>
            <h4>
                <IconDocument/> Project Details
            </h4>
            <div>{project.description}</div>
        </section>
    )
}

export default ProjectDetailsTab
