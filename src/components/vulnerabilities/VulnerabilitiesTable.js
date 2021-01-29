import RiskBadge from '../badges/RiskBadge'
import VulnerabilityBadge from '../badges/VulnerabilityBadge'
import CvssScore from '../badges/CvssScore'
import DeleteButton from "../ui/buttons/Delete";
import VulnerabilityStatusBadge from "./StatusBadge";
import VulnerabilityCategoryBadge from '../badges/VulnerabilityCategoryBadge';
import NoResults from "../ui/NoResults";
import React from "react";
import LinkButton from "../ui/buttons/Link";

export default function VulnerabilitiesTable({ vulnerabilities, destroy }) {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{ width: '190px' }}>Summary</th>
                    <th style={{ width: '120px' }}>Status</th>
                    <th style={{ width: '120px' }}>Risk</th>
                    <th style={{ width: '120px' }}><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</th>
                    <th className='only-desktop' style={{ width: '20%' }}>Category</th>
                    <th style={{ width: '15%' }}>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {vulnerabilities.length === 0 ?
                    <tr>
                        <td colSpan="6"><NoResults /></td>
                    </tr> :
                    vulnerabilities.map((vulnerability, index) => {
                        return (
                            <tr key={index}>
                                <td><VulnerabilityBadge vulnerability={vulnerability} /></td>
                                <td><VulnerabilityStatusBadge status={vulnerability.status} /></td>
                                <td><RiskBadge risk={vulnerability.risk} /></td>
                                <td><CvssScore score={vulnerability.cvss_score} /></td>
                                <td className='only-desktop'><VulnerabilityCategoryBadge category={vulnerability.category_name} /></td>
                                <td className='flex'>
                                    <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                                    {destroy &&
                                        <DeleteButton onClick={() => destroy(vulnerability.id)} />
                                    }</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}
