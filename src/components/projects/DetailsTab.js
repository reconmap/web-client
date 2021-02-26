import ClientLink from 'components/clients/Link'
import TimestampsSection from 'components/ui/TimestampsSection'
import UserLink from 'components/users/Link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IconDocument } from '../ui/Icons'

function ProjectDetailsTab({ project }) {
    return (
        <section className="grid grid-two">
            <div>
                <h4>
                    <IconDocument /> Project Details
                </h4>
                <dl>
                    <dt>Description</dt>
                    <dd><ReactMarkdown>{project.description}</ReactMarkdown></dd>
                </dl>
            </div>

            <div>
                <h4>Relations</h4>
                <dl>
                    <dt>Client</dt>
                    <dd><ClientLink clientId={project.client_id}>{project.client_name}</ClientLink></dd>

                    <dt>Created by</dt>
                    <dd><UserLink userId={project.creator_uid}>{project.creator_full_name}</UserLink></dd>
                </dl>

                <TimestampsSection entity={project} />
            </div>
        </section>
    )
}

export default ProjectDetailsTab
