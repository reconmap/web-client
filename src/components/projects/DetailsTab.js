import React from 'react'
import { IconDocument } from '../ui/Icons'

function ProjectDetailsTab({ project }) {
    return (
        <section>
            <h4>
                <IconDocument /> Project Details
            </h4>
            <dl>
                <dt>Client</dt>
                <dd>{project.client_name ?? '-'}</dd>

                <dt>Description</dt>
                <dd>{project.description}</dd>
            </dl>
        </section>
    )
}

export default ProjectDetailsTab
