import React from 'react'
import RiskBadge from '../badges/RiskBadge'
import VulnerabilityBadge from '../badges/VulnerabilityBadge'
import CvssScore from '../badges/CvssScore'
import {IconCheck, IconX} from '../icons'
import Badge from '../badges/Badge'
import DeleteButton from "../ui/buttons/Delete";

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
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {vulnerabilities.map((vulnerability, index) => {
                return (
                    <tr key={index}>
                        <td><VulnerabilityBadge vulnerability={vulnerability}/></td>
                        <td><small className='text-gray-500'>{vulnerability.description}</small></td>
                        <td><RiskBadge fontSize='text-xs' risk={vulnerability.risk}/></td>
                        <td><CvssScore score={vulnerability.cvss_score}/></td>
                        <td><Badge
                            icon={vulnerability.status === 'open' ? <IconX size={4} styling='mr-2'/> :
                                <IconCheck size={4} styling='mr-2'/>}
                            fontSize='text-xs'
                            color={vulnerability.status === 'open' ? 'green' : 'blue'}>
                            {vulnerability.status}
                        </Badge>
                        </td>
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
