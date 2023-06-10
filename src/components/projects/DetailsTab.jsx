import { SimpleGrid } from '@chakra-ui/react'
import ClientLink from 'components/clients/Link'
import VulnerabilitiesByCategoryStatsWidget from 'components/layout/dashboard/widgets/VulnerabilitiesByCategoryStatsWidget'
import VulnerabilitiesByRiskStatsWidget from 'components/layout/dashboard/widgets/VulnerabilitiesByRiskStatsWidget'
import EmptyField from 'components/ui/EmptyField'
import RelativeDateFormatter from 'components/ui/RelativeDateFormatter'
import TimestampsSection from 'components/ui/TimestampsSection'
import VisibilityLegend from 'components/ui/VisibilityLegend'
import UserLink from 'components/users/Link'
import ReactMarkdown from 'react-markdown'
import { IconChartBar, IconDocument } from '../ui/Icons'

const ProjectDetailsTab = ({ project }) => {
    const isTemplate = project.is_template === 1;

    return <section className="grid grid-two">
        <div>
            <h4>
                <IconDocument /> Project details
            </h4>
            <dl>
                {!isTemplate && <>
                    <dt>Visibility</dt>
                    <dd><VisibilityLegend visibility={project.visibility} /></dd>


                    <dt>Status</dt>
                    <dd>{project.archived ? 'Archived' : 'Active'}</dd>
                </>}

                {project.category_id && <>
                    <dt>Category</dt>
                    <dd>{project.category_name}</dd>
                </>}

                {project.vulnerability_metrics && <>
                    <dt>Vulnerability metrics</dt>
                    <dd>{project.vulnerability_metrics}</dd>
                </>}

                <dt>Description</dt>
                <dd>{project.description ? <ReactMarkdown>{project.description}</ReactMarkdown> : <EmptyField />}</dd>

                {!isTemplate && <>
                    <dt>External ID</dt>
                    <dd>{project.external_id}</dd>
                </>}
            </dl>

            <h4>
                Vulnerabilities summary
            </h4>
            <dl>
                <dt>Management Summary</dt>
                <dd>{project.management_summary ? <ReactMarkdown>{project.management_summary}</ReactMarkdown> : <EmptyField />}</dd>

                <dt>Conclusion</dt>
                <dd>{project.management_conclusion ? <ReactMarkdown>{project.management_conclusion}</ReactMarkdown> : <EmptyField />}</dd>
            </dl>

            <h4 style={{ marginTop: 20 }}>
                <IconChartBar /> Stats
            </h4>

            <SimpleGrid gap="3" columns={{ base: "1", md: "2", xl: "3" }}>
                <VulnerabilitiesByRiskStatsWidget projectId={project.id} />
                <VulnerabilitiesByCategoryStatsWidget projectId={project.id} />
            </SimpleGrid>
        </div>

        <div>
            <h4>Relations</h4>
            <dl>
                {!isTemplate && <>
                    <dt>Client</dt>
                    <dd><ClientLink clientId={project.client_id}>{project.client_name}</ClientLink></dd>
                </>}

                <dt>Created by</dt>
                <dd><UserLink userId={project.creator_uid}>{project.creator_full_name}</UserLink></dd>
            </dl>

            <TimestampsSection entity={project} />

            {(project.engagement_start_date || project.engagement_end_date) &&
                <dl>
                    {project.engagement_start_date && <>
                        <dt>Engagement start date</dt>
                        <dd><RelativeDateFormatter date={project.engagement_start_date} /></dd>
                    </>}

                    {project.engagement_end_date && <>
                        <dt>Engagement end date</dt>
                        <dd><RelativeDateFormatter date={project.engagement_end_date} /></dd>
                    </>}
                </dl>
            }

            {project.archived === 1 &&
                <dl>
                    <dt>Archived</dt>
                    <dd><RelativeDateFormatter date={project.archive_ts} /></dd>
                </dl>
            }

        </div>
    </section>
}

export default ProjectDetailsTab;
