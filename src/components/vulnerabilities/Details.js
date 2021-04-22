import RestrictedComponent from 'components/logic/RestrictedComponent';
import TargetBadge from 'components/target/TargetBadge';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import VulnerabilityStatuses from 'models/VulnerabilityStatuses';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import Breadcrumb from '../ui/Breadcrumb';
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import ExternalLink from "../ui/ExternalLink";
import { IconFlag } from '../ui/Icons';
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

    useEffect(() => {
        if (vulnerability) document.title = `Vulnerability ${vulnerability.summary} | Reconmap`;
    }, [vulnerability])

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
                        <select onChange={onStatusChange} value={vulnerability.status + '-' + vulnerability.substatus}>
                            {VulnerabilityStatuses.map((status, index) =>
                                <option key={index} value={status.id}>{status.name}</option>
                            )}
                        </select>
                    </label>

                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </ButtonGroup>
        </div>
        <article>
            <Title type='Vulnerability' title={vulnerability.summary} icon={<IconFlag />} />

            <Tabs>
                <Tab name="Details">
                    <div className="grid grid-two">
                        <div>
                            <h4>Description</h4>
                            <ReactMarkdown>{vulnerability.description || "_(empty)_"}</ReactMarkdown>
                            {vulnerability.solution &&
                                <>
                                    <h4>Solution</h4>
                                    <ReactMarkdown>{vulnerability.solution}</ReactMarkdown>
                                </>
                            }

                            <h4>Proof of concept</h4>
                            <ReactMarkdown>{vulnerability.proof_of_concept || "_(empty)_"}</ReactMarkdown>

                            <h4>Impact</h4>
                            <ReactMarkdown>{vulnerability.impact || "_(empty)_"}</ReactMarkdown>

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
                                    <a href={`/projects/${vulnerability.project_id}`}>{vulnerability.project_name}</a> : '-'}</dd>

                                <dt>Affected target</dt>
                                <dd><Link to={`/projects/${vulnerability.project_id}/targets/${vulnerability.target_id}`}><TargetBadge name={vulnerability.target_name}>{vulnerability.target_id ? `${vulnerability.target_name} (${vulnerability.target_kind})` : "-"}</TargetBadge></Link></dd>

                                <dt>Created by</dt>
                                <dd><UserLink userId={vulnerability.creator_uid}>{vulnerability.creator_full_name}</UserLink></dd>
                            </dl>

                            <TimestampsSection entity={vulnerability} />
                        </div>
                    </div>
                </Tab>
                <Tab name="Notes"><VulnerabilitiesNotesTab vulnerability={vulnerability} /></Tab>
            </Tabs>
        </article>

    </div>
}

export default VulnerabilityDetails;
