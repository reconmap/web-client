import { Select } from '@chakra-ui/react';
import AttachmentsTable from 'components/attachments/AttachmentsTable';
import AttachmentsDropzone from 'components/attachments/Dropzone';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import ProjectBadge from 'components/projects/ProjectBadge';
import TargetBadge from 'components/target/TargetBadge';
import EmptyField from 'components/ui/EmptyField';
import Tags from 'components/ui/Tags';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import VulnerabilityStatuses from 'models/VulnerabilityStatuses';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import Breadcrumb from '../ui/Breadcrumb';
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import ExternalLink from "../ui/ExternalLink";
import { IconDocument, IconFlag } from '../ui/Icons';
import Loading from '../ui/Loading';
import Tab from "../ui/Tab";
import Tabs from "../ui/Tabs";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import useDelete from './../../hooks/useDelete';
import useFetch from './../../hooks/useFetch';
import CvssAbbr from './CvssAbbr';
import VulnerabilitiesNotesTab from "./NotesTab";
import VulnerabilityStatusBadge from "./StatusBadge";

const VulnerabilityDetails = () => {
    const history = useHistory()
    const { params: { vulnerabilityId } } = useRouteMatch()
    const [vulnerability, updateVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`)
    const deleteVulnerability = useDelete(`/vulnerabilities/`)

    const parentType = 'vulnerability';
    const parentId = vulnerabilityId;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`)

    const handleDelete = async () => {
        const confirmed = await deleteVulnerability(vulnerabilityId);
        if (confirmed)
            history.push('/vulnerabilities')
    }

    const onStatusChange = ev => {
        const [status, substatus] = ev.target.value.split('-');
        secureApiFetch(`/vulnerabilities/${vulnerability.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status, substatus })
        })
            .then(() => {
                actionCompletedToast("The status has been transitioned.");
                updateVulnerability()
            })
            .catch(err => console.error(err))
    }

    if (!vulnerability) return <Loading />

    if (vulnerability && vulnerability.is_template) {
        return <Redirect to={`/vulnerabilities/templates/${vulnerability.id}`} />
    }

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/vulnerabilities">Vulnerabilities</Link>
            </Breadcrumb>
            <ButtonGroup>
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <EditButton onClick={(ev) => {
                        ev.preventDefault();
                        history.push(`/vulnerabilities/${vulnerability.id}/edit`)
                    }}>Edit</EditButton>

                    <label>Transition to&nbsp;
                        <Select onChange={onStatusChange} value={vulnerability.status + '-' + vulnerability.substatus}>
                            {VulnerabilityStatuses.map((status, index) =>
                                <option key={index} value={status.id}>{status.name}</option>
                            )}
                        </Select>
                    </label>

                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </ButtonGroup>
        </div>
        <article>
            <PageTitle value={`${vulnerability.summary} vulnerability`} />

            <Title type='Vulnerability' title={vulnerability.summary} icon={<IconFlag />} />
            <Tags values={vulnerability.tags} />

            <Tabs>
                <Tab name="Details">
                    <div className="grid grid-two">
                        <div>
                            <h4>Description</h4>
                            {vulnerability.description ? <ReactMarkdown>{vulnerability.description}</ReactMarkdown> : <EmptyField />}
                            {vulnerability.solution &&
                                <>
                                    <h4>Solution</h4>
                                    <ReactMarkdown>{vulnerability.solution}</ReactMarkdown>
                                </>
                            }

                            <h4>Proof of concept</h4>
                            {vulnerability.proof_of_concept ? <ReactMarkdown>{vulnerability.proof_of_concept}</ReactMarkdown> : <EmptyField />}

                            <h4>Impact</h4>
                            {vulnerability.impact ? <ReactMarkdown>{vulnerability.impact}</ReactMarkdown> : <EmptyField />}

                            <h4>Properties</h4>
                            <dl>
                                <dt>Status</dt>
                                <dd><VulnerabilityStatusBadge vulnerability={vulnerability} /></dd>

                                <dt>Risk</dt>
                                <dd><RiskBadge risk={vulnerability.risk} /></dd>

                                <dt>Category</dt>
                                <dd>{vulnerability.category_name || '-'}</dd>

                                <dt><CvssAbbr /> score</dt>
                                <dd><CvssScore score={vulnerability.cvss_score} /></dd>

                                <dt>CVSS vector</dt>
                                <dd><ExternalLink
                                    href={`https://www.first.org/cvss/calculator/3.0#${vulnerability.cvss_vector}`}>{vulnerability.cvss_vector}</ExternalLink>
                                </dd>
                            </dl>
                        </div>

                        <div>
                            <h4>Relations</h4>
                            <dl>
                                <dt>Project</dt>
                                <dd>{vulnerability.project_id ?
                                    <ProjectBadge project={{ id: vulnerability.project_id, name: vulnerability.project_name }} /> : '-'}</dd>

                                {vulnerability.target_id !== null && vulnerability.target_id !== 0 && <>
                                    <dt>Affected target</dt>
                                    <dd><Link to={`/targets/${vulnerability.target_id}`}><TargetBadge name={vulnerability.target_name}>{vulnerability.target_id ? `${vulnerability.target_name} (${vulnerability.target_kind})` : "-"}</TargetBadge></Link></dd>
                                </>}

                                <dt>Created by</dt>
                                <dd><UserLink userId={vulnerability.creator_uid}>{vulnerability.creator_full_name}</UserLink></dd>
                            </dl>

                            <TimestampsSection entity={vulnerability} />
                        </div>
                    </div>
                </Tab>
                <Tab name="Notes"><VulnerabilitiesNotesTab vulnerability={vulnerability} /></Tab>
                <Tab name="Attachments">
                    <AttachmentsDropzone parentType={parentType} parentId={parentId} onUploadFinished={reloadAttachments} />

                    <h4><IconDocument />Attachment list</h4>
                    <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                </Tab>
            </Tabs>
        </article>

    </div>
}

export default VulnerabilityDetails;
