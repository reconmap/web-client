import RiskBadge from '../badges/RiskBadge'
import VulnerabilityBadge from '../badges/VulnerabilityBadge'
import CvssScore from '../badges/CvssScore'
import DeleteButton from "../ui/buttons/Delete";
import VulnerabilityStatusBadge from "../vulnerabilities/StatusBadge";
import Timestamps from '../ui/Timestamps';
import VulnerabilityCategoryBadge from '../badges/VulnerabilityCategoryBadge';

export default function VulnerabilitiesTable({vulnerabilities, destroy}) {
    return (
        <table className='w-full my-4 table-fixed'>
            <thead>
            <tr>
                <th className='w-64'>Summary</th>
                <th className='w-40'>Description</th>
                <th className='w-32'>Risk</th>
                <th className='w-32'><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</th>
                <th className='w-32'>Category</th>
                <th className='w-24'>Status</th>
                <th className='w-32'>Creation date/time</th>
                <th className='w-40'>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {vulnerabilities.map((vulnerability, index) => {
                return (
                    <tr key={index}>
                        <td><VulnerabilityBadge vulnerability={vulnerability}/></td>
                        <td>{vulnerability.description || '-'}</td>
                        <td><RiskBadge risk={vulnerability.risk}/></td>
                        <td><CvssScore score={vulnerability.cvss_score}/></td>
                        <td><VulnerabilityCategoryBadge category={vulnerability.category_name}/></td>
                        <td><VulnerabilityStatusBadge status={vulnerability.status}/></td>
                        <td><Timestamps insertTs={vulnerability.insert_ts}/></td>
                        <td className='text-right'>{destroy &&
                        <DeleteButton onClick={() => destroy(vulnerability.id)}/>
                        }</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
