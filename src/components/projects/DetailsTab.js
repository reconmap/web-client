import UserLink from 'components/users/Link'
import React from 'react'
import { IconDocument } from '../ui/Icons'

function ProjectDetailsTab({ project }) {
    return (
        <section className="flex">
            <div className="half">
                <h4>
                    <IconDocument /> Project Details
                </h4>
                <dl>
                    <dt>Description</dt>
                    <dd>{project.description}</dd>
                </dl>
            </div>
            <div>
                <h4>Relations</h4>
                <dl>
                    <dt>Client</dt>
                    <dd>{project.client_name ?? '-'}</dd>

                    <dt>Created by</dt>
                    <dd><UserLink userId={project.creator_uid}>{project.creator_full_name}</UserLink></dd>
                </dl>
            </div>
        </section>
    )
}

export default ProjectDetailsTab
