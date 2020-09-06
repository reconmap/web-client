import React from 'react'
import RiskBadge from '../badges/RiskBadge'
import VulnerabilityBadge from '../badges/VulnerabilityBadge'
import DeleteButton from '../ui/buttons/Delete'
import CvssScore from '../badges/CvssScore'

export default function VulnerabilitiesTable({vulnerabilities, destroy}) {
    return (
        <table className='w-full my-4'>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Description</th>
                        <th>Risk</th>
                        <th><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</th>
                        <th>Status</th>
                        <th>Creation date/time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vulnerabilities.map((vulnerability, index) => {
                        return (
                            <tr key={index}>
                                <td><VulnerabilityBadge vulnerability={vulnerability}/></td>
                                <td><small className='text-gray-500'>{vulnerability.description}</small></td>
                                <td><RiskBadge risk={vulnerability.risk} /></td>
                                <td><CvssScore score={vulnerability.cvss_score}/></td>
                                <td>{vulnerability.status}</td>
                                <td>{vulnerability.insert_ts}</td>
                                <td className='text-right   '>{destroy && <DeleteButton onClick={() => destroy(vulnerability.id)} />}</td>
                            </tr>
                        )})}
                </tbody>
            </table>
    )
}
