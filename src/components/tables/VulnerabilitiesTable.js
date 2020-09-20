import React from 'react'
import RiskBadge from '../badges/RiskBadge'
import VulnerabilityBadge from '../badges/VulnerabilityBadge'
import CvssScore from '../badges/CvssScore'
import DeleteButton from "../ui/buttons/Delete";
import VulnerabilityStatusBadge from "../vulnerabilities/StatusBadge";

export default function VulnerabilitiesTable({vulnerabilities, destroy}) {
    return (
        <table className='w-full my-4'>
            <thead>
            <tr>
                <th>Summary</th>
                <th>Description</th>
                <th>Risk</th>
                <th><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</th>
                <th>Category</th>
                <th>Status</th>
                <th>Creation date/time</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {vulnerabilities.map((vulnerability, index) => {
                return (
                    <tr key={index}>
                        <td><VulnerabilityBadge vulnerability={vulnerability}/></td>
                        <td><small className='text-gray-500'>{vulnerability.description || '-'}</small></td>
                        <td><RiskBadge fontSize='text-xs' risk={vulnerability.risk}/></td>
                        <td><CvssScore score={vulnerability.cvss_score}/></td>
                        <td>{vulnerability.category_name || '-'}</td>
                        <td><VulnerabilityStatusBadge status={vulnerability.status}/></td>
                        <td>{vulnerability.insert_ts}</td>
                        <td className='text-right   '>{destroy &&
                        <DeleteButton onClick={() => destroy(vulnerability.id)}/>
                        }</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
