import React, {useEffect} from 'react'
import secureApiFetch from '../../services/api'
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge'
import BtnPrimary from '../ui/buttons/BtnPrimary';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import ExternalLink from "../ui/ExternalLink";
import VulnerabilityStatusBadge from "./StatusBadge";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import Breadcrumb from '../ui/Breadcrumb';
import Loading from '../ui/Loading';
import Timestamps from "../ui/Timestamps";
import {IconCheck, IconFlag} from '../ui/Icons';
import {actionCompletedToast} from "../../utilities/toast";
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import useFetch from './../../hooks/useFetch'
import useDelete from './../../hooks/useDelete'

const VulnerabilityDetails = () => {
    const history = useHistory()
    const {params: {id: vulnerabilityId}} = useRouteMatch()
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
            method: 'PATCH',
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
                {vulnerability.status === 'open' &&
                <BtnPrimary onClick={handleStatus}>
                    <IconCheck/> Mark as closed</BtnPrimary>}
                {vulnerability.status !== 'open' &&
                <BtnPrimary onClick={handleStatus}>Mark as open</BtnPrimary>}
                <DeleteButton onClick={handleDelete}/>
            </ButtonGroup>
        </div>
        <article>
            <Title type='Vulnerability' title={vulnerability.summary} icon={<IconFlag/>}/>
            <Timestamps insertTs={vulnerability.insert_ts} updateTs={vulnerability.update_ts}/>
            <p>{vulnerability.description}</p>
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
                </tbody>
            </table>
        </article>
    </div>
}

export default VulnerabilityDetails
