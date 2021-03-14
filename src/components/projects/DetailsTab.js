import ClientLink from 'components/clients/Link'
import TimestampsSection from 'components/ui/TimestampsSection'
import UserLink from 'components/users/Link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import { IconDocument } from '../ui/Icons'

function ProjectDetailsTab({ project }) {
    return (
        <section className="grid grid-two">
            <div>
                <h4>
                    <IconDocument /> Project Details
                </h4>
                <dl>
                    <dt>Status</dt>
                    <dd>{project.archived ? 'Archived' : 'Active'}</dd>

                    {project.engagement_type && <>
                        <dt>Engagement type</dt>
                        <dd>{project.engagement_type}</dd>
                    </>}

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

                {(project.engagement_start_date || project.engagement_end_date) &&
                    <dl>
                        {project.engagement_start_date && <>
                            <dt>Engagement start date</dt>
                            <dd><ReactTimeAgo date={project.engagement_start_date} /></dd>
                        </>}

                        {project.engagement_end_date && <>
                            <dt>Engagement end date</dt>
                            <dd><ReactTimeAgo date={project.engagement_end_date} /></dd>
                        </>}
                    </dl>
                }

                {project.archived === 1 &&
                    <dl>
                        <dt>Archived</dt>
                        <dd><ReactTimeAgo date={project.archive_ts} /></dd>
                    </dl>
                }

            </div>
        </section>
    )
}

export default ProjectDetailsTab
