import React from "react";
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge';
import VulnerabilityBadge from '../badges/VulnerabilityBadge';
import VulnerabilityCategoryBadge from '../badges/VulnerabilityCategoryBadge';
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import NoResults from "../ui/NoResults";
import VulnerabilityStatusBadge from "./StatusBadge";

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
                                <td><VulnerabilityStatusBadge vulnerability={vulnerability} /></td>
                                <td><RiskBadge risk={vulnerability.risk} /></td>
                                <td><CvssScore score={vulnerability.cvss_score} /></td>
                                <td className='only-desktop'><VulnerabilityCategoryBadge category={vulnerability.category_name} /></td>
                                <td className='flex justify-end'>
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
