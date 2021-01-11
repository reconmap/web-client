import React, {useEffect} from 'react'
import secureApiFetch from '../../services/api'
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge'
import PrimaryButton from '../ui/buttons/Primary';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import ExternalLink from "../ui/ExternalLink";
import VulnerabilityStatusBadge from "./StatusBadge";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import Breadcrumb from '../ui/Breadcrumb';
import Loading from '../ui/Loading';
import Timestamps from "../ui/Timestamps";
import {IconCheck, IconFlag} from '../ui/Icons';
import {actionCompletedToast} from "../ui/toast";
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import useFetch from './../../hooks/useFetch'
import useDelete from './../../hooks/useDelete'
import EditButton from "../ui/buttons/Edit";
import TextBlock from "../ui/TextBlock";
import VulnerabilitiesNotesTab from "./NotesTab";
import Tab from "../ui/Tab";
import Tabs from "../ui/Tabs";

const VulnerabilityDetails = () => {
    const history = useHistory()
    const {params: {vulnerabilityId}} = useRouteMatch()
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

    const handleStatus = () => {
        const newStatus = vulnerability.status === 'open' ? 'closed' : 'open';
        secureApiFetch(`/vulnerabilities/${vulnerability.id}`, {
            method: 'PUT',
            body: JSON.stringify({status: newStatus})
        })
            .then(() => {
                updateVulnerability()
                actionCompletedToast('The task has been updated.');
            })
            .catch(err => console.error(err))
    }

    if (!vulnerability) return <Loading/>

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/vulnerabilities">Vulnerabilities</Link>
            </Breadcrumb>
            <ButtonGroup>
                <EditButton onClick={(ev) => {
                    ev.preventDefault();
                    history.push(`/vulnerabilities/${vulnerability.id}/edit`)
                }}>Edit</EditButton>
                {vulnerability.status === 'open' &&
                <PrimaryButton onClick={handleStatus}>
                    <IconCheck/> Mark as closed</PrimaryButton>}
                {vulnerability.status !== 'open' &&
                <PrimaryButton onClick={handleStatus}>Mark as open</PrimaryButton>}
                <DeleteButton onClick={handleDelete}/>
            </ButtonGroup>
        </div>
        <article>
            <Title type='Vulnerability' title={vulnerability.summary} icon={<IconFlag/>}/>
            <Timestamps insertTs={vulnerability.insert_ts} updateTs={vulnerability.update_ts}/>

            <Tabs>
                <Tab name="Details">
                    <h4>Description</h4>
                    <TextBlock value={vulnerability.description || "(empty)"}/>
                    <h4>Details</h4>
                    <table className='table-details'>
                        <tbody>
                        <tr>
                            <td>Status</td>
                            <td><VulnerabilityStatusBadge status={vulnerability.status}/></td>
                        </tr>
                        <tr>
                            <td>Project</td>
                            <td>{vulnerability.project_id ?
                                <a href={`/projects/${vulnerability.project_id}`}>{vulnerability.project_name}</a> : '-'}</td>
                        </tr>
                        <tr>
                            <td>Risk</td>
                            <td><RiskBadge risk={vulnerability.risk}/></td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{vulnerability.category_name || '-'}</td>
                        </tr>
                        <tr>
                            <td>CVSS score</td>
                            <td><CvssScore score={vulnerability.cvss_score}/></td>
                        </tr>
                        <tr>
                            <td>CVSS vector</td>
                            <td><ExternalLink
                                href={`https://www.first.org/cvss/calculator/3.0#${vulnerability.cvss_vector}`}>{vulnerability.cvss_vector}</ExternalLink>
                            </td>
                        </tr>
                        <tr>
                            <td>Affected target</td>
                            <td>{vulnerability.target_id ? `${vulnerability.target_name} (${vulnerability.target_kind})` : "-"}</td>
                        </tr>
                        </tbody>
                    </table>
                </Tab>
                <Tab name="Notes"><VulnerabilitiesNotesTab vulnerability={vulnerability}/></Tab>
            </Tabs>
        </article>

    </div>
}

export default VulnerabilityDetails
